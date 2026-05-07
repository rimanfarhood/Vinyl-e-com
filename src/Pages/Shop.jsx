import { useState, useEffect } from "react";
import { getProducts } from "../services/productService";
import AlbumCard from "../components/AlbumCard";
import { filterAlbums } from "../services/filterAlbums";

export default function Shop() {

  /* =========================
     STATE
  ========================= */
  const [albums, setAlbums] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // 🔥 NEW STATE
  const [sortOption, setSortOption] = useState("price-asc");

  /* =========================
     LOAD DATA
  ========================= */
  useEffect(() => {
    getProducts().then(setAlbums);
  }, []);

  /* =========================
     SCROLL TO TOP
  ========================= */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  /* =========================
     RESPONSIVE
  ========================= */
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 700);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const albumsPerPage = isMobile ? 4 : 8;

  /* =========================
     FILTERING
  ========================= */
  const genreFilteredAlbums =
    selectedGenre === "All"
      ? albums
      : albums.filter((a) => a.genre === selectedGenre);

  const searchedAlbums = filterAlbums(genreFilteredAlbums, {
    searchTerm,
  });

  /* =========================
     SORTING
  ========================= */
  const sortedAlbums = [...searchedAlbums].sort((a, b) => {
    const aInStock = a.stock > 0 ? 1 : 0;
    const bInStock = b.stock > 0 ? 1 : 0;

    // in-stock first
    if (aInStock !== bInStock) {
      return bInStock - aInStock;
    }

    // sort options
    switch (sortOption) {
      case "price-asc":
        return a.price - b.price;

      case "price-desc":
        return b.price - a.price;

      case "name":
        return a.title.localeCompare(b.title);

      default:
        return 0;
    }
  });

  /* =========================
     PAGINATION
  ========================= */
  const totalPages = Math.ceil(sortedAlbums.length / albumsPerPage);
  const startIndex = (currentPage - 1) * albumsPerPage;

  const visibleAlbums = sortedAlbums.slice(
    startIndex,
    startIndex + albumsPerPage
  );

  /* =========================
     HANDLERS
  ========================= */
  function handleGenreChange(genre) {
    setSelectedGenre(genre);
    setCurrentPage(1);
  }

  function handleSearchChange(e) {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }

  /* =========================
     UI
  ========================= */
  return (
    <div className="page">

      {/* HEADER */}
      <div className="shop-header">
        <h1>Shop Vinyl Records</h1>

        {totalPages > 1 && (
          <span className="page-indicator-inline">
            Page {currentPage} of {totalPages}
          </span>
        )}
      </div>

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

      {/* 🔥 META BAR */}
      <div className="shop-meta">
        <span className="results-count">
          {searchedAlbums.length} results
        </span>

        <div className="sort-box">
          <label>Sort by:</label>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="name">Name (A → Z)</option>
          </select>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="products-grid">
        {visibleAlbums.map((album) => (
          <div key={album.id} style={{ position: "relative" }}>

            {album.stock === 0 && (
              <span className="out-of-stock-badge">
                Out of Stock
              </span>
            )}

            <AlbumCard album={album} />
          </div>
        ))}
      </div>

      {/* EMPTY */}
      {visibleAlbums.length === 0 && (
        <p className="empty-state">No albums found</p>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="pagination">

          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
            className="button--secondary"
          >
            « First
          </button>

          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="button--secondary"
          >
            ‹ Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((page) => {
              return (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              );
            })
            .map((page, index, arr) => {
              const prevPage = arr[index - 1];

              return (
                <span key={page}>
                  {prevPage && page - prevPage > 1 && <span> ... </span>}

                  <button
                    onClick={() => setCurrentPage(page)}
                    className={
                      currentPage === page
                        ? "button--active"
                        : "button--secondary"
                    }
                  >
                    {page}
                  </button>
                </span>
              );
            })}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="button--secondary"
          >
            Next ›
          </button>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
            className="button--secondary"
          >
            Last »
          </button>

        </div>
      )}
    </div>
  );
}