import React from "react";
import { useAssets } from "../../Context/SiteContents";

const Trust = () => {
  const { Assests } = useAssets();
  const companyLogos = Assests.Logos;

  return (
    <section className="w-full border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-20 text-center space-y-8">

        {/* Heading */}
        <p className="text-base uppercase tracking-widest text-gray-500 font-heading">
          Trusted by learners & educators worldwide
        </p>

        {/* Sub text */}
        <p className="text-gray-600 max-w-3xl mx-auto text-base md:text-lg font-body">
          Used by students from top universities and professionals from leading
          technology companies to ask questions, share knowledge, and grow
          together.
        </p>

        {/* Logos */}
        <div className="flex flex-wrap justify-center items-center gap-14 opacity-90 pt-6">
          {companyLogos.map((logo, index) => {
            const isSmallLogo = index === 0 || index === 2;

            return (
              <img
                key={index}
                src={logo}
                alt="Company logo"
                className={`
                  grayscale transition duration-300 hover:grayscale-0 hover:scale-110
                  ${isSmallLogo ? "h-16 md:h-18" : "h-12 md:h-14"}
                `}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Trust;
