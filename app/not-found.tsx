import Link from "next/link"

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 py-20 text-center">
      <h1 className="text-4xl font-bold tracking-tight">Page not found</h1>
      <p className="text-gray-600">The page you’re looking for doesn’t exist or may have been moved.</p>
      <Link
        href="/"
        className="mt-2 rounded-md border border-emerald-600 px-4 py-2 text-emerald-700 hover:bg-emerald-50"
      >
        Back to Home
      </Link>
    </div>
  )
}
