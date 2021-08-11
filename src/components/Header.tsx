import { memo } from "react";
import { useMovies } from "../context/MoviesContext";

function HeaderComponent() {
  const { selectedGenre } = useMovies();

  return (
    <header>
      <span className="category">
        Categoria:<span> {selectedGenre.title}</span>
      </span>
    </header>
  );
}

export const Header = memo(HeaderComponent);
