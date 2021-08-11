import { memo } from "react";
import { useMovies } from "../context/MoviesContext";
import { Header } from "./Header";
import { MovieCard } from "./MovieCard";

function ContentComponent() {
  const { movies } = useMovies();

  return (
    <div className="container">
      <Header />

      <main>
        <div className="movies-list">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export const Content = memo(ContentComponent);
