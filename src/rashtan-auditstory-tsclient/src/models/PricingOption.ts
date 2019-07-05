export enum ButtonVariant {
  text = 0,
  outlined = 1,
  contained = 2
}

export const getButtonVariant = (tier: PricingTier) => {
  switch (tier.buttonVariant) {
    case ButtonVariant.text:
      return "text";
    case ButtonVariant.contained:
      return "contained";
    case ButtonVariant.outlined:
      return "outlined";
  }
};

export interface PricingTier {
  title: string;
  subheader: string;
  amount: number;
  description: string[];
  buttonText: string;
  buttonVariant: ButtonVariant;
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
