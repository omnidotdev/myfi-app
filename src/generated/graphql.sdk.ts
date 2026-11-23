// @ts-nocheck
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { GraphQLClient, type RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** An input for mutations affecting `Account` */
export type AccountInput = {
  bookId: string;
  code?: string | null | undefined;
  createdAt?: Date | null | undefined;
  isActive?: boolean | null | undefined;
  isPlaceholder?: boolean | null | undefined;
  name: string;
  parentId?: string | null | undefined;
  rowId?: string | null | undefined;
  subType?: AccountSubType | null | undefined;
  type: AccountType;
  updatedAt?: Date | null | undefined;
};

/** An input for mutations affecting `AccountMapping` */
export type AccountMappingInput = {
  bookId: string;
  createdAt?: Date | null | undefined;
  creditAccountId: string;
  debitAccountId: string;
  eventType: string;
  rowId?: string | null | undefined;
  updatedAt?: Date | null | undefined;
};

/** Represents an update to a `Account`. Fields that are set will be updated. */
export type AccountPatch = {
  bookId?: string | null | undefined;
  code?: string | null | undefined;
  createdAt?: Date | null | undefined;
  isActive?: boolean | null | undefined;
  isPlaceholder?: boolean | null | undefined;
  name?: string | null | undefined;
  parentId?: string | null | undefined;
  rowId?: string | null | undefined;
  subType?: AccountSubType | null | undefined;
  type?: AccountType | null | undefined;
  updatedAt?: Date | null | undefined;
};

export enum AccountSubType {
  AccountsPayable = 'accounts_payable',
  AccountsReceivable = 'accounts_receivable',
  Bank = 'bank',
  Cash = 'cash',
  CostOfGoods = 'cost_of_goods',
  CreditCard = 'credit_card',
  CryptoGains = 'crypto_gains',
  CryptoLosses = 'crypto_losses',
  CryptoWallet = 'crypto_wallet',
  CustomerCredit = 'customer_credit',
  FixedAsset = 'fixed_asset',
  FxGainLoss = 'fx_gain_loss',
  InterestIncome = 'interest_income',
  Inventory = 'inventory',
  Investment = 'investment',
  Loan = 'loan',
  Mortgage = 'mortgage',
  OperatingExpense = 'operating_expense',
  OtherAsset = 'other_asset',
  OtherEquity = 'other_equity',
  OtherExpense = 'other_expense',
  OtherLiability = 'other_liability',
  OtherRevenue = 'other_revenue',
  OwnersEquity = 'owners_equity',
  Payroll = 'payroll',
  RetainedEarnings = 'retained_earnings',
  Sales = 'sales',
  ServiceRevenue = 'service_revenue',
  TaxExpense = 'tax_expense',
  UndepositedFunds = 'undeposited_funds'
}

export enum AccountType {
  Asset = 'asset',
  Equity = 'equity',
  Expense = 'expense',
  Liability = 'liability',
  Revenue = 'revenue'
}

/** An input for mutations affecting `Book` */
export type BookInput = {
  address?: string | null | undefined;
  city?: string | null | undefined;
  createdAt?: Date | null | undefined;
  currency?: string | null | undefined;
  ein?: string | null | undefined;
  fiscalYearStartMonth?: number | null | undefined;
  invoiceSource?: string | null | undefined;
  legalName?: string | null | undefined;
  name: string;
  organizationId: string;
  phone?: string | null | undefined;
  rowId?: string | null | undefined;
  state?: string | null | undefined;
  type: string;
  updatedAt?: Date | null | undefined;
  zip?: string | null | undefined;
};

/** Represents an update to a `Book`. Fields that are set will be updated. */
export type BookPatch = {
  address?: string | null | undefined;
  city?: string | null | undefined;
  createdAt?: Date | null | undefined;
  currency?: string | null | undefined;
  ein?: string | null | undefined;
  fiscalYearStartMonth?: number | null | undefined;
  invoiceSource?: string | null | undefined;
  legalName?: string | null | undefined;
  name?: string | null | undefined;
  organizationId?: string | null | undefined;
  phone?: string | null | undefined;
  rowId?: string | null | undefined;
  state?: string | null | undefined;
  type?: string | null | undefined;
  updatedAt?: Date | null | undefined;
  zip?: string | null | undefined;
};

/** An input for mutations affecting `Budget` */
export type BudgetInput = {
  accountId: string;
  amount: string;
  bookId: string;
  createdAt?: Date | null | undefined;
  period?: BudgetPeriod | null | undefined;
  rollover?: boolean | null | undefined;
  rowId?: string | null | undefined;
  updatedAt?: Date | null | undefined;
};

/** Represents an update to a `Budget`. Fields that are set will be updated. */
export type BudgetPatch = {
  accountId?: string | null | undefined;
  amount?: string | null | undefined;
  bookId?: string | null | undefined;
  createdAt?: Date | null | undefined;
  period?: BudgetPeriod | null | undefined;
  rollover?: boolean | null | undefined;
  rowId?: string | null | undefined;
  updatedAt?: Date | null | undefined;
};

export enum BudgetPeriod {
  Monthly = 'monthly',
  Quarterly = 'quarterly',
  Yearly = 'yearly'
}

/** All input for the create `Account` mutation. */
export type CreateAccountInput = {
  /** The `Account` to be created by this mutation. */
  account: AccountInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: string | null | undefined;
};

/** All input for the create `AccountMapping` mutation. */
export type CreateAccountMappingInput = {
  /** The `AccountMapping` to be created by this mutation. */
  accountMapping: AccountMappingInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: string | null | undefined;
};

/** All input for the create `Book` mutation. */
export type CreateBookInput = {
  /** The `Book` to be created by this mutation. */
  book: BookInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: string | null | undefined;
};

/** All input for the create `Budget` mutation. */
export type CreateBudgetInput = {
  /** The `Budget` to be created by this mutation. */
  budget: BudgetInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: string | null | undefined;
};

/** All input for the create `JournalEntry` mutation. */
export type CreateJournalEntryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: string | null | undefined;
  /** The `JournalEntry` to be created by this mutation. */
  journalEntry: JournalEntryInput;
};

