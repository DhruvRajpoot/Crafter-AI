"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Amit Agarwal",
    title: "Web Developer",
    color: "bg-emerald-600",
    description:
      "The ability to generate engaging content and support multimedia projects has revolutionized my web development work.",
  },
  {
    name: "Mohit Kumar",
    title: "Software Engineer",
    color: "bg-sky-600",
    description:
      "This tool has transformed my workflow. Its advanced code generation has become essential for my productivity.",
  },
  {
    name: "Raghav Singh",
    title: "Content Creator",
    color: "bg-teal-700",
    description:
      "I’m amazed by the versatility. It’s been invaluable for generating images, videos, and music in our projects.",
  },
  {
    name: "Sachin Gupta",
    title: "App Developer",
    color: "bg-indigo-400",
    description:
      "The features offered have significantly improved our app development process. It’s now a crucial part of my toolkit.",
  },
];
const LandingContent = () => {
  return (
    <div className="p-6 bg-gray-900">
      <h2 className="text-center text-3xl sm:text-5xl text-white font-bold mb-14">
        What Our Users Say
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card
            key={index}
            className="bg-gray-800 border border-gray-700 text-white rounded-lg"
          >
            <CardHeader>
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    "w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-2xl text-white font-semibold",
                    testimonial.color
                  )}
                >
                  {testimonial.name[0]}
                </div>
                <div>
                  <p className="text-xl font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.title}</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="text-gray-300">
              {testimonial.description}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LandingContent;
