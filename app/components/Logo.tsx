import Image from "next/image";
import Link from "next/link";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`cursor-pointer ${className}`}>
      <Image
        src="/images/Zelta_logo.png"
        alt="Zelta Logo"
        width={30}
        height={30}
        priority
        className="object-contain"
      />
    </Link>
  );
}
