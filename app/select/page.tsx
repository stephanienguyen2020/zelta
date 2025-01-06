"use client";

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Logo from "../components/Logo";
import GradientBackground from "../components/GradientBackground";
import InteractiveBackground from "../components/InteractiveBackground";
import CharacterCard from "../components/CharacterCard";
import { characters } from "../data/characters";

export default function SelectCharacter() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const searchParams = useSearchParams();
  const gender = searchParams.get('gender');

  const filteredCharacters = characters.filter(character => 
    gender === 'male' ? character.gender === 'male' : character.gender === 'female'
  );

  const handleNext = () => {
    setCurrentIndex((prev) => 
      prev === filteredCharacters.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? filteredCharacters.length - 1 : prev - 1
    );
  };

  return (
    <InteractiveBackground>
      <GradientBackground>
        <div className="container mx-auto px-4 py-6 sm:py-8 md:py-12">
          <div className="flex items-center gap-8 mb-12">
            <Logo />
            <h1 className="text-2xl sm:text-3xl md:text-4xl text-black font-normal">
              Choose Your Partner
            </h1>
          </div>
          
          <CharacterCard
            characters={filteredCharacters}
            currentIndex={currentIndex}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        </div>
      </GradientBackground>
    </InteractiveBackground>
  );
} 