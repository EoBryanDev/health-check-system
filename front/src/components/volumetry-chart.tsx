"use client";
import React from "react";
import { BarChart3 } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { VolumetryData } from "@/interfaces/IDashboard";
import { LoadingState } from "./loading";

interface VolumetryChartProps {
  data: VolumetryData[];
  loading?: boolean;
}

const EmptyState = () => (
  <div className="text-center text-muted-foreground">
    <BarChart3 className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-2" />
    <p className="text-sm">Nenhum dado de volumetria disponível</p>
    <p className="text-xs mt-1">Os dados aparecerão quando houver execuções de serviços</p>
  </div>
);

export const VolumetryChart = ({ data, loading = false }: VolumetryChartProps) => {
  const isSmallScreen = useMediaQuery("(max-width: 640px)");

  const filteredData = isSmallScreen ? data.filter((_, index) => index % 3 === 0) : data;

  const maxVolume = Math.max(...filteredData.map((d) => d.volume), 1);
  const totalVolume = data.reduce((sum, item) => sum + item.volume, 0);

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-4">
      {/* Header with summary information */}
      <div className="flex justify-between items-center text-sm">
        <div className="text-muted-foreground">
          Total: <span className="font-semibold text-foreground">{totalVolume.toLocaleString()}</span> execuções
        </div>
        <div className="text-muted-foreground">
          Pico: <span className="font-semibold text-foreground">{maxVolume}</span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-48 sm:h-64 border rounded-lg flex items-center justify-center bg-muted/20">
        {filteredData && filteredData.length > 0 ? (
          <div className="w-full h-full p-2 sm:p-4">
            <div className="flex items-end justify-between h-full space-x-1">
              {filteredData.map((dataPoint, index) => {
                const height = maxVolume > 0 ? (dataPoint.volume / maxVolume) * 100 : 0;
                const isHighVolume = dataPoint.volume > maxVolume * 0.7;

                return (
                  <div key={`${dataPoint.timestamp}-${index}`} className="flex flex-col items-center flex-1 group relative">
                    <div className="relative w-full">
                      <div
                        className={`w-full rounded-t transition-all duration-300 ${isHighVolume ? "bg-red-500 hover:bg-red-600" : dataPoint.volume > maxVolume * 0.4 ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-500 hover:bg-blue-600"}`}
                        style={{ height: `${Math.max(height, 2)}%` }}
                      />

                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                        {dataPoint.timestamp}: {dataPoint.volume} execuções
                      </div>
                    </div>

                    <span className="text-xs text-muted-foreground mt-1 text-center truncate w-full">
                      {dataPoint.timestamp}
                    </span>

                    <span className="text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                      {dataPoint.volume}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <EmptyState />
        )}
      </div>

      {/* Legend */}
      <div className="flex justify-center space-x-4 text-xs">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span className="text-muted-foreground">Normal</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-yellow-500 rounded"></div>
          <span className="text-muted-foreground">Médio</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span className="text-muted-foreground">Alto</span>
        </div>
      </div>
    </div>
  );
};