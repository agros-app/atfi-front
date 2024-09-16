import React from 'react';
import Image from 'next/image';

interface LogoProps {
  size?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 50, className }) => (
  <Image
    src="/logo.png"
    alt="Logo"
    width={size}
    height={size}
    className={className}
  />
);

export default Logo;
