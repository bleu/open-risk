import type { EvaluationMap } from "@/types";
import { goplusTokenEvaluations } from "./goplus";
import { defiScannerEvaluations } from "./defi";
import { chainawareEvaluations } from "./chainaware";
import { pegMonitorEvaluations } from "./peg-monitor";
import { pharosEvaluations } from "./pharos";

export const tokenEvaluations: EvaluationMap = {
  "defillama-token": pegMonitorEvaluations,
  "goplus-token": goplusTokenEvaluations,
  "defi-scanner": defiScannerEvaluations,
  chainaware: chainawareEvaluations,
  pharos: pharosEvaluations,
};
