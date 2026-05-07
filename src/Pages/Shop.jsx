import { useState, useEffect } from "react";
import { getProducts } from "../services/productService";
import AlbumCard from "../components/AlbumCard";
import { filterAlbums } from "../services/filterAlbums";

export default function Shop() {
  const [albums, setAlbums] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showNumericalSearch, setShowNumericalSearch] = useState(false);
  const [yearMin, setYearMin] = useState("");
  const [yearMax, setYearMax] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [stockMin, setStockMin] = useState("");
  const [stockMax, setStockMax] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getProducts().then(setAlbums);
  }, []);

  const isMobile = window.matchMedia("(max-width: 700px)").matches;
  const albumsPerPage = isMobile ? 4 : 8;

  const genreFilteredAlbums =
    selectedGenre === "All"
      ? albums
      : albums.filter((a) => a.genre === selectedGenre);

  const searchedAlbums = filterAlbums(genreFilteredAlbums, {
    searchTerm,
    yearMin,
    yearMax,
    priceMin,
    priceMax,
    stockMin,
    stockMax,
  });

  const totalPages = Math.ceil(searchedAlbums.length / albumsPerPage);
  const startIndex = (currentPage - 1) * albumsPerPage;
  const visibleAlbums = searchedAlbums.slice(
    startIndex,
    startIndex + albumsPerPage
  );

  function handleGenreChange(genre) {
    setSelectedGenre(genre);
    setCurrentPage(1);
  }

  function handleSearchChange(e) {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }

  return (
    <div className="page">
      <h1>Shop Vinyl Records</h1>

      {/* GENRE FILTER */}
      <div className="genre-filter">
        {["All", "Rock", "Jazz", "Hip-Hop", "K-Pop", "Electronic"].map(
          (genre) => (
            <button
              key={genre}
              onClick={() => handleGenreChange(genre)}
              className={
                selectedGenre === genre
                  ? "button--active"
                  : "button--secondary"
              }
            >
              {genre}
            </button>
          )
        )}
      </div>

      {/* SEARCH */}
      <div className="search-controls">
        <input
          type="search"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search albums..."
        />
      </div>

      {/* 🔥 GRID FIX */}
      <div className="products-grid">
        {visibleAlbums.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>

      {/* EMPTY STATE */}
      {visibleAlbums.length === 0 && (
        <p>No albums found</p>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={
                currentPage === i + 1
                  ? "button--active"
                  : "button--secondary"
              }
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}