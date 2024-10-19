import Image from "next/image";

export default function Card({ repo }) {
  return (
    <a
      href={repo.discussion}
      target="_blank"
      className="inline-flex flex-col items-center justify-center h-32 space-y-2 text-center border rounded-md border-gray-700/50 bg-gray-800/50"
    >
      <Image
        width="40"
        height="40"
        className="w-10 h-10 border border-gray-200 rounded-md dark:border-gray-600"
        src={repo.avatar}
        alt={`Avatar image for GitHub user ${repo.owner}`}
      />
      <span>
        <span className="flex justify-center h-auto text-xs font-medium text-gray-400">
          {repo.owner}
        </span>
        <span className="flex justify-center">{repo.name}</span>
      </span>
    </a>
  );
}
