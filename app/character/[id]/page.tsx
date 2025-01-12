"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { characters } from "../../data/characters";
import Logo from "@/app/components/Logo";
import GradientBackground from "@/app/components/GradientBackground";
import InteractiveBackground from "@/app/components/InteractiveBackground";
import BlackButton from "@/app/components/BlackButton";

export const dynamic = "force-dynamic";

export default function CharacterPage() {
  const params = useParams();
  const characterId = parseInt(params.id as string);
  const character = characters.find((c) => c.id === characterId);

  if (!character) {
    return <div>Character not found</div>;
  }

  const getCharacterImage = (name: string) => {
    const baseName = name.split(" ")[0].toLowerCase();
    switch (baseName) {
      // Male characters
      case "alex":
        return "/images/Alex.svg";
      case "sam":
        return "/images/Sam.svg";
      case "jordan":
        return "/images/Jordan.svg";
      // Female characters
      case "emma":
        return "/images/Emma.svg";
      case "sophie":
        return "/images/Sophie.svg";
      case "olivia":
        return "/images/Olivia.svg";
      default:
        return "/images/placeholder_image.png";
    }
  };

  const handleChatClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = "http://localhost:5173";
  };

  return (
    <InteractiveBackground>
      <GradientBackground>
        <div className="container mx-auto px-4 py-12 min-h-screen">
          <div className="flex items-center gap-8 mb-12">
            <Logo />
            <h1 className="text-2xl sm:text-3xl text-black">Your Partner</h1>
          </div>

          <div className="max-w-md mx-auto">
            {/* Partner Card */}
            <div className="relative flex items-center justify-center mb-8">
              <div className="w-full aspect-square relative rounded-lg overflow-hidden">
                <Image
                  src={getCharacterImage(character.name)}
                  alt={character.name}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Checkmark */}
                <div className="absolute top-4 right-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="23"
                    viewBox="0 0 32 23"
                    fill="none"
                  >
                    <path
                      d="M3 11.3879L11.9121 20.3L29.2121 3"
                      stroke="white"
                      strokeWidth="5.24242"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Partner Info */}
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-medium text-black">
                {character.name}
              </h2>
              <p className="text-gray-600">{character.description}</p>
              <div className="flex flex-col items-center gap-4 pt-4">
                <BlackButton onClick={handleChatClick}>Start Chat</BlackButton>
                <a
                  href={`/select?gender=${character.gender}`}
                  className="text-gray-600 hover:text-gray-800 underline underline-offset-4 transition-colors duration-300"
                >
                  Choose another partner
                </a>
              </div>
            </div>
          </div>
        </div>
      </GradientBackground>
    </InteractiveBackground>
  );
}
