import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-5 text-center">
      <div className="eyebrow">404</div>
      <h1 className="mt-3 text-3xl font-semibold text-white">That page isn't part of the portfolio.</h1>
      <Link href="/" className="mt-6 text-sm text-electric-300 hover:text-white">
        Back to the portfolio
      </Link>
    </div>
  );
}
