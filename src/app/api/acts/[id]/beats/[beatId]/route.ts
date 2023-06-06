type Params = {
  params: {
    id: number;
    beatId: number;
  };
};

export async function DELETE(request: Request, { params }: Params) {
  const { id, beatId } = params;
  await fetch(`http://localhost:8080/acts/${id}/beats/${beatId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
