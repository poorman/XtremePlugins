import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  id?: string;
}

export default function GlassCard({ children, className = '', hover = false, id }: GlassCardProps) {
  return (
    <div
      id={id}
      className={`glass rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.05)] ${hover ? 'glass-hover transition-all duration-300 hover:-translate-y-1' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
