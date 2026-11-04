import fs from "fs";
import path from "path";
import { ALL_MENU_ITEMS, MenuItem } from "@/data/menuData";

// Content interfaces
export interface OfferItem {
  id: string;
  name: string;
  discountPct: number;
  label: string;
  start: string;
  end: string;
  description: string;
  active: boolean;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  subtitle: string;
  category: string;
  order: number;
  active: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  capacity: string;
  active: boolean;
  image?: string;
}

export interface BanquetInfo {
  title: string;
  subtitle: string;
  capacity: string;
  description: string;
  features: string[];
  phone: string;
  email: string;
  active: boolean;
}

export interface CateringInfo {
  title: string;
  subtitle: string;
  features: string[];
  description: string;
  minimumOrder: string;
  phone: string;
  email: string;
  active: boolean;
}

export interface RestaurantInfo {
  name: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  googleMapsUrl: string;
  openingHours: string;
  hoursDetail: {
    days: string;
    hours: string;
  }[];
  instagram: string;
  facebook: string;
  announcement?: string;
}

export interface WebsiteContentStore {
  offers: OfferItem[];
  customMenuItems: MenuItem[];
  gallery: GalleryPhoto[];
  events: EventItem[];
  banquet: BanquetInfo;
  catering: CateringInfo;
  restaurantInfo: RestaurantInfo;
}

const CONTENT_FILE_PATH = path.join(process.cwd(), ".fursat_content.json");

