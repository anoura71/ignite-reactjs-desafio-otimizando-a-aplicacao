import { useCallback } from "react";
import {
  useContext,
  useState,
  createContext,
  ReactNode,
  useEffect,
} from "react";

import { api } from "../services/api";
import { Genre } from "../types/Genre";
import { Movie } from "../types/Movie";

interface MoviesContextData {
  movies: Movie[];
  genres: Genre[];
  selectedGenre: Genre;
  selectedGenreId: number;
  handleSelectGenre: (id: number) => void;
}

interface MoviesProviderProps {
  children: ReactNode;
}

export const MoviesContext = createContext({} as MoviesContextData);

export function MoviesProvider({ children }: MoviesProviderProps) {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<Genre>({} as Genre);

  useEffect(() => {
    api.get<Genre[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<Movie[]>(`movies/?Genre_id=${selectedGenreId}`).then((response) => {
      setMovies(response.data);
    });

    api.get<Genre>(`genres/${selectedGenreId}`).then((response) => {
      setSelectedGenre(response.data);
    });
  }, [selectedGenreId]);

  const handleSelectGenre = useCallback((id: number) => {
    setSelectedGenreId(id);
  }, []);

  return (
    <MoviesContext.Provider
      value={{
        movies,
        genres,
        selectedGenre,
        selectedGenreId,
        handleSelectGenre,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}

export const useMovies = () => {
  return useContext(MoviesContext);
};
