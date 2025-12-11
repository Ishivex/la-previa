import React from 'react';

const Button = ({ onClick, children, variant = 'primary', className = '', disabled = false }) => {
  const baseStyle = "w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 transform active:scale-95 flex items-center justify-center gap-2 shadow-lg";
  
  const variants = {
    primary: "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-500/30 border border-purple-400/20",
    secondary: "bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700",
    danger: "bg-red-600 hover:bg-red-500 text-white shadow-red-500/30",
    ghost: "bg-transparent hover:bg-white/10 text-gray-300",
    neon: "bg-black border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-black shadow-[0_0_15px_rgba(74,222,128,0.5)]"
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed grayscale' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;