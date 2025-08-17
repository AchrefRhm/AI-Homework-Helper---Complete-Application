import React from 'react';
import { Calculator, Atom, Code, Brain, Zap, Star } from 'lucide-react';

const FloatingElements: React.FC = () => {
  const elements = [
    { Icon: Calculator, delay: '0s', duration: '20s', color: 'text-blue-400' },
    { Icon: Atom, delay: '2s', duration: '25s', color: 'text-green-400' },
    { Icon: Code, delay: '4s', duration: '22s', color: 'text-purple-400' },
    { Icon: Brain, delay: '6s', duration: '18s', color: 'text-orange-400' },
    { Icon: Zap, delay: '8s', duration: '24s', color: 'text-yellow-400' },
    { Icon: Star, delay: '10s', duration: '26s', color: 'text-pink-400' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((element, index) => {
        const { Icon, delay, duration, color } = element;
        return (
          <div
            key={index}
            className={`absolute opacity-10 ${color}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${duration} ${delay} infinite linear`,
            }}
          >
            <Icon className="w-8 h-8" />
          </div>
        );
      })}
      
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.1;
          }
          90% {
            opacity: 0.1;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default FloatingElements;