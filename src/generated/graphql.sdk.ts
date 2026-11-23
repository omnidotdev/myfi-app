// @ts-nocheck
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { GraphQLClient, type RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A floating point number that requires more precision than IEEE 754 binary 64 */
  BigFloat: { input: string; output: string; }
  /**
   * A signed eight-byte integer. The upper big integer values are greater than the
   * max value for a JavaScript number. Therefore all big integers will be output as
   * strings and not numbers.
   */
  BigInt: { input: string; output: string; }
  /** A location in a connection that can be used for resuming pagination. */
  Cursor: { input: string; output: string; }
  /**
   * A point in time as described by the [ISO
   * 8601](https://en.wikipedia.org/wiki/ISO_8601) and, if it has a timezone, [RFC
   * 3339](https://datatracker.ietf.org/doc/html/rfc3339) standards. Input values
   * that do not conform to both ISO 8601 and RFC 3339 may be coerced, which may lead
   * to unexpected results.
   */
  Datetime: { input: Date; output: string; }
  /** Represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: unknown; output: unknown; }
  /** A universally unique identifier as defined by [RFC 4122](https://tools.ietf.org/html/rfc4122). */
  UUID: { input: string; output: string; }
};

export type Account = Node & {
  __typename?: 'Account';
  /** Reads a single `Book` that is related to this `Account`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  /** Reads and enables pagination through a set of `Budget`. */
  budgets: BudgetConnection;
  /** Reads and enables pagination through a set of `Account`. */
  childAccounts: AccountConnection;
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isPlaceholder: Scalars['Boolean']['output'];
  /** Reads and enables pagination through a set of `JournalLine`. */
  journalLines: JournalLineConnection;
  name: Scalars['String']['output'];
  /** Reads a single `Account` that is related to this `Account`. */
  parent?: Maybe<Account>;
  parentId?: Maybe<Scalars['UUID']['output']>;
  /** Reads and enables pagination through a set of `ReconciliationStatement`. */
  reconciliationStatements: ReconciliationStatementConnection;
  rowId: Scalars['UUID']['output'];
  subType?: Maybe<AccountSubType>;
  type: AccountType;
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
};


export type AccountBudgetsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<BudgetCondition>;
  filter?: InputMaybe<BudgetFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BudgetOrderBy>>;
};


export type AccountChildAccountsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AccountCondition>;
  filter?: InputMaybe<AccountFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AccountOrderBy>>;
};


export type AccountJournalLinesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<JournalLineCondition>;
  filter?: InputMaybe<JournalLineFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<JournalLineOrderBy>>;
};


export type AccountReconciliationStatementsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ReconciliationStatementCondition>;
  filter?: InputMaybe<ReconciliationStatementFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ReconciliationStatementOrderBy>>;
};

/** A condition to be used against `Account` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type AccountCondition = {
  /** Checks for equality with the object’s `bookId` field. */
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `parentId` field. */
  parentId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `type` field. */
  type?: InputMaybe<AccountType>;
};

/** A connection to a list of `Account` values. */
export type AccountConnection = {
  __typename?: 'AccountConnection';
  /** A list of edges which contains the `Account` and cursor to aid in pagination. */
  edges: Array<Maybe<AccountEdge>>;
  /** A list of `Account` objects. */
  nodes: Array<Maybe<Account>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Account` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Account` edge in the connection. */
export type AccountEdge = {
  __typename?: 'AccountEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Account` at the end of the edge. */
  node?: Maybe<Account>;
};

/** A filter to be used against `Account` object types. All fields are combined with a logical ‘and.’ */
export type AccountFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<AccountFilter>>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `budgets` relation. */
  budgets?: InputMaybe<AccountToManyBudgetFilter>;
  /** Some related `budgets` exist. */
  budgetsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `childAccounts` relation. */
  childAccounts?: InputMaybe<AccountToManyAccountFilter>;
  /** Some related `childAccounts` exist. */
  childAccountsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `journalLines` relation. */
  journalLines?: InputMaybe<AccountToManyJournalLineFilter>;
  /** Some related `journalLines` exist. */
  journalLinesExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Negates the expression. */
  not?: InputMaybe<AccountFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<AccountFilter>>;
  /** Filter by the object’s `parent` relation. */
  parent?: InputMaybe<AccountFilter>;
  /** A related `parent` exists. */
  parentExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `parentId` field. */
  parentId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `reconciliationStatements` relation. */
  reconciliationStatements?: InputMaybe<AccountToManyReconciliationStatementFilter>;
  /** Some related `reconciliationStatements` exist. */
  reconciliationStatementsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `type` field. */
  type?: InputMaybe<AccountTypeFilter>;
};

export type AccountMapping = Node & {
  __typename?: 'AccountMapping';
  /** Reads a single `Book` that is related to this `AccountMapping`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads a single `Account` that is related to this `AccountMapping`. */
  creditAccount?: Maybe<Account>;
  creditAccountId: Scalars['UUID']['output'];
  /** Reads a single `Account` that is related to this `AccountMapping`. */
  debitAccount?: Maybe<Account>;
  debitAccountId: Scalars['UUID']['output'];
  eventType: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  rowId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
};

/**
 * A condition to be used against `AccountMapping` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type AccountMappingCondition = {
  /** Checks for equality with the object’s `bookId` field. */
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `eventType` field. */
  eventType?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `AccountMapping` values. */
export type AccountMappingConnection = {
  __typename?: 'AccountMappingConnection';
  /** A list of edges which contains the `AccountMapping` and cursor to aid in pagination. */
  edges: Array<Maybe<AccountMappingEdge>>;
  /** A list of `AccountMapping` objects. */
  nodes: Array<Maybe<AccountMapping>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AccountMapping` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AccountMapping` edge in the connection. */
export type AccountMappingEdge = {
  __typename?: 'AccountMappingEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `AccountMapping` at the end of the edge. */
  node?: Maybe<AccountMapping>;
};

/** A filter to be used against `AccountMapping` object types. All fields are combined with a logical ‘and.’ */
export type AccountMappingFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<AccountMappingFilter>>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `creditAccount` relation. */
  creditAccount?: InputMaybe<AccountFilter>;
  /** Filter by the object’s `debitAccount` relation. */
  debitAccount?: InputMaybe<AccountFilter>;
  /** Filter by the object’s `eventType` field. */
  eventType?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<AccountMappingFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<AccountMappingFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
};

/** Methods to use when ordering `AccountMapping`. */
export enum AccountMappingOrderBy {
  BookIdAsc = 'BOOK_ID_ASC',
  BookIdDesc = 'BOOK_ID_DESC',
  EventTypeAsc = 'EVENT_TYPE_ASC',
  EventTypeDesc = 'EVENT_TYPE_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

/** Methods to use when ordering `Account`. */
export enum AccountOrderBy {
  BookIdAsc = 'BOOK_ID_ASC',
  BookIdDesc = 'BOOK_ID_DESC',
  Natural = 'NATURAL',
  ParentIdAsc = 'PARENT_ID_ASC',
  ParentIdDesc = 'PARENT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

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

/** A filter to be used against many `Account` object types. All fields are combined with a logical ‘and.’ */
export type AccountToManyAccountFilter = {
  /** Every related `Account` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<AccountFilter>;
  /** No related `Account` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<AccountFilter>;
  /** Some related `Account` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<AccountFilter>;
};

/** A filter to be used against many `Budget` object types. All fields are combined with a logical ‘and.’ */
export type AccountToManyBudgetFilter = {
  /** Every related `Budget` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<BudgetFilter>;
  /** No related `Budget` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<BudgetFilter>;
  /** Some related `Budget` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<BudgetFilter>;
};

/** A filter to be used against many `JournalLine` object types. All fields are combined with a logical ‘and.’ */
export type AccountToManyJournalLineFilter = {
  /** Every related `JournalLine` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<JournalLineFilter>;
  /** No related `JournalLine` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<JournalLineFilter>;
  /** Some related `JournalLine` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<JournalLineFilter>;
};

/** A filter to be used against many `ReconciliationStatement` object types. All fields are combined with a logical ‘and.’ */
export type AccountToManyReconciliationStatementFilter = {
  /** Every related `ReconciliationStatement` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<ReconciliationStatementFilter>;
  /** No related `ReconciliationStatement` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<ReconciliationStatementFilter>;
  /** Some related `ReconciliationStatement` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<ReconciliationStatementFilter>;
};

export enum AccountType {
  Asset = 'asset',
  Equity = 'equity',
  Expense = 'expense',
  Liability = 'liability',
  Revenue = 'revenue'
}

/** A filter to be used against AccountType fields. All fields are combined with a logical ‘and.’ */
export type AccountTypeFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<AccountType>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<AccountType>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<AccountType>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<AccountType>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<AccountType>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<AccountType>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<AccountType>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<AccountType>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<AccountType>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<AccountType>>;
};

export type AccountingPeriod = Node & {
  __typename?: 'AccountingPeriod';
  blockers?: Maybe<Scalars['JSON']['output']>;
  /** Reads a single `Book` that is related to this `AccountingPeriod`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  closedAt?: Maybe<Scalars['Datetime']['output']>;
  closedBy?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  month: Scalars['Int']['output'];
  reopenedAt?: Maybe<Scalars['Datetime']['output']>;
  rowId: Scalars['UUID']['output'];
  status: Scalars['String']['output'];
  year: Scalars['Int']['output'];
};

/**
 * A condition to be used against `AccountingPeriod` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type AccountingPeriodCondition = {
  /** Checks for equality with the object’s `bookId` field. */
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `month` field. */
  month?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `year` field. */
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `AccountingPeriod` values. */
export type AccountingPeriodConnection = {
  __typename?: 'AccountingPeriodConnection';
  /** A list of edges which contains the `AccountingPeriod` and cursor to aid in pagination. */
  edges: Array<Maybe<AccountingPeriodEdge>>;
  /** A list of `AccountingPeriod` objects. */
  nodes: Array<Maybe<AccountingPeriod>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AccountingPeriod` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AccountingPeriod` edge in the connection. */
export type AccountingPeriodEdge = {
  __typename?: 'AccountingPeriodEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `AccountingPeriod` at the end of the edge. */
  node?: Maybe<AccountingPeriod>;
};

/** A filter to be used against `AccountingPeriod` object types. All fields are combined with a logical ‘and.’ */
export type AccountingPeriodFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<AccountingPeriodFilter>>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `month` field. */
  month?: InputMaybe<IntFilter>;
  /** Negates the expression. */
  not?: InputMaybe<AccountingPeriodFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<AccountingPeriodFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `status` field. */
  status?: InputMaybe<StringFilter>;
  /** Filter by the object’s `year` field. */
  year?: InputMaybe<IntFilter>;
};

/** Methods to use when ordering `AccountingPeriod`. */
export enum AccountingPeriodOrderBy {
  BookIdAsc = 'BOOK_ID_ASC',
  BookIdDesc = 'BOOK_ID_DESC',
  MonthAsc = 'MONTH_ASC',
  MonthDesc = 'MONTH_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  YearAsc = 'YEAR_ASC',
  YearDesc = 'YEAR_DESC'
}

export type AmortizationEntry = Node & {
  __typename?: 'AmortizationEntry';
  balanceAfter: Scalars['BigFloat']['output'];
  dueDate: Scalars['String']['output'];
  extraPrincipal: Scalars['BigFloat']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  interestAmount: Scalars['BigFloat']['output'];
  /** Reads a single `JournalEntry` that is related to this `AmortizationEntry`. */
  journalEntry?: Maybe<JournalEntry>;
  journalEntryId?: Maybe<Scalars['UUID']['output']>;
  /** Reads a single `Loan` that is related to this `AmortizationEntry`. */
  loan?: Maybe<Loan>;
  loanId: Scalars['UUID']['output'];
  paymentAmount: Scalars['BigFloat']['output'];
  principalAmount: Scalars['BigFloat']['output'];
  rowId: Scalars['UUID']['output'];
  sequenceNumber: Scalars['Int']['output'];
  status: Scalars['String']['output'];
};

/**
 * A condition to be used against `AmortizationEntry` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type AmortizationEntryCondition = {
  /** Checks for equality with the object’s `dueDate` field. */
  dueDate?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `loanId` field. */
  loanId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `AmortizationEntry` values. */
export type AmortizationEntryConnection = {
  __typename?: 'AmortizationEntryConnection';
  /** A list of edges which contains the `AmortizationEntry` and cursor to aid in pagination. */
  edges: Array<Maybe<AmortizationEntryEdge>>;
  /** A list of `AmortizationEntry` objects. */
  nodes: Array<Maybe<AmortizationEntry>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AmortizationEntry` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AmortizationEntry` edge in the connection. */
export type AmortizationEntryEdge = {
  __typename?: 'AmortizationEntryEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `AmortizationEntry` at the end of the edge. */
  node?: Maybe<AmortizationEntry>;
};

/** A filter to be used against `AmortizationEntry` object types. All fields are combined with a logical ‘and.’ */
export type AmortizationEntryFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<AmortizationEntryFilter>>;
  /** Filter by the object’s `dueDate` field. */
  dueDate?: InputMaybe<StringFilter>;
  /** Filter by the object’s `journalEntry` relation. */
  journalEntry?: InputMaybe<JournalEntryFilter>;
  /** A related `journalEntry` exists. */
  journalEntryExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `loan` relation. */
  loan?: InputMaybe<LoanFilter>;
  /** Filter by the object’s `loanId` field. */
  loanId?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<AmortizationEntryFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<AmortizationEntryFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `status` field. */
  status?: InputMaybe<StringFilter>;
};

/** Methods to use when ordering `AmortizationEntry`. */
export enum AmortizationEntryOrderBy {
  DueDateAsc = 'DUE_DATE_ASC',
  DueDateDesc = 'DUE_DATE_DESC',
  LoanIdAsc = 'LOAN_ID_ASC',
  LoanIdDesc = 'LOAN_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC'
}

export type Attachment = Node & {
  __typename?: 'Attachment';
  /** Reads a single `Book` that is related to this `Attachment`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  contentType: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  createdBy: Scalars['String']['output'];
  filename: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  /** Reads a single `JournalEntry` that is related to this `Attachment`. */
  journalEntry?: Maybe<JournalEntry>;
  journalEntryId?: Maybe<Scalars['UUID']['output']>;
  rowId: Scalars['UUID']['output'];
  sizeBytes: Scalars['Int']['output'];
  storageKey: Scalars['String']['output'];
  uploadStatus: Scalars['String']['output'];
};

/**
 * A condition to be used against `Attachment` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type AttachmentCondition = {
  /** Checks for equality with the object’s `bookId` field. */
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `journalEntryId` field. */
  journalEntryId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `uploadStatus` field. */
  uploadStatus?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `Attachment` values. */
export type AttachmentConnection = {
  __typename?: 'AttachmentConnection';
  /** A list of edges which contains the `Attachment` and cursor to aid in pagination. */
  edges: Array<Maybe<AttachmentEdge>>;
  /** A list of `Attachment` objects. */
  nodes: Array<Maybe<Attachment>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Attachment` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Attachment` edge in the connection. */
export type AttachmentEdge = {
  __typename?: 'AttachmentEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Attachment` at the end of the edge. */
  node?: Maybe<Attachment>;
};

/** A filter to be used against `Attachment` object types. All fields are combined with a logical ‘and.’ */
export type AttachmentFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<AttachmentFilter>>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `journalEntry` relation. */
  journalEntry?: InputMaybe<JournalEntryFilter>;
  /** A related `journalEntry` exists. */
  journalEntryExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `journalEntryId` field. */
  journalEntryId?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<AttachmentFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<AttachmentFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `uploadStatus` field. */
  uploadStatus?: InputMaybe<StringFilter>;
};

/** Methods to use when ordering `Attachment`. */
export enum AttachmentOrderBy {
  BookIdAsc = 'BOOK_ID_ASC',
  BookIdDesc = 'BOOK_ID_DESC',
  JournalEntryIdAsc = 'JOURNAL_ENTRY_ID_ASC',
  JournalEntryIdDesc = 'JOURNAL_ENTRY_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  UploadStatusAsc = 'UPLOAD_STATUS_ASC',
  UploadStatusDesc = 'UPLOAD_STATUS_DESC'
}

export type BankDeposit = Node & {
  __typename?: 'BankDeposit';
  /** Reads a single `Account` that is related to this `BankDeposit`. */
  bankAccount?: Maybe<Account>;
  bankAccountId: Scalars['UUID']['output'];
  /** Reads a single `Book` that is related to this `BankDeposit`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  date: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  /** Reads a single `JournalEntry` that is related to this `BankDeposit`. */
  journalEntry?: Maybe<JournalEntry>;
  journalEntryId?: Maybe<Scalars['UUID']['output']>;
  memo?: Maybe<Scalars['String']['output']>;
  rowId: Scalars['UUID']['output'];
  status: Scalars['String']['output'];
  total: Scalars['BigFloat']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
};

/**
 * A condition to be used against `BankDeposit` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type BankDepositCondition = {
  /** Checks for equality with the object’s `bookId` field. */
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `BankDeposit` values. */
export type BankDepositConnection = {
  __typename?: 'BankDepositConnection';
  /** A list of edges which contains the `BankDeposit` and cursor to aid in pagination. */
  edges: Array<Maybe<BankDepositEdge>>;
  /** A list of `BankDeposit` objects. */
  nodes: Array<Maybe<BankDeposit>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `BankDeposit` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `BankDeposit` edge in the connection. */
export type BankDepositEdge = {
  __typename?: 'BankDepositEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `BankDeposit` at the end of the edge. */
  node?: Maybe<BankDeposit>;
};

/** A filter to be used against `BankDeposit` object types. All fields are combined with a logical ‘and.’ */
export type BankDepositFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<BankDepositFilter>>;
  /** Filter by the object’s `bankAccount` relation. */
  bankAccount?: InputMaybe<AccountFilter>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `journalEntry` relation. */
  journalEntry?: InputMaybe<JournalEntryFilter>;
  /** A related `journalEntry` exists. */
  journalEntryExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Negates the expression. */
  not?: InputMaybe<BankDepositFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<BankDepositFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
};

/** Methods to use when ordering `BankDeposit`. */
export enum BankDepositOrderBy {
  BookIdAsc = 'BOOK_ID_ASC',
  BookIdDesc = 'BOOK_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

export type Bill = Node & {
  __typename?: 'Bill';
  amountPaid: Scalars['BigFloat']['output'];
  billDate: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `BillLine`. */
  billLines: BillLineConnection;
  /** Reads and enables pagination through a set of `BillPayment`. */
  billPayments: BillPaymentConnection;
  /** Reads a single `Book` that is related to this `Bill`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  currency: Scalars['String']['output'];
  dueDate: Scalars['String']['output'];
  exchangeRate: Scalars['BigFloat']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  /** Reads a single `JournalEntry` that is related to this `Bill`. */
  journalEntry?: Maybe<JournalEntry>;
  journalEntryId?: Maybe<Scalars['UUID']['output']>;
  memo?: Maybe<Scalars['String']['output']>;
  number: Scalars['String']['output'];
  rowId: Scalars['UUID']['output'];
  status: Scalars['String']['output'];
  subtotal: Scalars['BigFloat']['output'];
  taxAmount: Scalars['BigFloat']['output'];
  total: Scalars['BigFloat']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads a single `Vendor` that is related to this `Bill`. */
  vendor?: Maybe<Vendor>;
  /** Reads and enables pagination through a set of `VendorCreditApplication`. */
  vendorCreditApplications: VendorCreditApplicationConnection;
  vendorId: Scalars['UUID']['output'];
};


export type BillBillLinesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<BillLineCondition>;
  filter?: InputMaybe<BillLineFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BillLineOrderBy>>;
};


export type BillBillPaymentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<BillPaymentCondition>;
  filter?: InputMaybe<BillPaymentFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BillPaymentOrderBy>>;
};


export type BillVendorCreditApplicationsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<VendorCreditApplicationCondition>;
  filter?: InputMaybe<VendorCreditApplicationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<VendorCreditApplicationOrderBy>>;
};

/** A condition to be used against `Bill` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type BillCondition = {
  /** Checks for equality with the object’s `bookId` field. */
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `number` field. */
  number?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `vendorId` field. */
  vendorId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `Bill` values. */
export type BillConnection = {
  __typename?: 'BillConnection';
  /** A list of edges which contains the `Bill` and cursor to aid in pagination. */
  edges: Array<Maybe<BillEdge>>;
  /** A list of `Bill` objects. */
  nodes: Array<Maybe<Bill>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Bill` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Bill` edge in the connection. */
export type BillEdge = {
  __typename?: 'BillEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Bill` at the end of the edge. */
  node?: Maybe<Bill>;
};

/** A filter to be used against `Bill` object types. All fields are combined with a logical ‘and.’ */
export type BillFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<BillFilter>>;
  /** Filter by the object’s `billLines` relation. */
  billLines?: InputMaybe<BillToManyBillLineFilter>;
  /** Some related `billLines` exist. */
  billLinesExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `billPayments` relation. */
  billPayments?: InputMaybe<BillToManyBillPaymentFilter>;
  /** Some related `billPayments` exist. */
  billPaymentsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `journalEntry` relation. */
  journalEntry?: InputMaybe<JournalEntryFilter>;
  /** A related `journalEntry` exists. */
  journalEntryExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Negates the expression. */
  not?: InputMaybe<BillFilter>;
  /** Filter by the object’s `number` field. */
  number?: InputMaybe<StringFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<BillFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `status` field. */
  status?: InputMaybe<StringFilter>;
  /** Filter by the object’s `vendor` relation. */
  vendor?: InputMaybe<VendorFilter>;
  /** Filter by the object’s `vendorCreditApplications` relation. */
  vendorCreditApplications?: InputMaybe<BillToManyVendorCreditApplicationFilter>;
  /** Some related `vendorCreditApplications` exist. */
  vendorCreditApplicationsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `vendorId` field. */
  vendorId?: InputMaybe<UuidFilter>;
};

export type BillLine = Node & {
  __typename?: 'BillLine';
  amount: Scalars['BigFloat']['output'];
  /** Reads a single `Bill` that is related to this `BillLine`. */
  bill?: Maybe<Bill>;
  billId: Scalars['UUID']['output'];
  description: Scalars['String']['output'];
  discountPercent?: Maybe<Scalars['BigFloat']['output']>;
  /** Reads a single `Account` that is related to this `BillLine`. */
  expenseAccount?: Maybe<Account>;
  expenseAccountId: Scalars['UUID']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  quantity: Scalars['BigFloat']['output'];
  rowId: Scalars['UUID']['output'];
  sortOrder: Scalars['Int']['output'];
  /** Reads a single `TaxJurisdiction` that is related to this `BillLine`. */
  taxJurisdiction?: Maybe<TaxJurisdiction>;
  taxJurisdictionId?: Maybe<Scalars['UUID']['output']>;
  unitPrice: Scalars['BigFloat']['output'];
};

/**
 * A condition to be used against `BillLine` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type BillLineCondition = {
  /** Checks for equality with the object’s `billId` field. */
  billId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `BillLine` values. */
export type BillLineConnection = {
  __typename?: 'BillLineConnection';
  /** A list of edges which contains the `BillLine` and cursor to aid in pagination. */
  edges: Array<Maybe<BillLineEdge>>;
  /** A list of `BillLine` objects. */
  nodes: Array<Maybe<BillLine>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `BillLine` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `BillLine` edge in the connection. */
export type BillLineEdge = {
  __typename?: 'BillLineEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `BillLine` at the end of the edge. */
  node?: Maybe<BillLine>;
};

/** A filter to be used against `BillLine` object types. All fields are combined with a logical ‘and.’ */
export type BillLineFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<BillLineFilter>>;
  /** Filter by the object’s `bill` relation. */
  bill?: InputMaybe<BillFilter>;
  /** Filter by the object’s `billId` field. */
  billId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `expenseAccount` relation. */
  expenseAccount?: InputMaybe<AccountFilter>;
  /** Negates the expression. */
  not?: InputMaybe<BillLineFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<BillLineFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `taxJurisdiction` relation. */
  taxJurisdiction?: InputMaybe<TaxJurisdictionFilter>;
  /** A related `taxJurisdiction` exists. */
  taxJurisdictionExists?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Methods to use when ordering `BillLine`. */
export enum BillLineOrderBy {
  BillIdAsc = 'BILL_ID_ASC',
  BillIdDesc = 'BILL_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

/** Methods to use when ordering `Bill`. */
export enum BillOrderBy {
  BookIdAsc = 'BOOK_ID_ASC',
  BookIdDesc = 'BOOK_ID_DESC',
  Natural = 'NATURAL',
  NumberAsc = 'NUMBER_ASC',
  NumberDesc = 'NUMBER_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  VendorIdAsc = 'VENDOR_ID_ASC',
  VendorIdDesc = 'VENDOR_ID_DESC'
}

export type BillPayment = Node & {
  __typename?: 'BillPayment';
  amount: Scalars['BigFloat']['output'];
  /** Reads a single `Bill` that is related to this `BillPayment`. */
  bill?: Maybe<Bill>;
  billId: Scalars['UUID']['output'];
  /** Reads a single `Book` that is related to this `BillPayment`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  date: Scalars['String']['output'];
  exchangeRate: Scalars['BigFloat']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  /** Reads a single `JournalEntry` that is related to this `BillPayment`. */
  journalEntry?: Maybe<JournalEntry>;
  journalEntryId?: Maybe<Scalars['UUID']['output']>;
  method?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Account` that is related to this `BillPayment`. */
  paymentAccount?: Maybe<Account>;
  paymentAccountId: Scalars['UUID']['output'];
  reference?: Maybe<Scalars['String']['output']>;
  rowId: Scalars['UUID']['output'];
};

/**
 * A condition to be used against `BillPayment` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type BillPaymentCondition = {
  /** Checks for equality with the object’s `billId` field. */
  billId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `bookId` field. */
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `BillPayment` values. */
export type BillPaymentConnection = {
  __typename?: 'BillPaymentConnection';
  /** A list of edges which contains the `BillPayment` and cursor to aid in pagination. */
  edges: Array<Maybe<BillPaymentEdge>>;
  /** A list of `BillPayment` objects. */
  nodes: Array<Maybe<BillPayment>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `BillPayment` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `BillPayment` edge in the connection. */
export type BillPaymentEdge = {
  __typename?: 'BillPaymentEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `BillPayment` at the end of the edge. */
  node?: Maybe<BillPayment>;
};

/** A filter to be used against `BillPayment` object types. All fields are combined with a logical ‘and.’ */
export type BillPaymentFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<BillPaymentFilter>>;
  /** Filter by the object’s `bill` relation. */
  bill?: InputMaybe<BillFilter>;
  /** Filter by the object’s `billId` field. */
  billId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `journalEntry` relation. */
  journalEntry?: InputMaybe<JournalEntryFilter>;
  /** A related `journalEntry` exists. */
  journalEntryExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Negates the expression. */
  not?: InputMaybe<BillPaymentFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<BillPaymentFilter>>;
  /** Filter by the object’s `paymentAccount` relation. */
  paymentAccount?: InputMaybe<AccountFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
};

/** Methods to use when ordering `BillPayment`. */
export enum BillPaymentOrderBy {
  BillIdAsc = 'BILL_ID_ASC',
  BillIdDesc = 'BILL_ID_DESC',
  BookIdAsc = 'BOOK_ID_ASC',
  BookIdDesc = 'BOOK_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

/** A filter to be used against many `BillLine` object types. All fields are combined with a logical ‘and.’ */
export type BillToManyBillLineFilter = {
  /** Every related `BillLine` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<BillLineFilter>;
  /** No related `BillLine` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<BillLineFilter>;
  /** Some related `BillLine` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<BillLineFilter>;
};

/** A filter to be used against many `BillPayment` object types. All fields are combined with a logical ‘and.’ */
export type BillToManyBillPaymentFilter = {
  /** Every related `BillPayment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<BillPaymentFilter>;
  /** No related `BillPayment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<BillPaymentFilter>;
  /** Some related `BillPayment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<BillPaymentFilter>;
};

/** A filter to be used against many `VendorCreditApplication` object types. All fields are combined with a logical ‘and.’ */
export type BillToManyVendorCreditApplicationFilter = {
  /** Every related `VendorCreditApplication` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<VendorCreditApplicationFilter>;
  /** No related `VendorCreditApplication` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<VendorCreditApplicationFilter>;
  /** Some related `VendorCreditApplication` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<VendorCreditApplicationFilter>;
};

export type Book = Node & {
  __typename?: 'Book';
  /** Reads and enables pagination through a set of `AccountMapping`. */
  accountMappings: AccountMappingConnection;
  /** Reads and enables pagination through a set of `AccountingPeriod`. */
  accountingPeriods: AccountingPeriodConnection;
  /** Reads and enables pagination through a set of `Account`. */
  accounts: AccountConnection;
  address?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `Attachment`. */
  attachments: AttachmentConnection;
  /** Reads and enables pagination through a set of `BankDeposit`. */
  bankDeposits: BankDepositConnection;
  /** Reads and enables pagination through a set of `BillPayment`. */
  billPayments: BillPaymentConnection;
  /** Reads and enables pagination through a set of `Bill`. */
  bills: BillConnection;
  /** Reads and enables pagination through a set of `BookAccess`. */
  bookAccesses: BookAccessConnection;
  /** Reads and enables pagination through a set of `Budget`. */
  budgets: BudgetConnection;
  /** Reads and enables pagination through a set of `CategorizationRule`. */
  categorizationRules: CategorizationRuleConnection;
  city?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `ConnectedAccount`. */
  connectedAccounts: ConnectedAccountConnection;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads and enables pagination through a set of `CreditMemo`. */
  creditMemos: CreditMemoConnection;
  /** Reads and enables pagination through a set of `CryptoAsset`. */
  cryptoAssets: CryptoAssetConnection;
  currency: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `CustomFieldDefinition`. */
  customFieldDefinitions: CustomFieldDefinitionConnection;
  /** Reads and enables pagination through a set of `CustomFieldValue`. */
  customFieldValues: CustomFieldValueConnection;
  /** Reads and enables pagination through a set of `Customer`. */
  customers: CustomerConnection;
  /** Reads and enables pagination through a set of `Document`. */
  documents: DocumentConnection;
  ein?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `Estimate`. */
  estimates: EstimateConnection;
  fiscalYearStartMonth: Scalars['Int']['output'];
  /** Reads and enables pagination through a set of `FixedAsset`. */
  fixedAssets: FixedAssetConnection;
  /** Reads and enables pagination through a set of `FormTemplate`. */
  formTemplates: FormTemplateConnection;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  /** Reads and enables pagination through a set of `InventoryItem`. */
  inventoryItems: InventoryItemConnection;
  /** Reads and enables pagination through a set of `InventoryTransaction`. */
  inventoryTransactions: InventoryTransactionConnection;
  /** Reads and enables pagination through a set of `InvoicePayment`. */
  invoicePayments: InvoicePaymentConnection;
  invoiceSource: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `Invoice`. */
  invoices: InvoiceConnection;
  /** Reads and enables pagination through a set of `ItemBundle`. */
  itemBundles: ItemBundleConnection;
  /** Reads and enables pagination through a set of `JournalEntry`. */
  journalEntries: JournalEntryConnection;
  legalName?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `Loan`. */
  loans: LoanConnection;
  /** Reads and enables pagination through a set of `MileageLog`. */
  mileageLogs: MileageLogConnection;
  name: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `NetWorthSnapshot`. */
  netWorthSnapshots: NetWorthSnapshotConnection;
  organizationId: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `PayrollConnection`. */
  payrollConnections: PayrollConnectionConnection;
  phone?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `PriceLevel`. */
  priceLevels: PriceLevelConnection;
  /** Reads and enables pagination through a set of `Project`. */
  projects: ProjectConnection;
  /** Reads and enables pagination through a set of `PurchaseOrder`. */
  purchaseOrders: PurchaseOrderConnection;
  /** Reads and enables pagination through a set of `RdExpense`. */
  rdExpenses: RdExpenseConnection;
  /** Reads and enables pagination through a set of `ReconciliationQueue`. */
  reconciliationQueues: ReconciliationQueueConnection;
  /** Reads and enables pagination through a set of `ReconciliationStatement`. */
  reconciliationStatements: ReconciliationStatementConnection;
  /** Reads and enables pagination through a set of `RecurringInvoice`. */
  recurringInvoices: RecurringInvoiceConnection;
  /** Reads and enables pagination through a set of `RecurringTransaction`. */
  recurringTransactions: RecurringTransactionConnection;
  rowId: Scalars['UUID']['output'];
  /** Reads and enables pagination through a set of `SavedReport`. */
  savedReports: SavedReportConnection;
  /** Reads and enables pagination through a set of `SavingsGoal`. */
  savingsGoals: SavingsGoalConnection;
  state?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `TagGroup`. */
  tagGroups: TagGroupConnection;
  /** Reads and enables pagination through a set of `TaxJurisdiction`. */
  taxJurisdictions: TaxJurisdictionConnection;
  /** Reads and enables pagination through a set of `TimeEntry`. */
  timeEntries: TimeEntryConnection;
  /** Reads and enables pagination through a set of `TrackingCategory`. */
  trackingCategories: TrackingCategoryConnection;
  type: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads and enables pagination through a set of `Vehicle`. */
  vehicles: VehicleConnection;
  /** Reads and enables pagination through a set of `VendorCredit`. */
  vendorCredits: VendorCreditConnection;
  /** Reads and enables pagination through a set of `Vendor`. */
  vendors: VendorConnection;
  zip?: Maybe<Scalars['String']['output']>;
};


export type BookAccountMappingsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AccountMappingCondition>;
  filter?: InputMaybe<AccountMappingFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AccountMappingOrderBy>>;
};


export type BookAccountingPeriodsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AccountingPeriodCondition>;
  filter?: InputMaybe<AccountingPeriodFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AccountingPeriodOrderBy>>;
};


export type BookAccountsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AccountCondition>;
  filter?: InputMaybe<AccountFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AccountOrderBy>>;
};


export type BookAttachmentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AttachmentCondition>;
  filter?: InputMaybe<AttachmentFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AttachmentOrderBy>>;
};


export type BookBankDepositsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<BankDepositCondition>;
  filter?: InputMaybe<BankDepositFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BankDepositOrderBy>>;
};


export type BookBillPaymentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<BillPaymentCondition>;
  filter?: InputMaybe<BillPaymentFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BillPaymentOrderBy>>;
};


export type BookBillsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<BillCondition>;
  filter?: InputMaybe<BillFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BillOrderBy>>;
};


