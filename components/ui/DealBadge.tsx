import React from 'react';

interface DealBadgeProps {
  text: string;
  variant?: 'red' | 'orange' | 'green';
}

const VARIANT_CLASSES: Record<string, string> = {
  red: 'bg-[#F9F7F2] text-[#8B0000] border border-[#E8E4DE]',
  orange: 'bg-[#F9F7F2] text-[#A6803F] border border-[#E8E4DE]',
  green: 'bg-[#F9F7F2] text-[#D4AFB9] border border-[#E8E4DE]',
};

export default function DealBadge({ text, variant = 'red' }: DealBadgeProps) {
  return (
    <span className={`inline-flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded-sm ${VARIANT_CLASSES[variant]}`}>
      {text}
    </span>
  );
}
