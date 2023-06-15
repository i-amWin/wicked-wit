import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

const SingleJoke = ({ joke }) => {
  const jokeArray = joke.split("\n");

  return (
    <article className="max-w-screen-sm">
      <p className="text-red-600">
        {jokeArray.map((jokeLine) => (
          <span key={jokeLine}>
            {jokeLine}
            <br />
          </span>
        ))}
      </p>
    </article>
  );
};

const TwoPartJoke = ({ setup, delivery }) => {
  return (
    <article>
      <p className="text-red-600">{setup}</p>
      <p className="text-orange-600">{delivery}</p>
    </article>
  );
};

const Jokes = () => {
  const [joke, setJoke] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchJoke = useCallback(async () => {
    try {
      setLoading(true);
      setJoke({});
      const response = await fetch("https://v2.jokeapi.dev/joke/Dark");
      const fetchedJoke = await response.json();

      setJoke(fetchedJoke);
    } catch (error) {
      setJoke({ error: true, message: error.message });
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJoke();
  }, [fetchJoke]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === "Space") {
        fetchJoke();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [fetchJoke]);

  return (
    <section className="flex flex-col justify-center items-center h-full">
      {loading && <p>Loading...</p>}
      {joke?.error && <p>{joke.message}</p>}
      {joke?.type === "single" ? (
        <SingleJoke joke={joke?.joke} />
      ) : (
        <TwoPartJoke setup={joke?.setup} delivery={joke?.delivery} />
      )}

      <button className="fixed bottom-4 text-sm" onClick={() => fetchJoke()}>
        Reload / Click here / Press Space bar to get a new joke
      </button>
    </section>
  );
};

SingleJoke.propTypes = {
  joke: PropTypes.string,
};

TwoPartJoke.propTypes = {
  setup: PropTypes.string,
  delivery: PropTypes.string,
};

export default Jokes;
