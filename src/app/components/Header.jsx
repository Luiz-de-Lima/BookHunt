"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SearchBar } from "./SearchBar";

export const Header = ({ onSearch }) => {
  const [hasFavorites, setHasFavorite] = useState(false);
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favoriteBooks");
    if (storedFavorites && JSON.parse(storedFavorites).length > 0) {
      setHasFavorite(true);
    } else {
      setHasFavorite(false);
    }
  }, []);
  return (
    <header className="w-full bg-[#e8edf7bd] py-4 px-6 shadow-md flex flex-col md:flex-row justify-between items-center border-solid border-red-500 rounded-2xl">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-4">
        <h1 className="text-yellow-400 text-2xl font-bold focus:outline-none">
          BookHunt
        </h1>
      </div>
      <SearchBar onSearch={onSearch} />
      {hasFavorites && (
        <Link href="/favoritos">
          <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Meus Favoritos
          </button>
        </Link>
      )}
    </header>
  );
};
