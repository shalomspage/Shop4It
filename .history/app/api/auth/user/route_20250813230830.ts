import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // Forward request to Django backend
    const backendRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/user/`, {
      headers: {
        Authorization: authHeader,
      },
    });

    if (!backendRes.ok) {
      return NextResponse.json({ message: "Invalid token" }, { status: backendRes.status });
    }

    const user = await backendRes.json();
    return NextResponse.json(user);
  } catch (err) {
    console.error("API proxy error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
