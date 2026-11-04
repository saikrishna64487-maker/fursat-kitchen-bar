import React from "react";
import AdminLayoutClient from "./AdminLayoutClient";

export const metadata = {
  title: "Staff Admin Panel | Fursat Kitchen & Bar",
  description: "Internal content management portal for authorized Fursat staff.",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
