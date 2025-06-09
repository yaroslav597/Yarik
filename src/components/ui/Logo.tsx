import React from 'react';
import { Fish } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = 'h-8 w-8' }) => {
  return <Fish className={className} />;
};

export default Logo;