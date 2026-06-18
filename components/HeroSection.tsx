import { IMAGE_PATH } from "@/constants";
import { Popcorn, Search } from "lucide-react"
import Image from "next/image"

interface IHeroSectionProps {
    movies: IMovie[];
    searchTerm: string;
    setSearchTerm: (value: string) => void;
}

const HeroSection = ({movies, searchTerm, setSearchTerm}: IHeroSectionProps) => {
  return (
    <header className="relative h-[70vh]">
        <div className="w-5/12 z-10 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 ">
            <div className="flex items-center justify-center flex-col mb-4 gap-4">
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-red-500 shadow-lg mb-4">
                <Popcorn className="w-8 h-8" />
                </div>
                <h1 className="text-7xl font-bold tracking-tight">
                    MovieBox
                </h1>
                <p className="text-2xl tracking-tight font-light mb-4 text-santas-gray">
                    Discover the most popular movies trending right now
                </p>
                <div className="relative h-12">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-santas-gray"/>
                    <input
                    className="mb-10 w-full h-full rounded-xl pl-10 pr-10 outline-none border-none bg-dark-black"
                    placeholder="Search for movies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
        </div>

        <div className="grid grid-cols-5 gap-1 opacity-60 absolute inset-0">
            {movies.length >= 5
            ? movies.map((movie) => <div key={movie.id}>
                <Image className="h-full w-full object-cover" 
                width={250}
                height={250}
                alt={movie.title}
                src={movie.poster_path ? `${IMAGE_PATH}${movie.poster_path}` : "/placeholder-image.svg"}/>
                </div>)
            : Array(5).fill(5).map((_, index) => (
                <div key={index}>
                    <Image
                        className="h-full w-full object-cover"
                        src={`/movie-img/movie-${index + 1}.webp`}
                        alt="Movie Image"
                        width={250}
                        height={250}
                    />
                </div>
            ))}
        </div>

        <div className="absolute inset-0 bg-linear-to-t from-woodsmoke via-woodsmoke/80 to-transparent"></div>
        <div className="absolute inset-0 bg-linear-to-t from-woodsmoke/90 via-tranparent to-woodsmoke/90"></div>
    </header>
    )
}

export default HeroSection