"use client";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BlackButton from "./BlackButton";

interface Character {
  id: number;
  name: string;
  description: string;
}

interface CharacterCardProps {
  characters: Character[];
  currentIndex: number;
  onNext: () => void;
  onPrevious: () => void;
}

export default function CharacterCard({
  characters,
  currentIndex,
  onNext,
  onPrevious,
}: CharacterCardProps) {
  const getCardStyle = (index: number) => {
    const totalCards = characters.length;
    let position = index - currentIndex;

    // Adjust position for loop effect
    if (position > 1) position -= totalCards;
    if (position < -1) position += totalCards;

    const isActive = position === 0;
    const isVisible = Math.abs(position) <= 1;

    if (!isVisible) return { display: "none" };

    return {
      transform: `translateX(${position * 20}%) scale(${isActive ? 1 : 0.9})`,
      zIndex: isActive ? 20 : 10,
      opacity: isActive ? 1 : 0.5,
    };
  };

  return (
    <div className="flex flex-col lg:flex-row items-center gap-24 max-w-7xl mx-auto">
      <div className="relative w-[430px] h-[932px]">
        {characters.map((character, index) => (
          <div
            key={character.id}
            className="absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out"
            style={getCardStyle(index)}
          >
            <div className="w-full h-full rounded-2xl overflow-hidden">
              <Image
                src="/images/placeholder_image.png"
                alt={`${character.name}'s avatar`}
                fill
                className="object-cover"
                priority={index === currentIndex}
              />
            </div>
          </div>
        ))}

        <button
          onClick={onPrevious}
          className="absolute -left-24 top-1/2 -translate-y-1/2 z-30 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Previous character"
        >
          <ChevronLeft className="h-6 w-6 text-gray-800" />
        </button>
        <button
          onClick={onNext}
          className="absolute -right-24 top-1/2 -translate-y-1/2 z-30 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Next character"
        >
          <ChevronRight className="h-6 w-6 text-gray-800" />
        </button>
      </div>

      <div className="lg:w-2/3 text-center text-black">
        <div className="space-y-8">
          <h2 className="text-4xl sm:text-5xl">
            {characters[currentIndex].name}
          </h2>
          <p className="text-xl sm:text-2xl">
            {characters[currentIndex].description}
          </p>
          <BlackButton href="/select">Select</BlackButton>
        </div>
      </div>
    </div>
  );
}
