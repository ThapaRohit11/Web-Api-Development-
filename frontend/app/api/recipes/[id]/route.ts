import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!apiBaseUrl) {
      return NextResponse.json({ success: false, message: "API base URL is not configured" }, { status: 500 });
    }

    const { id } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const response = await fetch(`${apiBaseUrl}/api/recipes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const result = await response.json().catch(() => ({ success: false, message: "Invalid response from backend" }));
    return NextResponse.json(result, { status: response.status });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error?.message || "Update failed" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!apiBaseUrl) {
      return NextResponse.json({ success: false, message: "API base URL is not configured" }, { status: 500 });
    }

    const { id } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const response = await fetch(`${apiBaseUrl}/api/recipes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const result = await response.json().catch(() => ({ success: false, message: "Invalid response from backend" }));
    return NextResponse.json(result, { status: response.status });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error?.message || "Delete failed" }, { status: 500 });
  }
}