export type BookBookAccessesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<BookAccessCondition>;
  filter?: InputMaybe<BookAccessFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BookAccessOrderBy>>;
};


export type BookBudgetsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<BudgetCondition>;
  filter?: InputMaybe<BudgetFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BudgetOrderBy>>;
};


export type BookCategorizationRulesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<CategorizationRuleCondition>;
  filter?: InputMaybe<CategorizationRuleFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CategorizationRuleOrderBy>>;
};


export type BookConnectedAccountsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ConnectedAccountCondition>;
  filter?: InputMaybe<ConnectedAccountFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ConnectedAccountOrderBy>>;
};


export type BookCreditMemosArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<CreditMemoCondition>;
  filter?: InputMaybe<CreditMemoFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CreditMemoOrderBy>>;
};


export type BookCryptoAssetsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<CryptoAssetCondition>;
  filter?: InputMaybe<CryptoAssetFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CryptoAssetOrderBy>>;
};


export type BookCustomFieldDefinitionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<CustomFieldDefinitionCondition>;
  filter?: InputMaybe<CustomFieldDefinitionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CustomFieldDefinitionOrderBy>>;
};


export type BookCustomFieldValuesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<CustomFieldValueCondition>;
  filter?: InputMaybe<CustomFieldValueFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CustomFieldValueOrderBy>>;
};


export type BookCustomersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<CustomerCondition>;
  filter?: InputMaybe<CustomerFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CustomerOrderBy>>;
};


export type BookDocumentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<DocumentCondition>;
  filter?: InputMaybe<DocumentFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DocumentOrderBy>>;
};


export type BookEstimatesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<EstimateCondition>;
  filter?: InputMaybe<EstimateFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EstimateOrderBy>>;
};


export type BookFixedAssetsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<FixedAssetCondition>;
  filter?: InputMaybe<FixedAssetFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FixedAssetOrderBy>>;
};


export type BookFormTemplatesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<FormTemplateCondition>;
  filter?: InputMaybe<FormTemplateFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FormTemplateOrderBy>>;
};


export type BookInventoryItemsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<InventoryItemCondition>;
  filter?: InputMaybe<InventoryItemFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<InventoryItemOrderBy>>;
};


export type BookInventoryTransactionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<InventoryTransactionCondition>;
  filter?: InputMaybe<InventoryTransactionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<InventoryTransactionOrderBy>>;
};


export type BookInvoicePaymentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<InvoicePaymentCondition>;
  filter?: InputMaybe<InvoicePaymentFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<InvoicePaymentOrderBy>>;
};


export type BookInvoicesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<InvoiceCondition>;
  filter?: InputMaybe<InvoiceFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<InvoiceOrderBy>>;
};


export type BookItemBundlesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ItemBundleCondition>;
  filter?: InputMaybe<ItemBundleFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ItemBundleOrderBy>>;
};


export type BookJournalEntriesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<JournalEntryCondition>;
  filter?: InputMaybe<JournalEntryFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<JournalEntryOrderBy>>;
};


export type BookLoansArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<LoanCondition>;
  filter?: InputMaybe<LoanFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LoanOrderBy>>;
};


export type BookMileageLogsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<MileageLogCondition>;
  filter?: InputMaybe<MileageLogFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MileageLogOrderBy>>;
};


export type BookNetWorthSnapshotsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<NetWorthSnapshotCondition>;
  filter?: InputMaybe<NetWorthSnapshotFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<NetWorthSnapshotOrderBy>>;
};


export type BookPayrollConnectionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PayrollConnectionCondition>;
  filter?: InputMaybe<PayrollConnectionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PayrollConnectionOrderBy>>;
};


export type BookPriceLevelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PriceLevelCondition>;
  filter?: InputMaybe<PriceLevelFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PriceLevelOrderBy>>;
};


export type BookProjectsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ProjectCondition>;
  filter?: InputMaybe<ProjectFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProjectOrderBy>>;
};


export type BookPurchaseOrdersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PurchaseOrderCondition>;
  filter?: InputMaybe<PurchaseOrderFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PurchaseOrderOrderBy>>;
};


export type BookRdExpensesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<RdExpenseCondition>;
  filter?: InputMaybe<RdExpenseFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RdExpenseOrderBy>>;
};


export type BookReconciliationQueuesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ReconciliationQueueCondition>;
  filter?: InputMaybe<ReconciliationQueueFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ReconciliationQueueOrderBy>>;
};


export type BookReconciliationStatementsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ReconciliationStatementCondition>;
  filter?: InputMaybe<ReconciliationStatementFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ReconciliationStatementOrderBy>>;
};


export type BookRecurringInvoicesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<RecurringInvoiceCondition>;
  filter?: InputMaybe<RecurringInvoiceFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RecurringInvoiceOrderBy>>;
};


export type BookRecurringTransactionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<RecurringTransactionCondition>;
  filter?: InputMaybe<RecurringTransactionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RecurringTransactionOrderBy>>;
};


export type BookSavedReportsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SavedReportCondition>;
  filter?: InputMaybe<SavedReportFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SavedReportOrderBy>>;
};


export type BookSavingsGoalsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SavingsGoalCondition>;
  filter?: InputMaybe<SavingsGoalFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SavingsGoalOrderBy>>;
};


export type BookTagGroupsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TagGroupCondition>;
  filter?: InputMaybe<TagGroupFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TagGroupOrderBy>>;
};


export type BookTaxJurisdictionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TaxJurisdictionCondition>;
  filter?: InputMaybe<TaxJurisdictionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TaxJurisdictionOrderBy>>;
};


export type BookTimeEntriesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TimeEntryCondition>;
  filter?: InputMaybe<TimeEntryFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TimeEntryOrderBy>>;
};


export type BookTrackingCategoriesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TrackingCategoryCondition>;
  filter?: InputMaybe<TrackingCategoryFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TrackingCategoryOrderBy>>;
};


export type BookVehiclesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<VehicleCondition>;
  filter?: InputMaybe<VehicleFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<VehicleOrderBy>>;
};


export type BookVendorCreditsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<VendorCreditCondition>;
  filter?: InputMaybe<VendorCreditFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<VendorCreditOrderBy>>;
};


export type BookVendorsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<VendorCondition>;
  filter?: InputMaybe<VendorFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<VendorOrderBy>>;
};

