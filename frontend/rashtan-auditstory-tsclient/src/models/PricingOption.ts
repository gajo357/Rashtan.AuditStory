export interface PricingTier {
  title: string;
  subheader: string;
  amount: number;
  length: number;
  star: boolean;
  description: string[];
  buttonText: string;
}

export interface PaymentToProcess {
  nonce: string;
  amount: number;
  length: number;
}

export interface PaymentProcessed {
  transactionId: string;
  amount: number;
  payedUntil: Date;
}