/** All input for the create `JournalLine` mutation. */
export type CreateJournalLineInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: string | null | undefined;
  /** The `JournalLine` to be created by this mutation. */
  journalLine: JournalLineInput;
};

/** All input for the create `SavingsGoal` mutation. */
export type CreateSavingsGoalInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: string | null | undefined;
  /** The `SavingsGoal` to be created by this mutation. */
  savingsGoal: SavingsGoalInput;
};

/** All input for the `deleteAccount` mutation. */
export type DeleteAccountInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: string | null | undefined;
  rowId: string;
};

/** All input for the `deleteBook` mutation. */
export type DeleteBookInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: string | null | undefined;
  rowId: string;
};

/** All input for the `deleteBudget` mutation. */
export type DeleteBudgetInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: string | null | undefined;
  rowId: string;
};

/** All input for the `deleteJournalEntry` mutation. */
export type DeleteJournalEntryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: string | null | undefined;
  rowId: string;
};

/** All input for the `deleteSavingsGoal` mutation. */
export type DeleteSavingsGoalInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: string | null | undefined;
  rowId: string;
};

/** An input for mutations affecting `JournalEntry` */
export type JournalEntryInput = {
  bookId: string;
  createdAt?: Date | null | undefined;
  date: Date;
  isReconciled?: boolean | null | undefined;
  isReviewed?: boolean | null | undefined;
  memo?: string | null | undefined;
  rowId?: string | null | undefined;
  source?: string | null | undefined;
  sourceReferenceId?: string | null | undefined;
  updatedAt?: Date | null | undefined;
  vendorId?: string | null | undefined;
};

/** An input for mutations affecting `JournalLine` */
export type JournalLineInput = {
  accountId: string;
  cleared?: boolean | null | undefined;
  credit?: string | null | undefined;
  debit?: string | null | undefined;
  journalEntryId: string;
  memo?: string | null | undefined;
  rowId?: string | null | undefined;
  taxJurisdictionId?: string | null | undefined;
};

