export const ACCOUNT_TYPES = [
  "asset",
  "liability",
  "equity",
  "revenue",
  "expense",
] as const;
export type AccountType = (typeof ACCOUNT_TYPES)[number];

export const ACCOUNT_SUB_TYPES = [
  "checking",
  "savings",
  "cash",
  "accounts_receivable",
  "inventory",
  "fixed_asset",
  "other_asset",
  "crypto_wallet",
  "investment",
  "credit_card",
  "accounts_payable",
  "loan",
  "other_liability",
  "owners_equity",
  "retained_earnings",
  "member_contributions",
  "member_distributions",
  "sales_revenue",
  "service_revenue",
  "interest_income",
  "other_income",
  "cost_of_goods_sold",
  "operating_expense",
  "payroll_expense",
  "tax_expense",
  "depreciation",
  "other_expense",
] as const;
export type AccountSubType = (typeof ACCOUNT_SUB_TYPES)[number];

/** Map each account type to its valid sub-types */
export const SUB_TYPES_BY_TYPE: Record<AccountType, AccountSubType[]> = {
  asset: [
    "checking",
    "savings",
    "cash",
    "accounts_receivable",
    "inventory",
    "fixed_asset",
    "other_asset",
    "crypto_wallet",
    "investment",
  ],
  liability: [
    "credit_card",
    "accounts_payable",
    "loan",
    "other_liability",
  ],
  equity: [
    "owners_equity",
    "retained_earnings",
    "member_contributions",
    "member_distributions",
  ],
  revenue: [
    "sales_revenue",
    "service_revenue",
    "interest_income",
    "other_income",
  ],
  expense: [
    "cost_of_goods_sold",
    "operating_expense",
    "payroll_expense",
    "tax_expense",
    "depreciation",
    "other_expense",
  ],
};

export type Account = {
  rowId: string;
  bookId: string;
  parentId: string | null;
  name: string;
  code: string;
  type: AccountType;
  subType: AccountSubType | null;
  isPlaceholder: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  parent?: { rowId: string; name: string; code: string } | null;
  children?: Account[];
};

export default Account;
