"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { X, Camera, AlertCircle, Sparkles, ExternalLink, SwitchCamera, AlertTriangle } from "lucide-react";
import { BrowserQRCodeReader } from "@zxing/browser";

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QRScannerModal({ isOpen, onClose }: QRScannerModalProps) {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const zxingReaderRef = useRef<BrowserQRCodeReader | null>(null);
  const isLockedRef = useRef<boolean>(false);
  const cooldownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navigationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [cameraPermission, setCameraPermission] = useState<"prompt" | "granted" | "denied" | "unsupported">("prompt");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [invalidQrWarning, setInvalidQrWarning] = useState<string>("");
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");
  const [scannedSuccess, setScannedSuccess] = useState<boolean>(false);

  // Validate scanned QR string to ensure only Fursat menu destination is accepted
  const validateFursatQR = useCallback((rawText: string): { isValid: boolean; destination: string } => {
    if (!rawText || typeof rawText !== "string") {
      return { isValid: false, destination: "" };
    }

    const trimmed = rawText.trim();

    // 1. Direct path or keyword match
    if (
      trimmed === "/menu" ||
      trimmed === "menu" ||
      trimmed === "/menu/" ||
      trimmed.toLowerCase() === "fursat" ||
      trimmed.toLowerCase() === "fursat-menu"
    ) {
      return { isValid: true, destination: "/menu" };
    }

    // 2. Try parsing as relative or full URL
    try {
      if (trimmed.startsWith("/")) {
        const url = new URL(trimmed, window.location.origin);
        if (url.pathname === "/menu" || url.pathname.startsWith("/menu") || url.pathname === "/") {
          return { isValid: true, destination: "/menu" };
        }
      }

      const url = new URL(trimmed);
      const currentHost = window.location.hostname.toLowerCase();
      const qrHost = url.hostname.toLowerCase();

      const isSameHost = qrHost === currentHost;
      const isLocalhost =
        qrHost === "localhost" ||
        qrHost === "127.0.0.1" ||
        qrHost.startsWith("192.168.") ||
        qrHost.startsWith("10.") ||
        qrHost.endsWith(".local");

      const isKnownFursatDomain =
        qrHost.includes("fursat") ||
        qrHost.endsWith(".kitchen") ||
        qrHost.endsWith("fursat.in");

      // Verify origin matches local dev or authorized Fursat domains
      if (isSameHost || isLocalhost || isKnownFursatDomain) {
        if (
          url.pathname === "/menu" ||
          url.pathname.startsWith("/menu") ||
          url.pathname === "/" ||
          url.pathname === "" ||
          url.pathname === "/qr"
        ) {
          return { isValid: true, destination: "/menu" };
        }
      }
    } catch {
      // Not a valid URL string
    }

    return { isValid: false, destination: "" };
  }, []);

  // Complete cleanup of all media streams, loops, and timers
  const stopCamera = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (cooldownTimeoutRef.current) {
      clearTimeout(cooldownTimeoutRef.current);
      cooldownTimeoutRef.current = null;
    }

    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
      navigationTimeoutRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
        streamRef.current?.removeTrack(track);
      });
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
    }

    zxingReaderRef.current = null;
  }, []);

  // Handle detected QR text with security validation and single navigation lock
  const handleDetectedCode = useCallback((scannedText: string) => {
    if (isLockedRef.current) return;

    const { isValid, destination } = validateFursatQR(scannedText);

    if (isValid) {
      // Lock scanning to prevent duplicate navigation
      isLockedRef.current = true;
      setScannedSuccess(true);
      setInvalidQrWarning("");
      stopCamera();

      // Brief visual confirmation before clean route transition
      navigationTimeoutRef.current = setTimeout(() => {
        onClose();
        router.push(destination || "/menu");
      }, 400);
    } else {
      // Reject non-Fursat / arbitrary URLs
      setInvalidQrWarning("This QR code is not a Fursat menu QR.");
      isLockedRef.current = true;

      // Allow customer to try scanning again after brief pause
      if (cooldownTimeoutRef.current) {
        clearTimeout(cooldownTimeoutRef.current);
      }
      cooldownTimeoutRef.current = setTimeout(() => {
        setInvalidQrWarning("");
        isLockedRef.current = false;
      }, 2500);
    }
  }, [validateFursatQR, stopCamera, onClose, router]);

  // Start continuous QR detection loop
  const startScanLoop = useCallback(async () => {
    let nativeDetector: any = null;

    // Check if browser has native BarcodeDetector with QR support
    if (typeof window !== "undefined" && "BarcodeDetector" in window) {
      try {
        const BarcodeDetectorClass = (window as any).BarcodeDetector;
        const supportedFormats = await BarcodeDetectorClass.getSupportedFormats?.();
        if (!supportedFormats || supportedFormats.includes("qr_code")) {
          nativeDetector = new BarcodeDetectorClass({ formats: ["qr_code"] });
        }
      } catch {
        nativeDetector = null;
      }
    }

    // Initialize @zxing/browser decoder instance for cross-browser fallback
    if (!zxingReaderRef.current) {
      zxingReaderRef.current = new BrowserQRCodeReader();
    }

    if (!offscreenCanvasRef.current) {
      offscreenCanvasRef.current = document.createElement("canvas");
    }

    let lastScanTime = 0;
    const scanInterval = 100; // ms throttle for optimal CPU & battery performance

    const scanFrame = async (timestamp: number) => {
      const video = videoRef.current;

      if (!video || video.readyState < 2 || video.paused || video.ended) {
        animationFrameRef.current = requestAnimationFrame(scanFrame);
        return;
      }

      if (!isLockedRef.current && timestamp - lastScanTime >= scanInterval) {
        lastScanTime = timestamp;

        // 1. Try Native BarcodeDetector if available (e.g. Chrome on Android)
        if (nativeDetector) {
          try {
            const barcodes = await nativeDetector.detect(video);
            if (barcodes && barcodes.length > 0 && barcodes[0].rawValue) {
              handleDetectedCode(barcodes[0].rawValue);
              return;
            }
          } catch {
            // Fall through to ZXing decoder if native detector errors
          }
        }

        // 2. Real QR Decoder Fallback (@zxing/browser) for Safari iOS, Firefox, and other browsers
        if (zxingReaderRef.current && offscreenCanvasRef.current) {
          try {
            const canvas = offscreenCanvasRef.current;
            const width = video.videoWidth;
            const height = video.videoHeight;

            if (width > 0 && height > 0) {
              if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
              }

              const ctx = canvas.getContext("2d", { willReadFrequently: true });
              if (ctx) {
                ctx.drawImage(video, 0, 0, width, height);
                const result = zxingReaderRef.current.decodeFromCanvas(canvas);
                if (result && result.getText()) {
                  handleDetectedCode(result.getText());
                  return;
                }
              }
            }
          } catch {
            // ZXing throws NotFoundException when no QR is in frame; ignore and continue next frame
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(scanFrame);
    };

    animationFrameRef.current = requestAnimationFrame(scanFrame);
  }, [handleDetectedCode]);

  // Request camera and initialize video stream
  const startCamera = useCallback(async () => {
    setErrorMessage("");
    setInvalidQrWarning("");
    setScannedSuccess(false);
    isLockedRef.current = false;

    if (typeof navigator === "undefined" || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraPermission("unsupported");
      setErrorMessage("Live camera scanning is not supported on this browser.");
      return;
    }

    try {
      stopCamera();

      // Primary attempt with preferred facing mode and resolution
      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: facingMode },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });
      } catch {
        // Fallback for devices with strict constraints or no rear camera
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
      }

      streamRef.current = stream;
      setCameraPermission("granted");

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute("playsinline", "true");
        await videoRef.current.play();
        startScanLoop();
      }
    } catch (err: unknown) {
      setCameraPermission("denied");
      const errorObj = err as { name?: string; message?: string };

      if (errorObj?.name === "NotAllowedError" || errorObj?.name === "PermissionDeniedError") {
        setErrorMessage("Camera permission was denied. Please allow camera access in your browser settings or browse the digital menu directly.");
      } else if (errorObj?.name === "NotFoundError" || errorObj?.name === "DevicesNotFoundError") {
        setErrorMessage("No camera found on this device. You can open the digital menu directly.");
      } else if (errorObj?.name === "NotReadableError" || errorObj?.name === "TrackStartError") {
        setErrorMessage("Camera is currently in use by another app or tab. Please close it and try again.");
      } else if (errorObj?.name === "SecurityError") {
        setErrorMessage("Camera access requires a secure connection (HTTPS). You can open the digital menu directly.");
      } else {
        setErrorMessage("Camera is currently unavailable on this device. You can open the digital menu directly.");
      }
    }
  }, [facingMode, stopCamera, startScanLoop]);

  // Lifecycle management
  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      return;
    }

    startCamera();

    return () => {
      stopCamera();
    };
  }, [isOpen, facingMode, startCamera, stopCamera]);

  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === "environment" ? "user" : "environment"));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-fursat-black rounded-3xl border border-fursat-camel/40 shadow-2xl overflow-hidden flex flex-col items-center p-5 text-center text-fursat-sand animate-in zoom-in-95 duration-200">
        
        {/* Modal Top Bar */}
        <div className="w-full flex items-center justify-between pb-3 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-fursat-terracotta" />
            <span className="font-sans text-sm font-bold tracking-wider uppercase text-white">
              Scan Fursat QR
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
            aria-label="Close scanner"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scanner Viewport / Camera Box */}
        <div className="relative w-full aspect-square max-w-[320px] my-4 rounded-2xl overflow-hidden bg-black flex items-center justify-center border border-fursat-camel/30 shadow-inner">
          {cameraPermission === "granted" && !scannedSuccess && (
            <>
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                playsInline
                muted
              />

              {/* Viewfinder Target Overlay */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                {/* 4 Brand Corner Accents */}
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 border border-white/20 rounded-2xl">
                  <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-fursat-terracotta rounded-tl-lg" />
                  <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-fursat-terracotta rounded-tr-lg" />
                  <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-fursat-terracotta rounded-bl-lg" />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-fursat-terracotta rounded-br-lg" />

                  {/* Animated Laser Scanning Beam */}
                  <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-fursat-terracotta to-transparent shadow-[0_0_10px_#CF4B37] animate-bounce-slow" />
                </div>
              </div>

              {/* Non-Fursat QR Alert Overlay */}
              {invalidQrWarning && (
                <div className="absolute bottom-3 inset-x-3 bg-red-950/90 border border-red-500/50 rounded-xl px-3 py-2 text-xs text-red-200 flex items-center justify-center gap-2 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2 duration-150">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                  <span className="font-medium text-[11px]">{invalidQrWarning}</span>
                </div>
              )}
            </>
          )}

          {scannedSuccess && (
            <div className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2">
                <Sparkles className="w-6 h-6 animate-spin" />
              </div>
              <h4 className="font-sans text-base font-bold text-white">QR Code Recognized</h4>
              <p className="text-xs text-fursat-sand/70 mt-1">Opening digital menu...</p>
            </div>
          )}

          {(cameraPermission === "denied" || cameraPermission === "unsupported") && (
            <div className="p-6 text-center space-y-3">
              <AlertCircle className="w-10 h-10 text-amber-500 mx-auto opacity-80" />
              <h4 className="font-sans text-sm font-bold text-neutral-200">
                Camera Access Needed
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                {errorMessage || "Please allow camera access to scan the table QR code."}
              </p>
            </div>
          )}
        </div>

        {/* Instructions / Actions */}
        <div className="w-full space-y-3">
          <p className="text-xs text-fursat-sand/70 font-normal leading-relaxed">
            Point your camera at the physical <strong className="text-white font-semibold">Fursat QR code</strong> at your table.
          </p>

          <div className="flex items-center justify-center gap-2 pt-1">
            {cameraPermission === "granted" && (
              <button
                onClick={toggleFacingMode}
                className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-sans text-neutral-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Switch Camera"
              >
                <SwitchCamera className="w-3.5 h-3.5" />
                <span>Flip Camera</span>
              </button>
            )}

            {/* Direct Fallback Option */}
            <button
              onClick={() => {
                onClose();
                router.push("/menu");
              }}
              className="btn-primary px-4 py-2 rounded-xl text-xs font-sans uppercase font-bold tracking-wider flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span>Open Menu Directly</span>
              <ExternalLink className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

