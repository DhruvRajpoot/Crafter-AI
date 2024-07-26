import LandingContent from "@/components/landing-content";
import LandingHero from "@/components/landing-hero";
import LandingNavbar from "@/components/landing-navbar";

const LandingPage = () => {
  return (
    <div className="h-full bg-[#111827] overflow-auto">
      <div className="mx-auto max-w-screen-xl h-full">
        <LandingNavbar />
        <LandingHero />
        <LandingContent />
      </div>
    </div>
  );
};

export default LandingPage;
