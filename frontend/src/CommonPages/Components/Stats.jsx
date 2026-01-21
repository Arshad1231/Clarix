import React from "react";

const Stats = () => {
  return (
    <section className="w-full border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-sm uppercase tracking-widest text-gray-500 font-body">
            What We’ve Achieved
          </p>

          <h2 className="text-3xl md:text-4xl font-semibold leading-tight font-heading">
            Impact Created Through Collaboration
          </h2>

          <p className="text-gray-600 max-w-3xl mx-auto text-base md:text-lg font-body">
            Clarix measures success by how effectively learners help each other.
            These numbers reflect the impact created through open discussions,
            shared knowledge, and real-time collaboration.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-center">

          {/* Stat 1 */}
          <div className="space-y-3">
            <p className="text-4xl md:text-5xl text-gray-900 font-heading">
              25K+
            </p>
            <h3 className="text-lg font-semibold font-heading">
              Questions Asked
            </h3>
            <p className="text-gray-600 text-sm md:text-base font-body">
              By creating a safe space where students feel confident to ask
              doubts without hesitation.
            </p>
          </div>

          {/* Stat 2 */}
          <div className="space-y-3">
            <p className="text-4xl md:text-5xl text-gray-900 font-heading">
              18K+
            </p>
            <h3 className="text-lg font-semibold font-heading">
              Doubts Solved
            </h3>
            <p className="text-gray-600 text-sm md:text-base font-body">
              Through community-driven answers from peers, mentors, and
              educators across different fields.
            </p>
          </div>

          {/* Stat 3 */}
          <div className="space-y-3">
            <p className="text-4xl md:text-5xl text-gray-900 font-heading">
              96%
            </p>
            <h3 className="text-lg font-semibold font-heading">
              Positive Learning Experience
            </h3>
            <p className="text-gray-600 text-sm md:text-base font-body">
              Achieved by encouraging detailed explanations, discussions, and
              respectful feedback.
            </p>
          </div>

          {/* Stat 4 */}
          <div className="space-y-3">
            <p className="text-4xl md:text-5xl text-gray-900 font-heading">
              6K+
            </p>
            <h3 className="text-lg font-semibold font-heading">
              Active Learners
            </h3>
            <p className="text-gray-600 text-sm md:text-base font-body">
              Growing daily as students and teachers collaborate in real time
              to learn and grow together.
            </p>
          </div>

        </div>

        {/* Closing Line */}
        <p className="text-center text-gray-500 text-sm mt-16 font-body">
          Every question asked brings the community one step closer to clarity.
        </p>

      </div>
    </section>
  );
};

export default Stats;
