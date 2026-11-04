export interface MenuItemVariant {
  id: string;
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  sNo?: number;
  name: string;
  category: string;
  subCategory?: string;
  price?: number;
  variants?: MenuItemVariant[];
  description?: string;
  isVeg?: boolean;
  available?: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  group: "FOOD" | "SRIMUKHI" | "BEVERAGES" | "COFFEE_TEA";
  subCategories?: string[];
}

export const MENU_CATEGORIES: MenuCategory[] = [
  { id: "all-day-breakfast", name: "ALL DAY BREAKFAST", group: "FOOD" },
  { id: "finger-bites", name: "FINGER BITES", group: "FOOD" },
  { id: "cookies", name: "COOKIES", group: "FOOD" },
  { id: "healthy-bowls", name: "HEALTHY BOWLS", group: "FOOD" },
  { id: "sandwiches-burgers", name: "SANDWICHS & BURGER'S", group: "FOOD" },
  { id: "kids-menu", name: "KID'S MENU", group: "FOOD" },
  { id: "extras-sides", name: "EXTRAS/SIDES", group: "FOOD" },
  { id: "srimukhi-menu", name: "SRIMUKHI MENU", group: "SRIMUKHI" },
  { id: "salads", name: "SALAD'S", group: "FOOD" },
  { id: "soups", name: "SOUP'S", group: "FOOD" },
  { id: "quick-bites", name: "QUICK BITES", group: "FOOD" },
  { id: "indian-south-indian-veg", name: "INDIAN & SOUTH INDIAN (VEG)", group: "FOOD" },
  { id: "indian-south-indian-non-veg", name: "INDIAN & SOUTH INDIAN (NON-VEG)", group: "FOOD" },
  { id: "tandoori", name: "TANDOORI", group: "FOOD" },
  { id: "asian", name: "ASIAN", group: "FOOD" },
  { id: "continental", name: "CONTINENTAL", group: "FOOD" },
  { id: "thin-crust-puffy", name: "THIN CRUST or PUFFY", group: "FOOD" },
  { id: "continental-mains", name: "CONTINENTAL MAIN'S", group: "FOOD" },
  { id: "pasta", name: "PASTA", group: "FOOD" },
  { id: "momos", name: "MOMOS", group: "FOOD" },
  { id: "asian-mains", name: "ASIAN MAIN'S", group: "FOOD" },
  { id: "indian-curries-veg", name: "INDIAN & SOUTH INDIAN CURRY'S (VEG)", group: "FOOD" },
  { id: "indian-curries-non-veg", name: "INDIAN & SOUTH INDIAN CURRY'S (NON-VEG)", group: "FOOD" },
  { id: "indian-breads", name: "INDIAN BREADS", group: "FOOD" },
  { id: "biryanis-pulaos", name: "BIRYANI'S & PULAO'S", group: "FOOD" },
  { id: "south-indian", name: "SOUTH INDIAN", group: "FOOD" },
  { id: "desserts", name: "DESSERT'S", group: "FOOD" },
  { id: "mocktails", name: "MOCKTAILS", group: "BEVERAGES" },
  { id: "silly-classic", name: "SILLY CLASSIC", group: "BEVERAGES" },
  { id: "the-classic", name: "THE CLASSIC", group: "BEVERAGES" },
  { id: "liit", name: "THE TALL LONG ISLAND ICED TEA", group: "BEVERAGES" },
  { id: "shooters", name: "SHOOTERS", group: "BEVERAGES" },
  { id: "single-malt", name: "SINGLE MALT (30 ML)", group: "BEVERAGES" },
  { id: "american-irish", name: "AMERICAN AND IRISH (30 ML)", group: "BEVERAGES" },
  { id: "japanese-whiskey", name: "JAPANESE WHISKEY (30 ML)", group: "BEVERAGES" },
  { id: "blended-scotch", name: "BLENDED SCOTCH WHISKEY (30 ML)", group: "BEVERAGES" },
  { id: "vodka", name: "VODKA (30 ML)", group: "BEVERAGES" },
  { id: "gin", name: "GIN (30 ML)", group: "BEVERAGES" },
  { id: "rum", name: "RUM (30 ML)", group: "BEVERAGES" },
  { id: "brandy-cognac", name: "BRANDY AND COGNAC (30 ML)", group: "BEVERAGES" },
  { id: "tequila", name: "TEQUILA (30 ML)", group: "BEVERAGES" },
  { id: "liqueur-aperitifs", name: "LIQUER AND APERITIFS (30 ML)", group: "BEVERAGES" },
  { id: "wines-white", name: "WINES WHITE (GLASS)", group: "BEVERAGES" },
  { id: "wines-red", name: "WINES RED (GLASS)", group: "BEVERAGES" },
  { id: "sparkling-wine", name: "SPARKLING WINE", group: "BEVERAGES" },
  { id: "breezer", name: "BREZZER", group: "BEVERAGES" },
  { id: "beer-bottle", name: "BEER BOTTLE", group: "BEVERAGES" },
  { id: "beer-draught-pitcher", name: "BEER DRAUGHT & PITCHER", group: "BEVERAGES" },
  { id: "soft-drinks", name: "SOFT DRINKS", group: "BEVERAGES" },
  { id: "hot-coffees", name: "HOT COFFEES", group: "COFFEE_TEA" },
  { id: "frappes-cold-coffee", name: "FRAPPES & COLD COFFEE", group: "COFFEE_TEA" },
  { id: "iced-teas", name: "ICED TEAS", group: "COFFEE_TEA" },
  { id: "milk-shakes", name: "MILK SHAKES", group: "COFFEE_TEA" },
  { id: "smoothies", name: "SMOOTHIES", group: "COFFEE_TEA" },
  { id: "hot-teas", name: "HOT TEAS", group: "COFFEE_TEA" },
];

