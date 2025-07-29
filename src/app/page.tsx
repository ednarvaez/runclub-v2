import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          RunClub Directory
        </h1>
        <p className="text-gray-600 mb-4">
          Find running clubs near you
        </p>
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <strong>Success!</strong> Homepage is working.
        </div>
        <div className="mt-4 space-x-4">
          <Link href="/test" className="text-blue-500 hover:underline">Test Page</Link>
          <a href="/api/health" className="text-blue-500 hover:underline">Health Check</a>
          <Link href="/search" className="text-blue-500 hover:underline">Search</Link>
        </div>
      </div>
    </div>
  );
}