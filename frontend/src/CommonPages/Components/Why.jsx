import React from "react";

const Why = () => {
  return (
    <section className="w-full border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="text-sm uppercase tracking-widest text-gray-500">
            Why Skill Bridge
          </p>
          <h2 className="mt-2 text-3xl font-semibold">
            Learn Smarter. Grow Faster.
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            We focus on practical learning, real-world skills, and outcomes that
            actually move your career forward.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* Card 1 */}
          <div className="p-6 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">
              Practical Learning
            </h3>
            <p className="text-sm text-gray-600">
              Build real projects that mirror industry challenges, not just
              theory.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">
              Career-Focused Paths
            </h3>
            <p className="text-sm text-gray-600">
              Curated learning paths designed to make you job-ready faster.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">
              Expert Guidance
            </h3>
            <p className="text-sm text-gray-600">
              Learn from experienced mentors who’ve worked in real companies.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Why;