/** Represents an update to a `ReconciliationQueue`. Fields that are set will be updated. */
export type ReconciliationQueuePatch = {
  bookId?: string | null | undefined;
  categorizationSource?: string | null | undefined;
  confidence?: string | null | undefined;
  createdAt?: Date | null | undefined;
  journalEntryId?: string | null | undefined;
  periodMonth?: number | null | undefined;
  periodYear?: number | null | undefined;
  priority?: number | null | undefined;
  reviewedAt?: Date | null | undefined;
  reviewedBy?: string | null | undefined;
  rowId?: string | null | undefined;
  status?: string | null | undefined;
  suggestedCreditAccountId?: string | null | undefined;
  suggestedDebitAccountId?: string | null | undefined;
};

/** An input for mutations affecting `SavingsGoal` */
export type SavingsGoalInput = {
  accountId: string;
  bookId: string;
  createdAt?: Date | null | undefined;
  name: string;
  rowId?: string | null | undefined;
  targetAmount: string;
  targetDate?: Date | null | undefined;
  updatedAt?: Date | null | undefined;
};

/** All input for the `updateAccount` mutation. */
export type UpdateAccountInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: string | null | undefined;
  /** An object where the defined keys will be set on the `Account` being updated. */
  patch: AccountPatch;
  rowId: string;
};

/** All input for the `updateBook` mutation. */
export type UpdateBookInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: string | null | undefined;
  /** An object where the defined keys will be set on the `Book` being updated. */
  patch: BookPatch;
  rowId: string;
};

/** All input for the `updateBudget` mutation. */
export type UpdateBudgetInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: string | null | undefined;
  /** An object where the defined keys will be set on the `Budget` being updated. */
  patch: BudgetPatch;
  rowId: string;
};

/** All input for the `updateReconciliationQueue` mutation. */
export type UpdateReconciliationQueueInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: string | null | undefined;
  /** An object where the defined keys will be set on the `ReconciliationQueue` being updated. */
  patch: ReconciliationQueuePatch;
  rowId: string;
};

export type AccountMappingsQueryVariables = Exact<{
  bookId: string;
}>;


export type AccountMappingsQuery = { accountMappings: { nodes: Array<{ rowId: string, bookId: string, eventType: string, debitAccountId: string, creditAccountId: string, debitAccount: { rowId: string, name: string, code: string | null } | null, creditAccount: { rowId: string, name: string, code: string | null } | null } | null> } | null };

export type UpsertAccountMappingMutationVariables = Exact<{
  input: CreateAccountMappingInput;
}>;


export type UpsertAccountMappingMutation = { createAccountMapping: { accountMapping: { rowId: string, eventType: string } | null } | null };

export type AllAccountsQueryVariables = Exact<{
  bookId: string;
}>;


export type AllAccountsQuery = { accounts: { nodes: Array<{ rowId: string, bookId: string, parentId: string | null, name: string, code: string | null, type: AccountType, subType: AccountSubType | null, isPlaceholder: boolean, isActive: boolean, createdAt: string | null, updatedAt: string | null, parent: { rowId: string, name: string, code: string | null } | null, children: { nodes: Array<{ rowId: string, name: string, code: string | null, type: AccountType } | null> } } | null> } | null };

export type CreateAccountMutationVariables = Exact<{
  input: CreateAccountInput;
}>;


export type CreateAccountMutation = { createAccount: { account: { rowId: string, name: string, code: string | null, type: AccountType } | null } | null };

export type UpdateAccountMutationVariables = Exact<{
  input: UpdateAccountInput;
}>;


export type UpdateAccountMutation = { updateAccount: { account: { rowId: string, name: string, code: string | null, type: AccountType } | null } | null };

export type DeleteAccountMutationVariables = Exact<{
  input: DeleteAccountInput;
}>;


export type DeleteAccountMutation = { deleteAccount: { deletedAccountNodeId: string | null } | null };

export type AllBooksQueryVariables = Exact<{
  organizationId: string;
}>;


export type AllBooksQuery = { books: { nodes: Array<{ rowId: string, organizationId: string, name: string, type: string, currency: string, fiscalYearStartMonth: number, createdAt: string | null, updatedAt: string | null } | null> } | null };

export type CreateBookMutationVariables = Exact<{
  input: CreateBookInput;
}>;


