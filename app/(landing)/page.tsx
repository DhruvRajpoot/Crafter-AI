import LandingContent from "./landing-content";
import LandingHero from "./landing-hero";
import LandingNavbar from "./landing-navbar";

const LandingPage = () => {
  return (
    <div className="h-full bg-[#111827] overflow-auto homepage">
      <div className="mx-auto max-w-screen-xl h-full">
        <LandingNavbar />
        <LandingHero />
        <LandingContent />
      </div>
    </div>
  );
};

export default LandingPage;
