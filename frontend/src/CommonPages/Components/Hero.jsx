import React from "react";
import { useAssets } from "../../Context/SiteContents";

const Hero = () => {
  const { Assests } = useAssets();

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex flex-col-reverse md:flex-row items-center gap-14">

        {/* TEXT */}
        <div className="md:w-1/2 space-y-7 text-center md:text-left">

          {/* Badge */}
          <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-red-100 text-red-600 ">
            Community-powered learning
          </span>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold leading-tight font-title">
            Clear Your Doubts. <br />
            <span className="text-red-500">Learn Together.</span>
          </h1>

          {/* Main Description */}
          <p className="text-gray-600 text-lg font-body">
            Clarix is a collaborative learning platform where students and
            teachers come together to ask questions, share knowledge, and solve
            doubts instantly — anytime, anywhere.
          </p>

          {/* Feature Points */}
          <ul className="space-y-3 text-gray-700 text-sm md:text-base font-body">
            <li>• Ask doubts and get answers from peers & teachers</li>
            <li>• Real-time discussions powered by live chat</li>
            <li>• Learn faster through community-driven explanations</li>
            <li>• Build confidence by helping others learn</li>
          </ul>

          {/* CTA */}
          <div className="flex justify-center md:justify-start gap-4 pt-3">
            <button className="px-6 py-3 rounded-md bg-red-500 text-white font-medium hover:bg-red-600 transition font-navbar">
              Ask a Doubt
            </button>

            <button className="px-6 py-3 rounded-md border border-gray-300 font-medium hover:bg-gray-100 transition font-navbar">
              Explore Questions
            </button>
          </div>

          {/* Trust Line */}
          <p className="text-xs text-gray-500 pt-2 font-body">
            Trusted by students and educators across multiple disciplines
          </p>
        </div>

        {/* IMAGE */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={Assests.LandingPageImage}
            alt="Clarix community learning"
            className="w-full max-w-md"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;
