import type { EvaluationMap } from "@/types";
import { goplusTokenEvaluations } from "./goplus";
import { defiScannerEvaluations } from "./defi";
import { chainawareEvaluations } from "./chainaware";
import { honeypotisEvaluations } from "./honeypotis";
import { pegMonitorEvaluations } from "./peg-monitor";

export const tokenEvaluations: EvaluationMap = {
  "goplus-token": goplusTokenEvaluations,
  "defi-scanner": defiScannerEvaluations,
  chainaware: chainawareEvaluations,
  honeypotis: honeypotisEvaluations,
  "peg-monitor": pegMonitorEvaluations,
};
