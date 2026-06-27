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

export const weddingDate = new Date("2026-12-05T16:00:00");

const lotusResortMapUrl = "https://www.google.com/maps/search/?api=1&query=Lotus+Resort+Raipur+Chhattisgarh";
const venueAddress = "Lotus Resort, Raipur, Chhattisgarh";

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
    meal: "Lunch",
    notes: "Followed by a pool party — please wear clothes you don't mind getting turmeric and water on!"
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
  },
  {
    id: "wedding",
    name: "Wedding Ceremony",
    date: "December 5, 2026",
    time: "9:30 AM – 3:00 PM",
    venue: "Lavender Banquet Hall",
    venueAddress,
    dressCode: "Formal Indian / Traditional",
    description: "The sacred wedding ceremony — a beautiful fusion of Bengali and UP traditions. From Shubo Drishti and Mala Badal to Phere and Vidaai, join us in witnessing the rituals that unite two souls and two cultures.",
    image: weddingImg,
    category: "all",
    mapUrl: lotusResortMapUrl,
    meal: "Breakfast & Lunch",
    timeline: [
      { time: "9:30 AM", title: "Baraat" },
      { time: "10:30 AM", title: "Reaching the Hall (1 hour of dancing)" },
      { time: "11:00 AM", title: "Shubo Drishti" },
      { time: "11:30 AM", title: "Mala Badal, Saat Paak, Sampradan, Sindoor Daan" },
      { time: "1:00 PM", title: "Phere & Kanyadaan" },
      { time: "3:00 PM", title: "Vidaai" },
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
