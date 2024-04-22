import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="text-blue-500 bg-pink-500">This is abir saha !</div>
      <input type="file" className="w-[400px] bg-pink-500" />
    </>
  );
}

export default App;
