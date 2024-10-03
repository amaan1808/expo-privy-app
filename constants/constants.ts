export const homeTabs = [
  { name: "Trending", value: "trending" },
  { name: "Top", value: "top" },
];

export const theme = {
  light: "light",
  dark: "dark",
};

export const chainNames = {
  solana: "Solana",
  base: "Base",
};

export const chartTimeFrames = ["1D", "7D", "30D", "90D", "1Y"];

export const defaultDepositAmounts = [50, 100, 200, 400];
export const defaultSellAmounts = [2000, 5000, "Max"];

export const buySellDeposit = {
  send: "send",
  buy: "buy",
  sell: "sell",
  deposit: "deposit",
};

type PaymentMethods = {
  [key: string]: string;
};

export const paymentMethods: PaymentMethods = {
  card: "Credit/Debit card",
  apple: "Apple Pay",
  paypal: "PayPal",
  crypto: "Deposit via crypto",
};
export const dummyChartData = [
  { date: 1723903200, value: 141.12368367521097 },
  { date: 1723906800, value: 140.21469938441209 },
  { date: 1723910400, value: 141.24243394906122 },
  { date: 1723914000, value: 140.476750163665 },
  { date: 1723917600, value: 140.5363698586207 },
  { date: 1723921200, value: 141.12008780822651 },
  { date: 1723924800, value: 140.98952325325862 },
  { date: 1724050800, value: 142.31239284654689 },
  { date: 1724054400, value: 142.66465661404345 },
  { date: 1724058000, value: 141.00481590849918 },
  { date: 1724061600, value: 141.24255684267797 },
];

export const dummyArray: any[] = Array.from(
  { length: 10 },
  (_, index) => index
);
