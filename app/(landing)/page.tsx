import LandingAbout from "./landing-about";
import LandingContent from "./landing-content";
import LandingFooter from "./landing-footer";
import LandingHero from "./landing-hero";
import LandingNavbar from "./landing-navbar";

const LandingPage = () => {
  return (
    <div className="bg-[#111827] overflow-auto">
      <div className="mx-auto max-w-screen-xl">
        <LandingNavbar />
        <LandingHero />
        <LandingAbout />
        <LandingContent />
      </div>
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
