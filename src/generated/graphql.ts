// @ts-nocheck
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
import { useQuery, useSuspenseQuery, useInfiniteQuery, useSuspenseInfiniteQuery, useMutation, UseQueryOptions, UseSuspenseQueryOptions, UseInfiniteQueryOptions, InfiniteData, UseSuspenseInfiniteQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { graphqlFetch } from '@/lib/graphql/graphqlFetch';
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


export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const AccountMappingsDocument = new TypedDocumentString(`
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
    `);

export const useAccountMappingsQuery = <
      TData = AccountMappingsQuery,
      TError = unknown
    >(
      variables: AccountMappingsQueryVariables,
      options?: Omit<UseQueryOptions<AccountMappingsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<AccountMappingsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<AccountMappingsQuery, TError, TData>(
      {
    queryKey: ['AccountMappings', variables],
    queryFn: graphqlFetch<AccountMappingsQuery, AccountMappingsQueryVariables>(AccountMappingsDocument, variables),
    ...options
  }
    )};

useAccountMappingsQuery.getKey = (variables: AccountMappingsQueryVariables) => ['AccountMappings', variables];

export const useSuspenseAccountMappingsQuery = <
      TData = AccountMappingsQuery,
      TError = unknown
    >(
      variables: AccountMappingsQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<AccountMappingsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<AccountMappingsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<AccountMappingsQuery, TError, TData>(
      {
    queryKey: ['AccountMappings', variables],
    queryFn: graphqlFetch<AccountMappingsQuery, AccountMappingsQueryVariables>(AccountMappingsDocument, variables),
    ...options
  }
    )};

useSuspenseAccountMappingsQuery.getKey = (variables: AccountMappingsQueryVariables) => ['AccountMappings', variables];

export const useInfiniteAccountMappingsQuery = <
      TData = InfiniteData<AccountMappingsQuery>,
      TError = unknown
    >(
      variables: AccountMappingsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<AccountMappingsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<AccountMappingsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<AccountMappingsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['AccountMappings.infinite', variables],
      queryFn: (metaData) => graphqlFetch<AccountMappingsQuery, AccountMappingsQueryVariables>(AccountMappingsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteAccountMappingsQuery.getKey = (variables: AccountMappingsQueryVariables) => ['AccountMappings.infinite', variables];

export const useSuspenseInfiniteAccountMappingsQuery = <
      TData = InfiniteData<AccountMappingsQuery>,
      TError = unknown
    >(
      variables: AccountMappingsQueryVariables,
      options: Omit<UseSuspenseInfiniteQueryOptions<AccountMappingsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseInfiniteQueryOptions<AccountMappingsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseInfiniteQuery<AccountMappingsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['AccountMappings.infinite', variables],
      queryFn: (metaData) => graphqlFetch<AccountMappingsQuery, AccountMappingsQueryVariables>(AccountMappingsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useSuspenseInfiniteAccountMappingsQuery.getKey = (variables: AccountMappingsQueryVariables) => ['AccountMappings.infinite', variables];


useAccountMappingsQuery.fetcher = (variables: AccountMappingsQueryVariables, options?: RequestInit['headers']) => graphqlFetch<AccountMappingsQuery, AccountMappingsQueryVariables>(AccountMappingsDocument, variables, options);

export const UpsertAccountMappingDocument = new TypedDocumentString(`
    mutation UpsertAccountMapping($input: CreateAccountMappingInput!) {
  createAccountMapping(input: $input) {
    accountMapping {
      rowId
      eventType
    }
  }
}
    `);

export const useUpsertAccountMappingMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpsertAccountMappingMutation, TError, UpsertAccountMappingMutationVariables, TContext>) => {
    
    return useMutation<UpsertAccountMappingMutation, TError, UpsertAccountMappingMutationVariables, TContext>(
      {
    mutationKey: ['UpsertAccountMapping'],
    mutationFn: (variables?: UpsertAccountMappingMutationVariables) => graphqlFetch<UpsertAccountMappingMutation, UpsertAccountMappingMutationVariables>(UpsertAccountMappingDocument, variables)(),
    ...options
  }
    )};

useUpsertAccountMappingMutation.getKey = () => ['UpsertAccountMapping'];


useUpsertAccountMappingMutation.fetcher = (variables: UpsertAccountMappingMutationVariables, options?: RequestInit['headers']) => graphqlFetch<UpsertAccountMappingMutation, UpsertAccountMappingMutationVariables>(UpsertAccountMappingDocument, variables, options);

export const AllAccountsDocument = new TypedDocumentString(`
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
    `);

export const useAllAccountsQuery = <
      TData = AllAccountsQuery,
      TError = unknown
    >(
      variables: AllAccountsQueryVariables,
      options?: Omit<UseQueryOptions<AllAccountsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<AllAccountsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<AllAccountsQuery, TError, TData>(
      {
    queryKey: ['AllAccounts', variables],
    queryFn: graphqlFetch<AllAccountsQuery, AllAccountsQueryVariables>(AllAccountsDocument, variables),
    ...options
  }
    )};

useAllAccountsQuery.getKey = (variables: AllAccountsQueryVariables) => ['AllAccounts', variables];

export const useSuspenseAllAccountsQuery = <
      TData = AllAccountsQuery,
      TError = unknown
    >(
      variables: AllAccountsQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<AllAccountsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<AllAccountsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<AllAccountsQuery, TError, TData>(
      {
    queryKey: ['AllAccounts', variables],
    queryFn: graphqlFetch<AllAccountsQuery, AllAccountsQueryVariables>(AllAccountsDocument, variables),
    ...options
  }
    )};

useSuspenseAllAccountsQuery.getKey = (variables: AllAccountsQueryVariables) => ['AllAccounts', variables];

export const useInfiniteAllAccountsQuery = <
      TData = InfiniteData<AllAccountsQuery>,
      TError = unknown
    >(
      variables: AllAccountsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<AllAccountsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<AllAccountsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<AllAccountsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['AllAccounts.infinite', variables],
      queryFn: (metaData) => graphqlFetch<AllAccountsQuery, AllAccountsQueryVariables>(AllAccountsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteAllAccountsQuery.getKey = (variables: AllAccountsQueryVariables) => ['AllAccounts.infinite', variables];

export const useSuspenseInfiniteAllAccountsQuery = <
      TData = InfiniteData<AllAccountsQuery>,
      TError = unknown
    >(
      variables: AllAccountsQueryVariables,
      options: Omit<UseSuspenseInfiniteQueryOptions<AllAccountsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseInfiniteQueryOptions<AllAccountsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseInfiniteQuery<AllAccountsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['AllAccounts.infinite', variables],
      queryFn: (metaData) => graphqlFetch<AllAccountsQuery, AllAccountsQueryVariables>(AllAccountsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useSuspenseInfiniteAllAccountsQuery.getKey = (variables: AllAccountsQueryVariables) => ['AllAccounts.infinite', variables];


useAllAccountsQuery.fetcher = (variables: AllAccountsQueryVariables, options?: RequestInit['headers']) => graphqlFetch<AllAccountsQuery, AllAccountsQueryVariables>(AllAccountsDocument, variables, options);

export const CreateAccountDocument = new TypedDocumentString(`
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
    `);

export const useCreateAccountMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateAccountMutation, TError, CreateAccountMutationVariables, TContext>) => {
    
    return useMutation<CreateAccountMutation, TError, CreateAccountMutationVariables, TContext>(
      {
    mutationKey: ['CreateAccount'],
    mutationFn: (variables?: CreateAccountMutationVariables) => graphqlFetch<CreateAccountMutation, CreateAccountMutationVariables>(CreateAccountDocument, variables)(),
    ...options
  }
    )};

useCreateAccountMutation.getKey = () => ['CreateAccount'];


useCreateAccountMutation.fetcher = (variables: CreateAccountMutationVariables, options?: RequestInit['headers']) => graphqlFetch<CreateAccountMutation, CreateAccountMutationVariables>(CreateAccountDocument, variables, options);

export const UpdateAccountDocument = new TypedDocumentString(`
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
    `);

export const useUpdateAccountMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateAccountMutation, TError, UpdateAccountMutationVariables, TContext>) => {
    
    return useMutation<UpdateAccountMutation, TError, UpdateAccountMutationVariables, TContext>(
      {
    mutationKey: ['UpdateAccount'],
    mutationFn: (variables?: UpdateAccountMutationVariables) => graphqlFetch<UpdateAccountMutation, UpdateAccountMutationVariables>(UpdateAccountDocument, variables)(),
    ...options
  }
    )};

useUpdateAccountMutation.getKey = () => ['UpdateAccount'];


useUpdateAccountMutation.fetcher = (variables: UpdateAccountMutationVariables, options?: RequestInit['headers']) => graphqlFetch<UpdateAccountMutation, UpdateAccountMutationVariables>(UpdateAccountDocument, variables, options);

export const DeleteAccountDocument = new TypedDocumentString(`
    mutation DeleteAccount($input: DeleteAccountInput!) {
  deleteAccount(input: $input) {
    deletedAccountNodeId: deletedAccountId
  }
}
    `);

export const useDeleteAccountMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteAccountMutation, TError, DeleteAccountMutationVariables, TContext>) => {
    
    return useMutation<DeleteAccountMutation, TError, DeleteAccountMutationVariables, TContext>(
      {
    mutationKey: ['DeleteAccount'],
    mutationFn: (variables?: DeleteAccountMutationVariables) => graphqlFetch<DeleteAccountMutation, DeleteAccountMutationVariables>(DeleteAccountDocument, variables)(),
    ...options
  }
    )};

useDeleteAccountMutation.getKey = () => ['DeleteAccount'];


useDeleteAccountMutation.fetcher = (variables: DeleteAccountMutationVariables, options?: RequestInit['headers']) => graphqlFetch<DeleteAccountMutation, DeleteAccountMutationVariables>(DeleteAccountDocument, variables, options);

export const AllBooksDocument = new TypedDocumentString(`
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
    `);

export const useAllBooksQuery = <
      TData = AllBooksQuery,
      TError = unknown
    >(
      variables: AllBooksQueryVariables,
      options?: Omit<UseQueryOptions<AllBooksQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<AllBooksQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<AllBooksQuery, TError, TData>(
      {
    queryKey: ['AllBooks', variables],
    queryFn: graphqlFetch<AllBooksQuery, AllBooksQueryVariables>(AllBooksDocument, variables),
    ...options
  }
    )};

useAllBooksQuery.getKey = (variables: AllBooksQueryVariables) => ['AllBooks', variables];

export const useSuspenseAllBooksQuery = <
      TData = AllBooksQuery,
      TError = unknown
    >(
      variables: AllBooksQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<AllBooksQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<AllBooksQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<AllBooksQuery, TError, TData>(
      {
    queryKey: ['AllBooks', variables],
    queryFn: graphqlFetch<AllBooksQuery, AllBooksQueryVariables>(AllBooksDocument, variables),
    ...options
  }
    )};

useSuspenseAllBooksQuery.getKey = (variables: AllBooksQueryVariables) => ['AllBooks', variables];

export const useInfiniteAllBooksQuery = <
      TData = InfiniteData<AllBooksQuery>,
      TError = unknown
    >(
      variables: AllBooksQueryVariables,
      options: Omit<UseInfiniteQueryOptions<AllBooksQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<AllBooksQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<AllBooksQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['AllBooks.infinite', variables],
      queryFn: (metaData) => graphqlFetch<AllBooksQuery, AllBooksQueryVariables>(AllBooksDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteAllBooksQuery.getKey = (variables: AllBooksQueryVariables) => ['AllBooks.infinite', variables];

export const useSuspenseInfiniteAllBooksQuery = <
      TData = InfiniteData<AllBooksQuery>,
      TError = unknown
    >(
      variables: AllBooksQueryVariables,
      options: Omit<UseSuspenseInfiniteQueryOptions<AllBooksQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseInfiniteQueryOptions<AllBooksQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseInfiniteQuery<AllBooksQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['AllBooks.infinite', variables],
      queryFn: (metaData) => graphqlFetch<AllBooksQuery, AllBooksQueryVariables>(AllBooksDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useSuspenseInfiniteAllBooksQuery.getKey = (variables: AllBooksQueryVariables) => ['AllBooks.infinite', variables];


useAllBooksQuery.fetcher = (variables: AllBooksQueryVariables, options?: RequestInit['headers']) => graphqlFetch<AllBooksQuery, AllBooksQueryVariables>(AllBooksDocument, variables, options);

export const CreateBookDocument = new TypedDocumentString(`
    mutation CreateBook($input: CreateBookInput!) {
  createBook(input: $input) {
    book {
      rowId
      name
      type
    }
  }
}
    `);

export const useCreateBookMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateBookMutation, TError, CreateBookMutationVariables, TContext>) => {
    
    return useMutation<CreateBookMutation, TError, CreateBookMutationVariables, TContext>(
      {
    mutationKey: ['CreateBook'],
    mutationFn: (variables?: CreateBookMutationVariables) => graphqlFetch<CreateBookMutation, CreateBookMutationVariables>(CreateBookDocument, variables)(),
    ...options
  }
    )};

useCreateBookMutation.getKey = () => ['CreateBook'];


useCreateBookMutation.fetcher = (variables: CreateBookMutationVariables, options?: RequestInit['headers']) => graphqlFetch<CreateBookMutation, CreateBookMutationVariables>(CreateBookDocument, variables, options);

export const UpdateBookDocument = new TypedDocumentString(`
    mutation UpdateBook($input: UpdateBookInput!) {
  updateBook(input: $input) {
    book {
      rowId
      name
      type
    }
  }
}
    `);

export const useUpdateBookMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateBookMutation, TError, UpdateBookMutationVariables, TContext>) => {
    
    return useMutation<UpdateBookMutation, TError, UpdateBookMutationVariables, TContext>(
      {
    mutationKey: ['UpdateBook'],
    mutationFn: (variables?: UpdateBookMutationVariables) => graphqlFetch<UpdateBookMutation, UpdateBookMutationVariables>(UpdateBookDocument, variables)(),
    ...options
  }
    )};

useUpdateBookMutation.getKey = () => ['UpdateBook'];


useUpdateBookMutation.fetcher = (variables: UpdateBookMutationVariables, options?: RequestInit['headers']) => graphqlFetch<UpdateBookMutation, UpdateBookMutationVariables>(UpdateBookDocument, variables, options);

export const DeleteBookDocument = new TypedDocumentString(`
    mutation DeleteBook($input: DeleteBookInput!) {
  deleteBook(input: $input) {
    deletedBookNodeId: deletedBookId
  }
}
    `);

export const useDeleteBookMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteBookMutation, TError, DeleteBookMutationVariables, TContext>) => {
    
    return useMutation<DeleteBookMutation, TError, DeleteBookMutationVariables, TContext>(
      {
    mutationKey: ['DeleteBook'],
    mutationFn: (variables?: DeleteBookMutationVariables) => graphqlFetch<DeleteBookMutation, DeleteBookMutationVariables>(DeleteBookDocument, variables)(),
    ...options
  }
    )};

useDeleteBookMutation.getKey = () => ['DeleteBook'];


useDeleteBookMutation.fetcher = (variables: DeleteBookMutationVariables, options?: RequestInit['headers']) => graphqlFetch<DeleteBookMutation, DeleteBookMutationVariables>(DeleteBookDocument, variables, options);

export const AllBudgetsDocument = new TypedDocumentString(`
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
    `);

export const useAllBudgetsQuery = <
      TData = AllBudgetsQuery,
      TError = unknown
    >(
      variables: AllBudgetsQueryVariables,
      options?: Omit<UseQueryOptions<AllBudgetsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<AllBudgetsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<AllBudgetsQuery, TError, TData>(
      {
    queryKey: ['AllBudgets', variables],
    queryFn: graphqlFetch<AllBudgetsQuery, AllBudgetsQueryVariables>(AllBudgetsDocument, variables),
    ...options
  }
    )};

useAllBudgetsQuery.getKey = (variables: AllBudgetsQueryVariables) => ['AllBudgets', variables];

export const useSuspenseAllBudgetsQuery = <
      TData = AllBudgetsQuery,
      TError = unknown
    >(
      variables: AllBudgetsQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<AllBudgetsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<AllBudgetsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<AllBudgetsQuery, TError, TData>(
      {
    queryKey: ['AllBudgets', variables],
    queryFn: graphqlFetch<AllBudgetsQuery, AllBudgetsQueryVariables>(AllBudgetsDocument, variables),
    ...options
  }
    )};

useSuspenseAllBudgetsQuery.getKey = (variables: AllBudgetsQueryVariables) => ['AllBudgets', variables];

export const useInfiniteAllBudgetsQuery = <
      TData = InfiniteData<AllBudgetsQuery>,
      TError = unknown
    >(
      variables: AllBudgetsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<AllBudgetsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<AllBudgetsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<AllBudgetsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['AllBudgets.infinite', variables],
      queryFn: (metaData) => graphqlFetch<AllBudgetsQuery, AllBudgetsQueryVariables>(AllBudgetsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteAllBudgetsQuery.getKey = (variables: AllBudgetsQueryVariables) => ['AllBudgets.infinite', variables];

export const useSuspenseInfiniteAllBudgetsQuery = <
      TData = InfiniteData<AllBudgetsQuery>,
      TError = unknown
    >(
      variables: AllBudgetsQueryVariables,
      options: Omit<UseSuspenseInfiniteQueryOptions<AllBudgetsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseInfiniteQueryOptions<AllBudgetsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseInfiniteQuery<AllBudgetsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['AllBudgets.infinite', variables],
      queryFn: (metaData) => graphqlFetch<AllBudgetsQuery, AllBudgetsQueryVariables>(AllBudgetsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useSuspenseInfiniteAllBudgetsQuery.getKey = (variables: AllBudgetsQueryVariables) => ['AllBudgets.infinite', variables];


useAllBudgetsQuery.fetcher = (variables: AllBudgetsQueryVariables, options?: RequestInit['headers']) => graphqlFetch<AllBudgetsQuery, AllBudgetsQueryVariables>(AllBudgetsDocument, variables, options);

export const CreateBudgetDocument = new TypedDocumentString(`
    mutation CreateBudget($input: CreateBudgetInput!) {
  createBudget(input: $input) {
    budget {
      rowId
    }
  }
}
    `);

export const useCreateBudgetMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateBudgetMutation, TError, CreateBudgetMutationVariables, TContext>) => {
    
    return useMutation<CreateBudgetMutation, TError, CreateBudgetMutationVariables, TContext>(
      {
    mutationKey: ['CreateBudget'],
    mutationFn: (variables?: CreateBudgetMutationVariables) => graphqlFetch<CreateBudgetMutation, CreateBudgetMutationVariables>(CreateBudgetDocument, variables)(),
    ...options
  }
    )};

useCreateBudgetMutation.getKey = () => ['CreateBudget'];


useCreateBudgetMutation.fetcher = (variables: CreateBudgetMutationVariables, options?: RequestInit['headers']) => graphqlFetch<CreateBudgetMutation, CreateBudgetMutationVariables>(CreateBudgetDocument, variables, options);

export const UpdateBudgetDocument = new TypedDocumentString(`
    mutation UpdateBudget($input: UpdateBudgetInput!) {
  updateBudget(input: $input) {
    budget {
      rowId
    }
  }
}
    `);

export const useUpdateBudgetMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateBudgetMutation, TError, UpdateBudgetMutationVariables, TContext>) => {
    
    return useMutation<UpdateBudgetMutation, TError, UpdateBudgetMutationVariables, TContext>(
      {
    mutationKey: ['UpdateBudget'],
    mutationFn: (variables?: UpdateBudgetMutationVariables) => graphqlFetch<UpdateBudgetMutation, UpdateBudgetMutationVariables>(UpdateBudgetDocument, variables)(),
    ...options
  }
    )};

useUpdateBudgetMutation.getKey = () => ['UpdateBudget'];


useUpdateBudgetMutation.fetcher = (variables: UpdateBudgetMutationVariables, options?: RequestInit['headers']) => graphqlFetch<UpdateBudgetMutation, UpdateBudgetMutationVariables>(UpdateBudgetDocument, variables, options);

export const DeleteBudgetDocument = new TypedDocumentString(`
    mutation DeleteBudget($input: DeleteBudgetInput!) {
  deleteBudget(input: $input) {
    deletedBudgetNodeId: deletedBudgetId
  }
}
    `);

export const useDeleteBudgetMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteBudgetMutation, TError, DeleteBudgetMutationVariables, TContext>) => {
    
    return useMutation<DeleteBudgetMutation, TError, DeleteBudgetMutationVariables, TContext>(
      {
    mutationKey: ['DeleteBudget'],
    mutationFn: (variables?: DeleteBudgetMutationVariables) => graphqlFetch<DeleteBudgetMutation, DeleteBudgetMutationVariables>(DeleteBudgetDocument, variables)(),
    ...options
  }
    )};

useDeleteBudgetMutation.getKey = () => ['DeleteBudget'];


useDeleteBudgetMutation.fetcher = (variables: DeleteBudgetMutationVariables, options?: RequestInit['headers']) => graphqlFetch<DeleteBudgetMutation, DeleteBudgetMutationVariables>(DeleteBudgetDocument, variables, options);

export const AllJournalEntriesDocument = new TypedDocumentString(`
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
    `);

export const useAllJournalEntriesQuery = <
      TData = AllJournalEntriesQuery,
      TError = unknown
    >(
      variables: AllJournalEntriesQueryVariables,
      options?: Omit<UseQueryOptions<AllJournalEntriesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<AllJournalEntriesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<AllJournalEntriesQuery, TError, TData>(
      {
    queryKey: ['AllJournalEntries', variables],
    queryFn: graphqlFetch<AllJournalEntriesQuery, AllJournalEntriesQueryVariables>(AllJournalEntriesDocument, variables),
    ...options
  }
    )};

useAllJournalEntriesQuery.getKey = (variables: AllJournalEntriesQueryVariables) => ['AllJournalEntries', variables];

export const useSuspenseAllJournalEntriesQuery = <
      TData = AllJournalEntriesQuery,
      TError = unknown
    >(
      variables: AllJournalEntriesQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<AllJournalEntriesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<AllJournalEntriesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<AllJournalEntriesQuery, TError, TData>(
      {
    queryKey: ['AllJournalEntries', variables],
    queryFn: graphqlFetch<AllJournalEntriesQuery, AllJournalEntriesQueryVariables>(AllJournalEntriesDocument, variables),
    ...options
  }
    )};

useSuspenseAllJournalEntriesQuery.getKey = (variables: AllJournalEntriesQueryVariables) => ['AllJournalEntries', variables];

export const useInfiniteAllJournalEntriesQuery = <
      TData = InfiniteData<AllJournalEntriesQuery>,
      TError = unknown
    >(
      variables: AllJournalEntriesQueryVariables,
      options: Omit<UseInfiniteQueryOptions<AllJournalEntriesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<AllJournalEntriesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<AllJournalEntriesQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['AllJournalEntries.infinite', variables],
      queryFn: (metaData) => graphqlFetch<AllJournalEntriesQuery, AllJournalEntriesQueryVariables>(AllJournalEntriesDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteAllJournalEntriesQuery.getKey = (variables: AllJournalEntriesQueryVariables) => ['AllJournalEntries.infinite', variables];

export const useSuspenseInfiniteAllJournalEntriesQuery = <
      TData = InfiniteData<AllJournalEntriesQuery>,
      TError = unknown
    >(
      variables: AllJournalEntriesQueryVariables,
      options: Omit<UseSuspenseInfiniteQueryOptions<AllJournalEntriesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseInfiniteQueryOptions<AllJournalEntriesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseInfiniteQuery<AllJournalEntriesQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['AllJournalEntries.infinite', variables],
      queryFn: (metaData) => graphqlFetch<AllJournalEntriesQuery, AllJournalEntriesQueryVariables>(AllJournalEntriesDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useSuspenseInfiniteAllJournalEntriesQuery.getKey = (variables: AllJournalEntriesQueryVariables) => ['AllJournalEntries.infinite', variables];


useAllJournalEntriesQuery.fetcher = (variables: AllJournalEntriesQueryVariables, options?: RequestInit['headers']) => graphqlFetch<AllJournalEntriesQuery, AllJournalEntriesQueryVariables>(AllJournalEntriesDocument, variables, options);

export const CreateJournalEntryDocument = new TypedDocumentString(`
    mutation CreateJournalEntry($input: CreateJournalEntryInput!) {
  createJournalEntry(input: $input) {
    journalEntry {
      rowId
      date
      memo
    }
  }
}
    `);

export const useCreateJournalEntryMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateJournalEntryMutation, TError, CreateJournalEntryMutationVariables, TContext>) => {
    
    return useMutation<CreateJournalEntryMutation, TError, CreateJournalEntryMutationVariables, TContext>(
      {
    mutationKey: ['CreateJournalEntry'],
    mutationFn: (variables?: CreateJournalEntryMutationVariables) => graphqlFetch<CreateJournalEntryMutation, CreateJournalEntryMutationVariables>(CreateJournalEntryDocument, variables)(),
    ...options
  }
    )};

useCreateJournalEntryMutation.getKey = () => ['CreateJournalEntry'];


useCreateJournalEntryMutation.fetcher = (variables: CreateJournalEntryMutationVariables, options?: RequestInit['headers']) => graphqlFetch<CreateJournalEntryMutation, CreateJournalEntryMutationVariables>(CreateJournalEntryDocument, variables, options);

export const CreateJournalLineDocument = new TypedDocumentString(`
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
    `);

export const useCreateJournalLineMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateJournalLineMutation, TError, CreateJournalLineMutationVariables, TContext>) => {
    
    return useMutation<CreateJournalLineMutation, TError, CreateJournalLineMutationVariables, TContext>(
      {
    mutationKey: ['CreateJournalLine'],
    mutationFn: (variables?: CreateJournalLineMutationVariables) => graphqlFetch<CreateJournalLineMutation, CreateJournalLineMutationVariables>(CreateJournalLineDocument, variables)(),
    ...options
  }
    )};

useCreateJournalLineMutation.getKey = () => ['CreateJournalLine'];


useCreateJournalLineMutation.fetcher = (variables: CreateJournalLineMutationVariables, options?: RequestInit['headers']) => graphqlFetch<CreateJournalLineMutation, CreateJournalLineMutationVariables>(CreateJournalLineDocument, variables, options);

export const DeleteJournalEntryDocument = new TypedDocumentString(`
    mutation DeleteJournalEntry($input: DeleteJournalEntryInput!) {
  deleteJournalEntry(input: $input) {
    deletedJournalEntryNodeId: deletedJournalEntryId
  }
}
    `);

export const useDeleteJournalEntryMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteJournalEntryMutation, TError, DeleteJournalEntryMutationVariables, TContext>) => {
    
    return useMutation<DeleteJournalEntryMutation, TError, DeleteJournalEntryMutationVariables, TContext>(
      {
    mutationKey: ['DeleteJournalEntry'],
    mutationFn: (variables?: DeleteJournalEntryMutationVariables) => graphqlFetch<DeleteJournalEntryMutation, DeleteJournalEntryMutationVariables>(DeleteJournalEntryDocument, variables)(),
    ...options
  }
    )};

useDeleteJournalEntryMutation.getKey = () => ['DeleteJournalEntry'];


useDeleteJournalEntryMutation.fetcher = (variables: DeleteJournalEntryMutationVariables, options?: RequestInit['headers']) => graphqlFetch<DeleteJournalEntryMutation, DeleteJournalEntryMutationVariables>(DeleteJournalEntryDocument, variables, options);

export const PendingReconciliationDocument = new TypedDocumentString(`
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
    `);

export const usePendingReconciliationQuery = <
      TData = PendingReconciliationQuery,
      TError = unknown
    >(
      variables: PendingReconciliationQueryVariables,
      options?: Omit<UseQueryOptions<PendingReconciliationQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<PendingReconciliationQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<PendingReconciliationQuery, TError, TData>(
      {
    queryKey: ['PendingReconciliation', variables],
    queryFn: graphqlFetch<PendingReconciliationQuery, PendingReconciliationQueryVariables>(PendingReconciliationDocument, variables),
    ...options
  }
    )};

usePendingReconciliationQuery.getKey = (variables: PendingReconciliationQueryVariables) => ['PendingReconciliation', variables];

export const useSuspensePendingReconciliationQuery = <
      TData = PendingReconciliationQuery,
      TError = unknown
    >(
      variables: PendingReconciliationQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<PendingReconciliationQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<PendingReconciliationQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<PendingReconciliationQuery, TError, TData>(
      {
    queryKey: ['PendingReconciliation', variables],
    queryFn: graphqlFetch<PendingReconciliationQuery, PendingReconciliationQueryVariables>(PendingReconciliationDocument, variables),
    ...options
  }
    )};

useSuspensePendingReconciliationQuery.getKey = (variables: PendingReconciliationQueryVariables) => ['PendingReconciliation', variables];

export const useInfinitePendingReconciliationQuery = <
      TData = InfiniteData<PendingReconciliationQuery>,
      TError = unknown
    >(
      variables: PendingReconciliationQueryVariables,
      options: Omit<UseInfiniteQueryOptions<PendingReconciliationQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<PendingReconciliationQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<PendingReconciliationQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['PendingReconciliation.infinite', variables],
      queryFn: (metaData) => graphqlFetch<PendingReconciliationQuery, PendingReconciliationQueryVariables>(PendingReconciliationDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfinitePendingReconciliationQuery.getKey = (variables: PendingReconciliationQueryVariables) => ['PendingReconciliation.infinite', variables];

export const useSuspenseInfinitePendingReconciliationQuery = <
      TData = InfiniteData<PendingReconciliationQuery>,
      TError = unknown
    >(
      variables: PendingReconciliationQueryVariables,
      options: Omit<UseSuspenseInfiniteQueryOptions<PendingReconciliationQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseInfiniteQueryOptions<PendingReconciliationQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseInfiniteQuery<PendingReconciliationQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['PendingReconciliation.infinite', variables],
      queryFn: (metaData) => graphqlFetch<PendingReconciliationQuery, PendingReconciliationQueryVariables>(PendingReconciliationDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useSuspenseInfinitePendingReconciliationQuery.getKey = (variables: PendingReconciliationQueryVariables) => ['PendingReconciliation.infinite', variables];


usePendingReconciliationQuery.fetcher = (variables: PendingReconciliationQueryVariables, options?: RequestInit['headers']) => graphqlFetch<PendingReconciliationQuery, PendingReconciliationQueryVariables>(PendingReconciliationDocument, variables, options);

export const ApproveReconciliationDocument = new TypedDocumentString(`
    mutation ApproveReconciliation($input: UpdateReconciliationQueueInput!) {
  updateReconciliationQueue(input: $input) {
    reconciliationQueue {
      rowId
      status
      reviewedAt
    }
  }
}
    `);

export const useApproveReconciliationMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ApproveReconciliationMutation, TError, ApproveReconciliationMutationVariables, TContext>) => {
    
    return useMutation<ApproveReconciliationMutation, TError, ApproveReconciliationMutationVariables, TContext>(
      {
    mutationKey: ['ApproveReconciliation'],
    mutationFn: (variables?: ApproveReconciliationMutationVariables) => graphqlFetch<ApproveReconciliationMutation, ApproveReconciliationMutationVariables>(ApproveReconciliationDocument, variables)(),
    ...options
  }
    )};

useApproveReconciliationMutation.getKey = () => ['ApproveReconciliation'];


useApproveReconciliationMutation.fetcher = (variables: ApproveReconciliationMutationVariables, options?: RequestInit['headers']) => graphqlFetch<ApproveReconciliationMutation, ApproveReconciliationMutationVariables>(ApproveReconciliationDocument, variables, options);

export const RejectReconciliationDocument = new TypedDocumentString(`
    mutation RejectReconciliation($input: UpdateReconciliationQueueInput!) {
  updateReconciliationQueue(input: $input) {
    reconciliationQueue {
      rowId
      status
    }
  }
}
    `);

export const useRejectReconciliationMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<RejectReconciliationMutation, TError, RejectReconciliationMutationVariables, TContext>) => {
    
    return useMutation<RejectReconciliationMutation, TError, RejectReconciliationMutationVariables, TContext>(
      {
    mutationKey: ['RejectReconciliation'],
    mutationFn: (variables?: RejectReconciliationMutationVariables) => graphqlFetch<RejectReconciliationMutation, RejectReconciliationMutationVariables>(RejectReconciliationDocument, variables)(),
    ...options
  }
    )};

useRejectReconciliationMutation.getKey = () => ['RejectReconciliation'];


useRejectReconciliationMutation.fetcher = (variables: RejectReconciliationMutationVariables, options?: RequestInit['headers']) => graphqlFetch<RejectReconciliationMutation, RejectReconciliationMutationVariables>(RejectReconciliationDocument, variables, options);

export const AllSavingsGoalsDocument = new TypedDocumentString(`
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
    `);

export const useAllSavingsGoalsQuery = <
      TData = AllSavingsGoalsQuery,
      TError = unknown
    >(
      variables: AllSavingsGoalsQueryVariables,
      options?: Omit<UseQueryOptions<AllSavingsGoalsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<AllSavingsGoalsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<AllSavingsGoalsQuery, TError, TData>(
      {
    queryKey: ['AllSavingsGoals', variables],
    queryFn: graphqlFetch<AllSavingsGoalsQuery, AllSavingsGoalsQueryVariables>(AllSavingsGoalsDocument, variables),
    ...options
  }
    )};

useAllSavingsGoalsQuery.getKey = (variables: AllSavingsGoalsQueryVariables) => ['AllSavingsGoals', variables];

export const useSuspenseAllSavingsGoalsQuery = <
      TData = AllSavingsGoalsQuery,
      TError = unknown
    >(
      variables: AllSavingsGoalsQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<AllSavingsGoalsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<AllSavingsGoalsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<AllSavingsGoalsQuery, TError, TData>(
      {
    queryKey: ['AllSavingsGoals', variables],
    queryFn: graphqlFetch<AllSavingsGoalsQuery, AllSavingsGoalsQueryVariables>(AllSavingsGoalsDocument, variables),
    ...options
  }
    )};

useSuspenseAllSavingsGoalsQuery.getKey = (variables: AllSavingsGoalsQueryVariables) => ['AllSavingsGoals', variables];

export const useInfiniteAllSavingsGoalsQuery = <
      TData = InfiniteData<AllSavingsGoalsQuery>,
      TError = unknown
    >(
      variables: AllSavingsGoalsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<AllSavingsGoalsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<AllSavingsGoalsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<AllSavingsGoalsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['AllSavingsGoals.infinite', variables],
      queryFn: (metaData) => graphqlFetch<AllSavingsGoalsQuery, AllSavingsGoalsQueryVariables>(AllSavingsGoalsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteAllSavingsGoalsQuery.getKey = (variables: AllSavingsGoalsQueryVariables) => ['AllSavingsGoals.infinite', variables];

export const useSuspenseInfiniteAllSavingsGoalsQuery = <
      TData = InfiniteData<AllSavingsGoalsQuery>,
      TError = unknown
    >(
      variables: AllSavingsGoalsQueryVariables,
      options: Omit<UseSuspenseInfiniteQueryOptions<AllSavingsGoalsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseInfiniteQueryOptions<AllSavingsGoalsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseInfiniteQuery<AllSavingsGoalsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['AllSavingsGoals.infinite', variables],
      queryFn: (metaData) => graphqlFetch<AllSavingsGoalsQuery, AllSavingsGoalsQueryVariables>(AllSavingsGoalsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useSuspenseInfiniteAllSavingsGoalsQuery.getKey = (variables: AllSavingsGoalsQueryVariables) => ['AllSavingsGoals.infinite', variables];


useAllSavingsGoalsQuery.fetcher = (variables: AllSavingsGoalsQueryVariables, options?: RequestInit['headers']) => graphqlFetch<AllSavingsGoalsQuery, AllSavingsGoalsQueryVariables>(AllSavingsGoalsDocument, variables, options);

export const CreateSavingsGoalDocument = new TypedDocumentString(`
    mutation CreateSavingsGoal($input: CreateSavingsGoalInput!) {
  createSavingsGoal(input: $input) {
    savingsGoal {
      rowId
    }
  }
}
    `);

export const useCreateSavingsGoalMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateSavingsGoalMutation, TError, CreateSavingsGoalMutationVariables, TContext>) => {
    
    return useMutation<CreateSavingsGoalMutation, TError, CreateSavingsGoalMutationVariables, TContext>(
      {
    mutationKey: ['CreateSavingsGoal'],
    mutationFn: (variables?: CreateSavingsGoalMutationVariables) => graphqlFetch<CreateSavingsGoalMutation, CreateSavingsGoalMutationVariables>(CreateSavingsGoalDocument, variables)(),
    ...options
  }
    )};

useCreateSavingsGoalMutation.getKey = () => ['CreateSavingsGoal'];


useCreateSavingsGoalMutation.fetcher = (variables: CreateSavingsGoalMutationVariables, options?: RequestInit['headers']) => graphqlFetch<CreateSavingsGoalMutation, CreateSavingsGoalMutationVariables>(CreateSavingsGoalDocument, variables, options);

export const DeleteSavingsGoalDocument = new TypedDocumentString(`
    mutation DeleteSavingsGoal($input: DeleteSavingsGoalInput!) {
  deleteSavingsGoal(input: $input) {
    deletedSavingsGoalNodeId: deletedSavingsGoalId
  }
}
    `);

export const useDeleteSavingsGoalMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteSavingsGoalMutation, TError, DeleteSavingsGoalMutationVariables, TContext>) => {
    
    return useMutation<DeleteSavingsGoalMutation, TError, DeleteSavingsGoalMutationVariables, TContext>(
      {
    mutationKey: ['DeleteSavingsGoal'],
    mutationFn: (variables?: DeleteSavingsGoalMutationVariables) => graphqlFetch<DeleteSavingsGoalMutation, DeleteSavingsGoalMutationVariables>(DeleteSavingsGoalDocument, variables)(),
    ...options
  }
    )};

useDeleteSavingsGoalMutation.getKey = () => ['DeleteSavingsGoal'];


useDeleteSavingsGoalMutation.fetcher = (variables: DeleteSavingsGoalMutationVariables, options?: RequestInit['headers']) => graphqlFetch<DeleteSavingsGoalMutation, DeleteSavingsGoalMutationVariables>(DeleteSavingsGoalDocument, variables, options);
