"use client";
import React, { useState } from "react";
import { SearchBar } from "./SearchBar";

export const Header = ({ onSearch }) => {
  return (
    <header className="w-full bg-[#e8edf7bd] py-4 px-6 shadow-md flex justify-between items-center border-solid border-red-500 rounded-2xl">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-4">
        <h1 className="text-yellow-400 text-2xl font-bold focus:outline-none">
          BookHunt
        </h1>
      </div>
      <SearchBar onSearch={onSearch} />
    </header>
  );
};
