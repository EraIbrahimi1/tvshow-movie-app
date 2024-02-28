import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div>
        <Link href="/Movie">Movie app </Link>
      </div>
      <div>
        <Link href="/tvshow">Tv-show app </Link>{" "}
      </div>
    </div>
  );
}
