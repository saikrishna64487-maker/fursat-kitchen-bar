import { Metadata } from "next";
import QRCardClient from "./QRCardClient";

export const metadata: Metadata = {
  title: "Official Table QR Menu Card | Fursat Kitchen & Bar",
  description: "Official common table QR code for Fursat Kitchen & Bar digital menu & ordering.",
};

export default function QRPage() {
  return <QRCardClient />;
}
