"use client";
import React from "react";
import { BarChart3 } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { IVolumetryData } from "@/interfaces/IDashboard";
import { LoadingState } from "../loading";
import { VolumetryBars } from "./volumetry-bars";

interface VolumetryChartProps {
  data: IVolumetryData[];
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
      <div className="flex justify-between items-center text-sm">
        <div className="text-muted-foreground">
          Total: <span className="font-semibold text-foreground">{totalVolume.toLocaleString()}</span> execuções
        </div>
        <div className="text-muted-foreground">
          Pico: <span className="font-semibold text-foreground">{maxVolume}</span>
        </div>
      </div>

       <div className="h-48 sm:h-64 border rounded-lg flex items-center justify-center bg-muted/20">
            {filteredData && filteredData.length > 0 ? (
                <VolumetryBars data={filteredData} maxVolume={maxVolume} />
            ) : (
                <EmptyState />
            )}
        </div>

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