import React from 'react';
import WaveTop from '../../assets/wave-haikei.svg';

const WaveTopColor = ({ color = 'blue' }) => {
  return (
    <WaveTop width={100} height={100} fill={color} />
  );
};

export default WaveTopColor;