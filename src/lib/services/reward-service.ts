import { rewardAccounts } from "@/lib/mock/rewards";

export const rewardService = {
  getPatientRewards: (patientId: string) => rewardAccounts.find((account) => account.patientId === patientId) ?? rewardAccounts[0],
};
