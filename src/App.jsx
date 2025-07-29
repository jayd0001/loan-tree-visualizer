import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold underline text-blue-600 mb-4">
        Hello Tailwind!
      </h1>
      <p className="text-lg mb-2">Count: {count}</p>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        onClick={() => setCount(count + 1)}
      >
        Increment
      </button>
    </div>
  );
}

export default App;
