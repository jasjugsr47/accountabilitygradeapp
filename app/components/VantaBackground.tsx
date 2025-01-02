// components/VantaBackground.tsx
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import CLOUDS from 'vanta/dist/vanta.clouds.min.js';

interface VantaBackgroundProps {
    children?: React.ReactNode;
}

const VantaBackground: React.FC<VantaBackgroundProps> = ({ children }) => {
  const myRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    CLOUDS({
      THREE: THREE,
      el: myRef.current,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      skyColor: 0x72dff,
      cloudColor: 0x383838,
      sunColor: 0xff7722,
      sunGlare: 80.00,
      sunlightColor: 0xffddaa
    });
  }, []);
navigationLinks: []

  return (
    <div ref={myRef} style={{ width: '100%', height: '100vh' }}>
      {children}
    </div>
  );
};

export default VantaBackground;
