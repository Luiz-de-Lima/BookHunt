"use client";
import { useEffect, useState, use } from "react";
import Link from "next/link";
import { getBookDetails } from "../services/services";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

export default function BookDetails({ params }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const [bookData, setBookData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [favoriteBooks, setFavoriteBooks] = useLocalStorage(
    "favoriteBooks",
    [],
    2
  );

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favoriteBooks");
    if (storedFavorites) {
      setFavoriteBooks(JSON.parse(storedFavorites));
    }
  }, []);

  // Salva os favoritos no LocalStorage sempre que a lista de favoritos mudar
  useEffect(() => {
    localStorage.setItem("favoriteBooks", JSON.stringify(favoriteBooks));
  }, [favoriteBooks]);

  // Busca os detalhes do livro na API
  useEffect(() => {
    if (id) {
      const fetchDetails = async () => {
        try {
          setIsLoading(true);
          const data = await getBookDetails(id);
          setBookData(data);
        } catch (error) {
          console.error("Erro ao carregar os detalhes do livro", error);
          setBookData(null);
        } finally {
          setIsLoading(false);
        }
      };
      fetchDetails();
    }
  }, [id]);

  
  const toggleFavorite = () => {
    const isFavorite = favoriteBooks.includes(id);
    if (isFavorite) {
      setFavoriteBooks((prevFavorites) =>
        prevFavorites.filter((bookId) => bookId !== id)
      );
    } else {
      setFavoriteBooks((prevFavorites) => [...prevFavorites, id]);
    }
  };
  if (isLoading) {
    return <p>Carregando detalhes do livro...</p>;
  }
  if (!bookData || bookData.error) {
    return <p>Livro não encontrado ou erro ao carregar.</p>;
  }

  const { volumeInfo } = bookData;

  return (
    <div className="container mx-auto p-4 max-w-2xl bg-[#e8edf7bd]">
      <Link href="/">
        <button className="mb-4 px-4 py-2 bg-[#feb633] text-gray-700 font-semibold rounded hover:bg-yellow-400">
          ← Voltar para a lista
        </button>
      </Link>
      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center">
        {volumeInfo.imageLinks?.thumbnail && (
          <img
            src={volumeInfo.imageLinks.thumbnail}
            alt={`Capa do livro ${volumeInfo.title}`}
            className="w-full max-w-xs object-contain rounded-md mb-4"
          />
        )}

        <h1 className="text-3xl font-bold mb-2">{volumeInfo.title}</h1>
        <p className="text-lg text-gray-600 mb-4">
          Autor(es): {volumeInfo.authors?.join(", ")}
        </p>

        <button
          onClick={toggleFavorite}
          className="px-6 py-3 rounded-full text-white font-semibold shadow-md transition-all duration-300 transform hover:scale-105"
          style={{
            backgroundColor: favoriteBooks.includes(id) ? "#EF4444" : "#feb633",
          }}
        >
          {favoriteBooks.includes(id)
            ? "❤️ Livro Favorito"
            : "🤍 Adicionar aos Favoritos"}
        </button>

        <div className="mt-6 text-left">
          <h2 className="text-2xl font-semibold mb-2">Descrição</h2>
          <p
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: volumeInfo.description || "Descrição não disponível.",
            }}
          ></p>
        </div>
      </div>
    </div>
  );
}
