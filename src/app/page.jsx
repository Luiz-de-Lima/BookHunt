"use client";
import { useEffect, useState } from "react";
import BookCard from "./components/BookCard";
import { Header } from "./components/Header";
import { searchBooks } from "./services/services";

export default function Home() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    async function loadingBooks() {
      const result = await searchBooks("Javascript");
      setBooks(result);
    }
    loadingBooks();
  }, []);

  return (
    <main className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl p-8 justify-items-center grid gap-4">
      <Header />

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {books.length > 0 ? (
          books.map((livro, index) => (
            <BookCard livro={livro.volumeInfo} key={index} />
          ))
        ) : (
          <p className="text-black">Carregando livros...</p>
        )}
      </section>
    </main>
  );
}
