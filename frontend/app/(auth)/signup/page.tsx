import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-black">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-yellow-400 mix-blend-screen blur-3xl" />
        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-orange-400 mix-blend-screen blur-3xl" />
      </div>

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative grid min-h-[calc(100vh-4rem)] place-items-center p-4">
        <section className="w-full max-w-md rounded-xl border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 p-6 text-white">
          <h1 className="text-2xl font-bold">Create your free account</h1>
          <p className="text-sm text-white/70 mt-1 mb-6">
            Get started!
          </p>

          <RegisterForm />
        </section>
      </div>
    </main>
  );
}
