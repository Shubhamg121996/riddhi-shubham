import haldiImg from "@/assets/event-haldi.jpg";
import weddingImg from "@/assets/event-wedding.jpg";
import varmalaImg from "@/assets/event-varmala.jpg";
import ringCeremonyImg from "@/assets/event-ring-ceremony.jpg";

export interface TimelineStep {
  time: string;
  title: string;
}

export interface MenuSection {
  title: string;
  items: string[];
}

export interface WeddingEvent {
  id: string;
  name: string;
  date: string;
  time: string;
  venue: string;
  venueAddress: string;
  dressCode: string;
  description: string;
  image: string;
  category: "all" | "family" | "close-friends";
  mapUrl: string;
  notes?: string;
  meal?: string;
  timeline?: TimelineStep[];
  menu?: MenuSection[];
  displayName?: string;
  displayDate?: string;
  displayTime?: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  caption?: string;
  uploadedBy?: string;
}

export interface CoupleStoryItem {
  year: string;
  title: string;
  description: string;
}


export const coupleName = "Riddhi & Shubham";
export const googleDriveGalleryUrl = "https://drive.google.com/drive/folders/1xIWkmIG0L9mAvU9aGxuxoX-RCZylWnmm?usp=sharing";

export const weddingDate = new Date("2026-12-04T09:00:00");

export const lotusResortMapUrl = "https://maps.app.goo.gl/dNV1mybEYTtfpgqK7";
const venueAddress = "Lotus Resort, Vidhan Sabha Road, Raipur";

