import React from 'react';
import RainDrop from './RainDrop';
import Snowflake from './Snowflake';

const Snow: React.FC = () => {
  const snowflakes = Array.from({ length: 100 }, (_, i) => {
    const left = `${Math.random() * 100}vw`;
    const delay = `${Math.random() * 2}s`;
    const duration = `${10.5 + Math.random() * 7.5}s`;
    return <Snowflake key={i} left={left} animationDelay={delay} duration={duration} />;
  });

  return <div className="absolute w-full h-screen overflow-hidden">{snowflakes}</div>;

};

export default Snow;
