export default function GradientBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-300 via-white to-purple-300">
      {children}
    </div>
  );
}
