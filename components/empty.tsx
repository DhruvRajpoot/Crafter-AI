import Image from "next/image";

interface EmptyProps {
  label: string;
}

const Empty: React.FC<EmptyProps> = ({ label }) => {
  return (
    <div className="h-full py-20 flex flex-col items-center justify-center">
      <div className="relative h-60 w-60">
        <Image alt="Empty" fill src="/empty.png" />
      </div>
      <p className="text-muted-foreground text-sm text-center mt-4">{label}</p>
    </div>
  );
};

export default Empty;
