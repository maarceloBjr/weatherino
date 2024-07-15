import React from 'react';
import RainDrop from './RainDrop';

const Rain: React.FC = () => {
  const rainDrops = Array.from({ length: 100 }, (_, i) => {
    const left = `${Math.random() * 100}vw`;
    const delay = `${Math.random() * 2}s`;
    const duration = `${0.5 + Math.random() * 0.5}s`;
    return <RainDrop key={i} left={left} delay={delay} duration={duration} />;
  });

  return <div className="absolute w-full h-screen overflow-hidden">{rainDrops}</div>;
};

export default Rain;
