import BoardPage from "../../page"

type PageProps = {
  params: { boardId: string; cardId: string }
}

export default function CardPage({ params }: PageProps) {
  const { boardId, cardId } = params

  return (
    <div>
      <BoardPage params={params} />
    </div>
  )
}
