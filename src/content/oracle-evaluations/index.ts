import type { EvaluationMap } from "@/types";
import { defillamaOracleEvaluations } from "./defillama";
import { chaoslabsOracleEvaluations } from "./chaoslabs";
import { defisafetyOracleEvaluations } from "./defisafety";
import { fortaOracleEvaluations } from "./forta";

export const oracleEvaluations: EvaluationMap = {
  defillama: defillamaOracleEvaluations,
  chaoslabs: chaoslabsOracleEvaluations,
  defisafety: defisafetyOracleEvaluations,
  forta: fortaOracleEvaluations,
};
