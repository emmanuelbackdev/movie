"use client"

import HeroSection from "@/components/HeroSection";
import { API_URL, IMAGE_PATH } from "@/constants";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchMovies = async (query = "") => {
    try {
      const response = await fetch(
        query
        ? `${API_URL}/search/movie?query=${encodeURIComponent(query)}` :`${API_URL}/discover/movie`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        },
      });
      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error(error);
    }
  };

    useEffect(() => {
      fetchMovies();
    }, []);

    useEffect(() => {
      const timer = setTimeout(() => {
        fetchMovies(searchTerm);
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    }, [searchTerm]);

  return (
    <div>
      <HeroSection movies={movies.slice(0, 5)} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="flex flex-col m-10 mt-10">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-alabaster mb-3"> Popular Movies</h2>
          <p className="text-lg text-santas-gray">Explore the most popular movies of the moment
          </p>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-6">
        {movies.map((movie) => (
        <div key={movie.id} className="group">
          <div className="relative overflow-hidden cursor-pointer group rounded-xl">
            <Image
            className="group-hover:scale-110 duration-500 h-full w-full object-cover"
            src={movie.poster_path ? `${IMAGE_PATH}${movie.poster_path}` : "/placeholder-image.svg"}
              alt={movie.title}
              width={250}
              height={250}
            />
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};