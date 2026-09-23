import React from 'react';
import { clsx } from 'clsx';

export interface BilingualTooltipProps {
  children: React.ReactNode;
  englishText: string;
  hindiText: string;
  className?: string;
}

export function BilingualTooltip({ children, englishText, hindiText, className }: BilingualTooltipProps) {
  return (
    <div className={clsx("group relative inline-block", className)}>
      {children}
      <div className="absolute hidden group-hover:block bottom-full mb-2 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-50">
        <div>{englishText}</div>
        <div className="text-gray-300 mt-1">{hindiText}</div>
      </div>
    </div>
  );
}
