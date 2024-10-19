import Head from "next/head";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import { useRef, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [inputValidity, setInputValidity] = useState(true);
  const inputRef = useRef(null);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    const username = inputRef.current.value.trim();

    const GH_USERNAME_REGEX = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

    if (username && GH_USERNAME_REGEX.test(username)) {
      router.push(username);
    } else {
      setInputValidity(false);
    }
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-16 ${inter.className} max-w-lg mx-auto`}
    >
      <Head>
        <title>SpeedDial ⭐</title>
      </Head>
      <h1 className="mb-4 text-2xl font-bold text-center">SpeedDial ⭐</h1>
      <p className="mb-6 text-gray-500">
        A speed dial for discussions of your favorite repos.
      </p>
      <form onSubmit={handleSubmit} className="w-full">
        <label
          htmlFor="username"
          className="w-full"
          aria-label="Your GitHub Username"
        >
          <input
            type="text"
            ref={inputRef}
            id="username"
            required
            placeholder="Enter username"
            aria-placeholder="Enter username"
            className={`relative w-full px-4 py-2 border  rounded-md bg-gray-800/50 focus:outline-none focus:ring focus:ring-gray-800 focus:ring-offset-2 focus:ring-offset-gray-950 ${
              inputValidity ? "border-gray-700" : "border-red-700"
            }`}
          />
        </label>
      </form>
    </main>
  );
}
