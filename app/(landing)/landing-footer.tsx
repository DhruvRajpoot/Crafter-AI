import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import Image from "next/image";

const LandingFooter = () => {
  const quickLinks = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About",
      link: "/",
    },
    {
      name: "Services",
      link: "/",
    },
    {
      name: "Contact",
      link: "/",
    },
  ];

  const contacts = [
    {
      link: "mailto:dhruvrajpootiiitbhopal@gmail.com",
      icon: <Mail />,
    },
    {
      link: "https://github.com/DhruvRajpoot/Crafter-AI",
      icon: <Github />,
    },
    {
      link: "https://www.linkedin.com/in/dhruv-rajpoot/",
      icon: <Linkedin />,
    },
    {
      link: "/",
      icon: <Instagram />,
    },
  ];

  return (
    <footer className="bg-gray-800 text-gray-300 pt-12 pb-6 px-6 sm:px-8 lg:px-12 mt-20 rounded-t-3xl">
      <div className="max-w-7xl md:mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
        <div className="flex flex-col items-start text-left">
          <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
            <Image
              src="/logo.png"
              alt="Crafter AI"
              width={50}
              height={50}
              className="rounded-full shadow-md"
            />
            <h1 className="text-2xl up font-bold text-white">Crafter AI</h1>
          </div>
          <p className="text-gray-400">
            Leveraging advanced AI technologies to generate text, audio, video,
            and images. Innovative solutions for modern needs.
          </p>
        </div>

        <div className="flex flex-col items-start md:mx-auto">
          <h2 className="text-2xl font-semibold text-white mb-6 text-left">
            Quick Links
          </h2>
          <ul className="space-y-2 text-left">
            {quickLinks.map((link, index) => (
              <li
                key={index}
                className="hover:text-gray-200 cursor-pointer transition-colors"
              >
                {link.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-start lg:mx-auto">
          <h2 className="text-2xl font-semibold text-white mb-5 text-center md:text-left">
            Contact Us
          </h2>
          <div className="flex gap-4">
            {contacts.map((contact, index) => (
              <a
                key={index}
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors shadow-md transform hover:scale-105"
              >
                {contact.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 pt-6 mt-8 text-center">
        <p className="text-sm text-gray-400 mb-1">
          &copy; 2024 Crafter AI. All rights reserved.
        </p>

        <a
          href="https://github.com/dhruvrajpoot"
          target="_blank"
          className="text-xs text-gray-500 hover:text-gray-200 transition duration-200"
        >
          Developed by Dhruv Rajpoot
        </a>
      </div>
    </footer>
  );
};

export default LandingFooter;
