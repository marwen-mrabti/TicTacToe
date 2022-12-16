import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [playsLeft, setplaysLeft] = useState(9);
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);

  /**
   * If the box is empty and there is no winner, then the player can select the box
   * @param index - the index of the box that was clicked
   * @returns the current state of the board.
   */
  const handleBoxSelect = (index) => {
    if (board[index] !== "" || winner !== null) return;
    setplaysLeft((prev) => prev - 1);
    setBoard((prev) => prev.map((item, i) => (i === index && !item ? player : item)));
    player === "X" ? setPlayer("O") : setPlayer("X");
  };

  useEffect(() => {
    /**
     * If there are still plays left and there is no winner, check if any of the winning combinations
     * have been played. If so, set the winner to the player who played that combination. If there are
     * no plays left and there is no winner, set the winner to "Draw"
     */
    const checkWinner = () => {
      if (playsLeft > 0 && winner === null) {
        if (board[0] === board[1] && board[1] === board[2] && board[0] !== "") {
          setWinner(board[0]);
        } else if (board[0] === board[3] && board[3] === board[6] && board[0] !== "") {
          setWinner(board[0]);
        } else if (board[0] === board[4] && board[4] === board[8] && board[0] !== "") {
          setWinner(board[0]);
        } else if (board[1] === board[4] && board[4] === board[7] && board[1] !== "") {
          setWinner(board[1]);
        } else if (board[2] === board[5] && board[5] === board[8] && board[2] !== "") {
          setWinner(board[2]);
        } else if (board[2] === board[4] && board[4] === board[6] && board[2] !== "") {
          setWinner(board[2]);
        } else if (board[3] === board[4] && board[4] === board[5] && board[3] !== "") {
          setWinner(board[3]);
        } else if (board[6] === board[7] && board[7] === board[8] && board[6] !== "") {
          setWinner(board[6]);
        } else {
          setWinner(null);
        }
      } else if (playsLeft === 0 && winner === null) {
        setWinner("Draw");
      }
    };
    checkWinner();
  }, [playsLeft, board, player, winner]);

  /**
   * It resets the state of the game to its initial state
   */
  const handleReset = () => {
    setPlayer("X");
    setWinner(null);
    setplaysLeft(9);
    setBoard(["", "", "", "", "", "", "", "", ""]);
  };

  return (
    <div className=" bg-neutral-100 h-screen mx-auto flex flex-col justify-center items-center">
      <div className="bg-indigo-400 font-bold font-8xl mx-auto w-[30vw] h-[30vh] shadow-xl grid grid-cols-3  relative">
        {board.map((item, index) => (
          <div
            key={index}
            className="h-[10vh] flex justify-center items-center cursor-pointer border-2 border-blue-600 hover:bg-yellow-300"
            onClick={() => handleBoxSelect(index)}
          >
            <h1 className="uppercase">{item}</h1>
          </div>
        ))}
        {winner && (
          <div className="w-full h-full flex justify-center items-center absolute top-0 left-0 border-2 bg-white bg-opacity-50 ">
            <h1 className="text-6xl font-bold">{winner} won</h1>
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
