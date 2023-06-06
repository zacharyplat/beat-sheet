type Params = {
  params: {
    id: number;
  };
};

export async function DELETE(request: Request, { params }: Params) {
  const { id } = params;
  return await fetch(`http://localhost:8080/acts/${id}`, {
    method: "DELETE",
  });
}
