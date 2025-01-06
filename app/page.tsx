"use client";
import Logo from "./components/Logo";
import GradientBackground from "./components/GradientBackground";
import BlackButton from "./components/BlackButton";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <GradientBackground>
      <div className="min-h-screen flex flex-col p-4">
        <div className="fixed top-8 left-8">
          <Logo />
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-6 text-black">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal mb-4 tracking-tight">
              Get Your Own
            </h1>
            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif italic mb-8">
              Perfect AI Partner
            </p>

            <BlackButton href="/select-gender">Start</BlackButton>
          </div>
        </div>
      </div>
    </GradientBackground>
  );
}