export type CreateBookMutation = { createBook: { book: { rowId: string, name: string, type: string } | null } | null };

export type UpdateBookMutationVariables = Exact<{
  input: UpdateBookInput;
}>;


export type UpdateBookMutation = { updateBook: { book: { rowId: string, name: string, type: string } | null } | null };

export type DeleteBookMutationVariables = Exact<{
  input: DeleteBookInput;
}>;


export type DeleteBookMutation = { deleteBook: { deletedBookNodeId: string | null } | null };

export type AllBudgetsQueryVariables = Exact<{
  bookId: string;
}>;


export type AllBudgetsQuery = { budgets: { nodes: Array<{ rowId: string, bookId: string, accountId: string, amount: string, period: BudgetPeriod, rollover: boolean, createdAt: string | null, updatedAt: string | null, account: { rowId: string, name: string, code: string | null } | null } | null> } | null };

export type CreateBudgetMutationVariables = Exact<{
  input: CreateBudgetInput;
}>;


export type CreateBudgetMutation = { createBudget: { budget: { rowId: string } | null } | null };

export type UpdateBudgetMutationVariables = Exact<{
  input: UpdateBudgetInput;
}>;


export type UpdateBudgetMutation = { updateBudget: { budget: { rowId: string } | null } | null };

export type DeleteBudgetMutationVariables = Exact<{
  input: DeleteBudgetInput;
}>;


export type DeleteBudgetMutation = { deleteBudget: { deletedBudgetNodeId: string | null } | null };

export type AllJournalEntriesQueryVariables = Exact<{
  bookId: string;
  first?: number | null | undefined;
  after?: string | null | undefined;
}>;


export type AllJournalEntriesQuery = { journalEntries: { totalCount: number, nodes: Array<{ rowId: string, bookId: string, date: string, memo: string | null, source: string, sourceReferenceId: string | null, isReviewed: boolean, isReconciled: boolean, createdAt: string | null, updatedAt: string | null, journalLines: { nodes: Array<{ rowId: string, accountId: string, debit: string, credit: string, memo: string | null, account: { rowId: string, name: string, code: string | null, type: AccountType } | null } | null> } } | null>, pageInfo: { hasNextPage: boolean, endCursor: string | null } } | null };

export type CreateJournalEntryMutationVariables = Exact<{
  input: CreateJournalEntryInput;
}>;


export type CreateJournalEntryMutation = { createJournalEntry: { journalEntry: { rowId: string, date: string, memo: string | null } | null } | null };

export type CreateJournalLineMutationVariables = Exact<{
  input: CreateJournalLineInput;
}>;


export type CreateJournalLineMutation = { createJournalLine: { journalLine: { rowId: string, accountId: string, debit: string, credit: string } | null } | null };

export type DeleteJournalEntryMutationVariables = Exact<{
  input: DeleteJournalEntryInput;
}>;


export type DeleteJournalEntryMutation = { deleteJournalEntry: { deletedJournalEntryNodeId: string | null } | null };

export type PendingReconciliationQueryVariables = Exact<{
  bookId: string;
  status?: string | null | undefined;
}>;


export type PendingReconciliationQuery = { reconciliationQueues: { totalCount: number, nodes: Array<{ rowId: string, bookId: string, journalEntryId: string, suggestedDebitAccountId: string | null, suggestedCreditAccountId: string | null, status: string, reviewedAt: string | null, reviewedBy: string | null, createdAt: string | null, source: string | null, journalEntry: { rowId: string, date: string, memo: string | null, source: string, isReviewed: boolean } | null } | null> } | null };

export type ApproveReconciliationMutationVariables = Exact<{
  input: UpdateReconciliationQueueInput;
}>;


export type ApproveReconciliationMutation = { updateReconciliationQueue: { reconciliationQueue: { rowId: string, status: string, reviewedAt: string | null } | null } | null };

export type RejectReconciliationMutationVariables = Exact<{
  input: UpdateReconciliationQueueInput;
}>;


export type RejectReconciliationMutation = { updateReconciliationQueue: { reconciliationQueue: { rowId: string, status: string } | null } | null };

