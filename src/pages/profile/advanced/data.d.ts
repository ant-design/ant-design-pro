export interface AdvancedOperation1 {
  key: string;
  type: string;
  name: string;
  status: string;
  updatedAt: string;
  memo: string;
}

export interface AdvancedOperation2 {
  key: string;
  type: string;
  name: string;
  status: string;
  updatedAt: string;
  memo: string;
}

export interface AdvancedOperation3 {
  key: string;
  type: string;
  name: string;
  status: string;
  updatedAt: string;
  memo: string;
}

export interface AdvancedProfileData {
  advancedOperation1: AdvancedOperation1[];
  advancedOperation2: AdvancedOperation2[];
  advancedOperation3: AdvancedOperation3[];
}
