"use client"

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import Card from "./Card";

type GameBoardProps = {
  maxNumber: number;
};

const shuffleArray = (array: number[]) => array.sort(() => Math.random() - 0.5);

const GameBoard: React.FC<GameBoardProps> = ({ maxNumber }) => {
  const [cards, setCards] = useState<number[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [turns, setTurns] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  useEffect(() => {
    const cardNumbers: number[] = [];
    for (let i = 1; i <= maxNumber; i++) {
      cardNumbers.push(i, i);
    }
    setCards(shuffleArray(cardNumbers));
  }, [maxNumber]);

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setIsGameOver(true); // Trigger modal when all pairs are matched
    }
  }, [matchedCards, cards]);

  const handleCardClick = (index: number) => {
    if (selectedCards.length === 2 || matchedCards.includes(index)) return;

    const newSelectedCards = [...selectedCards, index];
    setSelectedCards(newSelectedCards);

    if (newSelectedCards.length === 2) {
      setTurns((prev) => prev + 1);
      const [firstIndex, secondIndex] = newSelectedCards;

      if (cards[firstIndex] === cards[secondIndex]) {
        setMatchedCards((prev) => [...prev, firstIndex, secondIndex]);
      }

      setTimeout(() => setSelectedCards([]), 1000);
    }
  };

  // const resetGame = () => window.location.reload();
  const resetGame = () => {
    setCards(shuffleArray(cards));
    setMatchedCards([]);
    setSelectedCards([]);
    setTurns(0);
    setIsGameOver(false);
    window.location.reload();
  };


  return (
    <div className="flex flex-col items-center gap-6 mb-16 lg:mb-0">
      <h2 className="text-lg font-semibold">Turns: {turns}</h2>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((number, index) => (
          <Card
            key={index}
            number={number}
            isFaceUp={selectedCards.includes(index) || matchedCards.includes(index)}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>

      <Button onClick={resetGame} className="btn-secondary mt-4">
        Reset Game
      </Button>
      
      {/* ShadCN Modal */}
      <Dialog open={isGameOver} onOpenChange={setIsGameOver}>
        <DialogContent className="game-dialog p-8 justify-center w-[340px] lg:min-w-[600px] lg:min-h-[300px]">
          <DialogHeader>
            <DialogTitle className="text-center text-4xl">Congratulations!</DialogTitle>
          </DialogHeader>
          <p className="text-center">You matched all pairs in <span className="dialog-turns">{turns}</span> turns!</p>
          <DialogFooter className="flex justify-center">
            <Button onClick={resetGame} className="btn-primary">Play Again</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* {matchedCards.length === cards.length && (
        <div className="text-center mt-8 lg:mt-2">
          <h2 className="text-3xl font-semibold text-white mb-4">Congratulations!</h2>
          <Button onClick={resetGame} className="btn-primary">Play Again</Button>
        </div>
      )} */}
    </div>
  );
};

export default GameBoard;