export type AllSavingsGoalsQueryVariables = Exact<{
  bookId: string;
}>;


export type AllSavingsGoalsQuery = { savingsGoals: { nodes: Array<{ rowId: string, bookId: string, accountId: string, name: string, targetAmount: string, targetDate: string | null, createdAt: string | null, updatedAt: string | null, account: { rowId: string, name: string, code: string | null } | null } | null> } | null };

export type CreateSavingsGoalMutationVariables = Exact<{
  input: CreateSavingsGoalInput;
}>;


export type CreateSavingsGoalMutation = { createSavingsGoal: { savingsGoal: { rowId: string } | null } | null };

export type DeleteSavingsGoalMutationVariables = Exact<{
  input: DeleteSavingsGoalInput;
}>;


export type DeleteSavingsGoalMutation = { deleteSavingsGoal: { deletedSavingsGoalNodeId: string | null } | null };


export const AccountMappingsDocument = gql`
    query AccountMappings($bookId: UUID!) {
  accountMappings(condition: {bookId: $bookId}) {
    nodes {
      rowId
      bookId
      eventType
      debitAccountId
      creditAccountId
      debitAccount {
        rowId
        name
        code
      }
      creditAccount {
        rowId
        name
        code
      }
    }
  }
}
    `;
export const UpsertAccountMappingDocument = gql`
    mutation UpsertAccountMapping($input: CreateAccountMappingInput!) {
  createAccountMapping(input: $input) {
    accountMapping {
      rowId
      eventType
    }
  }
}
    `;
export const AllAccountsDocument = gql`
    query AllAccounts($bookId: UUID!) {
  accounts(condition: {bookId: $bookId}) {
    nodes {
      rowId
      bookId
      parentId
      name
      code
      type
      subType
      isPlaceholder
      isActive
      createdAt
      updatedAt
      parent {
        rowId
        name
        code
      }
      children: childAccounts {
        nodes {
          rowId
          name
          code
          type
        }
      }
    }
  }
}
    `;
export const CreateAccountDocument = gql`
    mutation CreateAccount($input: CreateAccountInput!) {
  createAccount(input: $input) {
    account {
      rowId
      name
      code
      type
    }
  }
}
    `;
export const UpdateAccountDocument = gql`
    mutation UpdateAccount($input: UpdateAccountInput!) {
  updateAccount(input: $input) {
    account {
      rowId
      name
      code
      type
    }
  }
}
    `;
export const DeleteAccountDocument = gql`
    mutation DeleteAccount($input: DeleteAccountInput!) {
  deleteAccount(input: $input) {
    deletedAccountNodeId: deletedAccountId
  }
}
    `;
export const AllBooksDocument = gql`
    query AllBooks($organizationId: String!) {
  books(condition: {organizationId: $organizationId}) {
    nodes {
      rowId
      organizationId
      name
      type
      currency
      fiscalYearStartMonth
      createdAt
      updatedAt
    }
  }
}
    `;
export const CreateBookDocument = gql`
    mutation CreateBook($input: CreateBookInput!) {
  createBook(input: $input) {
    book {
      rowId
      name
      type
    }
  }
}
    `;
export const UpdateBookDocument = gql`
    mutation UpdateBook($input: UpdateBookInput!) {
  updateBook(input: $input) {
    book {
      rowId
      name
      type
    }
  }
}
    `;
export const DeleteBookDocument = gql`
    mutation DeleteBook($input: DeleteBookInput!) {
  deleteBook(input: $input) {
    deletedBookNodeId: deletedBookId
  }
}
    `;
export const AllBudgetsDocument = gql`
    query AllBudgets($bookId: UUID!) {
  budgets(condition: {bookId: $bookId}) {
    nodes {
      rowId
      bookId
      accountId
      amount
      period
      rollover
      createdAt
      updatedAt
      account {
        rowId
        name
        code
      }
    }
  }
}
    `;
export const CreateBudgetDocument = gql`
    mutation CreateBudget($input: CreateBudgetInput!) {
  createBudget(input: $input) {
    budget {
      rowId
    }
  }
}
    `;
export const UpdateBudgetDocument = gql`
    mutation UpdateBudget($input: UpdateBudgetInput!) {
  updateBudget(input: $input) {
    budget {
      rowId
    }
  }
}
    `;
