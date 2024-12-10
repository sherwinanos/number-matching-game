"use client"

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GameBoard from "./components/GameBoard";

export default function Home() {
  const [maxNumber, setMaxNumber] = useState<number | null>(null);
  const [gameKey, setGameKey] = useState<number>(0);

  const startGame = () => {
    if (!maxNumber || maxNumber <= 0) {
      alert("Please enter a valid positive number!");
      return;
    }
    setGameKey((prevKey) => prevKey + 1); // Reset the game
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="container">
        <div className="flex flex-col w-full lg:w-8/12 mx-auto gap-8">
          {/* Left Content */}
          <div className="w-full lg:fixed pt-16">
            <h1 className="text-4xl lg:text-5xl text-center lg:text-left font-bold mb-8">Dynamic Number <br/>Matching Game</h1>
            <div className="flex flex-col items-center lg:items-start gap-4 mb-6">
              <Input
                type="number"
                placeholder="Enter maximum number"
                onChange={(e:any) => setMaxNumber(parseInt(e.target.value))}
              />
              <Button onClick={startGame} className="btn-primary">Start Game</Button>
            </div>
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-[50%] lg:ml-[50%]">
            {maxNumber && maxNumber > 0 
              ? ( <GameBoard maxNumber={maxNumber} key={gameKey} /> )
              : ( <img src="/gameboy.png" /> )
            }
          </div>
          </div>
      </div>
    </main>
  );
}
