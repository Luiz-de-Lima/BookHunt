"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import BookCard from "../components/BookCard";
import { getBookDetails } from "../services/services"; // Importa a função para detalhes

export default function FavoritesPage() {
  const [favoriteDetails, setFavoriteDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Efeito para carregar os IDs dos favoritos do LocalStorage
  useEffect(() => {
    const fetchFavoriteDetails = async () => {
      setIsLoading(true);
      try {
        const storedFavorites = localStorage.getItem("favoriteBooks");

        const parsedFavorites = storedFavorites
          ? JSON.parse(storedFavorites)
          : [];

        // Filtra a lista para remover IDs inválidos
        const validFavoriteIds = parsedFavorites.filter(Boolean);

        if (validFavoriteIds.length > 0) {
         

         const details = await Promise.all(
            validFavoriteIds.map(async (id) => {
              const bookDetail = await getBookDetails(id);
              return bookDetail;
            })
          );

          setFavoriteDetails(details);
     
        } else {
          setFavoriteDetails([]);
        }
      } catch (error) {
        console.error("Erro ao buscar detalhes dos favoritos:", error);
        setFavoriteDetails([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFavoriteDetails();
  }, []); // Este efeito é disparado quando a lista de IDs de favoritos muda

  return (
    <main className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl p-8 justify-items-center grid gap-4">
      <h1 className="text-3xl font-bold mb-4">Meus Livros Favoritos</h1>
      <Link href="/">
        <button className="mb-4 px-4 py-2 bg-[#feb633] text-gray-700 font-semibold rounded hover:bg-yellow-400">
          ← Voltar para a busca
        </button>
      </Link>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {isLoading ? (
          <p>Carregando seus favoritos...</p>
        ) : favoriteDetails.length > 0 ? (
          favoriteDetails.map((livro) => (
            <BookCard key={livro.id} livro={livro} />
          ))
        ) : (
          <p className="text-black">
            Você ainda não tem nenhum livro favorito.
          </p>
        )}
      </section>
    </main>
  );
}
