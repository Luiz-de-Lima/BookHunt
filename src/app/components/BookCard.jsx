import Link from "next/link";

export default function BookCard({ livro }) {
  const livroId = livro.id;
  const { volumeInfo: dadosDoLivro } = livro;

  return (
    <div className="w-full max-w-xs bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 items-center p-2">
      <img
        src={dadosDoLivro.imageLinks?.thumbnail}
        alt={`Capa do livro ${dadosDoLivro.title}`}
        className="w-full h-60 object-contain rounded-md"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-1">{dadosDoLivro.title}</h2>
        <p className="text-sm text-gray-300 mb-2">
          {dadosDoLivro.authors?.join(", ")}
        </p>
        <Link
          href={`/books/${livroId}`}
          className="mt-2 px-4 py-2 bg-[#feb633] text-white text-bold rounded hover:bg-yellow-500 hover:text-gray-200 transition font-semibold"
        >
          Ver mais
        </Link>
      </div>
    </div>
  );
}