// Default initial website content
function getDefaultContent(): WebsiteContentStore {
  return {
    offers: [
      {
        id: "off-1",
        name: "Afternoon Delight",
        discountPct: 10,
        label: "Afternoon",
        start: "12:00",
        end: "16:00",
        description: "10% off on complete multicuisine lunch menu and mocktails.",
        active: true,
      },
      {
        id: "off-2",
        name: "Evening Lull Special",
        discountPct: 20,
        label: "Evening lull",
        start: "16:00",
        end: "19:00",
        description: "20% off during tea & cocktail hours with bar bites.",
        active: true,
      },
      {
        id: "off-3",
        name: "Dinner Rush Hour",
        discountPct: 5,
        label: "Dinner rush",
        start: "19:00",
        end: "21:30",
        description: "5% house privilege on family dining and party tables.",
        active: true,
      },
      {
        id: "off-4",
        name: "Midnight Revelry",
        discountPct: 30,
        label: "Late hours",
        start: "21:30",
        end: "23:30",
        description: "30% off on artisan kitchen specialties and late night bar.",
        active: true,
      },
    ],
    customMenuItems: [...ALL_MENU_ITEMS],
    gallery: [
      {
        id: "gal-1",
        src: "/assets/kitchen-bar-lounge-seating-DXKtkFu9.jpeg",
        title: "Lounge Seating by the Window",
        subtitle: "Warm sunlit afternoons and plush velvet armchairs for unhurried conversations.",
        category: "Lounge",
        order: 1,
        active: true,
      },
      {
        id: "gal-2",
        src: "/assets/main-dining-hall-D1OfpEb6.jpeg",
        title: "Main Dining Hall",
        subtitle: "Architectural grandeur with custom brass fixtures and spacious family tables.",
        category: "Dining",
        order: 2,
        active: true,
      },
      {
        id: "gal-3",
        src: "/assets/cafe-counter-dessert-display-ChDJtGS1.jpeg",
        title: "Cafe Counter & Dessert Display",
        subtitle: "Freshly roasted artisanal coffees, Kunafa cheesecakes, and house delicacies.",
        category: "Cafe & Bar",
        order: 3,
        active: true,
      },
      {
        id: "gal-4",
        src: "/assets/dark-booth-seating-DVhnpRQ8.jpeg",
        title: "Dark Booth Seating",
        subtitle: "Cozy alcoves with ambient golden illumination designed for intimate date nights.",
        category: "Booths",
        order: 4,
        active: true,
      },
      {
        id: "gal-5",
        src: "/assets/communal-seating-BBQ0H9sH.jpeg",
        title: "Communal Seating Area",
        subtitle: "Expansive layouts tailored for celebratory reunions and large friend circles.",
        category: "Social",
        order: 5,
        active: true,
      },
      {
        id: "gal-6",
        src: "/assets/banquet/banquet-theatre-stage.jpg",
        title: "The Banquet Hall",
        subtitle: "On-site banquet hall hosting 150+ seated guests for kitty parties & galas.",
        category: "Banquet",
        order: 6,
        active: true,
      },
      {
        id: "gal-7",
        src: "/assets/lounge-seating-kitchen-bar-oaP_RKDc.jpeg",
        title: "Orange Lounge Chairs & Bar",
        subtitle: "Vibrant mid-century seating paired with craft cocktails and evening energy.",
        category: "Bar & Lounge",
        order: 7,
        active: true,
      },
    ],
    events: [
      {
        id: "ev-1",
        title: "Kitty Parties & High Teas",
        subtitle: "Private afternoon salon gatherings",
        category: "Social Gathering",
        description: "Curated small bites, dessert platters, and dedicated seating in our ambient lounge.",
        capacity: "15 - 40 Guests",
        active: true,
      },
      {
        id: "ev-2",
        title: "Birthday & Anniversary Galas",
        subtitle: "Grand evening celebrations",
        category: "Milestone Celebration",
        description: "Custom multi-course menu, audio-visual setup, custom beverage pairings, and dedicated staff.",
        capacity: "30 - 150 Guests",
        active: true,
      },
      {
        id: "ev-3",
        title: "Corporate Dinners & Mixers",
        subtitle: "Professional yet relaxed hospitality",
        category: "Corporate",
        description: "Seamless business dinners with high-speed WiFi, cocktail bar access, and custom invoice support.",
        capacity: "20 - 100 Guests",
        active: true,
      },
    ],
    banquet: {
      title: "On-Site Banquet Hall",
      subtitle: "Madhapur, Hyderabad",
      capacity: "Up to 150+ Seated Guests",
      description: "A private, self-contained event hall equipped with dedicated kitchen service, ambient dimmable chandeliers, and private washrooms.",
      features: [
        "Capacity for 150+ seated guests",
        "Dedicated multicuisine live buffet counters",
        "Full acoustic system and mic setups",
        "Private valet parking and elevator access",
        "Custom floral and theme decor options",
      ],
      phone: "+91 90596 70033",
      email: "hello@fursatkitchenbar.in",
      active: true,
    },
    catering: {
      title: "Catering & Meal Box Service",
      subtitle: "Bringing Fursat to Your Venue",
      features: [
        "Office & corporate employee lunches",
        "Individual hygienic food boxes (Veg & Non-Veg)",
        "Home functions & family gatherings",
        "Live tandoori and chaat counters on request",
        "Prompt temperature-controlled delivery in Madhapur/Hitec City",
      ],
      description: "From daily corporate lunch boxes to full-scale outdoor party catering, our culinary team delivers signature Hyderabadi and global flavors.",
      minimumOrder: "Minimum 15 boxes / 25 buffet guests",
      phone: "+91 90596 70033",
      email: "hello@fursatkitchenbar.in",
      active: true,
    },
    restaurantInfo: {
      name: "Fursat Kitchen & Bar",
      tagline: "Take a Moment. Contemporary Indian Hospitality & Artisan Mixology",
      phone: "090596 70033",
      whatsapp: "919059670033",
      email: "hello@fursatkitchenbar.in",
      address: "Capital Pk Road, Ayyappa Society, VIP Hills, Silicon Valley, Madhapur, Hyderabad, Telangana 500081",
      googleMapsUrl: "https://maps.app.goo.gl/1EFLCxT8NSQFCaEVA",
      openingHours: "Open Daily: 12:00 PM – 11:30 PM",
      hoursDetail: [
        { days: "Monday – Sunday", hours: "12:00 PM – 11:30 PM" },
        { days: "Kitchen Last Call", hours: "11:00 PM" },
        { days: "Bar Service", hours: "12:00 PM – 11:30 PM" },
      ],
      instagram: "https://instagram.com/fursatkitchenbar",
      facebook: "https://facebook.com/fursatkitchenbar",
      announcement: "Now accepting bookings for private banquets and festive catering!",
    },
  };
}

// In-memory store
const globalForContent = globalThis as unknown as {
  fursatContentStore?: WebsiteContentStore;
};

