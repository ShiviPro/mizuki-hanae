import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductListing from "../components/ProductListing";
import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

export const allProducts = [
  {
    id: 1,
    name: "Dream of Light",
    yearOfMaking: new Date("1969-07-12"),
    rating: 4.7,
    description: "A unique piece depicting scenery.",
    category: ["Realism"],
    images: [
      "https://placehold.co/800x600?text=Dream+of+Light+1",
      "https://placehold.co/800x600?text=Dream+of+Light+2",
    ],
    dimensions: "60 x 52 inches",
    isFramed: true,
    stateOfPreservation: "Fair",
    proofOfAuthenticity: "Signed by artist",
    sellingPrice: 23799,
    markedPrice: 25499,
    delivery: {
      by: "Indian Post",
      charge: 750,
      type: "Home Delivery",
      from: { city: "Bangalore", country: "India" },
      estimatedDate: new Date("2023-08-21"),
    },
    tags: ["impressionism", "landscape", "canvas", "modern art", "sculpture"],
    additionalInfo: {
      medium: "Digital Print",
      style: "Minimalism",
    },

    comments: [
      {
        id: 1,
        authorId: "gallerist21",
        content: "This artwork speaks to me on so many levels.",
      },
    ],
    artist: {
      id: "artist1",
      name: "Nisha Gupta",
      bio: "Nisha Gupta is an Indian artist known for experimental digital art in the Impressionist style.",
      profilePic: "https://randomuser.me/api/portraits/women/18.jpg",
      noOfFollowers: 7538,
    },
  },
  {
    id: 2,
    name: "Solitude of Dawn",
    yearOfMaking: new Date("1976-10-03"),
    rating: 4.5,
    description: "A stunning oil painting with vivid color contrasts.",
    category: ["Landscape"],
    images: [
      "https://placehold.co/800x600?text=Solitude+of+Dawn+1",
      "https://placehold.co/800x600?text=Solitude+of+Dawn+2",
      "https://placehold.co/800x600?text=Solitude+of+Dawn+3",
    ],
    dimensions: "45 x 70 cm",
    isFramed: false,
    stateOfPreservation: "Good",
    proofOfAuthenticity: "Certificate of Authenticity included",
    sellingPrice: 12499,
    markedPrice: 14799,
    delivery: {
      by: "FedEx",
      charge: 350,
      type: "Home Delivery",
      from: { city: "Mumbai", country: "India" },
      estimatedDate: new Date("2025-06-28"),
    },
    tags: ["oil painting", "landscape", "nature", "serene"],
    additionalInfo: {
      medium: "Oil on Canvas",
      style: "Impressionism",
    },

    comments: [
      {
        id: 1,
        authorId: "critic99",
        content: "Absolutely love this piece!",
      },
      {
        id: 2,
        authorId: "patron01",
        content: "The colors are so vibrant and alive.",
      },
    ],
    artist: {
      id: "artist2",
      name: "Rahul Das",
      bio: "Rahul Das is an Indian artist known for bold paintings in the Impressionist style.",
      profilePic: "https://randomuser.me/api/portraits/men/33.jpg",
      noOfFollowers: 4210,
    },
  },
  {
    id: 3,
    name: "Echoes of Time",
    yearOfMaking: new Date("2001-05-22"),
    rating: 3.6,
    description: "An evocative piece with complex layers of meaning.",
    category: ["Abstract"],
    images: [
      "https://placehold.co/800x600?text=Echoes+of+Time+1",
      "https://placehold.co/800x600?text=Echoes+of+Time+2",
      "https://placehold.co/800x600?text=Echoes+of+Time+3",
    ],
    dimensions: "30 x 40 inches",
    isFramed: true,
    stateOfPreservation: "Mint Condition",
    proofOfAuthenticity: "Signed by artist",
    sellingPrice: 47999,
    markedPrice: 51799,
    delivery: {
      by: "BlueDart Express",
      charge: 500,
      type: "Hand Delivery",
      from: { city: "Pune", country: "India" },
      estimatedDate: new Date("2025-07-05"),
    },
    tags: ["modern art", "colorful", "canvas"],
    additionalInfo: {
      medium: "Acrylic on Canvas",
      style: "Abstract",
    },

    comments: [
      {
        id: 1,
        authorId: "collectorX",
        content: "The use of color is just fantastic.",
      },
      {
        id: 2,
        authorId: "visitor87",
        content: "Amazing detail and composition.",
      },
    ],
    artist: {
      id: "artist3",
      name: "Arjun Reddy",
      bio: "Arjun Reddy is an Indian artist known for innovative paintings in the Abstract style.",
      profilePic: "https://randomuser.me/api/portraits/men/77.jpg",
      noOfFollowers: 8762,
    },
  },
  {
    id: 4,
    name: "Melody in Red",
    yearOfMaking: new Date("2020-11-15"),
    rating: 4.4,
    description: "A vibrant piece capturing deep emotions in red hues.",
    category: ["Figurative", "Portrait"],
    images: [
      "https://placehold.co/800x600?text=Melody+in+Red+1",
      "https://placehold.co/800x600?text=Melody+in+Red+2",
    ],
    dimensions: "24 x 36 inches",
    isFramed: false,
    stateOfPreservation: "Excellent",
    proofOfAuthenticity: "Gallery-signed certificate",
    sellingPrice: 31999,
    markedPrice: 32499,
    delivery: {
      by: "Aramex",
      charge: 450,
      type: "Home Delivery",
      from: { city: "Delhi", country: "India" },
      estimatedDate: new Date("2025-06-05"),
    },
    tags: ["portrait", "oil painting", "canvas"],
    additionalInfo: {
      medium: "Oil on Canvas",
      style: "Expressionism",
    },

    comments: [
      {
        id: 1,
        authorId: "artlover45",
        content: "Absolutely love this piece!",
      },
      {
        id: 2,
        authorId: "fanofart",
        content: "This artwork speaks to me on so many levels.",
      },
    ],
    artist: {
      id: "artist4",
      name: "Anjali Sharma",
      bio: "Anjali Sharma is an Indian artist known for traditional portraits in the Realism style.",
      profilePic: "https://randomuser.me/api/portraits/women/25.jpg",
      noOfFollowers: 5942,
    },
  },
  {
    id: 5,
    name: "Serene Waves",
    yearOfMaking: new Date("2018-08-09"),
    rating: 1.6,
    description: "A soothing seascape that evokes calm and peace.",
    category: ["Seascape"],
    images: [
      "https://placehold.co/800x600?text=Serene+Waves+1",
      "https://placehold.co/800x600?text=Serene+Waves+2",
    ],
    dimensions: "50 x 40 cm",
    isFramed: true,
    stateOfPreservation: "Good",
    proofOfAuthenticity: "COA #3456",
    sellingPrice: 9199,
    markedPrice: 9999,
    delivery: {
      by: "DHL Express",
      charge: 300,
      type: "Home Delivery",
      from: { city: "Chennai", country: "India" },
      estimatedDate: new Date("2025-07-22"),
    },
    tags: ["watercolor", "ocean", "nature", "calm"],
    additionalInfo: {
      medium: "Watercolor on Paper",
      style: "Realism",
    },

    comments: [
      {
        id: 1,
        authorId: "user123",
        content: "Just saw this and had to comment - beautiful!",
      },
    ],
    artist: {
      id: "artist5",
      name: "Vikram Singh",
      bio: "Vikram Singh is an Indian artist known for contemporary seascapes in the Realism style.",
      profilePic: "https://randomuser.me/api/portraits/men/42.jpg",
      noOfFollowers: 3145,
    },
  },
  {
    id: 6,
    name: "Abstract Harmony",
    yearOfMaking: new Date("1995-03-18"),
    rating: 3.9,
    description: "A bold abstract piece with vibrant color blocks.",
    category: ["Abstract", "Niche Art"],
    images: [
      "https://placehold.co/800x600?text=Abstract+Harmony+1",
      "https://placehold.co/800x600?text=Abstract+Harmony+2",
    ],
    dimensions: "35 x 35 inches",
    isFramed: true,
    stateOfPreservation: "Excellent",
    proofOfAuthenticity: "Signed by artist",
    sellingPrice: 45999,
    markedPrice: 47799,
    delivery: {
      by: "BlueDart Express",
      charge: 600,
      type: "Hand Delivery",
      from: { city: "Hyderabad", country: "India" },
      estimatedDate: new Date("2025-09-10"),
    },
    tags: ["abstract", "colorful", "large", "canvas"],
    additionalInfo: {
      medium: "Acrylic on Canvas",
      style: "Cubism",
    },

    comments: [
      {
        id: 1,
        authorId: "collectorX",
        content: "Would love to see more pieces like this.",
      },
    ],
    artist: {
      id: "artist6",
      name: "Dev Kapoor",
      bio: "Dev Kapoor is an Indian artist known for bold paintings in the Modernist style.",
      profilePic: "https://randomuser.me/api/portraits/men/59.jpg",
      noOfFollowers: 8900,
    },
  },
  {
    id: 7,
    name: "Shadows of Red",
    yearOfMaking: new Date("2012-12-01"),
    rating: 4.2,
    description: "A dynamic portrait with striking use of red and black.",
    category: ["Figurative"],
    images: [
      "https://placehold.co/800x600?text=Shadows+of+Red+1",
      "https://placehold.co/800x600?text=Shadows+of+Red+2",
      "https://placehold.co/800x600?text=Shadows+of+Red+3",
    ],
    dimensions: "42 x 30 inches",
    isFramed: false,
    stateOfPreservation: "Good",
    proofOfAuthenticity: "Gallery-signed certificate",
    sellingPrice: 14999,
    markedPrice: 15999,
    delivery: {
      by: "Indian Post",
      charge: 200,
      type: "Home Delivery",
      from: { city: "Kolkata", country: "India" },
      estimatedDate: new Date("2025-06-15"),
    },
    tags: ["portrait", "oil painting", "expressive"],
    additionalInfo: {
      medium: "Oil on Canvas",
      style: "Expressionism",
    },

    comments: [
      {
        id: 1,
        authorId: "artlover45",
        content: "The mood captured here is incredible.",
      },
    ],
    artist: {
      id: "artist7",
      name: "Priya Patel",
      bio: "Priya Patel is an Indian artist known for expressive figurative artworks.",
      profilePic: "https://randomuser.me/api/portraits/women/31.jpg",
      noOfFollowers: 2175,
    },
  },
  {
    id: 8,
    name: "Ocean Bliss",
    yearOfMaking: new Date("2005-07-29"),
    rating: 4.6,
    description: "A serene seascape with gentle waves and pastel sky.",
    category: ["Seascape"],
    images: [
      "https://placehold.co/800x600?text=Ocean+Bliss+1",
      "https://placehold.co/800x600?text=Ocean+Bliss+2",
      "https://placehold.co/800x600?text=Ocean+Bliss+3",
    ],
    dimensions: "48 x 60 inches",
    isFramed: true,
    stateOfPreservation: "Fair",
    proofOfAuthenticity: "Documented provenance",
    sellingPrice: 23999,
    markedPrice: 26999,
    delivery: {
      by: "FedEx",
      charge: 450,
      type: "Home Delivery",
      from: { city: "Surat", country: "India" },
      estimatedDate: new Date("2025-09-16"),
    },
    tags: ["watercolor", "ocean", "landscape"],
    additionalInfo: {
      medium: "Watercolor on Paper",
      style: "Realism",
    },

    comments: [
      {
        id: 1,
        authorId: "gallerist21",
        content: "The use of color is just fantastic.",
      },
    ],
    artist: {
      id: "artist8",
      name: "Sunita Rao",
      bio: "Sunita Rao is an Indian artist known for calm landscapes in the Realism style.",
      profilePic: "https://randomuser.me/api/portraits/women/52.jpg",
      noOfFollowers: 3480,
    },
  },
  {
    id: 9,
    name: "Golden Pathway",
    yearOfMaking: new Date("1999-11-11"),
    rating: 4.3,
    description: "A nostalgic landscape with a golden sunrise.",
    category: ["Landscape"],
    images: [
      "https://placehold.co/800x600?text=Golden+Pathway+1",
      "https://placehold.co/800x600?text=Golden+Pathway+2",
    ],
    dimensions: "30 x 50 inches",
    isFramed: false,
    stateOfPreservation: "Restored",
    proofOfAuthenticity: "Signed by artist",
    sellingPrice: 18499,
    markedPrice: 18999,
    delivery: {
      by: "BlueDart Express",
      charge: 550,
      type: "Hand Delivery",
      from: { city: "Ahmedabad", country: "India" },
      estimatedDate: new Date("2025-08-02"),
    },
    tags: ["oil painting", "sunrise", "nature"],
    additionalInfo: {
      medium: "Oil on Canvas",
      style: "Impressionism",
    },

    comments: [
      {
        id: 1,
        authorId: "critic99",
        content: "The colors are so vibrant and alive.",
      },
    ],
    artist: {
      id: "artist9",
      name: "Raj Kapoor",
      bio: "Raj Kapoor is an Indian artist known for nostalgic landscapes in a modern style.",
      profilePic: "https://randomuser.me/api/portraits/men/27.jpg",
      noOfFollowers: 5280,
    },
  },
  {
    id: 10,
    name: "Urban Pulse",
    yearOfMaking: new Date("2022-01-20"),
    rating: 3.7,
    description: "A contemporary abstract piece reflecting city energy.",
    category: ["Abstract", "Niche Art"],
    images: [
      "https://placehold.co/800x600?text=Urban+Pulse+1",
      "https://placehold.co/800x600?text=Urban+Pulse+2",
      "https://placehold.co/800x600?text=Urban+Pulse+3",
    ],
    dimensions: "40 x 40 inches",
    isFramed: true,
    stateOfPreservation: "Excellent",
    proofOfAuthenticity: "Certificate of Authenticity included",
    sellingPrice: 29499,
    markedPrice: 31499,
    delivery: {
      by: "DHL Express",
      charge: 650,
      type: "Hand Delivery",
      from: { city: "Pune", country: "India" },
      estimatedDate: new Date("2025-07-30"),
    },
    tags: ["modern art", "vibrant", "cityscape"],
    additionalInfo: {
      medium: "Gouache on Paper",
      style: "Minimalism",
    },

    comments: [
      {
        id: 1,
        authorId: "visitor87",
        content: "Amazing detail and composition.",
      },
      {
        id: 2,
        authorId: "fanofart",
        content: "I’m not usually a fan of this style, but this is stunning.",
      },
    ],
    artist: {
      id: "artist10",
      name: "Kavita Joshi",
      bio: "Kavita Joshi is an Indian artist known for innovative contemporary art pieces.",
      profilePic: "https://randomuser.me/api/portraits/women/84.jpg",
      noOfFollowers: 6784,
    },
  },
  {
    id: 11,
    name: "Rainy Evening",
    yearOfMaking: new Date("1985-10-30"),
    rating: 4.4,
    description: "A romantic landscape capturing rain and twilight.",
    category: ["Landscape"],
    images: [
      "https://placehold.co/800x600?text=Rainy+Evening+1",
      "https://placehold.co/800x600?text=Rainy+Evening+2",
      "https://placehold.co/800x600?text=Rainy+Evening+3",
    ],
    dimensions: "36 x 48 inches",
    isFramed: true,
    stateOfPreservation: "Good",
    proofOfAuthenticity: "Documented provenance",
    sellingPrice: 21999,
    markedPrice: 22499,
    delivery: {
      by: "Indian Post",
      charge: 300,
      type: "Home Delivery",
      from: { city: "Jaipur", country: "India" },
      estimatedDate: new Date("2025-06-12"),
    },
    tags: ["oil painting", "rain", "evening", "canvas"],
    additionalInfo: {
      medium: "Oil on Canvas",
      style: "Realism",
    },

    comments: [
      {
        id: 1,
        authorId: "artlover45",
        content: "Just saw this and had to comment - beautiful!",
      },
    ],
    artist: {
      id: "artist11",
      name: "Mohan Verma",
      bio: "Mohan Verma is an Indian artist known for romantic landscapes in the Realism style.",
      profilePic: "https://randomuser.me/api/portraits/men/15.jpg",
      noOfFollowers: 2590,
    },
  },
  {
    id: 12,
    name: "Celestial Abstraction",
    yearOfMaking: new Date("2023-03-14"),
    rating: 2.7,
    description: "An abstract piece inspired by the cosmos.",
    category: ["Abstract"],
    images: [
      "https://placehold.co/800x600?text=Celestial+Abstraction+1",
      "https://placehold.co/800x600?text=Celestial+Abstraction+2",
      "https://placehold.co/800x600?text=Celestial+Abstraction+3",
    ],
    dimensions: "30 x 30 inches",
    isFramed: false,
    stateOfPreservation: "Excellent",
    proofOfAuthenticity: "Signed by artist",
    sellingPrice: 13499,
    markedPrice: 15999,
    delivery: {
      by: "FedEx",
      charge: 400,
      type: "Home Delivery",
      from: { city: "Surat", country: "India" },
      estimatedDate: new Date("2025-06-25"),
    },
    tags: ["colorful", "digital art", "modern"],
    additionalInfo: {
      medium: "Digital",
      style: "Minimalism",
    },

    comments: [
      {
        id: 1,
        authorId: "user123",
        content: "The mood captured here is incredible.",
      },
    ],
    artist: {
      id: "artist12",
      name: "Rohit Shah",
      bio: "Rohit Shah is an Indian artist known for experimental digital art.",
      profilePic: "https://randomuser.me/api/portraits/men/6.jpg",
      noOfFollowers: 4871,
    },
  },
  {
    id: 13,
    name: "Tranquil Forest",
    yearOfMaking: new Date("1992-09-07"),
    rating: 3.3,
    description: "A beautiful landscape filled with lush greens.",
    category: ["Landscape"],
    images: [
      "https://placehold.co/800x600?text=Tranquil+Forest+1",
      "https://placehold.co/800x600?text=Tranquil+Forest+2",
      "https://placehold.co/800x600?text=Tranquil+Forest+3",
    ],
    dimensions: "24 x 30 inches",
    isFramed: false,
    stateOfPreservation: "Restored",
    proofOfAuthenticity: "Gallery-signed certificate",
    sellingPrice: 10749,
    markedPrice: 12999,
    delivery: {
      by: "BlueDart Express",
      charge: 550,
      type: "Hand Delivery",
      from: { city: "Delhi", country: "India" },
      estimatedDate: new Date("2025-08-28"),
    },
    tags: ["oil painting", "forest", "nature"],
    additionalInfo: {
      medium: "Oil on Canvas",
      style: "Realism",
    },

    comments: [
      {
        id: 1,
        authorId: "patron01",
        content: "The colors are so vibrant and alive.",
      },
    ],
    artist: {
      id: "artist13",
      name: "Alok Das",
      bio: "Alok Das is an Indian artist known for traditional landscapes in the Realism style.",
      profilePic: "https://randomuser.me/api/portraits/men/72.jpg",
      noOfFollowers: 3021,
    },
  },
  {
    id: 14,
    name: "Radiant Hills",
    yearOfMaking: new Date("2008-02-02"),
    rating: 4.7,
    description: "A serene landscape with rolling hills bathed in light.",
    category: ["Landscape"],
    images: [
      "https://placehold.co/800x600?text=Radiant+Hills+1",
      "https://placehold.co/800x600?text=Radiant+Hills+2",
    ],
    dimensions: "30 x 36 inches",
    isFramed: true,
    stateOfPreservation: "Good",
    proofOfAuthenticity: "Documented provenance",
    sellingPrice: 17999,
    markedPrice: 20999,
    delivery: {
      by: "Indian Post",
      charge: 250,
      type: "Home Delivery",
      from: { city: "Ahmedabad", country: "India" },
      estimatedDate: new Date("2025-07-10"),
    },
    tags: ["oil painting", "hills", "light"],
    additionalInfo: {
      medium: "Oil on Canvas",
      style: "Impressionism",
    },

    comments: [
      {
        id: 1,
        authorId: "visitor87",
        content: "I'm not usually a fan of this style, but this is stunning.",
      },
    ],
    artist: {
      id: "artist14",
      name: "Sneha Reddy",
      bio: "Sneha Reddy is an Indian artist known for contemporary impressionist landscapes.",
      profilePic: "https://randomuser.me/api/portraits/women/10.jpg",
      noOfFollowers: 4120,
    },
  },
  {
    id: 15,
    name: "City of Dreams",
    yearOfMaking: new Date("2017-06-12"),
    rating: 2.6,
    description: "An abstract depiction of urban nightlife.",
    category: ["Abstract", "Niche Art"],
    images: [
      "https://placehold.co/800x600?text=City+of+Dreams+1",
      "https://placehold.co/800x600?text=City+of+Dreams+2",
    ],
    dimensions: "36 x 48 inches",
    isFramed: true,
    stateOfPreservation: "Excellent",
    proofOfAuthenticity: "Certificate of Authenticity included",
    sellingPrice: 26499,
    markedPrice: 29499,
    delivery: {
      by: "Skynet Worldwide Express",
      charge: 400,
      type: "Hand Delivery",
      from: { city: "Mumbai", country: "India" },
      estimatedDate: new Date("2025-08-05"),
    },
    tags: ["cityscape", "vibrant", "modern art"],
    additionalInfo: {
      medium: "Acrylic on Canvas",
      style: "Pop Art",
    },

    comments: [
      {
        id: 1,
        authorId: "gallerist21",
        content: "Just saw this and had to comment - beautiful!",
      },
    ],
    artist: {
      id: "artist15",
      name: "Kiran Shah",
      bio: "Kiran Shah is an Indian artist known for modern pop art pieces.",
      profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
      noOfFollowers: 7634,
    },
  },
  {
    id: 16,
    name: "Ocean Melody",
    yearOfMaking: new Date("1998-04-21"),
    rating: 2.8,
    description: "A tranquil seascape capturing the beauty of dawn at sea.",
    category: ["Seascape"],
    images: [
      "https://placehold.co/800x600?text=Ocean+Melody+1",
      "https://placehold.co/800x600?text=Ocean+Melody+2",
      "https://placehold.co/800x600?text=Ocean+Melody+3",
    ],
    dimensions: "50 x 60 inches",
    isFramed: false,
    stateOfPreservation: "Good",
    proofOfAuthenticity: "Signed by artist",
    sellingPrice: 14999,
    markedPrice: 16499,
    delivery: {
      by: "FedEx",
      charge: 350,
      type: "Home Delivery",
      from: { city: "Kolkata", country: "India" },
      estimatedDate: new Date("2025-06-18"),
    },
    tags: ["oil painting", "sea", "sunrise"],
    additionalInfo: {
      medium: "Oil on Canvas",
      style: "Realism",
    },

    comments: [
      {
        id: 1,
        authorId: "artlover45",
        content: "Absolutely love this piece!",
      },
    ],
    artist: {
      id: "artist16",
      name: "Sneha Kapoor",
      bio: "Sneha Kapoor is an Indian artist known for serene seascapes in the Realism style.",
      profilePic: "https://randomuser.me/api/portraits/women/76.jpg",
      noOfFollowers: 2698,
    },
  },
  {
    id: 17,
    name: "Palette of Dreams",
    yearOfMaking: new Date("2024-02-13"),
    rating: 4.5,
    description: "A colorful abstract piece that feels like a dream palette.",
    category: ["Abstract"],
    images: [
      "https://placehold.co/800x600?text=Palette+of+Dreams+1",
      "https://placehold.co/800x600?text=Palette+of+Dreams+2",
    ],
    dimensions: "24 x 36 inches",
    isFramed: true,
    stateOfPreservation: "New",
    proofOfAuthenticity: "Certificate of Authenticity included",
    sellingPrice: 12999,
    markedPrice: 15499,
    delivery: {
      by: "BlueDart Express",
      charge: 500,
      type: "Hand Delivery",
      from: { city: "Chennai", country: "India" },
      estimatedDate: new Date("2025-10-01"),
    },
    tags: ["modern art", "vibrant", "colorful"],
    additionalInfo: {
      medium: "Acrylic on Canvas",
      style: "Surrealism",
    },

    comments: [
      {
        id: 1,
        authorId: "user123",
        content: "The colors are so vibrant and alive.",
      },
    ],
    artist: {
      id: "artist17",
      name: "Nikhil Kumar",
      bio: "Nikhil Kumar is an Indian artist known for vivid abstract art.",
      profilePic: "https://randomuser.me/api/portraits/men/81.jpg",
      noOfFollowers: 5931,
    },
  },
  {
    id: 18,
    name: "Silhouette Dreams",
    yearOfMaking: new Date("1980-01-09"),
    rating: 4.7,
    description: "A figurative piece with bold silhouettes in warm tones.",
    category: ["Figurative"],
    images: [
      "https://placehold.co/800x600?text=Silhouette+Dreams+1",
      "https://placehold.co/800x600?text=Silhouette+Dreams+2",
      "https://placehold.co/800x600?text=Silhouette+Dreams+3",
    ],
    dimensions: "48 x 60 inches",
    isFramed: false,
    stateOfPreservation: "Restored",
    proofOfAuthenticity: "Documented provenance",
    sellingPrice: 19499,
    markedPrice: 21999,
    delivery: {
      by: "Aramex",
      charge: 600,
      type: "Home Delivery",
      from: { city: "Mumbai", country: "India" },
      estimatedDate: new Date("2025-09-12"),
    },
    tags: ["painting", "silhouette", "warm colors"],
    additionalInfo: {
      medium: "Oil on Canvas",
      style: "Modernism",
    },

    comments: [
      {
        id: 1,
        authorId: "visitor87",
        content: "This artwork speaks to me on so many levels.",
      },
    ],
    artist: {
      id: "artist18",
      name: "Rajesh Patel",
      bio: "Rajesh Patel is an Indian artist known for bold figurative paintings.",
      profilePic: "https://randomuser.me/api/portraits/men/21.jpg",
      noOfFollowers: 3745,
    },
  },
  {
    id: 19,
    name: "Whispers of Leaves",
    yearOfMaking: new Date("2011-10-10"),
    rating: 1.9,
    description: "A delicate landscape with softly falling leaves.",
    category: ["Landscape"],
    images: [
      "https://placehold.co/800x600?text=Whispers+of+Leaves+1",
      "https://placehold.co/800x600?text=Whispers+of+Leaves+2",
    ],
    dimensions: "30 x 30 inches",
    isFramed: false,
    stateOfPreservation: "Fair",
    proofOfAuthenticity: "Signed by artist",
    sellingPrice: 7799,
    markedPrice: 9499,
    delivery: {
      by: "Indian Post",
      charge: 150,
      type: "Home Delivery",
      from: { city: "Hyderabad", country: "India" },
      estimatedDate: new Date("2025-06-20"),
    },
    tags: ["watercolor", "leaves", "autumn"],
    additionalInfo: {
      medium: "Watercolor on Paper",
      style: "Impressionism",
    },

    comments: [
      {
        id: 1,
        authorId: "collectorX",
        content: "The mood captured here is incredible.",
      },
    ],
    artist: {
      id: "artist19",
      name: "Meera Gupta",
      bio: "Meera Gupta is an Indian artist known for delicate watercolors in Impressionist style.",
      profilePic: "https://randomuser.me/api/portraits/women/3.jpg",
      noOfFollowers: 2430,
    },
  },
  {
    id: 20,
    name: "Dancing Colors",
    yearOfMaking: new Date("2016-05-05"),
    rating: 4.6,
    description: "A vibrant abstract piece full of energetic strokes.",
    category: ["Abstract", "Niche Art"],
    images: [
      "https://placehold.co/800x600?text=Dancing+Colors+1",
      "https://placehold.co/800x600?text=Dancing+Colors+2",
    ],
    dimensions: "50 x 50 cm",
    isFramed: true,
    stateOfPreservation: "Excellent",
    proofOfAuthenticity: "Certificate of Authenticity included",
    sellingPrice: 41999,
    markedPrice: 44499,
    delivery: {
      by: "Skynet Worldwide Express",
      charge: 600,
      type: "Hand Delivery",
      from: { city: "Chennai", country: "India" },
      estimatedDate: new Date("2025-07-15"),
    },
    tags: ["oil painting", "canvas", "contemporary"],
    additionalInfo: {
      medium: "Oil on Canvas",
      style: "Pop Art",
    },

    comments: [
      {
        id: 1,
        authorId: "patron01",
        content: "The use of color is just fantastic.",
      },
    ],
    artist: {
      id: "artist20",
      name: "Sunita Patel",
      bio: "Sunita Patel is an Indian artist known for innovative sculptures in the Modern style.",
      profilePic: "https://randomuser.me/api/portraits/women/64.jpg",
      noOfFollowers: 4606,
    },
  },
];

