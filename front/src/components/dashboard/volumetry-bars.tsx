import React from 'react';
import { IVolumetryData } from "@/interfaces/IDashboard";

interface VolumetryBarsProps {
    data: IVolumetryData[];
    maxVolume: number;
}

export const VolumetryBars = ({ data, maxVolume }: VolumetryBarsProps) => {
    
  return (
    <div className="w-full p-2 sm:p-4">
      <div className="flex items-end justify-between h-40 space-x-1">
        {data.map((dataPoint, index) => {
          const height = maxVolume > 0 ? (dataPoint.volume / maxVolume) * 100 : 0;
          const isHighVolume = dataPoint.volume > maxVolume * 0.7;
          
          
          return (
            <div key={`${dataPoint.timestamp}-${index}`} className="flex flex-col items-center flex-1 group relative">
                <div 
                    className="relative w-full mb-1"
                    style={{ height: '140px' }} 
                >
                  <div
                      className={`w-full rounded-t transition-all duration-300 absolute bottom-0 ${
                          isHighVolume 
                              ? "bg-red-500 hover:bg-red-600" 
                              : dataPoint.volume > maxVolume * 0.4 
                                  ? "bg-yellow-500 hover:bg-yellow-600" 
                                  : "bg-blue-500 hover:bg-blue-600"
                      }`}
                      style={{ 
                          height: `${Math.max(height, dataPoint.volume > 0 ? 3 : 0)}%` 
                      }}
                  />

                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                      {dataPoint.timestamp}: {dataPoint.volume} execuções
                  </div>
                </div>

                <span className="text-xs text-muted-foreground text-center truncate w-full">
                    {dataPoint.timestamp}
                </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};