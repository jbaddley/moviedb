import "./styles.css";
import { useEffect, useState } from "react";
import API from "./API";

export default function App() {
  const [movies, setMovies] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>();

  useEffect(() => {
    API.discoverMovies().then((results: any[]) => setMovies(results));
  }, []);

  const handleSelect = async (movieId: number) => {
    const result = await API.getDetails(movieId);
    setSelected(result);
  };

  return (
    <div className="App">
      <ul>
        {movies.map((movie: any) => (
          <li onClick={() => handleSelect(movie.id)} key={movie.id}>
            {movie.id}
          </li>
        ))}
      </ul>
      <div>
        <pre>{JSON.stringify(selected, null, 2)}</pre>
      </div>
    </div>
  );
}
