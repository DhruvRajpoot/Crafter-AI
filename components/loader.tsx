import React from "react";
import { LoaderPinwheel as LoaderIcon } from "lucide-react";

const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="relative animate-spin">
        <LoaderIcon />
      </div>
      <p className="text-sm text-muted-foreground">Crafter AI is thinking...</p>
    </div>
  );
};

export default Loader;
