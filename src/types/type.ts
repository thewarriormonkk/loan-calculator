export interface FormData {
  loanAmount: string;
  interestRate: string;
  term: string;
}

export interface NumericFormData {
  loanAmount: number;
  interestRate: number;
  term: number;
}

export interface EMIDetails {
  month: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

export interface CurrencyOptions {
  value: string;
  label: string;
}

export interface EMIResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  amortizationSchedule: EMIDetails[];
}