export const events: WeddingEvent[] = [
  {
    id: "haldi",
    name: "Haldi Ceremony",
    date: "December 4, 2026",
    time: "11:00 AM – 2:00 PM",
    venue: "Swimming Pool",
    venueAddress,
    dressCode: "Yellow & White Traditional",
    description: "A joyous ceremony where turmeric paste is applied to bless the couple, followed by a lively pool party. Join us for music, laughter, and golden celebrations under the sun.",
    image: haldiImg,
    category: "all",
    mapUrl: lotusResortMapUrl,
    meal: "Breakfast & Lunch",
    notes: "Followed by a pool party — please wear clothes you don't mind getting turmeric and water on!",
    menu: [
      {
        title: "Breakfast",
        items: [
          "Cut Fruit",
          "Poha with Barik Sev, Barik Pyaj & Nimbu",
          "Aloo Paratha with Plain Curd",
          "Milk & Cornflakes",
          "Jalebi",
          "Cookies & Biscuits",
          "Tea, Coffee",
        ],
      },
      {
        title: "Haldi Lunch",
        items: [
          "Green Salad",
          "Sattu Litti",
          "Baigan Bharta",
          "Aloo Chokha",
          "Mix Veg",
          "Dal Tadka",
          "Tawa Roti",
          "Roasted Papad",
          "Jeera Rice",
          "Kadhi Pakodi",
          "Paneer Tikka & Buti",
          "Mini Rasmalai",
          "Sandesh",
        ],
      },
    ],
  },
  {
    id: "ring-ceremony-sangeet",
    name: "Ring Ceremony & Sangeet",
    date: "December 4, 2026",
    time: "6:30 PM Onwards",
    venue: "Lavender Banquet Hall, Ground Floor",
    venueAddress,
    dressCode: "Semi Formals / Vibrant Colours",
    description: "The auspicious exchange of rings marking the official engagement of the couple, followed by an enchanting evening of live music and dance performances. Celebrate the union with joyful sangeet performances by family and friends.",
    image: ringCeremonyImg,
    category: "all",
    mapUrl: lotusResortMapUrl,
    meal: "Evening Snacks & Tea, Dinner",
    timeline: [
      { time: "6:30 PM", title: "Ring Ceremony" },
      { time: "7:00 PM", title: "Sangeet" },
    ],
    menu: [
      {
        title: "Hi-Tea",
        items: ["Mix Bhajiya", "Green Chutney", "Tea", "Coffee"],
      },
      {
        title: "Welcome & Soup",
        items: ["Veg Hot-n-Sour Soup", "Fried Noodles", "Virgin Mojito"],
      },
      {
        title: "Chaat & Live Counters",
        items: [
          "Gupchup",
          "Aloo Tikki Chaat",
          "Bangalore Dosa",
          "Chana Chilly",
          "Hara Bhara Kabab",
          "Corn Kabab",
        ],
      },
      {
        title: "Main Course",
        items: [
          "Dal Makhani",
          "Paneer Tikka Masala",
          "Methi Mutter Malai",
          "Tawa Roti, Tandoori Roti, Mini Naan",
          "Jeera Rice",
          "Green Salad",
          "Papad Fry",
        ],
      },
      {
        title: "Dessert",
        items: ["Moong Halwa"],
      },
    ],
  },
  {
    id: "wedding",
    name: "Wedding Celebration",
    date: "December 4 – 6, 2026",
    time: "Dec 4, 9:00 AM – Dec 6, 9:00 AM",
    displayName: "Wedding Ceremony",
    displayDate: "December 5, 2026",
    displayTime: "10:00 AM – 4:00 PM",
    venue: "Lavender Banquet Hall",
    venueAddress,
    dressCode: "Formal Indian / Traditional",
    description: "The sacred wedding ceremony — a beautiful fusion of Bengali and UP traditions. From Shubo Drishti and Mala Badal to Phere and Vidaai, join us in witnessing the rituals that unite two souls and two cultures.",
    image: weddingImg,
    category: "all",
    mapUrl: lotusResortMapUrl,
    timeline: [
      { time: "10:00 AM", title: "Baraat" },
      { time: "11:30 AM", title: "Shubo Drishti" },
      { time: "12:00 PM", title: "Mala Badal, Saat Paak, Sampradaan, Sindoor Daan" },
      { time: "2:00 PM", title: "Phere & Kanyadaan" },
    ],
    menu: [
      {
        title: "Dec 5 — Breakfast",
        items: [
          "Bedmi Puri with Rasili Aloo",
          "Fara with Hari Chutney",
          "Chawal Chila with Lal Chutney",
          "Aloo / Ring Onion / Paneer Pakoda",
          "Grilled Sandwich",
          "Kheer Kadam",
          "Tea, Coffee, Biscuit",
        ],
      },
      {
        title: "Dec 5 — Lunch",
        items: [
          "Tomato Soup",
          "Veg Crispy",
          "Bati",
          "Baigan Bharta",
          "Gatte ki Sabji",
          "Kadhai Paneer",
          "Dal Tadka",
          "Tawa Roti, Missi Roti",
          "Jeera Matter Rice",
          "Plain Curd, Achar, Papad, Salad",
          "Badam Halwa",
        ],
      },
    ],

  },
  {
    id: "varmala-reception",
    name: "Varmala & Grand Reception",
    date: "December 5, 2026",
    time: "7:30 PM Onwards",
    venue: "Lawn",
    venueAddress,
    dressCode: "Traditional",
    description: "The grand Varmala ceremony — the exchange of flower garlands between the bride and groom under the open sky, symbolizing their acceptance of each other — followed by an evening of elegance, fine dining, and dancing under the stars as we celebrate the newlyweds.",
    image: varmalaImg,
    category: "all",
    mapUrl: lotusResortMapUrl,
    meal: "Dinner",
    timeline: [
      { time: "7:30 PM", title: "Varmala" },
      { time: "8:00 PM", title: "Grand Reception" },
    ],
    menu: [
      {
        title: "Mocktails, Shakes & Juices",
        items: [
          "Classic Mojito",
          "Blue Lagoon",
          "Oreo Shake",
          "Mixed Cold Drinks",
          "Pineapple Juice",
          "Watermelon Juice",
        ],
      },
      {
        title: "Soup",
        items: ["Veg Manchow Soup", "Sweet Corn Soup", "Fried Noodles"],
      },
      {
        title: "BBQ Nation",
        items: ["Paneer Tikka", "Malai Tikka", "Soya Chaap", "Green Chutney"],
      },
      {
        title: "Chaat Counter",
        items: [
          "Gupchup",
          "Aloo Tikki Chaat",
          "Palak Patta Chaat",
          "Dahi Bhalla",
        ],
      },
      {
        title: "Chinese",
        items: [
          "Corn Cheese Garlic Bread",
          "Veg Manchurian",
          "Chilly Garlic Noodles",
          "Paneer Chilly",
          "Pasta in White Sauce",
        ],
      },
      {
        title: "South Indian",
        items: [
          "Masala Dosa",
          "Podi Tatte Idli",
          "Peanut Chutney",
          "Coconut Chutney",
        ],
      },
      {
        title: "Namkeen & Salad",
        items: [
          "Mirchi / Pyaj / Mix Bhajiya with Hari Chutney",
          "Green, Sprouted & Fruit Salad",
          "Aloo Chole, Russian & Pan Patta Salad",
          "Achar Variety, Khichiya Papad, Moong Papad",
        ],
      },
      {
        title: "Main Course",
        items: [
          "Dal Tadka, Dal Makhani",
          "Tawa Sabji, Methi Matter Malai",
          "Paneer Lachhedar, Nargis Kofta",
          "Aloo Posto, Aloo Bhaja",
          "Jeera Rice, Navratan Pulao",
          "Tawa Roti, Tandoori Roti, Mini Naan, Garlic Naan",
        ],
      },
      {
        title: "Punjabi",
        items: ["Masala Kulcha", "Amritsari Chhole"],
      },
      {
        title: "Sweets",
        items: [
          "Gajar ka Halwa",
          "Rasgulla",
          "Malai Kulfi",
          "Butter Scotch Ice-cream",
          "Kesariya Doodh Counter",
          "Mukhwas",
        ],
      },
    ],
  },
];

export const coupleStory: CoupleStoryItem[] = [
  {
    year: "2022",
    title: "How We Met",
    description:
      "Beneath the emerald canopy of IIT Madras, two strangers met. Friendship bloomed under starlit skies at the KV court, where countless conversations quietly became the beginning of our forever.",
  },
  {
    year: "March 2022",
    title: "Our First Date",
    description:
      "The sea at Sholinganallur witnessed our first adventure together. As the waves danced ashore, our hands found each other — and our hearts never let go.",
  },
  {
    year: "2022 – 2025",
    title: "The Journey Together",
    description:
      "From trekking the steep hills of Parvathamalai to catch a breathtaking sunrise, to riding through Kerala's winding roads, every adventure brought new memories, new laughter, and new dreams. Through every high and low, we didn't just travel the world — we grew together, hand in hand.",
  },
  {
    year: "2026",
    title: "The Proposal",
    description:
      "One question, one heartbeat, one unforgettable \"Yes.\" In that moment, every road we had walked together led to a promise — to choose each other today, tomorrow, and for all the years to come.",
  },
  {
    year: "2026",
    title: "Forever Begins",
    description:
      "And now, surrounded by the people we love most, we begin the greatest chapter of all.",
  },
];

// Gallery photos are loaded live from the shared Google Drive folder.
// Bundled event artwork in src/assets is intentionally kept out of the gallery.

