import { cookies } from "next/headers";

export interface User {
  id: string;
  name: string;
  email: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
}

interface RawUser {
  id?: string;
  _id?: string;
  name?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
}

function mapUser(raw: RawUser): User {
  const fallbackName = `${raw.firstName ?? ""} ${raw.lastName ?? ""}`.trim();

  return {
    id: raw.id || raw._id || "",
    name: raw.name || raw.username || fallbackName || "",
    email: raw.email || "",
    username: raw.username,
    firstName: raw.firstName,
    lastName: raw.lastName,
    role: raw.role,
  };
}

export async function getUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get("user");
    
    if (!userCookie) {
      return null;
    }

    const parsed = JSON.parse(userCookie.value) as RawUser;
    return mapUser(parsed);
  } catch (error) {
    console.error("Error parsing user cookie:", error);
    return null;
  }
}

export async function getToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("token");
  return tokenCookie?.value || null;
}

export async function isAuthenticated(): Promise<boolean> {
  const user = await getUser();
  const token = await getToken();
  return !!(user && token);
}

export async function isAdmin(): Promise<boolean> {
  const user = await getUser();
  return user?.role === "admin";
}
