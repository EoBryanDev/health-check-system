// front/src/components/dashboard/LoadingState.tsx
import { RefreshCw } from "lucide-react";

export function LoadingState() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center text-muted-foreground">
        <RefreshCw className="h-10 w-10 mx-auto mb-4 animate-spin" />
        <p className="text-lg font-semibold">Carregando painel...</p>
      </div>
    </div>
  );
}