// HomePageMarquee.jsx
import React from 'react';
import { Zap, Target, Trophy, Activity, Flame, Rocket, Award, Star, Medal, Circle } from 'lucide-react';

const Marque = () => {
  const marathonBrands = [
    { Icon: Activity, name: "RunFast" },
    { Icon: Target, name: "MarathonPro" },
    { Icon: Zap, name: "SprintHub" },
    { Icon: Trophy, name: "RaceTrack" },
    { Icon: Circle, name: "FitRunner" },
    { Icon: Star, name: "EliteRun" },
    { Icon: Rocket, name: "QuickPace" },
    { Icon: Flame, name: "PowerRun" },
    { Icon: Award, name: "ChampionRace" },
    { Icon: Medal, name: "StarMarathon" }
  ];

  return (
    <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-emerald-800 text-white py-8 overflow-hidden relative">
      <div className="marquee-container">
        <div className="marquee-content">
          {marathonBrands.map((brand, index) => {
            const IconComponent = brand.Icon;
            return (
              <div key={index} className="inline-flex items-center mx-12">
                <IconComponent className="w-8 h-8 mr-3 opacity-70" strokeWidth={2} />
                <span className="text-2xl font-bold tracking-wide opacity-80">
                  {brand.name}
                </span>
              </div>
            );
          })}
          {marathonBrands.map((brand, index) => {
            const IconComponent = brand.Icon;
            return (
              <div key={`dup-${index}`} className="inline-flex items-center mx-12">
                <IconComponent className="w-8 h-8 mr-3 opacity-70" strokeWidth={2} />
                <span className="text-2xl font-bold tracking-wide opacity-80">
                  {brand.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <style>{`
        .marquee-container {
          display: flex;
          overflow: hidden;
          user-select: none;
        }
        .marquee-content {
          display: flex;
          animation: scroll 50s linear infinite;
          white-space: nowrap;
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-container:hover .marquee-content {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Marque;