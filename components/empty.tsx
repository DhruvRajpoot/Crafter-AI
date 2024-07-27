import React from "react";
import Lottie from "react-lottie";

interface EmptyProps {
  label: string;
  animationData?: object;
}

const Empty: React.FC<EmptyProps> = ({ label, animationData }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex flex-col items-center justify-center h-full py-10">
      <div className="relative h-64 w-64 md:h-80 md:w-80 flex items-center justify-center bg-gray-100 rounded-lg pointer-events-none">
        <div className="flex items-center justify-center ">
          {animationData && <Lottie options={defaultOptions} />}
        </div>
      </div>
      <p className="mt-4 text-gray-700 font-semibold text-center">{label}</p>
    </div>
  );
};

export default Empty;