const Products = () => {
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();

  const selectedCategory = urlSearchParams.get("category");

  const [budgetInput, setBudgetInput] = useState("");
  const [budgetFilter, setBudgetFilter] = useState("");
  const [categoryChoices, setCategoryChoices] = useState(
    selectedCategory ? [selectedCategory] : []
  );
  const [categoryFilter, setCategoryFilter] = useState(
    selectedCategory ? [selectedCategory] : []
  );
  const [minRatingChoice, setMinRatingChoice] = useState("");
  const [minRatingFilter, setMinRatingFilter] = useState("");
  const [sortingOrder, setSortingOrder] = useState("");

  let filteredProducts = [...allProducts];
  if (!budgetFilter && categoryFilter.length === 0 && !minRatingFilter) {
    filteredProducts = [...allProducts];
  } else {
    if (budgetFilter) {
      filteredProducts = filteredProducts.filter(
        (product) => product.sellingPrice <= budgetFilter
      );
    }

    if (categoryFilter.length > 0) {
      filteredProducts = filteredProducts.filter((product) => {
        for (let i = 0; i < categoryFilter.length; i++) {
          for (let j = 0; j < product.category.length; j++) {
            if (categoryFilter[i] == product.category[j]) {
              return true;
            }
          }
        }
        return false;
      });
    }

    if (minRatingFilter) {
      filteredProducts = filteredProducts.filter(
        (product) => product.rating >= minRatingFilter
      );
    }
  }

  const sortByIncreasingPrice = (products) => {
    for (let i = 0; i < products.length; i++) {
      let minIndex = i;
      for (let j = i + 1; j < products.length; j++) {
        if (products[j].sellingPrice < products[minIndex].sellingPrice) {
          minIndex = j;
        }
      }
      let temp = products[minIndex];
      products[minIndex] = products[i];
      products[i] = temp;
    }

    return products;
  };

  const sortByDecreasingPrice = (products) => {
    for (let i = 0; i < products.length; i++) {
      let maxIndex = i;
      for (let j = i + 1; j < products.length; j++) {
        if (products[j].sellingPrice > products[maxIndex].sellingPrice) {
          maxIndex = j;
        }
      }

      let temp = products[maxIndex];
      products[maxIndex] = products[i];
      products[i] = temp;
    }

    return products;
  };

  switch (sortingOrder) {
    case "inc":
      filteredProducts = sortByIncreasingPrice(filteredProducts);
      break;
    case "dec":
      filteredProducts = sortByDecreasingPrice(filteredProducts);
      break;
  }

  const minPriceInINR = 500;
  const maxPriceInINR = 50_000;
  const medianPriceInINR = (minPriceInINR + maxPriceInINR) / 2;

  const categoryHandler = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setCategoryChoices([...categoryChoices, value]);
    } else {
      setCategoryChoices(
        categoryChoices.filter((category) => category !== value)
      );
    }
  };

  const ratingHandler = (event) => {
    setMinRatingChoice(parseInt(event.target.value));
  };

  const applyFilters = (event) => {
    event.preventDefault();

    setBudgetFilter(budgetInput);

    setCategoryFilter([...categoryChoices]);

    setMinRatingFilter(minRatingChoice);
  };

  const clearAllFilters = () => {
    setBudgetInput("");
    setBudgetFilter("");
    setCategoryChoices([]);
    setCategoryFilter([]);
    setMinRatingChoice("");
    setMinRatingFilter("");
  };

  const sortHandler = (event) => {
    const { checked, value } = event.target;

    if (checked) {
      setSortingOrder(value);
    }
  };

  document.querySelector("title").textContent = "Browse Art - Mizuki Hanae";

  return (
    <>
      <Header />
      <main className="mt-5 pb-5 bg-body-tertiary">
        <div className="row pt-3 me-0">
          <aside className="col-3">
            <div
              className="container bg-dark text-light py-4"
              data-bs-theme="dark"
            >
              <form onSubmit={applyFilters}>
                <section className="d-flex justify-content-between align-items-center">
                  <h5>Filters</h5>
                  <div className="btn-group">
                    <button type="submit" className="btn btn-primary z-0">
                      Apply
                    </button>

                    <button
                      className="btn btn-outline-primary z-0"
                      onClick={clearAllFilters}
                    >
                      Clear All
                    </button>
                  </div>
                </section>

                <section className="my-3">
                  <h5>Price (&nbsp;₹&nbsp;)</h5>
                  <div className="d-flex align-items-center">
                    <label htmlFor="budgetInput" className="me-2">
                      Upto
                    </label>
                    <input
                      type="number"
                      id="budgetInput"
                      className="form-control mb-2 mt-1"
                      placeholder={budgetInput || "Not Set"}
                      onChange={(event) => setBudgetInput(event.target.value)}
                      value={budgetInput}
                    />
                  </div>
                  <label
                    htmlFor="priceRangeInput"
                    className="d-flex justify-content-between"
                  >
                    <span>{minPriceInINR}</span>
                    <span>{medianPriceInINR}</span>
                    <span>{maxPriceInINR}</span>
                  </label>
                  <input
                    type="range"
                    className="form-range"
                    min={minPriceInINR}
                    max={maxPriceInINR}
                    step={500}
                    id="priceRangeInput"
                    value={budgetInput}
                    onChange={(event) => setBudgetInput(event.target.value)}
                  />
                </section>

                <section className="my-3">
                  <h5>Category</h5>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      id="abstractCheckbox"
                      className="form-check-input"
                      onChange={categoryHandler}
                      value="Abstract"
                      checked={categoryChoices.includes("Abstract")}
                    />{" "}
                    <label
                      htmlFor="abstractCheckbox"
                      className="form-check-label"
                    >
                      Abstract
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      id="realismCheckbox"
                      className="form-check-input"
                      onChange={categoryHandler}
                      value="Realism"
                      checked={categoryChoices.includes("Realism")}
                    />{" "}
                    <label
                      htmlFor="realismCheckbox"
                      className="form-check-label"
                    >
                      Realism
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      id="figurativeCheckbox"
                      className="form-check-input"
                      onChange={categoryHandler}
                      value="Figurative"
                      checked={categoryChoices.includes("Figurative")}
                    />{" "}
                    <label
                      htmlFor="figurativeCheckbox"
                      className="form-check-label"
                    >
                      Figurative
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      id="portraitCheckbox"
                      className="form-check-input"
                      onChange={categoryHandler}
                      value="Portrait"
                      checked={categoryChoices.includes("Portrait")}
                    />{" "}
                    <label
                      htmlFor="portraitCheckbox"
                      className="form-check-label"
                    >
                      Portrait
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      id="nicheArtCheckbox"
                      className="form-check-input"
                      onChange={categoryHandler}
                      value="Niche Art"
                      checked={categoryChoices.includes("Niche Art")}
                    />{" "}
                    <label
                      htmlFor="nicheArtCheckbox"
                      className="form-check-label"
                    >
                      Niche Art
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      id="landscapeCheckbox"
                      className="form-check-input"
                      onChange={categoryHandler}
                      value="Landscape"
                      checked={categoryChoices.includes("Landscape")}
                    />{" "}
                    <label
                      htmlFor="landscapeCheckbox"
                      className="form-check-label"
                    >
                      Landscape
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      id="seascapeCheckbox"
                      className="form-check-input"
                      onChange={categoryHandler}
                      value="Seascape"
                      checked={categoryChoices.includes("Seascape")}
                    />{" "}
                    <label
                      htmlFor="seascapeCheckbox"
                      className="form-check-label"
                    >
                      Seascape
                    </label>
                  </div>
                </section>

                <section className="my-3">
                  <h5>Rating</h5>
                  <div className="form-check">
                    <input
                      type="radio"
                      id="fourPlusRatingRadioBtn"
                      name="ratingPref"
                      className="form-check-input"
                      value="4"
                      onChange={ratingHandler}
                      checked={minRatingChoice == 4}
                    />{" "}
                    <label
                      htmlFor="fourPlusRatingRadioBtn"
                      className="form-check-label"
                    >
                      4 Stars & above
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      id="threePlusRadioBtn"
                      name="ratingPref"
                      className="form-check-input"
                      value="3"
                      onChange={ratingHandler}
                      checked={minRatingChoice == 3}
                    />{" "}
                    <label
                      htmlFor="threePlusRadioBtn"
                      className="form-check-label"
                    >
                      3 Stars & above
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      id="twoPlusRadioBtn"
                      name="ratingPref"
                      className="form-check-input"
                      value="2"
                      onChange={ratingHandler}
                      checked={minRatingChoice == 2}
                    />{" "}
                    <label
                      htmlFor="twoPlusRadioBtn"
                      className="form-check-label"
                    >
                      2 Stars & above
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      id="onePlusRadioBtn"
                      name="ratingPref"
                      className="form-check-input"
                      value="1"
                      onChange={ratingHandler}
                      checked={minRatingChoice == 1}
                    />{" "}
                    <label
                      htmlFor="onePlusRadioBtn"
                      className="form-check-label"
                    >
                      1 Star & above
                    </label>
                  </div>
                </section>

                <section className="my-3">
                  <h5>Sort by</h5>
                  <div className="form-check">
                    <input
                      type="radio"
                      id="ascendingSortRadioBtn"
                      name="sortRadioBtn"
                      className="form-check-input"
                      value="inc"
                      onChange={sortHandler}
                    />{" "}
                    <label
                      htmlFor="ascendingSortRadioBtn"
                      className="form-check-label"
                    >
                      Price: Low to High
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      id="descendingSortRadioBtn"
                      name="sortRadioBtn"
                      className="form-check-input"
                      value="dec"
                      onChange={sortHandler}
                    />{" "}
                    <label
                      htmlFor="descendingSortRadioBtn"
                      className="form-check-label"
                    >
                      Price: High to Low
                    </label>
                  </div>
                </section>
              </form>
            </div>
          </aside>
          <div className="col-9">
            <div className="container pt-4">
              <div className="d-flex">
                <h5 className="mb-4">Showing All Products </h5>
                <p className="fs-6 fw-light ms-3">
                  ( Showing {filteredProducts.length} products )
                </p>
              </div>
              <div className="row g-4">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="col-md-3">
                    <ProductListing product={product} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Products;
