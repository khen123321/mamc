export interface RewardTransaction {
  transactionId: string;
  description: string;
  points: number;
  date: string;
  type: "earned" | "redeemed";
}

export interface RewardOffer {
  rewardId: string;
  title: string;
  pointsRequired: number;
  description: string;
}

export interface RewardAccount {
  patientId: string;
  points: number;
  tier: "Silver" | "Gold" | "Platinum";
  transactions: RewardTransaction[];
  offers: RewardOffer[];
}
