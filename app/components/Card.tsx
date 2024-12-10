"use client"

import React from "react";

type CardProps = {
  number: number;
  isFaceUp: boolean;
  onClick: () => void;
};

const Card: React.FC<CardProps> = ({ number, isFaceUp, onClick }) => {
  return (
    <div className={`w-16 h-16 lg:w-24 lg:h-24 flex items-center justify-center text-xl font-bold rounded-xl cursor-pointer ${ isFaceUp ? "card-up" : "card-down" }`}
      onClick={onClick}
    >
      {isFaceUp ? number : "?"}
    </div>
  );
};

export default Card;
