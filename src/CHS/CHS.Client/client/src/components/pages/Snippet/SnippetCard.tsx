import React, { useState } from "react";
import { Snippet } from "@/entities/Snippet"; // Adjust the import based on your file structure
import { Language } from "@/entities/Language";
import { FaHeart, FaStar } from "react-icons/fa"; // Using react-icons for heart and star icons
import { languageIcons } from "@/lib/utils/languageUtils";

interface SnippetCardProps {
  snippet: Snippet;
}

const SnippetCard: React.FC<SnippetCardProps> = ({ snippet }) => {
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);

  const toggleLike = () => setLiked(!liked);
  const toggleFavorite = () => setFavorited(!favorited);

  const LanguageIcon =
    languageIcons[snippet.language as keyof typeof languageIcons];

  return (
    <article className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg flex flex-col">
      <h3 className="text-xl font-bold text-white mb-2">{snippet.title}</h3>
      <div className="relative mb-4 min-h-[6rem] bg-gray-900 rounded-md p-4 overflow-auto">
        <pre>
          <code className="text-sm text-gray-300">{snippet.code}</code>
        </pre>
        <button
          onClick={() => navigator.clipboard.writeText(snippet.code)}
          className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-md hover:bg-blue-500 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Kopier
        </button>
      </div>
      <p className="text-sm text-gray-400 mb-4">
        {LanguageIcon && <LanguageIcon className="text-2xl mr-2" />}
      </p>
      <p className="text-gray-300 mb-4">{snippet.description}</p>
      <footer className="mt-auto">
        <div className="flex justify-between items-center mt-2">
          <div className="flex flex-col">
            <p className="text-sm text-gray-400">
              Oprettet af: {snippet.createdBy?.name}
            </p>
            <p className="text-sm text-gray-400">
              Oprettet:{" "}
              {new Date(snippet.createdOn).toLocaleDateString("da-DK", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="flex space-x-4">
            <FaHeart
              className={`cursor-pointer ${
                liked ? "text-red-500" : "text-gray-400"
              }`}
              onClick={toggleLike}
            />
            <FaStar
              className={`cursor-pointer ${
                favorited ? "text-yellow-500" : "text-gray-400"
              }`}
              onClick={toggleFavorite}
            />
          </div>
        </div>
      </footer>
    </article>
  );
};

export default SnippetCard;
