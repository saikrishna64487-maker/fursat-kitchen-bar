import { Metadata } from "next";
import MenuClient from "./MenuClient";

export const metadata: Metadata = {
  title: "Digital QR Menu & Table Ordering | Fursat Kitchen & Bar Madhapur",
  description:
    "Official live digital table menu for Fursat Kitchen & Bar in Madhapur, Hyderabad. Browse our complete multicuisine food, Srimukhi specials, craft cocktails, single malts, and specialty coffees.",
};

export default function MenuPage() {
  return <MenuClient />;
}
