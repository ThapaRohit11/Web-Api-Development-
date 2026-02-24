export interface RecipePost {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  authorName: string;
  authorUsername: string;
  createdAt: string;
}

export const recipePosts: RecipePost[] = [
  {
    id: "1",
    title: "Creamy Garlic Pasta",
    description:
      "A rich and comforting pasta made with fresh garlic, cream, parmesan, and herbs. This recipe is perfect for quick weeknight dinners and can be customized with mushrooms, spinach, or grilled chicken. Cook pasta al dente, prepare a silky garlic cream sauce, and finish with parmesan and black pepper for a restaurant-style meal at home.",
    imageUrl:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=1200&q=80",
    authorName: "Rohit",
    authorUsername: "rohit",
    createdAt: "2 hours ago",
  },
  {
    id: "2",
    title: "Paneer Butter Masala",
    description:
      "A classic North Indian curry featuring soft paneer cubes in a tomato-cashew gravy. Butter, cream, and warm spices like garam masala create a smooth and flavorful dish. Serve it with naan, roti, or jeera rice for a satisfying meal.",
    imageUrl:
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=1200&q=80",
    authorName: "Ananya",
    authorUsername: "ananya",
    createdAt: "5 hours ago",
  },
  {
    id: "3",
    title: "Thai Coconut Curry",
    description:
      "This fragrant curry combines coconut milk, red curry paste, mixed vegetables, and fresh basil. It has a perfect balance of spicy, sweet, and savory flavors. Pair with jasmine rice for a complete and aromatic dinner.",
    imageUrl:
      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=1200&q=80",
    authorName: "Meera",
    authorUsername: "meera",
    createdAt: "1 day ago",
  },
  {
    id: "4",
    title: "Chocolate Lava Cake",
    description:
      "A decadent dessert with a soft exterior and warm molten chocolate center. This recipe uses pantry basics and bakes in under 15 minutes. Serve immediately with vanilla ice cream for best results.",
    imageUrl:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1200&q=80",
    authorName: "Rohit",
    authorUsername: "rohit",
    createdAt: "2 days ago",
  },
  {
    id: "5",
    title: "Mediterranean Chickpea Salad",
    description:
      "A fresh and protein-rich salad with chickpeas, cucumber, tomato, olives, and feta. Tossed in lemon-olive oil dressing, it is ideal for lunch prep or a healthy side dish. Chill for 20 minutes before serving to enhance flavor.",
    imageUrl:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80",
    authorName: "Aarav",
    authorUsername: "aarav",
    createdAt: "3 days ago",
  },
  {
    id: "6",
    title: "Smoky Veggie Burger",
    description:
      "A flavorful burger patty made from black beans, oats, and roasted veggies, pan-seared until crisp outside and tender inside. Layer with lettuce, tomato, onions, and sauce for a satisfying homemade burger night.",
    imageUrl:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80",
    authorName: "Neha",
    authorUsername: "neha",
    createdAt: "4 days ago",
  },
];
