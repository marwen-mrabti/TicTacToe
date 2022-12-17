import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);

  /**
   * If the box is empty and there is no winner, then the player can select the box
   * @param index - the index of the box that was clicked
   * @returns the current state of the board.
   */
  const handleBoxSelect = (index) => {
    if (board[index] !== "" || winner !== null) return;
    setBoard((prev) => prev.map((item, i) => (i === index && !item ? player : item)));
    player === "X" ? setPlayer("O") : setPlayer("X");
  };

  /**
   * It resets the state of the game to its initial state
   */
  const handleReset = () => {
    setPlayer("X");
    setWinner(null);
    setBoard(["", "", "", "", "", "", "", "", ""]);
  };

  useEffect(() => {
    /**
     *  The winning combinations of the game
     */
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    /**
     *
     * @returns the winner of the game or null if there is no winner
     */
    const checkWinner = () => {
      if (winner) return;
      let whoWon = null;
      winningCombos.forEach((combo) => {
        const [a, b, c] = combo;
        if (board[a] === board[b] && board[b] === board[c] && board[a] !== "") {
          whoWon = board[a];
        }
      });
      return whoWon
        ? setWinner(whoWon)
        : board.includes("")
        ? setWinner(null)
        : setWinner("Draw");
    };

    checkWinner();
  }, [board, winner]);

  return (
    <div className=" bg-neutral-900 h-screen mx-auto flex flex-col justify-center items-center">
      <div className="bg-indigo-200 font-bold mx-auto w-[15rem] h-[15rem] shadow-xl grid grid-cols-3  relative">
        {board.map((item, index) => (
          <div
            key={index}
            className="h-[5rem] flex justify-center items-center cursor-pointer hover:bg-zinc-400 hover:bg-opacity-60 shadow-4xl outline outline-2 outline-blue-500"
            onClick={() => handleBoxSelect(index)}
          >
            <h1 className="uppercase font-finger-paint text-yellow-500  text-6xl ">
              {item}
            </h1>
          </div>
        ))}
        {winner && (
          <div
            className="w-full h-full flex justify-center items-center absolute top-0 left-0 bg-white bg-opacity-50 z-2"
            onClick={handleReset}
          >
            <h1 className="text-6xl font-bold">
              {winner === "Draw" ? "draw" : `${winner}  won`}
            </h1>
          </div>
        )}
      </div>
      <button
        onClick={handleReset}
        className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm my-5 px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
      >
        reset
      </button>
    </div>
  );
}

export default App;
