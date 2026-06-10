import type { EvaluationMap } from "@/types";
import { nslookupEvaluations } from "./nslookup";
import { defiscanEvaluations } from "./defiscan";
import { defipunkdEvaluations } from "./defipunkd";
import { riskscaleEvaluations } from "./mock-riskscale";
import { sentinelEvaluations } from "./mock-sentinel";
import { threatlabEvaluations } from "./mock-threatlab";

export const evaluations: EvaluationMap = {
  nslookup: nslookupEvaluations,
  defiscan: defiscanEvaluations,
  defipunkd: defipunkdEvaluations,
  riskscale: riskscaleEvaluations,
  sentinel: sentinelEvaluations,
  threatlab: threatlabEvaluations,
};
