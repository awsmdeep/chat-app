import React from 'react';

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-[#242124] p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-purple-500/20 shadow-neon 
              transition-all hover:scale-105 hover:shadow-purple-500/50 ${
                "animate-pulse" 
              }`}
            />
          ))}
        </div>
        <h2 className="text-3xl font-bold text-neon mb-4">{title}</h2>
        <p className="text-gray-400">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
