import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("http://localhost:8080/acts");
  const data = await res.json();

  return NextResponse.json({ data });
}
