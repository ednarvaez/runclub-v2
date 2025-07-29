import Link from 'next/link';

export default function TestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Test Page Works
        </h1>
        <p className="text-gray-600 mb-4">
          If you can see this, Next.js routing is working correctly.
        </p>
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <strong>Success!</strong> The app is deployed correctly.
        </div>
        <div className="mt-4">
          <Link href="/" className="text-blue-500 hover:underline">Go back to homepage</Link>
        </div>
      </div>
    </div>
  );
}