function loadContent(): WebsiteContentStore {
  const def = getDefaultContent();
  try {
    if (fs.existsSync(CONTENT_FILE_PATH)) {
      const raw = fs.readFileSync(CONTENT_FILE_PATH, "utf-8");
      const data = JSON.parse(raw);
      const merged: WebsiteContentStore = {
        offers: Array.isArray(data.offers) && data.offers.length > 0 ? data.offers : def.offers,
        customMenuItems: Array.isArray(data.customMenuItems) && data.customMenuItems.length > 0 ? data.customMenuItems : def.customMenuItems,
        gallery: Array.isArray(data.gallery) && data.gallery.length > 0 ? data.gallery : def.gallery,
        events: Array.isArray(data.events) && data.events.length > 0 ? data.events : def.events,
        banquet: data.banquet ? { ...def.banquet, ...data.banquet } : def.banquet,
        catering: data.catering ? { ...def.catering, ...data.catering } : def.catering,
        restaurantInfo: data.restaurantInfo ? { ...def.restaurantInfo, ...data.restaurantInfo } : def.restaurantInfo,
      };
      persistContent(merged);
      return merged;
    }
  } catch (err) {
    console.error("Could not load content file:", err);
  }
  persistContent(def);
  return def;
}

function persistContent(content: WebsiteContentStore) {
  try {
    fs.writeFileSync(CONTENT_FILE_PATH, JSON.stringify(content, null, 2), "utf-8");
  } catch (err) {
    console.error("Could not persist content to file:", err);
  }
}

if (!globalForContent.fursatContentStore) {
  globalForContent.fursatContentStore = loadContent();
}

const contentStore = globalForContent.fursatContentStore;

// Public Getters
export function getWebsiteContent(): WebsiteContentStore {
  return contentStore;
}

export function getOffers(): OfferItem[] {
  return contentStore.offers;
}

export function getGallery(): GalleryPhoto[] {
  return contentStore.gallery.filter((g) => g.active).sort((a, b) => a.order - b.order);
}

export function getAllGallery(): GalleryPhoto[] {
  return [...contentStore.gallery].sort((a, b) => a.order - b.order);
}

export function getEvents(): EventItem[] {
  return contentStore.events;
}

export function getBanquetInfo(): BanquetInfo {
  return contentStore.banquet;
}

export function getCateringInfo(): CateringInfo {
  return contentStore.catering;
}

export function getRestaurantInfo(): RestaurantInfo {
  return contentStore.restaurantInfo;
}

export function getMenuItems(): MenuItem[] {
  return contentStore.customMenuItems;
}

// Update functions (Staff only)
export function updateOffers(offers: OfferItem[]): OfferItem[] {
  contentStore.offers = offers;
  persistContent(contentStore);
  return contentStore.offers;
}

export function updateGallery(gallery: GalleryPhoto[]): GalleryPhoto[] {
  contentStore.gallery = gallery;
  persistContent(contentStore);
  return contentStore.gallery;
}

export function updateEvents(events: EventItem[]): EventItem[] {
  contentStore.events = events;
  persistContent(contentStore);
  return contentStore.events;
}

export function updateBanquetInfo(banquet: BanquetInfo): BanquetInfo {
  contentStore.banquet = banquet;
  persistContent(contentStore);
  return contentStore.banquet;
}

export function updateCateringInfo(catering: CateringInfo): CateringInfo {
  contentStore.catering = catering;
  persistContent(contentStore);
  return contentStore.catering;
}

export function updateRestaurantInfo(info: RestaurantInfo): RestaurantInfo {
  contentStore.restaurantInfo = info;
  persistContent(contentStore);
  return contentStore.restaurantInfo;
}

export function updateMenuItems(menuItems: MenuItem[]): MenuItem[] {
  contentStore.customMenuItems = menuItems;
  persistContent(contentStore);
  return contentStore.customMenuItems;
}

export function updateSingleMenuItem(updatedItem: MenuItem): MenuItem | null {
  const index = contentStore.customMenuItems.findIndex((i) => i.id === updatedItem.id);
  if (index === -1) {
    contentStore.customMenuItems.push(updatedItem);
  } else {
    contentStore.customMenuItems[index] = {
      ...contentStore.customMenuItems[index],
      ...updatedItem,
    };
  }
  persistContent(contentStore);
  return updatedItem;
}

export function deleteMenuItem(itemId: string): boolean {
  const initialLen = contentStore.customMenuItems.length;
  contentStore.customMenuItems = contentStore.customMenuItems.filter((i) => i.id !== itemId);
  if (contentStore.customMenuItems.length !== initialLen) {
    persistContent(contentStore);
    return true;
  }
  return false;
}
