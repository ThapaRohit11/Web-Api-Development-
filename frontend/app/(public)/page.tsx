import Link from "next/link";
import Header from "../(auth)/components/Header";
import { isAuthenticated } from "../../lib/auth-utils";

export default async function Home() {
  const authenticated = await isAuthenticated();

  const recipes = [
    {
      id: 1,
      title: "Chocolate Cake",
      category: "Desserts",
      time: "45 min",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 2,
      title: "Caesar Salad",
      category: "Salads",
      time: "15 min",
      image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 3,
      title: "Spaghetti Carbonara",
      category: "Pasta",
      time: "30 min",
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 4,
      title: "Chicken Tikka",
      category: "Indian",
      time: "50 min",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 5,
      title: "Thai Green Curry",
      category: "Asian",
      time: "35 min",
      image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 6,
      title: "Burger",
      category: "Fast Food",
      time: "25 min",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-br from-slate-900 via-slate-800 to-black overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400 rounded-full mix-blend-screen blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-400 rounded-full mix-blend-screen blur-3xl"></div>
        </div>

        <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center">
          <h2 className="text-6xl md:text-7xl font-bold text-white mb-6">
            Discover Delicious <span className="text-yellow-400">Recipes</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mb-8">
            Explore thousands of recipes, save your favorites, and cook amazing meals every day. From quick weeknight dinners to impressive dinner party dishes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={authenticated ? "/recipes" : "/login"} className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 rounded-lg transition text-lg">
              Get Started
            </Link>
            <button className="border-2 border-white text-white hover:bg-white/10 font-bold px-8 py-4 rounded-lg transition text-lg">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Featured Recipes Section */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-white mb-4">Featured Recipes</h3>
            <p className="text-gray-400 text-lg">Explore our most popular recipes</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition duration-300 cursor-pointer border border-gray-700"
              >
                <div className="relative h-48">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-xl font-bold text-white mb-2">{recipe.title}</h4>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span className="bg-gray-700 px-3 py-1 rounded">{recipe.category}</span>
                    <span>⏱️ {recipe.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-4xl font-bold text-white text-center mb-12">Why Choose Recipe Finder?</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-yellow-400 transition">
              <div className="text-4xl mb-4">🔍</div>
              <h4 className="text-xl font-bold text-white mb-2">Easy Search</h4>
              <p className="text-gray-400">Find recipes by ingredients, cuisine type, or cooking time</p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-yellow-400 transition">
              <div className="text-4xl mb-4">❤️</div>
              <h4 className="text-xl font-bold text-white mb-2">Save Favorites</h4>
              <p className="text-gray-400">Keep track of your favorite recipes in one convenient place</p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-yellow-400 transition">
              <div className="text-4xl mb-4">👨‍🍳</div>
              <h4 className="text-xl font-bold text-white mb-2">Expert Tips</h4>
              <p className="text-gray-400">Get cooking tips and tricks from professional chefs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-400">
          <p>&copy; 2025 Recipe Finder. All rights reserved.</p>
          <p className="mt-2">Find your next favorite recipe today! 🍳</p>
        </div>
      </footer>
    </>
  );
}
