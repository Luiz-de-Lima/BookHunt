"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getBookDetails } from "../services/services";

export default function BookDetails({ params }) {
  const { id } = params;
  const [bookData, setBookData] = useState(null);
  const [favoriteBook, setFavoriteBook] = useState(null);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favoriteBooks");
    if (storedFavorites) {
      booksFavorite = JSON.parse(storedFavorites);
      setFavoriteBook(booksFavorite);
    }
  }, [booksFavorite]);
  useEffect(() => {
    localStorage.setItem("favoriteBooks", JSON.stringify(favoriteBook));
  });

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Link href="/">
        <button className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
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
