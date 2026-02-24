import { redirect } from "next/navigation";
import { isAuthenticated, isAdmin } from "@/lib/auth-utils";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default async function ProtectedRoute({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/login");
  }

  if (requireAdmin) {
    const admin = await isAdmin();
    if (!admin) {
      redirect("/user/profile"); // Redirect non-admin users to profile
    }
  }

  return <>{children}</>;
}
