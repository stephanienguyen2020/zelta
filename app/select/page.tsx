"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Logo from "../components/Logo";
import GradientBackground from "../components/GradientBackground";
import Image from "next/image";
import InteractiveBackground from "../components/InteractiveBackground";

const characters = [
  {
    id: 1,
    name: "Alex S.",
    description:
      "A kind and creative companion who loves meaningful chats, thoughtful surprises, and exploring life's little joys.",
  },
  {
    id: 2,
    name: "Sam R.",
    description:
      "An enthusiastic friend who brings energy to every conversation and helps you see the world in new ways.",
  },
  {
    id: 3,
    name: "Jordan P.",
    description:
      "A wise and patient partner who excels at deep discussions and helping you achieve your goals.",
  },
];

export default function SelectCharacter() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextCharacter = () => {
    setCurrentIndex((prev) => (prev + 1) % characters.length);
  };

  const previousCharacter = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + characters.length) % characters.length
    );
  };

  const handleSelect = () => {
    console.log(`Selected character: ${characters[currentIndex].name}`);
  };

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
    <InteractiveBackground>
      <GradientBackground>
        <div className="container mx-auto px-4 py-6 sm:py-8 md:py-12">
          <div className="flex items-center gap-8 mb-12">
            <Logo />
            <h1 className="text-2xl sm:text-3xl md:text-4xl text-black font-normal">
              Select your character
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-40 max-w-7xl mx-auto">
            <div className="relative w-[400px] h-[600px]">
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
                onClick={previousCharacter}
                className="absolute -left-24 top-1/2 -translate-y-1/2 z-30 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
                aria-label="Previous character"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-black" />
              </button>

              <button
                onClick={nextCharacter}
                className="absolute -right-24 top-1/2 -translate-y-1/2 z-30 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
                aria-label="Next character"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-black" />
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
                <button
                  onClick={handleSelect}
                  className={`
                    inline-block px-6 py-2.5 
                    bg-black text-white rounded-full
                    hover:bg-gray-800 transition-all duration-300
                    text-lg
                    ${isHovered ? "transform scale-105" : ""}
                  `}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <span
                    className={`transition-transform duration-300 ${
                      isHovered ? "transform -translate-x-1" : ""
                    }`}
                  >
                    Select
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </GradientBackground>
    </InteractiveBackground>
  );
}
