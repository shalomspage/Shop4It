import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization");

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/auth/users/me/`, {
      headers: { Authorization: `Token ${token}` }, // Must match Djoser format
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json(errorData, { status: res.status });
    }

    const user = await res.json();
    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
