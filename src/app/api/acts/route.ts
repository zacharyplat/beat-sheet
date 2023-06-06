import { NextResponse } from "next/server";

type Params = {
  params: {
    id: number;
  };
};
export async function GET() {
  const res = await fetch("http://localhost:8080/acts");
  const data = await res.json();

  return NextResponse.json(data);
}

export async function POST(request: Request, { params }: Params) {
  const body = await request.json();

  console.log(body);
  const res = await fetch(`http://localhost:8080/acts/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: body }),
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to add act");
  }

  const data = await res.json();

  return NextResponse.json(data);
}
