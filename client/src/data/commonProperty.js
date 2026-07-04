const commonProperty = {
  availableFrom: "1 August 2026",

  propertyType: "Apartment",

  furnished: "Fully Furnished",

  gender: "Anyone",

  description:
    "Beautiful premium apartment located near major IT companies, metro station, cafes and shopping malls. Perfect for students and working professionals.",

  amenities: [
    "WiFi",
    "Air Conditioner",
    "Parking",
    "Gym",
    "Laundry",
    "Kitchen",
    "Power Backup",
    "Security",
    "Lift",
    "Housekeeping",
    "Balcony",
    "RO Water",
  ],

  owner: {
    name: "Rahul Sharma",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    phone: "+91 9876543210",
    joined: "2022",
    responseRate: "98%",
  },

  flatmates: [
    {
      name: "Aman",
      age: 24,
      profession: "Software Engineer",
      image: "https://randomuser.me/api/portraits/men/21.jpg",
      cleanliness: 95,
      sleep: "11 PM",
    },
    {
      name: "Priya",
      age: 23,
      profession: "UI Designer",
      image: "https://randomuser.me/api/portraits/women/54.jpg",
      cleanliness: 92,
      sleep: "10 PM",
    },
  ],

  aiCompatibility: {
    score: 94,
    budget: 96,
    lifestyle: 93,
    cleanliness: 98,
    workSchedule: 90,
    foodHabits: 89,
  },

  nearby: [
    {
      place: "Metro Station",
      distance: "500 m",
    },
    {
      place: "Hospital",
      distance: "700 m",
    },
    {
      place: "Shopping Mall",
      distance: "1 km",
    },
    {
      place: "Bus Stop",
      distance: "300 m",
    },
  ],

  userReviews: [
    {
      name: "Anjali",
      rating: 5,
      comment: "Amazing property with friendly flatmates.",
    },
    {
      name: "Rohit",
      rating: 5,
      comment: "Owner is very cooperative. Highly recommended.",
    },
  ],
};

export default commonProperty;