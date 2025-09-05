"use client";
import React, { useState } from "react";

export const SearchBar = ({ onSearch }) => {
  const [termo, setTermo] = useState("");
  const handleSearch = (e) => {
    const value = e.target.value;
    e.preventDefault();
    if (value) {
      setTermo(value);
      onSearch(termo);
    }
  };
  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center w-full max-w-md mx-auto mt-4"
    >
      <input
        type="text"
        value={termo}
        onChange={handleSearch}
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
