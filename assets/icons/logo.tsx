import React from 'react';
import Image from 'next/image';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ width = 50, height = 50, className }) => (
  <Image
    src="/logo.png"
    alt="Logo"
    width={width}
    height={height}
    className={className}
  />
);

export default Logo;
