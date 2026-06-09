import type { EvaluationMap } from "@/types";
import { defiscanEvaluations } from "./defiscan";
import { defipunkdEvaluations } from "./defipunkd";
import { riskscaleEvaluations } from "./mock-riskscale";
import { sentinelEvaluations } from "./mock-sentinel";
import { threatlabEvaluations } from "./mock-threatlab";

export const evaluations: EvaluationMap = {
  defiscan: defiscanEvaluations,
  defipunkd: defipunkdEvaluations,
  riskscale: riskscaleEvaluations,
  sentinel: sentinelEvaluations,
  threatlab: threatlabEvaluations,
};
