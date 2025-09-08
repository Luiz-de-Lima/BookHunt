"use client";
import { useEffect, useState } from "react";
import BookCard from "./components/BookCard";
import { Header } from "./components/Header";
import { searchBooks } from "./services/services";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadingBooks = async () => {
    setIsLoading(true);
    try {
      const result = await searchBooks("Javascript");
      setBooks(result);
    } catch (error) {
      console.error(`Falha ao carregadr Livros: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    loadingBooks();
  }, []);

  const handleSearch = async (searchTermo) => {
    if (!searchTermo.trim()) {
      loadingBooks();
      return;
    }
    setIsLoading(true);
    try {
      const results = await searchBooks(searchTermo);
      setBooks(results);
    } catch (error) {
      console.error(`Falha ao buscar Livros: ${error}`);
      setBooks([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl p-8 justify-items-center grid gap-4">
      <Header onSearch={handleSearch} />

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {isLoading ? (
          <p>Carregando livros...</p>
        ) : books.length > 0 ? (
          books.map((livro) => <BookCard key={livro.id} livro={livro} />)
        ) : (
          <p className="text-black">
            Nenhum livro encontrado para o termo de pesquisa
          </p>
        )}
      </section>
    </main>
  );
}
