import { useState } from 'react';

function Tooltip({ children }) {
  return (
    <div className="flex flex-col relative top-[100%] left-[0%] ml-[-240px] w-[240px]">
      <div className="flex flex-col p-6 shadow-2xl border-2 bg-[#282c34] shadow-gray-900 rounded-lg m-5 w-60 border-neutral-600">
        {children}
      </div>
    </div>
  );
}

export function CardWrapper({ children }) {
  return (
    <div className="bg-[#1e293b]/50 backdrop-blur-sm rounded-lg p-6 border border-[#334155] hover:border-[#3b82f6] transition-colors">
      {children}
    </div>
  );
}

export function Card({ title, description, tech }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-[#60a5fa]">$</span>
        <h3 className="text-lg font-bold text-white font-mono">{title}</h3>
      </div>
      <div className="ml-8 text-[#94a3b8] font-mono">{description}</div>
      <div className="ml-8 flex flex-wrap gap-2">
        {tech.map((item, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-[#3b82f6]/20 text-[#60a5fa] rounded text-sm font-mono"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
