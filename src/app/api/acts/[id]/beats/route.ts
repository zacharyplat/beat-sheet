import { NextResponse } from "next/server";

type Params = {
  params: {
    id: number;
  };
};
export async function GET(request: Request, { params }: Params) {
  const id = params.id;
  const res = await fetch(`http://localhost:8080/acts/${id}/beats`);
  const data = await res.json();

  return NextResponse.json(data);
}
export async function POST(request: Request, { params }: Params) {
  const body = await request.json();
  const id = params.id;

  const res = await fetch(`http://localhost:8080/acts/${id}/beats`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  return NextResponse.json(data);
}
