"use client";
import Logo from "../components/Logo";
import GradientBackground from "../components/GradientBackground";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default function SelectGender() {
  return (
    <GradientBackground>
      <div className="min-h-screen flex flex-col p-4">
        <div className="fixed top-8 left-8">
          <Logo />
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl text-black font-normal mb-4">
              Choose Your Preference
            </h1>
            <div className="flex gap-16 justify-center">
              <div className="space-y-6">
                <a href="/select?gender=male">
                  <div className="relative w-[400px] h-[400px] rounded-2xl overflow-hidden shadow-lg cursor-pointer group hover:scale-105 transition-all duration-300">
                    <Image
                      src="/images/(With Background) Male Option.svg"
                      alt="Male Partners"
                      fill
                      className="object-contain transition-opacity duration-300 group-hover:opacity-0"
                      priority
                    />
                    <Image
                      src="/images/(With Background) Male Option_hover.svg"
                      alt="Male Partners Hover"
                      fill
                      className="object-contain absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      priority
                    />
                  </div>
                </a>
                <a
                  href="/select?gender=male"
                  className="inline-block px-10 py-3 bg-gray-500 text-white text-xl font-normal rounded-lg hover:bg-gray-600 transition-colors duration-300"
                >
                  MALE
                </a>
              </div>
              
              <div className="space-y-6">
                <a href="/select?gender=female">
                  <div className="relative w-[400px] h-[400px] rounded-2xl overflow-hidden shadow-lg cursor-pointer group hover:scale-105 transition-all duration-300">
                    <Image
                      src="/images/(With Background) Female Option.svg"
                      alt="Female Partners"
                      fill
                      className="object-contain transition-opacity duration-300 group-hover:opacity-0"
                      priority
                    />
                    <Image
                      src="/images/(With Background) Female Option_hover.svg"
                      alt="Female Partners Hover"
                      fill
                      className="object-contain absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      priority
                    />
                  </div>
                </a>
                <a
                  href="/select?gender=female"
                  className="inline-block px-10 py-3 bg-gray-500 text-white text-xl font-normal rounded-lg hover:bg-gray-600 transition-colors duration-300"
                >
                  FEMALE
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GradientBackground>
  );
} 