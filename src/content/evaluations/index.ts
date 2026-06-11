import type { EvaluationMap } from "@/types";
import { nslookupEvaluations } from "./nslookup";
import { defiscanEvaluations } from "./defiscan";
import { defipunkdEvaluations } from "./defipunkd";
import { defillamaEvaluations } from "./defillama";
import { goplusEvaluations } from "./goplus";
import { safeMultisigEvaluations } from "./safe-multisig";
import { risklayerEvaluations } from "./risklayer";

export const evaluations: EvaluationMap = {
  defillama: defillamaEvaluations,
  nslookup: nslookupEvaluations,
  defiscan: defiscanEvaluations,
  defipunkd: defipunkdEvaluations,
  goplus: goplusEvaluations,
  "safe-multisig": safeMultisigEvaluations,
  risklayer: risklayerEvaluations,
};
