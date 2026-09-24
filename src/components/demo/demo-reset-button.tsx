"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { demoResetService } from "@/lib/services/demo-reset-service";

export function DemoResetButton() {
  const [resetAt, setResetAt] = useState<string>("");

  function resetDemo() {
    demoResetService.resetInternalOperations();
    setResetAt(new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }));
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="outline" onClick={resetDemo}>
        <RotateCcw className="h-4 w-4" />
        Reset Local Demo State
      </Button>
      {resetAt ? <span className="text-sm font-medium text-slate-500">Reset at {resetAt}</span> : null}
    </div>
  );
}
