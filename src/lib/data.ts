import haldiImg from "@/assets/event-haldi.jpg";
import mehendiImg from "@/assets/event-mehendi.jpg";
import weddingImg from "@/assets/event-wedding.jpg";
import receptionImg from "@/assets/event-reception.jpg";

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
export const weddingDate = new Date("2026-12-05T16:00:00");

export const events: WeddingEvent[] = [
  {
    id: "haldi",
    name: "Haldi Ceremony",
    date: "April 13, 2026",
    time: "10:00 AM",
    venue: "The Garden Pavilion",
    venueAddress: "42 Rose Garden Lane, Udaipur",
    dressCode: "Yellow & White Attire",
    description: "A joyous ceremony where turmeric paste is applied to bless the couple. Join us for music, laughter, and golden celebrations under the morning sun.",
    image: haldiImg,
    category: "close-friends",
    mapUrl: "https://maps.google.com/?q=The+Garden+Pavilion+Udaipur",
    notes: "Please wear clothes you don't mind getting turmeric on!"
  },
  {
    id: "mehendi",
    name: "Mehendi Evening",
    date: "April 13, 2026",
    time: "5:00 PM",
    venue: "The Lotus Courtyard",
    venueAddress: "42 Rose Garden Lane, Udaipur",
    dressCode: "Vibrant Colors",
    description: "An enchanting evening of intricate henna artistry, live folk music, and delicious street food. Get your hands adorned with beautiful mehendi designs.",
    image: mehendiImg,
    category: "all",
    mapUrl: "https://maps.google.com/?q=The+Lotus+Courtyard+Udaipur",
  },
  {
    id: "wedding",
    name: "Wedding Ceremony",
    date: "April 15, 2026",
    time: "4:00 PM",
    venue: "The Glass House",
    venueAddress: "15 Lake View Road, Udaipur",
    dressCode: "Formal Indian / Black Tie",
    description: "The sacred ceremony where two souls unite. Set against the backdrop of the lake at golden hour, witness a celebration of love and tradition.",
    image: weddingImg,
    category: "all",
    mapUrl: "https://maps.google.com/?q=The+Glass+House+Udaipur",
    notes: "Shuttles depart from the hotel lobby at 3:15 PM."
  },
  {
    id: "reception",
    name: "Grand Reception",
    date: "April 15, 2026",
    time: "8:00 PM",
    venue: "The Crystal Ballroom",
    venueAddress: "15 Lake View Road, Udaipur",
    dressCode: "Black Tie / Evening Gowns",
    description: "An evening of elegance, fine dining, and dancing under crystal chandeliers. Celebrate the newlyweds with cocktails and a grand dinner.",
    image: receptionImg,
    category: "all",
    mapUrl: "https://maps.google.com/?q=The+Crystal+Ballroom+Udaipur",
  },
];

export const coupleStory: CoupleStoryItem[] = [
  { year: "2019", title: "First Meeting", description: "A chance encounter at a friend's gallery opening in Mumbai. Rohan spilled his coffee, Ananya handed him a napkin — and the rest is history." },
  { year: "2020", title: "First Date", description: "A quiet dinner at a rooftop restaurant turned into a six-hour conversation that ended only when the restaurant closed." },
  { year: "2021", title: "Adventures Together", description: "From backpacking through Rajasthan to quiet weekends reading in cafés, they discovered they were each other's favorite adventure." },
  { year: "2023", title: "The Proposal", description: "Under a canopy of fairy lights in their favorite garden, Rohan got down on one knee. She said yes before he finished the question." },
  { year: "2026", title: "Forever Begins", description: "And now, surrounded by the people they love most, they begin the greatest chapter of all." },
];

export const galleryPhotos: GalleryPhoto[] = [
  { id: "1", src: haldiImg, caption: "Pre-wedding celebrations" },
  { id: "2", src: mehendiImg, caption: "Mehendi preparations" },
  { id: "3", src: weddingImg, caption: "The venue awaits" },
  { id: "4", src: receptionImg, caption: "Reception setup" },
];
