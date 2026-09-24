import type { RewardAccount } from "@/types/reward";

export const rewardAccounts: RewardAccount[] = [
  {
    patientId: "PAT-001",
    points: 1250,
    tier: "Gold",
    transactions: [
      { transactionId: "RWD-TXN-001", description: "Annual Checkup", points: 250, date: "2026-09-01", type: "earned" },
      { transactionId: "RWD-TXN-002", description: "Laboratory Service", points: 100, date: "2026-09-08", type: "earned" },
      { transactionId: "RWD-TXN-003", description: "Pharmacy Transaction", points: 50, date: "2026-09-10", type: "earned" },
      { transactionId: "RWD-TXN-004", description: "Wellness Package", points: 300, date: "2026-09-18", type: "earned" },
      { transactionId: "RWD-TXN-005", description: "Parking Pass Redemption", points: -150, date: "2026-09-20", type: "redeemed" },
    ],
    offers: [
      { rewardId: "RWD-001", title: "PHP 100 Cafeteria Voucher", pointsRequired: 500, description: "Redeem at the hospital cafeteria cashier." },
      { rewardId: "RWD-002", title: "Free Parking Pass", pointsRequired: 150, description: "One-day parking pass for outpatient visits." },
      { rewardId: "RWD-003", title: "Wellness Package Discount", pointsRequired: 900, description: "15% discount on selected wellness packages." },
      { rewardId: "RWD-004", title: "Pharmacy Discount Voucher", pointsRequired: 700, description: "Discount voucher for eligible pharmacy items." },
    ],
  },
];
