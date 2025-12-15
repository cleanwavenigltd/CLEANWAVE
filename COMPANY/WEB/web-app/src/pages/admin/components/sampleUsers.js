export  function sampleUsers() {
  return [
    {
      id: 1,
      name: "Aisha Bello",
      email: "aisha@example.com",
      wallet: 125000,
      active: true,
    },
    {
      id: 2,
      name: "Chinedu Okeke",
      email: "chinedu@example.com",
      wallet: 45000,
      active: true,
    },
    {
      id: 3,
      name: "Ngozi U.",
      email: "ngozi@example.com",
      wallet: 0,
      active: false,
    },
    {
      id: 4,
      name: "Tunde Martins",
      email: "tunde@example.com",
      wallet: 300000,
      active: true,
    },
    {
      id: 5,
      name: "Fatima S.",
      email: "fatima@example.com",
      wallet: 72000,
      active: true,
    },
  ];
}
export function sampleTransactions() {
  // pretend these are for the current month
  return [
    {
      id: 1,
      title: "USDT conversion fees",
      type: "revenue",
      amount: 4200000,
      date: "2025-10-03",
    },
    {
      id: 2,
      title: "Bank withdrawal charges",
      type: "expense",
      amount: 12000,
      date: "2025-10-04",
    },
    {
      id: 3,
      title: "Onboarding bonus",
      type: "expense",
      amount: 500000,
      date: "2025-10-07",
    },
    {
      id: 4,
      title: "Listing revenue",
      type: "revenue",
      amount: 2200000,
      date: "2025-10-08",
    },
    {
      id: 5,
      title: "Referral payout",
      type: "expense",
      amount: 30000,
      date: "2025-10-09",
    },
    {
      id: 6,
      title: "Swap fees",
      type: "revenue",
      amount: 150000,
      date: "2025-10-12",
    },
  ];
}