export type BookAccess = Node & {
  __typename?: 'BookAccess';
  /** Reads a single `Book` that is related to this `BookAccess`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  invitedAt?: Maybe<Scalars['Datetime']['output']>;
  invitedBy?: Maybe<Scalars['String']['output']>;
  role: Scalars['String']['output'];
  rowId: Scalars['UUID']['output'];
  userId: Scalars['String']['output'];
};

/**
 * A condition to be used against `BookAccess` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type BookAccessCondition = {
  /** Checks for equality with the object’s `bookId` field. */
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `BookAccess` values. */
export type BookAccessConnection = {
  __typename?: 'BookAccessConnection';
  /** A list of edges which contains the `BookAccess` and cursor to aid in pagination. */
  edges: Array<Maybe<BookAccessEdge>>;
  /** A list of `BookAccess` objects. */
  nodes: Array<Maybe<BookAccess>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `BookAccess` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `BookAccess` edge in the connection. */
export type BookAccessEdge = {
  __typename?: 'BookAccessEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `BookAccess` at the end of the edge. */
  node?: Maybe<BookAccess>;
};

/** A filter to be used against `BookAccess` object types. All fields are combined with a logical ‘and.’ */
export type BookAccessFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<BookAccessFilter>>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<BookAccessFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<BookAccessFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `userId` field. */
  userId?: InputMaybe<StringFilter>;
};

/** Methods to use when ordering `BookAccess`. */
export enum BookAccessOrderBy {
  BookIdAsc = 'BOOK_ID_ASC',
  BookIdDesc = 'BOOK_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

/** A condition to be used against `Book` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type BookCondition = {
  /** Checks for equality with the object’s `organizationId` field. */
  organizationId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `Book` values. */
export type BookConnection = {
  __typename?: 'BookConnection';
  /** A list of edges which contains the `Book` and cursor to aid in pagination. */
  edges: Array<Maybe<BookEdge>>;
  /** A list of `Book` objects. */
  nodes: Array<Maybe<Book>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Book` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Book` edge in the connection. */
export type BookEdge = {
  __typename?: 'BookEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Book` at the end of the edge. */
  node?: Maybe<Book>;
};

/** A filter to be used against `Book` object types. All fields are combined with a logical ‘and.’ */
export type BookFilter = {
  /** Filter by the object’s `accountMappings` relation. */
  accountMappings?: InputMaybe<BookToManyAccountMappingFilter>;
  /** Some related `accountMappings` exist. */
  accountMappingsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `accountingPeriods` relation. */
  accountingPeriods?: InputMaybe<BookToManyAccountingPeriodFilter>;
  /** Some related `accountingPeriods` exist. */
  accountingPeriodsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `accounts` relation. */
  accounts?: InputMaybe<BookToManyAccountFilter>;
  /** Some related `accounts` exist. */
  accountsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<BookFilter>>;
  /** Filter by the object’s `attachments` relation. */
  attachments?: InputMaybe<BookToManyAttachmentFilter>;
  /** Some related `attachments` exist. */
  attachmentsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `bankDeposits` relation. */
  bankDeposits?: InputMaybe<BookToManyBankDepositFilter>;
  /** Some related `bankDeposits` exist. */
  bankDepositsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `billPayments` relation. */
  billPayments?: InputMaybe<BookToManyBillPaymentFilter>;
  /** Some related `billPayments` exist. */
  billPaymentsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `bills` relation. */
  bills?: InputMaybe<BookToManyBillFilter>;
  /** Some related `bills` exist. */
  billsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `bookAccesses` relation. */
  bookAccesses?: InputMaybe<BookToManyBookAccessFilter>;
  /** Some related `bookAccesses` exist. */
  bookAccessesExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `budgets` relation. */
  budgets?: InputMaybe<BookToManyBudgetFilter>;
  /** Some related `budgets` exist. */
  budgetsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `categorizationRules` relation. */
  categorizationRules?: InputMaybe<BookToManyCategorizationRuleFilter>;
  /** Some related `categorizationRules` exist. */
  categorizationRulesExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `connectedAccounts` relation. */
  connectedAccounts?: InputMaybe<BookToManyConnectedAccountFilter>;
  /** Some related `connectedAccounts` exist. */
  connectedAccountsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `creditMemos` relation. */
  creditMemos?: InputMaybe<BookToManyCreditMemoFilter>;
  /** Some related `creditMemos` exist. */
  creditMemosExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `cryptoAssets` relation. */
  cryptoAssets?: InputMaybe<BookToManyCryptoAssetFilter>;
  /** Some related `cryptoAssets` exist. */
  cryptoAssetsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `customFieldDefinitions` relation. */
  customFieldDefinitions?: InputMaybe<BookToManyCustomFieldDefinitionFilter>;
  /** Some related `customFieldDefinitions` exist. */
  customFieldDefinitionsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `customFieldValues` relation. */
  customFieldValues?: InputMaybe<BookToManyCustomFieldValueFilter>;
  /** Some related `customFieldValues` exist. */
  customFieldValuesExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `customers` relation. */
  customers?: InputMaybe<BookToManyCustomerFilter>;
  /** Some related `customers` exist. */
  customersExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `documents` relation. */
  documents?: InputMaybe<BookToManyDocumentFilter>;
  /** Some related `documents` exist. */
  documentsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `estimates` relation. */
  estimates?: InputMaybe<BookToManyEstimateFilter>;
  /** Some related `estimates` exist. */
  estimatesExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `fixedAssets` relation. */
  fixedAssets?: InputMaybe<BookToManyFixedAssetFilter>;
  /** Some related `fixedAssets` exist. */
  fixedAssetsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `formTemplates` relation. */
  formTemplates?: InputMaybe<BookToManyFormTemplateFilter>;
  /** Some related `formTemplates` exist. */
  formTemplatesExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `inventoryItems` relation. */
  inventoryItems?: InputMaybe<BookToManyInventoryItemFilter>;
  /** Some related `inventoryItems` exist. */
  inventoryItemsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `inventoryTransactions` relation. */
  inventoryTransactions?: InputMaybe<BookToManyInventoryTransactionFilter>;
  /** Some related `inventoryTransactions` exist. */
  inventoryTransactionsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `invoicePayments` relation. */
  invoicePayments?: InputMaybe<BookToManyInvoicePaymentFilter>;
  /** Some related `invoicePayments` exist. */
  invoicePaymentsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `invoices` relation. */
  invoices?: InputMaybe<BookToManyInvoiceFilter>;
  /** Some related `invoices` exist. */
  invoicesExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `itemBundles` relation. */
  itemBundles?: InputMaybe<BookToManyItemBundleFilter>;
  /** Some related `itemBundles` exist. */
  itemBundlesExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `journalEntries` relation. */
  journalEntries?: InputMaybe<BookToManyJournalEntryFilter>;
  /** Some related `journalEntries` exist. */
  journalEntriesExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `loans` relation. */
  loans?: InputMaybe<BookToManyLoanFilter>;
  /** Some related `loans` exist. */
  loansExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `mileageLogs` relation. */
  mileageLogs?: InputMaybe<BookToManyMileageLogFilter>;
  /** Some related `mileageLogs` exist. */
  mileageLogsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `netWorthSnapshots` relation. */
  netWorthSnapshots?: InputMaybe<BookToManyNetWorthSnapshotFilter>;
  /** Some related `netWorthSnapshots` exist. */
  netWorthSnapshotsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Negates the expression. */
  not?: InputMaybe<BookFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<BookFilter>>;
  /** Filter by the object’s `organizationId` field. */
  organizationId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `payrollConnections` relation. */
  payrollConnections?: InputMaybe<BookToManyPayrollConnectionFilter>;
  /** Some related `payrollConnections` exist. */
  payrollConnectionsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `priceLevels` relation. */
  priceLevels?: InputMaybe<BookToManyPriceLevelFilter>;
  /** Some related `priceLevels` exist. */
  priceLevelsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `projects` relation. */
  projects?: InputMaybe<BookToManyProjectFilter>;
  /** Some related `projects` exist. */
  projectsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `purchaseOrders` relation. */
  purchaseOrders?: InputMaybe<BookToManyPurchaseOrderFilter>;
  /** Some related `purchaseOrders` exist. */
  purchaseOrdersExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `rdExpenses` relation. */
  rdExpenses?: InputMaybe<BookToManyRdExpenseFilter>;
  /** Some related `rdExpenses` exist. */
  rdExpensesExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `reconciliationQueues` relation. */
  reconciliationQueues?: InputMaybe<BookToManyReconciliationQueueFilter>;
  /** Some related `reconciliationQueues` exist. */
  reconciliationQueuesExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `reconciliationStatements` relation. */
  reconciliationStatements?: InputMaybe<BookToManyReconciliationStatementFilter>;
  /** Some related `reconciliationStatements` exist. */
  reconciliationStatementsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `recurringInvoices` relation. */
  recurringInvoices?: InputMaybe<BookToManyRecurringInvoiceFilter>;
  /** Some related `recurringInvoices` exist. */
  recurringInvoicesExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `recurringTransactions` relation. */
  recurringTransactions?: InputMaybe<BookToManyRecurringTransactionFilter>;
  /** Some related `recurringTransactions` exist. */
  recurringTransactionsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `savedReports` relation. */
  savedReports?: InputMaybe<BookToManySavedReportFilter>;
  /** Some related `savedReports` exist. */
  savedReportsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `savingsGoals` relation. */
  savingsGoals?: InputMaybe<BookToManySavingsGoalFilter>;
  /** Some related `savingsGoals` exist. */
  savingsGoalsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `tagGroups` relation. */
  tagGroups?: InputMaybe<BookToManyTagGroupFilter>;
  /** Some related `tagGroups` exist. */
  tagGroupsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `taxJurisdictions` relation. */
  taxJurisdictions?: InputMaybe<BookToManyTaxJurisdictionFilter>;
  /** Some related `taxJurisdictions` exist. */
  taxJurisdictionsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `timeEntries` relation. */
  timeEntries?: InputMaybe<BookToManyTimeEntryFilter>;
  /** Some related `timeEntries` exist. */
  timeEntriesExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `trackingCategories` relation. */
  trackingCategories?: InputMaybe<BookToManyTrackingCategoryFilter>;
  /** Some related `trackingCategories` exist. */
  trackingCategoriesExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `vehicles` relation. */
  vehicles?: InputMaybe<BookToManyVehicleFilter>;
  /** Some related `vehicles` exist. */
  vehiclesExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `vendorCredits` relation. */
  vendorCredits?: InputMaybe<BookToManyVendorCreditFilter>;
  /** Some related `vendorCredits` exist. */
  vendorCreditsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `vendors` relation. */
  vendors?: InputMaybe<BookToManyVendorFilter>;
  /** Some related `vendors` exist. */
  vendorsExist?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Methods to use when ordering `Book`. */
export enum BookOrderBy {
  Natural = 'NATURAL',
  OrganizationIdAsc = 'ORGANIZATION_ID_ASC',
  OrganizationIdDesc = 'ORGANIZATION_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

/** A filter to be used against many `Account` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyAccountFilter = {
  /** Every related `Account` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<AccountFilter>;
  /** No related `Account` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<AccountFilter>;
  /** Some related `Account` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<AccountFilter>;
};

/** A filter to be used against many `AccountMapping` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyAccountMappingFilter = {
  /** Every related `AccountMapping` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<AccountMappingFilter>;
  /** No related `AccountMapping` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<AccountMappingFilter>;
  /** Some related `AccountMapping` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<AccountMappingFilter>;
};

/** A filter to be used against many `AccountingPeriod` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyAccountingPeriodFilter = {
  /** Every related `AccountingPeriod` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<AccountingPeriodFilter>;
  /** No related `AccountingPeriod` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<AccountingPeriodFilter>;
  /** Some related `AccountingPeriod` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<AccountingPeriodFilter>;
};

/** A filter to be used against many `Attachment` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyAttachmentFilter = {
  /** Every related `Attachment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<AttachmentFilter>;
  /** No related `Attachment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<AttachmentFilter>;
  /** Some related `Attachment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<AttachmentFilter>;
};

/** A filter to be used against many `BankDeposit` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyBankDepositFilter = {
  /** Every related `BankDeposit` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<BankDepositFilter>;
  /** No related `BankDeposit` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<BankDepositFilter>;
  /** Some related `BankDeposit` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<BankDepositFilter>;
};

/** A filter to be used against many `Bill` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyBillFilter = {
  /** Every related `Bill` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<BillFilter>;
  /** No related `Bill` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<BillFilter>;
  /** Some related `Bill` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<BillFilter>;
};

/** A filter to be used against many `BillPayment` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyBillPaymentFilter = {
  /** Every related `BillPayment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<BillPaymentFilter>;
  /** No related `BillPayment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<BillPaymentFilter>;
  /** Some related `BillPayment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<BillPaymentFilter>;
};

/** A filter to be used against many `BookAccess` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyBookAccessFilter = {
  /** Every related `BookAccess` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<BookAccessFilter>;
  /** No related `BookAccess` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<BookAccessFilter>;
  /** Some related `BookAccess` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<BookAccessFilter>;
};

/** A filter to be used against many `Budget` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyBudgetFilter = {
  /** Every related `Budget` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<BudgetFilter>;
  /** No related `Budget` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<BudgetFilter>;
  /** Some related `Budget` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<BudgetFilter>;
};

/** A filter to be used against many `CategorizationRule` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyCategorizationRuleFilter = {
  /** Every related `CategorizationRule` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<CategorizationRuleFilter>;
  /** No related `CategorizationRule` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<CategorizationRuleFilter>;
  /** Some related `CategorizationRule` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<CategorizationRuleFilter>;
};

/** A filter to be used against many `ConnectedAccount` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyConnectedAccountFilter = {
  /** Every related `ConnectedAccount` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<ConnectedAccountFilter>;
  /** No related `ConnectedAccount` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<ConnectedAccountFilter>;
  /** Some related `ConnectedAccount` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<ConnectedAccountFilter>;
};

/** A filter to be used against many `CreditMemo` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyCreditMemoFilter = {
  /** Every related `CreditMemo` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<CreditMemoFilter>;
  /** No related `CreditMemo` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<CreditMemoFilter>;
  /** Some related `CreditMemo` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<CreditMemoFilter>;
};

/** A filter to be used against many `CryptoAsset` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyCryptoAssetFilter = {
  /** Every related `CryptoAsset` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<CryptoAssetFilter>;
  /** No related `CryptoAsset` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<CryptoAssetFilter>;
  /** Some related `CryptoAsset` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<CryptoAssetFilter>;
};

/** A filter to be used against many `CustomFieldDefinition` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyCustomFieldDefinitionFilter = {
  /** Every related `CustomFieldDefinition` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<CustomFieldDefinitionFilter>;
  /** No related `CustomFieldDefinition` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<CustomFieldDefinitionFilter>;
  /** Some related `CustomFieldDefinition` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<CustomFieldDefinitionFilter>;
};

/** A filter to be used against many `CustomFieldValue` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyCustomFieldValueFilter = {
  /** Every related `CustomFieldValue` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<CustomFieldValueFilter>;
  /** No related `CustomFieldValue` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<CustomFieldValueFilter>;
  /** Some related `CustomFieldValue` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<CustomFieldValueFilter>;
};

/** A filter to be used against many `Customer` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyCustomerFilter = {
  /** Every related `Customer` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<CustomerFilter>;
  /** No related `Customer` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<CustomerFilter>;
  /** Some related `Customer` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<CustomerFilter>;
};

/** A filter to be used against many `Document` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyDocumentFilter = {
  /** Every related `Document` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<DocumentFilter>;
  /** No related `Document` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<DocumentFilter>;
  /** Some related `Document` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<DocumentFilter>;
};

/** A filter to be used against many `Estimate` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyEstimateFilter = {
  /** Every related `Estimate` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<EstimateFilter>;
  /** No related `Estimate` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<EstimateFilter>;
  /** Some related `Estimate` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<EstimateFilter>;
};

/** A filter to be used against many `FixedAsset` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyFixedAssetFilter = {
  /** Every related `FixedAsset` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<FixedAssetFilter>;
  /** No related `FixedAsset` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<FixedAssetFilter>;
  /** Some related `FixedAsset` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<FixedAssetFilter>;
};

/** A filter to be used against many `FormTemplate` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyFormTemplateFilter = {
  /** Every related `FormTemplate` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<FormTemplateFilter>;
  /** No related `FormTemplate` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<FormTemplateFilter>;
  /** Some related `FormTemplate` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<FormTemplateFilter>;
};

/** A filter to be used against many `InventoryItem` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyInventoryItemFilter = {
  /** Every related `InventoryItem` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<InventoryItemFilter>;
  /** No related `InventoryItem` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<InventoryItemFilter>;
  /** Some related `InventoryItem` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<InventoryItemFilter>;
};

/** A filter to be used against many `InventoryTransaction` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyInventoryTransactionFilter = {
  /** Every related `InventoryTransaction` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<InventoryTransactionFilter>;
  /** No related `InventoryTransaction` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<InventoryTransactionFilter>;
  /** Some related `InventoryTransaction` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<InventoryTransactionFilter>;
};

/** A filter to be used against many `Invoice` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyInvoiceFilter = {
  /** Every related `Invoice` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<InvoiceFilter>;
  /** No related `Invoice` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<InvoiceFilter>;
  /** Some related `Invoice` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<InvoiceFilter>;
};

/** A filter to be used against many `InvoicePayment` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyInvoicePaymentFilter = {
  /** Every related `InvoicePayment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<InvoicePaymentFilter>;
  /** No related `InvoicePayment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<InvoicePaymentFilter>;
  /** Some related `InvoicePayment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<InvoicePaymentFilter>;
};

/** A filter to be used against many `ItemBundle` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyItemBundleFilter = {
  /** Every related `ItemBundle` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<ItemBundleFilter>;
  /** No related `ItemBundle` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<ItemBundleFilter>;
  /** Some related `ItemBundle` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<ItemBundleFilter>;
};

/** A filter to be used against many `JournalEntry` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyJournalEntryFilter = {
  /** Every related `JournalEntry` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<JournalEntryFilter>;
  /** No related `JournalEntry` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<JournalEntryFilter>;
  /** Some related `JournalEntry` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<JournalEntryFilter>;
};

/** A filter to be used against many `Loan` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyLoanFilter = {
  /** Every related `Loan` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<LoanFilter>;
  /** No related `Loan` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<LoanFilter>;
  /** Some related `Loan` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<LoanFilter>;
};

/** A filter to be used against many `MileageLog` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyMileageLogFilter = {
  /** Every related `MileageLog` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<MileageLogFilter>;
  /** No related `MileageLog` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<MileageLogFilter>;
  /** Some related `MileageLog` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<MileageLogFilter>;
};

/** A filter to be used against many `NetWorthSnapshot` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyNetWorthSnapshotFilter = {
  /** Every related `NetWorthSnapshot` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<NetWorthSnapshotFilter>;
  /** No related `NetWorthSnapshot` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<NetWorthSnapshotFilter>;
  /** Some related `NetWorthSnapshot` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<NetWorthSnapshotFilter>;
};

/** A filter to be used against many `PayrollConnection` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyPayrollConnectionFilter = {
  /** Every related `PayrollConnection` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<PayrollConnectionFilter>;
  /** No related `PayrollConnection` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<PayrollConnectionFilter>;
  /** Some related `PayrollConnection` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<PayrollConnectionFilter>;
};

/** A filter to be used against many `PriceLevel` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyPriceLevelFilter = {
  /** Every related `PriceLevel` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<PriceLevelFilter>;
  /** No related `PriceLevel` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<PriceLevelFilter>;
  /** Some related `PriceLevel` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<PriceLevelFilter>;
};

/** A filter to be used against many `Project` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyProjectFilter = {
  /** Every related `Project` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<ProjectFilter>;
  /** No related `Project` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<ProjectFilter>;
  /** Some related `Project` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<ProjectFilter>;
};

/** A filter to be used against many `PurchaseOrder` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyPurchaseOrderFilter = {
  /** Every related `PurchaseOrder` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<PurchaseOrderFilter>;
  /** No related `PurchaseOrder` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<PurchaseOrderFilter>;
  /** Some related `PurchaseOrder` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<PurchaseOrderFilter>;
};

/** A filter to be used against many `RdExpense` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyRdExpenseFilter = {
  /** Every related `RdExpense` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<RdExpenseFilter>;
  /** No related `RdExpense` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<RdExpenseFilter>;
  /** Some related `RdExpense` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<RdExpenseFilter>;
};

/** A filter to be used against many `ReconciliationQueue` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyReconciliationQueueFilter = {
  /** Every related `ReconciliationQueue` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<ReconciliationQueueFilter>;
  /** No related `ReconciliationQueue` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<ReconciliationQueueFilter>;
  /** Some related `ReconciliationQueue` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<ReconciliationQueueFilter>;
};

/** A filter to be used against many `ReconciliationStatement` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyReconciliationStatementFilter = {
  /** Every related `ReconciliationStatement` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<ReconciliationStatementFilter>;
  /** No related `ReconciliationStatement` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<ReconciliationStatementFilter>;
  /** Some related `ReconciliationStatement` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<ReconciliationStatementFilter>;
};

/** A filter to be used against many `RecurringInvoice` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyRecurringInvoiceFilter = {
  /** Every related `RecurringInvoice` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<RecurringInvoiceFilter>;
  /** No related `RecurringInvoice` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<RecurringInvoiceFilter>;
  /** Some related `RecurringInvoice` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<RecurringInvoiceFilter>;
};

/** A filter to be used against many `RecurringTransaction` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyRecurringTransactionFilter = {
  /** Every related `RecurringTransaction` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<RecurringTransactionFilter>;
  /** No related `RecurringTransaction` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<RecurringTransactionFilter>;
  /** Some related `RecurringTransaction` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<RecurringTransactionFilter>;
};

/** A filter to be used against many `SavedReport` object types. All fields are combined with a logical ‘and.’ */
export type BookToManySavedReportFilter = {
  /** Every related `SavedReport` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<SavedReportFilter>;
  /** No related `SavedReport` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<SavedReportFilter>;
  /** Some related `SavedReport` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<SavedReportFilter>;
};

/** A filter to be used against many `SavingsGoal` object types. All fields are combined with a logical ‘and.’ */
export type BookToManySavingsGoalFilter = {
  /** Every related `SavingsGoal` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<SavingsGoalFilter>;
  /** No related `SavingsGoal` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<SavingsGoalFilter>;
  /** Some related `SavingsGoal` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<SavingsGoalFilter>;
};

/** A filter to be used against many `TagGroup` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyTagGroupFilter = {
  /** Every related `TagGroup` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<TagGroupFilter>;
  /** No related `TagGroup` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<TagGroupFilter>;
  /** Some related `TagGroup` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<TagGroupFilter>;
};

/** A filter to be used against many `TaxJurisdiction` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyTaxJurisdictionFilter = {
  /** Every related `TaxJurisdiction` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<TaxJurisdictionFilter>;
  /** No related `TaxJurisdiction` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<TaxJurisdictionFilter>;
  /** Some related `TaxJurisdiction` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<TaxJurisdictionFilter>;
};

/** A filter to be used against many `TimeEntry` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyTimeEntryFilter = {
  /** Every related `TimeEntry` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<TimeEntryFilter>;
  /** No related `TimeEntry` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<TimeEntryFilter>;
  /** Some related `TimeEntry` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<TimeEntryFilter>;
};

/** A filter to be used against many `TrackingCategory` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyTrackingCategoryFilter = {
  /** Every related `TrackingCategory` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<TrackingCategoryFilter>;
  /** No related `TrackingCategory` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<TrackingCategoryFilter>;
  /** Some related `TrackingCategory` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<TrackingCategoryFilter>;
};

/** A filter to be used against many `Vehicle` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyVehicleFilter = {
  /** Every related `Vehicle` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<VehicleFilter>;
  /** No related `Vehicle` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<VehicleFilter>;
  /** Some related `Vehicle` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<VehicleFilter>;
};

/** A filter to be used against many `VendorCredit` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyVendorCreditFilter = {
  /** Every related `VendorCredit` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<VendorCreditFilter>;
  /** No related `VendorCredit` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<VendorCreditFilter>;
  /** Some related `VendorCredit` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<VendorCreditFilter>;
};

/** A filter to be used against many `Vendor` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyVendorFilter = {
  /** Every related `Vendor` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<VendorFilter>;
  /** No related `Vendor` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<VendorFilter>;
  /** Some related `Vendor` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<VendorFilter>;
};

export type Budget = Node & {
  __typename?: 'Budget';
  /** Reads a single `Account` that is related to this `Budget`. */
  account?: Maybe<Account>;
  accountId: Scalars['UUID']['output'];
  amount: Scalars['BigFloat']['output'];
  /** Reads a single `Book` that is related to this `Budget`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  period: BudgetPeriod;
  rollover: Scalars['Boolean']['output'];
  rowId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
};

/** A condition to be used against `Budget` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type BudgetCondition = {
  /** Checks for equality with the object’s `accountId` field. */
  accountId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `bookId` field. */
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `Budget` values. */
export type BudgetConnection = {
  __typename?: 'BudgetConnection';
  /** A list of edges which contains the `Budget` and cursor to aid in pagination. */
  edges: Array<Maybe<BudgetEdge>>;
  /** A list of `Budget` objects. */
  nodes: Array<Maybe<Budget>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Budget` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Budget` edge in the connection. */
export type BudgetEdge = {
  __typename?: 'BudgetEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Budget` at the end of the edge. */
  node?: Maybe<Budget>;
};

/** A filter to be used against `Budget` object types. All fields are combined with a logical ‘and.’ */
export type BudgetFilter = {
  /** Filter by the object’s `account` relation. */
  account?: InputMaybe<AccountFilter>;
  /** Filter by the object’s `accountId` field. */
  accountId?: InputMaybe<UuidFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<BudgetFilter>>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<BudgetFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<BudgetFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
};

/** Methods to use when ordering `Budget`. */
export enum BudgetOrderBy {
  AccountIdAsc = 'ACCOUNT_ID_ASC',
  AccountIdDesc = 'ACCOUNT_ID_DESC',
  BookIdAsc = 'BOOK_ID_ASC',
  BookIdDesc = 'BOOK_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

export enum BudgetPeriod {
  Monthly = 'monthly',
  Quarterly = 'quarterly',
  Yearly = 'yearly'
}

export type BundleComponent = Node & {
  __typename?: 'BundleComponent';
  /** Reads a single `ItemBundle` that is related to this `BundleComponent`. */
  bundle?: Maybe<ItemBundle>;
  bundleId: Scalars['UUID']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  /** Reads a single `InventoryItem` that is related to this `BundleComponent`. */
  inventoryItem?: Maybe<InventoryItem>;
  inventoryItemId: Scalars['UUID']['output'];
  quantity: Scalars['BigFloat']['output'];
  rowId: Scalars['UUID']['output'];
};

/**
 * A condition to be used against `BundleComponent` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type BundleComponentCondition = {
  /** Checks for equality with the object’s `bundleId` field. */
  bundleId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `BundleComponent` values. */
export type BundleComponentConnection = {
  __typename?: 'BundleComponentConnection';
  /** A list of edges which contains the `BundleComponent` and cursor to aid in pagination. */
  edges: Array<Maybe<BundleComponentEdge>>;
  /** A list of `BundleComponent` objects. */
  nodes: Array<Maybe<BundleComponent>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `BundleComponent` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `BundleComponent` edge in the connection. */
export type BundleComponentEdge = {
  __typename?: 'BundleComponentEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `BundleComponent` at the end of the edge. */
  node?: Maybe<BundleComponent>;
};

/** A filter to be used against `BundleComponent` object types. All fields are combined with a logical ‘and.’ */
export type BundleComponentFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<BundleComponentFilter>>;
  /** Filter by the object’s `bundle` relation. */
  bundle?: InputMaybe<ItemBundleFilter>;
  /** Filter by the object’s `bundleId` field. */
  bundleId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `inventoryItem` relation. */
  inventoryItem?: InputMaybe<InventoryItemFilter>;
  /** Negates the expression. */
  not?: InputMaybe<BundleComponentFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<BundleComponentFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
};

/** Methods to use when ordering `BundleComponent`. */
export enum BundleComponentOrderBy {
  BundleIdAsc = 'BUNDLE_ID_ASC',
  BundleIdDesc = 'BUNDLE_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

export type CategorizationRule = Node & {
  __typename?: 'CategorizationRule';
  amountMax?: Maybe<Scalars['BigFloat']['output']>;
  amountMin?: Maybe<Scalars['BigFloat']['output']>;
  /** Reads a single `Book` that is related to this `CategorizationRule`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  /** Reads and enables pagination through a set of `CategorizationRuleSplit`. */
  categorizationRuleSplitsByRuleId: CategorizationRuleSplitConnection;
  confidence: Scalars['BigFloat']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads a single `Account` that is related to this `CategorizationRule`. */
  creditAccount?: Maybe<Account>;
  creditAccountId: Scalars['UUID']['output'];
  /** Reads a single `Account` that is related to this `CategorizationRule`. */
  debitAccount?: Maybe<Account>;
  debitAccountId: Scalars['UUID']['output'];
  hitCount: Scalars['Int']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  lastHitAt?: Maybe<Scalars['Datetime']['output']>;
  matchField: Scalars['String']['output'];
  matchType: Scalars['String']['output'];
  matchValue: Scalars['String']['output'];
  name: Scalars['String']['output'];
  priority: Scalars['Int']['output'];
  /** Reads a single `Project` that is related to this `CategorizationRule`. */
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars['UUID']['output']>;
  rowId: Scalars['UUID']['output'];
  /** Reads a single `Tag` that is related to this `CategorizationRule`. */
  tag?: Maybe<Tag>;
  tagId?: Maybe<Scalars['UUID']['output']>;
};


export type CategorizationRuleCategorizationRuleSplitsByRuleIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<CategorizationRuleSplitCondition>;
  filter?: InputMaybe<CategorizationRuleSplitFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CategorizationRuleSplitOrderBy>>;
};

/**
 * A condition to be used against `CategorizationRule` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type CategorizationRuleCondition = {
  /** Checks for equality with the object’s `bookId` field. */
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `matchField` field. */
  matchField?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `CategorizationRule` values. */
export type CategorizationRuleConnection = {
  __typename?: 'CategorizationRuleConnection';
  /** A list of edges which contains the `CategorizationRule` and cursor to aid in pagination. */
  edges: Array<Maybe<CategorizationRuleEdge>>;
  /** A list of `CategorizationRule` objects. */
  nodes: Array<Maybe<CategorizationRule>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CategorizationRule` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `CategorizationRule` edge in the connection. */
export type CategorizationRuleEdge = {
  __typename?: 'CategorizationRuleEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `CategorizationRule` at the end of the edge. */
  node?: Maybe<CategorizationRule>;
};

/** A filter to be used against `CategorizationRule` object types. All fields are combined with a logical ‘and.’ */
export type CategorizationRuleFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<CategorizationRuleFilter>>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `categorizationRuleSplitsByRuleId` relation. */
  categorizationRuleSplitsByRuleId?: InputMaybe<CategorizationRuleToManyCategorizationRuleSplitFilter>;
  /** Some related `categorizationRuleSplitsByRuleId` exist. */
  categorizationRuleSplitsByRuleIdExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `creditAccount` relation. */
  creditAccount?: InputMaybe<AccountFilter>;
  /** Filter by the object’s `debitAccount` relation. */
  debitAccount?: InputMaybe<AccountFilter>;
  /** Filter by the object’s `matchField` field. */
  matchField?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<CategorizationRuleFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<CategorizationRuleFilter>>;
  /** Filter by the object’s `project` relation. */
  project?: InputMaybe<ProjectFilter>;
  /** A related `project` exists. */
  projectExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `tag` relation. */
  tag?: InputMaybe<TagFilter>;
  /** A related `tag` exists. */
  tagExists?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Methods to use when ordering `CategorizationRule`. */
export enum CategorizationRuleOrderBy {
  BookIdAsc = 'BOOK_ID_ASC',
  BookIdDesc = 'BOOK_ID_DESC',
  MatchFieldAsc = 'MATCH_FIELD_ASC',
  MatchFieldDesc = 'MATCH_FIELD_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

export type CategorizationRuleSplit = Node & {
  __typename?: 'CategorizationRuleSplit';
  /** Reads a single `Account` that is related to this `CategorizationRuleSplit`. */
  account?: Maybe<Account>;
  accountId: Scalars['UUID']['output'];
  fixedAmount?: Maybe<Scalars['BigFloat']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  memo?: Maybe<Scalars['String']['output']>;
  percentage?: Maybe<Scalars['BigFloat']['output']>;
  /** Reads a single `Project` that is related to this `CategorizationRuleSplit`. */
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars['UUID']['output']>;
  rowId: Scalars['UUID']['output'];
  /** Reads a single `CategorizationRule` that is related to this `CategorizationRuleSplit`. */
  rule?: Maybe<CategorizationRule>;
  ruleId: Scalars['UUID']['output'];
  side: Scalars['String']['output'];
  sortOrder: Scalars['Int']['output'];
  /** Reads a single `Tag` that is related to this `CategorizationRuleSplit`. */
  tag?: Maybe<Tag>;
  tagId?: Maybe<Scalars['UUID']['output']>;
};

/**
 * A condition to be used against `CategorizationRuleSplit` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type CategorizationRuleSplitCondition = {
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `ruleId` field. */
  ruleId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `CategorizationRuleSplit` values. */
export type CategorizationRuleSplitConnection = {
  __typename?: 'CategorizationRuleSplitConnection';
  /** A list of edges which contains the `CategorizationRuleSplit` and cursor to aid in pagination. */
  edges: Array<Maybe<CategorizationRuleSplitEdge>>;
  /** A list of `CategorizationRuleSplit` objects. */
  nodes: Array<Maybe<CategorizationRuleSplit>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CategorizationRuleSplit` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `CategorizationRuleSplit` edge in the connection. */
export type CategorizationRuleSplitEdge = {
  __typename?: 'CategorizationRuleSplitEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `CategorizationRuleSplit` at the end of the edge. */
  node?: Maybe<CategorizationRuleSplit>;
};

/** A filter to be used against `CategorizationRuleSplit` object types. All fields are combined with a logical ‘and.’ */
export type CategorizationRuleSplitFilter = {
  /** Filter by the object’s `account` relation. */
  account?: InputMaybe<AccountFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<CategorizationRuleSplitFilter>>;
  /** Negates the expression. */
  not?: InputMaybe<CategorizationRuleSplitFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<CategorizationRuleSplitFilter>>;
  /** Filter by the object’s `project` relation. */
  project?: InputMaybe<ProjectFilter>;
  /** A related `project` exists. */
  projectExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `rule` relation. */
  rule?: InputMaybe<CategorizationRuleFilter>;
  /** Filter by the object’s `ruleId` field. */
  ruleId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `tag` relation. */
  tag?: InputMaybe<TagFilter>;
  /** A related `tag` exists. */
  tagExists?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Methods to use when ordering `CategorizationRuleSplit`. */
export enum CategorizationRuleSplitOrderBy {
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  RuleIdAsc = 'RULE_ID_ASC',
  RuleIdDesc = 'RULE_ID_DESC'
}

/** A filter to be used against many `CategorizationRuleSplit` object types. All fields are combined with a logical ‘and.’ */
export type CategorizationRuleToManyCategorizationRuleSplitFilter = {
  /** Every related `CategorizationRuleSplit` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<CategorizationRuleSplitFilter>;
  /** No related `CategorizationRuleSplit` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<CategorizationRuleSplitFilter>;
  /** Some related `CategorizationRuleSplit` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<CategorizationRuleSplitFilter>;
};

export type ConnectedAccount = Node & {
  __typename?: 'ConnectedAccount';
  accessToken?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Account` that is related to this `ConnectedAccount`. */
  account?: Maybe<Account>;
  accountId?: Maybe<Scalars['UUID']['output']>;
  /** Reads a single `Book` that is related to this `ConnectedAccount`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  institutionName?: Maybe<Scalars['String']['output']>;
  lastSyncedAt?: Maybe<Scalars['Datetime']['output']>;
  mask?: Maybe<Scalars['String']['output']>;
  provider: Scalars['String']['output'];
  providerAccountId?: Maybe<Scalars['String']['output']>;
  rowId: Scalars['UUID']['output'];
  status: Scalars['String']['output'];
  syncCursor?: Maybe<Scalars['String']['output']>;
};

/**
 * A condition to be used against `ConnectedAccount` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type ConnectedAccountCondition = {
  /** Checks for equality with the object’s `bookId` field. */
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `provider` field. */
  provider?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `ConnectedAccount` values. */
export type ConnectedAccountConnection = {
  __typename?: 'ConnectedAccountConnection';
  /** A list of edges which contains the `ConnectedAccount` and cursor to aid in pagination. */
  edges: Array<Maybe<ConnectedAccountEdge>>;
  /** A list of `ConnectedAccount` objects. */
  nodes: Array<Maybe<ConnectedAccount>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `ConnectedAccount` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `ConnectedAccount` edge in the connection. */
export type ConnectedAccountEdge = {
  __typename?: 'ConnectedAccountEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `ConnectedAccount` at the end of the edge. */
  node?: Maybe<ConnectedAccount>;
};

/** A filter to be used against `ConnectedAccount` object types. All fields are combined with a logical ‘and.’ */
export type ConnectedAccountFilter = {
  /** Filter by the object’s `account` relation. */
  account?: InputMaybe<AccountFilter>;
  /** A related `account` exists. */
  accountExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<ConnectedAccountFilter>>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<ConnectedAccountFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ConnectedAccountFilter>>;
  /** Filter by the object’s `provider` field. */
  provider?: InputMaybe<StringFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
};

/** Methods to use when ordering `ConnectedAccount`. */
export enum ConnectedAccountOrderBy {
  BookIdAsc = 'BOOK_ID_ASC',
  BookIdDesc = 'BOOK_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProviderAsc = 'PROVIDER_ASC',
  ProviderDesc = 'PROVIDER_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

export enum CostBasisMethod {
  Acb = 'acb',
  Fifo = 'fifo',
  Hifo = 'hifo',
  Lifo = 'lifo'
}

export type CreditMemo = Node & {
  __typename?: 'CreditMemo';
  amountApplied: Scalars['BigFloat']['output'];
  /** Reads a single `Book` that is related to this `CreditMemo`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads and enables pagination through a set of `CreditMemoApplication`. */
  creditMemoApplications: CreditMemoApplicationConnection;
  /** Reads and enables pagination through a set of `CreditMemoLine`. */
  creditMemoLines: CreditMemoLineConnection;
  currency: Scalars['String']['output'];
  /** Reads a single `Customer` that is related to this `CreditMemo`. */
  customer?: Maybe<Customer>;
  customerId: Scalars['UUID']['output'];
  date: Scalars['String']['output'];
  exchangeRate: Scalars['BigFloat']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  /** Reads a single `JournalEntry` that is related to this `CreditMemo`. */
  journalEntry?: Maybe<JournalEntry>;
  journalEntryId?: Maybe<Scalars['UUID']['output']>;
  memo?: Maybe<Scalars['String']['output']>;
  number: Scalars['String']['output'];
  rowId: Scalars['UUID']['output'];
  status: Scalars['String']['output'];
  subtotal: Scalars['BigFloat']['output'];
  taxAmount: Scalars['BigFloat']['output'];
  total: Scalars['BigFloat']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
};


export type CreditMemoCreditMemoApplicationsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<CreditMemoApplicationCondition>;
  filter?: InputMaybe<CreditMemoApplicationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CreditMemoApplicationOrderBy>>;
};


export type CreditMemoCreditMemoLinesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<CreditMemoLineCondition>;
  filter?: InputMaybe<CreditMemoLineFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CreditMemoLineOrderBy>>;
};

export type CreditMemoApplication = Node & {
  __typename?: 'CreditMemoApplication';
  amount: Scalars['BigFloat']['output'];
  /** Reads a single `Book` that is related to this `CreditMemoApplication`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads a single `CreditMemo` that is related to this `CreditMemoApplication`. */
  creditMemo?: Maybe<CreditMemo>;
  creditMemoId: Scalars['UUID']['output'];
  date: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  /** Reads a single `Invoice` that is related to this `CreditMemoApplication`. */
  invoice?: Maybe<Invoice>;
  invoiceId: Scalars['UUID']['output'];
  rowId: Scalars['UUID']['output'];
};

/**
 * A condition to be used against `CreditMemoApplication` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type CreditMemoApplicationCondition = {
  /** Checks for equality with the object’s `creditMemoId` field. */
  creditMemoId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `invoiceId` field. */
  invoiceId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `CreditMemoApplication` values. */
export type CreditMemoApplicationConnection = {
  __typename?: 'CreditMemoApplicationConnection';
  /** A list of edges which contains the `CreditMemoApplication` and cursor to aid in pagination. */
  edges: Array<Maybe<CreditMemoApplicationEdge>>;
  /** A list of `CreditMemoApplication` objects. */
  nodes: Array<Maybe<CreditMemoApplication>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CreditMemoApplication` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `CreditMemoApplication` edge in the connection. */
export type CreditMemoApplicationEdge = {
  __typename?: 'CreditMemoApplicationEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `CreditMemoApplication` at the end of the edge. */
  node?: Maybe<CreditMemoApplication>;
};

/** A filter to be used against `CreditMemoApplication` object types. All fields are combined with a logical ‘and.’ */
export type CreditMemoApplicationFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<CreditMemoApplicationFilter>>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `creditMemo` relation. */
  creditMemo?: InputMaybe<CreditMemoFilter>;
  /** Filter by the object’s `creditMemoId` field. */
  creditMemoId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `invoice` relation. */
  invoice?: InputMaybe<InvoiceFilter>;
  /** Filter by the object’s `invoiceId` field. */
  invoiceId?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<CreditMemoApplicationFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<CreditMemoApplicationFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
};

/** Methods to use when ordering `CreditMemoApplication`. */
export enum CreditMemoApplicationOrderBy {
  CreditMemoIdAsc = 'CREDIT_MEMO_ID_ASC',
  CreditMemoIdDesc = 'CREDIT_MEMO_ID_DESC',
  InvoiceIdAsc = 'INVOICE_ID_ASC',
  InvoiceIdDesc = 'INVOICE_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

/**
 * A condition to be used against `CreditMemo` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type CreditMemoCondition = {
  /** Checks for equality with the object’s `bookId` field. */
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `customerId` field. */
  customerId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `number` field. */
  number?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `CreditMemo` values. */
export type CreditMemoConnection = {
  __typename?: 'CreditMemoConnection';
  /** A list of edges which contains the `CreditMemo` and cursor to aid in pagination. */
  edges: Array<Maybe<CreditMemoEdge>>;
  /** A list of `CreditMemo` objects. */
  nodes: Array<Maybe<CreditMemo>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CreditMemo` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `CreditMemo` edge in the connection. */
export type CreditMemoEdge = {
  __typename?: 'CreditMemoEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `CreditMemo` at the end of the edge. */
  node?: Maybe<CreditMemo>;
};

/** A filter to be used against `CreditMemo` object types. All fields are combined with a logical ‘and.’ */
export type CreditMemoFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<CreditMemoFilter>>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `creditMemoApplications` relation. */
  creditMemoApplications?: InputMaybe<CreditMemoToManyCreditMemoApplicationFilter>;
  /** Some related `creditMemoApplications` exist. */
  creditMemoApplicationsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `creditMemoLines` relation. */
  creditMemoLines?: InputMaybe<CreditMemoToManyCreditMemoLineFilter>;
  /** Some related `creditMemoLines` exist. */
  creditMemoLinesExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `customer` relation. */
  customer?: InputMaybe<CustomerFilter>;
  /** Filter by the object’s `customerId` field. */
  customerId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `journalEntry` relation. */
  journalEntry?: InputMaybe<JournalEntryFilter>;
  /** A related `journalEntry` exists. */
  journalEntryExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Negates the expression. */
  not?: InputMaybe<CreditMemoFilter>;
  /** Filter by the object’s `number` field. */
  number?: InputMaybe<StringFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<CreditMemoFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `status` field. */
  status?: InputMaybe<StringFilter>;
};

export type CreditMemoLine = Node & {
  __typename?: 'CreditMemoLine';
  amount: Scalars['BigFloat']['output'];
  /** Reads a single `CreditMemo` that is related to this `CreditMemoLine`. */
  creditMemo?: Maybe<CreditMemo>;
  creditMemoId: Scalars['UUID']['output'];
  description: Scalars['String']['output'];
  discountPercent?: Maybe<Scalars['BigFloat']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  /** Reads a single `Account` that is related to this `CreditMemoLine`. */
  incomeAccount?: Maybe<Account>;
  incomeAccountId: Scalars['UUID']['output'];
  /** Reads a single `InventoryItem` that is related to this `CreditMemoLine`. */
  inventoryItem?: Maybe<InventoryItem>;
  inventoryItemId?: Maybe<Scalars['UUID']['output']>;
  quantity: Scalars['BigFloat']['output'];
  rowId: Scalars['UUID']['output'];
  sortOrder: Scalars['Int']['output'];
  /** Reads a single `TaxJurisdiction` that is related to this `CreditMemoLine`. */
  taxJurisdiction?: Maybe<TaxJurisdiction>;
  taxJurisdictionId?: Maybe<Scalars['UUID']['output']>;
  unitPrice: Scalars['BigFloat']['output'];
};

/**
 * A condition to be used against `CreditMemoLine` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type CreditMemoLineCondition = {
  /** Checks for equality with the object’s `creditMemoId` field. */
  creditMemoId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `CreditMemoLine` values. */
export type CreditMemoLineConnection = {
  __typename?: 'CreditMemoLineConnection';
  /** A list of edges which contains the `CreditMemoLine` and cursor to aid in pagination. */
  edges: Array<Maybe<CreditMemoLineEdge>>;
  /** A list of `CreditMemoLine` objects. */
  nodes: Array<Maybe<CreditMemoLine>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CreditMemoLine` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `CreditMemoLine` edge in the connection. */
export type CreditMemoLineEdge = {
  __typename?: 'CreditMemoLineEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `CreditMemoLine` at the end of the edge. */
  node?: Maybe<CreditMemoLine>;
};

/** A filter to be used against `CreditMemoLine` object types. All fields are combined with a logical ‘and.’ */
export type CreditMemoLineFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<CreditMemoLineFilter>>;
  /** Filter by the object’s `creditMemo` relation. */
  creditMemo?: InputMaybe<CreditMemoFilter>;
  /** Filter by the object’s `creditMemoId` field. */
  creditMemoId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `incomeAccount` relation. */
  incomeAccount?: InputMaybe<AccountFilter>;
  /** Filter by the object’s `inventoryItem` relation. */
  inventoryItem?: InputMaybe<InventoryItemFilter>;
  /** A related `inventoryItem` exists. */
  inventoryItemExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Negates the expression. */
  not?: InputMaybe<CreditMemoLineFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<CreditMemoLineFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `taxJurisdiction` relation. */
  taxJurisdiction?: InputMaybe<TaxJurisdictionFilter>;
  /** A related `taxJurisdiction` exists. */
  taxJurisdictionExists?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Methods to use when ordering `CreditMemoLine`. */
export enum CreditMemoLineOrderBy {
  CreditMemoIdAsc = 'CREDIT_MEMO_ID_ASC',
  CreditMemoIdDesc = 'CREDIT_MEMO_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

/** Methods to use when ordering `CreditMemo`. */
export enum CreditMemoOrderBy {
  BookIdAsc = 'BOOK_ID_ASC',
  BookIdDesc = 'BOOK_ID_DESC',
  CustomerIdAsc = 'CUSTOMER_ID_ASC',
  CustomerIdDesc = 'CUSTOMER_ID_DESC',
  Natural = 'NATURAL',
  NumberAsc = 'NUMBER_ASC',
  NumberDesc = 'NUMBER_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC'
}

/** A filter to be used against many `CreditMemoApplication` object types. All fields are combined with a logical ‘and.’ */
export type CreditMemoToManyCreditMemoApplicationFilter = {
  /** Every related `CreditMemoApplication` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<CreditMemoApplicationFilter>;
  /** No related `CreditMemoApplication` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<CreditMemoApplicationFilter>;
  /** Some related `CreditMemoApplication` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<CreditMemoApplicationFilter>;
};

/** A filter to be used against many `CreditMemoLine` object types. All fields are combined with a logical ‘and.’ */
export type CreditMemoToManyCreditMemoLineFilter = {
  /** Every related `CreditMemoLine` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<CreditMemoLineFilter>;
  /** No related `CreditMemoLine` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<CreditMemoLineFilter>;
  /** Some related `CreditMemoLine` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<CreditMemoLineFilter>;
};

export type CryptoAsset = Node & {
  __typename?: 'CryptoAsset';
  balance: Scalars['BigFloat']['output'];
  /** Reads a single `Book` that is related to this `CryptoAsset`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  costBasisMethod: CostBasisMethod;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads and enables pagination through a set of `CryptoLot`. */
  cryptoLots: CryptoLotConnection;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  lastSyncedAt?: Maybe<Scalars['Datetime']['output']>;
  name: Scalars['String']['output'];
  network?: Maybe<Scalars['String']['output']>;
  rowId: Scalars['UUID']['output'];
  symbol: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  walletAddress?: Maybe<Scalars['String']['output']>;
};


export type CryptoAssetCryptoLotsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<CryptoLotCondition>;
  filter?: InputMaybe<CryptoLotFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CryptoLotOrderBy>>;
};

/**
 * A condition to be used against `CryptoAsset` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type CryptoAssetCondition = {
  /** Checks for equality with the object’s `bookId` field. */
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `symbol` field. */
  symbol?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `CryptoAsset` values. */
export type CryptoAssetConnection = {
  __typename?: 'CryptoAssetConnection';
  /** A list of edges which contains the `CryptoAsset` and cursor to aid in pagination. */
  edges: Array<Maybe<CryptoAssetEdge>>;
  /** A list of `CryptoAsset` objects. */
  nodes: Array<Maybe<CryptoAsset>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CryptoAsset` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `CryptoAsset` edge in the connection. */
export type CryptoAssetEdge = {
  __typename?: 'CryptoAssetEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `CryptoAsset` at the end of the edge. */
  node?: Maybe<CryptoAsset>;
};

/** A filter to be used against `CryptoAsset` object types. All fields are combined with a logical ‘and.’ */
export type CryptoAssetFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<CryptoAssetFilter>>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `cryptoLots` relation. */
  cryptoLots?: InputMaybe<CryptoAssetToManyCryptoLotFilter>;
  /** Some related `cryptoLots` exist. */
  cryptoLotsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Negates the expression. */
  not?: InputMaybe<CryptoAssetFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<CryptoAssetFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `symbol` field. */
  symbol?: InputMaybe<StringFilter>;
};

/** Methods to use when ordering `CryptoAsset`. */
export enum CryptoAssetOrderBy {
  BookIdAsc = 'BOOK_ID_ASC',
  BookIdDesc = 'BOOK_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  SymbolAsc = 'SYMBOL_ASC',
  SymbolDesc = 'SYMBOL_DESC'
}

/** A filter to be used against many `CryptoLot` object types. All fields are combined with a logical ‘and.’ */
export type CryptoAssetToManyCryptoLotFilter = {
  /** Every related `CryptoLot` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<CryptoLotFilter>;
  /** No related `CryptoLot` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<CryptoLotFilter>;
  /** Some related `CryptoLot` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<CryptoLotFilter>;
};

export type CryptoLot = Node & {
  __typename?: 'CryptoLot';
  acquiredAt: Scalars['Datetime']['output'];
  costPerUnit: Scalars['BigFloat']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads a single `CryptoAsset` that is related to this `CryptoLot`. */
  cryptoAsset?: Maybe<CryptoAsset>;
  cryptoAssetId: Scalars['UUID']['output'];
  disposedAt?: Maybe<Scalars['Datetime']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  /** Reads a single `JournalEntry` that is related to this `CryptoLot`. */
  journalEntry?: Maybe<JournalEntry>;
  journalEntryId?: Maybe<Scalars['UUID']['output']>;
  proceedsPerUnit?: Maybe<Scalars['BigFloat']['output']>;
  quantity: Scalars['BigFloat']['output'];
  remainingQuantity: Scalars['BigFloat']['output'];
  rowId: Scalars['UUID']['output'];
};

/**
 * A condition to be used against `CryptoLot` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type CryptoLotCondition = {
  /** Checks for equality with the object’s `cryptoAssetId` field. */
  cryptoAssetId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `CryptoLot` values. */
export type CryptoLotConnection = {
  __typename?: 'CryptoLotConnection';
  /** A list of edges which contains the `CryptoLot` and cursor to aid in pagination. */
  edges: Array<Maybe<CryptoLotEdge>>;
  /** A list of `CryptoLot` objects. */
  nodes: Array<Maybe<CryptoLot>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CryptoLot` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `CryptoLot` edge in the connection. */
export type CryptoLotEdge = {
  __typename?: 'CryptoLotEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `CryptoLot` at the end of the edge. */
  node?: Maybe<CryptoLot>;
};

/** A filter to be used against `CryptoLot` object types. All fields are combined with a logical ‘and.’ */
export type CryptoLotFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<CryptoLotFilter>>;
  /** Filter by the object’s `cryptoAsset` relation. */
  cryptoAsset?: InputMaybe<CryptoAssetFilter>;
  /** Filter by the object’s `cryptoAssetId` field. */
  cryptoAssetId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `journalEntry` relation. */
  journalEntry?: InputMaybe<JournalEntryFilter>;
  /** A related `journalEntry` exists. */
  journalEntryExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Negates the expression. */
  not?: InputMaybe<CryptoLotFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<CryptoLotFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
};

/** Methods to use when ordering `CryptoLot`. */
export enum CryptoLotOrderBy {
  CryptoAssetIdAsc = 'CRYPTO_ASSET_ID_ASC',
  CryptoAssetIdDesc = 'CRYPTO_ASSET_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

export type CustomFieldDefinition = Node & {
  __typename?: 'CustomFieldDefinition';
  /** Reads a single `Book` that is related to this `CustomFieldDefinition`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads and enables pagination through a set of `CustomFieldValue`. */
  customFieldValuesByDefinitionId: CustomFieldValueConnection;
  entityType: Scalars['String']['output'];
  fieldType: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  label: Scalars['String']['output'];
  position: Scalars['Int']['output'];
  rowId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
};


export type CustomFieldDefinitionCustomFieldValuesByDefinitionIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<CustomFieldValueCondition>;
  filter?: InputMaybe<CustomFieldValueFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CustomFieldValueOrderBy>>;
};

/**
 * A condition to be used against `CustomFieldDefinition` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type CustomFieldDefinitionCondition = {
  /** Checks for equality with the object’s `bookId` field. */
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `entityType` field. */
  entityType?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `CustomFieldDefinition` values. */
export type CustomFieldDefinitionConnection = {
  __typename?: 'CustomFieldDefinitionConnection';
  /** A list of edges which contains the `CustomFieldDefinition` and cursor to aid in pagination. */
  edges: Array<Maybe<CustomFieldDefinitionEdge>>;
  /** A list of `CustomFieldDefinition` objects. */
  nodes: Array<Maybe<CustomFieldDefinition>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CustomFieldDefinition` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `CustomFieldDefinition` edge in the connection. */
export type CustomFieldDefinitionEdge = {
  __typename?: 'CustomFieldDefinitionEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `CustomFieldDefinition` at the end of the edge. */
  node?: Maybe<CustomFieldDefinition>;
};

/** A filter to be used against `CustomFieldDefinition` object types. All fields are combined with a logical ‘and.’ */
export type CustomFieldDefinitionFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<CustomFieldDefinitionFilter>>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `customFieldValuesByDefinitionId` relation. */
  customFieldValuesByDefinitionId?: InputMaybe<CustomFieldDefinitionToManyCustomFieldValueFilter>;
  /** Some related `customFieldValuesByDefinitionId` exist. */
  customFieldValuesByDefinitionIdExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `entityType` field. */
  entityType?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<CustomFieldDefinitionFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<CustomFieldDefinitionFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
};

/** Methods to use when ordering `CustomFieldDefinition`. */
export enum CustomFieldDefinitionOrderBy {
  BookIdAsc = 'BOOK_ID_ASC',
  BookIdDesc = 'BOOK_ID_DESC',
  EntityTypeAsc = 'ENTITY_TYPE_ASC',
  EntityTypeDesc = 'ENTITY_TYPE_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

/** A filter to be used against many `CustomFieldValue` object types. All fields are combined with a logical ‘and.’ */
export type CustomFieldDefinitionToManyCustomFieldValueFilter = {
  /** Every related `CustomFieldValue` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<CustomFieldValueFilter>;
  /** No related `CustomFieldValue` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<CustomFieldValueFilter>;
  /** Some related `CustomFieldValue` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<CustomFieldValueFilter>;
};

export type CustomFieldValue = Node & {
  __typename?: 'CustomFieldValue';
  /** Reads a single `Book` that is related to this `CustomFieldValue`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads a single `CustomFieldDefinition` that is related to this `CustomFieldValue`. */
  definition?: Maybe<CustomFieldDefinition>;
  definitionId: Scalars['UUID']['output'];
  entityId: Scalars['UUID']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  rowId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/**
 * A condition to be used against `CustomFieldValue` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type CustomFieldValueCondition = {
  /** Checks for equality with the object’s `bookId` field. */
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `definitionId` field. */
  definitionId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `entityId` field. */
  entityId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `CustomFieldValue` values. */
export type CustomFieldValueConnection = {
  __typename?: 'CustomFieldValueConnection';
  /** A list of edges which contains the `CustomFieldValue` and cursor to aid in pagination. */
  edges: Array<Maybe<CustomFieldValueEdge>>;
  /** A list of `CustomFieldValue` objects. */
  nodes: Array<Maybe<CustomFieldValue>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CustomFieldValue` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `CustomFieldValue` edge in the connection. */
export type CustomFieldValueEdge = {
  __typename?: 'CustomFieldValueEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `CustomFieldValue` at the end of the edge. */
  node?: Maybe<CustomFieldValue>;
};

/** A filter to be used against `CustomFieldValue` object types. All fields are combined with a logical ‘and.’ */
export type CustomFieldValueFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<CustomFieldValueFilter>>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `definition` relation. */
  definition?: InputMaybe<CustomFieldDefinitionFilter>;
  /** Filter by the object’s `definitionId` field. */
  definitionId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `entityId` field. */
  entityId?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<CustomFieldValueFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<CustomFieldValueFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
};

/** Methods to use when ordering `CustomFieldValue`. */
export enum CustomFieldValueOrderBy {
  BookIdAsc = 'BOOK_ID_ASC',
  BookIdDesc = 'BOOK_ID_DESC',
  DefinitionIdAsc = 'DEFINITION_ID_ASC',
  DefinitionIdDesc = 'DEFINITION_ID_DESC',
  EntityIdAsc = 'ENTITY_ID_ASC',
  EntityIdDesc = 'ENTITY_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

export type Customer = Node & {
  __typename?: 'Customer';
  address?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Book` that is related to this `Customer`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  businessName?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads and enables pagination through a set of `CreditMemo`. */
  creditMemos: CreditMemoConnection;
  email?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `Estimate`. */
  estimates: EstimateConnection;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  /** Reads and enables pagination through a set of `Invoice`. */
  invoices: InvoiceConnection;
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  /** Reads a single `PriceLevel` that is related to this `Customer`. */
  priceLevel?: Maybe<PriceLevel>;
  priceLevelId?: Maybe<Scalars['UUID']['output']>;
  /** Reads and enables pagination through a set of `RecurringInvoice`. */
  recurringInvoices: RecurringInvoiceConnection;
  rowId: Scalars['UUID']['output'];
  state?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `TimeEntry`. */
  timeEntries: TimeEntryConnection;
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  zip?: Maybe<Scalars['String']['output']>;
};


export type CustomerCreditMemosArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<CreditMemoCondition>;
  filter?: InputMaybe<CreditMemoFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CreditMemoOrderBy>>;
};


export type CustomerEstimatesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<EstimateCondition>;
  filter?: InputMaybe<EstimateFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EstimateOrderBy>>;
};


export type CustomerInvoicesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<InvoiceCondition>;
  filter?: InputMaybe<InvoiceFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<InvoiceOrderBy>>;
};


export type CustomerRecurringInvoicesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<RecurringInvoiceCondition>;
  filter?: InputMaybe<RecurringInvoiceFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RecurringInvoiceOrderBy>>;
};


export type CustomerTimeEntriesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TimeEntryCondition>;
  filter?: InputMaybe<TimeEntryFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TimeEntryOrderBy>>;
};

/**
 * A condition to be used against `Customer` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type CustomerCondition = {
  /** Checks for equality with the object’s `bookId` field. */
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `Customer` values. */
export type CustomerConnection = {
  __typename?: 'CustomerConnection';
  /** A list of edges which contains the `Customer` and cursor to aid in pagination. */
  edges: Array<Maybe<CustomerEdge>>;
  /** A list of `Customer` objects. */
  nodes: Array<Maybe<Customer>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Customer` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Customer` edge in the connection. */
export type CustomerEdge = {
  __typename?: 'CustomerEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Customer` at the end of the edge. */
  node?: Maybe<Customer>;
};

/** A filter to be used against `Customer` object types. All fields are combined with a logical ‘and.’ */
export type CustomerFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<CustomerFilter>>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `creditMemos` relation. */
  creditMemos?: InputMaybe<CustomerToManyCreditMemoFilter>;
  /** Some related `creditMemos` exist. */
  creditMemosExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `estimates` relation. */
  estimates?: InputMaybe<CustomerToManyEstimateFilter>;
  /** Some related `estimates` exist. */
  estimatesExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `invoices` relation. */
  invoices?: InputMaybe<CustomerToManyInvoiceFilter>;
  /** Some related `invoices` exist. */
  invoicesExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Negates the expression. */
  not?: InputMaybe<CustomerFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<CustomerFilter>>;
  /** Filter by the object’s `priceLevel` relation. */
  priceLevel?: InputMaybe<PriceLevelFilter>;
  /** A related `priceLevel` exists. */
  priceLevelExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `recurringInvoices` relation. */
  recurringInvoices?: InputMaybe<CustomerToManyRecurringInvoiceFilter>;
  /** Some related `recurringInvoices` exist. */
  recurringInvoicesExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `timeEntries` relation. */
  timeEntries?: InputMaybe<CustomerToManyTimeEntryFilter>;
  /** Some related `timeEntries` exist. */
  timeEntriesExist?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Methods to use when ordering `Customer`. */
export enum CustomerOrderBy {
  BookIdAsc = 'BOOK_ID_ASC',
  BookIdDesc = 'BOOK_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

/** A filter to be used against many `CreditMemo` object types. All fields are combined with a logical ‘and.’ */
export type CustomerToManyCreditMemoFilter = {
  /** Every related `CreditMemo` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<CreditMemoFilter>;
  /** No related `CreditMemo` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<CreditMemoFilter>;
  /** Some related `CreditMemo` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<CreditMemoFilter>;
};

/** A filter to be used against many `Estimate` object types. All fields are combined with a logical ‘and.’ */
export type CustomerToManyEstimateFilter = {
  /** Every related `Estimate` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<EstimateFilter>;
  /** No related `Estimate` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<EstimateFilter>;
  /** Some related `Estimate` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<EstimateFilter>;
};

/** A filter to be used against many `Invoice` object types. All fields are combined with a logical ‘and.’ */
export type CustomerToManyInvoiceFilter = {
  /** Every related `Invoice` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<InvoiceFilter>;
  /** No related `Invoice` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<InvoiceFilter>;
  /** Some related `Invoice` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<InvoiceFilter>;
};

/** A filter to be used against many `RecurringInvoice` object types. All fields are combined with a logical ‘and.’ */
export type CustomerToManyRecurringInvoiceFilter = {
  /** Every related `RecurringInvoice` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<RecurringInvoiceFilter>;
  /** No related `RecurringInvoice` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<RecurringInvoiceFilter>;
  /** Some related `RecurringInvoice` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<RecurringInvoiceFilter>;
};

/** A filter to be used against many `TimeEntry` object types. All fields are combined with a logical ‘and.’ */
export type CustomerToManyTimeEntryFilter = {
  /** Every related `TimeEntry` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<TimeEntryFilter>;
  /** No related `TimeEntry` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<TimeEntryFilter>;
  /** Some related `TimeEntry` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<TimeEntryFilter>;
};

/** A filter to be used against Datetime fields. All fields are combined with a logical ‘and.’ */
export type DatetimeFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Datetime']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Datetime']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Datetime']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Datetime']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Datetime']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Datetime']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Datetime']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Datetime']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Datetime']['input']>>;
};

export type Document = Node & {
  __typename?: 'Document';
  /** Reads a single `Book` that is related to this `Document`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  category: Scalars['String']['output'];
  contentType: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  createdBy: Scalars['String']['output'];
  filename: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  rowId: Scalars['UUID']['output'];
  sizeBytes: Scalars['Int']['output'];
  storageKey: Scalars['String']['output'];
  /** Reads a single `Vendor` that is related to this `Document`. */
  vendor?: Maybe<Vendor>;
  vendorId?: Maybe<Scalars['UUID']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

/**
 * A condition to be used against `Document` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type DocumentCondition = {
  /** Checks for equality with the object’s `bookId` field. */
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `category` field. */
  category?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `vendorId` field. */
  vendorId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `Document` values. */
export type DocumentConnection = {
  __typename?: 'DocumentConnection';
  /** A list of edges which contains the `Document` and cursor to aid in pagination. */
  edges: Array<Maybe<DocumentEdge>>;
  /** A list of `Document` objects. */
  nodes: Array<Maybe<Document>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Document` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Document` edge in the connection. */
export type DocumentEdge = {
  __typename?: 'DocumentEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Document` at the end of the edge. */
  node?: Maybe<Document>;
};

/** A filter to be used against `Document` object types. All fields are combined with a logical ‘and.’ */
export type DocumentFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<DocumentFilter>>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `category` field. */
  category?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<DocumentFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<DocumentFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `vendor` relation. */
  vendor?: InputMaybe<VendorFilter>;
  /** A related `vendor` exists. */
  vendorExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `vendorId` field. */
  vendorId?: InputMaybe<UuidFilter>;
};

/** Methods to use when ordering `Document`. */
export enum DocumentOrderBy {
  BookIdAsc = 'BOOK_ID_ASC',
  BookIdDesc = 'BOOK_ID_DESC',
  CategoryAsc = 'CATEGORY_ASC',
  CategoryDesc = 'CATEGORY_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  VendorIdAsc = 'VENDOR_ID_ASC',
  VendorIdDesc = 'VENDOR_ID_DESC'
}

export type Estimate = Node & {
  __typename?: 'Estimate';
  /** Reads a single `Book` that is related to this `Estimate`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  /** Reads a single `Invoice` that is related to this `Estimate`. */
  convertedInvoice?: Maybe<Invoice>;
  convertedInvoiceId?: Maybe<Scalars['UUID']['output']>;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads a single `Customer` that is related to this `Estimate`. */
  customer?: Maybe<Customer>;
  customerId: Scalars['UUID']['output'];
  estimateDate: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `EstimateLine`. */
  estimateLines: EstimateLineConnection;
  expiryDate?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  memo?: Maybe<Scalars['String']['output']>;
  number: Scalars['String']['output'];
  rowId: Scalars['UUID']['output'];
  status: Scalars['String']['output'];
  subtotal: Scalars['BigFloat']['output'];
  terms?: Maybe<Scalars['String']['output']>;
  total: Scalars['BigFloat']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
};


export type EstimateEstimateLinesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<EstimateLineCondition>;
  filter?: InputMaybe<EstimateLineFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EstimateLineOrderBy>>;
};

/**
 * A condition to be used against `Estimate` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type EstimateCondition = {
  /** Checks for equality with the object’s `bookId` field. */
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `customerId` field. */
  customerId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `number` field. */
  number?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `Estimate` values. */
export type EstimateConnection = {
  __typename?: 'EstimateConnection';
  /** A list of edges which contains the `Estimate` and cursor to aid in pagination. */
  edges: Array<Maybe<EstimateEdge>>;
  /** A list of `Estimate` objects. */
  nodes: Array<Maybe<Estimate>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Estimate` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Estimate` edge in the connection. */
export type EstimateEdge = {
  __typename?: 'EstimateEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Estimate` at the end of the edge. */
  node?: Maybe<Estimate>;
};

/** A filter to be used against `Estimate` object types. All fields are combined with a logical ‘and.’ */
export type EstimateFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<EstimateFilter>>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `convertedInvoice` relation. */
  convertedInvoice?: InputMaybe<InvoiceFilter>;
  /** A related `convertedInvoice` exists. */
  convertedInvoiceExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `customer` relation. */
  customer?: InputMaybe<CustomerFilter>;
  /** Filter by the object’s `customerId` field. */
  customerId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `estimateLines` relation. */
  estimateLines?: InputMaybe<EstimateToManyEstimateLineFilter>;
  /** Some related `estimateLines` exist. */
  estimateLinesExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Negates the expression. */
  not?: InputMaybe<EstimateFilter>;
  /** Filter by the object’s `number` field. */
  number?: InputMaybe<StringFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<EstimateFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `status` field. */
  status?: InputMaybe<StringFilter>;
};

export type EstimateLine = Node & {
  __typename?: 'EstimateLine';
  amount: Scalars['BigFloat']['output'];
  billedAmount: Scalars['BigFloat']['output'];
  description: Scalars['String']['output'];
  /** Reads a single `Estimate` that is related to this `EstimateLine`. */
  estimate?: Maybe<Estimate>;
  estimateId: Scalars['UUID']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  /** Reads a single `Account` that is related to this `EstimateLine`. */
  incomeAccount?: Maybe<Account>;
  incomeAccountId: Scalars['UUID']['output'];
  quantity: Scalars['BigFloat']['output'];
  rowId: Scalars['UUID']['output'];
  sortOrder: Scalars['Int']['output'];
  /** Reads a single `TaxJurisdiction` that is related to this `EstimateLine`. */
  taxJurisdiction?: Maybe<TaxJurisdiction>;
  taxJurisdictionId?: Maybe<Scalars['UUID']['output']>;
  unitPrice: Scalars['BigFloat']['output'];
};

/**
 * A condition to be used against `EstimateLine` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type EstimateLineCondition = {
  /** Checks for equality with the object’s `estimateId` field. */
  estimateId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `EstimateLine` values. */
export type EstimateLineConnection = {
  __typename?: 'EstimateLineConnection';
  /** A list of edges which contains the `EstimateLine` and cursor to aid in pagination. */
  edges: Array<Maybe<EstimateLineEdge>>;
  /** A list of `EstimateLine` objects. */
  nodes: Array<Maybe<EstimateLine>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `EstimateLine` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `EstimateLine` edge in the connection. */
export type EstimateLineEdge = {
  __typename?: 'EstimateLineEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `EstimateLine` at the end of the edge. */
  node?: Maybe<EstimateLine>;
};

/** A filter to be used against `EstimateLine` object types. All fields are combined with a logical ‘and.’ */
export type EstimateLineFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<EstimateLineFilter>>;
  /** Filter by the object’s `estimate` relation. */
  estimate?: InputMaybe<EstimateFilter>;
  /** Filter by the object’s `estimateId` field. */
  estimateId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `incomeAccount` relation. */
  incomeAccount?: InputMaybe<AccountFilter>;
  /** Negates the expression. */
  not?: InputMaybe<EstimateLineFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<EstimateLineFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `taxJurisdiction` relation. */
  taxJurisdiction?: InputMaybe<TaxJurisdictionFilter>;
  /** A related `taxJurisdiction` exists. */
  taxJurisdictionExists?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Methods to use when ordering `EstimateLine`. */
export enum EstimateLineOrderBy {
  EstimateIdAsc = 'ESTIMATE_ID_ASC',
  EstimateIdDesc = 'ESTIMATE_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

/** Methods to use when ordering `Estimate`. */
export enum EstimateOrderBy {
  BookIdAsc = 'BOOK_ID_ASC',
  BookIdDesc = 'BOOK_ID_DESC',
  CustomerIdAsc = 'CUSTOMER_ID_ASC',
  CustomerIdDesc = 'CUSTOMER_ID_DESC',
  Natural = 'NATURAL',
  NumberAsc = 'NUMBER_ASC',
  NumberDesc = 'NUMBER_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC'
}

/** A filter to be used against many `EstimateLine` object types. All fields are combined with a logical ‘and.’ */
export type EstimateToManyEstimateLineFilter = {
  /** Every related `EstimateLine` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<EstimateLineFilter>;
  /** No related `EstimateLine` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<EstimateLineFilter>;
  /** Some related `EstimateLine` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<EstimateLineFilter>;
};

export type FixedAsset = Node & {
  __typename?: 'FixedAsset';
  /** Reads a single `Account` that is related to this `FixedAsset`. */
  accumulatedDepreciationAccount?: Maybe<Account>;
  accumulatedDepreciationAccountId: Scalars['UUID']['output'];
  acquisitionCost: Scalars['BigFloat']['output'];
  acquisitionDate: Scalars['String']['output'];
  /** Reads a single `Account` that is related to this `FixedAsset`. */
  assetAccount?: Maybe<Account>;
  assetAccountId: Scalars['UUID']['output'];
  /** Reads a single `Book` that is related to this `FixedAsset`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads a single `Account` that is related to this `FixedAsset`. */
  depreciationExpenseAccount?: Maybe<Account>;
  depreciationExpenseAccountId: Scalars['UUID']['output'];
  depreciationMethod: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  disposalProceeds?: Maybe<Scalars['BigFloat']['output']>;
  disposedAt?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  macrsClass?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  rowId: Scalars['UUID']['output'];
  salvageValue: Scalars['BigFloat']['output'];
  usefulLifeMonths: Scalars['Int']['output'];
};

/**
 * A condition to be used against `FixedAsset` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type FixedAssetCondition = {
  /** Checks for equality with the object’s `bookId` field. */
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `disposedAt` field. */
  disposedAt?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `FixedAsset` values. */
export type FixedAssetConnection = {
  __typename?: 'FixedAssetConnection';
  /** A list of edges which contains the `FixedAsset` and cursor to aid in pagination. */
  edges: Array<Maybe<FixedAssetEdge>>;
  /** A list of `FixedAsset` objects. */
  nodes: Array<Maybe<FixedAsset>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `FixedAsset` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `FixedAsset` edge in the connection. */
export type FixedAssetEdge = {
  __typename?: 'FixedAssetEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `FixedAsset` at the end of the edge. */
  node?: Maybe<FixedAsset>;
};

/** A filter to be used against `FixedAsset` object types. All fields are combined with a logical ‘and.’ */
export type FixedAssetFilter = {
  /** Filter by the object’s `accumulatedDepreciationAccount` relation. */
  accumulatedDepreciationAccount?: InputMaybe<AccountFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<FixedAssetFilter>>;
  /** Filter by the object’s `assetAccount` relation. */
  assetAccount?: InputMaybe<AccountFilter>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `depreciationExpenseAccount` relation. */
  depreciationExpenseAccount?: InputMaybe<AccountFilter>;
  /** Filter by the object’s `disposedAt` field. */
  disposedAt?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<FixedAssetFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<FixedAssetFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
};

/** Methods to use when ordering `FixedAsset`. */
export enum FixedAssetOrderBy {
  BookIdAsc = 'BOOK_ID_ASC',
  BookIdDesc = 'BOOK_ID_DESC',
  DisposedAtAsc = 'DISPOSED_AT_ASC',
  DisposedAtDesc = 'DISPOSED_AT_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

export type FormTemplate = Node & {
  __typename?: 'FormTemplate';
  accentColor: Scalars['String']['output'];
  /** Reads a single `Book` that is related to this `FormTemplate`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  documentType: Scalars['String']['output'];
  footerText?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  isDefault: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  rowId: Scalars['UUID']['output'];
  showLogo: Scalars['Boolean']['output'];
  terms?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
};

/**
 * A condition to be used against `FormTemplate` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type FormTemplateCondition = {
  /** Checks for equality with the object’s `bookId` field. */
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `documentType` field. */
  documentType?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `FormTemplate` values. */
export type FormTemplateConnection = {
  __typename?: 'FormTemplateConnection';
  /** A list of edges which contains the `FormTemplate` and cursor to aid in pagination. */
  edges: Array<Maybe<FormTemplateEdge>>;
  /** A list of `FormTemplate` objects. */
  nodes: Array<Maybe<FormTemplate>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `FormTemplate` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `FormTemplate` edge in the connection. */
export type FormTemplateEdge = {
  __typename?: 'FormTemplateEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `FormTemplate` at the end of the edge. */
  node?: Maybe<FormTemplate>;
};

/** A filter to be used against `FormTemplate` object types. All fields are combined with a logical ‘and.’ */
export type FormTemplateFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<FormTemplateFilter>>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `documentType` field. */
  documentType?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<FormTemplateFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<FormTemplateFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
};

/** Methods to use when ordering `FormTemplate`. */
export enum FormTemplateOrderBy {
  BookIdAsc = 'BOOK_ID_ASC',
  BookIdDesc = 'BOOK_ID_DESC',
  DocumentTypeAsc = 'DOCUMENT_TYPE_ASC',
  DocumentTypeDesc = 'DOCUMENT_TYPE_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

export type ImportProfile = Node & {
  __typename?: 'ImportProfile';
  /** Reads a single `Book` that is related to this `ImportProfile`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  columnMap: Scalars['JSON']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  headerRows: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  rowId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
};

/**
 * A condition to be used against `ImportProfile` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type ImportProfileCondition = {
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `ImportProfile` values. */
export type ImportProfileConnection = {
  __typename?: 'ImportProfileConnection';
  /** A list of edges which contains the `ImportProfile` and cursor to aid in pagination. */
  edges: Array<Maybe<ImportProfileEdge>>;
  /** A list of `ImportProfile` objects. */
  nodes: Array<Maybe<ImportProfile>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `ImportProfile` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `ImportProfile` edge in the connection. */
export type ImportProfileEdge = {
  __typename?: 'ImportProfileEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `ImportProfile` at the end of the edge. */
  node?: Maybe<ImportProfile>;
};

/** A filter to be used against `ImportProfile` object types. All fields are combined with a logical ‘and.’ */
export type ImportProfileFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<ImportProfileFilter>>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Negates the expression. */
  not?: InputMaybe<ImportProfileFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ImportProfileFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
};

/** Methods to use when ordering `ImportProfile`. */
export enum ImportProfileOrderBy {
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

/** A filter to be used against Int fields. All fields are combined with a logical ‘and.’ */
export type IntFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Int']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Int']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Int']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Int']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Int']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Int']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Int']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Int']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type InventoryItem = Node & {
  __typename?: 'InventoryItem';
  /** Reads a single `Account` that is related to this `InventoryItem`. */
  assetAccount?: Maybe<Account>;
  assetAccountId?: Maybe<Scalars['UUID']['output']>;
  averageCost: Scalars['BigFloat']['output'];
  /** Reads a single `Book` that is related to this `InventoryItem`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  /** Reads a single `Account` that is related to this `InventoryItem`. */
  cogsAccount?: Maybe<Account>;
  cogsAccountId?: Maybe<Scalars['UUID']['output']>;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  /** Reads a single `Account` that is related to this `InventoryItem`. */
  incomeAccount?: Maybe<Account>;
  incomeAccountId: Scalars['UUID']['output'];
  /** Reads and enables pagination through a set of `InventoryTransaction`. */
  inventoryTransactionsByItemId: InventoryTransactionConnection;
  isActive: Scalars['Boolean']['output'];
  itemType: Scalars['String']['output'];
  name: Scalars['String']['output'];
  quantityOnHand: Scalars['BigFloat']['output'];
  reorderPoint?: Maybe<Scalars['BigFloat']['output']>;
  rowId: Scalars['UUID']['output'];
  salePrice: Scalars['BigFloat']['output'];
  sku?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
};


export type InventoryItemInventoryTransactionsByItemIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<InventoryTransactionCondition>;
  filter?: InputMaybe<InventoryTransactionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<InventoryTransactionOrderBy>>;
};

/**
 * A condition to be used against `InventoryItem` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type InventoryItemCondition = {
  /** Checks for equality with the object’s `bookId` field. */
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `InventoryItem` values. */
export type InventoryItemConnection = {
  __typename?: 'InventoryItemConnection';
  /** A list of edges which contains the `InventoryItem` and cursor to aid in pagination. */
  edges: Array<Maybe<InventoryItemEdge>>;
  /** A list of `InventoryItem` objects. */
  nodes: Array<Maybe<InventoryItem>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `InventoryItem` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `InventoryItem` edge in the connection. */
export type InventoryItemEdge = {
  __typename?: 'InventoryItemEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `InventoryItem` at the end of the edge. */
  node?: Maybe<InventoryItem>;
};

/** A filter to be used against `InventoryItem` object types. All fields are combined with a logical ‘and.’ */
export type InventoryItemFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<InventoryItemFilter>>;
  /** Filter by the object’s `assetAccount` relation. */
  assetAccount?: InputMaybe<AccountFilter>;
  /** A related `assetAccount` exists. */
  assetAccountExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `cogsAccount` relation. */
  cogsAccount?: InputMaybe<AccountFilter>;
  /** A related `cogsAccount` exists. */
  cogsAccountExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `incomeAccount` relation. */
  incomeAccount?: InputMaybe<AccountFilter>;
  /** Filter by the object’s `inventoryTransactionsByItemId` relation. */
  inventoryTransactionsByItemId?: InputMaybe<InventoryItemToManyInventoryTransactionFilter>;
  /** Some related `inventoryTransactionsByItemId` exist. */
  inventoryTransactionsByItemIdExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Negates the expression. */
  not?: InputMaybe<InventoryItemFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<InventoryItemFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
};

/** Methods to use when ordering `InventoryItem`. */
export enum InventoryItemOrderBy {
  BookIdAsc = 'BOOK_ID_ASC',
  BookIdDesc = 'BOOK_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

/** A filter to be used against many `InventoryTransaction` object types. All fields are combined with a logical ‘and.’ */
export type InventoryItemToManyInventoryTransactionFilter = {
  /** Every related `InventoryTransaction` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<InventoryTransactionFilter>;
  /** No related `InventoryTransaction` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<InventoryTransactionFilter>;
  /** Some related `InventoryTransaction` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<InventoryTransactionFilter>;
};

export type InventoryTransaction = Node & {
  __typename?: 'InventoryTransaction';
  /** Reads a single `Book` that is related to this `InventoryTransaction`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  date: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  /** Reads a single `InventoryItem` that is related to this `InventoryTransaction`. */
  item?: Maybe<InventoryItem>;
  itemId: Scalars['UUID']['output'];
  /** Reads a single `JournalEntry` that is related to this `InventoryTransaction`. */
  journalEntry?: Maybe<JournalEntry>;
  journalEntryId?: Maybe<Scalars['UUID']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  quantity: Scalars['BigFloat']['output'];
  rowId: Scalars['UUID']['output'];
  type: Scalars['String']['output'];
  unitCost: Scalars['BigFloat']['output'];
};

/**
 * A condition to be used against `InventoryTransaction` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type InventoryTransactionCondition = {
  /** Checks for equality with the object’s `bookId` field. */
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `itemId` field. */
  itemId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `InventoryTransaction` values. */
export type InventoryTransactionConnection = {
  __typename?: 'InventoryTransactionConnection';
  /** A list of edges which contains the `InventoryTransaction` and cursor to aid in pagination. */
  edges: Array<Maybe<InventoryTransactionEdge>>;
  /** A list of `InventoryTransaction` objects. */
  nodes: Array<Maybe<InventoryTransaction>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `InventoryTransaction` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `InventoryTransaction` edge in the connection. */
export type InventoryTransactionEdge = {
  __typename?: 'InventoryTransactionEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `InventoryTransaction` at the end of the edge. */
  node?: Maybe<InventoryTransaction>;
};

/** A filter to be used against `InventoryTransaction` object types. All fields are combined with a logical ‘and.’ */
export type InventoryTransactionFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<InventoryTransactionFilter>>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `item` relation. */
  item?: InputMaybe<InventoryItemFilter>;
  /** Filter by the object’s `itemId` field. */
  itemId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `journalEntry` relation. */
  journalEntry?: InputMaybe<JournalEntryFilter>;
  /** A related `journalEntry` exists. */
  journalEntryExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Negates the expression. */
  not?: InputMaybe<InventoryTransactionFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<InventoryTransactionFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
};

/** Methods to use when ordering `InventoryTransaction`. */
export enum InventoryTransactionOrderBy {
  BookIdAsc = 'BOOK_ID_ASC',
  BookIdDesc = 'BOOK_ID_DESC',
  ItemIdAsc = 'ITEM_ID_ASC',
  ItemIdDesc = 'ITEM_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

export type Invoice = Node & {
  __typename?: 'Invoice';
  amountPaid: Scalars['BigFloat']['output'];
  /** Reads a single `Book` that is related to this `Invoice`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads and enables pagination through a set of `CreditMemoApplication`. */
  creditMemoApplications: CreditMemoApplicationConnection;
  currency: Scalars['String']['output'];
  /** Reads a single `Customer` that is related to this `Invoice`. */
  customer?: Maybe<Customer>;
  customerId: Scalars['UUID']['output'];
  dueDate: Scalars['String']['output'];
  exchangeRate: Scalars['BigFloat']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  /** Reads and enables pagination through a set of `InvoiceLine`. */
  invoiceLines: InvoiceLineConnection;
  /** Reads and enables pagination through a set of `InvoicePayment`. */
  invoicePayments: InvoicePaymentConnection;
  issueDate: Scalars['String']['output'];
  /** Reads a single `JournalEntry` that is related to this `Invoice`. */
  journalEntry?: Maybe<JournalEntry>;
  journalEntryId?: Maybe<Scalars['UUID']['output']>;
  memo?: Maybe<Scalars['String']['output']>;
  number: Scalars['String']['output'];
  rowId: Scalars['UUID']['output'];
  status: Scalars['String']['output'];
  subtotal: Scalars['BigFloat']['output'];
  taxAmount: Scalars['BigFloat']['output'];
  terms?: Maybe<Scalars['String']['output']>;
  total: Scalars['BigFloat']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
};


export type InvoiceCreditMemoApplicationsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<CreditMemoApplicationCondition>;
  filter?: InputMaybe<CreditMemoApplicationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CreditMemoApplicationOrderBy>>;
};


export type InvoiceInvoiceLinesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<InvoiceLineCondition>;
  filter?: InputMaybe<InvoiceLineFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<InvoiceLineOrderBy>>;
};


export type InvoiceInvoicePaymentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<InvoicePaymentCondition>;
  filter?: InputMaybe<InvoicePaymentFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<InvoicePaymentOrderBy>>;
};

/** A condition to be used against `Invoice` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type InvoiceCondition = {
  /** Checks for equality with the object’s `bookId` field. */
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `customerId` field. */
  customerId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `number` field. */
  number?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `Invoice` values. */
export type InvoiceConnection = {
  __typename?: 'InvoiceConnection';
  /** A list of edges which contains the `Invoice` and cursor to aid in pagination. */
  edges: Array<Maybe<InvoiceEdge>>;
  /** A list of `Invoice` objects. */
  nodes: Array<Maybe<Invoice>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Invoice` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Invoice` edge in the connection. */
export type InvoiceEdge = {
  __typename?: 'InvoiceEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Invoice` at the end of the edge. */
  node?: Maybe<Invoice>;
};

/** A filter to be used against `Invoice` object types. All fields are combined with a logical ‘and.’ */
export type InvoiceFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<InvoiceFilter>>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `creditMemoApplications` relation. */
  creditMemoApplications?: InputMaybe<InvoiceToManyCreditMemoApplicationFilter>;
  /** Some related `creditMemoApplications` exist. */
  creditMemoApplicationsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `customer` relation. */
  customer?: InputMaybe<CustomerFilter>;
  /** Filter by the object’s `customerId` field. */
  customerId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `invoiceLines` relation. */
  invoiceLines?: InputMaybe<InvoiceToManyInvoiceLineFilter>;
  /** Some related `invoiceLines` exist. */
  invoiceLinesExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `invoicePayments` relation. */
  invoicePayments?: InputMaybe<InvoiceToManyInvoicePaymentFilter>;
  /** Some related `invoicePayments` exist. */
  invoicePaymentsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `journalEntry` relation. */
  journalEntry?: InputMaybe<JournalEntryFilter>;
  /** A related `journalEntry` exists. */
  journalEntryExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Negates the expression. */
  not?: InputMaybe<InvoiceFilter>;
  /** Filter by the object’s `number` field. */
  number?: InputMaybe<StringFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<InvoiceFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `status` field. */
  status?: InputMaybe<StringFilter>;
};

export type InvoiceLine = Node & {
  __typename?: 'InvoiceLine';
  amount: Scalars['BigFloat']['output'];
  description: Scalars['String']['output'];
  discountPercent?: Maybe<Scalars['BigFloat']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  /** Reads a single `Account` that is related to this `InvoiceLine`. */
  incomeAccount?: Maybe<Account>;
  incomeAccountId: Scalars['UUID']['output'];
  /** Reads a single `InventoryItem` that is related to this `InvoiceLine`. */
  inventoryItem?: Maybe<InventoryItem>;
  inventoryItemId?: Maybe<Scalars['UUID']['output']>;
  /** Reads a single `Invoice` that is related to this `InvoiceLine`. */
  invoice?: Maybe<Invoice>;
  invoiceId: Scalars['UUID']['output'];
  quantity: Scalars['BigFloat']['output'];
  rowId: Scalars['UUID']['output'];
  /** Reads a single `TaxJurisdiction` that is related to this `InvoiceLine`. */
  secondaryTaxJurisdiction?: Maybe<TaxJurisdiction>;
  secondaryTaxJurisdictionId?: Maybe<Scalars['UUID']['output']>;
  sortOrder: Scalars['Int']['output'];
  /** Reads a single `TaxJurisdiction` that is related to this `InvoiceLine`. */
  taxJurisdiction?: Maybe<TaxJurisdiction>;
  taxJurisdictionId?: Maybe<Scalars['UUID']['output']>;
  unitPrice: Scalars['BigFloat']['output'];
};

/**
 * A condition to be used against `InvoiceLine` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type InvoiceLineCondition = {
  /** Checks for equality with the object’s `invoiceId` field. */
  invoiceId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `InvoiceLine` values. */
export type InvoiceLineConnection = {
  __typename?: 'InvoiceLineConnection';
  /** A list of edges which contains the `InvoiceLine` and cursor to aid in pagination. */
  edges: Array<Maybe<InvoiceLineEdge>>;
  /** A list of `InvoiceLine` objects. */
  nodes: Array<Maybe<InvoiceLine>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `InvoiceLine` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `InvoiceLine` edge in the connection. */
export type InvoiceLineEdge = {
  __typename?: 'InvoiceLineEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `InvoiceLine` at the end of the edge. */
  node?: Maybe<InvoiceLine>;
};

/** A filter to be used against `InvoiceLine` object types. All fields are combined with a logical ‘and.’ */
export type InvoiceLineFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<InvoiceLineFilter>>;
  /** Filter by the object’s `incomeAccount` relation. */
  incomeAccount?: InputMaybe<AccountFilter>;
  /** Filter by the object’s `inventoryItem` relation. */
  inventoryItem?: InputMaybe<InventoryItemFilter>;
  /** A related `inventoryItem` exists. */
  inventoryItemExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `invoice` relation. */
  invoice?: InputMaybe<InvoiceFilter>;
  /** Filter by the object’s `invoiceId` field. */
  invoiceId?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<InvoiceLineFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<InvoiceLineFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `secondaryTaxJurisdiction` relation. */
  secondaryTaxJurisdiction?: InputMaybe<TaxJurisdictionFilter>;
  /** A related `secondaryTaxJurisdiction` exists. */
  secondaryTaxJurisdictionExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `taxJurisdiction` relation. */
  taxJurisdiction?: InputMaybe<TaxJurisdictionFilter>;
  /** A related `taxJurisdiction` exists. */
  taxJurisdictionExists?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Methods to use when ordering `InvoiceLine`. */
export enum InvoiceLineOrderBy {
  InvoiceIdAsc = 'INVOICE_ID_ASC',
  InvoiceIdDesc = 'INVOICE_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

/** Methods to use when ordering `Invoice`. */
export enum InvoiceOrderBy {
  BookIdAsc = 'BOOK_ID_ASC',
  BookIdDesc = 'BOOK_ID_DESC',
  CustomerIdAsc = 'CUSTOMER_ID_ASC',
  CustomerIdDesc = 'CUSTOMER_ID_DESC',
  Natural = 'NATURAL',
  NumberAsc = 'NUMBER_ASC',
  NumberDesc = 'NUMBER_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC'
}

export type InvoicePayment = Node & {
  __typename?: 'InvoicePayment';
  amount: Scalars['BigFloat']['output'];
  /** Reads a single `BankDeposit` that is related to this `InvoicePayment`. */
  bankDeposit?: Maybe<BankDeposit>;
  bankDepositId?: Maybe<Scalars['UUID']['output']>;
  /** Reads a single `Book` that is related to this `InvoicePayment`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  date: Scalars['String']['output'];
  /** Reads a single `Account` that is related to this `InvoicePayment`. */
  depositAccount?: Maybe<Account>;
  depositAccountId: Scalars['UUID']['output'];
  exchangeRate: Scalars['BigFloat']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  /** Reads a single `Invoice` that is related to this `InvoicePayment`. */
  invoice?: Maybe<Invoice>;
  invoiceId: Scalars['UUID']['output'];
  /** Reads a single `JournalEntry` that is related to this `InvoicePayment`. */
  journalEntry?: Maybe<JournalEntry>;
  journalEntryId?: Maybe<Scalars['UUID']['output']>;
  method?: Maybe<Scalars['String']['output']>;
  reference?: Maybe<Scalars['String']['output']>;
  rowId: Scalars['UUID']['output'];
};

/**
 * A condition to be used against `InvoicePayment` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type InvoicePaymentCondition = {
  /** Checks for equality with the object’s `bookId` field. */
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `invoiceId` field. */
  invoiceId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `InvoicePayment` values. */
export type InvoicePaymentConnection = {
  __typename?: 'InvoicePaymentConnection';
  /** A list of edges which contains the `InvoicePayment` and cursor to aid in pagination. */
  edges: Array<Maybe<InvoicePaymentEdge>>;
  /** A list of `InvoicePayment` objects. */
  nodes: Array<Maybe<InvoicePayment>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `InvoicePayment` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `InvoicePayment` edge in the connection. */
export type InvoicePaymentEdge = {
  __typename?: 'InvoicePaymentEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `InvoicePayment` at the end of the edge. */
  node?: Maybe<InvoicePayment>;
};

/** A filter to be used against `InvoicePayment` object types. All fields are combined with a logical ‘and.’ */
export type InvoicePaymentFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<InvoicePaymentFilter>>;
  /** Filter by the object’s `bankDeposit` relation. */
  bankDeposit?: InputMaybe<BankDepositFilter>;
  /** A related `bankDeposit` exists. */
  bankDepositExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `depositAccount` relation. */
  depositAccount?: InputMaybe<AccountFilter>;
  /** Filter by the object’s `invoice` relation. */
  invoice?: InputMaybe<InvoiceFilter>;
  /** Filter by the object’s `invoiceId` field. */
  invoiceId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `journalEntry` relation. */
  journalEntry?: InputMaybe<JournalEntryFilter>;
  /** A related `journalEntry` exists. */
  journalEntryExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Negates the expression. */
  not?: InputMaybe<InvoicePaymentFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<InvoicePaymentFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
};

/** Methods to use when ordering `InvoicePayment`. */
export enum InvoicePaymentOrderBy {
  BookIdAsc = 'BOOK_ID_ASC',
  BookIdDesc = 'BOOK_ID_DESC',
  InvoiceIdAsc = 'INVOICE_ID_ASC',
  InvoiceIdDesc = 'INVOICE_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

/** A filter to be used against many `CreditMemoApplication` object types. All fields are combined with a logical ‘and.’ */
export type InvoiceToManyCreditMemoApplicationFilter = {
  /** Every related `CreditMemoApplication` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<CreditMemoApplicationFilter>;
  /** No related `CreditMemoApplication` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<CreditMemoApplicationFilter>;
  /** Some related `CreditMemoApplication` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<CreditMemoApplicationFilter>;
};

/** A filter to be used against many `InvoiceLine` object types. All fields are combined with a logical ‘and.’ */
export type InvoiceToManyInvoiceLineFilter = {
  /** Every related `InvoiceLine` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<InvoiceLineFilter>;
  /** No related `InvoiceLine` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<InvoiceLineFilter>;
  /** Some related `InvoiceLine` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<InvoiceLineFilter>;
};

/** A filter to be used against many `InvoicePayment` object types. All fields are combined with a logical ‘and.’ */
export type InvoiceToManyInvoicePaymentFilter = {
  /** Every related `InvoicePayment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<InvoicePaymentFilter>;
  /** No related `InvoicePayment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<InvoicePaymentFilter>;
  /** Some related `InvoicePayment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<InvoicePaymentFilter>;
};

export type ItemBundle = Node & {
  __typename?: 'ItemBundle';
  /** Reads a single `Book` that is related to this `ItemBundle`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  /** Reads and enables pagination through a set of `BundleComponent`. */
  bundleComponentsByBundleId: BundleComponentConnection;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  rowId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
};


export type ItemBundleBundleComponentsByBundleIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<BundleComponentCondition>;
  filter?: InputMaybe<BundleComponentFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BundleComponentOrderBy>>;
};

/**
 * A condition to be used against `ItemBundle` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type ItemBundleCondition = {
  /** Checks for equality with the object’s `bookId` field. */
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `ItemBundle` values. */
export type ItemBundleConnection = {
  __typename?: 'ItemBundleConnection';
  /** A list of edges which contains the `ItemBundle` and cursor to aid in pagination. */
  edges: Array<Maybe<ItemBundleEdge>>;
  /** A list of `ItemBundle` objects. */
  nodes: Array<Maybe<ItemBundle>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `ItemBundle` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `ItemBundle` edge in the connection. */
export type ItemBundleEdge = {
  __typename?: 'ItemBundleEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `ItemBundle` at the end of the edge. */
  node?: Maybe<ItemBundle>;
};

/** A filter to be used against `ItemBundle` object types. All fields are combined with a logical ‘and.’ */
export type ItemBundleFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<ItemBundleFilter>>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `bundleComponentsByBundleId` relation. */
  bundleComponentsByBundleId?: InputMaybe<ItemBundleToManyBundleComponentFilter>;
  /** Some related `bundleComponentsByBundleId` exist. */
  bundleComponentsByBundleIdExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Negates the expression. */
  not?: InputMaybe<ItemBundleFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ItemBundleFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
};

/** Methods to use when ordering `ItemBundle`. */
export enum ItemBundleOrderBy {
  BookIdAsc = 'BOOK_ID_ASC',
  BookIdDesc = 'BOOK_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

/** A filter to be used against many `BundleComponent` object types. All fields are combined with a logical ‘and.’ */
export type ItemBundleToManyBundleComponentFilter = {
  /** Every related `BundleComponent` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<BundleComponentFilter>;
  /** No related `BundleComponent` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<BundleComponentFilter>;
  /** Some related `BundleComponent` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<BundleComponentFilter>;
};

export type JournalEntry = Node & {
  __typename?: 'JournalEntry';
  /** Reads and enables pagination through a set of `Attachment`. */
  attachments: AttachmentConnection;
  /** Reads a single `Book` that is related to this `JournalEntry`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  date: Scalars['Datetime']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  isReconciled: Scalars['Boolean']['output'];
  isReviewed: Scalars['Boolean']['output'];
  /** Reads and enables pagination through a set of `JournalLine`. */
  journalLines: JournalLineConnection;
  memo?: Maybe<Scalars['String']['output']>;
  rowId: Scalars['UUID']['output'];
  source: Scalars['String']['output'];
  sourceReferenceId?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads a single `Vendor` that is related to this `JournalEntry`. */
  vendor?: Maybe<Vendor>;
  vendorId?: Maybe<Scalars['UUID']['output']>;
};


export type JournalEntryAttachmentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AttachmentCondition>;
  filter?: InputMaybe<AttachmentFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AttachmentOrderBy>>;
};


export type JournalEntryJournalLinesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<JournalLineCondition>;
  filter?: InputMaybe<JournalLineFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<JournalLineOrderBy>>;
};

/**
 * A condition to be used against `JournalEntry` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type JournalEntryCondition = {
  /** Checks for equality with the object’s `bookId` field. */
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `date` field. */
  date?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `source` field. */
  source?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `sourceReferenceId` field. */
  sourceReferenceId?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `JournalEntry` values. */
export type JournalEntryConnection = {
  __typename?: 'JournalEntryConnection';
  /** A list of edges which contains the `JournalEntry` and cursor to aid in pagination. */
  edges: Array<Maybe<JournalEntryEdge>>;
  /** A list of `JournalEntry` objects. */
  nodes: Array<Maybe<JournalEntry>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `JournalEntry` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `JournalEntry` edge in the connection. */
export type JournalEntryEdge = {
  __typename?: 'JournalEntryEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `JournalEntry` at the end of the edge. */
  node?: Maybe<JournalEntry>;
};

/** A filter to be used against `JournalEntry` object types. All fields are combined with a logical ‘and.’ */
export type JournalEntryFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<JournalEntryFilter>>;
  /** Filter by the object’s `attachments` relation. */
  attachments?: InputMaybe<JournalEntryToManyAttachmentFilter>;
  /** Some related `attachments` exist. */
  attachmentsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `date` field. */
  date?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `journalLines` relation. */
  journalLines?: InputMaybe<JournalEntryToManyJournalLineFilter>;
  /** Some related `journalLines` exist. */
  journalLinesExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Negates the expression. */
  not?: InputMaybe<JournalEntryFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<JournalEntryFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `source` field. */
  source?: InputMaybe<StringFilter>;
  /** Filter by the object’s `sourceReferenceId` field. */
  sourceReferenceId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `vendor` relation. */
  vendor?: InputMaybe<VendorFilter>;
  /** A related `vendor` exists. */
  vendorExists?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Methods to use when ordering `JournalEntry`. */
export enum JournalEntryOrderBy {
  BookIdAsc = 'BOOK_ID_ASC',
  BookIdDesc = 'BOOK_ID_DESC',
  DateAsc = 'DATE_ASC',
  DateDesc = 'DATE_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  SourceAsc = 'SOURCE_ASC',
  SourceDesc = 'SOURCE_DESC',
  SourceReferenceIdAsc = 'SOURCE_REFERENCE_ID_ASC',
  SourceReferenceIdDesc = 'SOURCE_REFERENCE_ID_DESC'
}

/** A filter to be used against many `Attachment` object types. All fields are combined with a logical ‘and.’ */
export type JournalEntryToManyAttachmentFilter = {
  /** Every related `Attachment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<AttachmentFilter>;
  /** No related `Attachment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<AttachmentFilter>;
  /** Some related `Attachment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<AttachmentFilter>;
};

/** A filter to be used against many `JournalLine` object types. All fields are combined with a logical ‘and.’ */
export type JournalEntryToManyJournalLineFilter = {
  /** Every related `JournalLine` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<JournalLineFilter>;
  /** No related `JournalLine` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<JournalLineFilter>;
  /** Some related `JournalLine` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<JournalLineFilter>;
};

export type JournalLine = Node & {
  __typename?: 'JournalLine';
  /** Reads a single `Account` that is related to this `JournalLine`. */
  account?: Maybe<Account>;
  accountId: Scalars['UUID']['output'];
  cleared: Scalars['Boolean']['output'];
  credit: Scalars['BigFloat']['output'];
  debit: Scalars['BigFloat']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  /** Reads a single `JournalEntry` that is related to this `JournalLine`. */
  journalEntry?: Maybe<JournalEntry>;
  journalEntryId: Scalars['UUID']['output'];
  /** Reads and enables pagination through a set of `JournalLineProject`. */
  journalLineProjects: JournalLineProjectConnection;
  /** Reads and enables pagination through a set of `JournalLineTag`. */
  journalLineTags: JournalLineTagConnection;
  /** Reads and enables pagination through a set of `JournalLineTrackingCategory`. */
  journalLineTrackingCategories: JournalLineTrackingCategoryConnection;
  memo?: Maybe<Scalars['String']['output']>;
  rowId: Scalars['UUID']['output'];
  /** Reads a single `TaxJurisdiction` that is related to this `JournalLine`. */
  taxJurisdiction?: Maybe<TaxJurisdiction>;
  taxJurisdictionId?: Maybe<Scalars['UUID']['output']>;
};


export type JournalLineJournalLineProjectsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<JournalLineProjectCondition>;
  filter?: InputMaybe<JournalLineProjectFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<JournalLineProjectOrderBy>>;
};


export type JournalLineJournalLineTagsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<JournalLineTagCondition>;
  filter?: InputMaybe<JournalLineTagFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<JournalLineTagOrderBy>>;
};


export type JournalLineJournalLineTrackingCategoriesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<JournalLineTrackingCategoryCondition>;
  filter?: InputMaybe<JournalLineTrackingCategoryFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<JournalLineTrackingCategoryOrderBy>>;
};

/**
 * A condition to be used against `JournalLine` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type JournalLineCondition = {
  /** Checks for equality with the object’s `accountId` field. */
  accountId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `journalEntryId` field. */
  journalEntryId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `taxJurisdictionId` field. */
  taxJurisdictionId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `JournalLine` values. */
export type JournalLineConnection = {
  __typename?: 'JournalLineConnection';
  /** A list of edges which contains the `JournalLine` and cursor to aid in pagination. */
  edges: Array<Maybe<JournalLineEdge>>;
  /** A list of `JournalLine` objects. */
  nodes: Array<Maybe<JournalLine>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `JournalLine` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `JournalLine` edge in the connection. */
export type JournalLineEdge = {
  __typename?: 'JournalLineEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `JournalLine` at the end of the edge. */
  node?: Maybe<JournalLine>;
};

/** A filter to be used against `JournalLine` object types. All fields are combined with a logical ‘and.’ */
export type JournalLineFilter = {
  /** Filter by the object’s `account` relation. */
  account?: InputMaybe<AccountFilter>;
  /** Filter by the object’s `accountId` field. */
  accountId?: InputMaybe<UuidFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<JournalLineFilter>>;
  /** Filter by the object’s `journalEntry` relation. */
  journalEntry?: InputMaybe<JournalEntryFilter>;
  /** Filter by the object’s `journalEntryId` field. */
  journalEntryId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `journalLineProjects` relation. */
  journalLineProjects?: InputMaybe<JournalLineToManyJournalLineProjectFilter>;
  /** Some related `journalLineProjects` exist. */
  journalLineProjectsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `journalLineTags` relation. */
  journalLineTags?: InputMaybe<JournalLineToManyJournalLineTagFilter>;
  /** Some related `journalLineTags` exist. */
  journalLineTagsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `journalLineTrackingCategories` relation. */
  journalLineTrackingCategories?: InputMaybe<JournalLineToManyJournalLineTrackingCategoryFilter>;
  /** Some related `journalLineTrackingCategories` exist. */
  journalLineTrackingCategoriesExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Negates the expression. */
  not?: InputMaybe<JournalLineFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<JournalLineFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `taxJurisdiction` relation. */
  taxJurisdiction?: InputMaybe<TaxJurisdictionFilter>;
  /** A related `taxJurisdiction` exists. */
  taxJurisdictionExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `taxJurisdictionId` field. */
  taxJurisdictionId?: InputMaybe<UuidFilter>;
};

/** Methods to use when ordering `JournalLine`. */
export enum JournalLineOrderBy {
  AccountIdAsc = 'ACCOUNT_ID_ASC',
  AccountIdDesc = 'ACCOUNT_ID_DESC',
  JournalEntryIdAsc = 'JOURNAL_ENTRY_ID_ASC',
  JournalEntryIdDesc = 'JOURNAL_ENTRY_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  TaxJurisdictionIdAsc = 'TAX_JURISDICTION_ID_ASC',
  TaxJurisdictionIdDesc = 'TAX_JURISDICTION_ID_DESC'
}

export type JournalLineProject = Node & {
  __typename?: 'JournalLineProject';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  /** Reads a single `JournalLine` that is related to this `JournalLineProject`. */
  journalLine?: Maybe<JournalLine>;
  journalLineId: Scalars['UUID']['output'];
  /** Reads a single `Project` that is related to this `JournalLineProject`. */
  project?: Maybe<Project>;
  projectId: Scalars['UUID']['output'];
  rowId: Scalars['UUID']['output'];
};

/**
 * A condition to be used against `JournalLineProject` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type JournalLineProjectCondition = {
  /** Checks for equality with the object’s `journalLineId` field. */
  journalLineId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `projectId` field. */
  projectId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `JournalLineProject` values. */
export type JournalLineProjectConnection = {
  __typename?: 'JournalLineProjectConnection';
  /** A list of edges which contains the `JournalLineProject` and cursor to aid in pagination. */
  edges: Array<Maybe<JournalLineProjectEdge>>;
  /** A list of `JournalLineProject` objects. */
  nodes: Array<Maybe<JournalLineProject>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `JournalLineProject` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `JournalLineProject` edge in the connection. */
export type JournalLineProjectEdge = {
  __typename?: 'JournalLineProjectEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `JournalLineProject` at the end of the edge. */
  node?: Maybe<JournalLineProject>;
};

/** A filter to be used against `JournalLineProject` object types. All fields are combined with a logical ‘and.’ */
export type JournalLineProjectFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<JournalLineProjectFilter>>;
  /** Filter by the object’s `journalLine` relation. */
  journalLine?: InputMaybe<JournalLineFilter>;
  /** Filter by the object’s `journalLineId` field. */
  journalLineId?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<JournalLineProjectFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<JournalLineProjectFilter>>;
  /** Filter by the object’s `project` relation. */
  project?: InputMaybe<ProjectFilter>;
  /** Filter by the object’s `projectId` field. */
  projectId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
};

/** Methods to use when ordering `JournalLineProject`. */
export enum JournalLineProjectOrderBy {
  JournalLineIdAsc = 'JOURNAL_LINE_ID_ASC',
  JournalLineIdDesc = 'JOURNAL_LINE_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProjectIdAsc = 'PROJECT_ID_ASC',
  ProjectIdDesc = 'PROJECT_ID_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

export type JournalLineTag = Node & {
  __typename?: 'JournalLineTag';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  /** Reads a single `JournalLine` that is related to this `JournalLineTag`. */
  journalLine?: Maybe<JournalLine>;
  journalLineId: Scalars['UUID']['output'];
  rowId: Scalars['UUID']['output'];
  /** Reads a single `Tag` that is related to this `JournalLineTag`. */
  tag?: Maybe<Tag>;
  tagId: Scalars['UUID']['output'];
};

/**
 * A condition to be used against `JournalLineTag` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type JournalLineTagCondition = {
  /** Checks for equality with the object’s `journalLineId` field. */
  journalLineId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `tagId` field. */
  tagId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `JournalLineTag` values. */
export type JournalLineTagConnection = {
  __typename?: 'JournalLineTagConnection';
  /** A list of edges which contains the `JournalLineTag` and cursor to aid in pagination. */
  edges: Array<Maybe<JournalLineTagEdge>>;
  /** A list of `JournalLineTag` objects. */
  nodes: Array<Maybe<JournalLineTag>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `JournalLineTag` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `JournalLineTag` edge in the connection. */
export type JournalLineTagEdge = {
  __typename?: 'JournalLineTagEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `JournalLineTag` at the end of the edge. */
  node?: Maybe<JournalLineTag>;
};

/** A filter to be used against `JournalLineTag` object types. All fields are combined with a logical ‘and.’ */
export type JournalLineTagFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<JournalLineTagFilter>>;
  /** Filter by the object’s `journalLine` relation. */
  journalLine?: InputMaybe<JournalLineFilter>;
  /** Filter by the object’s `journalLineId` field. */
  journalLineId?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<JournalLineTagFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<JournalLineTagFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `tag` relation. */
  tag?: InputMaybe<TagFilter>;
  /** Filter by the object’s `tagId` field. */
  tagId?: InputMaybe<UuidFilter>;
};

/** Methods to use when ordering `JournalLineTag`. */
export enum JournalLineTagOrderBy {
  JournalLineIdAsc = 'JOURNAL_LINE_ID_ASC',
  JournalLineIdDesc = 'JOURNAL_LINE_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  TagIdAsc = 'TAG_ID_ASC',
  TagIdDesc = 'TAG_ID_DESC'
}

/** A filter to be used against many `JournalLineProject` object types. All fields are combined with a logical ‘and.’ */
export type JournalLineToManyJournalLineProjectFilter = {
  /** Every related `JournalLineProject` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<JournalLineProjectFilter>;
  /** No related `JournalLineProject` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<JournalLineProjectFilter>;
  /** Some related `JournalLineProject` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<JournalLineProjectFilter>;
};

/** A filter to be used against many `JournalLineTag` object types. All fields are combined with a logical ‘and.’ */
export type JournalLineToManyJournalLineTagFilter = {
  /** Every related `JournalLineTag` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<JournalLineTagFilter>;
  /** No related `JournalLineTag` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<JournalLineTagFilter>;
  /** Some related `JournalLineTag` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<JournalLineTagFilter>;
};

/** A filter to be used against many `JournalLineTrackingCategory` object types. All fields are combined with a logical ‘and.’ */
export type JournalLineToManyJournalLineTrackingCategoryFilter = {
  /** Every related `JournalLineTrackingCategory` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<JournalLineTrackingCategoryFilter>;
  /** No related `JournalLineTrackingCategory` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<JournalLineTrackingCategoryFilter>;
  /** Some related `JournalLineTrackingCategory` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<JournalLineTrackingCategoryFilter>;
};

export type JournalLineTrackingCategory = Node & {
  __typename?: 'JournalLineTrackingCategory';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  /** Reads a single `JournalLine` that is related to this `JournalLineTrackingCategory`. */
  journalLine?: Maybe<JournalLine>;
  journalLineId: Scalars['UUID']['output'];
  rowId: Scalars['UUID']['output'];
  /** Reads a single `TrackingCategory` that is related to this `JournalLineTrackingCategory`. */
  trackingCategory?: Maybe<TrackingCategory>;
  trackingCategoryId: Scalars['UUID']['output'];
};

/**
 * A condition to be used against `JournalLineTrackingCategory` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type JournalLineTrackingCategoryCondition = {
  /** Checks for equality with the object’s `journalLineId` field. */
  journalLineId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `trackingCategoryId` field. */
  trackingCategoryId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `JournalLineTrackingCategory` values. */
export type JournalLineTrackingCategoryConnection = {
  __typename?: 'JournalLineTrackingCategoryConnection';
  /** A list of edges which contains the `JournalLineTrackingCategory` and cursor to aid in pagination. */
  edges: Array<Maybe<JournalLineTrackingCategoryEdge>>;
  /** A list of `JournalLineTrackingCategory` objects. */
  nodes: Array<Maybe<JournalLineTrackingCategory>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `JournalLineTrackingCategory` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `JournalLineTrackingCategory` edge in the connection. */
export type JournalLineTrackingCategoryEdge = {
  __typename?: 'JournalLineTrackingCategoryEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `JournalLineTrackingCategory` at the end of the edge. */
  node?: Maybe<JournalLineTrackingCategory>;
};

/** A filter to be used against `JournalLineTrackingCategory` object types. All fields are combined with a logical ‘and.’ */
export type JournalLineTrackingCategoryFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<JournalLineTrackingCategoryFilter>>;
  /** Filter by the object’s `journalLine` relation. */
  journalLine?: InputMaybe<JournalLineFilter>;
  /** Filter by the object’s `journalLineId` field. */
  journalLineId?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<JournalLineTrackingCategoryFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<JournalLineTrackingCategoryFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `trackingCategory` relation. */
  trackingCategory?: InputMaybe<TrackingCategoryFilter>;
  /** Filter by the object’s `trackingCategoryId` field. */
  trackingCategoryId?: InputMaybe<UuidFilter>;
};

/** Methods to use when ordering `JournalLineTrackingCategory`. */
export enum JournalLineTrackingCategoryOrderBy {
  JournalLineIdAsc = 'JOURNAL_LINE_ID_ASC',
  JournalLineIdDesc = 'JOURNAL_LINE_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  TrackingCategoryIdAsc = 'TRACKING_CATEGORY_ID_ASC',
  TrackingCategoryIdDesc = 'TRACKING_CATEGORY_ID_DESC'
}

export type Loan = Node & {
  __typename?: 'Loan';
  /** Reads and enables pagination through a set of `AmortizationEntry`. */
  amortizationEntries: AmortizationEntryConnection;
  annualRate: Scalars['BigFloat']['output'];
  /** Reads a single `Book` that is related to this `Loan`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  extraPrincipal: Scalars['BigFloat']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  /** Reads a single `Account` that is related to this `Loan`. */
  interestAccount?: Maybe<Account>;
  interestAccountId: Scalars['UUID']['output'];
  /** Reads a single `Account` that is related to this `Loan`. */
  liabilityAccount?: Maybe<Account>;
  liabilityAccountId: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  originalPrincipal: Scalars['BigFloat']['output'];
  /** Reads a single `Account` that is related to this `Loan`. */
  paymentAccount?: Maybe<Account>;
  paymentAccountId: Scalars['UUID']['output'];
  paymentAmount?: Maybe<Scalars['BigFloat']['output']>;
  paymentDay: Scalars['Int']['output'];
  rowId: Scalars['UUID']['output'];
  startDate: Scalars['String']['output'];
  status: Scalars['String']['output'];
  termMonths: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
};


export type LoanAmortizationEntriesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AmortizationEntryCondition>;
  filter?: InputMaybe<AmortizationEntryFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AmortizationEntryOrderBy>>;
};

/** A condition to be used against `Loan` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type LoanCondition = {
  /** Checks for equality with the object’s `bookId` field. */
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `Loan` values. */
export type LoanConnection = {
  __typename?: 'LoanConnection';
  /** A list of edges which contains the `Loan` and cursor to aid in pagination. */
  edges: Array<Maybe<LoanEdge>>;
  /** A list of `Loan` objects. */
  nodes: Array<Maybe<Loan>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Loan` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Loan` edge in the connection. */
export type LoanEdge = {
  __typename?: 'LoanEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Loan` at the end of the edge. */
  node?: Maybe<Loan>;
};

/** A filter to be used against `Loan` object types. All fields are combined with a logical ‘and.’ */
export type LoanFilter = {
  /** Filter by the object’s `amortizationEntries` relation. */
  amortizationEntries?: InputMaybe<LoanToManyAmortizationEntryFilter>;
  /** Some related `amortizationEntries` exist. */
  amortizationEntriesExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<LoanFilter>>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `interestAccount` relation. */
  interestAccount?: InputMaybe<AccountFilter>;
  /** Filter by the object’s `liabilityAccount` relation. */
  liabilityAccount?: InputMaybe<AccountFilter>;
  /** Negates the expression. */
  not?: InputMaybe<LoanFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<LoanFilter>>;
  /** Filter by the object’s `paymentAccount` relation. */
  paymentAccount?: InputMaybe<AccountFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `status` field. */
  status?: InputMaybe<StringFilter>;
};

/** Methods to use when ordering `Loan`. */
export enum LoanOrderBy {
  BookIdAsc = 'BOOK_ID_ASC',
  BookIdDesc = 'BOOK_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC'
}

/** A filter to be used against many `AmortizationEntry` object types. All fields are combined with a logical ‘and.’ */
export type LoanToManyAmortizationEntryFilter = {
  /** Every related `AmortizationEntry` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<AmortizationEntryFilter>;
  /** No related `AmortizationEntry` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<AmortizationEntryFilter>;
  /** Some related `AmortizationEntry` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<AmortizationEntryFilter>;
};

export type MileageLog = Node & {
  __typename?: 'MileageLog';
  /** Reads a single `Book` that is related to this `MileageLog`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  date: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  destination?: Maybe<Scalars['String']['output']>;
  distance: Scalars['BigFloat']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  isRoundTrip: Scalars['Boolean']['output'];
  odometerEnd?: Maybe<Scalars['BigFloat']['output']>;
  odometerStart?: Maybe<Scalars['BigFloat']['output']>;
  origin?: Maybe<Scalars['String']['output']>;
  rowId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads a single `Vehicle` that is related to this `MileageLog`. */
  vehicle?: Maybe<Vehicle>;
  vehicleId: Scalars['UUID']['output'];
};

/**
 * A condition to be used against `MileageLog` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type MileageLogCondition = {
  /** Checks for equality with the object’s `bookId` field. */
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `date` field. */
  date?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `vehicleId` field. */
  vehicleId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `MileageLog` values. */
export type MileageLogConnection = {
  __typename?: 'MileageLogConnection';
  /** A list of edges which contains the `MileageLog` and cursor to aid in pagination. */
  edges: Array<Maybe<MileageLogEdge>>;
  /** A list of `MileageLog` objects. */
  nodes: Array<Maybe<MileageLog>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `MileageLog` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `MileageLog` edge in the connection. */
export type MileageLogEdge = {
  __typename?: 'MileageLogEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `MileageLog` at the end of the edge. */
  node?: Maybe<MileageLog>;
};

/** A filter to be used against `MileageLog` object types. All fields are combined with a logical ‘and.’ */
export type MileageLogFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<MileageLogFilter>>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `date` field. */
  date?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<MileageLogFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<MileageLogFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `vehicle` relation. */
  vehicle?: InputMaybe<VehicleFilter>;
  /** Filter by the object’s `vehicleId` field. */
  vehicleId?: InputMaybe<UuidFilter>;
};

/** Methods to use when ordering `MileageLog`. */
export enum MileageLogOrderBy {
  BookIdAsc = 'BOOK_ID_ASC',
  BookIdDesc = 'BOOK_ID_DESC',
  DateAsc = 'DATE_ASC',
  DateDesc = 'DATE_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  VehicleIdAsc = 'VEHICLE_ID_ASC',
  VehicleIdDesc = 'VEHICLE_ID_DESC'
}

export type NetWorthSnapshot = Node & {
  __typename?: 'NetWorthSnapshot';
  /** Reads a single `Book` that is related to this `NetWorthSnapshot`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  breakdown?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  date: Scalars['Datetime']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  netWorth: Scalars['BigFloat']['output'];
  rowId: Scalars['UUID']['output'];
  totalAssets: Scalars['BigFloat']['output'];
  totalLiabilities: Scalars['BigFloat']['output'];
};

/**
 * A condition to be used against `NetWorthSnapshot` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type NetWorthSnapshotCondition = {
  /** Checks for equality with the object’s `bookId` field. */
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `date` field. */
  date?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `NetWorthSnapshot` values. */
export type NetWorthSnapshotConnection = {
  __typename?: 'NetWorthSnapshotConnection';
  /** A list of edges which contains the `NetWorthSnapshot` and cursor to aid in pagination. */
  edges: Array<Maybe<NetWorthSnapshotEdge>>;
  /** A list of `NetWorthSnapshot` objects. */
  nodes: Array<Maybe<NetWorthSnapshot>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `NetWorthSnapshot` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `NetWorthSnapshot` edge in the connection. */
export type NetWorthSnapshotEdge = {
  __typename?: 'NetWorthSnapshotEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `NetWorthSnapshot` at the end of the edge. */
  node?: Maybe<NetWorthSnapshot>;
};

/** A filter to be used against `NetWorthSnapshot` object types. All fields are combined with a logical ‘and.’ */
export type NetWorthSnapshotFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<NetWorthSnapshotFilter>>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `date` field. */
  date?: InputMaybe<DatetimeFilter>;
  /** Negates the expression. */
  not?: InputMaybe<NetWorthSnapshotFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<NetWorthSnapshotFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
};

/** Methods to use when ordering `NetWorthSnapshot`. */
export enum NetWorthSnapshotOrderBy {
  BookIdAsc = 'BOOK_ID_ASC',
  BookIdDesc = 'BOOK_ID_DESC',
  DateAsc = 'DATE_ASC',
  DateDesc = 'DATE_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']['output']>;
};

export type PayrollConnection = Node & {
  __typename?: 'PayrollConnection';
  accessToken?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Book` that is related to this `PayrollConnection`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  companyId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  lastSyncedAt?: Maybe<Scalars['Datetime']['output']>;
  provider: Scalars['String']['output'];
  refreshToken?: Maybe<Scalars['String']['output']>;
  rowId: Scalars['UUID']['output'];
  status: Scalars['String']['output'];
  syncCursor?: Maybe<Scalars['String']['output']>;
};

/**
 * A condition to be used against `PayrollConnection` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type PayrollConnectionCondition = {
  /** Checks for equality with the object’s `bookId` field. */
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `PayrollConnection` values. */
export type PayrollConnectionConnection = {
  __typename?: 'PayrollConnectionConnection';
  /** A list of edges which contains the `PayrollConnection` and cursor to aid in pagination. */
  edges: Array<Maybe<PayrollConnectionEdge>>;
  /** A list of `PayrollConnection` objects. */
  nodes: Array<Maybe<PayrollConnection>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `PayrollConnection` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `PayrollConnection` edge in the connection. */
export type PayrollConnectionEdge = {
  __typename?: 'PayrollConnectionEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `PayrollConnection` at the end of the edge. */
  node?: Maybe<PayrollConnection>;
};

/** A filter to be used against `PayrollConnection` object types. All fields are combined with a logical ‘and.’ */
export type PayrollConnectionFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<PayrollConnectionFilter>>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<PayrollConnectionFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<PayrollConnectionFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `status` field. */
  status?: InputMaybe<StringFilter>;
};

/** Methods to use when ordering `PayrollConnection`. */
export enum PayrollConnectionOrderBy {
  BookIdAsc = 'BOOK_ID_ASC',
  BookIdDesc = 'BOOK_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC'
}

export type PriceLevel = Node & {
  __typename?: 'PriceLevel';
  adjustmentPercent: Scalars['BigFloat']['output'];
  /** Reads a single `Book` that is related to this `PriceLevel`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  rowId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
};

/**
 * A condition to be used against `PriceLevel` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type PriceLevelCondition = {
  /** Checks for equality with the object’s `bookId` field. */
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `PriceLevel` values. */
export type PriceLevelConnection = {
  __typename?: 'PriceLevelConnection';
  /** A list of edges which contains the `PriceLevel` and cursor to aid in pagination. */
  edges: Array<Maybe<PriceLevelEdge>>;
  /** A list of `PriceLevel` objects. */
  nodes: Array<Maybe<PriceLevel>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `PriceLevel` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `PriceLevel` edge in the connection. */
export type PriceLevelEdge = {
  __typename?: 'PriceLevelEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `PriceLevel` at the end of the edge. */
  node?: Maybe<PriceLevel>;
};

/** A filter to be used against `PriceLevel` object types. All fields are combined with a logical ‘and.’ */
export type PriceLevelFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<PriceLevelFilter>>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<PriceLevelFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<PriceLevelFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
};

/** Methods to use when ordering `PriceLevel`. */
export enum PriceLevelOrderBy {
  BookIdAsc = 'BOOK_ID_ASC',
  BookIdDesc = 'BOOK_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

export type Project = Node & {
  __typename?: 'Project';
  /** Reads a single `Book` that is related to this `Project`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  budgetAmount?: Maybe<Scalars['BigFloat']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  endDate?: Maybe<Scalars['Datetime']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  /** Reads and enables pagination through a set of `JournalLineProject`. */
  journalLineProjects: JournalLineProjectConnection;
  name: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `RdExpense`. */
  rdExpenses: RdExpenseConnection;
  rowId: Scalars['UUID']['output'];
  startDate?: Maybe<Scalars['Datetime']['output']>;
  status: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
};


export type ProjectJournalLineProjectsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<JournalLineProjectCondition>;
  filter?: InputMaybe<JournalLineProjectFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<JournalLineProjectOrderBy>>;
};


export type ProjectRdExpensesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<RdExpenseCondition>;
  filter?: InputMaybe<RdExpenseFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RdExpenseOrderBy>>;
};

/** A condition to be used against `Project` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type ProjectCondition = {
  /** Checks for equality with the object’s `bookId` field. */
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `Project` values. */
export type ProjectConnection = {
  __typename?: 'ProjectConnection';
  /** A list of edges which contains the `Project` and cursor to aid in pagination. */
  edges: Array<Maybe<ProjectEdge>>;
  /** A list of `Project` objects. */
  nodes: Array<Maybe<Project>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Project` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Project` edge in the connection. */
export type ProjectEdge = {
  __typename?: 'ProjectEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Project` at the end of the edge. */
  node?: Maybe<Project>;
};

/** A filter to be used against `Project` object types. All fields are combined with a logical ‘and.’ */
export type ProjectFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<ProjectFilter>>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `journalLineProjects` relation. */
  journalLineProjects?: InputMaybe<ProjectToManyJournalLineProjectFilter>;
  /** Some related `journalLineProjects` exist. */
  journalLineProjectsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Negates the expression. */
  not?: InputMaybe<ProjectFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ProjectFilter>>;
  /** Filter by the object’s `rdExpenses` relation. */
  rdExpenses?: InputMaybe<ProjectToManyRdExpenseFilter>;
  /** Some related `rdExpenses` exist. */
  rdExpensesExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `status` field. */
  status?: InputMaybe<StringFilter>;
};

/** Methods to use when ordering `Project`. */
export enum ProjectOrderBy {
  BookIdAsc = 'BOOK_ID_ASC',
  BookIdDesc = 'BOOK_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC'
}

/** A filter to be used against many `JournalLineProject` object types. All fields are combined with a logical ‘and.’ */
export type ProjectToManyJournalLineProjectFilter = {
  /** Every related `JournalLineProject` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<JournalLineProjectFilter>;
  /** No related `JournalLineProject` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<JournalLineProjectFilter>;
  /** Some related `JournalLineProject` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<JournalLineProjectFilter>;
};

/** A filter to be used against many `RdExpense` object types. All fields are combined with a logical ‘and.’ */
export type ProjectToManyRdExpenseFilter = {
  /** Every related `RdExpense` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<RdExpenseFilter>;
  /** No related `RdExpense` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<RdExpenseFilter>;
  /** Some related `RdExpense` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<RdExpenseFilter>;
};

export type PurchaseOrder = Node & {
  __typename?: 'PurchaseOrder';
  /** Reads a single `Book` that is related to this `PurchaseOrder`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  /** Reads a single `Bill` that is related to this `PurchaseOrder`. */
  convertedBill?: Maybe<Bill>;
  convertedBillId?: Maybe<Scalars['UUID']['output']>;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  date: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  memo?: Maybe<Scalars['String']['output']>;
  number: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `PurchaseOrderLine`. */
  purchaseOrderLines: PurchaseOrderLineConnection;
  rowId: Scalars['UUID']['output'];
  status: Scalars['String']['output'];
  subtotal: Scalars['BigFloat']['output'];
  total: Scalars['BigFloat']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads a single `Vendor` that is related to this `PurchaseOrder`. */
  vendor?: Maybe<Vendor>;
  vendorId: Scalars['UUID']['output'];
};


export type PurchaseOrderPurchaseOrderLinesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PurchaseOrderLineCondition>;
  filter?: InputMaybe<PurchaseOrderLineFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PurchaseOrderLineOrderBy>>;
};

/**
 * A condition to be used against `PurchaseOrder` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type PurchaseOrderCondition = {
  /** Checks for equality with the object’s `bookId` field. */
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `number` field. */
  number?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `vendorId` field. */
  vendorId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `PurchaseOrder` values. */
export type PurchaseOrderConnection = {
  __typename?: 'PurchaseOrderConnection';
  /** A list of edges which contains the `PurchaseOrder` and cursor to aid in pagination. */
  edges: Array<Maybe<PurchaseOrderEdge>>;
  /** A list of `PurchaseOrder` objects. */
  nodes: Array<Maybe<PurchaseOrder>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `PurchaseOrder` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `PurchaseOrder` edge in the connection. */
export type PurchaseOrderEdge = {
  __typename?: 'PurchaseOrderEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `PurchaseOrder` at the end of the edge. */
  node?: Maybe<PurchaseOrder>;
};

/** A filter to be used against `PurchaseOrder` object types. All fields are combined with a logical ‘and.’ */
export type PurchaseOrderFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<PurchaseOrderFilter>>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `convertedBill` relation. */
  convertedBill?: InputMaybe<BillFilter>;
  /** A related `convertedBill` exists. */
  convertedBillExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Negates the expression. */
  not?: InputMaybe<PurchaseOrderFilter>;
  /** Filter by the object’s `number` field. */
  number?: InputMaybe<StringFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<PurchaseOrderFilter>>;
  /** Filter by the object’s `purchaseOrderLines` relation. */
  purchaseOrderLines?: InputMaybe<PurchaseOrderToManyPurchaseOrderLineFilter>;
  /** Some related `purchaseOrderLines` exist. */
  purchaseOrderLinesExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `status` field. */
  status?: InputMaybe<StringFilter>;
  /** Filter by the object’s `vendor` relation. */
  vendor?: InputMaybe<VendorFilter>;
  /** Filter by the object’s `vendorId` field. */
  vendorId?: InputMaybe<UuidFilter>;
};

export type PurchaseOrderLine = Node & {
  __typename?: 'PurchaseOrderLine';
  amount: Scalars['BigFloat']['output'];
  description: Scalars['String']['output'];
  /** Reads a single `Account` that is related to this `PurchaseOrderLine`. */
  expenseAccount?: Maybe<Account>;
  expenseAccountId: Scalars['UUID']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  /** Reads a single `PurchaseOrder` that is related to this `PurchaseOrderLine`. */
  purchaseOrder?: Maybe<PurchaseOrder>;
  purchaseOrderId: Scalars['UUID']['output'];
  quantity: Scalars['BigFloat']['output'];
  rowId: Scalars['UUID']['output'];
  sortOrder: Scalars['Int']['output'];
  /** Reads a single `TaxJurisdiction` that is related to this `PurchaseOrderLine`. */
  taxJurisdiction?: Maybe<TaxJurisdiction>;
  taxJurisdictionId?: Maybe<Scalars['UUID']['output']>;
  unitPrice: Scalars['BigFloat']['output'];
};

/**
 * A condition to be used against `PurchaseOrderLine` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type PurchaseOrderLineCondition = {
  /** Checks for equality with the object’s `purchaseOrderId` field. */
  purchaseOrderId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `PurchaseOrderLine` values. */
export type PurchaseOrderLineConnection = {
  __typename?: 'PurchaseOrderLineConnection';
  /** A list of edges which contains the `PurchaseOrderLine` and cursor to aid in pagination. */
  edges: Array<Maybe<PurchaseOrderLineEdge>>;
  /** A list of `PurchaseOrderLine` objects. */
  nodes: Array<Maybe<PurchaseOrderLine>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `PurchaseOrderLine` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `PurchaseOrderLine` edge in the connection. */
export type PurchaseOrderLineEdge = {
  __typename?: 'PurchaseOrderLineEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `PurchaseOrderLine` at the end of the edge. */
  node?: Maybe<PurchaseOrderLine>;
};

/** A filter to be used against `PurchaseOrderLine` object types. All fields are combined with a logical ‘and.’ */
export type PurchaseOrderLineFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<PurchaseOrderLineFilter>>;
  /** Filter by the object’s `expenseAccount` relation. */
  expenseAccount?: InputMaybe<AccountFilter>;
  /** Negates the expression. */
  not?: InputMaybe<PurchaseOrderLineFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<PurchaseOrderLineFilter>>;
  /** Filter by the object’s `purchaseOrder` relation. */
  purchaseOrder?: InputMaybe<PurchaseOrderFilter>;
  /** Filter by the object’s `purchaseOrderId` field. */
  purchaseOrderId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `taxJurisdiction` relation. */
  taxJurisdiction?: InputMaybe<TaxJurisdictionFilter>;
  /** A related `taxJurisdiction` exists. */
  taxJurisdictionExists?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Methods to use when ordering `PurchaseOrderLine`. */
export enum PurchaseOrderLineOrderBy {
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PurchaseOrderIdAsc = 'PURCHASE_ORDER_ID_ASC',
  PurchaseOrderIdDesc = 'PURCHASE_ORDER_ID_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

/** Methods to use when ordering `PurchaseOrder`. */
export enum PurchaseOrderOrderBy {
  BookIdAsc = 'BOOK_ID_ASC',
  BookIdDesc = 'BOOK_ID_DESC',
  Natural = 'NATURAL',
  NumberAsc = 'NUMBER_ASC',
  NumberDesc = 'NUMBER_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  VendorIdAsc = 'VENDOR_ID_ASC',
  VendorIdDesc = 'VENDOR_ID_DESC'
}

/** A filter to be used against many `PurchaseOrderLine` object types. All fields are combined with a logical ‘and.’ */
export type PurchaseOrderToManyPurchaseOrderLineFilter = {
  /** Every related `PurchaseOrderLine` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<PurchaseOrderLineFilter>;
  /** No related `PurchaseOrderLine` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<PurchaseOrderLineFilter>;
  /** Some related `PurchaseOrderLine` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<PurchaseOrderLineFilter>;
};

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  /** Get a single `_DrizzleMigration`. */
  _drizzleMigration?: Maybe<_DrizzleMigration>;
  /** Reads a single `_DrizzleMigration` using its globally unique `ID`. */
  _drizzleMigrationById?: Maybe<_DrizzleMigration>;
  /** Reads and enables pagination through a set of `_DrizzleMigration`. */
  _drizzleMigrations?: Maybe<_DrizzleMigrationConnection>;
  /** Get a single `Account`. */
  account?: Maybe<Account>;
  /** Reads a single `Account` using its globally unique `ID`. */
  accountById?: Maybe<Account>;
  /** Get a single `AccountMapping`. */
  accountMapping?: Maybe<AccountMapping>;
  /** Reads a single `AccountMapping` using its globally unique `ID`. */
  accountMappingById?: Maybe<AccountMapping>;
  /** Reads and enables pagination through a set of `AccountMapping`. */
  accountMappings?: Maybe<AccountMappingConnection>;
  /** Get a single `AccountingPeriod`. */
  accountingPeriod?: Maybe<AccountingPeriod>;
  /** Reads a single `AccountingPeriod` using its globally unique `ID`. */
  accountingPeriodById?: Maybe<AccountingPeriod>;
  /** Reads and enables pagination through a set of `AccountingPeriod`. */
  accountingPeriods?: Maybe<AccountingPeriodConnection>;
  /** Reads and enables pagination through a set of `Account`. */
  accounts?: Maybe<AccountConnection>;
  /** Reads and enables pagination through a set of `AmortizationEntry`. */
  amortizationEntries?: Maybe<AmortizationEntryConnection>;
  /** Get a single `AmortizationEntry`. */
  amortizationEntry?: Maybe<AmortizationEntry>;
  /** Reads a single `AmortizationEntry` using its globally unique `ID`. */
  amortizationEntryById?: Maybe<AmortizationEntry>;
  /** Get a single `Attachment`. */
  attachment?: Maybe<Attachment>;
  /** Reads a single `Attachment` using its globally unique `ID`. */
  attachmentById?: Maybe<Attachment>;
  /** Reads and enables pagination through a set of `Attachment`. */
  attachments?: Maybe<AttachmentConnection>;
  /** Get a single `BankDeposit`. */
  bankDeposit?: Maybe<BankDeposit>;
  /** Reads a single `BankDeposit` using its globally unique `ID`. */
  bankDepositById?: Maybe<BankDeposit>;
  /** Reads and enables pagination through a set of `BankDeposit`. */
  bankDeposits?: Maybe<BankDepositConnection>;
  /** Get a single `Bill`. */
  bill?: Maybe<Bill>;
  /** Reads a single `Bill` using its globally unique `ID`. */
  billById?: Maybe<Bill>;
  /** Get a single `BillLine`. */
  billLine?: Maybe<BillLine>;
  /** Reads a single `BillLine` using its globally unique `ID`. */
  billLineById?: Maybe<BillLine>;
  /** Reads and enables pagination through a set of `BillLine`. */
  billLines?: Maybe<BillLineConnection>;
  /** Get a single `BillPayment`. */
  billPayment?: Maybe<BillPayment>;
  /** Reads a single `BillPayment` using its globally unique `ID`. */
  billPaymentById?: Maybe<BillPayment>;
  /** Reads and enables pagination through a set of `BillPayment`. */
  billPayments?: Maybe<BillPaymentConnection>;
  /** Reads and enables pagination through a set of `Bill`. */
  bills?: Maybe<BillConnection>;
  /** Get a single `Book`. */
  book?: Maybe<Book>;
  /** Get a single `BookAccess`. */
  bookAccess?: Maybe<BookAccess>;
  /** Reads a single `BookAccess` using its globally unique `ID`. */
  bookAccessById?: Maybe<BookAccess>;
  /** Reads and enables pagination through a set of `BookAccess`. */
  bookAccesses?: Maybe<BookAccessConnection>;
  /** Reads a single `Book` using its globally unique `ID`. */
  bookById?: Maybe<Book>;
  /** Reads and enables pagination through a set of `Book`. */
  books?: Maybe<BookConnection>;
  /** Get a single `Budget`. */
  budget?: Maybe<Budget>;
  /** Reads a single `Budget` using its globally unique `ID`. */
  budgetById?: Maybe<Budget>;
  /** Reads and enables pagination through a set of `Budget`. */
  budgets?: Maybe<BudgetConnection>;
  /** Get a single `BundleComponent`. */
  bundleComponent?: Maybe<BundleComponent>;
  /** Reads a single `BundleComponent` using its globally unique `ID`. */
  bundleComponentById?: Maybe<BundleComponent>;
  /** Reads and enables pagination through a set of `BundleComponent`. */
  bundleComponents?: Maybe<BundleComponentConnection>;
  /** Get a single `CategorizationRule`. */
  categorizationRule?: Maybe<CategorizationRule>;
  /** Reads a single `CategorizationRule` using its globally unique `ID`. */
  categorizationRuleById?: Maybe<CategorizationRule>;
  /** Get a single `CategorizationRuleSplit`. */
  categorizationRuleSplit?: Maybe<CategorizationRuleSplit>;
  /** Reads a single `CategorizationRuleSplit` using its globally unique `ID`. */
  categorizationRuleSplitById?: Maybe<CategorizationRuleSplit>;
  /** Reads and enables pagination through a set of `CategorizationRuleSplit`. */
  categorizationRuleSplits?: Maybe<CategorizationRuleSplitConnection>;
  /** Reads and enables pagination through a set of `CategorizationRule`. */
  categorizationRules?: Maybe<CategorizationRuleConnection>;
  /** Get a single `ConnectedAccount`. */
  connectedAccount?: Maybe<ConnectedAccount>;
  /** Reads a single `ConnectedAccount` using its globally unique `ID`. */
  connectedAccountById?: Maybe<ConnectedAccount>;
  /** Reads and enables pagination through a set of `ConnectedAccount`. */
  connectedAccounts?: Maybe<ConnectedAccountConnection>;
  /** Get a single `CreditMemo`. */
  creditMemo?: Maybe<CreditMemo>;
  /** Get a single `CreditMemoApplication`. */
  creditMemoApplication?: Maybe<CreditMemoApplication>;
  /** Reads a single `CreditMemoApplication` using its globally unique `ID`. */
  creditMemoApplicationById?: Maybe<CreditMemoApplication>;
  /** Reads and enables pagination through a set of `CreditMemoApplication`. */
  creditMemoApplications?: Maybe<CreditMemoApplicationConnection>;
  /** Reads a single `CreditMemo` using its globally unique `ID`. */
  creditMemoById?: Maybe<CreditMemo>;
  /** Get a single `CreditMemoLine`. */
  creditMemoLine?: Maybe<CreditMemoLine>;
  /** Reads a single `CreditMemoLine` using its globally unique `ID`. */
  creditMemoLineById?: Maybe<CreditMemoLine>;
  /** Reads and enables pagination through a set of `CreditMemoLine`. */
  creditMemoLines?: Maybe<CreditMemoLineConnection>;
  /** Reads and enables pagination through a set of `CreditMemo`. */
  creditMemos?: Maybe<CreditMemoConnection>;
  /** Get a single `CryptoAsset`. */
  cryptoAsset?: Maybe<CryptoAsset>;
  /** Reads a single `CryptoAsset` using its globally unique `ID`. */
  cryptoAssetById?: Maybe<CryptoAsset>;
  /** Reads and enables pagination through a set of `CryptoAsset`. */
  cryptoAssets?: Maybe<CryptoAssetConnection>;
  /** Get a single `CryptoLot`. */
  cryptoLot?: Maybe<CryptoLot>;
  /** Reads a single `CryptoLot` using its globally unique `ID`. */
  cryptoLotById?: Maybe<CryptoLot>;
  /** Reads and enables pagination through a set of `CryptoLot`. */
  cryptoLots?: Maybe<CryptoLotConnection>;
  /** Get a single `CustomFieldDefinition`. */
  customFieldDefinition?: Maybe<CustomFieldDefinition>;
  /** Reads a single `CustomFieldDefinition` using its globally unique `ID`. */
  customFieldDefinitionById?: Maybe<CustomFieldDefinition>;
  /** Reads and enables pagination through a set of `CustomFieldDefinition`. */
  customFieldDefinitions?: Maybe<CustomFieldDefinitionConnection>;
  /** Get a single `CustomFieldValue`. */
  customFieldValue?: Maybe<CustomFieldValue>;
  /** Reads a single `CustomFieldValue` using its globally unique `ID`. */
  customFieldValueById?: Maybe<CustomFieldValue>;
  /** Reads and enables pagination through a set of `CustomFieldValue`. */
  customFieldValues?: Maybe<CustomFieldValueConnection>;
  /** Get a single `Customer`. */
  customer?: Maybe<Customer>;
  /** Reads a single `Customer` using its globally unique `ID`. */
  customerById?: Maybe<Customer>;
  /** Reads and enables pagination through a set of `Customer`. */
  customers?: Maybe<CustomerConnection>;
  /** Get a single `Document`. */
  document?: Maybe<Document>;
  /** Reads a single `Document` using its globally unique `ID`. */
  documentById?: Maybe<Document>;
  /** Reads and enables pagination through a set of `Document`. */
  documents?: Maybe<DocumentConnection>;
  /** Get a single `Estimate`. */
  estimate?: Maybe<Estimate>;
  /** Reads a single `Estimate` using its globally unique `ID`. */
  estimateById?: Maybe<Estimate>;
  /** Get a single `EstimateLine`. */
  estimateLine?: Maybe<EstimateLine>;
  /** Reads a single `EstimateLine` using its globally unique `ID`. */
  estimateLineById?: Maybe<EstimateLine>;
  /** Reads and enables pagination through a set of `EstimateLine`. */
  estimateLines?: Maybe<EstimateLineConnection>;
  /** Reads and enables pagination through a set of `Estimate`. */
  estimates?: Maybe<EstimateConnection>;
  /** Get a single `FixedAsset`. */
  fixedAsset?: Maybe<FixedAsset>;
  /** Reads a single `FixedAsset` using its globally unique `ID`. */
  fixedAssetById?: Maybe<FixedAsset>;
  /** Reads and enables pagination through a set of `FixedAsset`. */
  fixedAssets?: Maybe<FixedAssetConnection>;
  /** Get a single `FormTemplate`. */
  formTemplate?: Maybe<FormTemplate>;
  /** Reads a single `FormTemplate` using its globally unique `ID`. */
  formTemplateById?: Maybe<FormTemplate>;
  /** Reads and enables pagination through a set of `FormTemplate`. */
  formTemplates?: Maybe<FormTemplateConnection>;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  id: Scalars['ID']['output'];
  /** Get a single `ImportProfile`. */
  importProfile?: Maybe<ImportProfile>;
  /** Reads a single `ImportProfile` using its globally unique `ID`. */
  importProfileById?: Maybe<ImportProfile>;
  /** Reads and enables pagination through a set of `ImportProfile`. */
  importProfiles?: Maybe<ImportProfileConnection>;
  /** Get a single `InventoryItem`. */
  inventoryItem?: Maybe<InventoryItem>;
  /** Reads a single `InventoryItem` using its globally unique `ID`. */
  inventoryItemById?: Maybe<InventoryItem>;
  /** Reads and enables pagination through a set of `InventoryItem`. */
  inventoryItems?: Maybe<InventoryItemConnection>;
  /** Get a single `InventoryTransaction`. */
  inventoryTransaction?: Maybe<InventoryTransaction>;
  /** Reads a single `InventoryTransaction` using its globally unique `ID`. */
  inventoryTransactionById?: Maybe<InventoryTransaction>;
  /** Reads and enables pagination through a set of `InventoryTransaction`. */
  inventoryTransactions?: Maybe<InventoryTransactionConnection>;
  /** Get a single `Invoice`. */
  invoice?: Maybe<Invoice>;
  /** Reads a single `Invoice` using its globally unique `ID`. */
  invoiceById?: Maybe<Invoice>;
  /** Get a single `InvoiceLine`. */
  invoiceLine?: Maybe<InvoiceLine>;
  /** Reads a single `InvoiceLine` using its globally unique `ID`. */
  invoiceLineById?: Maybe<InvoiceLine>;
  /** Reads and enables pagination through a set of `InvoiceLine`. */
  invoiceLines?: Maybe<InvoiceLineConnection>;
  /** Get a single `InvoicePayment`. */
  invoicePayment?: Maybe<InvoicePayment>;
  /** Reads a single `InvoicePayment` using its globally unique `ID`. */
  invoicePaymentById?: Maybe<InvoicePayment>;
  /** Reads and enables pagination through a set of `InvoicePayment`. */
  invoicePayments?: Maybe<InvoicePaymentConnection>;
  /** Reads and enables pagination through a set of `Invoice`. */
  invoices?: Maybe<InvoiceConnection>;
  /** Get a single `ItemBundle`. */
  itemBundle?: Maybe<ItemBundle>;
  /** Reads a single `ItemBundle` using its globally unique `ID`. */
  itemBundleById?: Maybe<ItemBundle>;
  /** Reads and enables pagination through a set of `ItemBundle`. */
  itemBundles?: Maybe<ItemBundleConnection>;
  /** Reads and enables pagination through a set of `JournalEntry`. */
  journalEntries?: Maybe<JournalEntryConnection>;
  /** Get a single `JournalEntry`. */
  journalEntry?: Maybe<JournalEntry>;
  /** Reads a single `JournalEntry` using its globally unique `ID`. */
  journalEntryById?: Maybe<JournalEntry>;
  /** Get a single `JournalLine`. */
  journalLine?: Maybe<JournalLine>;
  /** Reads a single `JournalLine` using its globally unique `ID`. */
  journalLineById?: Maybe<JournalLine>;
  /** Get a single `JournalLineProject`. */
  journalLineProject?: Maybe<JournalLineProject>;
  /** Reads a single `JournalLineProject` using its globally unique `ID`. */
  journalLineProjectById?: Maybe<JournalLineProject>;
  /** Reads and enables pagination through a set of `JournalLineProject`. */
  journalLineProjects?: Maybe<JournalLineProjectConnection>;
  /** Get a single `JournalLineTag`. */
  journalLineTag?: Maybe<JournalLineTag>;
  /** Reads a single `JournalLineTag` using its globally unique `ID`. */
  journalLineTagById?: Maybe<JournalLineTag>;
  /** Reads and enables pagination through a set of `JournalLineTag`. */
  journalLineTags?: Maybe<JournalLineTagConnection>;
  /** Reads and enables pagination through a set of `JournalLineTrackingCategory`. */
  journalLineTrackingCategories?: Maybe<JournalLineTrackingCategoryConnection>;
  /** Get a single `JournalLineTrackingCategory`. */
  journalLineTrackingCategory?: Maybe<JournalLineTrackingCategory>;
  /** Reads a single `JournalLineTrackingCategory` using its globally unique `ID`. */
  journalLineTrackingCategoryById?: Maybe<JournalLineTrackingCategory>;
  /** Reads and enables pagination through a set of `JournalLine`. */
  journalLines?: Maybe<JournalLineConnection>;
  /** Get a single `Loan`. */
  loan?: Maybe<Loan>;
  /** Reads a single `Loan` using its globally unique `ID`. */
  loanById?: Maybe<Loan>;
  /** Reads and enables pagination through a set of `Loan`. */
  loans?: Maybe<LoanConnection>;
  /** Get a single `MileageLog`. */
  mileageLog?: Maybe<MileageLog>;
  /** Reads a single `MileageLog` using its globally unique `ID`. */
  mileageLogById?: Maybe<MileageLog>;
  /** Reads and enables pagination through a set of `MileageLog`. */
  mileageLogs?: Maybe<MileageLogConnection>;
  /** Get a single `NetWorthSnapshot`. */
  netWorthSnapshot?: Maybe<NetWorthSnapshot>;
  /** Reads a single `NetWorthSnapshot` using its globally unique `ID`. */
  netWorthSnapshotById?: Maybe<NetWorthSnapshot>;
  /** Reads and enables pagination through a set of `NetWorthSnapshot`. */
  netWorthSnapshots?: Maybe<NetWorthSnapshotConnection>;
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** Get a single `PayrollConnection`. */
  payrollConnection?: Maybe<PayrollConnection>;
  /** Reads a single `PayrollConnection` using its globally unique `ID`. */
  payrollConnectionById?: Maybe<PayrollConnection>;
  /** Reads and enables pagination through a set of `PayrollConnection`. */
  payrollConnections?: Maybe<PayrollConnectionConnection>;
  /** Get a single `PriceLevel`. */
  priceLevel?: Maybe<PriceLevel>;
  /** Reads a single `PriceLevel` using its globally unique `ID`. */
  priceLevelById?: Maybe<PriceLevel>;
  /** Reads and enables pagination through a set of `PriceLevel`. */
  priceLevels?: Maybe<PriceLevelConnection>;
  /** Get a single `Project`. */
  project?: Maybe<Project>;
  /** Reads a single `Project` using its globally unique `ID`. */
  projectById?: Maybe<Project>;
  /** Reads and enables pagination through a set of `Project`. */
  projects?: Maybe<ProjectConnection>;
  /** Get a single `PurchaseOrder`. */
  purchaseOrder?: Maybe<PurchaseOrder>;
  /** Reads a single `PurchaseOrder` using its globally unique `ID`. */
  purchaseOrderById?: Maybe<PurchaseOrder>;
  /** Get a single `PurchaseOrderLine`. */
  purchaseOrderLine?: Maybe<PurchaseOrderLine>;
  /** Reads a single `PurchaseOrderLine` using its globally unique `ID`. */
  purchaseOrderLineById?: Maybe<PurchaseOrderLine>;
  /** Reads and enables pagination through a set of `PurchaseOrderLine`. */
  purchaseOrderLines?: Maybe<PurchaseOrderLineConnection>;
  /** Reads and enables pagination through a set of `PurchaseOrder`. */
  purchaseOrders?: Maybe<PurchaseOrderConnection>;
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  /** Get a single `RdExpense`. */
  rdExpense?: Maybe<RdExpense>;
  /** Reads a single `RdExpense` using its globally unique `ID`. */
  rdExpenseById?: Maybe<RdExpense>;
  /** Reads and enables pagination through a set of `RdExpense`. */
  rdExpenses?: Maybe<RdExpenseConnection>;
  /** Get a single `ReconciliationQueue`. */
  reconciliationQueue?: Maybe<ReconciliationQueue>;
  /** Reads a single `ReconciliationQueue` using its globally unique `ID`. */
  reconciliationQueueById?: Maybe<ReconciliationQueue>;
  /** Reads and enables pagination through a set of `ReconciliationQueue`. */
  reconciliationQueues?: Maybe<ReconciliationQueueConnection>;
  /** Get a single `ReconciliationStatement`. */
  reconciliationStatement?: Maybe<ReconciliationStatement>;
  /** Reads a single `ReconciliationStatement` using its globally unique `ID`. */
  reconciliationStatementById?: Maybe<ReconciliationStatement>;
  /** Reads and enables pagination through a set of `ReconciliationStatement`. */
  reconciliationStatements?: Maybe<ReconciliationStatementConnection>;
  /** Get a single `RecurringInvoice`. */
  recurringInvoice?: Maybe<RecurringInvoice>;
  /** Reads a single `RecurringInvoice` using its globally unique `ID`. */
  recurringInvoiceById?: Maybe<RecurringInvoice>;
  /** Get a single `RecurringInvoiceLine`. */
  recurringInvoiceLine?: Maybe<RecurringInvoiceLine>;
  /** Reads a single `RecurringInvoiceLine` using its globally unique `ID`. */
  recurringInvoiceLineById?: Maybe<RecurringInvoiceLine>;
  /** Reads and enables pagination through a set of `RecurringInvoiceLine`. */
  recurringInvoiceLines?: Maybe<RecurringInvoiceLineConnection>;
  /** Reads and enables pagination through a set of `RecurringInvoice`. */
  recurringInvoices?: Maybe<RecurringInvoiceConnection>;
  /** Get a single `RecurringTransaction`. */
  recurringTransaction?: Maybe<RecurringTransaction>;
  /** Reads a single `RecurringTransaction` using its globally unique `ID`. */
  recurringTransactionById?: Maybe<RecurringTransaction>;
  /** Reads and enables pagination through a set of `RecurringTransaction`. */
  recurringTransactions?: Maybe<RecurringTransactionConnection>;
  /** Get a single `SavedReport`. */
  savedReport?: Maybe<SavedReport>;
  /** Reads a single `SavedReport` using its globally unique `ID`. */
  savedReportById?: Maybe<SavedReport>;
  /** Reads and enables pagination through a set of `SavedReport`. */
  savedReports?: Maybe<SavedReportConnection>;
  /** Get a single `SavingsGoal`. */
  savingsGoal?: Maybe<SavingsGoal>;
  /** Reads a single `SavingsGoal` using its globally unique `ID`. */
  savingsGoalById?: Maybe<SavingsGoal>;
  /** Reads and enables pagination through a set of `SavingsGoal`. */
  savingsGoals?: Maybe<SavingsGoalConnection>;
  /** Get a single `Tag`. */
  tag?: Maybe<Tag>;
  /** Reads a single `Tag` using its globally unique `ID`. */
  tagById?: Maybe<Tag>;
  /** Get a single `TagGroup`. */
  tagGroup?: Maybe<TagGroup>;
  /** Reads a single `TagGroup` using its globally unique `ID`. */
  tagGroupById?: Maybe<TagGroup>;
  /** Reads and enables pagination through a set of `TagGroup`. */
  tagGroups?: Maybe<TagGroupConnection>;
  /** Reads and enables pagination through a set of `Tag`. */
  tags?: Maybe<TagConnection>;
  /** Get a single `TaxJurisdiction`. */
  taxJurisdiction?: Maybe<TaxJurisdiction>;
  /** Reads a single `TaxJurisdiction` using its globally unique `ID`. */
  taxJurisdictionById?: Maybe<TaxJurisdiction>;
  /** Reads and enables pagination through a set of `TaxJurisdiction`. */
  taxJurisdictions?: Maybe<TaxJurisdictionConnection>;
  /** Reads and enables pagination through a set of `TimeEntry`. */
  timeEntries?: Maybe<TimeEntryConnection>;
  /** Get a single `TimeEntry`. */
  timeEntry?: Maybe<TimeEntry>;
  /** Reads a single `TimeEntry` using its globally unique `ID`. */
  timeEntryById?: Maybe<TimeEntry>;
  /** Reads and enables pagination through a set of `TrackingCategory`. */
  trackingCategories?: Maybe<TrackingCategoryConnection>;
  /** Get a single `TrackingCategory`. */
  trackingCategory?: Maybe<TrackingCategory>;
  /** Reads a single `TrackingCategory` using its globally unique `ID`. */
  trackingCategoryById?: Maybe<TrackingCategory>;
  /** Get a single `Vehicle`. */
  vehicle?: Maybe<Vehicle>;
  /** Reads a single `Vehicle` using its globally unique `ID`. */
  vehicleById?: Maybe<Vehicle>;
  /** Reads and enables pagination through a set of `Vehicle`. */
  vehicles?: Maybe<VehicleConnection>;
  /** Get a single `Vendor`. */
  vendor?: Maybe<Vendor>;
  /** Reads a single `Vendor` using its globally unique `ID`. */
  vendorById?: Maybe<Vendor>;
  /** Get a single `VendorCredit`. */
  vendorCredit?: Maybe<VendorCredit>;
  /** Get a single `VendorCreditApplication`. */
  vendorCreditApplication?: Maybe<VendorCreditApplication>;
  /** Reads a single `VendorCreditApplication` using its globally unique `ID`. */
  vendorCreditApplicationById?: Maybe<VendorCreditApplication>;
  /** Reads and enables pagination through a set of `VendorCreditApplication`. */
  vendorCreditApplications?: Maybe<VendorCreditApplicationConnection>;
  /** Reads a single `VendorCredit` using its globally unique `ID`. */
  vendorCreditById?: Maybe<VendorCredit>;
  /** Get a single `VendorCreditLine`. */
  vendorCreditLine?: Maybe<VendorCreditLine>;
  /** Reads a single `VendorCreditLine` using its globally unique `ID`. */
  vendorCreditLineById?: Maybe<VendorCreditLine>;
  /** Reads and enables pagination through a set of `VendorCreditLine`. */
  vendorCreditLines?: Maybe<VendorCreditLineConnection>;
  /** Reads and enables pagination through a set of `VendorCredit`. */
  vendorCredits?: Maybe<VendorCreditConnection>;
  /** Reads and enables pagination through a set of `Vendor`. */
  vendors?: Maybe<VendorConnection>;
};


/** The root query type which gives access points into the data universe. */
export type Query_DrizzleMigrationArgs = {
  rowId: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type Query_DrizzleMigrationByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type Query_DrizzleMigrationsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<_DrizzleMigrationCondition>;
  filter?: InputMaybe<_DrizzleMigrationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<_DrizzleMigrationOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAccountArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAccountByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAccountMappingArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAccountMappingByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAccountMappingsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AccountMappingCondition>;
  filter?: InputMaybe<AccountMappingFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AccountMappingOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAccountingPeriodArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAccountingPeriodByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAccountingPeriodsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AccountingPeriodCondition>;
  filter?: InputMaybe<AccountingPeriodFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AccountingPeriodOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAccountsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AccountCondition>;
  filter?: InputMaybe<AccountFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AccountOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAmortizationEntriesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AmortizationEntryCondition>;
  filter?: InputMaybe<AmortizationEntryFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AmortizationEntryOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAmortizationEntryArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAmortizationEntryByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAttachmentArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAttachmentByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAttachmentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AttachmentCondition>;
  filter?: InputMaybe<AttachmentFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AttachmentOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryBankDepositArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryBankDepositByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryBankDepositsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<BankDepositCondition>;
  filter?: InputMaybe<BankDepositFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BankDepositOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryBillArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryBillByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryBillLineArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryBillLineByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryBillLinesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<BillLineCondition>;
  filter?: InputMaybe<BillLineFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BillLineOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryBillPaymentArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryBillPaymentByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryBillPaymentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<BillPaymentCondition>;
  filter?: InputMaybe<BillPaymentFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BillPaymentOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryBillsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<BillCondition>;
  filter?: InputMaybe<BillFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BillOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryBookArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryBookAccessArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryBookAccessByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryBookAccessesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<BookAccessCondition>;
  filter?: InputMaybe<BookAccessFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BookAccessOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryBookByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryBooksArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<BookCondition>;
  filter?: InputMaybe<BookFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BookOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryBudgetArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryBudgetByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryBudgetsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<BudgetCondition>;
  filter?: InputMaybe<BudgetFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BudgetOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryBundleComponentArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryBundleComponentByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryBundleComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<BundleComponentCondition>;
  filter?: InputMaybe<BundleComponentFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BundleComponentOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCategorizationRuleArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCategorizationRuleByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCategorizationRuleSplitArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCategorizationRuleSplitByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCategorizationRuleSplitsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<CategorizationRuleSplitCondition>;
  filter?: InputMaybe<CategorizationRuleSplitFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CategorizationRuleSplitOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCategorizationRulesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<CategorizationRuleCondition>;
  filter?: InputMaybe<CategorizationRuleFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CategorizationRuleOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryConnectedAccountArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryConnectedAccountByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryConnectedAccountsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ConnectedAccountCondition>;
  filter?: InputMaybe<ConnectedAccountFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ConnectedAccountOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCreditMemoArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCreditMemoApplicationArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCreditMemoApplicationByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCreditMemoApplicationsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<CreditMemoApplicationCondition>;
  filter?: InputMaybe<CreditMemoApplicationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CreditMemoApplicationOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCreditMemoByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCreditMemoLineArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCreditMemoLineByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCreditMemoLinesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<CreditMemoLineCondition>;
  filter?: InputMaybe<CreditMemoLineFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CreditMemoLineOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCreditMemosArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<CreditMemoCondition>;
  filter?: InputMaybe<CreditMemoFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CreditMemoOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCryptoAssetArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCryptoAssetByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCryptoAssetsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<CryptoAssetCondition>;
  filter?: InputMaybe<CryptoAssetFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CryptoAssetOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCryptoLotArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCryptoLotByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCryptoLotsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<CryptoLotCondition>;
  filter?: InputMaybe<CryptoLotFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CryptoLotOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCustomFieldDefinitionArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCustomFieldDefinitionByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCustomFieldDefinitionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<CustomFieldDefinitionCondition>;
  filter?: InputMaybe<CustomFieldDefinitionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CustomFieldDefinitionOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCustomFieldValueArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCustomFieldValueByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCustomFieldValuesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<CustomFieldValueCondition>;
  filter?: InputMaybe<CustomFieldValueFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CustomFieldValueOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCustomerArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCustomerByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCustomersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<CustomerCondition>;
  filter?: InputMaybe<CustomerFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CustomerOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryDocumentArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDocumentByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDocumentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<DocumentCondition>;
  filter?: InputMaybe<DocumentFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DocumentOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryEstimateArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEstimateByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEstimateLineArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEstimateLineByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEstimateLinesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<EstimateLineCondition>;
  filter?: InputMaybe<EstimateLineFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EstimateLineOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryEstimatesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<EstimateCondition>;
  filter?: InputMaybe<EstimateFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EstimateOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryFixedAssetArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryFixedAssetByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryFixedAssetsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<FixedAssetCondition>;
  filter?: InputMaybe<FixedAssetFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FixedAssetOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryFormTemplateArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryFormTemplateByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryFormTemplatesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<FormTemplateCondition>;
  filter?: InputMaybe<FormTemplateFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FormTemplateOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryImportProfileArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryImportProfileByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryImportProfilesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ImportProfileCondition>;
  filter?: InputMaybe<ImportProfileFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ImportProfileOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryInventoryItemArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryInventoryItemByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryInventoryItemsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<InventoryItemCondition>;
  filter?: InputMaybe<InventoryItemFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<InventoryItemOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryInventoryTransactionArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryInventoryTransactionByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryInventoryTransactionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<InventoryTransactionCondition>;
  filter?: InputMaybe<InventoryTransactionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<InventoryTransactionOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryInvoiceArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryInvoiceByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryInvoiceLineArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryInvoiceLineByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryInvoiceLinesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<InvoiceLineCondition>;
  filter?: InputMaybe<InvoiceLineFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<InvoiceLineOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryInvoicePaymentArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryInvoicePaymentByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryInvoicePaymentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<InvoicePaymentCondition>;
  filter?: InputMaybe<InvoicePaymentFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<InvoicePaymentOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryInvoicesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<InvoiceCondition>;
  filter?: InputMaybe<InvoiceFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<InvoiceOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryItemBundleArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryItemBundleByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryItemBundlesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ItemBundleCondition>;
  filter?: InputMaybe<ItemBundleFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ItemBundleOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryJournalEntriesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<JournalEntryCondition>;
  filter?: InputMaybe<JournalEntryFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<JournalEntryOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryJournalEntryArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryJournalEntryByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryJournalLineArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryJournalLineByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryJournalLineProjectArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryJournalLineProjectByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryJournalLineProjectsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<JournalLineProjectCondition>;
  filter?: InputMaybe<JournalLineProjectFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<JournalLineProjectOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryJournalLineTagArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryJournalLineTagByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryJournalLineTagsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<JournalLineTagCondition>;
  filter?: InputMaybe<JournalLineTagFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<JournalLineTagOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryJournalLineTrackingCategoriesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<JournalLineTrackingCategoryCondition>;
  filter?: InputMaybe<JournalLineTrackingCategoryFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<JournalLineTrackingCategoryOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryJournalLineTrackingCategoryArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryJournalLineTrackingCategoryByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryJournalLinesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<JournalLineCondition>;
  filter?: InputMaybe<JournalLineFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<JournalLineOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryLoanArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryLoanByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryLoansArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<LoanCondition>;
  filter?: InputMaybe<LoanFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LoanOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryMileageLogArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMileageLogByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMileageLogsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<MileageLogCondition>;
  filter?: InputMaybe<MileageLogFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MileageLogOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryNetWorthSnapshotArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryNetWorthSnapshotByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryNetWorthSnapshotsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<NetWorthSnapshotCondition>;
  filter?: InputMaybe<NetWorthSnapshotFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<NetWorthSnapshotOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPayrollConnectionArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPayrollConnectionByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPayrollConnectionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PayrollConnectionCondition>;
  filter?: InputMaybe<PayrollConnectionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PayrollConnectionOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryPriceLevelArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPriceLevelByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPriceLevelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PriceLevelCondition>;
  filter?: InputMaybe<PriceLevelFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PriceLevelOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ProjectCondition>;
  filter?: InputMaybe<ProjectFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProjectOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryPurchaseOrderArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPurchaseOrderByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPurchaseOrderLineArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPurchaseOrderLineByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPurchaseOrderLinesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PurchaseOrderLineCondition>;
  filter?: InputMaybe<PurchaseOrderLineFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PurchaseOrderLineOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryPurchaseOrdersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PurchaseOrderCondition>;
  filter?: InputMaybe<PurchaseOrderFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PurchaseOrderOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryRdExpenseArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRdExpenseByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRdExpensesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<RdExpenseCondition>;
  filter?: InputMaybe<RdExpenseFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RdExpenseOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryReconciliationQueueArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryReconciliationQueueByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryReconciliationQueuesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ReconciliationQueueCondition>;
  filter?: InputMaybe<ReconciliationQueueFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ReconciliationQueueOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryReconciliationStatementArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryReconciliationStatementByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryReconciliationStatementsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ReconciliationStatementCondition>;
  filter?: InputMaybe<ReconciliationStatementFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ReconciliationStatementOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryRecurringInvoiceArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRecurringInvoiceByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRecurringInvoiceLineArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRecurringInvoiceLineByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRecurringInvoiceLinesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<RecurringInvoiceLineCondition>;
  filter?: InputMaybe<RecurringInvoiceLineFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RecurringInvoiceLineOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryRecurringInvoicesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<RecurringInvoiceCondition>;
  filter?: InputMaybe<RecurringInvoiceFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RecurringInvoiceOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryRecurringTransactionArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRecurringTransactionByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRecurringTransactionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<RecurringTransactionCondition>;
  filter?: InputMaybe<RecurringTransactionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RecurringTransactionOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySavedReportArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySavedReportByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySavedReportsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SavedReportCondition>;
  filter?: InputMaybe<SavedReportFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SavedReportOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySavingsGoalArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySavingsGoalByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySavingsGoalsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SavingsGoalCondition>;
  filter?: InputMaybe<SavingsGoalFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SavingsGoalOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTagArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTagByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTagGroupArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTagGroupByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTagGroupsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TagGroupCondition>;
  filter?: InputMaybe<TagGroupFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TagGroupOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTagsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TagCondition>;
  filter?: InputMaybe<TagFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TagOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTaxJurisdictionArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTaxJurisdictionByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTaxJurisdictionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TaxJurisdictionCondition>;
  filter?: InputMaybe<TaxJurisdictionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TaxJurisdictionOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTimeEntriesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TimeEntryCondition>;
  filter?: InputMaybe<TimeEntryFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TimeEntryOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTimeEntryArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTimeEntryByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTrackingCategoriesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TrackingCategoryCondition>;
  filter?: InputMaybe<TrackingCategoryFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TrackingCategoryOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTrackingCategoryArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTrackingCategoryByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryVehicleArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryVehicleByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryVehiclesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<VehicleCondition>;
  filter?: InputMaybe<VehicleFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<VehicleOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryVendorArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryVendorByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryVendorCreditArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryVendorCreditApplicationArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryVendorCreditApplicationByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryVendorCreditApplicationsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<VendorCreditApplicationCondition>;
  filter?: InputMaybe<VendorCreditApplicationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<VendorCreditApplicationOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryVendorCreditByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryVendorCreditLineArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryVendorCreditLineByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryVendorCreditLinesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<VendorCreditLineCondition>;
  filter?: InputMaybe<VendorCreditLineFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<VendorCreditLineOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryVendorCreditsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<VendorCreditCondition>;
  filter?: InputMaybe<VendorCreditFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<VendorCreditOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryVendorsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<VendorCondition>;
  filter?: InputMaybe<VendorFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<VendorOrderBy>>;
};

export type RdExpense = Node & {
  __typename?: 'RdExpense';
  amount: Scalars['BigFloat']['output'];
  /** Reads a single `Book` that is related to this `RdExpense`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  category: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  description: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  isForeign: Scalars['Boolean']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Project` that is related to this `RdExpense`. */
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars['UUID']['output']>;
  rowId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  year: Scalars['Int']['output'];
};

/**
 * A condition to be used against `RdExpense` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type RdExpenseCondition = {
  /** Checks for equality with the object’s `bookId` field. */
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `projectId` field. */
  projectId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `year` field. */
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `RdExpense` values. */
export type RdExpenseConnection = {
  __typename?: 'RdExpenseConnection';
  /** A list of edges which contains the `RdExpense` and cursor to aid in pagination. */
  edges: Array<Maybe<RdExpenseEdge>>;
  /** A list of `RdExpense` objects. */
  nodes: Array<Maybe<RdExpense>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `RdExpense` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `RdExpense` edge in the connection. */
export type RdExpenseEdge = {
  __typename?: 'RdExpenseEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `RdExpense` at the end of the edge. */
  node?: Maybe<RdExpense>;
};

/** A filter to be used against `RdExpense` object types. All fields are combined with a logical ‘and.’ */
export type RdExpenseFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<RdExpenseFilter>>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<RdExpenseFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<RdExpenseFilter>>;
  /** Filter by the object’s `project` relation. */
  project?: InputMaybe<ProjectFilter>;
  /** A related `project` exists. */
  projectExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `projectId` field. */
  projectId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `year` field. */
  year?: InputMaybe<IntFilter>;
};

/** Methods to use when ordering `RdExpense`. */
export enum RdExpenseOrderBy {
  BookIdAsc = 'BOOK_ID_ASC',
  BookIdDesc = 'BOOK_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProjectIdAsc = 'PROJECT_ID_ASC',
  ProjectIdDesc = 'PROJECT_ID_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  YearAsc = 'YEAR_ASC',
  YearDesc = 'YEAR_DESC'
}

export type ReconciliationQueue = Node & {
  __typename?: 'ReconciliationQueue';
  /** Reads a single `Book` that is related to this `ReconciliationQueue`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  categorizationSource?: Maybe<Scalars['String']['output']>;
  confidence?: Maybe<Scalars['BigFloat']['output']>;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  /** Reads a single `JournalEntry` that is related to this `ReconciliationQueue`. */
  journalEntry?: Maybe<JournalEntry>;
  journalEntryId: Scalars['UUID']['output'];
  periodMonth?: Maybe<Scalars['Int']['output']>;
  periodYear?: Maybe<Scalars['Int']['output']>;
  priority: Scalars['Int']['output'];
  reviewedAt?: Maybe<Scalars['Datetime']['output']>;
  reviewedBy?: Maybe<Scalars['String']['output']>;
  rowId: Scalars['UUID']['output'];
  status: Scalars['String']['output'];
  /** Reads a single `Account` that is related to this `ReconciliationQueue`. */
  suggestedCreditAccount?: Maybe<Account>;
  suggestedCreditAccountId?: Maybe<Scalars['UUID']['output']>;
  /** Reads a single `Account` that is related to this `ReconciliationQueue`. */
  suggestedDebitAccount?: Maybe<Account>;
  suggestedDebitAccountId?: Maybe<Scalars['UUID']['output']>;
};

/**
 * A condition to be used against `ReconciliationQueue` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type ReconciliationQueueCondition = {
  /** Checks for equality with the object’s `bookId` field. */
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `ReconciliationQueue` values. */
export type ReconciliationQueueConnection = {
  __typename?: 'ReconciliationQueueConnection';
  /** A list of edges which contains the `ReconciliationQueue` and cursor to aid in pagination. */
  edges: Array<Maybe<ReconciliationQueueEdge>>;
  /** A list of `ReconciliationQueue` objects. */
  nodes: Array<Maybe<ReconciliationQueue>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `ReconciliationQueue` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `ReconciliationQueue` edge in the connection. */
export type ReconciliationQueueEdge = {
  __typename?: 'ReconciliationQueueEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `ReconciliationQueue` at the end of the edge. */
  node?: Maybe<ReconciliationQueue>;
};

/** A filter to be used against `ReconciliationQueue` object types. All fields are combined with a logical ‘and.’ */
export type ReconciliationQueueFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<ReconciliationQueueFilter>>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `journalEntry` relation. */
  journalEntry?: InputMaybe<JournalEntryFilter>;
  /** Negates the expression. */
  not?: InputMaybe<ReconciliationQueueFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ReconciliationQueueFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `status` field. */
  status?: InputMaybe<StringFilter>;
  /** Filter by the object’s `suggestedCreditAccount` relation. */
  suggestedCreditAccount?: InputMaybe<AccountFilter>;
  /** A related `suggestedCreditAccount` exists. */
  suggestedCreditAccountExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `suggestedDebitAccount` relation. */
  suggestedDebitAccount?: InputMaybe<AccountFilter>;
  /** A related `suggestedDebitAccount` exists. */
  suggestedDebitAccountExists?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Methods to use when ordering `ReconciliationQueue`. */
export enum ReconciliationQueueOrderBy {
  BookIdAsc = 'BOOK_ID_ASC',
  BookIdDesc = 'BOOK_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC'
}

export type ReconciliationStatement = Node & {
  __typename?: 'ReconciliationStatement';
  /** Reads a single `Account` that is related to this `ReconciliationStatement`. */
  account?: Maybe<Account>;
  accountId: Scalars['UUID']['output'];
  beginningBalance: Scalars['BigFloat']['output'];
  /** Reads a single `Book` that is related to this `ReconciliationStatement`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  completedAt?: Maybe<Scalars['Datetime']['output']>;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  discrepancy?: Maybe<Scalars['BigFloat']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  rowId: Scalars['UUID']['output'];
  statementBalance: Scalars['BigFloat']['output'];
  statementDate: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

/**
 * A condition to be used against `ReconciliationStatement` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type ReconciliationStatementCondition = {
  /** Checks for equality with the object’s `accountId` field. */
  accountId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `bookId` field. */
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `ReconciliationStatement` values. */
export type ReconciliationStatementConnection = {
  __typename?: 'ReconciliationStatementConnection';
  /** A list of edges which contains the `ReconciliationStatement` and cursor to aid in pagination. */
  edges: Array<Maybe<ReconciliationStatementEdge>>;
  /** A list of `ReconciliationStatement` objects. */
  nodes: Array<Maybe<ReconciliationStatement>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `ReconciliationStatement` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `ReconciliationStatement` edge in the connection. */
export type ReconciliationStatementEdge = {
  __typename?: 'ReconciliationStatementEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `ReconciliationStatement` at the end of the edge. */
  node?: Maybe<ReconciliationStatement>;
};

/** A filter to be used against `ReconciliationStatement` object types. All fields are combined with a logical ‘and.’ */
export type ReconciliationStatementFilter = {
  /** Filter by the object’s `account` relation. */
  account?: InputMaybe<AccountFilter>;
  /** Filter by the object’s `accountId` field. */
  accountId?: InputMaybe<UuidFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<ReconciliationStatementFilter>>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<ReconciliationStatementFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ReconciliationStatementFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
};

/** Methods to use when ordering `ReconciliationStatement`. */
export enum ReconciliationStatementOrderBy {
  AccountIdAsc = 'ACCOUNT_ID_ASC',
  AccountIdDesc = 'ACCOUNT_ID_DESC',
  BookIdAsc = 'BOOK_ID_ASC',
  BookIdDesc = 'BOOK_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

export enum RecurringFrequency {
  Biweekly = 'biweekly',
  Monthly = 'monthly',
  Quarterly = 'quarterly',
  Weekly = 'weekly',
  Yearly = 'yearly'
}

export type RecurringInvoice = Node & {
  __typename?: 'RecurringInvoice';
  /** Reads a single `Book` that is related to this `RecurringInvoice`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  currency: Scalars['String']['output'];
  /** Reads a single `Customer` that is related to this `RecurringInvoice`. */
  customer?: Maybe<Customer>;
  customerId: Scalars['UUID']['output'];
  dueInDays: Scalars['Int']['output'];
  frequency: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  memo?: Maybe<Scalars['String']['output']>;
  nextRunDate: Scalars['String']['output'];
  numberPrefix: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `RecurringInvoiceLine`. */
  recurringInvoiceLines: RecurringInvoiceLineConnection;
  rowId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
};


export type RecurringInvoiceRecurringInvoiceLinesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<RecurringInvoiceLineCondition>;
  filter?: InputMaybe<RecurringInvoiceLineFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RecurringInvoiceLineOrderBy>>;
};

/**
 * A condition to be used against `RecurringInvoice` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type RecurringInvoiceCondition = {
  /** Checks for equality with the object’s `bookId` field. */
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `customerId` field. */
  customerId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `RecurringInvoice` values. */
export type RecurringInvoiceConnection = {
  __typename?: 'RecurringInvoiceConnection';
  /** A list of edges which contains the `RecurringInvoice` and cursor to aid in pagination. */
  edges: Array<Maybe<RecurringInvoiceEdge>>;
  /** A list of `RecurringInvoice` objects. */
  nodes: Array<Maybe<RecurringInvoice>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `RecurringInvoice` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `RecurringInvoice` edge in the connection. */
export type RecurringInvoiceEdge = {
  __typename?: 'RecurringInvoiceEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `RecurringInvoice` at the end of the edge. */
  node?: Maybe<RecurringInvoice>;
};

/** A filter to be used against `RecurringInvoice` object types. All fields are combined with a logical ‘and.’ */
export type RecurringInvoiceFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<RecurringInvoiceFilter>>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `customer` relation. */
  customer?: InputMaybe<CustomerFilter>;
  /** Filter by the object’s `customerId` field. */
  customerId?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<RecurringInvoiceFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<RecurringInvoiceFilter>>;
  /** Filter by the object’s `recurringInvoiceLines` relation. */
  recurringInvoiceLines?: InputMaybe<RecurringInvoiceToManyRecurringInvoiceLineFilter>;
  /** Some related `recurringInvoiceLines` exist. */
  recurringInvoiceLinesExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
};

export type RecurringInvoiceLine = Node & {
  __typename?: 'RecurringInvoiceLine';
  description: Scalars['String']['output'];
  discountPercent?: Maybe<Scalars['BigFloat']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  /** Reads a single `Account` that is related to this `RecurringInvoiceLine`. */
  incomeAccount?: Maybe<Account>;
  incomeAccountId: Scalars['UUID']['output'];
  quantity: Scalars['BigFloat']['output'];
  /** Reads a single `RecurringInvoice` that is related to this `RecurringInvoiceLine`. */
  recurringInvoice?: Maybe<RecurringInvoice>;
  recurringInvoiceId: Scalars['UUID']['output'];
  rowId: Scalars['UUID']['output'];
  sortOrder: Scalars['Int']['output'];
  /** Reads a single `TaxJurisdiction` that is related to this `RecurringInvoiceLine`. */
  taxJurisdiction?: Maybe<TaxJurisdiction>;
  taxJurisdictionId?: Maybe<Scalars['UUID']['output']>;
  unitPrice: Scalars['BigFloat']['output'];
};

/**
 * A condition to be used against `RecurringInvoiceLine` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type RecurringInvoiceLineCondition = {
  /** Checks for equality with the object’s `recurringInvoiceId` field. */
  recurringInvoiceId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `RecurringInvoiceLine` values. */
export type RecurringInvoiceLineConnection = {
  __typename?: 'RecurringInvoiceLineConnection';
  /** A list of edges which contains the `RecurringInvoiceLine` and cursor to aid in pagination. */
  edges: Array<Maybe<RecurringInvoiceLineEdge>>;
  /** A list of `RecurringInvoiceLine` objects. */
  nodes: Array<Maybe<RecurringInvoiceLine>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `RecurringInvoiceLine` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `RecurringInvoiceLine` edge in the connection. */
export type RecurringInvoiceLineEdge = {
  __typename?: 'RecurringInvoiceLineEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `RecurringInvoiceLine` at the end of the edge. */
  node?: Maybe<RecurringInvoiceLine>;
};

/** A filter to be used against `RecurringInvoiceLine` object types. All fields are combined with a logical ‘and.’ */
export type RecurringInvoiceLineFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<RecurringInvoiceLineFilter>>;
  /** Filter by the object’s `incomeAccount` relation. */
  incomeAccount?: InputMaybe<AccountFilter>;
  /** Negates the expression. */
  not?: InputMaybe<RecurringInvoiceLineFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<RecurringInvoiceLineFilter>>;
  /** Filter by the object’s `recurringInvoice` relation. */
  recurringInvoice?: InputMaybe<RecurringInvoiceFilter>;
  /** Filter by the object’s `recurringInvoiceId` field. */
  recurringInvoiceId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `taxJurisdiction` relation. */
  taxJurisdiction?: InputMaybe<TaxJurisdictionFilter>;
  /** A related `taxJurisdiction` exists. */
  taxJurisdictionExists?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Methods to use when ordering `RecurringInvoiceLine`. */
export enum RecurringInvoiceLineOrderBy {
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RecurringInvoiceIdAsc = 'RECURRING_INVOICE_ID_ASC',
  RecurringInvoiceIdDesc = 'RECURRING_INVOICE_ID_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

/** Methods to use when ordering `RecurringInvoice`. */
export enum RecurringInvoiceOrderBy {
  BookIdAsc = 'BOOK_ID_ASC',
  BookIdDesc = 'BOOK_ID_DESC',
  CustomerIdAsc = 'CUSTOMER_ID_ASC',
  CustomerIdDesc = 'CUSTOMER_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

/** A filter to be used against many `RecurringInvoiceLine` object types. All fields are combined with a logical ‘and.’ */
export type RecurringInvoiceToManyRecurringInvoiceLineFilter = {
  /** Every related `RecurringInvoiceLine` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<RecurringInvoiceLineFilter>;
  /** No related `RecurringInvoiceLine` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<RecurringInvoiceLineFilter>;
  /** Some related `RecurringInvoiceLine` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<RecurringInvoiceLineFilter>;
};

export type RecurringTransaction = Node & {
  __typename?: 'RecurringTransaction';
  /** Reads a single `Account` that is related to this `RecurringTransaction`. */
  account?: Maybe<Account>;
  accountId: Scalars['UUID']['output'];
  amount: Scalars['BigFloat']['output'];
  /** Reads a single `Book` that is related to this `RecurringTransaction`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  /** Reads a single `Account` that is related to this `RecurringTransaction`. */
  counterAccount?: Maybe<Account>;
  counterAccountId?: Maybe<Scalars['UUID']['output']>;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  frequency: RecurringFrequency;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isAutoDetected: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  nextExpectedDate?: Maybe<Scalars['Datetime']['output']>;
  rowId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
};

/**
 * A condition to be used against `RecurringTransaction` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type RecurringTransactionCondition = {
  /** Checks for equality with the object’s `bookId` field. */
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `RecurringTransaction` values. */
export type RecurringTransactionConnection = {
  __typename?: 'RecurringTransactionConnection';
  /** A list of edges which contains the `RecurringTransaction` and cursor to aid in pagination. */
  edges: Array<Maybe<RecurringTransactionEdge>>;
  /** A list of `RecurringTransaction` objects. */
  nodes: Array<Maybe<RecurringTransaction>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `RecurringTransaction` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `RecurringTransaction` edge in the connection. */
export type RecurringTransactionEdge = {
  __typename?: 'RecurringTransactionEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `RecurringTransaction` at the end of the edge. */
  node?: Maybe<RecurringTransaction>;
};

/** A filter to be used against `RecurringTransaction` object types. All fields are combined with a logical ‘and.’ */
export type RecurringTransactionFilter = {
  /** Filter by the object’s `account` relation. */
  account?: InputMaybe<AccountFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<RecurringTransactionFilter>>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `counterAccount` relation. */
  counterAccount?: InputMaybe<AccountFilter>;
  /** A related `counterAccount` exists. */
  counterAccountExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Negates the expression. */
  not?: InputMaybe<RecurringTransactionFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<RecurringTransactionFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
};

/** Methods to use when ordering `RecurringTransaction`. */
export enum RecurringTransactionOrderBy {
  BookIdAsc = 'BOOK_ID_ASC',
  BookIdDesc = 'BOOK_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

export type SavedReport = Node & {
  __typename?: 'SavedReport';
  /** Reads a single `Book` that is related to this `SavedReport`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  params: Scalars['JSON']['output'];
  reportType: Scalars['String']['output'];
  rowId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
};

/**
 * A condition to be used against `SavedReport` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type SavedReportCondition = {
  /** Checks for equality with the object’s `bookId` field. */
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `SavedReport` values. */
export type SavedReportConnection = {
  __typename?: 'SavedReportConnection';
  /** A list of edges which contains the `SavedReport` and cursor to aid in pagination. */
  edges: Array<Maybe<SavedReportEdge>>;
  /** A list of `SavedReport` objects. */
  nodes: Array<Maybe<SavedReport>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `SavedReport` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `SavedReport` edge in the connection. */
export type SavedReportEdge = {
  __typename?: 'SavedReportEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `SavedReport` at the end of the edge. */
  node?: Maybe<SavedReport>;
};

/** A filter to be used against `SavedReport` object types. All fields are combined with a logical ‘and.’ */
export type SavedReportFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<SavedReportFilter>>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<SavedReportFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<SavedReportFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
};

/** Methods to use when ordering `SavedReport`. */
export enum SavedReportOrderBy {
  BookIdAsc = 'BOOK_ID_ASC',
  BookIdDesc = 'BOOK_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

export type SavingsGoal = Node & {
  __typename?: 'SavingsGoal';
  /** Reads a single `Account` that is related to this `SavingsGoal`. */
  account?: Maybe<Account>;
  accountId: Scalars['UUID']['output'];
  /** Reads a single `Book` that is related to this `SavingsGoal`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  rowId: Scalars['UUID']['output'];
  targetAmount: Scalars['BigFloat']['output'];
  targetDate?: Maybe<Scalars['Datetime']['output']>;
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
};

/**
 * A condition to be used against `SavingsGoal` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type SavingsGoalCondition = {
  /** Checks for equality with the object’s `bookId` field. */
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `SavingsGoal` values. */
export type SavingsGoalConnection = {
  __typename?: 'SavingsGoalConnection';
  /** A list of edges which contains the `SavingsGoal` and cursor to aid in pagination. */
  edges: Array<Maybe<SavingsGoalEdge>>;
  /** A list of `SavingsGoal` objects. */
  nodes: Array<Maybe<SavingsGoal>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `SavingsGoal` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `SavingsGoal` edge in the connection. */
export type SavingsGoalEdge = {
  __typename?: 'SavingsGoalEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `SavingsGoal` at the end of the edge. */
  node?: Maybe<SavingsGoal>;
};

/** A filter to be used against `SavingsGoal` object types. All fields are combined with a logical ‘and.’ */
export type SavingsGoalFilter = {
  /** Filter by the object’s `account` relation. */
  account?: InputMaybe<AccountFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<SavingsGoalFilter>>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<SavingsGoalFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<SavingsGoalFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
};

/** Methods to use when ordering `SavingsGoal`. */
export enum SavingsGoalOrderBy {
  BookIdAsc = 'BOOK_ID_ASC',
  BookIdDesc = 'BOOK_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

/** A filter to be used against String fields. All fields are combined with a logical ‘and.’ */
export type StringFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['String']['input']>;
  /** Not equal to the specified value, treating null like an ordinary value (case-insensitive). */
  distinctFromInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Ends with the specified string (case-sensitive). */
  endsWith?: InputMaybe<Scalars['String']['input']>;
  /** Ends with the specified string (case-insensitive). */
  endsWithInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['String']['input']>;
  /** Equal to the specified value (case-insensitive). */
  equalToInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['String']['input']>;
  /** Greater than the specified value (case-insensitive). */
  greaterThanInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['String']['input']>;
  /** Greater than or equal to the specified value (case-insensitive). */
  greaterThanOrEqualToInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Included in the specified list (case-insensitive). */
  inInsensitive?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Contains the specified string (case-sensitive). */
  includes?: InputMaybe<Scalars['String']['input']>;
  /** Contains the specified string (case-insensitive). */
  includesInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['String']['input']>;
  /** Less than the specified value (case-insensitive). */
  lessThanInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['String']['input']>;
  /** Less than or equal to the specified value (case-insensitive). */
  lessThanOrEqualToInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Matches the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  like?: InputMaybe<Scalars['String']['input']>;
  /** Matches the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  likeInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['String']['input']>;
  /** Equal to the specified value, treating null like an ordinary value (case-insensitive). */
  notDistinctFromInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Does not end with the specified string (case-sensitive). */
  notEndsWith?: InputMaybe<Scalars['String']['input']>;
  /** Does not end with the specified string (case-insensitive). */
  notEndsWithInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['String']['input']>;
  /** Not equal to the specified value (case-insensitive). */
  notEqualToInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Not included in the specified list (case-insensitive). */
  notInInsensitive?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Does not contain the specified string (case-sensitive). */
  notIncludes?: InputMaybe<Scalars['String']['input']>;
  /** Does not contain the specified string (case-insensitive). */
  notIncludesInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Does not match the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLike?: InputMaybe<Scalars['String']['input']>;
  /** Does not match the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLikeInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Does not start with the specified string (case-sensitive). */
  notStartsWith?: InputMaybe<Scalars['String']['input']>;
  /** Does not start with the specified string (case-insensitive). */
  notStartsWithInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Starts with the specified string (case-sensitive). */
  startsWith?: InputMaybe<Scalars['String']['input']>;
  /** Starts with the specified string (case-insensitive). */
  startsWithInsensitive?: InputMaybe<Scalars['String']['input']>;
};

export type Tag = Node & {
  __typename?: 'Tag';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  /** Reads and enables pagination through a set of `JournalLineTag`. */
  journalLineTags: JournalLineTagConnection;
  name: Scalars['String']['output'];
  rowId: Scalars['UUID']['output'];
  /** Reads a single `TagGroup` that is related to this `Tag`. */
  tagGroup?: Maybe<TagGroup>;
  tagGroupId: Scalars['UUID']['output'];
};


export type TagJournalLineTagsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<JournalLineTagCondition>;
  filter?: InputMaybe<JournalLineTagFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<JournalLineTagOrderBy>>;
};

/** A condition to be used against `Tag` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type TagCondition = {
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `tagGroupId` field. */
  tagGroupId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `Tag` values. */
export type TagConnection = {
  __typename?: 'TagConnection';
  /** A list of edges which contains the `Tag` and cursor to aid in pagination. */
  edges: Array<Maybe<TagEdge>>;
  /** A list of `Tag` objects. */
  nodes: Array<Maybe<Tag>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Tag` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Tag` edge in the connection. */
export type TagEdge = {
  __typename?: 'TagEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Tag` at the end of the edge. */
  node?: Maybe<Tag>;
};

/** A filter to be used against `Tag` object types. All fields are combined with a logical ‘and.’ */
export type TagFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<TagFilter>>;
  /** Filter by the object’s `journalLineTags` relation. */
  journalLineTags?: InputMaybe<TagToManyJournalLineTagFilter>;
  /** Some related `journalLineTags` exist. */
  journalLineTagsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Negates the expression. */
  not?: InputMaybe<TagFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<TagFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `tagGroup` relation. */
  tagGroup?: InputMaybe<TagGroupFilter>;
  /** Filter by the object’s `tagGroupId` field. */
  tagGroupId?: InputMaybe<UuidFilter>;
};

export type TagGroup = Node & {
  __typename?: 'TagGroup';
  /** Reads a single `Book` that is related to this `TagGroup`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  rowId: Scalars['UUID']['output'];
  /** Reads and enables pagination through a set of `Tag`. */
  tags: TagConnection;
};


export type TagGroupTagsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TagCondition>;
  filter?: InputMaybe<TagFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TagOrderBy>>;
};

/**
 * A condition to be used against `TagGroup` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type TagGroupCondition = {
  /** Checks for equality with the object’s `bookId` field. */
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `TagGroup` values. */
export type TagGroupConnection = {
  __typename?: 'TagGroupConnection';
  /** A list of edges which contains the `TagGroup` and cursor to aid in pagination. */
  edges: Array<Maybe<TagGroupEdge>>;
  /** A list of `TagGroup` objects. */
  nodes: Array<Maybe<TagGroup>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `TagGroup` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `TagGroup` edge in the connection. */
export type TagGroupEdge = {
  __typename?: 'TagGroupEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `TagGroup` at the end of the edge. */
  node?: Maybe<TagGroup>;
};

/** A filter to be used against `TagGroup` object types. All fields are combined with a logical ‘and.’ */
export type TagGroupFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<TagGroupFilter>>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<TagGroupFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<TagGroupFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `tags` relation. */
  tags?: InputMaybe<TagGroupToManyTagFilter>;
  /** Some related `tags` exist. */
  tagsExist?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Methods to use when ordering `TagGroup`. */
export enum TagGroupOrderBy {
  BookIdAsc = 'BOOK_ID_ASC',
  BookIdDesc = 'BOOK_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

/** A filter to be used against many `Tag` object types. All fields are combined with a logical ‘and.’ */
export type TagGroupToManyTagFilter = {
  /** Every related `Tag` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<TagFilter>;
  /** No related `Tag` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<TagFilter>;
  /** Some related `Tag` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<TagFilter>;
};

/** Methods to use when ordering `Tag`. */
export enum TagOrderBy {
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  TagGroupIdAsc = 'TAG_GROUP_ID_ASC',
  TagGroupIdDesc = 'TAG_GROUP_ID_DESC'
}

/** A filter to be used against many `JournalLineTag` object types. All fields are combined with a logical ‘and.’ */
export type TagToManyJournalLineTagFilter = {
  /** Every related `JournalLineTag` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<JournalLineTagFilter>;
  /** No related `JournalLineTag` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<JournalLineTagFilter>;
  /** Some related `JournalLineTag` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<JournalLineTagFilter>;
};

export type TaxJurisdiction = Node & {
  __typename?: 'TaxJurisdiction';
  /** Reads a single `Book` that is related to this `TaxJurisdiction`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  code?: Maybe<Scalars['String']['output']>;
  compound: Scalars['Boolean']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  filingFrequency: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  /** Reads and enables pagination through a set of `JournalLine`. */
  journalLines: JournalLineConnection;
  name: Scalars['String']['output'];
  rate?: Maybe<Scalars['BigFloat']['output']>;
  rowId: Scalars['UUID']['output'];
  /** Reads a single `Account` that is related to this `TaxJurisdiction`. */
  taxPayableAccount?: Maybe<Account>;
  taxPayableAccountId: Scalars['UUID']['output'];
};


export type TaxJurisdictionJournalLinesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<JournalLineCondition>;
  filter?: InputMaybe<JournalLineFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<JournalLineOrderBy>>;
};

/**
 * A condition to be used against `TaxJurisdiction` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type TaxJurisdictionCondition = {
  /** Checks for equality with the object’s `bookId` field. */
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `TaxJurisdiction` values. */
export type TaxJurisdictionConnection = {
  __typename?: 'TaxJurisdictionConnection';
  /** A list of edges which contains the `TaxJurisdiction` and cursor to aid in pagination. */
  edges: Array<Maybe<TaxJurisdictionEdge>>;
  /** A list of `TaxJurisdiction` objects. */
  nodes: Array<Maybe<TaxJurisdiction>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `TaxJurisdiction` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `TaxJurisdiction` edge in the connection. */
export type TaxJurisdictionEdge = {
  __typename?: 'TaxJurisdictionEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `TaxJurisdiction` at the end of the edge. */
  node?: Maybe<TaxJurisdiction>;
};

/** A filter to be used against `TaxJurisdiction` object types. All fields are combined with a logical ‘and.’ */
export type TaxJurisdictionFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<TaxJurisdictionFilter>>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `journalLines` relation. */
  journalLines?: InputMaybe<TaxJurisdictionToManyJournalLineFilter>;
  /** Some related `journalLines` exist. */
  journalLinesExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Negates the expression. */
  not?: InputMaybe<TaxJurisdictionFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<TaxJurisdictionFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `taxPayableAccount` relation. */
  taxPayableAccount?: InputMaybe<AccountFilter>;
};

/** Methods to use when ordering `TaxJurisdiction`. */
export enum TaxJurisdictionOrderBy {
  BookIdAsc = 'BOOK_ID_ASC',
  BookIdDesc = 'BOOK_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

/** A filter to be used against many `JournalLine` object types. All fields are combined with a logical ‘and.’ */
export type TaxJurisdictionToManyJournalLineFilter = {
  /** Every related `JournalLine` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<JournalLineFilter>;
  /** No related `JournalLine` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<JournalLineFilter>;
  /** Some related `JournalLine` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<JournalLineFilter>;
};

export type TimeEntry = Node & {
  __typename?: 'TimeEntry';
  billable: Scalars['Boolean']['output'];
  /** Reads a single `Book` that is related to this `TimeEntry`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads a single `Customer` that is related to this `TimeEntry`. */
  customer?: Maybe<Customer>;
  customerId?: Maybe<Scalars['UUID']['output']>;
  date: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  hours: Scalars['BigFloat']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  /** Reads a single `Invoice` that is related to this `TimeEntry`. */
  invoice?: Maybe<Invoice>;
  invoiceId?: Maybe<Scalars['UUID']['output']>;
  rate: Scalars['BigFloat']['output'];
  rowId: Scalars['UUID']['output'];
  /** Reads a single `InventoryItem` that is related to this `TimeEntry`. */
  serviceItem?: Maybe<InventoryItem>;
  serviceItemId?: Maybe<Scalars['UUID']['output']>;
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
};

/**
 * A condition to be used against `TimeEntry` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type TimeEntryCondition = {
  /** Checks for equality with the object’s `bookId` field. */
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `customerId` field. */
  customerId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `TimeEntry` values. */
export type TimeEntryConnection = {
  __typename?: 'TimeEntryConnection';
  /** A list of edges which contains the `TimeEntry` and cursor to aid in pagination. */
  edges: Array<Maybe<TimeEntryEdge>>;
  /** A list of `TimeEntry` objects. */
  nodes: Array<Maybe<TimeEntry>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `TimeEntry` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `TimeEntry` edge in the connection. */
export type TimeEntryEdge = {
  __typename?: 'TimeEntryEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `TimeEntry` at the end of the edge. */
  node?: Maybe<TimeEntry>;
};

/** A filter to be used against `TimeEntry` object types. All fields are combined with a logical ‘and.’ */
export type TimeEntryFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<TimeEntryFilter>>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `customer` relation. */
  customer?: InputMaybe<CustomerFilter>;
  /** A related `customer` exists. */
  customerExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `customerId` field. */
  customerId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `invoice` relation. */
  invoice?: InputMaybe<InvoiceFilter>;
  /** A related `invoice` exists. */
  invoiceExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Negates the expression. */
  not?: InputMaybe<TimeEntryFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<TimeEntryFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `serviceItem` relation. */
  serviceItem?: InputMaybe<InventoryItemFilter>;
  /** A related `serviceItem` exists. */
  serviceItemExists?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Methods to use when ordering `TimeEntry`. */
export enum TimeEntryOrderBy {
  BookIdAsc = 'BOOK_ID_ASC',
  BookIdDesc = 'BOOK_ID_DESC',
  CustomerIdAsc = 'CUSTOMER_ID_ASC',
  CustomerIdDesc = 'CUSTOMER_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

export type TrackingCategory = Node & {
  __typename?: 'TrackingCategory';
  /** Reads a single `Book` that is related to this `TrackingCategory`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  /** Reads and enables pagination through a set of `JournalLineTrackingCategory`. */
  journalLineTrackingCategories: JournalLineTrackingCategoryConnection;
  kind: Scalars['String']['output'];
  name: Scalars['String']['output'];
  rowId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
};


export type TrackingCategoryJournalLineTrackingCategoriesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<JournalLineTrackingCategoryCondition>;
  filter?: InputMaybe<JournalLineTrackingCategoryFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<JournalLineTrackingCategoryOrderBy>>;
};

/**
 * A condition to be used against `TrackingCategory` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type TrackingCategoryCondition = {
  /** Checks for equality with the object’s `bookId` field. */
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `kind` field. */
  kind?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `TrackingCategory` values. */
export type TrackingCategoryConnection = {
  __typename?: 'TrackingCategoryConnection';
  /** A list of edges which contains the `TrackingCategory` and cursor to aid in pagination. */
  edges: Array<Maybe<TrackingCategoryEdge>>;
  /** A list of `TrackingCategory` objects. */
  nodes: Array<Maybe<TrackingCategory>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `TrackingCategory` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `TrackingCategory` edge in the connection. */
export type TrackingCategoryEdge = {
  __typename?: 'TrackingCategoryEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `TrackingCategory` at the end of the edge. */
  node?: Maybe<TrackingCategory>;
};

/** A filter to be used against `TrackingCategory` object types. All fields are combined with a logical ‘and.’ */
export type TrackingCategoryFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<TrackingCategoryFilter>>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `journalLineTrackingCategories` relation. */
  journalLineTrackingCategories?: InputMaybe<TrackingCategoryToManyJournalLineTrackingCategoryFilter>;
  /** Some related `journalLineTrackingCategories` exist. */
  journalLineTrackingCategoriesExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `kind` field. */
  kind?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<TrackingCategoryFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<TrackingCategoryFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
};

/** Methods to use when ordering `TrackingCategory`. */
export enum TrackingCategoryOrderBy {
  BookIdAsc = 'BOOK_ID_ASC',
  BookIdDesc = 'BOOK_ID_DESC',
  KindAsc = 'KIND_ASC',
  KindDesc = 'KIND_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

/** A filter to be used against many `JournalLineTrackingCategory` object types. All fields are combined with a logical ‘and.’ */
export type TrackingCategoryToManyJournalLineTrackingCategoryFilter = {
  /** Every related `JournalLineTrackingCategory` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<JournalLineTrackingCategoryFilter>;
  /** No related `JournalLineTrackingCategory` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<JournalLineTrackingCategoryFilter>;
  /** Some related `JournalLineTrackingCategory` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<JournalLineTrackingCategoryFilter>;
};

/** A filter to be used against UUID fields. All fields are combined with a logical ‘and.’ */
export type UuidFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['UUID']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['UUID']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['UUID']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['UUID']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['UUID']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['UUID']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['UUID']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['UUID']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['UUID']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['UUID']['input']>>;
};

export type Vehicle = Node & {
  __typename?: 'Vehicle';
  /** Reads a single `Book` that is related to this `Vehicle`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  dateInService?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  make?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `MileageLog`. */
  mileageLogs: MileageLogConnection;
  model?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  rowId: Scalars['UUID']['output'];
  year?: Maybe<Scalars['Int']['output']>;
};


export type VehicleMileageLogsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<MileageLogCondition>;
  filter?: InputMaybe<MileageLogFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MileageLogOrderBy>>;
};

/** A condition to be used against `Vehicle` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type VehicleCondition = {
  /** Checks for equality with the object’s `bookId` field. */
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `Vehicle` values. */
export type VehicleConnection = {
  __typename?: 'VehicleConnection';
  /** A list of edges which contains the `Vehicle` and cursor to aid in pagination. */
  edges: Array<Maybe<VehicleEdge>>;
  /** A list of `Vehicle` objects. */
  nodes: Array<Maybe<Vehicle>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Vehicle` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Vehicle` edge in the connection. */
export type VehicleEdge = {
  __typename?: 'VehicleEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Vehicle` at the end of the edge. */
  node?: Maybe<Vehicle>;
};

/** A filter to be used against `Vehicle` object types. All fields are combined with a logical ‘and.’ */
export type VehicleFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<VehicleFilter>>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `mileageLogs` relation. */
  mileageLogs?: InputMaybe<VehicleToManyMileageLogFilter>;
  /** Some related `mileageLogs` exist. */
  mileageLogsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Negates the expression. */
  not?: InputMaybe<VehicleFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<VehicleFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
};

/** Methods to use when ordering `Vehicle`. */
export enum VehicleOrderBy {
  BookIdAsc = 'BOOK_ID_ASC',
  BookIdDesc = 'BOOK_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

/** A filter to be used against many `MileageLog` object types. All fields are combined with a logical ‘and.’ */
export type VehicleToManyMileageLogFilter = {
  /** Every related `MileageLog` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<MileageLogFilter>;
  /** No related `MileageLog` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<MileageLogFilter>;
  /** Some related `MileageLog` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<MileageLogFilter>;
};

export type Vendor = Node & {
  __typename?: 'Vendor';
  address?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `Bill`. */
  bills: BillConnection;
  /** Reads a single `Book` that is related to this `Vendor`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  businessName?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads and enables pagination through a set of `Document`. */
  documents: DocumentConnection;
  email?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  is1099Eligible: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `PurchaseOrder`. */
  purchaseOrders: PurchaseOrderConnection;
  rowId: Scalars['UUID']['output'];
  state?: Maybe<Scalars['String']['output']>;
  taxId?: Maybe<Scalars['String']['output']>;
  taxIdType?: Maybe<Scalars['String']['output']>;
  threshold?: Maybe<Scalars['BigFloat']['output']>;
  /** Reads and enables pagination through a set of `VendorCredit`. */
  vendorCredits: VendorCreditConnection;
  zip?: Maybe<Scalars['String']['output']>;
};


export type VendorBillsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<BillCondition>;
  filter?: InputMaybe<BillFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BillOrderBy>>;
};


export type VendorDocumentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<DocumentCondition>;
  filter?: InputMaybe<DocumentFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DocumentOrderBy>>;
};


export type VendorPurchaseOrdersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PurchaseOrderCondition>;
  filter?: InputMaybe<PurchaseOrderFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PurchaseOrderOrderBy>>;
};


export type VendorVendorCreditsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<VendorCreditCondition>;
  filter?: InputMaybe<VendorCreditFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<VendorCreditOrderBy>>;
};

/** A condition to be used against `Vendor` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type VendorCondition = {
  /** Checks for equality with the object’s `bookId` field. */
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `Vendor` values. */
export type VendorConnection = {
  __typename?: 'VendorConnection';
  /** A list of edges which contains the `Vendor` and cursor to aid in pagination. */
  edges: Array<Maybe<VendorEdge>>;
  /** A list of `Vendor` objects. */
  nodes: Array<Maybe<Vendor>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Vendor` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

export type VendorCredit = Node & {
  __typename?: 'VendorCredit';
  amountApplied: Scalars['BigFloat']['output'];
  /** Reads a single `Book` that is related to this `VendorCredit`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  currency: Scalars['String']['output'];
  date: Scalars['String']['output'];
  exchangeRate: Scalars['BigFloat']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  /** Reads a single `JournalEntry` that is related to this `VendorCredit`. */
  journalEntry?: Maybe<JournalEntry>;
  journalEntryId?: Maybe<Scalars['UUID']['output']>;
  memo?: Maybe<Scalars['String']['output']>;
  number: Scalars['String']['output'];
  rowId: Scalars['UUID']['output'];
  status: Scalars['String']['output'];
  subtotal: Scalars['BigFloat']['output'];
  taxAmount: Scalars['BigFloat']['output'];
  total: Scalars['BigFloat']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads a single `Vendor` that is related to this `VendorCredit`. */
  vendor?: Maybe<Vendor>;
  /** Reads and enables pagination through a set of `VendorCreditApplication`. */
  vendorCreditApplications: VendorCreditApplicationConnection;
  /** Reads and enables pagination through a set of `VendorCreditLine`. */
  vendorCreditLines: VendorCreditLineConnection;
  vendorId: Scalars['UUID']['output'];
};


export type VendorCreditVendorCreditApplicationsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<VendorCreditApplicationCondition>;
  filter?: InputMaybe<VendorCreditApplicationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<VendorCreditApplicationOrderBy>>;
};


export type VendorCreditVendorCreditLinesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<VendorCreditLineCondition>;
  filter?: InputMaybe<VendorCreditLineFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<VendorCreditLineOrderBy>>;
};

export type VendorCreditApplication = Node & {
  __typename?: 'VendorCreditApplication';
  amount: Scalars['BigFloat']['output'];
  /** Reads a single `Bill` that is related to this `VendorCreditApplication`. */
  bill?: Maybe<Bill>;
  billId: Scalars['UUID']['output'];
  /** Reads a single `Book` that is related to this `VendorCreditApplication`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  date: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  rowId: Scalars['UUID']['output'];
  /** Reads a single `VendorCredit` that is related to this `VendorCreditApplication`. */
  vendorCredit?: Maybe<VendorCredit>;
  vendorCreditId: Scalars['UUID']['output'];
};

/**
 * A condition to be used against `VendorCreditApplication` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type VendorCreditApplicationCondition = {
  /** Checks for equality with the object’s `billId` field. */
  billId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `vendorCreditId` field. */
  vendorCreditId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `VendorCreditApplication` values. */
export type VendorCreditApplicationConnection = {
  __typename?: 'VendorCreditApplicationConnection';
  /** A list of edges which contains the `VendorCreditApplication` and cursor to aid in pagination. */
  edges: Array<Maybe<VendorCreditApplicationEdge>>;
  /** A list of `VendorCreditApplication` objects. */
  nodes: Array<Maybe<VendorCreditApplication>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `VendorCreditApplication` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `VendorCreditApplication` edge in the connection. */
export type VendorCreditApplicationEdge = {
  __typename?: 'VendorCreditApplicationEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `VendorCreditApplication` at the end of the edge. */
  node?: Maybe<VendorCreditApplication>;
};

/** A filter to be used against `VendorCreditApplication` object types. All fields are combined with a logical ‘and.’ */
export type VendorCreditApplicationFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<VendorCreditApplicationFilter>>;
  /** Filter by the object’s `bill` relation. */
  bill?: InputMaybe<BillFilter>;
  /** Filter by the object’s `billId` field. */
  billId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Negates the expression. */
  not?: InputMaybe<VendorCreditApplicationFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<VendorCreditApplicationFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `vendorCredit` relation. */
  vendorCredit?: InputMaybe<VendorCreditFilter>;
  /** Filter by the object’s `vendorCreditId` field. */
  vendorCreditId?: InputMaybe<UuidFilter>;
};

/** Methods to use when ordering `VendorCreditApplication`. */
export enum VendorCreditApplicationOrderBy {
  BillIdAsc = 'BILL_ID_ASC',
  BillIdDesc = 'BILL_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  VendorCreditIdAsc = 'VENDOR_CREDIT_ID_ASC',
  VendorCreditIdDesc = 'VENDOR_CREDIT_ID_DESC'
}

/**
 * A condition to be used against `VendorCredit` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type VendorCreditCondition = {
  /** Checks for equality with the object’s `bookId` field. */
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `number` field. */
  number?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `vendorId` field. */
  vendorId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `VendorCredit` values. */
export type VendorCreditConnection = {
  __typename?: 'VendorCreditConnection';
  /** A list of edges which contains the `VendorCredit` and cursor to aid in pagination. */
  edges: Array<Maybe<VendorCreditEdge>>;
  /** A list of `VendorCredit` objects. */
  nodes: Array<Maybe<VendorCredit>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `VendorCredit` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `VendorCredit` edge in the connection. */
export type VendorCreditEdge = {
  __typename?: 'VendorCreditEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `VendorCredit` at the end of the edge. */
  node?: Maybe<VendorCredit>;
};

/** A filter to be used against `VendorCredit` object types. All fields are combined with a logical ‘and.’ */
export type VendorCreditFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<VendorCreditFilter>>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `journalEntry` relation. */
  journalEntry?: InputMaybe<JournalEntryFilter>;
  /** A related `journalEntry` exists. */
  journalEntryExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Negates the expression. */
  not?: InputMaybe<VendorCreditFilter>;
  /** Filter by the object’s `number` field. */
  number?: InputMaybe<StringFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<VendorCreditFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `status` field. */
  status?: InputMaybe<StringFilter>;
  /** Filter by the object’s `vendor` relation. */
  vendor?: InputMaybe<VendorFilter>;
  /** Filter by the object’s `vendorCreditApplications` relation. */
  vendorCreditApplications?: InputMaybe<VendorCreditToManyVendorCreditApplicationFilter>;
  /** Some related `vendorCreditApplications` exist. */
  vendorCreditApplicationsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `vendorCreditLines` relation. */
  vendorCreditLines?: InputMaybe<VendorCreditToManyVendorCreditLineFilter>;
  /** Some related `vendorCreditLines` exist. */
  vendorCreditLinesExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `vendorId` field. */
  vendorId?: InputMaybe<UuidFilter>;
};

export type VendorCreditLine = Node & {
  __typename?: 'VendorCreditLine';
  amount: Scalars['BigFloat']['output'];
  description: Scalars['String']['output'];
  discountPercent?: Maybe<Scalars['BigFloat']['output']>;
  /** Reads a single `Account` that is related to this `VendorCreditLine`. */
  expenseAccount?: Maybe<Account>;
  expenseAccountId: Scalars['UUID']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  quantity: Scalars['BigFloat']['output'];
  rowId: Scalars['UUID']['output'];
  sortOrder: Scalars['Int']['output'];
  /** Reads a single `TaxJurisdiction` that is related to this `VendorCreditLine`. */
  taxJurisdiction?: Maybe<TaxJurisdiction>;
  taxJurisdictionId?: Maybe<Scalars['UUID']['output']>;
  unitPrice: Scalars['BigFloat']['output'];
  /** Reads a single `VendorCredit` that is related to this `VendorCreditLine`. */
  vendorCredit?: Maybe<VendorCredit>;
  vendorCreditId: Scalars['UUID']['output'];
};

/**
 * A condition to be used against `VendorCreditLine` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type VendorCreditLineCondition = {
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `vendorCreditId` field. */
  vendorCreditId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `VendorCreditLine` values. */
export type VendorCreditLineConnection = {
  __typename?: 'VendorCreditLineConnection';
  /** A list of edges which contains the `VendorCreditLine` and cursor to aid in pagination. */
  edges: Array<Maybe<VendorCreditLineEdge>>;
  /** A list of `VendorCreditLine` objects. */
  nodes: Array<Maybe<VendorCreditLine>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `VendorCreditLine` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `VendorCreditLine` edge in the connection. */
export type VendorCreditLineEdge = {
  __typename?: 'VendorCreditLineEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `VendorCreditLine` at the end of the edge. */
  node?: Maybe<VendorCreditLine>;
};

/** A filter to be used against `VendorCreditLine` object types. All fields are combined with a logical ‘and.’ */
export type VendorCreditLineFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<VendorCreditLineFilter>>;
  /** Filter by the object’s `expenseAccount` relation. */
  expenseAccount?: InputMaybe<AccountFilter>;
  /** Negates the expression. */
  not?: InputMaybe<VendorCreditLineFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<VendorCreditLineFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `taxJurisdiction` relation. */
  taxJurisdiction?: InputMaybe<TaxJurisdictionFilter>;
  /** A related `taxJurisdiction` exists. */
  taxJurisdictionExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `vendorCredit` relation. */
  vendorCredit?: InputMaybe<VendorCreditFilter>;
  /** Filter by the object’s `vendorCreditId` field. */
  vendorCreditId?: InputMaybe<UuidFilter>;
};

/** Methods to use when ordering `VendorCreditLine`. */
export enum VendorCreditLineOrderBy {
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  VendorCreditIdAsc = 'VENDOR_CREDIT_ID_ASC',
  VendorCreditIdDesc = 'VENDOR_CREDIT_ID_DESC'
}

/** Methods to use when ordering `VendorCredit`. */
export enum VendorCreditOrderBy {
  BookIdAsc = 'BOOK_ID_ASC',
  BookIdDesc = 'BOOK_ID_DESC',
  Natural = 'NATURAL',
  NumberAsc = 'NUMBER_ASC',
  NumberDesc = 'NUMBER_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  VendorIdAsc = 'VENDOR_ID_ASC',
  VendorIdDesc = 'VENDOR_ID_DESC'
}

/** A filter to be used against many `VendorCreditApplication` object types. All fields are combined with a logical ‘and.’ */
export type VendorCreditToManyVendorCreditApplicationFilter = {
  /** Every related `VendorCreditApplication` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<VendorCreditApplicationFilter>;
  /** No related `VendorCreditApplication` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<VendorCreditApplicationFilter>;
  /** Some related `VendorCreditApplication` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<VendorCreditApplicationFilter>;
};

/** A filter to be used against many `VendorCreditLine` object types. All fields are combined with a logical ‘and.’ */
export type VendorCreditToManyVendorCreditLineFilter = {
  /** Every related `VendorCreditLine` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<VendorCreditLineFilter>;
  /** No related `VendorCreditLine` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<VendorCreditLineFilter>;
  /** Some related `VendorCreditLine` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<VendorCreditLineFilter>;
};

/** A `Vendor` edge in the connection. */
export type VendorEdge = {
  __typename?: 'VendorEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Vendor` at the end of the edge. */
  node?: Maybe<Vendor>;
};

/** A filter to be used against `Vendor` object types. All fields are combined with a logical ‘and.’ */
export type VendorFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<VendorFilter>>;
  /** Filter by the object’s `bills` relation. */
  bills?: InputMaybe<VendorToManyBillFilter>;
  /** Some related `bills` exist. */
  billsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `documents` relation. */
  documents?: InputMaybe<VendorToManyDocumentFilter>;
  /** Some related `documents` exist. */
  documentsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Negates the expression. */
  not?: InputMaybe<VendorFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<VendorFilter>>;
  /** Filter by the object’s `purchaseOrders` relation. */
  purchaseOrders?: InputMaybe<VendorToManyPurchaseOrderFilter>;
  /** Some related `purchaseOrders` exist. */
  purchaseOrdersExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `vendorCredits` relation. */
  vendorCredits?: InputMaybe<VendorToManyVendorCreditFilter>;
  /** Some related `vendorCredits` exist. */
  vendorCreditsExist?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Methods to use when ordering `Vendor`. */
export enum VendorOrderBy {
  BookIdAsc = 'BOOK_ID_ASC',
  BookIdDesc = 'BOOK_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

/** A filter to be used against many `Bill` object types. All fields are combined with a logical ‘and.’ */
export type VendorToManyBillFilter = {
  /** Every related `Bill` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<BillFilter>;
  /** No related `Bill` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<BillFilter>;
  /** Some related `Bill` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<BillFilter>;
};

/** A filter to be used against many `Document` object types. All fields are combined with a logical ‘and.’ */
export type VendorToManyDocumentFilter = {
  /** Every related `Document` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<DocumentFilter>;
  /** No related `Document` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<DocumentFilter>;
  /** Some related `Document` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<DocumentFilter>;
};

/** A filter to be used against many `PurchaseOrder` object types. All fields are combined with a logical ‘and.’ */
export type VendorToManyPurchaseOrderFilter = {
  /** Every related `PurchaseOrder` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<PurchaseOrderFilter>;
  /** No related `PurchaseOrder` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<PurchaseOrderFilter>;
  /** Some related `PurchaseOrder` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<PurchaseOrderFilter>;
};

/** A filter to be used against many `VendorCredit` object types. All fields are combined with a logical ‘and.’ */
export type VendorToManyVendorCreditFilter = {
  /** Every related `VendorCredit` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<VendorCreditFilter>;
  /** No related `VendorCredit` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<VendorCreditFilter>;
  /** Some related `VendorCredit` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<VendorCreditFilter>;
};

export type _DrizzleMigration = Node & {
  __typename?: '_DrizzleMigration';
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  hash: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  rowId: Scalars['Int']['output'];
};

/**
 * A condition to be used against `_DrizzleMigration` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type _DrizzleMigrationCondition = {
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `_DrizzleMigration` values. */
export type _DrizzleMigrationConnection = {
  __typename?: '_DrizzleMigrationConnection';
  /** A list of edges which contains the `_DrizzleMigration` and cursor to aid in pagination. */
  edges: Array<Maybe<_DrizzleMigrationEdge>>;
  /** A list of `_DrizzleMigration` objects. */
  nodes: Array<Maybe<_DrizzleMigration>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `_DrizzleMigration` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `_DrizzleMigration` edge in the connection. */
export type _DrizzleMigrationEdge = {
  __typename?: '_DrizzleMigrationEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `_DrizzleMigration` at the end of the edge. */
  node?: Maybe<_DrizzleMigration>;
};

/** A filter to be used against `_DrizzleMigration` object types. All fields are combined with a logical ‘and.’ */
export type _DrizzleMigrationFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<_DrizzleMigrationFilter>>;
  /** Negates the expression. */
  not?: InputMaybe<_DrizzleMigrationFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<_DrizzleMigrationFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<IntFilter>;
};

/** Methods to use when ordering `_DrizzleMigration`. */
export enum _DrizzleMigrationOrderBy {
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

export type AccountSubType =
  | 'accounts_payable'
  | 'accounts_receivable'
  | 'bank'
  | 'cash'
  | 'cost_of_goods'
  | 'credit_card'
  | 'crypto_gains'
  | 'crypto_losses'
  | 'crypto_wallet'
  | 'customer_credit'
  | 'fixed_asset'
  | 'fx_gain_loss'
  | 'interest_income'
  | 'inventory'
  | 'investment'
  | 'loan'
  | 'mortgage'
  | 'operating_expense'
  | 'other_asset'
  | 'other_equity'
  | 'other_expense'
  | 'other_liability'
  | 'other_revenue'
  | 'owners_equity'
  | 'payroll'
  | 'retained_earnings'
  | 'sales'
  | 'service_revenue'
  | 'tax_expense'
  | 'undeposited_funds';

export type AccountType =
  | 'asset'
  | 'equity'
  | 'expense'
  | 'liability'
  | 'revenue';

export type BudgetPeriod =
  | 'monthly'
  | 'quarterly'
  | 'yearly';

export type AccountMappingsQueryVariables = Exact<{
  bookId: string;
}>;


export type AccountMappingsQuery = { accountMappings: { nodes: Array<{ rowId: string, bookId: string, eventType: string, debitAccountId: string, creditAccountId: string, debitAccount: { rowId: string, name: string, code: string | null } | null, creditAccount: { rowId: string, name: string, code: string | null } | null } | null> } | null };

export type AllAccountsQueryVariables = Exact<{
  bookId: string;
}>;


export type AllAccountsQuery = { accounts: { nodes: Array<{ rowId: string, bookId: string, parentId: string | null, name: string, code: string | null, type: AccountType, subType: AccountSubType | null, isPlaceholder: boolean, isActive: boolean, createdAt: string | null, updatedAt: string | null, parent: { rowId: string, name: string, code: string | null } | null, children: { nodes: Array<{ rowId: string, name: string, code: string | null, type: AccountType } | null> } } | null> } | null };

export type AllBooksQueryVariables = Exact<{
  organizationId: string;
}>;


export type AllBooksQuery = { books: { nodes: Array<{ rowId: string, organizationId: string, name: string, type: string, currency: string, fiscalYearStartMonth: number, createdAt: string | null, updatedAt: string | null } | null> } | null };

export type AllBudgetsQueryVariables = Exact<{
  bookId: string;
}>;


export type AllBudgetsQuery = { budgets: { nodes: Array<{ rowId: string, bookId: string, accountId: string, amount: string, period: BudgetPeriod, rollover: boolean, createdAt: string | null, updatedAt: string | null, account: { rowId: string, name: string, code: string | null } | null } | null> } | null };

export type AllJournalEntriesQueryVariables = Exact<{
  bookId: string;
  first?: number | null | undefined;
  after?: string | null | undefined;
}>;


export type AllJournalEntriesQuery = { journalEntries: { totalCount: number, nodes: Array<{ rowId: string, bookId: string, date: string, memo: string | null, source: string, sourceReferenceId: string | null, isReviewed: boolean, isReconciled: boolean, createdAt: string | null, updatedAt: string | null, journalLines: { nodes: Array<{ rowId: string, accountId: string, debit: string, credit: string, memo: string | null, account: { rowId: string, name: string, code: string | null, type: AccountType } | null } | null> } } | null>, pageInfo: { hasNextPage: boolean, endCursor: string | null } } | null };

export type PendingReconciliationQueryVariables = Exact<{
  bookId: string;
  status?: string | null | undefined;
}>;


export type PendingReconciliationQuery = { reconciliationQueues: { totalCount: number, nodes: Array<{ rowId: string, bookId: string, journalEntryId: string, suggestedDebitAccountId: string | null, suggestedCreditAccountId: string | null, status: string, reviewedAt: string | null, reviewedBy: string | null, createdAt: string | null, source: string | null, journalEntry: { rowId: string, date: string, memo: string | null, source: string, isReviewed: boolean } | null } | null> } | null };

export type AllSavingsGoalsQueryVariables = Exact<{
  bookId: string;
}>;


export type AllSavingsGoalsQuery = { savingsGoals: { nodes: Array<{ rowId: string, bookId: string, accountId: string, name: string, targetAmount: string, targetDate: string | null, createdAt: string | null, updatedAt: string | null, account: { rowId: string, name: string, code: string | null } | null } | null> } | null };


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

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    AccountMappings(variables: AccountMappingsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<AccountMappingsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AccountMappingsQuery>({ document: AccountMappingsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'AccountMappings', 'query', variables);
    },
    AllAccounts(variables: AllAccountsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<AllAccountsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllAccountsQuery>({ document: AllAccountsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'AllAccounts', 'query', variables);
    },
    AllBooks(variables: AllBooksQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<AllBooksQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllBooksQuery>({ document: AllBooksDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'AllBooks', 'query', variables);
    },
    AllBudgets(variables: AllBudgetsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<AllBudgetsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllBudgetsQuery>({ document: AllBudgetsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'AllBudgets', 'query', variables);
    },
    AllJournalEntries(variables: AllJournalEntriesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<AllJournalEntriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllJournalEntriesQuery>({ document: AllJournalEntriesDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'AllJournalEntries', 'query', variables);
    },
    PendingReconciliation(variables: PendingReconciliationQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<PendingReconciliationQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PendingReconciliationQuery>({ document: PendingReconciliationDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'PendingReconciliation', 'query', variables);
    },
    AllSavingsGoals(variables: AllSavingsGoalsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<AllSavingsGoalsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllSavingsGoalsQuery>({ document: AllSavingsGoalsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'AllSavingsGoals', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;