export const DeleteBudgetDocument = gql`
    mutation DeleteBudget($input: DeleteBudgetInput!) {
  deleteBudget(input: $input) {
    deletedBudgetNodeId: deletedBudgetId
  }
}
    `;
export const AllJournalEntriesDocument = gql`
    query AllJournalEntries($bookId: UUID!, $first: Int, $after: Cursor) {
  journalEntries(
    condition: {bookId: $bookId}
    orderBy: DATE_DESC
    first: $first
    after: $after
  ) {
    nodes {
      rowId
      bookId
      date
      memo
      source
      sourceReferenceId
      isReviewed
      isReconciled
      createdAt
      updatedAt
      journalLines {
        nodes {
          rowId
          accountId
          debit
          credit
          memo
          account {
            rowId
            name
            code
            type
          }
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
    totalCount
  }
}
    `;
export const CreateJournalEntryDocument = gql`
    mutation CreateJournalEntry($input: CreateJournalEntryInput!) {
  createJournalEntry(input: $input) {
    journalEntry {
      rowId
      date
      memo
    }
  }
}
    `;
export const CreateJournalLineDocument = gql`
    mutation CreateJournalLine($input: CreateJournalLineInput!) {
  createJournalLine(input: $input) {
    journalLine {
      rowId
      accountId
      debit
      credit
    }
  }
}
    `;
export const DeleteJournalEntryDocument = gql`
    mutation DeleteJournalEntry($input: DeleteJournalEntryInput!) {
  deleteJournalEntry(input: $input) {
    deletedJournalEntryNodeId: deletedJournalEntryId
  }
}
    `;
export const PendingReconciliationDocument = gql`
    query PendingReconciliation($bookId: UUID!, $status: String) {
  reconciliationQueues(condition: {bookId: $bookId, status: $status}) {
    nodes {
      rowId
      bookId
      journalEntryId
      source: categorizationSource
      suggestedDebitAccountId
      suggestedCreditAccountId
      status
      reviewedAt
      reviewedBy
      createdAt
      journalEntry {
        rowId
        date
        memo
        source
        isReviewed
      }
    }
    totalCount
  }
}
    `;
export const ApproveReconciliationDocument = gql`
    mutation ApproveReconciliation($input: UpdateReconciliationQueueInput!) {
  updateReconciliationQueue(input: $input) {
    reconciliationQueue {
      rowId
      status
      reviewedAt
    }
  }
}
    `;
export const RejectReconciliationDocument = gql`
    mutation RejectReconciliation($input: UpdateReconciliationQueueInput!) {
  updateReconciliationQueue(input: $input) {
    reconciliationQueue {
      rowId
      status
    }
  }
}
    `;
export const AllSavingsGoalsDocument = gql`
    query AllSavingsGoals($bookId: UUID!) {
  savingsGoals(condition: {bookId: $bookId}) {
    nodes {
      rowId
      bookId
      accountId
      name
      targetAmount
      targetDate
      createdAt
      updatedAt
      account {
        rowId
        name
        code
      }
    }
  }
}
    `;
export const CreateSavingsGoalDocument = gql`
    mutation CreateSavingsGoal($input: CreateSavingsGoalInput!) {
  createSavingsGoal(input: $input) {
    savingsGoal {
      rowId
    }
  }
}
    `;
