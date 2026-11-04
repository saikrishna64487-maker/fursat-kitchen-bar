import { Metadata } from "next";
import KitchenDashboardClient from "./KitchenDashboardClient";

export const metadata: Metadata = {
  title: "Kitchen Order Management | Fursat Kitchen & Bar",
  description: "Secure live kitchen order dashboard for Fursat Kitchen & Bar staff.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminOrdersPage() {
  return <KitchenDashboardClient />;
}
