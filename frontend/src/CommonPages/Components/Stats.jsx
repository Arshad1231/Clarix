import React from "react";

const Stats = () => {
  return (
    <section className="w-full border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Section Label */}
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-widest text-gray-500">
            What We Offer
          </p>
          <h2 className="mt-2 text-2xl font-semibold">
            Our Impact in Numbers
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">

          <div>
            <p className="text-4xl font-bold">10K+</p>
            <p className="mt-2 text-sm text-gray-600">
              Learners Worldwide
            </p>
          </div>

          <div>
            <p className="text-4xl font-bold">200+</p>
            <p className="mt-2 text-sm text-gray-600">
              Hours of Content
            </p>
          </div>

          <div>
            <p className="text-4xl font-bold">95%</p>
            <p className="mt-2 text-sm text-gray-600">
              Satisfaction Rate
            </p>
          </div>

          <div>
            <p className="text-4xl font-bold">50+</p>
            <p className="mt-2 text-sm text-gray-600">
              Industry Mentors
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Stats;
