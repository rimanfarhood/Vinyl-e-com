function matchesText(album, searchTerm) {
  if (!searchTerm.trim()) return true;

  const searchableText = [
    album.title,
    album.artist,
    album.genre,
    album.condition,
    album.description,
  ]
    .join(" ")
    .toLowerCase();

  return searchableText.includes(searchTerm.toLowerCase());
}

function matchesRange(value, min, max) {
  if (min !== "" && value < Number(min)) return false;
  if (max !== "" && value > Number(max)) return false;
  return true;
}

export function filterAlbums(albums, filters) {
  return albums.filter((album) => {
    return (
      matchesText(album, filters.searchTerm) &&
      matchesRange(album.year, filters.yearMin, filters.yearMax) &&
      matchesRange(album.price, filters.priceMin, filters.priceMax) &&
      matchesRange(album.stock, filters.stockMin, filters.stockMax)
    );
  });
}
