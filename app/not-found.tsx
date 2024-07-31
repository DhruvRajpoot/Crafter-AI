import Image from "next/image";
import Link from "next/link";

const Custom404Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-200 p-8">
      <div className="flex flex-col items-center mb-12">
        <Image
          src="/logo.png"
          alt="Crafter AI"
          width={100}
          height={100}
          className="rounded-full shadow-2xl"
        />
        <h1 className="text-4xl font-bold mt-4 text-gray-100">Crafter AI</h1>
      </div>
      <div className="text-center max-w-lg mx-auto">
        <h1 className="text-6xl font-extrabold mb-4 animate-bounce text-gray-100">
          404
        </h1>
        <h2 className="text-2xl mb-4 font-light text-gray-300">
          Page Not Found
        </h2>
        <p className="text-lg mb-8 text-gray-300">
          It seems the page you&apos;re looking for has moved or does not exist.
          Please check the URL or return to the homepage.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-400 text-white font-semibold rounded-lg shadow-lg hover:bg-teal-600"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Custom404Page;
