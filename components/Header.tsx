import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import BasicMenu from "./BasicMenu";
import HomeLink from "@/components/HomeLink";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

interface SearchResult {
  id: number;
  title: string;
}

async function searchMovies(query: string): Promise<SearchResult[]> {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  );
  const data = await response.json();
  return data.results;
}

export default function Header() {
  const { logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const [activeLink, setActiveLink] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearchSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const results = await searchMovies(searchQuery);
    setSearchResults(results);
  };

  const handleSearchChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSearchQuery(value);
    if (value.length > 0) {
      const results = await searchMovies(value[0]);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <header className={`transition-all ${isScrolled && "bg-[#141414]"}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <img
          src="https://imgtr.ee/images/2023/05/04/avsKn.png"
          width={65}
          height={65}
          className="cursor-pointer object-contain"
          alt="Logo"
        />

        <BasicMenu />

        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink" onClick={() => setActiveLink("Home")}>
            <HomeLink isActive={activeLink === "Home"} />
          </li>
          <li className="headerLink">TV Shows</li>
          <li className="headerLink">Movies</li>
          <li className="headerLink">New & Popular</li>
          <li className="headerLink">My List</li>
        </ul>
      </div>

      <div className="flex items-center space-x-4 text-sm font-light">
        <form onSubmit={handleSearchSubmit} className="sm:flex sm:justify-end">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="bg-gray-800 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-50 focus:border-transparent"
              style={{ width: "200px", paddingLeft: "40px", fontSize: "16px" }}
            />
            <button type="submit" className="absolute left-3 top-2">
              <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
            </button>
          </div>
        </form>
        <p className="hidden lg:inline">Kids</p>

        <BellIcon className="h-6 w-6" />

        <img
          onClick={logout}
          src="https://rb.gy/g1pwyx"
          alt="User Profile"
          className="cursor-pointer rounded"
        />
      </div>

      {searchQuery && (
        <div className="absolute top-20 w-50 right-20 bg-gray-800/90 z-50 p-4 cursor-pointer">
          {searchResults.map((movie) => (
            <div key={movie.id}>{movie.title}</div>
          ))}
        </div>
      )}
    </header>
  );
}