export const ALL_MENU_ITEMS: MenuItem[] = [
  // Page 1: ALL DAY BREAKFAST
  { id: "bf-1", name: "Spinach & cheese omelete", category: "all-day-breakfast", price: 359, isVeg: false, available: true },
  { id: "bf-2", name: "Masala omelete", category: "all-day-breakfast", price: 329, isVeg: false, available: true },
  { id: "bf-3", name: "Cheese & mushroom omelete", category: "all-day-breakfast", price: 359, isVeg: false, available: true },
  { id: "bf-4", name: "OG french toasst", category: "all-day-breakfast", price: 329, isVeg: true, available: true },
  { id: "bf-5", name: "Nutella french Toast", category: "all-day-breakfast", price: 349, isVeg: true, available: true },
  { id: "bf-6", name: "Scrambled egg", category: "all-day-breakfast", price: 219, isVeg: false, available: true },

  // Page 1: Finger Bites
  {
    id: "fb-1",
    name: "Korean bun",
    category: "finger-bites",
    price: 429,
    description: "Soft bun filled with rich ream and cheese,Garlic butter, topped",
    isVeg: true,
    available: true,
  },
  { id: "fb-2", name: "Malai bun", category: "finger-bites", price: 99, isVeg: true, available: true },
  { id: "fb-3", name: "Maska bun", category: "finger-bites", price: 89, isVeg: true, available: true },
  { id: "fb-4", name: "Loaded sliders (chicken Kheema)", category: "finger-bites", price: 245, isVeg: false, available: true },
  { id: "fb-5", name: "Loaded sliders (cheese)", category: "finger-bites", price: 215, isVeg: true, available: true },

  // Page 1: Cookies
  { id: "ck-1", name: "Choco chip cookies", category: "cookies", price: 99, isVeg: true, available: true },
  { id: "ck-2", name: "Walnut cookies", category: "cookies", price: 89, isVeg: true, available: true },
  { id: "ck-3", name: "Biscoff Cookies", category: "cookies", price: 79, isVeg: true, available: true },
  { id: "ck-4", name: "caffe toffe", category: "cookies", price: 69, isVeg: true, available: true },

  // Page 1: Healthy Bowls
  { id: "hb-1", name: "Veg Healthy Protein Bowl", category: "healthy-bowls", price: 449, isVeg: true, available: true },
  { id: "hb-2", name: "Non veg Healthy Protein Bowl", category: "healthy-bowls", price: 499, isVeg: false, available: true },

  // Page 1: Sandwichs & Burger's
  { id: "sb-1", name: "Peri peri cottage cheese sandwich", category: "sandwiches-burgers", price: 395, isVeg: true, available: true },
  { id: "sb-2", name: "Chicken & cheese sandwich", category: "sandwiches-burgers", price: 445, isVeg: false, available: true },
  { id: "sb-3", name: "B.B.Q Chicken grilled sandwich", category: "sandwiches-burgers", price: 445, isVeg: false, available: true },
  { id: "sb-4", name: "Mexican Gilled veggie fried burger", category: "sandwiches-burgers", price: 445, isVeg: true, available: true },
  { id: "sb-5", name: "Grilled Sriracha paneer tikka burger", category: "sandwiches-burgers", price: 456, isVeg: true, available: true },
  { id: "sb-6", name: "Fried chicken patty burger", category: "sandwiches-burgers", price: 475, isVeg: false, available: true },
  { id: "sb-7", name: "Pulled tandoori chicken sandwich burger", category: "sandwiches-burgers", price: 485, isVeg: false, available: true },
  { id: "sb-8", name: "Lamb cheese burger", category: "sandwiches-burgers", price: 525, isVeg: false, available: true },

  // Page 2: Kid's Menu
  { id: "km-1", name: "Cheesey French Fries", category: "kids-menu", price: 295, isVeg: true, available: true },
  { id: "km-2", name: "Cheese Garlic Bread", category: "kids-menu", price: 425, isVeg: true, available: true },
  { id: "km-3", name: "Jalpeno poppers", category: "kids-menu", price: 345, isVeg: true, available: true },
  { id: "km-4", name: "Chicken Nuggets", category: "kids-menu", price: 375, isVeg: false, available: true },
  {
    id: "km-5",
    name: "Mini Pizzas",
    category: "kids-menu",
    variants: [
      { id: "veg", name: "Veg", price: 395 },
      { id: "non-veg", name: "Non-veg", price: 425 },
    ],
    available: true,
  },

  // Page 2: Extras/Sides
  { id: "ex-1", name: "Extra bread", category: "extras-sides", price: 65, isVeg: true, available: true },
  { id: "ex-2", name: "Extra Rice", category: "extras-sides", price: 155, isVeg: true, available: true },
  { id: "ex-3", name: "Extra chicken pice", category: "extras-sides", price: 185, isVeg: false, available: true },
  { id: "ex-4", name: "Extra mutton pice", category: "extras-sides", price: 225, isVeg: false, available: true },
  { id: "ex-5", name: "Extra veggies", category: "extras-sides", price: 125, isVeg: true, available: true },

  // Page 2: Srimukhi Menu
  {
    id: "sm-1",
    name: "Srimukhi Diet Salad",
    category: "srimukhi-menu",
    price: 395,
    description: "Fresh Veggies, Broccoli, Kale, Walnuts, Almonds, Dates, Drizzled with Lemony Ginger Dressing",
    isVeg: true,
    available: true,
  },
  { id: "sm-2", name: "Healthy Soup", category: "srimukhi-menu", price: 395, isVeg: true, available: true },
  { id: "sm-3", name: "Favorite Mushroom", category: "srimukhi-menu", price: 475, isVeg: true, available: true },
  { id: "sm-4", name: "Pataas Nethi Mamsam Vepudu", category: "srimukhi-menu", price: 675, isVeg: false, available: true },
  { id: "sm-5", name: "Adurs Velluli Karam Royyalu Vepudu", category: "srimukhi-menu", price: 615, isVeg: false, available: true },
  { id: "sm-6", name: "Srimukhi Ramulamma Cosmopolitan", category: "srimukhi-menu", price: 599, isVeg: true, available: true },
  { id: "sm-7", name: "Srimukhi Sundari", category: "srimukhi-menu", price: 629, isVeg: true, available: true },
  { id: "sm-8", name: "Teen Maar Steps By SM B52", category: "srimukhi-menu", price: 699, isVeg: true, available: true },
  { id: "sm-9", name: "One Anchor Srimukhi", category: "srimukhi-menu", price: 249, isVeg: true, available: true },
  { id: "sm-10", name: "SM SPL Makajona Garelu", category: "srimukhi-menu", price: 455, isVeg: true, available: true },

  // Page 3: SALAD'S
  {
    id: "sal-1",
    sNo: 1,
    name: "Fresh fruits and roasted nuts salad bowl",
    category: "salads",
    price: 375,
    description: "Assorted fresh fruits with oven roasted nuts with a Drizzle of honey and greens",
    isVeg: true,
    available: true,
  },
  {
    id: "sal-2",
    sNo: 2,
    name: "Ceasar Salad",
    category: "salads",
    description: "Romain lettuce,Roasted foxnuts,House ceasar dressing,grilled chicken",
    variants: [
      { id: "plain", name: "Classic Veg", price: 349 },
      { id: "chicken", name: "Add Chicken", price: 399 },
      { id: "prawns", name: "Add Prawns", price: 449 },
    ],
    available: true,
  },
  {
    id: "sal-3",
    sNo: 3,
    name: "Loaded Chicken and Broccoli Salad",
    category: "salads",
    price: 395,
    description: "Steamed broccollo,bell pepper,loaded nuts",
    isVeg: false,
    available: true,
  },
  {
    id: "sal-4",
    sNo: 4,
    name: "Rocketmelon Feta",
    category: "salads",
    price: 365,
    description: "Watermelon,mint leafs,rocket leafs,feta mixed with home made evoo lemon,pepper dressing",
    isVeg: true,
    available: true,
  },

  // Page 3: SOUP'S
  { id: "soup-5", sNo: 5, name: "Tomato and Basil Soup", category: "soups", subCategory: "VEG", price: 249, isVeg: true, available: true },
  { id: "soup-6", sNo: 6, name: "Cream of Broccoli Soup", category: "soups", subCategory: "VEG", price: 269, isVeg: true, available: true },
  { id: "soup-7", sNo: 7, name: "Cream of Chicken Soup", category: "soups", subCategory: "NON-VEG", price: 299, isVeg: false, available: true },
  {
    id: "soup-8",
    sNo: 8,
    name: "Asian Soup (Manchow, Sweet Corn, Hot & Sour)",
    category: "soups",
    subCategory: "NON-VEG",
    variants: [
      { id: "veg", name: "Veg", price: 249 },
      { id: "chicken", name: "Chicken", price: 289 },
      { id: "prawns", name: "Prawns", price: 329 },
    ],
    available: true,
  },
  { id: "soup-9", sNo: 9, name: "Mutton Paya Soup", category: "soups", subCategory: "PAKKA HYDERABADI SOUPS", price: 349, isVeg: false, available: true },
  { id: "soup-10", sNo: 10, name: "Mutton Muskin Marag", category: "soups", subCategory: "PAKKA HYDERABADI SOUPS", price: 369, isVeg: false, available: true },

  // Page 3: Quick Bites
  {
    id: "qb-11",
    sNo: 11,
    name: "French Fries",
    category: "quick-bites",
    variants: [
      { id: "plain", name: "Plain", price: 249 },
      { id: "peri-peri", name: "Peri Peri", price: 269 },
      { id: "truffle", name: "Truffle", price: 299 },
    ],
    isVeg: true,
    available: true,
  },
  { id: "qb-12", sNo: 12, name: "Masala Peanuts", category: "quick-bites", price: 199, isVeg: true, available: true },
  { id: "qb-13", sNo: 13, name: "Naughty Nuts Masala Papad", category: "quick-bites", price: 179, isVeg: true, available: true },
  { id: "qb-14", sNo: 14, name: "Kaju Fry", category: "quick-bites", price: 329, isVeg: true, available: true },

  // Page 3 & 4: INDIAN & SOUTH INDIAN (VEG)
  { id: "isv-15", sNo: 15, name: "Pandu Mirchi Paneer Vepudu", category: "indian-south-indian-veg", price: 395, isVeg: true, available: true },
  { id: "isv-16", sNo: 16, name: "Makka Jonna Vada", category: "indian-south-indian-veg", price: 345, isVeg: true, available: true },
  { id: "isv-17", sNo: 17, name: "Gongura Mushroom Vepudu", category: "indian-south-indian-veg", price: 375, isVeg: true, available: true },
  { id: "isv-18", sNo: 18, name: "Babycorn Velluli Karam", category: "indian-south-indian-veg", price: 345, isVeg: true, available: true },

  // Page 4: INDIAN & SOUTH INDIAN (NON-VEG)
  { id: "isnv-19", sNo: 19, name: "Guntur Karam Wings", category: "indian-south-indian-non-veg", price: 445, isVeg: false, available: true },
  { id: "isnv-20", sNo: 20, name: "Nalla Karam Kodi Vepudu", category: "indian-south-indian-non-veg", price: 445, isVeg: false, available: true },
  { id: "isnv-21", sNo: 21, name: "Fursat Spl Coriander Chicken", category: "indian-south-indian-non-veg", price: 465, isVeg: false, available: true },
  { id: "isnv-22", sNo: 22, name: "Jeedi Pappu Kodi Pakodi", category: "indian-south-indian-non-veg", price: 475, isVeg: false, available: true },
  { id: "isnv-23", sNo: 23, name: "Karivepaku Kodi Vepudu", category: "indian-south-indian-non-veg", price: 445, isVeg: false, available: true },
  { id: "isnv-24", sNo: 24, name: "Telangana Mutton Fry (with bone)", category: "indian-south-indian-non-veg", price: 595, isVeg: false, available: true },
  { id: "isnv-25", sNo: 25, name: "Nethi Mamsam Vepudu", category: "indian-south-indian-non-veg", price: 625, isVeg: false, available: true },
  { id: "isnv-26", sNo: 26, name: "Boti Fry", category: "indian-south-indian-non-veg", price: 495, isVeg: false, available: true },
  { id: "isnv-27", sNo: 27, name: "Godavari Royyala Vepudu", category: "indian-south-indian-non-veg", price: 595, isVeg: false, available: true },
  { id: "isnv-28", sNo: 28, name: "Korameenu Chepa Chips", category: "indian-south-indian-non-veg", price: 575, isVeg: false, available: true },
  { id: "isnv-29", sNo: 29, name: "Velluli Karam Kodi Guddulu", category: "indian-south-indian-non-veg", price: 325, isVeg: false, available: true },

  // Page 4: TANDOORI
  { id: "tan-30", sNo: 30, name: "Malai Cheese Broccolli", category: "tandoori", subCategory: "VEG", price: 395, isVeg: true, available: true },
  { id: "tan-31", sNo: 31, name: "Veg Boti Kebab", category: "tandoori", subCategory: "VEG", price: 375, isVeg: true, available: true },
  { id: "tan-32", sNo: 32, name: "Classic panner tikka", category: "tandoori", subCategory: "VEG", price: 395, isVeg: true, available: true },
  { id: "tan-33", sNo: 33, name: "Nawabi Chicken Tangdi Kebab", category: "tandoori", subCategory: "NON-VEG", price: 465, isVeg: false, available: true },
  {
    id: "tan-34",
    sNo: 34,
    name: "Chicken Tikka",
    category: "tandoori",
    subCategory: "NON-VEG",
    variants: [
      { id: "angara", name: "Angara", price: 445 },
      { id: "malai", name: "Malai", price: 465 },
      { id: "hariyali", name: "Hariyali", price: 445 },
    ],
    isVeg: false,
    available: true,
  },
  { id: "tan-35", sNo: 35, name: "Haleem Bomb", category: "tandoori", subCategory: "NON-VEG", price: 475, isVeg: false, available: true },
  { id: "tan-36", sNo: 36, name: "Mutton Ghee Roast with Kerala Paratha", category: "tandoori", subCategory: "NON-VEG", price: 625, isVeg: false, available: true },
  { id: "tan-37", sNo: 37, name: "Sarso vali Prawns Tikka", category: "tandoori", subCategory: "NON-VEG", price: 595, isVeg: false, available: true },
  { id: "tan-38", sNo: 38, name: "Lasooni fish tikka", category: "tandoori", subCategory: "NON-VEG", price: 545, isVeg: false, available: true },

  // Page 4: ASIAN
  { id: "asn-39", sNo: 39, name: "Mini Burmese Parcel", category: "asian", subCategory: "VEG", price: 365, isVeg: true, available: true },
  { id: "asn-40", sNo: 40, name: "Mushroom Salt and Pepper", category: "asian", subCategory: "VEG", price: 365, isVeg: true, available: true },
  { id: "asn-41", sNo: 41, name: "Honey Chilli Lotus Stem", category: "asian", subCategory: "VEG", price: 375, isVeg: true, available: true },
  { id: "asn-42", sNo: 42, name: "Crispy Corn Kernel", category: "asian", subCategory: "VEG", price: 345, isVeg: true, available: true },
  { id: "asn-43", sNo: 43, name: "loose prawns", category: "asian", subCategory: "NON-VEG", price: 575, isVeg: false, available: true },
  { id: "asn-44", sNo: 44, name: "Chilli garlic fish", category: "asian", subCategory: "NON-VEG", price: 545, isVeg: false, available: true },

  // Page 4 & 5: CONTINENTAL
  { id: "cnt-45", sNo: 45, name: "Mozerella Cheese Sticks", category: "continental", subCategory: "VEG", price: 375, isVeg: true, available: true },
  { id: "cnt-46", sNo: 46, name: "Loadded Nachos (Avacado and Salsa)", category: "continental", subCategory: "VEG", price: 395, isVeg: true, available: true },
  { id: "cnt-47", sNo: 47, name: "Chicken Loaded Nachos", category: "continental", subCategory: "NON-VEG", price: 445, isVeg: false, available: true },
  { id: "cnt-48", sNo: 48, name: "Crispy Chicken with Mayo", category: "continental", subCategory: "NON-VEG", price: 445, isVeg: false, available: true },
  { id: "cnt-49", sNo: 49, name: "Peri Peri Chicken Wings", category: "continental", subCategory: "NON-VEG", price: 445, isVeg: false, available: true },
  { id: "cnt-50", sNo: 50, name: "Jamaican Jerk Chicken with Fries", category: "continental", subCategory: "NON-VEG", price: 475, isVeg: false, available: true },
  { id: "cnt-51", sNo: 51, name: "Butter Garlic Prawns", category: "continental", subCategory: "NON-VEG", price: 595, isVeg: false, available: true },

  // Page 5: THIN CRUST or PUFFY
  {
    id: "piz-52",
    sNo: 52,
    name: "Classic Pizza Margherita",
    category: "thin-crust-puffy",
    price: 445,
    description: "Classic tomato sauce,mozerella and fresh basil on a thin crust",
    isVeg: true,
    available: true,
  },
  {
    id: "piz-53",
    sNo: 53,
    name: "Peri Peri Chicken Pizza",
    category: "thin-crust-puffy",
    price: 525,
    description: "Peri peri marinated chicken supreme on a spicy tomato base with melted gooey cheese",
    isVeg: false,
    available: true,
  },
  {
    id: "piz-54",
    sNo: 54,
    name: "Chicken Peporoni Pizza",
    category: "thin-crust-puffy",
    price: 545,
    description: "Chicken peporani glazed with spicy sauce",
    isVeg: false,
    available: true,
  },
  {
    id: "piz-55",
    sNo: 55,
    name: "Minced Lamb Pizza",
    category: "thin-crust-puffy",
    price: 595,
    description: "Minced lamb,spicy herbs on rich tomato base with cheese",
    isVeg: false,
    available: true,
  },

  // Page 5: CONTINENTAL MAIN'S
  {
    id: "cm-56",
    sNo: 56,
    name: "BBQ Grilled Chicken with Herb Rice",
    category: "continental-mains",
    price: 545,
    description: "Grilled chicken breast glazed with BBQ sauce,served with herb inflamed rice",
    isVeg: false,
    available: true,
  },
  {
    id: "cm-57",
    sNo: 57,
    name: "Chicken Stroganoff",
    category: "continental-mains",
    price: 545,
    description: "Tender Chicken stripes in creamy mushroom sauce over herbed rice",
    isVeg: false,
    available: true,
  },

  // Page 5: Pasta
  {
    id: "pas-60",
    sNo: 60,
    name: "Chicken Lasagana",
    category: "pasta",
    price: 525,
    description: "Minced Chicken hearty dish made with layers of pasta and garlic bread",
    isVeg: false,
    available: true,
  },
  {
    id: "pas-61",
    sNo: 61,
    name: "Veggie Lasagana",
    category: "pasta",
    price: 465,
    description: "Exotic vegetables,layers of pasta and garlic bread",
    isVeg: true,
    available: true,
  },
  {
    id: "pas-62",
    sNo: 62,
    name: "Alfredo Pasta",
    category: "pasta",
    variants: [
      { id: "veg", name: "Veg", price: 425 },
      { id: "chicken", name: "Chicken", price: 475 },
      { id: "prawns", name: "Prawns", price: 545 },
    ],
    available: true,
  },
  {
    id: "pas-63",
    sNo: 63,
    name: "Creamy Pesto Pasta",
    category: "pasta",
    variants: [
      { id: "veg", name: "Veg", price: 425 },
      { id: "chicken", name: "Chicken", price: 475 },
      { id: "prawns", name: "Prawns", price: 545 },
    ],
    available: true,
  },
  {
    id: "pas-64",
    sNo: 64,
    name: "Aarrabiata Pasta",
    category: "pasta",
    variants: [
      { id: "veg", name: "Veg", price: 425 },
      { id: "chicken", name: "Chicken", price: 475 },
      { id: "prawns", name: "Prawns", price: 545 },
    ],
    available: true,
  },
  {
    id: "pas-65",
    sNo: 65,
    name: "Spegetti Aglio",
    category: "pasta",
    variants: [
      { id: "veg", name: "Veg", price: 425 },
      { id: "chicken", name: "Chicken", price: 475 },
      { id: "prawns", name: "Prawns", price: 545 },
    ],
    available: true,
  },

  // Page 5: MOMOS
  { id: "momo-66", sNo: 66, name: "Thai Chilli, Basil, Chicken Momos", category: "momos", price: 395, isVeg: false, available: true },
  { id: "momo-67", sNo: 67, name: "Exotic Veg Momos", category: "momos", price: 345, isVeg: true, available: true },

  // Page 5 & 6: ASIAN MAIN'S
  { id: "am-69", sNo: 69, name: "Schezwan Paneer Wet", category: "asian-mains", price: 425, isVeg: true, available: true },
  { id: "am-70", sNo: 70, name: "Veg Dumpling and Manchurian", category: "asian-mains", price: 395, isVeg: true, available: true },
  { id: "am-71", sNo: 71, name: "Tofu and Exotic Vegetables Chow", category: "asian-mains", price: 425, isVeg: true, available: true },
  {
    id: "am-72",
    sNo: 72,
    name: "Chilli Gravy",
    category: "asian-mains",
    variants: [
      { id: "paneer", name: "Paneer / Veg", price: 395 },
      { id: "chicken", name: "Chicken", price: 445 },
      { id: "fish", name: "Fish", price: 525 },
      { id: "prawns", name: "Prawns", price: 575 },
    ],
    available: true,
  },
  {
    id: "am-73",
    sNo: 73,
    name: "Schezwan Gravy",
    category: "asian-mains",
    variants: [
      { id: "paneer", name: "Paneer / Veg", price: 395 },
      { id: "chicken", name: "Chicken", price: 445 },
      { id: "fish", name: "Fish", price: 525 },
      { id: "prawns", name: "Prawns", price: 575 },
    ],
    available: true,
  },
  { id: "am-teriyaki", name: "Teriyaki Shitake Mushroom", category: "asian-mains", price: 425, isVeg: true, available: true },
  {
    id: "am-74",
    sNo: 74,
    name: "Fried rice",
    category: "asian-mains",
    variants: [
      { id: "veg", name: "Veg", price: 345 },
      { id: "egg", name: "Egg", price: 375 },
      { id: "chicken", name: "Chicken", price: 415 },
      { id: "mix", name: "Mix", price: 465 },
    ],
    available: true,
  },
  {
    id: "am-75",
    sNo: 75,
    name: "Noodles (Choice of Schezwan/ Burnt Garlic/ Spicy Coriander)",
    category: "asian-mains",
    variants: [
      { id: "veg", name: "Veg", price: 345 },
      { id: "egg", name: "Egg", price: 375 },
      { id: "chicken", name: "Chicken", price: 415 },
      { id: "mix", name: "Mix", price: 465 },
    ],
    available: true,
  },

  // Page 6: INDIAN & SOUTH INDIAN CURRY'S (VEG)
  { id: "curv-76", sNo: 76, name: "Paneer Butter Masala", category: "indian-curries-veg", price: 395, isVeg: true, available: true },
  { id: "curv-77", sNo: 77, name: "Kadai Paneer", category: "indian-curries-veg", price: 395, isVeg: true, available: true },
  { id: "curv-78", sNo: 78, name: "Kaju Paneer", category: "indian-curries-veg", price: 445, isVeg: true, available: true },
  { id: "curv-79", sNo: 79, name: "Nizam Wali Handi", category: "indian-curries-veg", price: 385, isVeg: true, available: true },
  { id: "curv-80", sNo: 80, name: "Paneer Burji", category: "indian-curries-veg", price: 395, isVeg: true, available: true },
  { id: "curv-81", sNo: 81, name: "Dal Makhni", category: "indian-curries-veg", price: 345, isVeg: true, available: true },
  { id: "curv-82", sNo: 82, name: "Dal Fry", category: "indian-curries-veg", price: 295, isVeg: true, available: true },

  // Page 6: INDIAN & SOUTH INDIAN CURRY'S (NON-VEG)
  { id: "curnv-83", sNo: 83, name: "Telangana Chicken Curry (Homestyle)", category: "indian-curries-non-veg", price: 445, isVeg: false, available: true },
  { id: "curnv-84", sNo: 84, name: "Chettinadu Chicken", category: "indian-curries-non-veg", price: 445, isVeg: false, available: true },
  {
    id: "curnv-85",
    sNo: 85,
    name: "Butter Chicken / Kadai Chicken",
    category: "indian-curries-non-veg",
    variants: [
      { id: "butter", name: "Butter Chicken", price: 465 },
      { id: "kadai", name: "Kadai Chicken", price: 465 },
    ],
    isVeg: false,
    available: true,
  },
  { id: "curnv-86", sNo: 86, name: "Murg Methi Malaidar", category: "indian-curries-non-veg", price: 465, isVeg: false, available: true },
  { id: "curnv-87", sNo: 87, name: "Telangana Mutton Curry (Homestyle)", category: "indian-curries-non-veg", price: 595, isVeg: false, available: true },
  { id: "curnv-gongura", name: "Gongura Mamsam Curry", category: "indian-curries-non-veg", price: 615, isVeg: false, available: true },
  { id: "curnv-88", sNo: 88, name: "Mutton Kheema Curry", category: "indian-curries-non-veg", price: 595, isVeg: false, available: true },
  { id: "curnv-89", sNo: 89, name: "Mutton Rogan Josh", category: "indian-curries-non-veg", price: 615, isVeg: false, available: true },
  { id: "curnv-90", sNo: 90, name: "Egg Masala", category: "indian-curries-non-veg", price: 325, isVeg: false, available: true },

  // Page 6: INDIAN BREADS
  { id: "brd-91", sNo: 91, name: "Tandoori Roti", category: "indian-breads", price: 60, isVeg: true, available: true },
  { id: "brd-92", sNo: 92, name: "Butter Roti", category: "indian-breads", price: 70, isVeg: true, available: true },
  { id: "brd-93", sNo: 93, name: "Plain Naan", category: "indian-breads", price: 75, isVeg: true, available: true },
  { id: "brd-94", sNo: 94, name: "Butter Naan", category: "indian-breads", price: 85, isVeg: true, available: true },
  { id: "brd-95", sNo: 95, name: "Laccha Paratha", category: "indian-breads", price: 90, isVeg: true, available: true },
  { id: "brd-96", sNo: 96, name: "Aloo Paratha", category: "indian-breads", price: 110, isVeg: true, available: true },
  { id: "brd-97", sNo: 97, name: "Plain Kulcha", category: "indian-breads", price: 85, isVeg: true, available: true },
  { id: "brd-98", sNo: 98, name: "Masala Kulcha", category: "indian-breads", price: 110, isVeg: true, available: true },
  { id: "brd-99", sNo: 99, name: "Cheese Kulcha", category: "indian-breads", price: 145, isVeg: true, available: true },
  { id: "brd-100", sNo: 100, name: "Phulka (2pcs)", category: "indian-breads", price: 70, isVeg: true, available: true },

  // Page 6 & 7: BIRYANI'S & PULAO'S
  { id: "bir-101", sNo: 101, name: "Fursat Spl Chicken Pulao", category: "biryanis-pulaos", price: 445, isVeg: false, available: true },
  { id: "bir-102", sNo: 102, name: "Chicken Fry Piece Pulao", category: "biryanis-pulaos", price: 445, isVeg: false, available: true },
  { id: "bir-103", sNo: 103, name: "Pachi Mirchi Kodi Pulao", category: "biryanis-pulaos", price: 445, isVeg: false, available: true },
  { id: "bir-104", sNo: 104, name: "Ulavacharu Kodi Pulao", category: "biryanis-pulaos", price: 465, isVeg: false, available: true },
  { id: "bir-105", sNo: 105, name: "Chicken 65 Biryani", category: "biryanis-pulaos", price: 445, isVeg: false, available: true },
  { id: "bir-106", sNo: 106, name: "Chicken Dum Biryani", category: "biryanis-pulaos", price: 425, isVeg: false, available: true },
  { id: "bir-107", sNo: 107, name: "Special Boneless Chicken Biryani", category: "biryanis-pulaos", price: 465, isVeg: false, available: true },
  { id: "bir-108", sNo: 108, name: "Erra Karam Rambo Biryani", category: "biryanis-pulaos", price: 465, isVeg: false, available: true },
  { id: "bir-109", sNo: 109, name: "Mutton Fry Piece Biryani", category: "biryanis-pulaos", price: 595, isVeg: false, available: true },
  { id: "bir-110", sNo: 110, name: "Mutton Kheema Kaju Pulao", category: "biryanis-pulaos", price: 625, isVeg: false, available: true },
  { id: "bir-111", sNo: 111, name: "Ulavacharu Mutton Pulao", category: "biryanis-pulaos", price: 625, isVeg: false, available: true },
  { id: "bir-112", sNo: 112, name: "Gongura Mutton Pulao", category: "biryanis-pulaos", price: 625, isVeg: false, available: true },
  { id: "bir-113", sNo: 113, name: "Ustad Special Nalli Gosht Biryani", category: "biryanis-pulaos", price: 695, isVeg: false, available: true },
  { id: "bir-114", sNo: 114, name: "Bheemavaram Royyala Pulao", category: "biryanis-pulaos", price: 595, isVeg: false, available: true },
  { id: "bir-115", sNo: 115, name: "Egg Biryani", category: "biryanis-pulaos", price: 345, isVeg: false, available: true },
  { id: "bir-116", sNo: 116, name: "Kaju Paneer Pulao", category: "biryanis-pulaos", price: 425, isVeg: true, available: true },
  { id: "bir-117", sNo: 117, name: "Paneer Biryani", category: "biryanis-pulaos", price: 395, isVeg: true, available: true },
  { id: "bir-118", sNo: 118, name: "Gongura Mushroom Pulao", category: "biryanis-pulaos", price: 395, isVeg: true, available: true },
  { id: "bir-119", sNo: 119, name: "Veg Biryani", category: "biryanis-pulaos", price: 365, isVeg: true, available: true },
  { id: "bir-120", sNo: 120, name: "Bagara Rice", category: "biryanis-pulaos", price: 245, isVeg: true, available: true },
  { id: "bir-121", sNo: 121, name: "Jeera Rice", category: "biryanis-pulaos", price: 245, isVeg: true, available: true },
  { id: "bir-122", sNo: 122, name: "Sambar Rice", category: "biryanis-pulaos", price: 245, isVeg: true, available: true },
  { id: "bir-123", sNo: 123, name: "Dal Kichidi", category: "biryanis-pulaos", price: 265, isVeg: true, available: true },
  { id: "bir-124", sNo: 124, name: "Ragi Sangati", category: "biryanis-pulaos", price: 195, isVeg: true, available: true },
  { id: "bir-125", sNo: 125, name: "Plain Rice", category: "biryanis-pulaos", price: 145, isVeg: true, available: true },
  { id: "bir-126", sNo: 126, name: "Curd Rice", category: "biryanis-pulaos", price: 195, isVeg: true, available: true },

  // Page 7: SOUTH INDIAN
  { id: "si-127", sNo: 127, name: "Ragi Sangati Natukodi Pulusu", category: "south-indian", price: 545, isVeg: false, available: true },
  { id: "si-128", sNo: 128, name: "Ghee Rice with Telangana Chicken Curry", category: "south-indian", price: 495, isVeg: false, available: true },
  { id: "si-129", sNo: 129, name: "Sambar Rice with Buhari Chicken 65", category: "south-indian", price: 475, isVeg: false, available: true },
  { id: "si-130", sNo: 130, name: "Dalcha Mutton with Bagara Rice", category: "south-indian", price: 595, isVeg: false, available: true },
  { id: "si-muddapappu-aloo", name: "Muddapappu Avakaya Annam with Aloo Chips", category: "south-indian", price: 345, isVeg: true, available: true },
  { id: "si-coconut-rice", name: "Coconut Rice with Chettinadu Chicken", category: "south-indian", price: 495, isVeg: false, available: true },
  { id: "si-muddapappu-kodi", name: "Muddapappu Avakaya Annam with Karimnagar Kodi Vepudu", category: "south-indian", price: 495, isVeg: false, available: true },
  { id: "si-pachi-pulusu", name: "Pachi Pulusu Annam with Nethi Royyala Vepudu", category: "south-indian", price: 595, isVeg: false, available: true },
  { id: "si-131", sNo: 131, name: "Ragi Sangati Guttivankaya Palli Chutney", category: "south-indian", price: 395, isVeg: true, available: true },
  { id: "si-132", sNo: 132, name: "Sambar Rice with Aloo Chips", category: "south-indian", price: 295, isVeg: true, available: true },

  // Page 7 & 8: DESSERT'S
  { id: "des-133", sNo: 133, name: "Crème Brulee", category: "desserts", price: 345, isVeg: true, available: true },
  { id: "des-134", sNo: 134, name: "Death By Chocolate", category: "desserts", price: 365, isVeg: true, available: true },
  { id: "des-135", sNo: 135, name: "Biscoff Cheesecake", category: "desserts", price: 385, isVeg: true, available: true },
  { id: "des-136", sNo: 136, name: "Bluberry cheese cake", category: "desserts", price: 385, isVeg: true, available: true },
  { id: "des-137", sNo: 137, name: "Strawberry cheese cake", category: "desserts", price: 385, isVeg: true, available: true },
  { id: "des-138", sNo: 138, name: "Viral Kunafa Cheese Cake", category: "desserts", price: 425, isVeg: true, available: true },
  { id: "des-139", sNo: 139, name: "Tiramasu", category: "desserts", price: 365, isVeg: true, available: true },
  { id: "des-140", sNo: 140, name: "Tres leches", category: "desserts", price: 345, isVeg: true, available: true },
  { id: "des-141", sNo: 141, name: "Apricot Delight", category: "desserts", price: 295, isVeg: true, available: true },
  { id: "des-142", sNo: 142, name: "Chocolate Brownies", category: "desserts", price: 275, isVeg: true, available: true },
  { id: "des-143", sNo: 143, name: "Honeymoon Jamun", category: "desserts", price: 245, isVeg: true, available: true },

  // Page 8: MOCKTAILS
  {
    id: "mock-1",
    name: "SAROJA X PRESS",
    category: "mocktails",
    price: 249,
    description: "Litche Juice, Vanilla Ice Cream, Blue Curraco Syrup",
    isVeg: true,
    available: true,
  },
  {
    id: "mock-2",
    name: "JYOTHI LAXMI",
    category: "mocktails",
    price: 249,
    description: "Fresh watermelon, Basil leaves, passionfruit syrup, top up ginger ale",
    isVeg: true,
    available: true,
  },
  {
    id: "mock-3",
    name: "FURSAT RAHASYAM",
    category: "mocktails",
    price: 299,
    description: "Barman Specials",
    isVeg: true,
    available: true,
  },
  {
    id: "mock-4",
    name: "JAMU RATRI",
    category: "mocktails",
    price: 269,
    description: "Kiwi, Mint leaves, Orange, Sweet & Sour, Topup with Soda",
    isVeg: true,
    available: true,
  },
  {
    id: "mock-5",
    name: "ONE MEN ARMY",
    category: "mocktails",
    price: 249,
    description: "Strawberry, Blue berry infeed syrup, Pineapple juice",
    isVeg: true,
    available: true,
  },
  {
    id: "mock-6",
    name: "FASAK",
    category: "mocktails",
    price: 299,
    description: "Cucumber Juice, Coconut water, Sweet & Sour",
    isVeg: true,
    available: true,
  },
  {
    id: "mock-7",
    name: "JABILI",
    category: "mocktails",
    price: 249,
    description: "Pineapple Juice, Cococnut Syrup, Lemon Juice, Triple Sec",
    isVeg: true,
    available: true,
  },
  {
    id: "mock-8",
    name: "Madhu vaani",
    category: "mocktails",
    price: 299,
    description: "Kiwi,pineapple juice, sweet & soup top up soda",
    isVeg: true,
    available: true,
  },
  {
    id: "mock-9",
    name: "Chilipi chandra",
    category: "mocktails",
    price: 299,
    description: "Rose syrup, Apple juice & Ice cream",
    isVeg: true,
    available: true,
  },
  {
    id: "mock-10",
    name: "Sandya Ragam",
    category: "mocktails",
    price: 299,
    description: "Balck current, soda , sprite , toped with frozen mango",
    isVeg: true,
    available: true,
  },
  { id: "mock-11", name: "VIRGIN MOJITO", category: "mocktails", price: 299, isVeg: true, available: true },
  { id: "mock-12", name: "BLUE LAGOON", category: "mocktails", price: 249, isVeg: true, available: true },
  { id: "mock-13", name: "VIRGIN PINACOLADO", category: "mocktails", price: 299, isVeg: true, available: true },
  { id: "mock-14", name: "FRUIT PUNCH", category: "mocktails", price: 399, isVeg: true, available: true },

  // Page 8 & 9: SILLY CLASSIC
  {
    id: "sc-1",
    name: "LIFE FURSAT BHAI",
    category: "silly-classic",
    price: 629,
    description: "Vodka, Elderflower syrup, Apple juice, Citric.",
    available: true,
  },
  {
    id: "sc-2",
    name: "MAYA LOKAM",
    category: "silly-classic",
    price: 629,
    description: "Vodka, Cinnamon Syrup, Orange Juice, Coffee.",
    available: true,
  },
  {
    id: "sc-3",
    name: "THAGGEDELE",
    category: "silly-classic",
    price: 629,
    description: "Rum, Passion Fruit Syrup, Coriander, Cucumber, Tobacco, Pineapple.",
    available: true,
  },
  {
    id: "sc-4",
    name: "SUNDARI",
    category: "silly-classic",
    price: 629,
    description: "Rum, Hibiscus Syrup, Sweet & Sour Egg White.",
    available: true,
  },
  {
    id: "sc-5",
    name: "BULLET",
    category: "silly-classic",
    price: 629,
    description: "Tequila, Grape Fruit Puree, Olive Brine, Cactus Syrup.",
    available: true,
  },
  {
    id: "sc-6",
    name: "SILK",
    category: "silly-classic",
    price: 629,
    description: "Gin, Infeed Syrup, Sweet & Sour, Top up soda",
    available: true,
  },
  {
    id: "sc-7",
    name: "MONAGADU",
    category: "silly-classic",
    price: 629,
    description: "Whisky, Peach Syrup, Bitter, Sweet & Sour",
    available: true,
  },
  {
    id: "sc-8",
    name: "JAI BALAYA",
    category: "silly-classic",
    price: 629,
    description: "Gin, Watermelon Chunks, Basil leaves, Passionfruit Syrup",
    available: true,
  },
  {
    id: "sc-9",
    name: "3 IDIOTS",
    category: "silly-classic",
    price: 629,
    description: "White rum, Malai Coconut Water, Garnish with White Umbrella",
    available: true,
  },
  {
    id: "sc-10",
    name: "Raajasam",
    category: "silly-classic",
    price: 629,
    description: "Wiskye with orange infused with cinnamon & rose merry",
    available: true,
  },
  { id: "sc-11", name: "Beer raigni", category: "silly-classic", price: 629, available: true },
  {
    id: "sc-12",
    name: "Mamidi maya",
    category: "silly-classic",
    price: 629,
    description: "Raw mango and gin with sprite top up",
    available: true,
  },
  {
    id: "sc-13",
    name: "Gongura muchatlu",
    category: "silly-classic",
    price: 629,
    description: "soreal leaf with green chilli's and vodka",
    available: true,
  },

  // Page 9: THE CLASSIC
  { id: "tc-1", name: "MOSCOW MULE", category: "the-classic", price: 549, description: "VODKA, GINGER BEER, LIME", available: true },
  { id: "tc-2", name: "MANHATTAN", category: "the-classic", price: 549, description: "BORBAN WHISKEY, RED VERMOUTH, Angostura bitters", available: true },
  { id: "tc-3", name: "COSMOPOLITAN", category: "the-classic", price: 549, description: "Vodka, Cranberry juice, Lime Juice and Triple sec.", available: true },
  { id: "tc-4", name: "Old Fashion", category: "the-classic", price: 549, description: "Bourbon whiskey, orange bitters, sugar cube", available: true },
  { id: "tc-5", name: "NIGRONI", category: "the-classic", price: 549, description: "Gin, Sweet vermouth and Campari.", available: true },
  { id: "tc-6", name: "CLASSIC MARTINI", category: "the-classic", price: 549, description: "Gin, Vermouth Blanco and Olives.", available: true },
  { id: "tc-7", name: "MOJITO", category: "the-classic", price: 549, description: "Rum, Fresh mint and Sweet and sour.", available: true },
  { id: "tc-8", name: "MARGARITA", category: "the-classic", price: 549, description: "Tequila, Lime Juice and Triple sec.", available: true },
  { id: "tc-9", name: "DAIQUIRI", category: "the-classic", price: 549, description: "Rum, Lime and Triple sec.", available: true },
  { id: "tc-10", name: "GIMLET", category: "the-classic", price: 549, description: "Gin, sugar syrup, lime juice", available: true },
  { id: "tc-11", name: "SANGRIA [Red/White]", category: "the-classic", price: 849, description: "Red wine, White wine and Rose wine", available: true },
  { id: "tc-12", name: "Smokey Tequila", category: "the-classic", price: 999, available: true },

  // Page 9: THE TALL LONG ISLAND ICED TEA
  { id: "liit-1", name: "LONG ISLAND ICED TEA (classic)", category: "liit", price: 799, available: true },
  { id: "liit-2", name: "ELECTRIC ICED TEA (GINGER ALE)", category: "liit", price: 799, available: true },
  { id: "liit-3", name: "VILLAGE RIVER", category: "liit", price: 799, available: true },
  { id: "liit-4", name: "BULLFROG (Red bull)", category: "liit", price: 799, available: true },
  { id: "liit-5", name: "LIIT - 500ml", category: "liit", price: 1199, available: true },
  { id: "liit-6", name: "LIIT - 1 Ltr", category: "liit", price: 1699, available: true },

  // Page 9: SHOOTERS
  { id: "sho-1", name: "KAMIKAZE", category: "shooters", price: 329, available: true },
  { id: "sho-2", name: "LIP KISS", category: "shooters", price: 369, available: true },
  { id: "sho-3", name: "LONG DRIVE", category: "shooters", price: 329, available: true },
  { id: "sho-4", name: "JAGER BOMB", category: "shooters", price: 749, available: true },
  { id: "sho-5", name: "B52", category: "shooters", price: 699, available: true },
  { id: "sho-6", name: "LAMBORGHINI", category: "shooters", price: 1699, available: true },

  // Page 9: SINGLE MALT (30 ML)
  { id: "sm-malt-1", name: "GLENLIVET 12 Yrs.", category: "single-malt", price: 859, available: true },
  { id: "sm-malt-2", name: "GLENFIDDICH 12 Yrs.", category: "single-malt", price: 849, available: true },
  { id: "sm-malt-3", name: "TALISKER 10 Yrs", category: "single-malt", price: 829, available: true },
  { id: "sm-malt-4", name: "MONKEY SHOLDER", category: "single-malt", price: 699, available: true },
  { id: "sm-malt-5", name: "INDIRI", category: "single-malt", price: 599, available: true },

  // Page 10: AMERICAN AND IRISH (30 ML)
  { id: "ai-1", name: "JACK DANIEL'S No 7", category: "american-irish", price: 499, available: true },
  { id: "ai-2", name: "JAMESON", category: "american-irish", price: 429, available: true },
  { id: "ai-3", name: "JIM BEAM", category: "american-irish", price: 329, available: true },

  // Page 10: JAPANESE WHISKEY (30 ML)
  { id: "jw-1", name: "TOKI SUNTORY WHISKEY", category: "japanese-whiskey", price: 749, available: true },

  // Page 10: BLENDED SCOTCH WHISKEY (30 ML)
  { id: "bsw-1", name: "ROYAL SALUTE 21 Yrs.", category: "blended-scotch", price: 2999, available: true },
  { id: "bsw-2", name: "CHIVAS REGAL 12 Yrs.", category: "blended-scotch", price: 599, available: true },
  { id: "bsw-3", name: "J.W BLACK LABEL", category: "blended-scotch", price: 599, available: true },
  { id: "bsw-4", name: "J.W RED LABEL", category: "blended-scotch", price: 349, available: true },
  { id: "bsw-5", name: "TEACHER'S 50", category: "blended-scotch", price: 399, available: true },
  { id: "bsw-6", name: "TEACHER'S HIGHLAND", category: "blended-scotch", price: 349, available: true },
  { id: "bsw-7", name: "BALLANTINE'S FINEST", category: "blended-scotch", price: 399, available: true },
  { id: "bsw-8", name: "DEWAR'S WHITE LABEL", category: "blended-scotch", price: 349, available: true },
  { id: "bsw-9", name: "BLACK DOG REGULAR", category: "blended-scotch", price: 349, available: true },
  { id: "bsw-10", name: "100 PIPERS REGULAR", category: "blended-scotch", price: 349, available: true },
  { id: "bsw-11", name: "BLACK & WHITE", category: "blended-scotch", price: 349, available: true },

  // Page 10: VODKA (30 ML)
  { id: "vod-1", name: "GREY GOOSE", category: "vodka", price: 499, available: true },
  { id: "vod-2", name: "KETEL ONE", category: "vodka", price: 399, available: true },
  { id: "vod-3", name: "ABSOLUT", category: "vodka", price: 349, available: true },
  { id: "vod-4", name: "SMIRNOFF", category: "vodka", price: 249, available: true },

  // Page 10: GIN (30 ML)
  { id: "gin-1", name: "BOMBAY SAPPHIRE", category: "gin", price: 349, available: true },
  { id: "gin-2", name: "BEEFEATER", category: "gin", price: 319, available: true },
  { id: "gin-3", name: "GREATER THAN", category: "gin", price: 249, available: true },
  { id: "gin-4", name: "ROKU THE JAPANESE CRAFT", category: "gin", price: 629, available: true },

  // Page 10: RUM (30 ML)
  { id: "rum-1", name: "BACARDI WHITE", category: "rum", price: 249, available: true },
  { id: "rum-2", name: "OLD MONK XXX", category: "rum", price: 199, available: true },
  { id: "rum-3", name: "OLD MONK LEGEND", category: "rum", price: 249, available: true },

  // Page 10: BRANDY AND COGNAC (30 ML)
  { id: "bc-1", name: "HENNESSY - VSOP", category: "brandy-cognac", price: 739, available: true },
  { id: "bc-2", name: "MORPHUS", category: "brandy-cognac", price: 249, available: true },
  { id: "bc-3", name: "MANSION HOUSE XO", category: "brandy-cognac", price: 199, available: true },

  // Page 10 & 11: TEQUILA (30 ML)
  { id: "teq-1", name: "JOSE CUERVO", category: "tequila", price: 469, available: true },
  { id: "teq-2", name: "DON ANGLE", category: "tequila", price: 499, available: true },
  { id: "teq-3", name: "DESMONDJI 51 AGAVE", category: "tequila", price: 279, available: true },

  // Page 11: LIQUER AND APERITIFS (30 ML)
  { id: "la-1", name: "JAGERMEISTER", category: "liqueur-aperitifs", price: 649, available: true },
  { id: "la-2", name: "BAILEYS IRISH CREAM", category: "liqueur-aperitifs", price: 499, available: true },
  { id: "la-3", name: "KAHLUA", category: "liqueur-aperitifs", price: 349, available: true },

  // Page 11: WINES WHITE (GLASS)
  { id: "ww-1", name: "JACOB'S CREEK CHARDONNAY", category: "wines-white", price: 1499, available: true },
  { id: "ww-2", name: "SULA DINDORI CHARDONNAY", category: "wines-white", price: 799, available: true },
  { id: "ww-3", name: "SULA CHINEN BLANC", category: "wines-white", price: 799, available: true },

  // Page 11: WINES RED (GLASS)
  { id: "wr-1", name: "JACOB'S CREEK - CABERNET SHIRAZ", category: "wines-red", price: 1499, available: true },
  { id: "wr-2", name: "SULA SATORY", category: "wines-red", price: 799, available: true },
  { id: "wr-3", name: "SULA CABERNET SHIRAZ", category: "wines-red", price: 799, available: true },

  // Page 11: SPARKLING WINE
  { id: "spw-1", name: "SULA BRUT", category: "sparkling-wine", price: 899, available: true },

  // Page 11: BREZZER
  { id: "brz-1", name: "AVAILABLE FLAVOURS", category: "breezer", price: 399, available: true },

  // Page 11: BEER BOTTLE
  { id: "beer-1", name: "HOEGAARDEN", category: "beer-bottle", price: 749, available: true },
  { id: "beer-2", name: "CORONA", category: "beer-bottle", price: 699, available: true },
  { id: "beer-3", name: "HEINIKEN", category: "beer-bottle", price: 549, available: true },
  { id: "beer-4", name: "BUDWEISER MAGNUM", category: "beer-bottle", price: 459, available: true },
  { id: "beer-5", name: "BUDWEISER", category: "beer-bottle", price: 419, available: true },
  { id: "beer-6", name: "KINGFISHER ULTRA", category: "beer-bottle", price: 419, available: true },
  { id: "beer-7", name: "KINGFISHER ULTRA MAX", category: "beer-bottle", price: 459, available: true },

  // Page 11: BEER DRAUGHT & PITCHER
  { id: "bdp-1", name: "KF DRAUGHT (330 ML)", category: "beer-draught-pitcher", price: 299, available: true },
  { id: "bdp-2", name: "GEIST (330 ML)", category: "beer-draught-pitcher", price: 399, available: true },
  { id: "bdp-3", name: "KF DRAUGHT (PITCHER)", category: "beer-draught-pitcher", price: 1199, available: true },
  { id: "bdp-4", name: "GEIST (PITCHER)", category: "beer-draught-pitcher", price: 1599, available: true },

  // Page 11 & 12: SOFT DRINKS
  { id: "sd-1", name: "RED BULL", category: "soft-drinks", price: 249, isVeg: true, available: true },
  { id: "sd-2", name: "FRESH JUICE", category: "soft-drinks", price: 149, isVeg: true, available: true },
  { id: "sd-3", name: "GINGER ALE", category: "soft-drinks", price: 129, isVeg: true, available: true },
  { id: "sd-4", name: "TONIC WATER", category: "soft-drinks", price: 129, isVeg: true, available: true },
  { id: "sd-5", name: "FRESH LIME SODA", category: "soft-drinks", price: 129, isVeg: true, available: true },
  { id: "sd-6", name: "CANNED JUICE", category: "soft-drinks", price: 99, isVeg: true, available: true },
  { id: "sd-7", name: "SPRITE", category: "soft-drinks", price: 99, isVeg: true, available: true },
  { id: "sd-8", name: "THUMBS UP", category: "soft-drinks", price: 99, isVeg: true, available: true },
  { id: "sd-9", name: "DIET COKE", category: "soft-drinks", price: 99, isVeg: true, available: true },
  { id: "sd-10", name: "SODA DECANTER", category: "soft-drinks", price: 49, isVeg: true, available: true },
  { id: "sd-11", name: "BOTTLE WATER", category: "soft-drinks", price: 30, isVeg: true, available: true },

  // Page 12: HOT COFFEES
  { id: "cof-1", name: "ESPRESSO", category: "hot-coffees", price: 139, isVeg: true, available: true },
  { id: "cof-2", name: "AMERICANO", category: "hot-coffees", price: 199, isVeg: true, available: true },
  { id: "cof-3", name: "CAPPUCCINO", category: "hot-coffees", price: 219, isVeg: true, available: true },
  { id: "cof-4", name: "CAFE LATTE", category: "hot-coffees", price: 229, isVeg: true, available: true },
  { id: "cof-5", name: "CAFE MOCHA", category: "hot-coffees", price: 239, isVeg: true, available: true },
  { id: "cof-6", name: "AFFAGATO", category: "hot-coffees", price: 249, isVeg: true, available: true },
  { id: "cof-7", name: "FLAT WHITE", category: "hot-coffees", price: 229, isVeg: true, available: true },
  { id: "cof-8", name: "VANILLA LATTE", category: "hot-coffees", price: 239, isVeg: true, available: true },
  { id: "cof-9", name: "HAZALNUT LATTE", category: "hot-coffees", price: 239, isVeg: true, available: true },
  { id: "cof-10", name: "CARAMEL LATTE", category: "hot-coffees", price: 239, isVeg: true, available: true },
  { id: "cof-11", name: "VIETNAMESE", category: "hot-coffees", price: 229, isVeg: true, available: true },
  { id: "cof-12", name: "CARTADO", category: "hot-coffees", price: 229, isVeg: true, available: true },
  { id: "cof-13", name: "MACCHIATO", category: "hot-coffees", price: 249, isVeg: true, available: true },
  { id: "cof-14", name: "HOT CHOCOLATE", category: "hot-coffees", price: 269, isVeg: true, available: true },

  // Page 12: FRAPPES & COLD COFFEE
  { id: "fcc-1", name: "CLASSIC COLD COFFEE", category: "frappes-cold-coffee", price: 269, isVeg: true, available: true },
  { id: "fcc-2", name: "HAZELNUT & CHOCOLATE FRAPPE", category: "frappes-cold-coffee", price: 299, isVeg: true, available: true },
  { id: "fcc-3", name: "CARAMEL & NUTS FRAPPE", category: "frappes-cold-coffee", price: 279, isVeg: true, available: true },
  { id: "fcc-4", name: "BISCOFF FRAPPE", category: "frappes-cold-coffee", price: 349, isVeg: true, available: true },
  { id: "fcc-5", name: "BROWNIE TOASTED NUTS FRAPPE", category: "frappes-cold-coffee", price: 279, isVeg: true, available: true },
  { id: "fcc-6", name: "CHOCOLATE FRAPPE", category: "frappes-cold-coffee", price: 269, isVeg: true, available: true },
  { id: "fcc-7", name: "BANANA PEANUT MOCHA", category: "frappes-cold-coffee", price: 279, isVeg: true, available: true },
  { id: "fcc-8", name: "CHOCOLATE MOCHA FRAPPE", category: "frappes-cold-coffee", price: 299, isVeg: true, available: true },

  // Page 12 & 13: ICED TEAS
  { id: "ict-1", name: "ICED AMERICANO", category: "iced-teas", price: 239, isVeg: true, available: true },
  { id: "ict-2", name: "ICED LATTE", category: "iced-teas", price: 249, isVeg: true, available: true },
  { id: "ict-3", name: "ICED MOCHA", category: "iced-teas", price: 269, isVeg: true, available: true },
  { id: "ict-4", name: "ICED HAZELNUT", category: "iced-teas", price: 269, isVeg: true, available: true },
  { id: "ict-5", name: "ICED VIETNAMESE", category: "iced-teas", price: 279, isVeg: true, available: true },

  // Page 13: MILK SHAKES
  { id: "msh-1", name: "OREO CHEESE SHAKE", category: "milk-shakes", price: 269, isVeg: true, available: true },
  { id: "msh-2", name: "CHOCOLATE & BANANA SHAKE", category: "milk-shakes", price: 299, isVeg: true, available: true },
  { id: "msh-3", name: "CREAMY BISCOFF SHAKE", category: "milk-shakes", price: 329, isVeg: true, available: true },
  { id: "msh-4", name: "BROWNIE CHOCOLATE SHAKE", category: "milk-shakes", price: 299, isVeg: true, available: true },
  { id: "msh-5", name: "CARAMEL & PEANUT BUTTER SHAKE", category: "milk-shakes", price: 279, isVeg: true, available: true },
  { id: "msh-6", name: "TENDER COCONUT SHAKE", category: "milk-shakes", price: 299, isVeg: true, available: true },
  { id: "msh-7", name: "STRAWBERRY SHAKE", category: "milk-shakes", price: 279, isVeg: true, available: true },
  { id: "msh-8", name: "BLACK CURRENT SHAKE", category: "milk-shakes", price: 279, isVeg: true, available: true },

  // Page 13: SMOOTHIES
  { id: "smo-1", name: "CREAMY MANGO SMOOTHIE", category: "smoothies", price: 269, isVeg: true, available: true },
  { id: "smo-2", name: "AVOCADO & SPANICH SMOOTHIE", category: "smoothies", price: 349, isVeg: true, available: true },
  { id: "smo-3", name: "BLUE BERRY & COOKIE SMOOTHIE", category: "smoothies", price: 299, isVeg: true, available: true },
  { id: "smo-4", name: "MIX BERRY SMOOTHIE", category: "smoothies", price: 299, isVeg: true, available: true },

  // Page 13: HOT TEAS
  { id: "tea-1", name: "CHAI", category: "hot-teas", price: 99, isVeg: true, available: true },
  { id: "tea-2", name: "GINGER HONEY TEA", category: "hot-teas", price: 129, isVeg: true, available: true },
  { id: "tea-3", name: "GREEN TEA", category: "hot-teas", price: 129, isVeg: true, available: true },
  { id: "tea-4", name: "ASSAM BLACK TEA", category: "hot-teas", price: 119, isVeg: true, available: true },
  { id: "tea-5", name: "LEMON TEA", category: "hot-teas", price: 129, isVeg: true, available: true },
  { id: "tea-6", name: "MASALA TEA", category: "hot-teas", price: 129, isVeg: true, available: true },
  { id: "tea-7", name: "GOLD MILK", category: "hot-teas", price: 189, isVeg: true, available: true },
  { id: "tea-8", name: "CANNED JUICE", category: "hot-teas", price: 119, isVeg: true, available: true },
  { id: "tea-9", name: "SOFT DRINK", category: "hot-teas", price: 99, isVeg: true, available: true },
  { id: "tea-10", name: "WATER BOTTEL", category: "hot-teas", price: 30, isVeg: true, available: true },
];
