import React, { useState } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const Stats = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  if (inView && !hasAnimated) {
    setHasAnimated(true);
  }

  return (
    <section ref={ref} className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-5xl font-bold mb-2">
              {hasAnimated ? <CountUp end={1000000} duration={2.5} separator="," /> : '0'}+
            </h3>
            <p className="text-gray-400">Lines of Code Analyzed</p>
          </div>
          <div>
            <h3 className="text-5xl font-bold mb-2">
              {hasAnimated ? <CountUp end={5000} duration={2.5} separator="," /> : '0'}+
            </h3>
            <p className="text-gray-400">Bugs Fixed</p>
          </div>
          <div>
            <h3 className="text-5xl font-bold mb-2">
              {hasAnimated ? <CountUp end={20000} duration={2.5} separator="," /> : '0'}+
            </h3>
            <p className="text-gray-400">Tests Generated</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