export const DeleteSavingsGoalDocument = gql`
    mutation DeleteSavingsGoal($input: DeleteSavingsGoalInput!) {
  deleteSavingsGoal(input: $input) {
    deletedSavingsGoalNodeId: deletedSavingsGoalId
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    AccountMappings(variables: AccountMappingsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<AccountMappingsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AccountMappingsQuery>({ document: AccountMappingsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'AccountMappings', 'query', variables);
    },
    UpsertAccountMapping(variables: UpsertAccountMappingMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<UpsertAccountMappingMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpsertAccountMappingMutation>({ document: UpsertAccountMappingDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UpsertAccountMapping', 'mutation', variables);
    },
    AllAccounts(variables: AllAccountsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<AllAccountsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllAccountsQuery>({ document: AllAccountsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'AllAccounts', 'query', variables);
    },
    CreateAccount(variables: CreateAccountMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<CreateAccountMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateAccountMutation>({ document: CreateAccountDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CreateAccount', 'mutation', variables);
    },
    UpdateAccount(variables: UpdateAccountMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<UpdateAccountMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateAccountMutation>({ document: UpdateAccountDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UpdateAccount', 'mutation', variables);
    },
    DeleteAccount(variables: DeleteAccountMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<DeleteAccountMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteAccountMutation>({ document: DeleteAccountDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'DeleteAccount', 'mutation', variables);
    },
    AllBooks(variables: AllBooksQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<AllBooksQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllBooksQuery>({ document: AllBooksDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'AllBooks', 'query', variables);
    },
    CreateBook(variables: CreateBookMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<CreateBookMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateBookMutation>({ document: CreateBookDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CreateBook', 'mutation', variables);
    },
    UpdateBook(variables: UpdateBookMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<UpdateBookMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateBookMutation>({ document: UpdateBookDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UpdateBook', 'mutation', variables);
    },
    DeleteBook(variables: DeleteBookMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<DeleteBookMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteBookMutation>({ document: DeleteBookDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'DeleteBook', 'mutation', variables);
    },
    AllBudgets(variables: AllBudgetsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<AllBudgetsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllBudgetsQuery>({ document: AllBudgetsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'AllBudgets', 'query', variables);
    },
    CreateBudget(variables: CreateBudgetMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<CreateBudgetMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateBudgetMutation>({ document: CreateBudgetDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CreateBudget', 'mutation', variables);
    },
    UpdateBudget(variables: UpdateBudgetMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<UpdateBudgetMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateBudgetMutation>({ document: UpdateBudgetDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UpdateBudget', 'mutation', variables);
    },
    DeleteBudget(variables: DeleteBudgetMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<DeleteBudgetMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteBudgetMutation>({ document: DeleteBudgetDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'DeleteBudget', 'mutation', variables);
    },
    AllJournalEntries(variables: AllJournalEntriesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<AllJournalEntriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllJournalEntriesQuery>({ document: AllJournalEntriesDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'AllJournalEntries', 'query', variables);
    },
    CreateJournalEntry(variables: CreateJournalEntryMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<CreateJournalEntryMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateJournalEntryMutation>({ document: CreateJournalEntryDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CreateJournalEntry', 'mutation', variables);
    },
    CreateJournalLine(variables: CreateJournalLineMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<CreateJournalLineMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateJournalLineMutation>({ document: CreateJournalLineDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CreateJournalLine', 'mutation', variables);
    },
    DeleteJournalEntry(variables: DeleteJournalEntryMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<DeleteJournalEntryMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteJournalEntryMutation>({ document: DeleteJournalEntryDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'DeleteJournalEntry', 'mutation', variables);
    },
    PendingReconciliation(variables: PendingReconciliationQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<PendingReconciliationQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PendingReconciliationQuery>({ document: PendingReconciliationDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'PendingReconciliation', 'query', variables);
    },
    ApproveReconciliation(variables: ApproveReconciliationMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<ApproveReconciliationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ApproveReconciliationMutation>({ document: ApproveReconciliationDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'ApproveReconciliation', 'mutation', variables);
    },
    RejectReconciliation(variables: RejectReconciliationMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<RejectReconciliationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RejectReconciliationMutation>({ document: RejectReconciliationDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'RejectReconciliation', 'mutation', variables);
    },
    AllSavingsGoals(variables: AllSavingsGoalsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<AllSavingsGoalsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllSavingsGoalsQuery>({ document: AllSavingsGoalsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'AllSavingsGoals', 'query', variables);
    },
    CreateSavingsGoal(variables: CreateSavingsGoalMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<CreateSavingsGoalMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateSavingsGoalMutation>({ document: CreateSavingsGoalDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CreateSavingsGoal', 'mutation', variables);
    },
    DeleteSavingsGoal(variables: DeleteSavingsGoalMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<DeleteSavingsGoalMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteSavingsGoalMutation>({ document: DeleteSavingsGoalDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'DeleteSavingsGoal', 'mutation', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;