export interface QboAccountMapping {
  qboAccountId: string;
  qboAccountName: string;
  qboAccountType: string;
  myfiAccountId: string | null;
}

export interface MyfiAccountOption {
  id: string;
  name: string;
  code: string | null;
  type: string;
}

export interface AccountMapResponse {
  accounts: QboAccountMapping[];
  myfiAccounts: MyfiAccountOption[];
}
