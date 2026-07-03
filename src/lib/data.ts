import haldiImg from "@/assets/event-haldi.jpg";
import mehendiImg from "@/assets/event-mehendi.jpg";
import weddingImg from "@/assets/event-wedding.jpg";
import receptionImg from "@/assets/event-reception.jpg";
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
const venueAddress = "Lotus Resort, Vidhan Sabha Road, Raipur (C.G.)";

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
          "Cut Fruit (4 types)",
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
          "Paneer Tikka & Buti (Live)",
          "Mini Rasmalai",
          "Sandesh",
        ],
      },
    ],
  },
  {
    id: "ring-ceremony",
    name: "Ring Ceremony",
    date: "December 4, 2026",
    time: "6:00 PM",
    venue: "Lavender Banquet Hall, Ground Floor",
    venueAddress,
    dressCode: "Formal / Semi-Formal",
    description: "The auspicious exchange of rings, marking the official engagement of the couple. A beautiful moment of commitment surrounded by family and friends, accompanied by evening snacks and tea.",
    image: ringCeremonyImg,
    category: "all",
    mapUrl: lotusResortMapUrl,
    meal: "Evening Snacks & Tea",
    menu: [
      {
        title: "Hi-Tea",
        items: ["Mix Bhajiya", "Green Chutney", "Tea", "Coffee"],
      },
    ],
  },
  {
    id: "mehendi",
    name: "Sangeet",
    date: "December 4, 2026",
    time: "7:00 PM Onwards",
    venue: "Lavender Banquet Hall, Ground Floor",
    venueAddress,
    dressCode: "Vibrant Colors",
    description: "An enchanting evening of live music, dance performances, and delicious food. Celebrate the union with joyful sangeet performances by family and friends.",
    image: mehendiImg,
    category: "all",
    mapUrl: lotusResortMapUrl,
    meal: "Dinner",
    menu: [
      {
        title: "Welcome & Soup",
        items: ["Veg Hot-n-Sour Soup", "Fried Noodles", "Virgin Mojito"],
      },
      {
        title: "Chaat & Live Counters",
        items: [
          "Gupchup (Pani – 2 types)",
          "Aloo Tikki Chaat",
          "Bangalore Dosa (Plain, Podi, Masala)",
          "Chana Chilly (Live)",
          "Hara Bhara Kabab (Live)",
          "Corn Kabab (Live)",
        ],
      },
      {
        title: "Main Course",
        items: [
          "Dal Makhani",
          "Paneer Tikka Masala",
          "Methi Mutter Malai",
          "Tawa Roti (Ghee), Tandoori Roti, Mini Naan",
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
    venue: "Lavender Banquet Hall",
    venueAddress,
    dressCode: "Formal Indian / Traditional",
    description: "The sacred wedding ceremony — a beautiful fusion of Bengali and UP traditions. From Shubo Drishti and Mala Badal to Phere and Vidaai, join us in witnessing the rituals that unite two souls and two cultures.",
    image: weddingImg,
    category: "all",
    mapUrl: lotusResortMapUrl,
    timeline: [
      { time: "Day 1 — Dec 4", title: "" },
      { time: "12:00 PM", title: "Haldi" },
      { time: "2:00 PM", title: "Pool Party" },
      { time: "6:30 PM", title: "Ring Ceremony" },
      { time: "7:00 PM", title: "Sangeet" },
      { time: "Day 2 — Dec 5", title: "" },
      { time: "10:00 AM", title: "Baraat" },
      { time: "11:30 AM", title: "Shubo Drishti" },
      { time: "12:00 PM", title: "Mala Badal, Saat Paak, Sampradaan, Sindoor Daan" },
      { time: "2:00 PM", title: "Phere & Kanyadaan" },
      { time: "7:00 PM", title: "Jay Mala" },
      { time: "8:00 PM", title: "Reception" },
      { time: "11:00 PM", title: "Vidai" },
    ],
    menu: [
      {
        title: "Dec 5 — Breakfast (9:00 AM – 11:00 AM)",
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
        title: "Dec 5 — Lunch (1:00 PM – 4:00 PM)",
        items: [
          "Tomato Soup",
          "Veg Crispy",
          "Bati (Ghee)",
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
    id: "varmala",
    name: "Varmala",
    date: "December 5, 2026",
    time: "7:30 PM",
    venue: "Lawn",
    venueAddress,
    dressCode: "Formal Indian / Traditional",
    description: "The grand Varmala ceremony — the exchange of flower garlands between the bride and groom under the open sky, symbolizing their acceptance of each other. A joyous moment filled with music, lights, and excitement.",
    image: varmalaImg,
    category: "all",
    mapUrl: lotusResortMapUrl,
    meal: "Dinner",
    notes: "Dinner served at the Grand Reception that follows.",
  },
  {
    id: "reception",
    name: "Grand Reception",
    date: "December 5, 2026",
    time: "8:00 PM Onwards",
    venue: "Lawn",
    venueAddress,
    dressCode: "Black Tie / Evening Gowns",
    description: "An evening of elegance, fine dining, and dancing under the stars. Celebrate the newlyweds with cocktails, a grand dinner, and unforgettable memories.",
    image: receptionImg,
    category: "all",
    mapUrl: lotusResortMapUrl,
    meal: "Dinner",
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
          "Gupchup (Pani – 2 types)",
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
          "Mukhwas (6 types)",
        ],
      },
    ],
  },
];

export const coupleStory: CoupleStoryItem[] = [
  { year: "20XX", title: "How We Met", description: "Write your story here..." },
  { year: "20XX", title: "Our First Date", description: "Write your story here..." },
  { year: "20XX", title: "The Journey Together", description: "Write your story here..." },
  { year: "20XX", title: "The Proposal", description: "Write your story here..." },
  { year: "2026", title: "Forever Begins", description: "And now, surrounded by the people we love most, we begin the greatest chapter of all." },
];

export const galleryPhotos: GalleryPhoto[] = [
  { id: "1", src: haldiImg, caption: "Haldi celebrations" },
  { id: "2", src: mehendiImg, caption: "Mehendi & Sangeet" },
  { id: "3", src: weddingImg, caption: "Wedding ceremony" },
  { id: "4", src: varmalaImg, caption: "Varmala" },
  { id: "5", src: ringCeremonyImg, caption: "Ring ceremony" },
  { id: "6", src: receptionImg, caption: "Reception" },
];
