import React from 'react';

interface CloudProps {
    num: number;
  }
  
  const Cloud: React.FC<CloudProps> = ({ num }) => {
    console.log(num);
    return (
      <div className={`cloud-${num}`}>
        <div className={`cloud-part-${num}`} id="cloud-back"></div>
        <div className={`cloud-part-${num}`} id="cloud-mid"></div>
        <div className={`cloud-part-${num}`} id="cloud-front"></div>
      </div>
    );
  };
const Sky = () => {
  const clouds = Array.from({ length: 1 }, (_, index) => index + 1);

  return (
    <div className="sky">
      {clouds.map((num) => (
        <Cloud key={num} num={num} />
      ))}
      <svg width="0" height="0">
        <filter id="filter-back">
          <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="4" seed="0" />
          <feDisplacementMap in="SourceGraphic" scale="170" />
        </filter>
        <filter id="filter-mid">
          <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="0" />
          <feDisplacementMap in="SourceGraphic" scale="150" />
        </filter>
        <filter id="filter-front">
          <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="0" />
          <feDisplacementMap in="SourceGraphic" scale="50" />
        </filter>
      </svg>
    </div>
  );
};

const CloudContainer = () => {
  return (
    <div className="cloud-container absolute w-screen h-screen">
      <Sky />
    </div>
  );
};


export default CloudContainer;
