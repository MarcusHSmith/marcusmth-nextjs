"use client";

import { useChat } from "ai/react";
import { useState } from "react";
import Head from "next/head";

interface Source {
  slug: string;
  title: string;
  url: string;
}

export default function WritePage() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("");
  const [audience, setAudience] = useState("");
  const [length, setLength] = useState<"short" | "medium" | "long">("medium");
  const [sources, setSources] = useState<Source[]>([]);

  const { messages, append, isLoading } = useChat({
    api: "/api/write",
    onResponse: (response) => {
      // Extract sources from response headers
      const sourcesHeader = response.headers.get("X-Sources");
      if (sourcesHeader) {
        try {
          const parsed = JSON.parse(sourcesHeader);
          setSources(parsed);
        } catch (e) {
          console.error("Failed to parse sources", e);
        }
      }
    },
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || isLoading) return;
    
    setSources([]); // Clear previous sources
    
    // Use append to send the request with body
    await append({
      role: "user",
      content: topic,
    }, {
      body: {
        topic,
        tone: tone || undefined,
        audience: audience || undefined,
        length,
      },
    });
  };

  const lastMessage = messages[messages.length - 1];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>AI Blog Writer | marcusmth.com</title>
        <meta
          name="description"
          content="Request a blog post in Marcus's style using AI"
        />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold mb-2">AI Blog Writer</h1>
          <p className="text-gray-600 mb-6">
            Request a blog post in Marcus&apos;s style. The AI will use existing blog
            posts as reference to match the writing style and voice.
          </p>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="topic"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Topic *
              </label>
              <input
                type="text"
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., How to build a startup in 2025"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                maxLength={500}
                disabled={isLoading}
              />
              <p className="mt-1 text-sm text-gray-500">
                {topic.length}/500 characters
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="tone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Tone (optional)
                </label>
                <select
                  id="tone"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isLoading}
                >
                  <option value="">Default</option>
                  <option value="conversational">Conversational</option>
                  <option value="professional">Professional</option>
                  <option value="casual">Casual</option>
                  <option value="technical">Technical</option>
                  <option value="friendly">Friendly</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="audience"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Audience (optional)
                </label>
                <input
                  type="text"
                  id="audience"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  placeholder="e.g., software engineers"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label
                  htmlFor="length"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Length
                </label>
                <select
                  id="length"
                  value={length}
                  onChange={(e) =>
                    setLength(e.target.value as "short" | "medium" | "long")
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isLoading}
                >
                  <option value="short">Short (~500 words)</option>
                  <option value="medium">Medium (~1000 words)</option>
                  <option value="long">Long (~2000 words)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !topic.trim()}
              className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isLoading ? "Generating..." : "Generate Blog Post"}
            </button>
          </form>
        </div>

        {/* Streaming Output */}
        {lastMessage && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Generated Blog Post</h2>
            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap">
                {lastMessage.content}
              </div>
            </div>
          </div>
        )}

        {/* Sources Used */}
        {sources.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Sources Consulted</h2>
            <ul className="space-y-2">
              {sources.map((source) => (
                <li key={source.slug}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {source.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Loading State */}
        {isLoading && !lastMessage && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <p className="text-gray-600">Generating your blog post...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
