import React from 'react';

interface RainDropProps {
  left: string;
  delay: string;
  duration: string;
}

const RainDrop: React.FC<RainDropProps> = ({ left, delay, duration }) => {
  return (
    <div
      className="rain top-[-10px] absolute"
      style={{
        left,
        animationDelay: delay,
        animationDuration: duration,
      }}
    ></div>
  );
};

export default RainDrop;
