import React from "react";

const Trust = () => {
  return (
    <section className="w-full border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12 text-center">

        {/* Heading */}
        <p className="text-sm uppercase tracking-widest text-gray-500 mb-6">
          Trusted by leading companies
        </p>

        {/* Logos */}
        <div className="flex flex-wrap justify-center items-center gap-10 opacity-70">
          <span className="text-xl font-semibold">Google</span>
          <span className="text-xl font-semibold">Microsoft</span>
          <span className="text-xl font-semibold">Amazon</span>
          <span className="text-xl font-semibold">Meta</span>
          <span className="text-xl font-semibold">Netflix</span>
        </div>

      </div>
    </section>
  );
};

export default Trust;
