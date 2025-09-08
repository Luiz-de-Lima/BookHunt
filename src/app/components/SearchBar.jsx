"use client";
import React, { useEffect, useState } from "react";

export const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    e.preventDefault();
    onSearch(searchTerm);
  };
  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center w-full max-w-md mx-auto mt-4"
    >
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Pesquisar por livros..."
        className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
      <button
        type="submit"
        className="p-2 bg-yellow-400 text-gray-800 font-semibold rounded-r-md hover:bg-yellow-500 transition-colors border-red-500"
      >
        Buscar
      </button>
    </form>
  );
};
