export interface PricingTier {
  title: string;
  subheader: string;
  amount: number;
  description: string[];
  buttonText: string;
}

export interface PaymentToProcess {
  nonce: string;
  amount: number;
}

export interface PaymentProcessed {
  transactionId: string;
  amount: number;
  payedUntil: Date;
}
