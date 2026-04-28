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

  const rockCount = albums.filter((a) => a.genre === "Rock").length;
  const jazzCount = albums.filter((a) => a.genre === "Jazz").length;
  const hipHopCount = albums.filter((a) => a.genre === "Hip-Hop").length;
  const kpopCount = albums.filter((a) => a.genre === "K-Pop").length;
  const electronicCount = albums.filter((a) => a.genre === "Electronic").length;

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

  const filtersAreActive =
    searchTerm || yearMin || yearMax || priceMin || priceMax || stockMin || stockMax;

  const totalPages = Math.ceil(searchedAlbums.length / albumsPerPage);
  const startIndex = (currentPage - 1) * albumsPerPage;
  const visibleAlbums = searchedAlbums.slice(startIndex, startIndex + albumsPerPage);

  function getGenreButtonClass(genre) {
    return selectedGenre === genre
      ? "genre-filter__button button--active"
      : "genre-filter__button button--secondary";
  }

  function getPaginationButtonClass(pageNumber) {
    return currentPage === pageNumber
      ? "pagination__button button--active"
      : "pagination__button button--secondary";
  }

  function handleGenreChange(genre) {
    setSelectedGenre(genre);
    setCurrentPage(1);
  }

  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  }

  function handleRangeChange(setValue, value) {
    setValue(value);
    setCurrentPage(1);
  }

  function clearRangeValue(setValue) {
    setValue("");
    setCurrentPage(1);
  }

  return (
    <div>
      <h1>Shop Vinyl Records</h1>

      <div className="genre-filter">
        {[
          { label: "All", count: albums.length },
          { label: "Rock", count: rockCount },
          { label: "Jazz", count: jazzCount },
          { label: "Hip-Hop", count: hipHopCount },
          { label: "K-Pop", count: kpopCount },
          { label: "Electronic", count: electronicCount },
        ].map(({ label, count }) => (
          <button
            key={label}
            className={getGenreButtonClass(label)}
            title={`${count} albums`}
            type="button"
            onClick={() => handleGenreChange(label)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="search-controls">
        <div className="search-control">
          <label className="search-control__icon" htmlFor="album-search">
            🔍 abc
          </label>
          <input
            className="search-control__input"
            id="album-search"
            type="search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Text search"
          />
        </div>

        <button
          className="numerical-search-trigger"
          type="button"
          onClick={() => setShowNumericalSearch(!showNumericalSearch)}
        >
          🔍 123 {showNumericalSearch ? "▴" : "▾"}
        </button>
      </div>

      {showNumericalSearch && (
        <div className="advanced-filters">
          {[
            { label: "Year from", value: yearMin, setValue: setYearMin, id: "year-min" },
            { label: "Year to", value: yearMax, setValue: setYearMax, id: "year-max" },
            { label: "Price from", value: priceMin, setValue: setPriceMin, id: "price-min" },
            { label: "Price to", value: priceMax, setValue: setPriceMax, id: "price-max" },
            { label: "Stock from", value: stockMin, setValue: setStockMin, id: "stock-min" },
            { label: "Stock to", value: stockMax, setValue: setStockMax, id: "stock-max" },
          ].map(({ label, value, setValue, id }) => (
            <div className="advanced-filters__group" key={id}>
              <label className="advanced-filters__label" htmlFor={id}>
                {label}
              </label>
              <div className="advanced-filters__input-wrap">
                <input
                  className="advanced-filters__input"
                  id={id}
                  type="number"
                  value={value}
                  onChange={(e) => handleRangeChange(setValue, e.target.value)}
                />
                {value && (
                  <button
                    className="advanced-filters__clear"
                    type="button"
                    onClick={() => clearRangeValue(setValue)}
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {filtersAreActive && (
        <p className="results-count">
          {searchedAlbums.length} album{searchedAlbums.length === 1 ? "" : "s"} found
        </p>
      )}

      <section>
        {visibleAlbums.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </section>

      {searchedAlbums.length === 0 && (
        <p className="shop-search__empty">No albums match the current search.</p>
      )}

      {searchedAlbums.length > 0 && totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination__button button--secondary"
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
          >
            First
          </button>
          <button
            className="pagination__button button--secondary"
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              className={getPaginationButtonClass(i + 1)}
              type="button"
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="pagination__button button--secondary"
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
          <button
            className="pagination__button button--secondary"
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
          >
            Last
          </button>
        </div>
      )}
    </div>
  );
}
