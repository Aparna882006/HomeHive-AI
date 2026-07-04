import commonProperty from "./commonProperty";

const properties = [
  {
    id: 1,
    title: "Luxury Apartment in Koramangala",
    location: "Koramangala, Bangalore",
    city: "Bangalore",
    price: 24000,
    deposit: 50000,
    rating: 4.9,
    reviews: 128,
    bedrooms: 2,
    bathrooms: 2,
    area: 1250,

    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200",
      "https://images.unsplash.com/photo-1560185008-b033106af5c3?w=1200",
    ],

    ...commonProperty,
  },

  {
    id: 2,
    title: "Modern Studio Apartment",
    location: "HSR Layout, Bangalore",
    city: "Bangalore",
    price: 18000,
    deposit: 30000,
    rating: 4.8,
    reviews: 92,
    bedrooms: 1,
    bathrooms: 1,
    area: 650,

    images: [
      "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200",
    ],

    ...commonProperty,
  },

  {
    id: 3,
    title: "Shared Flat for Students",
    location: "Whitefield, Bangalore",
    city: "Bangalore",
    price: 12000,
    deposit: 20000,
    rating: 4.7,
    reviews: 70,
    bedrooms: 3,
    bathrooms: 2,
    area: 1400,

    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200",
    ],

    ...commonProperty,
  },

  {
    id: 4,
    title: "Premium Villa",
    location: "Indiranagar, Bangalore",
    city: "Bangalore",
    price: 45000,
    deposit: 100000,
    rating: 5.0,
    reviews: 201,
    bedrooms: 4,
    bathrooms: 4,
    area: 3200,

    images: [
      "https://images.unsplash.com/photo-1560185008-b033106af5c3?w=1200",
    ],

    ...commonProperty,
  },
];

export default properties;