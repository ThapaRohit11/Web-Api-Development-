import Header from "../(auth)/components/Header";

export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-yellow-400 mix-blend-screen blur-3xl" />
          <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-orange-400 mix-blend-screen blur-3xl" />
        </div>

        <section className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col justify-center px-6 py-12 md:py-16">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-yellow-400">About Recipe Finder</p>
          <h1 className="mb-6 max-w-3xl text-4xl font-bold md:text-5xl">Helping you discover, save, and cook recipes you love.</h1>
          <p className="max-w-3xl text-lg text-gray-300">Recipe Finder is built for home cooks who want simple discovery, quick inspiration, and a clean way to keep favorite meals in one place.</p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <article className="rounded-xl border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 p-6">
              <h2 className="mb-3 text-xl font-semibold">Our Mission</h2>
              <p className="text-gray-300">
                Make cooking easier by connecting people to recipes that match their taste,
                schedule, and ingredients.
              </p>
            </article>

            <article className="rounded-xl border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 p-6">
              <h2 className="mb-3 text-xl font-semibold">What You Get</h2>
              <p className="text-gray-300">
                Search-friendly browsing, favorite management, and a focused experience across
                desktop and mobile.
              </p>
            </article>

            <article className="rounded-xl border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 p-6">
              <h2 className="mb-3 text-xl font-semibold">Why It Matters</h2>
              <p className="text-gray-300">
                Great meals should be accessible every day, whether you are a beginner or an
                experienced cook.
              </p>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}
