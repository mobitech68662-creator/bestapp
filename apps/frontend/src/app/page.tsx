'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Forum {
  id: number;
  name: string;
  description: string;
  topicCount: number;
  postCount: number;
}

export default function Home() {
  const [forums, setForums] = useState<Forum[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.API_URL}/forums`)
      .then((res) => res.json())
      .then((data) => {
        setForums(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching forums:', err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-primary-600">BestApp Forum</h1>
          <p className="text-gray-600 mt-2">Welcome to the community</p>
        </header>

        <nav className="mb-8 flex gap-4">
          <Link href="/auth/login" className="text-primary-600 hover:underline">
            Login
          </Link>
          <Link href="/auth/register" className="text-primary-600 hover:underline">
            Register
          </Link>
          <Link href="/members" className="text-primary-600 hover:underline">
            Members
          </Link>
        </nav>

        {loading ? (
          <div className="text-center py-8">Loading forums...</div>
        ) : (
          <div className="space-y-4">
            {forums.map((forum) => (
              <div
                key={forum.id}
                className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <Link href={`/forum/${forum.id}`} className="block">
                  <h2 className="text-2xl font-semibold text-primary-700">
                    {forum.name}
                  </h2>
                  <p className="text-gray-600 mt-1">{forum.description}</p>
                  <div className="mt-4 text-sm text-gray-500">
                    <span className="mr-4">Topics: {forum.topicCount}</span>
                    <span>Posts: {forum.postCount}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
