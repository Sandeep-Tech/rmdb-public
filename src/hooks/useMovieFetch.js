import { useState, useEffect, useCallback } from "react";
import API from "../API";

export const useMovieFetch = (movieId) => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchMovie = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);

      const movie = await API.fetchMovie(movieId);
      const credits = await API.fetchCredits(movieId);

      // Get directors only
      const directors = credits.crew.filter(
        (member) => member.job === "Director"
      );
      setState({
        ...movie,
        actors: credits.cast,
        directors,
      });

      setLoading(false);
    } catch (error) {
      setError(true);
    }
  }, [movieId]);

  useEffect(() => {
    fetchMovie(); // as this function is not going to be used anywhere else, it can defined in here as well but here is an opportunity to learn useCallback hook to I am leaving it like that.
  }, [movieId, fetchMovie]);

  return { state, loading, error };
};
