import React from 'react';
import Snowflake from './Snowflake';

const Snow: React.FC = () => {
  const snowflakes = Array.from({ length: 100 }, (_, i) => {
    const left = `${Math.random() * 100}vw`;
    const delay = `${Math.random() * 10}s`;
    const duration = `${7.5 + Math.random() * 3.5}s`;
    return <Snowflake key={i} left={left} animationDelay={delay} duration={duration} />;
  });

  return <div className="absolute w-full h-screen overflow-hidden">{snowflakes}</div>;

};

export default Snow;
