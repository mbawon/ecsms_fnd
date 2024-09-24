import React from 'react';

interface CardProps {
  title: string;
  content: string;
  className?: string; 
}

const Card: React.FC<CardProps> = ({ title, content, className = '' }) => {
  return (
    <div className={`rounded-xl p-4 border border-gray-200 min-h-[60px] ${className || 'bg-white'}`}>
      <h4 className="text-sm font-bold mb-2">{title}</h4>
      <p className="bg-inherit">{content}</p>
    </div>
  );
};

export default Card;
