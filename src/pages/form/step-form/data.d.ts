export interface StepDataType {
  payAccount: string;
  receiverAccount: string;
  receiverName: string;
  amount: string;
  receiverMode: string;
}

export type CurrentTypes = 'base' | 'confirm' | 'result';
