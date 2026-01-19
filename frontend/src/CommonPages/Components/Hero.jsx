import React from "react";
import { useAssets } from "../../Context/SiteContents";

const Hero = () => {
  const { Assests } = useAssets();

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex flex-col-reverse md:flex-row items-center gap-10">

        {/* TEXT */}
        <div className="md:w-1/2 space-y-4 text-center md:text-left">
          <h1 className="text-4xl font-bold leading-tight">
            Build Skills That Matter
          </h1>
          <p className="text-gray-600">
            Skill Bridge helps you learn, grow, and connect your skills to real
            opportunities.
          </p>

          <div className="flex justify-center md:justify-start gap-4">
            <button className="px-6 py-2 border border-gray-300 rounded-md hover:bg-red-500 hover:text-white transition">
              Get Started
            </button>
            <button className="px-6 py-2 border border-gray-300 rounded-md hover:bg-red-500 hover:text-white transition">
              Learn More
            </button>
          </div>
        </div>

        {/* IMAGE */}
        <div className="md:w-1/2">
          <img
            src={Assests.LandingPageImage}
            alt="Hero"
            className="w-full max-w-md mx-auto"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;
