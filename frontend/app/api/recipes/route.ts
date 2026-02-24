import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(request: Request) {
  try {
    if (!apiBaseUrl) {
      return NextResponse.json(
        { success: false, message: "API base URL is not configured" },
        { status: 500 }
      );
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const incomingForm = await request.formData();
    const title = String(incomingForm.get("title") || "").trim();
    const description = String(incomingForm.get("description") || "").trim();
    const image = incomingForm.get("image");

    if (!title || !description || !(image instanceof File)) {
      return NextResponse.json(
        { success: false, message: "Title, description and image are required" },
        { status: 400 }
      );
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    const response = await fetch(`${apiBaseUrl}/api/recipes`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
      cache: "no-store",
    });

    const body = await response.json().catch(() => ({
      success: false,
      message: "Invalid response from backend",
    }));

    return NextResponse.json(body, { status: response.status });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Upload failed" },
      { status: 500 }
    );
  }
}
