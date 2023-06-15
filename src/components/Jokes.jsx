import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const SingleJoke = ({ joke }) => {
  const jokeArray = joke.split("\n");
  console.log(jokeArray);

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

  useEffect(() => {
    const fetchJoke = async () => {
      const response = await fetch("https://v2.jokeapi.dev/joke/Dark");

      const joke = await response.json();
      console.log(joke);
      setJoke(joke);
    };

    fetchJoke();
  }, []);

  if (joke.error) return <p className="pt-16">{joke.error}</p>;

  return (
    <section className="flex justify-center items-center h-full">
      {joke.type === "single" ? (
        <SingleJoke joke={joke?.joke} />
      ) : (
        <TwoPartJoke setup={joke?.setup} delivery={joke?.delivery} />
      )}
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
