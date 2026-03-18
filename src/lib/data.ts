import haldiImg from "@/assets/event-haldi.jpg";
import mehendiImg from "@/assets/event-mehendi.jpg";
import weddingImg from "@/assets/event-wedding.jpg";
import receptionImg from "@/assets/event-reception.jpg";
import varmalaImg from "@/assets/event-varmala.jpg";
import ringCeremonyImg from "@/assets/event-ring-ceremony.jpg";

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

export const guestName = "Sarah";
export const coupleName = "Riddhi & Shubham";
export const googleDriveGalleryUrl = "https://drive.google.com/drive/folders/1xIWkmIG0L9mAvU9aGxuxoX-RCZylWnmm?usp=sharing";

export const weddingDate = new Date("2026-12-05T16:00:00");

const venueMapUrl = "https://www.google.com/maps/dir//Uplakshy+The+Banquet+%26+Lawn,+VIP+estate,+Shankar+Nagar,+Raipur,+Chhattisgarh+492014/@13.0279053,77.6405022,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3a28dd4b60b2ad35:0xfcb6f5a3753f78ba!2m2!1d81.6772!2d21.2630389?entry=ttu&g_ep=EgoyMDI2MDMxNS4wIKXMDSoASAFQAw%3D%3D";
const venueName = "Uplakshy The Banquet & Lawn";
const venueAddress = "VIP Estate, Shankar Nagar, Raipur, Chhattisgarh 492014";

export const events: WeddingEvent[] = [
  {
    id: "haldi",
    name: "Haldi Ceremony",
    date: "December 4, 2026",
    time: "11:00 AM",
    venue: venueName,
    venueAddress,
    dressCode: "Yellow & White Traditional",
    description: "A joyous ceremony where turmeric paste is applied to bless the couple. Join us for music, laughter, and golden celebrations under the morning sun.",
    image: haldiImg,
    category: "all",
    mapUrl: venueMapUrl,
    meal: "Breakfast",
    notes: "Please wear clothes you don't mind getting turmeric on!"
  },
  {
    id: "ring-ceremony",
    name: "Ring Ceremony",
    date: "December 4, 2026",
    time: "1:30 PM",
    venue: venueName,
    venueAddress,
    dressCode: "Traditional / Semi-Formal",
    description: "The auspicious exchange of rings, marking the official engagement of the couple. A beautiful moment of commitment surrounded by family and friends.",
    image: ringCeremonyImg,
    category: "all",
    mapUrl: venueMapUrl,
    meal: "Lunch",
  },
  {
    id: "mehendi",
    name: "Mehendi & Sangeet",
    date: "December 4, 2026",
    time: "6:00 PM Onwards",
    venue: venueName,
    venueAddress,
    dressCode: "Vibrant Colors",
    description: "An enchanting evening of intricate henna artistry, live music, dance performances, and delicious food. Get your hands adorned with beautiful mehendi designs while enjoying the sangeet celebrations.",
    image: mehendiImg,
    category: "all",
    mapUrl: venueMapUrl,
    meal: "Dinner",
  },
  {
    id: "wedding",
    name: "Wedding Ceremony",
    date: "December 5, 2026",
    time: "11:00 AM – 4:00 PM",
    venue: venueName,
    venueAddress,
    dressCode: "Formal Indian / Traditional",
    description: "The sacred wedding ceremony blending the beauty of Bengali and UP traditions. The celebration begins with Shubo Drishti — the auspicious first glance between the bride and groom. This is followed by Mala Badal (exchange of garlands), Saat Paak, Subho Drishti, Sampradan, Sindoor Daan, and other cherished Bengali rituals. The ceremony then continues with traditional UP wedding customs including Kanyadaan, Phere (seven sacred rounds around the holy fire), and Vidaai — a truly beautiful fusion of two rich cultures coming together.",
    image: weddingImg,
    category: "all",
    mapUrl: venueMapUrl,
    meal: "Breakfast & Lunch",
  },
  {
    id: "varmala",
    name: "Varmala",
    date: "December 5, 2026",
    time: "6:00 PM",
    venue: venueName,
    venueAddress,
    dressCode: "Formal Indian / Traditional",
    description: "The grand Varmala ceremony — the exchange of flower garlands between the bride and groom, symbolizing their acceptance of each other. A joyous and celebratory moment filled with music and excitement.",
    image: varmalaImg,
    category: "all",
    mapUrl: venueMapUrl,
  },
  {
    id: "reception",
    name: "Grand Reception",
    date: "December 5, 2026",
    time: "8:00 PM Onwards",
    venue: venueName,
    venueAddress,
    dressCode: "Black Tie / Evening Gowns",
    description: "An evening of elegance, fine dining, and dancing. Celebrate the newlyweds with cocktails, a grand dinner, and unforgettable memories.",
    image: receptionImg,
    category: "all",
    mapUrl: venueMapUrl,
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
  { id: "1", src: haldiImg, caption: "Pre-wedding celebrations" },
  { id: "2", src: mehendiImg, caption: "Mehendi preparations" },
  { id: "3", src: weddingImg, caption: "The venue awaits" },
  { id: "4", src: receptionImg, caption: "Reception setup" },
];
