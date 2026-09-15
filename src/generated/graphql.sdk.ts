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

/** An input for mutations affecting `Account` */
export type AccountInput = {
  bookId: Scalars['UUID']['input'];
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isPlaceholder?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['UUID']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  subType?: InputMaybe<AccountSubType>;
  type: AccountType;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
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

/** An input for mutations affecting `AccountMapping` */
export type AccountMappingInput = {
  bookId: Scalars['UUID']['input'];
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  creditAccountId: Scalars['UUID']['input'];
  debitAccountId: Scalars['UUID']['input'];
  eventType: Scalars['String']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
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

/** Represents an update to a `AccountMapping`. Fields that are set will be updated. */
export type AccountMappingPatch = {
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  creditAccountId?: InputMaybe<Scalars['UUID']['input']>;
  debitAccountId?: InputMaybe<Scalars['UUID']['input']>;
  eventType?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

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

/** Represents an update to a `Account`. Fields that are set will be updated. */
export type AccountPatch = {
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isPlaceholder?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['UUID']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  subType?: InputMaybe<AccountSubType>;
  type?: InputMaybe<AccountType>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
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
  FixedAsset = 'fixed_asset',
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
  TaxExpense = 'tax_expense'
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

/** An input for mutations affecting `AccountingPeriod` */
export type AccountingPeriodInput = {
  blockers?: InputMaybe<Scalars['JSON']['input']>;
  bookId: Scalars['UUID']['input'];
  closedAt?: InputMaybe<Scalars['Datetime']['input']>;
  closedBy?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  month: Scalars['Int']['input'];
  reopenedAt?: InputMaybe<Scalars['Datetime']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  year: Scalars['Int']['input'];
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

/** Represents an update to a `AccountingPeriod`. Fields that are set will be updated. */
export type AccountingPeriodPatch = {
  blockers?: InputMaybe<Scalars['JSON']['input']>;
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  closedAt?: InputMaybe<Scalars['Datetime']['input']>;
  closedBy?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  month?: InputMaybe<Scalars['Int']['input']>;
  reopenedAt?: InputMaybe<Scalars['Datetime']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type Book = Node & {
  __typename?: 'Book';
  /** Reads and enables pagination through a set of `AccountMapping`. */
  accountMappings: AccountMappingConnection;
  /** Reads and enables pagination through a set of `AccountingPeriod`. */
  accountingPeriods: AccountingPeriodConnection;
  /** Reads and enables pagination through a set of `Account`. */
  accounts: AccountConnection;
  /** Reads and enables pagination through a set of `BookAccess`. */
  bookAccesses: BookAccessConnection;
  /** Reads and enables pagination through a set of `Budget`. */
  budgets: BudgetConnection;
  /** Reads and enables pagination through a set of `CategorizationRule`. */
  categorizationRules: CategorizationRuleConnection;
  /** Reads and enables pagination through a set of `ConnectedAccount`. */
  connectedAccounts: ConnectedAccountConnection;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads and enables pagination through a set of `CryptoAsset`. */
  cryptoAssets: CryptoAssetConnection;
  currency: Scalars['String']['output'];
  fiscalYearStartMonth: Scalars['Int']['output'];
  /** Reads and enables pagination through a set of `FixedAsset`. */
  fixedAssets: FixedAssetConnection;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  /** Reads and enables pagination through a set of `JournalEntry`. */
  journalEntries: JournalEntryConnection;
  /** Reads and enables pagination through a set of `MileageLog`. */
  mileageLogs: MileageLogConnection;
  name: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `NetWorthSnapshot`. */
  netWorthSnapshots: NetWorthSnapshotConnection;
  organizationId: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `PayrollConnection`. */
  payrollConnections: PayrollConnectionConnection;
  /** Reads and enables pagination through a set of `ReconciliationQueue`. */
  reconciliationQueues: ReconciliationQueueConnection;
  /** Reads and enables pagination through a set of `ReconciliationStatement`. */
  reconciliationStatements: ReconciliationStatementConnection;
  /** Reads and enables pagination through a set of `RecurringTransaction`. */
  recurringTransactions: RecurringTransactionConnection;
  rowId: Scalars['UUID']['output'];
  /** Reads and enables pagination through a set of `SavingsGoal`. */
  savingsGoals: SavingsGoalConnection;
  /** Reads and enables pagination through a set of `TagGroup`. */
  tagGroups: TagGroupConnection;
  /** Reads and enables pagination through a set of `TaxJurisdiction`. */
  taxJurisdictions: TaxJurisdictionConnection;
  type: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads and enables pagination through a set of `Vehicle`. */
  vehicles: VehicleConnection;
  /** Reads and enables pagination through a set of `Vendor`. */
  vendors: VendorConnection;
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

/** An input for mutations affecting `BookAccess` */
export type BookAccessInput = {
  bookId: Scalars['UUID']['input'];
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  invitedAt?: InputMaybe<Scalars['Datetime']['input']>;
  invitedBy?: InputMaybe<Scalars['String']['input']>;
  role: Scalars['String']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  userId: Scalars['String']['input'];
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

/** Represents an update to a `BookAccess`. Fields that are set will be updated. */
export type BookAccessPatch = {
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  invitedAt?: InputMaybe<Scalars['Datetime']['input']>;
  invitedBy?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

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
  /** Filter by the object’s `cryptoAssets` relation. */
  cryptoAssets?: InputMaybe<BookToManyCryptoAssetFilter>;
  /** Some related `cryptoAssets` exist. */
  cryptoAssetsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `fixedAssets` relation. */
  fixedAssets?: InputMaybe<BookToManyFixedAssetFilter>;
  /** Some related `fixedAssets` exist. */
  fixedAssetsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `journalEntries` relation. */
  journalEntries?: InputMaybe<BookToManyJournalEntryFilter>;
  /** Some related `journalEntries` exist. */
  journalEntriesExist?: InputMaybe<Scalars['Boolean']['input']>;
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
  /** Filter by the object’s `reconciliationQueues` relation. */
  reconciliationQueues?: InputMaybe<BookToManyReconciliationQueueFilter>;
  /** Some related `reconciliationQueues` exist. */
  reconciliationQueuesExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `reconciliationStatements` relation. */
  reconciliationStatements?: InputMaybe<BookToManyReconciliationStatementFilter>;
  /** Some related `reconciliationStatements` exist. */
  reconciliationStatementsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `recurringTransactions` relation. */
  recurringTransactions?: InputMaybe<BookToManyRecurringTransactionFilter>;
  /** Some related `recurringTransactions` exist. */
  recurringTransactionsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
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
  /** Filter by the object’s `vehicles` relation. */
  vehicles?: InputMaybe<BookToManyVehicleFilter>;
  /** Some related `vehicles` exist. */
  vehiclesExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `vendors` relation. */
  vendors?: InputMaybe<BookToManyVendorFilter>;
  /** Some related `vendors` exist. */
  vendorsExist?: InputMaybe<Scalars['Boolean']['input']>;
};

/** An input for mutations affecting `Book` */
export type BookInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  fiscalYearStartMonth?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  organizationId: Scalars['String']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  type: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
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

/** Represents an update to a `Book`. Fields that are set will be updated. */
export type BookPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  fiscalYearStartMonth?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  organizationId?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

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

/** A filter to be used against many `CryptoAsset` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyCryptoAssetFilter = {
  /** Every related `CryptoAsset` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<CryptoAssetFilter>;
  /** No related `CryptoAsset` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<CryptoAssetFilter>;
  /** Some related `CryptoAsset` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<CryptoAssetFilter>;
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

/** A filter to be used against many `JournalEntry` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyJournalEntryFilter = {
  /** Every related `JournalEntry` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<JournalEntryFilter>;
  /** No related `JournalEntry` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<JournalEntryFilter>;
  /** Some related `JournalEntry` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<JournalEntryFilter>;
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

/** A filter to be used against many `RecurringTransaction` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyRecurringTransactionFilter = {
  /** Every related `RecurringTransaction` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<RecurringTransactionFilter>;
  /** No related `RecurringTransaction` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<RecurringTransactionFilter>;
  /** Some related `RecurringTransaction` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<RecurringTransactionFilter>;
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

/** A filter to be used against many `Vehicle` object types. All fields are combined with a logical ‘and.’ */
export type BookToManyVehicleFilter = {
  /** Every related `Vehicle` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<VehicleFilter>;
  /** No related `Vehicle` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<VehicleFilter>;
  /** Some related `Vehicle` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<VehicleFilter>;
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

/** An input for mutations affecting `Budget` */
export type BudgetInput = {
  accountId: Scalars['UUID']['input'];
  amount: Scalars['BigFloat']['input'];
  bookId: Scalars['UUID']['input'];
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  period?: InputMaybe<BudgetPeriod>;
  rollover?: InputMaybe<Scalars['Boolean']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
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

/** Represents an update to a `Budget`. Fields that are set will be updated. */
export type BudgetPatch = {
  accountId?: InputMaybe<Scalars['UUID']['input']>;
  amount?: InputMaybe<Scalars['BigFloat']['input']>;
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  period?: InputMaybe<BudgetPeriod>;
  rollover?: InputMaybe<Scalars['Boolean']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export enum BudgetPeriod {
  Monthly = 'monthly',
  Quarterly = 'quarterly',
  Yearly = 'yearly'
}

export type CategorizationRule = Node & {
  __typename?: 'CategorizationRule';
  amountMax?: Maybe<Scalars['BigFloat']['output']>;
  amountMin?: Maybe<Scalars['BigFloat']['output']>;
  /** Reads a single `Book` that is related to this `CategorizationRule`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
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
  rowId: Scalars['UUID']['output'];
  /** Reads a single `Tag` that is related to this `CategorizationRule`. */
  tag?: Maybe<Tag>;
  tagId?: Maybe<Scalars['UUID']['output']>;
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
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `tag` relation. */
  tag?: InputMaybe<TagFilter>;
  /** A related `tag` exists. */
  tagExists?: InputMaybe<Scalars['Boolean']['input']>;
};

/** An input for mutations affecting `CategorizationRule` */
export type CategorizationRuleInput = {
  amountMax?: InputMaybe<Scalars['BigFloat']['input']>;
  amountMin?: InputMaybe<Scalars['BigFloat']['input']>;
  bookId: Scalars['UUID']['input'];
  confidence?: InputMaybe<Scalars['BigFloat']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  creditAccountId: Scalars['UUID']['input'];
  debitAccountId: Scalars['UUID']['input'];
  hitCount?: InputMaybe<Scalars['Int']['input']>;
  lastHitAt?: InputMaybe<Scalars['Datetime']['input']>;
  matchField: Scalars['String']['input'];
  matchType: Scalars['String']['input'];
  matchValue: Scalars['String']['input'];
  name: Scalars['String']['input'];
  priority?: InputMaybe<Scalars['Int']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  tagId?: InputMaybe<Scalars['UUID']['input']>;
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

/** Represents an update to a `CategorizationRule`. Fields that are set will be updated. */
export type CategorizationRulePatch = {
  amountMax?: InputMaybe<Scalars['BigFloat']['input']>;
  amountMin?: InputMaybe<Scalars['BigFloat']['input']>;
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  confidence?: InputMaybe<Scalars['BigFloat']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  creditAccountId?: InputMaybe<Scalars['UUID']['input']>;
  debitAccountId?: InputMaybe<Scalars['UUID']['input']>;
  hitCount?: InputMaybe<Scalars['Int']['input']>;
  lastHitAt?: InputMaybe<Scalars['Datetime']['input']>;
  matchField?: InputMaybe<Scalars['String']['input']>;
  matchType?: InputMaybe<Scalars['String']['input']>;
  matchValue?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  tagId?: InputMaybe<Scalars['UUID']['input']>;
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

/** An input for mutations affecting `ConnectedAccount` */
export type ConnectedAccountInput = {
  accessToken?: InputMaybe<Scalars['String']['input']>;
  accountId?: InputMaybe<Scalars['UUID']['input']>;
  bookId: Scalars['UUID']['input'];
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  institutionName?: InputMaybe<Scalars['String']['input']>;
  lastSyncedAt?: InputMaybe<Scalars['Datetime']['input']>;
  mask?: InputMaybe<Scalars['String']['input']>;
  provider: Scalars['String']['input'];
  providerAccountId?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  syncCursor?: InputMaybe<Scalars['String']['input']>;
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

/** Represents an update to a `ConnectedAccount`. Fields that are set will be updated. */
export type ConnectedAccountPatch = {
  accessToken?: InputMaybe<Scalars['String']['input']>;
  accountId?: InputMaybe<Scalars['UUID']['input']>;
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  institutionName?: InputMaybe<Scalars['String']['input']>;
  lastSyncedAt?: InputMaybe<Scalars['Datetime']['input']>;
  mask?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  providerAccountId?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  syncCursor?: InputMaybe<Scalars['String']['input']>;
};

export enum CostBasisMethod {
  Acb = 'acb',
  Fifo = 'fifo',
  Hifo = 'hifo',
  Lifo = 'lifo'
}

/** All input for the create `Account` mutation. */
export type CreateAccountInput = {
  /** The `Account` to be created by this mutation. */
  account: AccountInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** All input for the create `AccountMapping` mutation. */
export type CreateAccountMappingInput = {
  /** The `AccountMapping` to be created by this mutation. */
  accountMapping: AccountMappingInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our create `AccountMapping` mutation. */
export type CreateAccountMappingPayload = {
  __typename?: 'CreateAccountMappingPayload';
  /** The `AccountMapping` that was created by this mutation. */
  accountMapping?: Maybe<AccountMapping>;
  /** An edge for our `AccountMapping`. May be used by Relay 1. */
  accountMappingEdge?: Maybe<AccountMappingEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `AccountMapping` mutation. */
export type CreateAccountMappingPayloadAccountMappingEdgeArgs = {
  orderBy?: Array<AccountMappingOrderBy>;
};

/** The output of our create `Account` mutation. */
export type CreateAccountPayload = {
  __typename?: 'CreateAccountPayload';
  /** The `Account` that was created by this mutation. */
  account?: Maybe<Account>;
  /** An edge for our `Account`. May be used by Relay 1. */
  accountEdge?: Maybe<AccountEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Account` mutation. */
export type CreateAccountPayloadAccountEdgeArgs = {
  orderBy?: Array<AccountOrderBy>;
};

/** All input for the create `AccountingPeriod` mutation. */
export type CreateAccountingPeriodInput = {
  /** The `AccountingPeriod` to be created by this mutation. */
  accountingPeriod: AccountingPeriodInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our create `AccountingPeriod` mutation. */
export type CreateAccountingPeriodPayload = {
  __typename?: 'CreateAccountingPeriodPayload';
  /** The `AccountingPeriod` that was created by this mutation. */
  accountingPeriod?: Maybe<AccountingPeriod>;
  /** An edge for our `AccountingPeriod`. May be used by Relay 1. */
  accountingPeriodEdge?: Maybe<AccountingPeriodEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `AccountingPeriod` mutation. */
export type CreateAccountingPeriodPayloadAccountingPeriodEdgeArgs = {
  orderBy?: Array<AccountingPeriodOrderBy>;
};

/** All input for the create `BookAccess` mutation. */
export type CreateBookAccessInput = {
  /** The `BookAccess` to be created by this mutation. */
  bookAccess: BookAccessInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our create `BookAccess` mutation. */
export type CreateBookAccessPayload = {
  __typename?: 'CreateBookAccessPayload';
  /** The `BookAccess` that was created by this mutation. */
  bookAccess?: Maybe<BookAccess>;
  /** An edge for our `BookAccess`. May be used by Relay 1. */
  bookAccessEdge?: Maybe<BookAccessEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `BookAccess` mutation. */
export type CreateBookAccessPayloadBookAccessEdgeArgs = {
  orderBy?: Array<BookAccessOrderBy>;
};

/** All input for the create `Book` mutation. */
export type CreateBookInput = {
  /** The `Book` to be created by this mutation. */
  book: BookInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our create `Book` mutation. */
export type CreateBookPayload = {
  __typename?: 'CreateBookPayload';
  /** The `Book` that was created by this mutation. */
  book?: Maybe<Book>;
  /** An edge for our `Book`. May be used by Relay 1. */
  bookEdge?: Maybe<BookEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Book` mutation. */
export type CreateBookPayloadBookEdgeArgs = {
  orderBy?: Array<BookOrderBy>;
};

/** All input for the create `Budget` mutation. */
export type CreateBudgetInput = {
  /** The `Budget` to be created by this mutation. */
  budget: BudgetInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our create `Budget` mutation. */
export type CreateBudgetPayload = {
  __typename?: 'CreateBudgetPayload';
  /** The `Budget` that was created by this mutation. */
  budget?: Maybe<Budget>;
  /** An edge for our `Budget`. May be used by Relay 1. */
  budgetEdge?: Maybe<BudgetEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Budget` mutation. */
export type CreateBudgetPayloadBudgetEdgeArgs = {
  orderBy?: Array<BudgetOrderBy>;
};

/** All input for the create `CategorizationRule` mutation. */
export type CreateCategorizationRuleInput = {
  /** The `CategorizationRule` to be created by this mutation. */
  categorizationRule: CategorizationRuleInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our create `CategorizationRule` mutation. */
export type CreateCategorizationRulePayload = {
  __typename?: 'CreateCategorizationRulePayload';
  /** The `CategorizationRule` that was created by this mutation. */
  categorizationRule?: Maybe<CategorizationRule>;
  /** An edge for our `CategorizationRule`. May be used by Relay 1. */
  categorizationRuleEdge?: Maybe<CategorizationRuleEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `CategorizationRule` mutation. */
export type CreateCategorizationRulePayloadCategorizationRuleEdgeArgs = {
  orderBy?: Array<CategorizationRuleOrderBy>;
};

/** All input for the create `ConnectedAccount` mutation. */
export type CreateConnectedAccountInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `ConnectedAccount` to be created by this mutation. */
  connectedAccount: ConnectedAccountInput;
};

/** The output of our create `ConnectedAccount` mutation. */
export type CreateConnectedAccountPayload = {
  __typename?: 'CreateConnectedAccountPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `ConnectedAccount` that was created by this mutation. */
  connectedAccount?: Maybe<ConnectedAccount>;
  /** An edge for our `ConnectedAccount`. May be used by Relay 1. */
  connectedAccountEdge?: Maybe<ConnectedAccountEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `ConnectedAccount` mutation. */
export type CreateConnectedAccountPayloadConnectedAccountEdgeArgs = {
  orderBy?: Array<ConnectedAccountOrderBy>;
};

/** All input for the create `CryptoAsset` mutation. */
export type CreateCryptoAssetInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `CryptoAsset` to be created by this mutation. */
  cryptoAsset: CryptoAssetInput;
};

/** The output of our create `CryptoAsset` mutation. */
export type CreateCryptoAssetPayload = {
  __typename?: 'CreateCryptoAssetPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `CryptoAsset` that was created by this mutation. */
  cryptoAsset?: Maybe<CryptoAsset>;
  /** An edge for our `CryptoAsset`. May be used by Relay 1. */
  cryptoAssetEdge?: Maybe<CryptoAssetEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `CryptoAsset` mutation. */
export type CreateCryptoAssetPayloadCryptoAssetEdgeArgs = {
  orderBy?: Array<CryptoAssetOrderBy>;
};

/** All input for the create `CryptoLot` mutation. */
export type CreateCryptoLotInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `CryptoLot` to be created by this mutation. */
  cryptoLot: CryptoLotInput;
};

/** The output of our create `CryptoLot` mutation. */
export type CreateCryptoLotPayload = {
  __typename?: 'CreateCryptoLotPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `CryptoLot` that was created by this mutation. */
  cryptoLot?: Maybe<CryptoLot>;
  /** An edge for our `CryptoLot`. May be used by Relay 1. */
  cryptoLotEdge?: Maybe<CryptoLotEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `CryptoLot` mutation. */
export type CreateCryptoLotPayloadCryptoLotEdgeArgs = {
  orderBy?: Array<CryptoLotOrderBy>;
};

/** All input for the create `_DrizzleMigration` mutation. */
export type CreateDrizzleMigrationInput = {
  /** The `_DrizzleMigration` to be created by this mutation. */
  _drizzleMigration: _DrizzleMigrationInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our create `_DrizzleMigration` mutation. */
export type CreateDrizzleMigrationPayload = {
  __typename?: 'CreateDrizzleMigrationPayload';
  /** The `_DrizzleMigration` that was created by this mutation. */
  _drizzleMigration?: Maybe<_DrizzleMigration>;
  /** An edge for our `_DrizzleMigration`. May be used by Relay 1. */
  _drizzleMigrationEdge?: Maybe<_DrizzleMigrationEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `_DrizzleMigration` mutation. */
export type CreateDrizzleMigrationPayload_DrizzleMigrationEdgeArgs = {
  orderBy?: Array<_DrizzleMigrationOrderBy>;
};

/** All input for the create `FixedAsset` mutation. */
export type CreateFixedAssetInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `FixedAsset` to be created by this mutation. */
  fixedAsset: FixedAssetInput;
};

/** The output of our create `FixedAsset` mutation. */
export type CreateFixedAssetPayload = {
  __typename?: 'CreateFixedAssetPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `FixedAsset` that was created by this mutation. */
  fixedAsset?: Maybe<FixedAsset>;
  /** An edge for our `FixedAsset`. May be used by Relay 1. */
  fixedAssetEdge?: Maybe<FixedAssetEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `FixedAsset` mutation. */
export type CreateFixedAssetPayloadFixedAssetEdgeArgs = {
  orderBy?: Array<FixedAssetOrderBy>;
};

/** All input for the create `ImportProfile` mutation. */
export type CreateImportProfileInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `ImportProfile` to be created by this mutation. */
  importProfile: ImportProfileInput;
};

/** The output of our create `ImportProfile` mutation. */
export type CreateImportProfilePayload = {
  __typename?: 'CreateImportProfilePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `ImportProfile` that was created by this mutation. */
  importProfile?: Maybe<ImportProfile>;
  /** An edge for our `ImportProfile`. May be used by Relay 1. */
  importProfileEdge?: Maybe<ImportProfileEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `ImportProfile` mutation. */
export type CreateImportProfilePayloadImportProfileEdgeArgs = {
  orderBy?: Array<ImportProfileOrderBy>;
};

/** All input for the create `JournalEntry` mutation. */
export type CreateJournalEntryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `JournalEntry` to be created by this mutation. */
  journalEntry: JournalEntryInput;
};

/** The output of our create `JournalEntry` mutation. */
export type CreateJournalEntryPayload = {
  __typename?: 'CreateJournalEntryPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `JournalEntry` that was created by this mutation. */
  journalEntry?: Maybe<JournalEntry>;
  /** An edge for our `JournalEntry`. May be used by Relay 1. */
  journalEntryEdge?: Maybe<JournalEntryEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `JournalEntry` mutation. */
export type CreateJournalEntryPayloadJournalEntryEdgeArgs = {
  orderBy?: Array<JournalEntryOrderBy>;
};

/** All input for the create `JournalLine` mutation. */
export type CreateJournalLineInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `JournalLine` to be created by this mutation. */
  journalLine: JournalLineInput;
};

/** The output of our create `JournalLine` mutation. */
export type CreateJournalLinePayload = {
  __typename?: 'CreateJournalLinePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `JournalLine` that was created by this mutation. */
  journalLine?: Maybe<JournalLine>;
  /** An edge for our `JournalLine`. May be used by Relay 1. */
  journalLineEdge?: Maybe<JournalLineEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `JournalLine` mutation. */
export type CreateJournalLinePayloadJournalLineEdgeArgs = {
  orderBy?: Array<JournalLineOrderBy>;
};

/** All input for the create `JournalLineTag` mutation. */
export type CreateJournalLineTagInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `JournalLineTag` to be created by this mutation. */
  journalLineTag: JournalLineTagInput;
};

/** The output of our create `JournalLineTag` mutation. */
export type CreateJournalLineTagPayload = {
  __typename?: 'CreateJournalLineTagPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `JournalLineTag` that was created by this mutation. */
  journalLineTag?: Maybe<JournalLineTag>;
  /** An edge for our `JournalLineTag`. May be used by Relay 1. */
  journalLineTagEdge?: Maybe<JournalLineTagEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `JournalLineTag` mutation. */
export type CreateJournalLineTagPayloadJournalLineTagEdgeArgs = {
  orderBy?: Array<JournalLineTagOrderBy>;
};

/** All input for the create `MileageLog` mutation. */
export type CreateMileageLogInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `MileageLog` to be created by this mutation. */
  mileageLog: MileageLogInput;
};

/** The output of our create `MileageLog` mutation. */
export type CreateMileageLogPayload = {
  __typename?: 'CreateMileageLogPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `MileageLog` that was created by this mutation. */
  mileageLog?: Maybe<MileageLog>;
  /** An edge for our `MileageLog`. May be used by Relay 1. */
  mileageLogEdge?: Maybe<MileageLogEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `MileageLog` mutation. */
export type CreateMileageLogPayloadMileageLogEdgeArgs = {
  orderBy?: Array<MileageLogOrderBy>;
};

/** All input for the create `NetWorthSnapshot` mutation. */
export type CreateNetWorthSnapshotInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `NetWorthSnapshot` to be created by this mutation. */
  netWorthSnapshot: NetWorthSnapshotInput;
};

/** The output of our create `NetWorthSnapshot` mutation. */
export type CreateNetWorthSnapshotPayload = {
  __typename?: 'CreateNetWorthSnapshotPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `NetWorthSnapshot` that was created by this mutation. */
  netWorthSnapshot?: Maybe<NetWorthSnapshot>;
  /** An edge for our `NetWorthSnapshot`. May be used by Relay 1. */
  netWorthSnapshotEdge?: Maybe<NetWorthSnapshotEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `NetWorthSnapshot` mutation. */
export type CreateNetWorthSnapshotPayloadNetWorthSnapshotEdgeArgs = {
  orderBy?: Array<NetWorthSnapshotOrderBy>;
};

/** All input for the create `PayrollConnection` mutation. */
export type CreatePayrollConnectionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `PayrollConnection` to be created by this mutation. */
  payrollConnection: PayrollConnectionInput;
};

/** The output of our create `PayrollConnection` mutation. */
export type CreatePayrollConnectionPayload = {
  __typename?: 'CreatePayrollConnectionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `PayrollConnection` that was created by this mutation. */
  payrollConnection?: Maybe<PayrollConnection>;
  /** An edge for our `PayrollConnection`. May be used by Relay 1. */
  payrollConnectionEdge?: Maybe<PayrollConnectionEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `PayrollConnection` mutation. */
export type CreatePayrollConnectionPayloadPayrollConnectionEdgeArgs = {
  orderBy?: Array<PayrollConnectionOrderBy>;
};

/** All input for the create `ReconciliationQueue` mutation. */
export type CreateReconciliationQueueInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `ReconciliationQueue` to be created by this mutation. */
  reconciliationQueue: ReconciliationQueueInput;
};

/** The output of our create `ReconciliationQueue` mutation. */
export type CreateReconciliationQueuePayload = {
  __typename?: 'CreateReconciliationQueuePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `ReconciliationQueue` that was created by this mutation. */
  reconciliationQueue?: Maybe<ReconciliationQueue>;
  /** An edge for our `ReconciliationQueue`. May be used by Relay 1. */
  reconciliationQueueEdge?: Maybe<ReconciliationQueueEdge>;
};


/** The output of our create `ReconciliationQueue` mutation. */
export type CreateReconciliationQueuePayloadReconciliationQueueEdgeArgs = {
  orderBy?: Array<ReconciliationQueueOrderBy>;
};

/** All input for the create `ReconciliationStatement` mutation. */
export type CreateReconciliationStatementInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `ReconciliationStatement` to be created by this mutation. */
  reconciliationStatement: ReconciliationStatementInput;
};

/** The output of our create `ReconciliationStatement` mutation. */
export type CreateReconciliationStatementPayload = {
  __typename?: 'CreateReconciliationStatementPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `ReconciliationStatement` that was created by this mutation. */
  reconciliationStatement?: Maybe<ReconciliationStatement>;
  /** An edge for our `ReconciliationStatement`. May be used by Relay 1. */
  reconciliationStatementEdge?: Maybe<ReconciliationStatementEdge>;
};


/** The output of our create `ReconciliationStatement` mutation. */
export type CreateReconciliationStatementPayloadReconciliationStatementEdgeArgs = {
  orderBy?: Array<ReconciliationStatementOrderBy>;
};

/** All input for the create `RecurringTransaction` mutation. */
export type CreateRecurringTransactionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `RecurringTransaction` to be created by this mutation. */
  recurringTransaction: RecurringTransactionInput;
};

/** The output of our create `RecurringTransaction` mutation. */
export type CreateRecurringTransactionPayload = {
  __typename?: 'CreateRecurringTransactionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `RecurringTransaction` that was created by this mutation. */
  recurringTransaction?: Maybe<RecurringTransaction>;
  /** An edge for our `RecurringTransaction`. May be used by Relay 1. */
  recurringTransactionEdge?: Maybe<RecurringTransactionEdge>;
};


/** The output of our create `RecurringTransaction` mutation. */
export type CreateRecurringTransactionPayloadRecurringTransactionEdgeArgs = {
  orderBy?: Array<RecurringTransactionOrderBy>;
};

/** All input for the create `SavingsGoal` mutation. */
export type CreateSavingsGoalInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `SavingsGoal` to be created by this mutation. */
  savingsGoal: SavingsGoalInput;
};

/** The output of our create `SavingsGoal` mutation. */
export type CreateSavingsGoalPayload = {
  __typename?: 'CreateSavingsGoalPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SavingsGoal` that was created by this mutation. */
  savingsGoal?: Maybe<SavingsGoal>;
  /** An edge for our `SavingsGoal`. May be used by Relay 1. */
  savingsGoalEdge?: Maybe<SavingsGoalEdge>;
};


/** The output of our create `SavingsGoal` mutation. */
export type CreateSavingsGoalPayloadSavingsGoalEdgeArgs = {
  orderBy?: Array<SavingsGoalOrderBy>;
};

/** All input for the create `TagGroup` mutation. */
export type CreateTagGroupInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `TagGroup` to be created by this mutation. */
  tagGroup: TagGroupInput;
};

/** The output of our create `TagGroup` mutation. */
export type CreateTagGroupPayload = {
  __typename?: 'CreateTagGroupPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `TagGroup` that was created by this mutation. */
  tagGroup?: Maybe<TagGroup>;
  /** An edge for our `TagGroup`. May be used by Relay 1. */
  tagGroupEdge?: Maybe<TagGroupEdge>;
};


/** The output of our create `TagGroup` mutation. */
export type CreateTagGroupPayloadTagGroupEdgeArgs = {
  orderBy?: Array<TagGroupOrderBy>;
};

/** All input for the create `Tag` mutation. */
export type CreateTagInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Tag` to be created by this mutation. */
  tag: TagInput;
};

/** The output of our create `Tag` mutation. */
export type CreateTagPayload = {
  __typename?: 'CreateTagPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Tag` that was created by this mutation. */
  tag?: Maybe<Tag>;
  /** An edge for our `Tag`. May be used by Relay 1. */
  tagEdge?: Maybe<TagEdge>;
};


/** The output of our create `Tag` mutation. */
export type CreateTagPayloadTagEdgeArgs = {
  orderBy?: Array<TagOrderBy>;
};

/** All input for the create `TaxJurisdiction` mutation. */
export type CreateTaxJurisdictionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `TaxJurisdiction` to be created by this mutation. */
  taxJurisdiction: TaxJurisdictionInput;
};

/** The output of our create `TaxJurisdiction` mutation. */
export type CreateTaxJurisdictionPayload = {
  __typename?: 'CreateTaxJurisdictionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `TaxJurisdiction` that was created by this mutation. */
  taxJurisdiction?: Maybe<TaxJurisdiction>;
  /** An edge for our `TaxJurisdiction`. May be used by Relay 1. */
  taxJurisdictionEdge?: Maybe<TaxJurisdictionEdge>;
};


/** The output of our create `TaxJurisdiction` mutation. */
export type CreateTaxJurisdictionPayloadTaxJurisdictionEdgeArgs = {
  orderBy?: Array<TaxJurisdictionOrderBy>;
};

/** All input for the create `Vehicle` mutation. */
export type CreateVehicleInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Vehicle` to be created by this mutation. */
  vehicle: VehicleInput;
};

/** The output of our create `Vehicle` mutation. */
export type CreateVehiclePayload = {
  __typename?: 'CreateVehiclePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Vehicle` that was created by this mutation. */
  vehicle?: Maybe<Vehicle>;
  /** An edge for our `Vehicle`. May be used by Relay 1. */
  vehicleEdge?: Maybe<VehicleEdge>;
};


/** The output of our create `Vehicle` mutation. */
export type CreateVehiclePayloadVehicleEdgeArgs = {
  orderBy?: Array<VehicleOrderBy>;
};

/** All input for the create `Vendor` mutation. */
export type CreateVendorInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Vendor` to be created by this mutation. */
  vendor: VendorInput;
};

/** The output of our create `Vendor` mutation. */
export type CreateVendorPayload = {
  __typename?: 'CreateVendorPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Vendor` that was created by this mutation. */
  vendor?: Maybe<Vendor>;
  /** An edge for our `Vendor`. May be used by Relay 1. */
  vendorEdge?: Maybe<VendorEdge>;
};


/** The output of our create `Vendor` mutation. */
export type CreateVendorPayloadVendorEdgeArgs = {
  orderBy?: Array<VendorOrderBy>;
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

/** An input for mutations affecting `CryptoAsset` */
export type CryptoAssetInput = {
  balance?: InputMaybe<Scalars['BigFloat']['input']>;
  bookId: Scalars['UUID']['input'];
  costBasisMethod?: InputMaybe<CostBasisMethod>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  lastSyncedAt?: InputMaybe<Scalars['Datetime']['input']>;
  name: Scalars['String']['input'];
  network?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  symbol: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  walletAddress?: InputMaybe<Scalars['String']['input']>;
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

/** Represents an update to a `CryptoAsset`. Fields that are set will be updated. */
export type CryptoAssetPatch = {
  balance?: InputMaybe<Scalars['BigFloat']['input']>;
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  costBasisMethod?: InputMaybe<CostBasisMethod>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  lastSyncedAt?: InputMaybe<Scalars['Datetime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  network?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  symbol?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  walletAddress?: InputMaybe<Scalars['String']['input']>;
};

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

/** An input for mutations affecting `CryptoLot` */
export type CryptoLotInput = {
  acquiredAt: Scalars['Datetime']['input'];
  costPerUnit: Scalars['BigFloat']['input'];
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  cryptoAssetId: Scalars['UUID']['input'];
  disposedAt?: InputMaybe<Scalars['Datetime']['input']>;
  journalEntryId?: InputMaybe<Scalars['UUID']['input']>;
  proceedsPerUnit?: InputMaybe<Scalars['BigFloat']['input']>;
  quantity: Scalars['BigFloat']['input'];
  remainingQuantity: Scalars['BigFloat']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
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

/** Represents an update to a `CryptoLot`. Fields that are set will be updated. */
export type CryptoLotPatch = {
  acquiredAt?: InputMaybe<Scalars['Datetime']['input']>;
  costPerUnit?: InputMaybe<Scalars['BigFloat']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  cryptoAssetId?: InputMaybe<Scalars['UUID']['input']>;
  disposedAt?: InputMaybe<Scalars['Datetime']['input']>;
  journalEntryId?: InputMaybe<Scalars['UUID']['input']>;
  proceedsPerUnit?: InputMaybe<Scalars['BigFloat']['input']>;
  quantity?: InputMaybe<Scalars['BigFloat']['input']>;
  remainingQuantity?: InputMaybe<Scalars['BigFloat']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
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

/** All input for the `deleteAccountById` mutation. */
export type DeleteAccountByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Account` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteAccount` mutation. */
export type DeleteAccountInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** All input for the `deleteAccountMappingById` mutation. */
export type DeleteAccountMappingByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `AccountMapping` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteAccountMapping` mutation. */
export type DeleteAccountMappingInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `AccountMapping` mutation. */
export type DeleteAccountMappingPayload = {
  __typename?: 'DeleteAccountMappingPayload';
  /** The `AccountMapping` that was deleted by this mutation. */
  accountMapping?: Maybe<AccountMapping>;
  /** An edge for our `AccountMapping`. May be used by Relay 1. */
  accountMappingEdge?: Maybe<AccountMappingEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedAccountMappingId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `AccountMapping` mutation. */
export type DeleteAccountMappingPayloadAccountMappingEdgeArgs = {
  orderBy?: Array<AccountMappingOrderBy>;
};

/** The output of our delete `Account` mutation. */
export type DeleteAccountPayload = {
  __typename?: 'DeleteAccountPayload';
  /** The `Account` that was deleted by this mutation. */
  account?: Maybe<Account>;
  /** An edge for our `Account`. May be used by Relay 1. */
  accountEdge?: Maybe<AccountEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedAccountId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Account` mutation. */
export type DeleteAccountPayloadAccountEdgeArgs = {
  orderBy?: Array<AccountOrderBy>;
};

/** All input for the `deleteAccountingPeriodById` mutation. */
export type DeleteAccountingPeriodByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `AccountingPeriod` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteAccountingPeriod` mutation. */
export type DeleteAccountingPeriodInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `AccountingPeriod` mutation. */
export type DeleteAccountingPeriodPayload = {
  __typename?: 'DeleteAccountingPeriodPayload';
  /** The `AccountingPeriod` that was deleted by this mutation. */
  accountingPeriod?: Maybe<AccountingPeriod>;
  /** An edge for our `AccountingPeriod`. May be used by Relay 1. */
  accountingPeriodEdge?: Maybe<AccountingPeriodEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedAccountingPeriodId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `AccountingPeriod` mutation. */
export type DeleteAccountingPeriodPayloadAccountingPeriodEdgeArgs = {
  orderBy?: Array<AccountingPeriodOrderBy>;
};

/** All input for the `deleteBookAccessById` mutation. */
export type DeleteBookAccessByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `BookAccess` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteBookAccess` mutation. */
export type DeleteBookAccessInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `BookAccess` mutation. */
export type DeleteBookAccessPayload = {
  __typename?: 'DeleteBookAccessPayload';
  /** The `BookAccess` that was deleted by this mutation. */
  bookAccess?: Maybe<BookAccess>;
  /** An edge for our `BookAccess`. May be used by Relay 1. */
  bookAccessEdge?: Maybe<BookAccessEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedBookAccessId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `BookAccess` mutation. */
export type DeleteBookAccessPayloadBookAccessEdgeArgs = {
  orderBy?: Array<BookAccessOrderBy>;
};

/** All input for the `deleteBookById` mutation. */
export type DeleteBookByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Book` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteBook` mutation. */
export type DeleteBookInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `Book` mutation. */
export type DeleteBookPayload = {
  __typename?: 'DeleteBookPayload';
  /** The `Book` that was deleted by this mutation. */
  book?: Maybe<Book>;
  /** An edge for our `Book`. May be used by Relay 1. */
  bookEdge?: Maybe<BookEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedBookId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Book` mutation. */
export type DeleteBookPayloadBookEdgeArgs = {
  orderBy?: Array<BookOrderBy>;
};

/** All input for the `deleteBudgetById` mutation. */
export type DeleteBudgetByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Budget` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteBudget` mutation. */
export type DeleteBudgetInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `Budget` mutation. */
export type DeleteBudgetPayload = {
  __typename?: 'DeleteBudgetPayload';
  /** The `Budget` that was deleted by this mutation. */
  budget?: Maybe<Budget>;
  /** An edge for our `Budget`. May be used by Relay 1. */
  budgetEdge?: Maybe<BudgetEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedBudgetId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Budget` mutation. */
export type DeleteBudgetPayloadBudgetEdgeArgs = {
  orderBy?: Array<BudgetOrderBy>;
};

/** All input for the `deleteCategorizationRuleById` mutation. */
export type DeleteCategorizationRuleByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `CategorizationRule` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteCategorizationRule` mutation. */
export type DeleteCategorizationRuleInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `CategorizationRule` mutation. */
export type DeleteCategorizationRulePayload = {
  __typename?: 'DeleteCategorizationRulePayload';
  /** The `CategorizationRule` that was deleted by this mutation. */
  categorizationRule?: Maybe<CategorizationRule>;
  /** An edge for our `CategorizationRule`. May be used by Relay 1. */
  categorizationRuleEdge?: Maybe<CategorizationRuleEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedCategorizationRuleId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `CategorizationRule` mutation. */
export type DeleteCategorizationRulePayloadCategorizationRuleEdgeArgs = {
  orderBy?: Array<CategorizationRuleOrderBy>;
};

/** All input for the `deleteConnectedAccountById` mutation. */
export type DeleteConnectedAccountByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `ConnectedAccount` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteConnectedAccount` mutation. */
export type DeleteConnectedAccountInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `ConnectedAccount` mutation. */
export type DeleteConnectedAccountPayload = {
  __typename?: 'DeleteConnectedAccountPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `ConnectedAccount` that was deleted by this mutation. */
  connectedAccount?: Maybe<ConnectedAccount>;
  /** An edge for our `ConnectedAccount`. May be used by Relay 1. */
  connectedAccountEdge?: Maybe<ConnectedAccountEdge>;
  deletedConnectedAccountId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `ConnectedAccount` mutation. */
export type DeleteConnectedAccountPayloadConnectedAccountEdgeArgs = {
  orderBy?: Array<ConnectedAccountOrderBy>;
};

/** All input for the `deleteCryptoAssetById` mutation. */
export type DeleteCryptoAssetByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `CryptoAsset` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteCryptoAsset` mutation. */
export type DeleteCryptoAssetInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `CryptoAsset` mutation. */
export type DeleteCryptoAssetPayload = {
  __typename?: 'DeleteCryptoAssetPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `CryptoAsset` that was deleted by this mutation. */
  cryptoAsset?: Maybe<CryptoAsset>;
  /** An edge for our `CryptoAsset`. May be used by Relay 1. */
  cryptoAssetEdge?: Maybe<CryptoAssetEdge>;
  deletedCryptoAssetId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `CryptoAsset` mutation. */
export type DeleteCryptoAssetPayloadCryptoAssetEdgeArgs = {
  orderBy?: Array<CryptoAssetOrderBy>;
};

/** All input for the `deleteCryptoLotById` mutation. */
export type DeleteCryptoLotByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `CryptoLot` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteCryptoLot` mutation. */
export type DeleteCryptoLotInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `CryptoLot` mutation. */
export type DeleteCryptoLotPayload = {
  __typename?: 'DeleteCryptoLotPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `CryptoLot` that was deleted by this mutation. */
  cryptoLot?: Maybe<CryptoLot>;
  /** An edge for our `CryptoLot`. May be used by Relay 1. */
  cryptoLotEdge?: Maybe<CryptoLotEdge>;
  deletedCryptoLotId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `CryptoLot` mutation. */
export type DeleteCryptoLotPayloadCryptoLotEdgeArgs = {
  orderBy?: Array<CryptoLotOrderBy>;
};

/** All input for the `deleteDrizzleMigrationById` mutation. */
export type DeleteDrizzleMigrationByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `_DrizzleMigration` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteDrizzleMigration` mutation. */
export type DeleteDrizzleMigrationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['Int']['input'];
};

/** The output of our delete `_DrizzleMigration` mutation. */
export type DeleteDrizzleMigrationPayload = {
  __typename?: 'DeleteDrizzleMigrationPayload';
  /** The `_DrizzleMigration` that was deleted by this mutation. */
  _drizzleMigration?: Maybe<_DrizzleMigration>;
  /** An edge for our `_DrizzleMigration`. May be used by Relay 1. */
  _drizzleMigrationEdge?: Maybe<_DrizzleMigrationEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedDrizzleMigrationId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `_DrizzleMigration` mutation. */
export type DeleteDrizzleMigrationPayload_DrizzleMigrationEdgeArgs = {
  orderBy?: Array<_DrizzleMigrationOrderBy>;
};

/** All input for the `deleteFixedAssetById` mutation. */
export type DeleteFixedAssetByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `FixedAsset` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteFixedAsset` mutation. */
export type DeleteFixedAssetInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `FixedAsset` mutation. */
export type DeleteFixedAssetPayload = {
  __typename?: 'DeleteFixedAssetPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedFixedAssetId?: Maybe<Scalars['ID']['output']>;
  /** The `FixedAsset` that was deleted by this mutation. */
  fixedAsset?: Maybe<FixedAsset>;
  /** An edge for our `FixedAsset`. May be used by Relay 1. */
  fixedAssetEdge?: Maybe<FixedAssetEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `FixedAsset` mutation. */
export type DeleteFixedAssetPayloadFixedAssetEdgeArgs = {
  orderBy?: Array<FixedAssetOrderBy>;
};

/** All input for the `deleteImportProfileById` mutation. */
export type DeleteImportProfileByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `ImportProfile` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteImportProfile` mutation. */
export type DeleteImportProfileInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `ImportProfile` mutation. */
export type DeleteImportProfilePayload = {
  __typename?: 'DeleteImportProfilePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedImportProfileId?: Maybe<Scalars['ID']['output']>;
  /** The `ImportProfile` that was deleted by this mutation. */
  importProfile?: Maybe<ImportProfile>;
  /** An edge for our `ImportProfile`. May be used by Relay 1. */
  importProfileEdge?: Maybe<ImportProfileEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `ImportProfile` mutation. */
export type DeleteImportProfilePayloadImportProfileEdgeArgs = {
  orderBy?: Array<ImportProfileOrderBy>;
};

/** All input for the `deleteJournalEntryById` mutation. */
export type DeleteJournalEntryByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `JournalEntry` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteJournalEntry` mutation. */
export type DeleteJournalEntryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `JournalEntry` mutation. */
export type DeleteJournalEntryPayload = {
  __typename?: 'DeleteJournalEntryPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedJournalEntryId?: Maybe<Scalars['ID']['output']>;
  /** The `JournalEntry` that was deleted by this mutation. */
  journalEntry?: Maybe<JournalEntry>;
  /** An edge for our `JournalEntry`. May be used by Relay 1. */
  journalEntryEdge?: Maybe<JournalEntryEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `JournalEntry` mutation. */
export type DeleteJournalEntryPayloadJournalEntryEdgeArgs = {
  orderBy?: Array<JournalEntryOrderBy>;
};

/** All input for the `deleteJournalLineById` mutation. */
export type DeleteJournalLineByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `JournalLine` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteJournalLine` mutation. */
export type DeleteJournalLineInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `JournalLine` mutation. */
export type DeleteJournalLinePayload = {
  __typename?: 'DeleteJournalLinePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedJournalLineId?: Maybe<Scalars['ID']['output']>;
  /** The `JournalLine` that was deleted by this mutation. */
  journalLine?: Maybe<JournalLine>;
  /** An edge for our `JournalLine`. May be used by Relay 1. */
  journalLineEdge?: Maybe<JournalLineEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `JournalLine` mutation. */
export type DeleteJournalLinePayloadJournalLineEdgeArgs = {
  orderBy?: Array<JournalLineOrderBy>;
};

/** All input for the `deleteJournalLineTagById` mutation. */
export type DeleteJournalLineTagByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `JournalLineTag` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteJournalLineTag` mutation. */
export type DeleteJournalLineTagInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `JournalLineTag` mutation. */
export type DeleteJournalLineTagPayload = {
  __typename?: 'DeleteJournalLineTagPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedJournalLineTagId?: Maybe<Scalars['ID']['output']>;
  /** The `JournalLineTag` that was deleted by this mutation. */
  journalLineTag?: Maybe<JournalLineTag>;
  /** An edge for our `JournalLineTag`. May be used by Relay 1. */
  journalLineTagEdge?: Maybe<JournalLineTagEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `JournalLineTag` mutation. */
export type DeleteJournalLineTagPayloadJournalLineTagEdgeArgs = {
  orderBy?: Array<JournalLineTagOrderBy>;
};

/** All input for the `deleteMileageLogById` mutation. */
export type DeleteMileageLogByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `MileageLog` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteMileageLog` mutation. */
export type DeleteMileageLogInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `MileageLog` mutation. */
export type DeleteMileageLogPayload = {
  __typename?: 'DeleteMileageLogPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedMileageLogId?: Maybe<Scalars['ID']['output']>;
  /** The `MileageLog` that was deleted by this mutation. */
  mileageLog?: Maybe<MileageLog>;
  /** An edge for our `MileageLog`. May be used by Relay 1. */
  mileageLogEdge?: Maybe<MileageLogEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `MileageLog` mutation. */
export type DeleteMileageLogPayloadMileageLogEdgeArgs = {
  orderBy?: Array<MileageLogOrderBy>;
};

/** All input for the `deleteNetWorthSnapshotById` mutation. */
export type DeleteNetWorthSnapshotByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `NetWorthSnapshot` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteNetWorthSnapshot` mutation. */
export type DeleteNetWorthSnapshotInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `NetWorthSnapshot` mutation. */
export type DeleteNetWorthSnapshotPayload = {
  __typename?: 'DeleteNetWorthSnapshotPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedNetWorthSnapshotId?: Maybe<Scalars['ID']['output']>;
  /** The `NetWorthSnapshot` that was deleted by this mutation. */
  netWorthSnapshot?: Maybe<NetWorthSnapshot>;
  /** An edge for our `NetWorthSnapshot`. May be used by Relay 1. */
  netWorthSnapshotEdge?: Maybe<NetWorthSnapshotEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `NetWorthSnapshot` mutation. */
export type DeleteNetWorthSnapshotPayloadNetWorthSnapshotEdgeArgs = {
  orderBy?: Array<NetWorthSnapshotOrderBy>;
};

/** All input for the `deletePayrollConnectionById` mutation. */
export type DeletePayrollConnectionByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `PayrollConnection` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deletePayrollConnection` mutation. */
export type DeletePayrollConnectionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `PayrollConnection` mutation. */
export type DeletePayrollConnectionPayload = {
  __typename?: 'DeletePayrollConnectionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedPayrollConnectionId?: Maybe<Scalars['ID']['output']>;
  /** The `PayrollConnection` that was deleted by this mutation. */
  payrollConnection?: Maybe<PayrollConnection>;
  /** An edge for our `PayrollConnection`. May be used by Relay 1. */
  payrollConnectionEdge?: Maybe<PayrollConnectionEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `PayrollConnection` mutation. */
export type DeletePayrollConnectionPayloadPayrollConnectionEdgeArgs = {
  orderBy?: Array<PayrollConnectionOrderBy>;
};

/** All input for the `deleteReconciliationQueueById` mutation. */
export type DeleteReconciliationQueueByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `ReconciliationQueue` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteReconciliationQueue` mutation. */
export type DeleteReconciliationQueueInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `ReconciliationQueue` mutation. */
export type DeleteReconciliationQueuePayload = {
  __typename?: 'DeleteReconciliationQueuePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedReconciliationQueueId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `ReconciliationQueue` that was deleted by this mutation. */
  reconciliationQueue?: Maybe<ReconciliationQueue>;
  /** An edge for our `ReconciliationQueue`. May be used by Relay 1. */
  reconciliationQueueEdge?: Maybe<ReconciliationQueueEdge>;
};


/** The output of our delete `ReconciliationQueue` mutation. */
export type DeleteReconciliationQueuePayloadReconciliationQueueEdgeArgs = {
  orderBy?: Array<ReconciliationQueueOrderBy>;
};

/** All input for the `deleteReconciliationStatementById` mutation. */
export type DeleteReconciliationStatementByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `ReconciliationStatement` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteReconciliationStatement` mutation. */
export type DeleteReconciliationStatementInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `ReconciliationStatement` mutation. */
export type DeleteReconciliationStatementPayload = {
  __typename?: 'DeleteReconciliationStatementPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedReconciliationStatementId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `ReconciliationStatement` that was deleted by this mutation. */
  reconciliationStatement?: Maybe<ReconciliationStatement>;
  /** An edge for our `ReconciliationStatement`. May be used by Relay 1. */
  reconciliationStatementEdge?: Maybe<ReconciliationStatementEdge>;
};


/** The output of our delete `ReconciliationStatement` mutation. */
export type DeleteReconciliationStatementPayloadReconciliationStatementEdgeArgs = {
  orderBy?: Array<ReconciliationStatementOrderBy>;
};

/** All input for the `deleteRecurringTransactionById` mutation. */
export type DeleteRecurringTransactionByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `RecurringTransaction` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteRecurringTransaction` mutation. */
export type DeleteRecurringTransactionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `RecurringTransaction` mutation. */
export type DeleteRecurringTransactionPayload = {
  __typename?: 'DeleteRecurringTransactionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedRecurringTransactionId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `RecurringTransaction` that was deleted by this mutation. */
  recurringTransaction?: Maybe<RecurringTransaction>;
  /** An edge for our `RecurringTransaction`. May be used by Relay 1. */
  recurringTransactionEdge?: Maybe<RecurringTransactionEdge>;
};


/** The output of our delete `RecurringTransaction` mutation. */
export type DeleteRecurringTransactionPayloadRecurringTransactionEdgeArgs = {
  orderBy?: Array<RecurringTransactionOrderBy>;
};

/** All input for the `deleteSavingsGoalById` mutation. */
export type DeleteSavingsGoalByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `SavingsGoal` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteSavingsGoal` mutation. */
export type DeleteSavingsGoalInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `SavingsGoal` mutation. */
export type DeleteSavingsGoalPayload = {
  __typename?: 'DeleteSavingsGoalPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedSavingsGoalId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SavingsGoal` that was deleted by this mutation. */
  savingsGoal?: Maybe<SavingsGoal>;
  /** An edge for our `SavingsGoal`. May be used by Relay 1. */
  savingsGoalEdge?: Maybe<SavingsGoalEdge>;
};


/** The output of our delete `SavingsGoal` mutation. */
export type DeleteSavingsGoalPayloadSavingsGoalEdgeArgs = {
  orderBy?: Array<SavingsGoalOrderBy>;
};

/** All input for the `deleteTagById` mutation. */
export type DeleteTagByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Tag` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteTagGroupById` mutation. */
export type DeleteTagGroupByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `TagGroup` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteTagGroup` mutation. */
export type DeleteTagGroupInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `TagGroup` mutation. */
export type DeleteTagGroupPayload = {
  __typename?: 'DeleteTagGroupPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedTagGroupId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `TagGroup` that was deleted by this mutation. */
  tagGroup?: Maybe<TagGroup>;
  /** An edge for our `TagGroup`. May be used by Relay 1. */
  tagGroupEdge?: Maybe<TagGroupEdge>;
};


/** The output of our delete `TagGroup` mutation. */
export type DeleteTagGroupPayloadTagGroupEdgeArgs = {
  orderBy?: Array<TagGroupOrderBy>;
};

/** All input for the `deleteTag` mutation. */
export type DeleteTagInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `Tag` mutation. */
export type DeleteTagPayload = {
  __typename?: 'DeleteTagPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedTagId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Tag` that was deleted by this mutation. */
  tag?: Maybe<Tag>;
  /** An edge for our `Tag`. May be used by Relay 1. */
  tagEdge?: Maybe<TagEdge>;
};


/** The output of our delete `Tag` mutation. */
export type DeleteTagPayloadTagEdgeArgs = {
  orderBy?: Array<TagOrderBy>;
};

/** All input for the `deleteTaxJurisdictionById` mutation. */
export type DeleteTaxJurisdictionByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `TaxJurisdiction` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteTaxJurisdiction` mutation. */
export type DeleteTaxJurisdictionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `TaxJurisdiction` mutation. */
export type DeleteTaxJurisdictionPayload = {
  __typename?: 'DeleteTaxJurisdictionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedTaxJurisdictionId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `TaxJurisdiction` that was deleted by this mutation. */
  taxJurisdiction?: Maybe<TaxJurisdiction>;
  /** An edge for our `TaxJurisdiction`. May be used by Relay 1. */
  taxJurisdictionEdge?: Maybe<TaxJurisdictionEdge>;
};


/** The output of our delete `TaxJurisdiction` mutation. */
export type DeleteTaxJurisdictionPayloadTaxJurisdictionEdgeArgs = {
  orderBy?: Array<TaxJurisdictionOrderBy>;
};

/** All input for the `deleteVehicleById` mutation. */
export type DeleteVehicleByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Vehicle` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteVehicle` mutation. */
export type DeleteVehicleInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `Vehicle` mutation. */
export type DeleteVehiclePayload = {
  __typename?: 'DeleteVehiclePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedVehicleId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Vehicle` that was deleted by this mutation. */
  vehicle?: Maybe<Vehicle>;
  /** An edge for our `Vehicle`. May be used by Relay 1. */
  vehicleEdge?: Maybe<VehicleEdge>;
};


/** The output of our delete `Vehicle` mutation. */
export type DeleteVehiclePayloadVehicleEdgeArgs = {
  orderBy?: Array<VehicleOrderBy>;
};

/** All input for the `deleteVendorById` mutation. */
export type DeleteVendorByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Vendor` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteVendor` mutation. */
export type DeleteVendorInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `Vendor` mutation. */
export type DeleteVendorPayload = {
  __typename?: 'DeleteVendorPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedVendorId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Vendor` that was deleted by this mutation. */
  vendor?: Maybe<Vendor>;
  /** An edge for our `Vendor`. May be used by Relay 1. */
  vendorEdge?: Maybe<VendorEdge>;
};


/** The output of our delete `Vendor` mutation. */
export type DeleteVendorPayloadVendorEdgeArgs = {
  orderBy?: Array<VendorOrderBy>;
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

/** An input for mutations affecting `FixedAsset` */
export type FixedAssetInput = {
  accumulatedDepreciationAccountId: Scalars['UUID']['input'];
  acquisitionCost: Scalars['BigFloat']['input'];
  acquisitionDate: Scalars['String']['input'];
  assetAccountId: Scalars['UUID']['input'];
  bookId: Scalars['UUID']['input'];
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  depreciationExpenseAccountId: Scalars['UUID']['input'];
  depreciationMethod: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  disposalProceeds?: InputMaybe<Scalars['BigFloat']['input']>;
  disposedAt?: InputMaybe<Scalars['String']['input']>;
  macrsClass?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  salvageValue?: InputMaybe<Scalars['BigFloat']['input']>;
  usefulLifeMonths: Scalars['Int']['input'];
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

/** Represents an update to a `FixedAsset`. Fields that are set will be updated. */
export type FixedAssetPatch = {
  accumulatedDepreciationAccountId?: InputMaybe<Scalars['UUID']['input']>;
  acquisitionCost?: InputMaybe<Scalars['BigFloat']['input']>;
  acquisitionDate?: InputMaybe<Scalars['String']['input']>;
  assetAccountId?: InputMaybe<Scalars['UUID']['input']>;
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  depreciationExpenseAccountId?: InputMaybe<Scalars['UUID']['input']>;
  depreciationMethod?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  disposalProceeds?: InputMaybe<Scalars['BigFloat']['input']>;
  disposedAt?: InputMaybe<Scalars['String']['input']>;
  macrsClass?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  salvageValue?: InputMaybe<Scalars['BigFloat']['input']>;
  usefulLifeMonths?: InputMaybe<Scalars['Int']['input']>;
};

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

/** An input for mutations affecting `ImportProfile` */
export type ImportProfileInput = {
  bookId: Scalars['UUID']['input'];
  columnMap: Scalars['JSON']['input'];
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  headerRows?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** Methods to use when ordering `ImportProfile`. */
export enum ImportProfileOrderBy {
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

/** Represents an update to a `ImportProfile`. Fields that are set will be updated. */
export type ImportProfilePatch = {
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  columnMap?: InputMaybe<Scalars['JSON']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  headerRows?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

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

export type JournalEntry = Node & {
  __typename?: 'JournalEntry';
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

/** An input for mutations affecting `JournalEntry` */
export type JournalEntryInput = {
  bookId: Scalars['UUID']['input'];
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  date: Scalars['Datetime']['input'];
  isReconciled?: InputMaybe<Scalars['Boolean']['input']>;
  isReviewed?: InputMaybe<Scalars['Boolean']['input']>;
  memo?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  source?: InputMaybe<Scalars['String']['input']>;
  sourceReferenceId?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  vendorId?: InputMaybe<Scalars['UUID']['input']>;
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

/** Represents an update to a `JournalEntry`. Fields that are set will be updated. */
export type JournalEntryPatch = {
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  date?: InputMaybe<Scalars['Datetime']['input']>;
  isReconciled?: InputMaybe<Scalars['Boolean']['input']>;
  isReviewed?: InputMaybe<Scalars['Boolean']['input']>;
  memo?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  source?: InputMaybe<Scalars['String']['input']>;
  sourceReferenceId?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  vendorId?: InputMaybe<Scalars['UUID']['input']>;
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
  /** Reads and enables pagination through a set of `JournalLineTag`. */
  journalLineTags: JournalLineTagConnection;
  memo?: Maybe<Scalars['String']['output']>;
  rowId: Scalars['UUID']['output'];
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
  /** Filter by the object’s `journalLineTags` relation. */
  journalLineTags?: InputMaybe<JournalLineToManyJournalLineTagFilter>;
  /** Some related `journalLineTags` exist. */
  journalLineTagsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Negates the expression. */
  not?: InputMaybe<JournalLineFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<JournalLineFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
};

/** An input for mutations affecting `JournalLine` */
export type JournalLineInput = {
  accountId: Scalars['UUID']['input'];
  cleared?: InputMaybe<Scalars['Boolean']['input']>;
  credit?: InputMaybe<Scalars['BigFloat']['input']>;
  debit?: InputMaybe<Scalars['BigFloat']['input']>;
  journalEntryId: Scalars['UUID']['input'];
  memo?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
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
  RowIdDesc = 'ROW_ID_DESC'
}

/** Represents an update to a `JournalLine`. Fields that are set will be updated. */
export type JournalLinePatch = {
  accountId?: InputMaybe<Scalars['UUID']['input']>;
  cleared?: InputMaybe<Scalars['Boolean']['input']>;
  credit?: InputMaybe<Scalars['BigFloat']['input']>;
  debit?: InputMaybe<Scalars['BigFloat']['input']>;
  journalEntryId?: InputMaybe<Scalars['UUID']['input']>;
  memo?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

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

/** An input for mutations affecting `JournalLineTag` */
export type JournalLineTagInput = {
  journalLineId: Scalars['UUID']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  tagId: Scalars['UUID']['input'];
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

/** Represents an update to a `JournalLineTag`. Fields that are set will be updated. */
export type JournalLineTagPatch = {
  journalLineId?: InputMaybe<Scalars['UUID']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  tagId?: InputMaybe<Scalars['UUID']['input']>;
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

/** An input for mutations affecting `MileageLog` */
export type MileageLogInput = {
  bookId: Scalars['UUID']['input'];
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  date: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  destination?: InputMaybe<Scalars['String']['input']>;
  distance: Scalars['BigFloat']['input'];
  isRoundTrip?: InputMaybe<Scalars['Boolean']['input']>;
  odometerEnd?: InputMaybe<Scalars['BigFloat']['input']>;
  odometerStart?: InputMaybe<Scalars['BigFloat']['input']>;
  origin?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  vehicleId: Scalars['UUID']['input'];
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

/** Represents an update to a `MileageLog`. Fields that are set will be updated. */
export type MileageLogPatch = {
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  destination?: InputMaybe<Scalars['String']['input']>;
  distance?: InputMaybe<Scalars['BigFloat']['input']>;
  isRoundTrip?: InputMaybe<Scalars['Boolean']['input']>;
  odometerEnd?: InputMaybe<Scalars['BigFloat']['input']>;
  odometerStart?: InputMaybe<Scalars['BigFloat']['input']>;
  origin?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  vehicleId?: InputMaybe<Scalars['UUID']['input']>;
};

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a single `Account`. */
  createAccount?: Maybe<CreateAccountPayload>;
  /** Creates a single `AccountMapping`. */
  createAccountMapping?: Maybe<CreateAccountMappingPayload>;
  /** Creates a single `AccountingPeriod`. */
  createAccountingPeriod?: Maybe<CreateAccountingPeriodPayload>;
  /** Creates a single `Book`. */
  createBook?: Maybe<CreateBookPayload>;
  /** Creates a single `BookAccess`. */
  createBookAccess?: Maybe<CreateBookAccessPayload>;
  /** Creates a single `Budget`. */
  createBudget?: Maybe<CreateBudgetPayload>;
  /** Creates a single `CategorizationRule`. */
  createCategorizationRule?: Maybe<CreateCategorizationRulePayload>;
  /** Creates a single `ConnectedAccount`. */
  createConnectedAccount?: Maybe<CreateConnectedAccountPayload>;
  /** Creates a single `CryptoAsset`. */
  createCryptoAsset?: Maybe<CreateCryptoAssetPayload>;
  /** Creates a single `CryptoLot`. */
  createCryptoLot?: Maybe<CreateCryptoLotPayload>;
  /** Creates a single `_DrizzleMigration`. */
  createDrizzleMigration?: Maybe<CreateDrizzleMigrationPayload>;
  /** Creates a single `FixedAsset`. */
  createFixedAsset?: Maybe<CreateFixedAssetPayload>;
  /** Creates a single `ImportProfile`. */
  createImportProfile?: Maybe<CreateImportProfilePayload>;
  /** Creates a single `JournalEntry`. */
  createJournalEntry?: Maybe<CreateJournalEntryPayload>;
  /** Creates a single `JournalLine`. */
  createJournalLine?: Maybe<CreateJournalLinePayload>;
  /** Creates a single `JournalLineTag`. */
  createJournalLineTag?: Maybe<CreateJournalLineTagPayload>;
  /** Creates a single `MileageLog`. */
  createMileageLog?: Maybe<CreateMileageLogPayload>;
  /** Creates a single `NetWorthSnapshot`. */
  createNetWorthSnapshot?: Maybe<CreateNetWorthSnapshotPayload>;
  /** Creates a single `PayrollConnection`. */
  createPayrollConnection?: Maybe<CreatePayrollConnectionPayload>;
  /** Creates a single `ReconciliationQueue`. */
  createReconciliationQueue?: Maybe<CreateReconciliationQueuePayload>;
  /** Creates a single `ReconciliationStatement`. */
  createReconciliationStatement?: Maybe<CreateReconciliationStatementPayload>;
  /** Creates a single `RecurringTransaction`. */
  createRecurringTransaction?: Maybe<CreateRecurringTransactionPayload>;
  /** Creates a single `SavingsGoal`. */
  createSavingsGoal?: Maybe<CreateSavingsGoalPayload>;
  /** Creates a single `Tag`. */
  createTag?: Maybe<CreateTagPayload>;
  /** Creates a single `TagGroup`. */
  createTagGroup?: Maybe<CreateTagGroupPayload>;
  /** Creates a single `TaxJurisdiction`. */
  createTaxJurisdiction?: Maybe<CreateTaxJurisdictionPayload>;
  /** Creates a single `Vehicle`. */
  createVehicle?: Maybe<CreateVehiclePayload>;
  /** Creates a single `Vendor`. */
  createVendor?: Maybe<CreateVendorPayload>;
  /** Deletes a single `Account` using a unique key. */
  deleteAccount?: Maybe<DeleteAccountPayload>;
  /** Deletes a single `Account` using its globally unique id. */
  deleteAccountById?: Maybe<DeleteAccountPayload>;
  /** Deletes a single `AccountMapping` using a unique key. */
  deleteAccountMapping?: Maybe<DeleteAccountMappingPayload>;
  /** Deletes a single `AccountMapping` using its globally unique id. */
  deleteAccountMappingById?: Maybe<DeleteAccountMappingPayload>;
  /** Deletes a single `AccountingPeriod` using a unique key. */
  deleteAccountingPeriod?: Maybe<DeleteAccountingPeriodPayload>;
  /** Deletes a single `AccountingPeriod` using its globally unique id. */
  deleteAccountingPeriodById?: Maybe<DeleteAccountingPeriodPayload>;
  /** Deletes a single `Book` using a unique key. */
  deleteBook?: Maybe<DeleteBookPayload>;
  /** Deletes a single `BookAccess` using a unique key. */
  deleteBookAccess?: Maybe<DeleteBookAccessPayload>;
  /** Deletes a single `BookAccess` using its globally unique id. */
  deleteBookAccessById?: Maybe<DeleteBookAccessPayload>;
  /** Deletes a single `Book` using its globally unique id. */
  deleteBookById?: Maybe<DeleteBookPayload>;
  /** Deletes a single `Budget` using a unique key. */
  deleteBudget?: Maybe<DeleteBudgetPayload>;
  /** Deletes a single `Budget` using its globally unique id. */
  deleteBudgetById?: Maybe<DeleteBudgetPayload>;
  /** Deletes a single `CategorizationRule` using a unique key. */
  deleteCategorizationRule?: Maybe<DeleteCategorizationRulePayload>;
  /** Deletes a single `CategorizationRule` using its globally unique id. */
  deleteCategorizationRuleById?: Maybe<DeleteCategorizationRulePayload>;
  /** Deletes a single `ConnectedAccount` using a unique key. */
  deleteConnectedAccount?: Maybe<DeleteConnectedAccountPayload>;
  /** Deletes a single `ConnectedAccount` using its globally unique id. */
  deleteConnectedAccountById?: Maybe<DeleteConnectedAccountPayload>;
  /** Deletes a single `CryptoAsset` using a unique key. */
  deleteCryptoAsset?: Maybe<DeleteCryptoAssetPayload>;
  /** Deletes a single `CryptoAsset` using its globally unique id. */
  deleteCryptoAssetById?: Maybe<DeleteCryptoAssetPayload>;
  /** Deletes a single `CryptoLot` using a unique key. */
  deleteCryptoLot?: Maybe<DeleteCryptoLotPayload>;
  /** Deletes a single `CryptoLot` using its globally unique id. */
  deleteCryptoLotById?: Maybe<DeleteCryptoLotPayload>;
  /** Deletes a single `_DrizzleMigration` using a unique key. */
  deleteDrizzleMigration?: Maybe<DeleteDrizzleMigrationPayload>;
  /** Deletes a single `_DrizzleMigration` using its globally unique id. */
  deleteDrizzleMigrationById?: Maybe<DeleteDrizzleMigrationPayload>;
  /** Deletes a single `FixedAsset` using a unique key. */
  deleteFixedAsset?: Maybe<DeleteFixedAssetPayload>;
  /** Deletes a single `FixedAsset` using its globally unique id. */
  deleteFixedAssetById?: Maybe<DeleteFixedAssetPayload>;
  /** Deletes a single `ImportProfile` using a unique key. */
  deleteImportProfile?: Maybe<DeleteImportProfilePayload>;
  /** Deletes a single `ImportProfile` using its globally unique id. */
  deleteImportProfileById?: Maybe<DeleteImportProfilePayload>;
  /** Deletes a single `JournalEntry` using a unique key. */
  deleteJournalEntry?: Maybe<DeleteJournalEntryPayload>;
  /** Deletes a single `JournalEntry` using its globally unique id. */
  deleteJournalEntryById?: Maybe<DeleteJournalEntryPayload>;
  /** Deletes a single `JournalLine` using a unique key. */
  deleteJournalLine?: Maybe<DeleteJournalLinePayload>;
  /** Deletes a single `JournalLine` using its globally unique id. */
  deleteJournalLineById?: Maybe<DeleteJournalLinePayload>;
  /** Deletes a single `JournalLineTag` using a unique key. */
  deleteJournalLineTag?: Maybe<DeleteJournalLineTagPayload>;
  /** Deletes a single `JournalLineTag` using its globally unique id. */
  deleteJournalLineTagById?: Maybe<DeleteJournalLineTagPayload>;
  /** Deletes a single `MileageLog` using a unique key. */
  deleteMileageLog?: Maybe<DeleteMileageLogPayload>;
  /** Deletes a single `MileageLog` using its globally unique id. */
  deleteMileageLogById?: Maybe<DeleteMileageLogPayload>;
  /** Deletes a single `NetWorthSnapshot` using a unique key. */
  deleteNetWorthSnapshot?: Maybe<DeleteNetWorthSnapshotPayload>;
  /** Deletes a single `NetWorthSnapshot` using its globally unique id. */
  deleteNetWorthSnapshotById?: Maybe<DeleteNetWorthSnapshotPayload>;
  /** Deletes a single `PayrollConnection` using a unique key. */
  deletePayrollConnection?: Maybe<DeletePayrollConnectionPayload>;
  /** Deletes a single `PayrollConnection` using its globally unique id. */
  deletePayrollConnectionById?: Maybe<DeletePayrollConnectionPayload>;
  /** Deletes a single `ReconciliationQueue` using a unique key. */
  deleteReconciliationQueue?: Maybe<DeleteReconciliationQueuePayload>;
  /** Deletes a single `ReconciliationQueue` using its globally unique id. */
  deleteReconciliationQueueById?: Maybe<DeleteReconciliationQueuePayload>;
  /** Deletes a single `ReconciliationStatement` using a unique key. */
  deleteReconciliationStatement?: Maybe<DeleteReconciliationStatementPayload>;
  /** Deletes a single `ReconciliationStatement` using its globally unique id. */
  deleteReconciliationStatementById?: Maybe<DeleteReconciliationStatementPayload>;
  /** Deletes a single `RecurringTransaction` using a unique key. */
  deleteRecurringTransaction?: Maybe<DeleteRecurringTransactionPayload>;
  /** Deletes a single `RecurringTransaction` using its globally unique id. */
  deleteRecurringTransactionById?: Maybe<DeleteRecurringTransactionPayload>;
  /** Deletes a single `SavingsGoal` using a unique key. */
  deleteSavingsGoal?: Maybe<DeleteSavingsGoalPayload>;
  /** Deletes a single `SavingsGoal` using its globally unique id. */
  deleteSavingsGoalById?: Maybe<DeleteSavingsGoalPayload>;
  /** Deletes a single `Tag` using a unique key. */
  deleteTag?: Maybe<DeleteTagPayload>;
  /** Deletes a single `Tag` using its globally unique id. */
  deleteTagById?: Maybe<DeleteTagPayload>;
  /** Deletes a single `TagGroup` using a unique key. */
  deleteTagGroup?: Maybe<DeleteTagGroupPayload>;
  /** Deletes a single `TagGroup` using its globally unique id. */
  deleteTagGroupById?: Maybe<DeleteTagGroupPayload>;
  /** Deletes a single `TaxJurisdiction` using a unique key. */
  deleteTaxJurisdiction?: Maybe<DeleteTaxJurisdictionPayload>;
  /** Deletes a single `TaxJurisdiction` using its globally unique id. */
  deleteTaxJurisdictionById?: Maybe<DeleteTaxJurisdictionPayload>;
  /** Deletes a single `Vehicle` using a unique key. */
  deleteVehicle?: Maybe<DeleteVehiclePayload>;
  /** Deletes a single `Vehicle` using its globally unique id. */
  deleteVehicleById?: Maybe<DeleteVehiclePayload>;
  /** Deletes a single `Vendor` using a unique key. */
  deleteVendor?: Maybe<DeleteVendorPayload>;
  /** Deletes a single `Vendor` using its globally unique id. */
  deleteVendorById?: Maybe<DeleteVendorPayload>;
  /** Updates a single `Account` using a unique key and a patch. */
  updateAccount?: Maybe<UpdateAccountPayload>;
  /** Updates a single `Account` using its globally unique id and a patch. */
  updateAccountById?: Maybe<UpdateAccountPayload>;
  /** Updates a single `AccountMapping` using a unique key and a patch. */
  updateAccountMapping?: Maybe<UpdateAccountMappingPayload>;
  /** Updates a single `AccountMapping` using its globally unique id and a patch. */
  updateAccountMappingById?: Maybe<UpdateAccountMappingPayload>;
  /** Updates a single `AccountingPeriod` using a unique key and a patch. */
  updateAccountingPeriod?: Maybe<UpdateAccountingPeriodPayload>;
  /** Updates a single `AccountingPeriod` using its globally unique id and a patch. */
  updateAccountingPeriodById?: Maybe<UpdateAccountingPeriodPayload>;
  /** Updates a single `Book` using a unique key and a patch. */
  updateBook?: Maybe<UpdateBookPayload>;
  /** Updates a single `BookAccess` using a unique key and a patch. */
  updateBookAccess?: Maybe<UpdateBookAccessPayload>;
  /** Updates a single `BookAccess` using its globally unique id and a patch. */
  updateBookAccessById?: Maybe<UpdateBookAccessPayload>;
  /** Updates a single `Book` using its globally unique id and a patch. */
  updateBookById?: Maybe<UpdateBookPayload>;
  /** Updates a single `Budget` using a unique key and a patch. */
  updateBudget?: Maybe<UpdateBudgetPayload>;
  /** Updates a single `Budget` using its globally unique id and a patch. */
  updateBudgetById?: Maybe<UpdateBudgetPayload>;
  /** Updates a single `CategorizationRule` using a unique key and a patch. */
  updateCategorizationRule?: Maybe<UpdateCategorizationRulePayload>;
  /** Updates a single `CategorizationRule` using its globally unique id and a patch. */
  updateCategorizationRuleById?: Maybe<UpdateCategorizationRulePayload>;
  /** Updates a single `ConnectedAccount` using a unique key and a patch. */
  updateConnectedAccount?: Maybe<UpdateConnectedAccountPayload>;
  /** Updates a single `ConnectedAccount` using its globally unique id and a patch. */
  updateConnectedAccountById?: Maybe<UpdateConnectedAccountPayload>;
  /** Updates a single `CryptoAsset` using a unique key and a patch. */
  updateCryptoAsset?: Maybe<UpdateCryptoAssetPayload>;
  /** Updates a single `CryptoAsset` using its globally unique id and a patch. */
  updateCryptoAssetById?: Maybe<UpdateCryptoAssetPayload>;
  /** Updates a single `CryptoLot` using a unique key and a patch. */
  updateCryptoLot?: Maybe<UpdateCryptoLotPayload>;
  /** Updates a single `CryptoLot` using its globally unique id and a patch. */
  updateCryptoLotById?: Maybe<UpdateCryptoLotPayload>;
  /** Updates a single `_DrizzleMigration` using a unique key and a patch. */
  updateDrizzleMigration?: Maybe<UpdateDrizzleMigrationPayload>;
  /** Updates a single `_DrizzleMigration` using its globally unique id and a patch. */
  updateDrizzleMigrationById?: Maybe<UpdateDrizzleMigrationPayload>;
  /** Updates a single `FixedAsset` using a unique key and a patch. */
  updateFixedAsset?: Maybe<UpdateFixedAssetPayload>;
  /** Updates a single `FixedAsset` using its globally unique id and a patch. */
  updateFixedAssetById?: Maybe<UpdateFixedAssetPayload>;
  /** Updates a single `ImportProfile` using a unique key and a patch. */
  updateImportProfile?: Maybe<UpdateImportProfilePayload>;
  /** Updates a single `ImportProfile` using its globally unique id and a patch. */
  updateImportProfileById?: Maybe<UpdateImportProfilePayload>;
  /** Updates a single `JournalEntry` using a unique key and a patch. */
  updateJournalEntry?: Maybe<UpdateJournalEntryPayload>;
  /** Updates a single `JournalEntry` using its globally unique id and a patch. */
  updateJournalEntryById?: Maybe<UpdateJournalEntryPayload>;
  /** Updates a single `JournalLine` using a unique key and a patch. */
  updateJournalLine?: Maybe<UpdateJournalLinePayload>;
  /** Updates a single `JournalLine` using its globally unique id and a patch. */
  updateJournalLineById?: Maybe<UpdateJournalLinePayload>;
  /** Updates a single `JournalLineTag` using a unique key and a patch. */
  updateJournalLineTag?: Maybe<UpdateJournalLineTagPayload>;
  /** Updates a single `JournalLineTag` using its globally unique id and a patch. */
  updateJournalLineTagById?: Maybe<UpdateJournalLineTagPayload>;
  /** Updates a single `MileageLog` using a unique key and a patch. */
  updateMileageLog?: Maybe<UpdateMileageLogPayload>;
  /** Updates a single `MileageLog` using its globally unique id and a patch. */
  updateMileageLogById?: Maybe<UpdateMileageLogPayload>;
  /** Updates a single `NetWorthSnapshot` using a unique key and a patch. */
  updateNetWorthSnapshot?: Maybe<UpdateNetWorthSnapshotPayload>;
  /** Updates a single `NetWorthSnapshot` using its globally unique id and a patch. */
  updateNetWorthSnapshotById?: Maybe<UpdateNetWorthSnapshotPayload>;
  /** Updates a single `PayrollConnection` using a unique key and a patch. */
  updatePayrollConnection?: Maybe<UpdatePayrollConnectionPayload>;
  /** Updates a single `PayrollConnection` using its globally unique id and a patch. */
  updatePayrollConnectionById?: Maybe<UpdatePayrollConnectionPayload>;
  /** Updates a single `ReconciliationQueue` using a unique key and a patch. */
  updateReconciliationQueue?: Maybe<UpdateReconciliationQueuePayload>;
  /** Updates a single `ReconciliationQueue` using its globally unique id and a patch. */
  updateReconciliationQueueById?: Maybe<UpdateReconciliationQueuePayload>;
  /** Updates a single `ReconciliationStatement` using a unique key and a patch. */
  updateReconciliationStatement?: Maybe<UpdateReconciliationStatementPayload>;
  /** Updates a single `ReconciliationStatement` using its globally unique id and a patch. */
  updateReconciliationStatementById?: Maybe<UpdateReconciliationStatementPayload>;
  /** Updates a single `RecurringTransaction` using a unique key and a patch. */
  updateRecurringTransaction?: Maybe<UpdateRecurringTransactionPayload>;
  /** Updates a single `RecurringTransaction` using its globally unique id and a patch. */
  updateRecurringTransactionById?: Maybe<UpdateRecurringTransactionPayload>;
  /** Updates a single `SavingsGoal` using a unique key and a patch. */
  updateSavingsGoal?: Maybe<UpdateSavingsGoalPayload>;
  /** Updates a single `SavingsGoal` using its globally unique id and a patch. */
  updateSavingsGoalById?: Maybe<UpdateSavingsGoalPayload>;
  /** Updates a single `Tag` using a unique key and a patch. */
  updateTag?: Maybe<UpdateTagPayload>;
  /** Updates a single `Tag` using its globally unique id and a patch. */
  updateTagById?: Maybe<UpdateTagPayload>;
  /** Updates a single `TagGroup` using a unique key and a patch. */
  updateTagGroup?: Maybe<UpdateTagGroupPayload>;
  /** Updates a single `TagGroup` using its globally unique id and a patch. */
  updateTagGroupById?: Maybe<UpdateTagGroupPayload>;
  /** Updates a single `TaxJurisdiction` using a unique key and a patch. */
  updateTaxJurisdiction?: Maybe<UpdateTaxJurisdictionPayload>;
  /** Updates a single `TaxJurisdiction` using its globally unique id and a patch. */
  updateTaxJurisdictionById?: Maybe<UpdateTaxJurisdictionPayload>;
  /** Updates a single `Vehicle` using a unique key and a patch. */
  updateVehicle?: Maybe<UpdateVehiclePayload>;
  /** Updates a single `Vehicle` using its globally unique id and a patch. */
  updateVehicleById?: Maybe<UpdateVehiclePayload>;
  /** Updates a single `Vendor` using a unique key and a patch. */
  updateVendor?: Maybe<UpdateVendorPayload>;
  /** Updates a single `Vendor` using its globally unique id and a patch. */
  updateVendorById?: Maybe<UpdateVendorPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateAccountArgs = {
  input: CreateAccountInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateAccountMappingArgs = {
  input: CreateAccountMappingInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateAccountingPeriodArgs = {
  input: CreateAccountingPeriodInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateBookArgs = {
  input: CreateBookInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateBookAccessArgs = {
  input: CreateBookAccessInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateBudgetArgs = {
  input: CreateBudgetInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateCategorizationRuleArgs = {
  input: CreateCategorizationRuleInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateConnectedAccountArgs = {
  input: CreateConnectedAccountInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateCryptoAssetArgs = {
  input: CreateCryptoAssetInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateCryptoLotArgs = {
  input: CreateCryptoLotInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateDrizzleMigrationArgs = {
  input: CreateDrizzleMigrationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateFixedAssetArgs = {
  input: CreateFixedAssetInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateImportProfileArgs = {
  input: CreateImportProfileInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateJournalEntryArgs = {
  input: CreateJournalEntryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateJournalLineArgs = {
  input: CreateJournalLineInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateJournalLineTagArgs = {
  input: CreateJournalLineTagInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateMileageLogArgs = {
  input: CreateMileageLogInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateNetWorthSnapshotArgs = {
  input: CreateNetWorthSnapshotInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreatePayrollConnectionArgs = {
  input: CreatePayrollConnectionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateReconciliationQueueArgs = {
  input: CreateReconciliationQueueInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateReconciliationStatementArgs = {
  input: CreateReconciliationStatementInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateRecurringTransactionArgs = {
  input: CreateRecurringTransactionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateSavingsGoalArgs = {
  input: CreateSavingsGoalInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateTagArgs = {
  input: CreateTagInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateTagGroupArgs = {
  input: CreateTagGroupInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateTaxJurisdictionArgs = {
  input: CreateTaxJurisdictionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateVehicleArgs = {
  input: CreateVehicleInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateVendorArgs = {
  input: CreateVendorInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAccountArgs = {
  input: DeleteAccountInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAccountByIdArgs = {
  input: DeleteAccountByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAccountMappingArgs = {
  input: DeleteAccountMappingInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAccountMappingByIdArgs = {
  input: DeleteAccountMappingByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAccountingPeriodArgs = {
  input: DeleteAccountingPeriodInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAccountingPeriodByIdArgs = {
  input: DeleteAccountingPeriodByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteBookArgs = {
  input: DeleteBookInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteBookAccessArgs = {
  input: DeleteBookAccessInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteBookAccessByIdArgs = {
  input: DeleteBookAccessByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteBookByIdArgs = {
  input: DeleteBookByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteBudgetArgs = {
  input: DeleteBudgetInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteBudgetByIdArgs = {
  input: DeleteBudgetByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCategorizationRuleArgs = {
  input: DeleteCategorizationRuleInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCategorizationRuleByIdArgs = {
  input: DeleteCategorizationRuleByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteConnectedAccountArgs = {
  input: DeleteConnectedAccountInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteConnectedAccountByIdArgs = {
  input: DeleteConnectedAccountByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCryptoAssetArgs = {
  input: DeleteCryptoAssetInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCryptoAssetByIdArgs = {
  input: DeleteCryptoAssetByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCryptoLotArgs = {
  input: DeleteCryptoLotInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCryptoLotByIdArgs = {
  input: DeleteCryptoLotByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteDrizzleMigrationArgs = {
  input: DeleteDrizzleMigrationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteDrizzleMigrationByIdArgs = {
  input: DeleteDrizzleMigrationByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteFixedAssetArgs = {
  input: DeleteFixedAssetInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteFixedAssetByIdArgs = {
  input: DeleteFixedAssetByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteImportProfileArgs = {
  input: DeleteImportProfileInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteImportProfileByIdArgs = {
  input: DeleteImportProfileByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteJournalEntryArgs = {
  input: DeleteJournalEntryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteJournalEntryByIdArgs = {
  input: DeleteJournalEntryByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteJournalLineArgs = {
  input: DeleteJournalLineInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteJournalLineByIdArgs = {
  input: DeleteJournalLineByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteJournalLineTagArgs = {
  input: DeleteJournalLineTagInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteJournalLineTagByIdArgs = {
  input: DeleteJournalLineTagByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMileageLogArgs = {
  input: DeleteMileageLogInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMileageLogByIdArgs = {
  input: DeleteMileageLogByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteNetWorthSnapshotArgs = {
  input: DeleteNetWorthSnapshotInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteNetWorthSnapshotByIdArgs = {
  input: DeleteNetWorthSnapshotByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePayrollConnectionArgs = {
  input: DeletePayrollConnectionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePayrollConnectionByIdArgs = {
  input: DeletePayrollConnectionByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteReconciliationQueueArgs = {
  input: DeleteReconciliationQueueInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteReconciliationQueueByIdArgs = {
  input: DeleteReconciliationQueueByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteReconciliationStatementArgs = {
  input: DeleteReconciliationStatementInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteReconciliationStatementByIdArgs = {
  input: DeleteReconciliationStatementByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRecurringTransactionArgs = {
  input: DeleteRecurringTransactionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRecurringTransactionByIdArgs = {
  input: DeleteRecurringTransactionByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSavingsGoalArgs = {
  input: DeleteSavingsGoalInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSavingsGoalByIdArgs = {
  input: DeleteSavingsGoalByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTagArgs = {
  input: DeleteTagInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTagByIdArgs = {
  input: DeleteTagByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTagGroupArgs = {
  input: DeleteTagGroupInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTagGroupByIdArgs = {
  input: DeleteTagGroupByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTaxJurisdictionArgs = {
  input: DeleteTaxJurisdictionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTaxJurisdictionByIdArgs = {
  input: DeleteTaxJurisdictionByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteVehicleArgs = {
  input: DeleteVehicleInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteVehicleByIdArgs = {
  input: DeleteVehicleByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteVendorArgs = {
  input: DeleteVendorInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteVendorByIdArgs = {
  input: DeleteVendorByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAccountArgs = {
  input: UpdateAccountInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAccountByIdArgs = {
  input: UpdateAccountByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAccountMappingArgs = {
  input: UpdateAccountMappingInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAccountMappingByIdArgs = {
  input: UpdateAccountMappingByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAccountingPeriodArgs = {
  input: UpdateAccountingPeriodInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAccountingPeriodByIdArgs = {
  input: UpdateAccountingPeriodByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateBookArgs = {
  input: UpdateBookInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateBookAccessArgs = {
  input: UpdateBookAccessInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateBookAccessByIdArgs = {
  input: UpdateBookAccessByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateBookByIdArgs = {
  input: UpdateBookByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateBudgetArgs = {
  input: UpdateBudgetInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateBudgetByIdArgs = {
  input: UpdateBudgetByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCategorizationRuleArgs = {
  input: UpdateCategorizationRuleInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCategorizationRuleByIdArgs = {
  input: UpdateCategorizationRuleByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateConnectedAccountArgs = {
  input: UpdateConnectedAccountInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateConnectedAccountByIdArgs = {
  input: UpdateConnectedAccountByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCryptoAssetArgs = {
  input: UpdateCryptoAssetInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCryptoAssetByIdArgs = {
  input: UpdateCryptoAssetByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCryptoLotArgs = {
  input: UpdateCryptoLotInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCryptoLotByIdArgs = {
  input: UpdateCryptoLotByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateDrizzleMigrationArgs = {
  input: UpdateDrizzleMigrationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateDrizzleMigrationByIdArgs = {
  input: UpdateDrizzleMigrationByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateFixedAssetArgs = {
  input: UpdateFixedAssetInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateFixedAssetByIdArgs = {
  input: UpdateFixedAssetByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateImportProfileArgs = {
  input: UpdateImportProfileInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateImportProfileByIdArgs = {
  input: UpdateImportProfileByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateJournalEntryArgs = {
  input: UpdateJournalEntryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateJournalEntryByIdArgs = {
  input: UpdateJournalEntryByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateJournalLineArgs = {
  input: UpdateJournalLineInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateJournalLineByIdArgs = {
  input: UpdateJournalLineByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateJournalLineTagArgs = {
  input: UpdateJournalLineTagInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateJournalLineTagByIdArgs = {
  input: UpdateJournalLineTagByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMileageLogArgs = {
  input: UpdateMileageLogInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMileageLogByIdArgs = {
  input: UpdateMileageLogByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateNetWorthSnapshotArgs = {
  input: UpdateNetWorthSnapshotInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateNetWorthSnapshotByIdArgs = {
  input: UpdateNetWorthSnapshotByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePayrollConnectionArgs = {
  input: UpdatePayrollConnectionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePayrollConnectionByIdArgs = {
  input: UpdatePayrollConnectionByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateReconciliationQueueArgs = {
  input: UpdateReconciliationQueueInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateReconciliationQueueByIdArgs = {
  input: UpdateReconciliationQueueByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateReconciliationStatementArgs = {
  input: UpdateReconciliationStatementInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateReconciliationStatementByIdArgs = {
  input: UpdateReconciliationStatementByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRecurringTransactionArgs = {
  input: UpdateRecurringTransactionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRecurringTransactionByIdArgs = {
  input: UpdateRecurringTransactionByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSavingsGoalArgs = {
  input: UpdateSavingsGoalInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSavingsGoalByIdArgs = {
  input: UpdateSavingsGoalByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTagArgs = {
  input: UpdateTagInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTagByIdArgs = {
  input: UpdateTagByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTagGroupArgs = {
  input: UpdateTagGroupInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTagGroupByIdArgs = {
  input: UpdateTagGroupByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTaxJurisdictionArgs = {
  input: UpdateTaxJurisdictionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTaxJurisdictionByIdArgs = {
  input: UpdateTaxJurisdictionByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateVehicleArgs = {
  input: UpdateVehicleInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateVehicleByIdArgs = {
  input: UpdateVehicleByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateVendorArgs = {
  input: UpdateVendorInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateVendorByIdArgs = {
  input: UpdateVendorByIdInput;
};

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

/** An input for mutations affecting `NetWorthSnapshot` */
export type NetWorthSnapshotInput = {
  bookId: Scalars['UUID']['input'];
  breakdown?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  date: Scalars['Datetime']['input'];
  netWorth: Scalars['BigFloat']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  totalAssets: Scalars['BigFloat']['input'];
  totalLiabilities: Scalars['BigFloat']['input'];
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

/** Represents an update to a `NetWorthSnapshot`. Fields that are set will be updated. */
export type NetWorthSnapshotPatch = {
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  breakdown?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  date?: InputMaybe<Scalars['Datetime']['input']>;
  netWorth?: InputMaybe<Scalars['BigFloat']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  totalAssets?: InputMaybe<Scalars['BigFloat']['input']>;
  totalLiabilities?: InputMaybe<Scalars['BigFloat']['input']>;
};

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

/** An input for mutations affecting `PayrollConnection` */
export type PayrollConnectionInput = {
  accessToken?: InputMaybe<Scalars['String']['input']>;
  bookId: Scalars['UUID']['input'];
  companyId?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  lastSyncedAt?: InputMaybe<Scalars['Datetime']['input']>;
  provider: Scalars['String']['input'];
  refreshToken?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  syncCursor?: InputMaybe<Scalars['String']['input']>;
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

/** Represents an update to a `PayrollConnection`. Fields that are set will be updated. */
export type PayrollConnectionPatch = {
  accessToken?: InputMaybe<Scalars['String']['input']>;
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  companyId?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  lastSyncedAt?: InputMaybe<Scalars['Datetime']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  refreshToken?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  syncCursor?: InputMaybe<Scalars['String']['input']>;
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
  /** Get a single `CategorizationRule`. */
  categorizationRule?: Maybe<CategorizationRule>;
  /** Reads a single `CategorizationRule` using its globally unique `ID`. */
  categorizationRuleById?: Maybe<CategorizationRule>;
  /** Reads and enables pagination through a set of `CategorizationRule`. */
  categorizationRules?: Maybe<CategorizationRuleConnection>;
  /** Get a single `ConnectedAccount`. */
  connectedAccount?: Maybe<ConnectedAccount>;
  /** Reads a single `ConnectedAccount` using its globally unique `ID`. */
  connectedAccountById?: Maybe<ConnectedAccount>;
  /** Reads and enables pagination through a set of `ConnectedAccount`. */
  connectedAccounts?: Maybe<ConnectedAccountConnection>;
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
  /** Get a single `FixedAsset`. */
  fixedAsset?: Maybe<FixedAsset>;
  /** Reads a single `FixedAsset` using its globally unique `ID`. */
  fixedAssetById?: Maybe<FixedAsset>;
  /** Reads and enables pagination through a set of `FixedAsset`. */
  fixedAssets?: Maybe<FixedAssetConnection>;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  id: Scalars['ID']['output'];
  /** Get a single `ImportProfile`. */
  importProfile?: Maybe<ImportProfile>;
  /** Reads a single `ImportProfile` using its globally unique `ID`. */
  importProfileById?: Maybe<ImportProfile>;
  /** Reads and enables pagination through a set of `ImportProfile`. */
  importProfiles?: Maybe<ImportProfileConnection>;
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
  /** Get a single `JournalLineTag`. */
  journalLineTag?: Maybe<JournalLineTag>;
  /** Reads a single `JournalLineTag` using its globally unique `ID`. */
  journalLineTagById?: Maybe<JournalLineTag>;
  /** Reads and enables pagination through a set of `JournalLineTag`. */
  journalLineTags?: Maybe<JournalLineTagConnection>;
  /** Reads and enables pagination through a set of `JournalLine`. */
  journalLines?: Maybe<JournalLineConnection>;
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
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
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
  /** Get a single `RecurringTransaction`. */
  recurringTransaction?: Maybe<RecurringTransaction>;
  /** Reads a single `RecurringTransaction` using its globally unique `ID`. */
  recurringTransactionById?: Maybe<RecurringTransaction>;
  /** Reads and enables pagination through a set of `RecurringTransaction`. */
  recurringTransactions?: Maybe<RecurringTransactionConnection>;
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
export type QueryCategorizationRuleArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCategorizationRuleByIdArgs = {
  id: Scalars['ID']['input'];
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

/** An input for mutations affecting `ReconciliationQueue` */
export type ReconciliationQueueInput = {
  bookId: Scalars['UUID']['input'];
  categorizationSource?: InputMaybe<Scalars['String']['input']>;
  confidence?: InputMaybe<Scalars['BigFloat']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  journalEntryId: Scalars['UUID']['input'];
  periodMonth?: InputMaybe<Scalars['Int']['input']>;
  periodYear?: InputMaybe<Scalars['Int']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  reviewedAt?: InputMaybe<Scalars['Datetime']['input']>;
  reviewedBy?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  suggestedCreditAccountId?: InputMaybe<Scalars['UUID']['input']>;
  suggestedDebitAccountId?: InputMaybe<Scalars['UUID']['input']>;
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

/** Represents an update to a `ReconciliationQueue`. Fields that are set will be updated. */
export type ReconciliationQueuePatch = {
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  categorizationSource?: InputMaybe<Scalars['String']['input']>;
  confidence?: InputMaybe<Scalars['BigFloat']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  journalEntryId?: InputMaybe<Scalars['UUID']['input']>;
  periodMonth?: InputMaybe<Scalars['Int']['input']>;
  periodYear?: InputMaybe<Scalars['Int']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  reviewedAt?: InputMaybe<Scalars['Datetime']['input']>;
  reviewedBy?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  suggestedCreditAccountId?: InputMaybe<Scalars['UUID']['input']>;
  suggestedDebitAccountId?: InputMaybe<Scalars['UUID']['input']>;
};

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

/** An input for mutations affecting `ReconciliationStatement` */
export type ReconciliationStatementInput = {
  accountId: Scalars['UUID']['input'];
  beginningBalance: Scalars['BigFloat']['input'];
  bookId: Scalars['UUID']['input'];
  completedAt?: InputMaybe<Scalars['Datetime']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  discrepancy?: InputMaybe<Scalars['BigFloat']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  statementBalance: Scalars['BigFloat']['input'];
  statementDate: Scalars['String']['input'];
  status?: InputMaybe<Scalars['String']['input']>;
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

/** Represents an update to a `ReconciliationStatement`. Fields that are set will be updated. */
export type ReconciliationStatementPatch = {
  accountId?: InputMaybe<Scalars['UUID']['input']>;
  beginningBalance?: InputMaybe<Scalars['BigFloat']['input']>;
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  completedAt?: InputMaybe<Scalars['Datetime']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  discrepancy?: InputMaybe<Scalars['BigFloat']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  statementBalance?: InputMaybe<Scalars['BigFloat']['input']>;
  statementDate?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export enum RecurringFrequency {
  Biweekly = 'biweekly',
  Monthly = 'monthly',
  Quarterly = 'quarterly',
  Weekly = 'weekly',
  Yearly = 'yearly'
}

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

/** An input for mutations affecting `RecurringTransaction` */
export type RecurringTransactionInput = {
  accountId: Scalars['UUID']['input'];
  amount: Scalars['BigFloat']['input'];
  bookId: Scalars['UUID']['input'];
  counterAccountId?: InputMaybe<Scalars['UUID']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  frequency: RecurringFrequency;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isAutoDetected?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  nextExpectedDate?: InputMaybe<Scalars['Datetime']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
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

/** Represents an update to a `RecurringTransaction`. Fields that are set will be updated. */
export type RecurringTransactionPatch = {
  accountId?: InputMaybe<Scalars['UUID']['input']>;
  amount?: InputMaybe<Scalars['BigFloat']['input']>;
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  counterAccountId?: InputMaybe<Scalars['UUID']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  frequency?: InputMaybe<RecurringFrequency>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isAutoDetected?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nextExpectedDate?: InputMaybe<Scalars['Datetime']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

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

/** An input for mutations affecting `SavingsGoal` */
export type SavingsGoalInput = {
  accountId: Scalars['UUID']['input'];
  bookId: Scalars['UUID']['input'];
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  name: Scalars['String']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  targetAmount: Scalars['BigFloat']['input'];
  targetDate?: InputMaybe<Scalars['Datetime']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
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

/** Represents an update to a `SavingsGoal`. Fields that are set will be updated. */
export type SavingsGoalPatch = {
  accountId?: InputMaybe<Scalars['UUID']['input']>;
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  targetAmount?: InputMaybe<Scalars['BigFloat']['input']>;
  targetDate?: InputMaybe<Scalars['Datetime']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

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

/** An input for mutations affecting `TagGroup` */
export type TagGroupInput = {
  bookId: Scalars['UUID']['input'];
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  name: Scalars['String']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
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

/** Represents an update to a `TagGroup`. Fields that are set will be updated. */
export type TagGroupPatch = {
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A filter to be used against many `Tag` object types. All fields are combined with a logical ‘and.’ */
export type TagGroupToManyTagFilter = {
  /** Every related `Tag` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<TagFilter>;
  /** No related `Tag` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<TagFilter>;
  /** Some related `Tag` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<TagFilter>;
};

/** An input for mutations affecting `Tag` */
export type TagInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  tagGroupId: Scalars['UUID']['input'];
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

/** Represents an update to a `Tag`. Fields that are set will be updated. */
export type TagPatch = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  tagGroupId?: InputMaybe<Scalars['UUID']['input']>;
};

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
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  filingFrequency: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  rowId: Scalars['UUID']['output'];
  /** Reads a single `Account` that is related to this `TaxJurisdiction`. */
  taxPayableAccount?: Maybe<Account>;
  taxPayableAccountId: Scalars['UUID']['output'];
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
  /** Negates the expression. */
  not?: InputMaybe<TaxJurisdictionFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<TaxJurisdictionFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `taxPayableAccount` relation. */
  taxPayableAccount?: InputMaybe<AccountFilter>;
};

/** An input for mutations affecting `TaxJurisdiction` */
export type TaxJurisdictionInput = {
  bookId: Scalars['UUID']['input'];
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  filingFrequency: Scalars['String']['input'];
  name: Scalars['String']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  taxPayableAccountId: Scalars['UUID']['input'];
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

/** Represents an update to a `TaxJurisdiction`. Fields that are set will be updated. */
export type TaxJurisdictionPatch = {
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  filingFrequency?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  taxPayableAccountId?: InputMaybe<Scalars['UUID']['input']>;
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

/** All input for the `updateAccountById` mutation. */
export type UpdateAccountByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Account` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Account` being updated. */
  patch: AccountPatch;
};

/** All input for the `updateAccount` mutation. */
export type UpdateAccountInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Account` being updated. */
  patch: AccountPatch;
  rowId: Scalars['UUID']['input'];
};

/** All input for the `updateAccountMappingById` mutation. */
export type UpdateAccountMappingByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `AccountMapping` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `AccountMapping` being updated. */
  patch: AccountMappingPatch;
};

/** All input for the `updateAccountMapping` mutation. */
export type UpdateAccountMappingInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `AccountMapping` being updated. */
  patch: AccountMappingPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `AccountMapping` mutation. */
export type UpdateAccountMappingPayload = {
  __typename?: 'UpdateAccountMappingPayload';
  /** The `AccountMapping` that was updated by this mutation. */
  accountMapping?: Maybe<AccountMapping>;
  /** An edge for our `AccountMapping`. May be used by Relay 1. */
  accountMappingEdge?: Maybe<AccountMappingEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `AccountMapping` mutation. */
export type UpdateAccountMappingPayloadAccountMappingEdgeArgs = {
  orderBy?: Array<AccountMappingOrderBy>;
};

/** The output of our update `Account` mutation. */
export type UpdateAccountPayload = {
  __typename?: 'UpdateAccountPayload';
  /** The `Account` that was updated by this mutation. */
  account?: Maybe<Account>;
  /** An edge for our `Account`. May be used by Relay 1. */
  accountEdge?: Maybe<AccountEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Account` mutation. */
export type UpdateAccountPayloadAccountEdgeArgs = {
  orderBy?: Array<AccountOrderBy>;
};

/** All input for the `updateAccountingPeriodById` mutation. */
export type UpdateAccountingPeriodByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `AccountingPeriod` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `AccountingPeriod` being updated. */
  patch: AccountingPeriodPatch;
};

/** All input for the `updateAccountingPeriod` mutation. */
export type UpdateAccountingPeriodInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `AccountingPeriod` being updated. */
  patch: AccountingPeriodPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `AccountingPeriod` mutation. */
export type UpdateAccountingPeriodPayload = {
  __typename?: 'UpdateAccountingPeriodPayload';
  /** The `AccountingPeriod` that was updated by this mutation. */
  accountingPeriod?: Maybe<AccountingPeriod>;
  /** An edge for our `AccountingPeriod`. May be used by Relay 1. */
  accountingPeriodEdge?: Maybe<AccountingPeriodEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `AccountingPeriod` mutation. */
export type UpdateAccountingPeriodPayloadAccountingPeriodEdgeArgs = {
  orderBy?: Array<AccountingPeriodOrderBy>;
};

/** All input for the `updateBookAccessById` mutation. */
export type UpdateBookAccessByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `BookAccess` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `BookAccess` being updated. */
  patch: BookAccessPatch;
};

/** All input for the `updateBookAccess` mutation. */
export type UpdateBookAccessInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `BookAccess` being updated. */
  patch: BookAccessPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `BookAccess` mutation. */
export type UpdateBookAccessPayload = {
  __typename?: 'UpdateBookAccessPayload';
  /** The `BookAccess` that was updated by this mutation. */
  bookAccess?: Maybe<BookAccess>;
  /** An edge for our `BookAccess`. May be used by Relay 1. */
  bookAccessEdge?: Maybe<BookAccessEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `BookAccess` mutation. */
export type UpdateBookAccessPayloadBookAccessEdgeArgs = {
  orderBy?: Array<BookAccessOrderBy>;
};

/** All input for the `updateBookById` mutation. */
export type UpdateBookByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Book` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Book` being updated. */
  patch: BookPatch;
};

/** All input for the `updateBook` mutation. */
export type UpdateBookInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Book` being updated. */
  patch: BookPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `Book` mutation. */
export type UpdateBookPayload = {
  __typename?: 'UpdateBookPayload';
  /** The `Book` that was updated by this mutation. */
  book?: Maybe<Book>;
  /** An edge for our `Book`. May be used by Relay 1. */
  bookEdge?: Maybe<BookEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Book` mutation. */
export type UpdateBookPayloadBookEdgeArgs = {
  orderBy?: Array<BookOrderBy>;
};

/** All input for the `updateBudgetById` mutation. */
export type UpdateBudgetByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Budget` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Budget` being updated. */
  patch: BudgetPatch;
};

/** All input for the `updateBudget` mutation. */
export type UpdateBudgetInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Budget` being updated. */
  patch: BudgetPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `Budget` mutation. */
export type UpdateBudgetPayload = {
  __typename?: 'UpdateBudgetPayload';
  /** The `Budget` that was updated by this mutation. */
  budget?: Maybe<Budget>;
  /** An edge for our `Budget`. May be used by Relay 1. */
  budgetEdge?: Maybe<BudgetEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Budget` mutation. */
export type UpdateBudgetPayloadBudgetEdgeArgs = {
  orderBy?: Array<BudgetOrderBy>;
};

/** All input for the `updateCategorizationRuleById` mutation. */
export type UpdateCategorizationRuleByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `CategorizationRule` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `CategorizationRule` being updated. */
  patch: CategorizationRulePatch;
};

/** All input for the `updateCategorizationRule` mutation. */
export type UpdateCategorizationRuleInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `CategorizationRule` being updated. */
  patch: CategorizationRulePatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `CategorizationRule` mutation. */
export type UpdateCategorizationRulePayload = {
  __typename?: 'UpdateCategorizationRulePayload';
  /** The `CategorizationRule` that was updated by this mutation. */
  categorizationRule?: Maybe<CategorizationRule>;
  /** An edge for our `CategorizationRule`. May be used by Relay 1. */
  categorizationRuleEdge?: Maybe<CategorizationRuleEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `CategorizationRule` mutation. */
export type UpdateCategorizationRulePayloadCategorizationRuleEdgeArgs = {
  orderBy?: Array<CategorizationRuleOrderBy>;
};

/** All input for the `updateConnectedAccountById` mutation. */
export type UpdateConnectedAccountByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `ConnectedAccount` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `ConnectedAccount` being updated. */
  patch: ConnectedAccountPatch;
};

/** All input for the `updateConnectedAccount` mutation. */
export type UpdateConnectedAccountInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `ConnectedAccount` being updated. */
  patch: ConnectedAccountPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `ConnectedAccount` mutation. */
export type UpdateConnectedAccountPayload = {
  __typename?: 'UpdateConnectedAccountPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `ConnectedAccount` that was updated by this mutation. */
  connectedAccount?: Maybe<ConnectedAccount>;
  /** An edge for our `ConnectedAccount`. May be used by Relay 1. */
  connectedAccountEdge?: Maybe<ConnectedAccountEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `ConnectedAccount` mutation. */
export type UpdateConnectedAccountPayloadConnectedAccountEdgeArgs = {
  orderBy?: Array<ConnectedAccountOrderBy>;
};

/** All input for the `updateCryptoAssetById` mutation. */
export type UpdateCryptoAssetByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `CryptoAsset` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `CryptoAsset` being updated. */
  patch: CryptoAssetPatch;
};

/** All input for the `updateCryptoAsset` mutation. */
export type UpdateCryptoAssetInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `CryptoAsset` being updated. */
  patch: CryptoAssetPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `CryptoAsset` mutation. */
export type UpdateCryptoAssetPayload = {
  __typename?: 'UpdateCryptoAssetPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `CryptoAsset` that was updated by this mutation. */
  cryptoAsset?: Maybe<CryptoAsset>;
  /** An edge for our `CryptoAsset`. May be used by Relay 1. */
  cryptoAssetEdge?: Maybe<CryptoAssetEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `CryptoAsset` mutation. */
export type UpdateCryptoAssetPayloadCryptoAssetEdgeArgs = {
  orderBy?: Array<CryptoAssetOrderBy>;
};

/** All input for the `updateCryptoLotById` mutation. */
export type UpdateCryptoLotByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `CryptoLot` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `CryptoLot` being updated. */
  patch: CryptoLotPatch;
};

/** All input for the `updateCryptoLot` mutation. */
export type UpdateCryptoLotInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `CryptoLot` being updated. */
  patch: CryptoLotPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `CryptoLot` mutation. */
export type UpdateCryptoLotPayload = {
  __typename?: 'UpdateCryptoLotPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `CryptoLot` that was updated by this mutation. */
  cryptoLot?: Maybe<CryptoLot>;
  /** An edge for our `CryptoLot`. May be used by Relay 1. */
  cryptoLotEdge?: Maybe<CryptoLotEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `CryptoLot` mutation. */
export type UpdateCryptoLotPayloadCryptoLotEdgeArgs = {
  orderBy?: Array<CryptoLotOrderBy>;
};

/** All input for the `updateDrizzleMigrationById` mutation. */
export type UpdateDrizzleMigrationByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `_DrizzleMigration` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `_DrizzleMigration` being updated. */
  patch: _DrizzleMigrationPatch;
};

/** All input for the `updateDrizzleMigration` mutation. */
export type UpdateDrizzleMigrationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `_DrizzleMigration` being updated. */
  patch: _DrizzleMigrationPatch;
  rowId: Scalars['Int']['input'];
};

/** The output of our update `_DrizzleMigration` mutation. */
export type UpdateDrizzleMigrationPayload = {
  __typename?: 'UpdateDrizzleMigrationPayload';
  /** The `_DrizzleMigration` that was updated by this mutation. */
  _drizzleMigration?: Maybe<_DrizzleMigration>;
  /** An edge for our `_DrizzleMigration`. May be used by Relay 1. */
  _drizzleMigrationEdge?: Maybe<_DrizzleMigrationEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `_DrizzleMigration` mutation. */
export type UpdateDrizzleMigrationPayload_DrizzleMigrationEdgeArgs = {
  orderBy?: Array<_DrizzleMigrationOrderBy>;
};

/** All input for the `updateFixedAssetById` mutation. */
export type UpdateFixedAssetByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `FixedAsset` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `FixedAsset` being updated. */
  patch: FixedAssetPatch;
};

/** All input for the `updateFixedAsset` mutation. */
export type UpdateFixedAssetInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `FixedAsset` being updated. */
  patch: FixedAssetPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `FixedAsset` mutation. */
export type UpdateFixedAssetPayload = {
  __typename?: 'UpdateFixedAssetPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `FixedAsset` that was updated by this mutation. */
  fixedAsset?: Maybe<FixedAsset>;
  /** An edge for our `FixedAsset`. May be used by Relay 1. */
  fixedAssetEdge?: Maybe<FixedAssetEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `FixedAsset` mutation. */
export type UpdateFixedAssetPayloadFixedAssetEdgeArgs = {
  orderBy?: Array<FixedAssetOrderBy>;
};

/** All input for the `updateImportProfileById` mutation. */
export type UpdateImportProfileByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `ImportProfile` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `ImportProfile` being updated. */
  patch: ImportProfilePatch;
};

/** All input for the `updateImportProfile` mutation. */
export type UpdateImportProfileInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `ImportProfile` being updated. */
  patch: ImportProfilePatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `ImportProfile` mutation. */
export type UpdateImportProfilePayload = {
  __typename?: 'UpdateImportProfilePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `ImportProfile` that was updated by this mutation. */
  importProfile?: Maybe<ImportProfile>;
  /** An edge for our `ImportProfile`. May be used by Relay 1. */
  importProfileEdge?: Maybe<ImportProfileEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `ImportProfile` mutation. */
export type UpdateImportProfilePayloadImportProfileEdgeArgs = {
  orderBy?: Array<ImportProfileOrderBy>;
};

/** All input for the `updateJournalEntryById` mutation. */
export type UpdateJournalEntryByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `JournalEntry` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `JournalEntry` being updated. */
  patch: JournalEntryPatch;
};

/** All input for the `updateJournalEntry` mutation. */
export type UpdateJournalEntryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `JournalEntry` being updated. */
  patch: JournalEntryPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `JournalEntry` mutation. */
export type UpdateJournalEntryPayload = {
  __typename?: 'UpdateJournalEntryPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `JournalEntry` that was updated by this mutation. */
  journalEntry?: Maybe<JournalEntry>;
  /** An edge for our `JournalEntry`. May be used by Relay 1. */
  journalEntryEdge?: Maybe<JournalEntryEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `JournalEntry` mutation. */
export type UpdateJournalEntryPayloadJournalEntryEdgeArgs = {
  orderBy?: Array<JournalEntryOrderBy>;
};

/** All input for the `updateJournalLineById` mutation. */
export type UpdateJournalLineByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `JournalLine` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `JournalLine` being updated. */
  patch: JournalLinePatch;
};

/** All input for the `updateJournalLine` mutation. */
export type UpdateJournalLineInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `JournalLine` being updated. */
  patch: JournalLinePatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `JournalLine` mutation. */
export type UpdateJournalLinePayload = {
  __typename?: 'UpdateJournalLinePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `JournalLine` that was updated by this mutation. */
  journalLine?: Maybe<JournalLine>;
  /** An edge for our `JournalLine`. May be used by Relay 1. */
  journalLineEdge?: Maybe<JournalLineEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `JournalLine` mutation. */
export type UpdateJournalLinePayloadJournalLineEdgeArgs = {
  orderBy?: Array<JournalLineOrderBy>;
};

/** All input for the `updateJournalLineTagById` mutation. */
export type UpdateJournalLineTagByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `JournalLineTag` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `JournalLineTag` being updated. */
  patch: JournalLineTagPatch;
};

/** All input for the `updateJournalLineTag` mutation. */
export type UpdateJournalLineTagInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `JournalLineTag` being updated. */
  patch: JournalLineTagPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `JournalLineTag` mutation. */
export type UpdateJournalLineTagPayload = {
  __typename?: 'UpdateJournalLineTagPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `JournalLineTag` that was updated by this mutation. */
  journalLineTag?: Maybe<JournalLineTag>;
  /** An edge for our `JournalLineTag`. May be used by Relay 1. */
  journalLineTagEdge?: Maybe<JournalLineTagEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `JournalLineTag` mutation. */
export type UpdateJournalLineTagPayloadJournalLineTagEdgeArgs = {
  orderBy?: Array<JournalLineTagOrderBy>;
};

/** All input for the `updateMileageLogById` mutation. */
export type UpdateMileageLogByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `MileageLog` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `MileageLog` being updated. */
  patch: MileageLogPatch;
};

/** All input for the `updateMileageLog` mutation. */
export type UpdateMileageLogInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `MileageLog` being updated. */
  patch: MileageLogPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `MileageLog` mutation. */
export type UpdateMileageLogPayload = {
  __typename?: 'UpdateMileageLogPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `MileageLog` that was updated by this mutation. */
  mileageLog?: Maybe<MileageLog>;
  /** An edge for our `MileageLog`. May be used by Relay 1. */
  mileageLogEdge?: Maybe<MileageLogEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `MileageLog` mutation. */
export type UpdateMileageLogPayloadMileageLogEdgeArgs = {
  orderBy?: Array<MileageLogOrderBy>;
};

/** All input for the `updateNetWorthSnapshotById` mutation. */
export type UpdateNetWorthSnapshotByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `NetWorthSnapshot` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `NetWorthSnapshot` being updated. */
  patch: NetWorthSnapshotPatch;
};

/** All input for the `updateNetWorthSnapshot` mutation. */
export type UpdateNetWorthSnapshotInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `NetWorthSnapshot` being updated. */
  patch: NetWorthSnapshotPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `NetWorthSnapshot` mutation. */
export type UpdateNetWorthSnapshotPayload = {
  __typename?: 'UpdateNetWorthSnapshotPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `NetWorthSnapshot` that was updated by this mutation. */
  netWorthSnapshot?: Maybe<NetWorthSnapshot>;
  /** An edge for our `NetWorthSnapshot`. May be used by Relay 1. */
  netWorthSnapshotEdge?: Maybe<NetWorthSnapshotEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `NetWorthSnapshot` mutation. */
export type UpdateNetWorthSnapshotPayloadNetWorthSnapshotEdgeArgs = {
  orderBy?: Array<NetWorthSnapshotOrderBy>;
};

/** All input for the `updatePayrollConnectionById` mutation. */
export type UpdatePayrollConnectionByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `PayrollConnection` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `PayrollConnection` being updated. */
  patch: PayrollConnectionPatch;
};

/** All input for the `updatePayrollConnection` mutation. */
export type UpdatePayrollConnectionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `PayrollConnection` being updated. */
  patch: PayrollConnectionPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `PayrollConnection` mutation. */
export type UpdatePayrollConnectionPayload = {
  __typename?: 'UpdatePayrollConnectionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `PayrollConnection` that was updated by this mutation. */
  payrollConnection?: Maybe<PayrollConnection>;
  /** An edge for our `PayrollConnection`. May be used by Relay 1. */
  payrollConnectionEdge?: Maybe<PayrollConnectionEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `PayrollConnection` mutation. */
export type UpdatePayrollConnectionPayloadPayrollConnectionEdgeArgs = {
  orderBy?: Array<PayrollConnectionOrderBy>;
};

/** All input for the `updateReconciliationQueueById` mutation. */
export type UpdateReconciliationQueueByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `ReconciliationQueue` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `ReconciliationQueue` being updated. */
  patch: ReconciliationQueuePatch;
};

/** All input for the `updateReconciliationQueue` mutation. */
export type UpdateReconciliationQueueInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `ReconciliationQueue` being updated. */
  patch: ReconciliationQueuePatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `ReconciliationQueue` mutation. */
export type UpdateReconciliationQueuePayload = {
  __typename?: 'UpdateReconciliationQueuePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `ReconciliationQueue` that was updated by this mutation. */
  reconciliationQueue?: Maybe<ReconciliationQueue>;
  /** An edge for our `ReconciliationQueue`. May be used by Relay 1. */
  reconciliationQueueEdge?: Maybe<ReconciliationQueueEdge>;
};


/** The output of our update `ReconciliationQueue` mutation. */
export type UpdateReconciliationQueuePayloadReconciliationQueueEdgeArgs = {
  orderBy?: Array<ReconciliationQueueOrderBy>;
};

/** All input for the `updateReconciliationStatementById` mutation. */
export type UpdateReconciliationStatementByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `ReconciliationStatement` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `ReconciliationStatement` being updated. */
  patch: ReconciliationStatementPatch;
};

/** All input for the `updateReconciliationStatement` mutation. */
export type UpdateReconciliationStatementInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `ReconciliationStatement` being updated. */
  patch: ReconciliationStatementPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `ReconciliationStatement` mutation. */
export type UpdateReconciliationStatementPayload = {
  __typename?: 'UpdateReconciliationStatementPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `ReconciliationStatement` that was updated by this mutation. */
  reconciliationStatement?: Maybe<ReconciliationStatement>;
  /** An edge for our `ReconciliationStatement`. May be used by Relay 1. */
  reconciliationStatementEdge?: Maybe<ReconciliationStatementEdge>;
};


/** The output of our update `ReconciliationStatement` mutation. */
export type UpdateReconciliationStatementPayloadReconciliationStatementEdgeArgs = {
  orderBy?: Array<ReconciliationStatementOrderBy>;
};

/** All input for the `updateRecurringTransactionById` mutation. */
export type UpdateRecurringTransactionByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `RecurringTransaction` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `RecurringTransaction` being updated. */
  patch: RecurringTransactionPatch;
};

/** All input for the `updateRecurringTransaction` mutation. */
export type UpdateRecurringTransactionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `RecurringTransaction` being updated. */
  patch: RecurringTransactionPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `RecurringTransaction` mutation. */
export type UpdateRecurringTransactionPayload = {
  __typename?: 'UpdateRecurringTransactionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `RecurringTransaction` that was updated by this mutation. */
  recurringTransaction?: Maybe<RecurringTransaction>;
  /** An edge for our `RecurringTransaction`. May be used by Relay 1. */
  recurringTransactionEdge?: Maybe<RecurringTransactionEdge>;
};


/** The output of our update `RecurringTransaction` mutation. */
export type UpdateRecurringTransactionPayloadRecurringTransactionEdgeArgs = {
  orderBy?: Array<RecurringTransactionOrderBy>;
};

/** All input for the `updateSavingsGoalById` mutation. */
export type UpdateSavingsGoalByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `SavingsGoal` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `SavingsGoal` being updated. */
  patch: SavingsGoalPatch;
};

/** All input for the `updateSavingsGoal` mutation. */
export type UpdateSavingsGoalInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `SavingsGoal` being updated. */
  patch: SavingsGoalPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `SavingsGoal` mutation. */
export type UpdateSavingsGoalPayload = {
  __typename?: 'UpdateSavingsGoalPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SavingsGoal` that was updated by this mutation. */
  savingsGoal?: Maybe<SavingsGoal>;
  /** An edge for our `SavingsGoal`. May be used by Relay 1. */
  savingsGoalEdge?: Maybe<SavingsGoalEdge>;
};


/** The output of our update `SavingsGoal` mutation. */
export type UpdateSavingsGoalPayloadSavingsGoalEdgeArgs = {
  orderBy?: Array<SavingsGoalOrderBy>;
};

/** All input for the `updateTagById` mutation. */
export type UpdateTagByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Tag` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Tag` being updated. */
  patch: TagPatch;
};

/** All input for the `updateTagGroupById` mutation. */
export type UpdateTagGroupByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `TagGroup` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `TagGroup` being updated. */
  patch: TagGroupPatch;
};

/** All input for the `updateTagGroup` mutation. */
export type UpdateTagGroupInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `TagGroup` being updated. */
  patch: TagGroupPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `TagGroup` mutation. */
export type UpdateTagGroupPayload = {
  __typename?: 'UpdateTagGroupPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `TagGroup` that was updated by this mutation. */
  tagGroup?: Maybe<TagGroup>;
  /** An edge for our `TagGroup`. May be used by Relay 1. */
  tagGroupEdge?: Maybe<TagGroupEdge>;
};


/** The output of our update `TagGroup` mutation. */
export type UpdateTagGroupPayloadTagGroupEdgeArgs = {
  orderBy?: Array<TagGroupOrderBy>;
};

/** All input for the `updateTag` mutation. */
export type UpdateTagInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Tag` being updated. */
  patch: TagPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `Tag` mutation. */
export type UpdateTagPayload = {
  __typename?: 'UpdateTagPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Tag` that was updated by this mutation. */
  tag?: Maybe<Tag>;
  /** An edge for our `Tag`. May be used by Relay 1. */
  tagEdge?: Maybe<TagEdge>;
};


/** The output of our update `Tag` mutation. */
export type UpdateTagPayloadTagEdgeArgs = {
  orderBy?: Array<TagOrderBy>;
};

/** All input for the `updateTaxJurisdictionById` mutation. */
export type UpdateTaxJurisdictionByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `TaxJurisdiction` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `TaxJurisdiction` being updated. */
  patch: TaxJurisdictionPatch;
};

/** All input for the `updateTaxJurisdiction` mutation. */
export type UpdateTaxJurisdictionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `TaxJurisdiction` being updated. */
  patch: TaxJurisdictionPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `TaxJurisdiction` mutation. */
export type UpdateTaxJurisdictionPayload = {
  __typename?: 'UpdateTaxJurisdictionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `TaxJurisdiction` that was updated by this mutation. */
  taxJurisdiction?: Maybe<TaxJurisdiction>;
  /** An edge for our `TaxJurisdiction`. May be used by Relay 1. */
  taxJurisdictionEdge?: Maybe<TaxJurisdictionEdge>;
};


/** The output of our update `TaxJurisdiction` mutation. */
export type UpdateTaxJurisdictionPayloadTaxJurisdictionEdgeArgs = {
  orderBy?: Array<TaxJurisdictionOrderBy>;
};

/** All input for the `updateVehicleById` mutation. */
export type UpdateVehicleByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Vehicle` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Vehicle` being updated. */
  patch: VehiclePatch;
};

/** All input for the `updateVehicle` mutation. */
export type UpdateVehicleInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Vehicle` being updated. */
  patch: VehiclePatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `Vehicle` mutation. */
export type UpdateVehiclePayload = {
  __typename?: 'UpdateVehiclePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Vehicle` that was updated by this mutation. */
  vehicle?: Maybe<Vehicle>;
  /** An edge for our `Vehicle`. May be used by Relay 1. */
  vehicleEdge?: Maybe<VehicleEdge>;
};


/** The output of our update `Vehicle` mutation. */
export type UpdateVehiclePayloadVehicleEdgeArgs = {
  orderBy?: Array<VehicleOrderBy>;
};

/** All input for the `updateVendorById` mutation. */
export type UpdateVendorByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Vendor` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Vendor` being updated. */
  patch: VendorPatch;
};

/** All input for the `updateVendor` mutation. */
export type UpdateVendorInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Vendor` being updated. */
  patch: VendorPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `Vendor` mutation. */
export type UpdateVendorPayload = {
  __typename?: 'UpdateVendorPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Vendor` that was updated by this mutation. */
  vendor?: Maybe<Vendor>;
  /** An edge for our `Vendor`. May be used by Relay 1. */
  vendorEdge?: Maybe<VendorEdge>;
};


/** The output of our update `Vendor` mutation. */
export type UpdateVendorPayloadVendorEdgeArgs = {
  orderBy?: Array<VendorOrderBy>;
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

/** An input for mutations affecting `Vehicle` */
export type VehicleInput = {
  bookId: Scalars['UUID']['input'];
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  dateInService?: InputMaybe<Scalars['String']['input']>;
  make?: InputMaybe<Scalars['String']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
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

/** Represents an update to a `Vehicle`. Fields that are set will be updated. */
export type VehiclePatch = {
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  dateInService?: InputMaybe<Scalars['String']['input']>;
  make?: InputMaybe<Scalars['String']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

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
  /** Reads a single `Book` that is related to this `Vendor`. */
  book?: Maybe<Book>;
  bookId: Scalars['UUID']['output'];
  businessName?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  is1099Eligible: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  rowId: Scalars['UUID']['output'];
  state?: Maybe<Scalars['String']['output']>;
  taxId?: Maybe<Scalars['String']['output']>;
  taxIdType?: Maybe<Scalars['String']['output']>;
  threshold?: Maybe<Scalars['BigFloat']['output']>;
  zip?: Maybe<Scalars['String']['output']>;
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
  /** Filter by the object’s `book` relation. */
  book?: InputMaybe<BookFilter>;
  /** Filter by the object’s `bookId` field. */
  bookId?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<VendorFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<VendorFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
};

/** An input for mutations affecting `Vendor` */
export type VendorInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  bookId: Scalars['UUID']['input'];
  businessName?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  is1099Eligible?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  taxId?: InputMaybe<Scalars['String']['input']>;
  taxIdType?: InputMaybe<Scalars['String']['input']>;
  threshold?: InputMaybe<Scalars['BigFloat']['input']>;
  zip?: InputMaybe<Scalars['String']['input']>;
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

/** Represents an update to a `Vendor`. Fields that are set will be updated. */
export type VendorPatch = {
  address?: InputMaybe<Scalars['String']['input']>;
  bookId?: InputMaybe<Scalars['UUID']['input']>;
  businessName?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  is1099Eligible?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  taxId?: InputMaybe<Scalars['String']['input']>;
  taxIdType?: InputMaybe<Scalars['String']['input']>;
  threshold?: InputMaybe<Scalars['BigFloat']['input']>;
  zip?: InputMaybe<Scalars['String']['input']>;
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

/** An input for mutations affecting `_DrizzleMigration` */
export type _DrizzleMigrationInput = {
  createdAt?: InputMaybe<Scalars['BigInt']['input']>;
  hash: Scalars['String']['input'];
  rowId?: InputMaybe<Scalars['Int']['input']>;
};

/** Methods to use when ordering `_DrizzleMigration`. */
export enum _DrizzleMigrationOrderBy {
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

/** Represents an update to a `_DrizzleMigration`. Fields that are set will be updated. */
export type _DrizzleMigrationPatch = {
  createdAt?: InputMaybe<Scalars['BigInt']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['Int']['input']>;
};

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
  | 'fixed_asset'
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
  | 'tax_expense';

export type AccountType =
  | 'asset'
  | 'equity'
  | 'expense'
  | 'liability'
  | 'revenue';

/** An input for mutations affecting `Book` */
export type BookInput = {
  createdAt?: Date | null | undefined;
  currency?: string | null | undefined;
  fiscalYearStartMonth?: number | null | undefined;
  name: string;
  organizationId: string;
  rowId?: string | null | undefined;
  type: string;
  updatedAt?: Date | null | undefined;
};

/** Represents an update to a `Book`. Fields that are set will be updated. */
export type BookPatch = {
  createdAt?: Date | null | undefined;
  currency?: string | null | undefined;
  fiscalYearStartMonth?: number | null | undefined;
  name?: string | null | undefined;
  organizationId?: string | null | undefined;
  rowId?: string | null | undefined;
  type?: string | null | undefined;
  updatedAt?: Date | null | undefined;
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

export type BudgetPeriod =
  | 'monthly'
  | 'quarterly'
  | 'yearly';

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