import React from 'react';
import Image from 'next/image';

interface LogoProps {
  height?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ height = 50, className }) => (
  <div style={{ height: `${height}px`, position: 'relative' }}>
    <Image
      src="/logo.png"
      alt="Logo"
      fill
      style={{ objectFit: 'contain' }}
      className={className}
    />
  </div>
);

export default Logo;
