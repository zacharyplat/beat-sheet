type Params = {
  params: {
    id: number;
  };
};

export async function PUT(request: Request, { params }: Params) {
  const body = await request.json();
  const id = params.id;

  await fetch(`http://localhost:8080/acts/beats/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
  });
}
