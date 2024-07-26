"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const testimonials = [
  {
    name: "Amit Agarwal",
    title: "Web Developer",
    description:
      "The ability to generate engaging content and support multimedia projects has revolutionized my web development work.",
  },
  {
    name: "Mohit Kumar",
    title: "Software Engineer",
    description:
      "This tool has transformed my workflow. Its advanced code generation have become essential for my productivity.",
  },
  {
    name: "Raghav Singh",
    title: "Content Creator",
    description:
      "I’m amazed by the versatility. It’s been invaluable for generating images, videos, and music in our projects.",
  },
  {
    name: "Sachin Gupta",
    title: "App Developer",
    description:
      "The features offered have significantly improved our app development process. It’s now a crucial part of my toolkit.",
  },
];

const LandingContent = () => {
  return (
    <div className="p-4">
      <h2 className="text-center text-4xl text-white font-extrabold mb-6">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="bg-[#192339] border-none text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#2B2E3A] rounded-full flex items-center justify-center text-2xl text-white uppercase">
                  {testimonial.name[0]}
                </div>
                <div>
                  <p className="text-lg">{testimonial.name}</p>
                  <p className="text-sm text-zinc-400">{testimonial.title}</p>
                </div>
              </CardTitle>

              <CardContent className="p-0 pt-2">
                {testimonial.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LandingContent;
