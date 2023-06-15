import Jokes from "./components/Jokes";

function App() {
  return (
    <div className="max-w-screen-md h-full mx-auto p-4 relative">
      <h1 className="font-semibold text-2xl mb-4 fixed top">Wicked Wit</h1>
      <Jokes />
    </div>
  );
}

export default App;
