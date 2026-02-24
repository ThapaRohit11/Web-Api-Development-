import Link from "next/link";
import { isAuthenticated } from "@/lib/auth-utils";
import ConfirmLogoutButton from "@/components/ConfirmLogoutButton";

export default async function Header() {
  const authenticated = await isAuthenticated();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="text-2xl font-bold text-white">
          Recipe Finder
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link href="/" className="text-white transition hover:text-yellow-400">
            Home
          </Link>
          <Link href="/about" className="text-white transition hover:text-yellow-400">
            About
          </Link>
          <Link href="/recipes" className="text-white transition hover:text-yellow-400">
            Recipes
          </Link>
          {authenticated && (
            <Link href="/user/profile/favorites" className="text-white transition hover:text-yellow-400">
              Favorites
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {authenticated ? (
            <>
              <Link
                href="/user/profile"
                className="text-white transition hover:text-yellow-400"
              >
                Profile
              </Link>

              <ConfirmLogoutButton className="rounded-lg bg-yellow-500 px-6 py-2 font-semibold text-black transition hover:bg-yellow-600" />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-white transition hover:text-yellow-400"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="rounded-lg bg-yellow-500 px-6 py-2 font-semibold text-black transition hover:bg-yellow-600"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
