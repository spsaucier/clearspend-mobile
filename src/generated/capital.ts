/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface LimitTypeMap {
  limitType?: "ACH_DEPOSIT" | "ACH_WITHDRAW" | "PURCHASE" | "ATM_WITHDRAW";
}

export interface ControllerError {
  message?: string;
}

export interface Address {
  streetLine1?: string;
  streetLine2?: string;
  locality?: string;
  region?: string;
  postalCode?: string;
  country?:
    | "UNSPECIFIED"
    | "ABW"
    | "AFG"
    | "AGO"
    | "AIA"
    | "ALA"
    | "ALB"
    | "AND"
    | "ANT"
    | "ARE"
    | "ARG"
    | "ARM"
    | "ASM"
    | "ATA"
    | "ATF"
    | "ATG"
    | "AUS"
    | "AUT"
    | "AZE"
    | "BDI"
    | "BEL"
    | "BEN"
    | "BFA"
    | "BGD"
    | "BGR"
    | "BHR"
    | "BHS"
    | "BIH"
    | "BLM"
    | "BLR"
    | "BLZ"
    | "BMU"
    | "BOL"
    | "BRA"
    | "BRB"
    | "BRN"
    | "BTN"
    | "BVT"
    | "BWA"
    | "CAF"
    | "CAN"
    | "CCK"
    | "CHE"
    | "CHL"
    | "CHN"
    | "CIV"
    | "CMR"
    | "COD"
    | "COG"
    | "COK"
    | "COL"
    | "COM"
    | "CPV"
    | "CRI"
    | "CUB"
    | "CXR"
    | "CYM"
    | "CYP"
    | "CZE"
    | "DEU"
    | "DJI"
    | "DMA"
    | "DNK"
    | "DOM"
    | "DZA"
    | "ECU"
    | "EGY"
    | "ERI"
    | "ESH"
    | "ESP"
    | "EST"
    | "ETH"
    | "FIN"
    | "FJI"
    | "FLK"
    | "FRA"
    | "FRO"
    | "FSM"
    | "GAB"
    | "GBR"
    | "GEO"
    | "GGY"
    | "GHA"
    | "GIB"
    | "GIN"
    | "GLP"
    | "GMB"
    | "GNB"
    | "GNQ"
    | "GRC"
    | "GRD"
    | "GRL"
    | "GTM"
    | "GUF"
    | "GUM"
    | "GUY"
    | "HKG"
    | "HMD"
    | "HND"
    | "HRV"
    | "HTI"
    | "HUN"
    | "IDN"
    | "IMN"
    | "IND"
    | "IOT"
    | "IRL"
    | "IRN"
    | "IRQ"
    | "ISL"
    | "ISR"
    | "ITA"
    | "JAM"
    | "JEY"
    | "JOR"
    | "JPN"
    | "KAZ"
    | "KEN"
    | "KGZ"
    | "KHM"
    | "KIR"
    | "KNA"
    | "KOR"
    | "KWT"
    | "LAO"
    | "LBN"
    | "LBR"
    | "LBY"
    | "LCA"
    | "LIE"
    | "LKA"
    | "LSO"
    | "LTU"
    | "LUX"
    | "LVA"
    | "MAC"
    | "MAF"
    | "MAR"
    | "MCO"
    | "MDA"
    | "MDG"
    | "MDV"
    | "MEX"
    | "MHL"
    | "MKD"
    | "MLI"
    | "MLT"
    | "MMR"
    | "MNE"
    | "MNG"
    | "MNP"
    | "MOZ"
    | "MRT"
    | "MSR"
    | "MTQ"
    | "MUS"
    | "MWI"
    | "MYS"
    | "MYT"
    | "NAM"
    | "NCL"
    | "NER"
    | "NFK"
    | "NGA"
    | "NIC"
    | "NIU"
    | "NLD"
    | "NOR"
    | "NPL"
    | "NRU"
    | "NZL"
    | "OMN"
    | "PAK"
    | "PAN"
    | "PCN"
    | "PER"
    | "PHL"
    | "PLW"
    | "PNG"
    | "POL"
    | "PRI"
    | "PRK"
    | "PRT"
    | "PRY"
    | "PSE"
    | "PYF"
    | "QAT"
    | "REU"
    | "ROU"
    | "RUS"
    | "RWA"
    | "SAU"
    | "SDN"
    | "SEN"
    | "SGP"
    | "SGS"
    | "SHN"
    | "SJM"
    | "SLB"
    | "SLE"
    | "SLV"
    | "SMR"
    | "SOM"
    | "SPM"
    | "SRB"
    | "SSD"
    | "STP"
    | "SUR"
    | "SVK"
    | "SVN"
    | "SWE"
    | "SWZ"
    | "SYC"
    | "SYR"
    | "TCA"
    | "TCD"
    | "TGO"
    | "THA"
    | "TJK"
    | "TKL"
    | "TKM"
    | "TLS"
    | "TON"
    | "TTO"
    | "TUN"
    | "TUR"
    | "TUV"
    | "TWN"
    | "TZA"
    | "UGA"
    | "UKR"
    | "UMI"
    | "URY"
    | "USA"
    | "UZB"
    | "VAT"
    | "VCT"
    | "VEN"
    | "VGB"
    | "VIR"
    | "VNM"
    | "VUT"
    | "WLF"
    | "WSM"
    | "YEM"
    | "ZAF"
    | "ZMB"
    | "ZWE";
}

export interface CreateUserRequest {
  /**
   * The first name of the person
   * @example John
   */
  firstName: string;

  /**
   * The last name of the person
   * @example Wick
   */
  lastName: string;
  address?: Address;

  /**
   * Email address of the person
   * @pattern ^[^@]+@[^@.]+\.[^@]+$
   * @example johnw@hightable.com
   */
  email: string;

  /**
   * Phone number in e.164 format
   * @pattern ^\+[1-9][0-9]{9,14}$
   * @example +1234567890
   */
  phone?: string;

  /** Flag to indicate whether a password should be created for the user */
  generatePassword?: boolean;
}

export interface CreateUserResponse {
  /** @format uuid */
  userId: string;

  /** Flag to indicate whether a password should be created for the user */
  password?: string;

  /** Error message for any records that failed. Will be null if successful */
  errorMessage?: string;
}

export interface OrderBy {
  /** @pattern [a-zA-Z0-9_\-]* */
  item?: string;
  direction?: "ASC" | "DESC";
}

export interface PageRequest {
  /** @format int32 */
  pageNumber: number;

  /** @format int32 */
  pageSize: number;
  orderBy?: OrderBy[];
}

export interface SearchUserRequest {
  allocations?: string[];
  hasVirtualCard?: boolean;
  hasPhysicalCard?: boolean;
  withoutCard?: boolean;
  searchText?: string;
  includeArchived?: boolean;
  pageRequest?: PageRequest;
}

export interface CardInfo {
  /** @format uuid */
  cardId?: string;
  lastFour?: string;
  allocationName?: string;
  ownerFirstName?: string;
  ownerLastName?: string;
}

export interface PagedDataUserPageData {
  /** @format int32 */
  pageNumber?: number;

  /** @format int32 */
  pageSize?: number;

  /** @format int64 */
  totalElements?: number;
  content?: UserPageData[];
}

export interface UserData {
  /** @format uuid */
  userId?: string;
  type?: "EMPLOYEE" | "BUSINESS_OWNER";
  firstName?: string;
  lastName?: string;
}

export interface UserPageData {
  userData?: UserData;
  email?: string;
  archived?: boolean;
  cardInfoList?: CardInfo[];
}

export interface CreateProgramRequest {
  fundingType?: "POOLED" | "INDIVIDUAL";
  cardType?: "PLASTIC" | "VIRTUAL";
  i2c_program_ref?: string;
  bin?: string;
  name?: string;
}

export interface CreateProgramResponse {
  /** @format uuid */
  programId: string;
}

export interface Amount {
  /** @example USD */
  currency: "UNSPECIFIED" | "USD";

  /** @example 100 */
  amount: number;
}

export interface NetworkMessageRequest {
  /** @format uuid */
  cardId?: string;
  networkMessageType?:
    | "PRE_AUTH"
    | "PRE_AUTH_ADVICE"
    | "FINANCIAL_AUTH"
    | "FINANCIAL_AUTH_ADVICE"
    | "REVERSAL"
    | "REVERSAL_ADVICE";
  amount?: Amount;
}

export interface NetworkMessageResponse {
  /** @format uuid */
  networkMessageId?: string;
}

export interface KycPassRequest {
  to?: string;
  firstName?: string;
}

export interface KycFailRequest {
  to?: string;
  firstName?: string;
  reasons?: string[];
}

export interface CreateBusinessOwnerRequest {
  /** @format uuid */
  businessId?: string;

  /** @format uuid */
  businessOwnerId?: string;
  username?: string;
  password?: string;
}

export interface TransactBankAccountRequest {
  bankAccountTransactType?: "DEPOSIT" | "WITHDRAW";
  amount?: Amount;

  /**
   * Indicate if transaction is requested during the onboarding process
   * @example false
   */
  isOnboarding?: boolean;
}

export interface CreateAdjustmentResponse {
  /** @format uuid */
  adjustmentId?: string;
}

export interface CreateReceiptResponse {
  /** @format uuid */
  receiptId?: string;
}

export interface CurrencyLimit {
  currency: "UNSPECIFIED" | "USD";
  typeMap: LimitTypeMap;
}

export interface IssueCardRequest {
  /**
   * @format uuid
   * @example 18104ecb-1343-4cc1-b6f2-e6cc88e9a80f
   */
  programId: string;

  /**
   * @format uuid
   * @example 28104ecb-1343-4cc1-b6f2-e6cc88e9a80f
   */
  allocationId: string;

  /**
   * @format uuid
   * @example 38104ecb-1343-4cc1-b6f2-e6cc88e9a80f
   */
  userId: string;
  currency: "UNSPECIFIED" | "USD";
  cardType: ("PLASTIC" | "VIRTUAL")[];
  isPersonal: boolean;
  limits: CurrencyLimit[];
  disabledMccGroups: string[];
  disabledTransactionChannels: ("ATM" | "POS" | "MOTO" | "ONLINE")[];
}

export interface IssueCardResponse {
  /** @format uuid */
  cardId: string;

  /** Error message for any records that failed. Will be null if successful */
  errorMessage?: string;
}

export interface SearchCardRequest {
  pageRequest: PageRequest;

  /** @format uuid */
  userId?: string;

  /** @format uuid */
  allocationId?: string;
  searchText?: string;
}

export interface ItemTypedIdAllocationId {
  /** @format uuid */
  id?: string;
  name?: string;
}

export interface PagedDataSearchCardData {
  /** @format int32 */
  pageNumber?: number;

  /** @format int32 */
  pageSize?: number;

  /** @format int64 */
  totalElements?: number;
  content?: SearchCardData[];
}

export interface SearchCardData {
  /** @format uuid */
  cardId?: string;
  cardNumber?: string;
  user?: UserData;
  allocation?: ItemTypedIdAllocationId;
  balance?: Amount;
  cardStatus?: "ACTIVE" | "INACTIVE" | "CANCELLED";
  cardType?: "PLASTIC" | "VIRTUAL";
}

export interface SearchBusinessAllocationRequest {
  name: string;
}

export interface Account {
  /** @format uuid */
  accountId: string;

  /** @format uuid */
  businessId: string;

  /** @format uuid */
  allocationId: string;

  /** @format uuid */
  ledgerAccountId: string;
  type: "ALLOCATION" | "CARD";

  /** @format uuid */
  cardId?: string;
  ledgerBalance: Amount;
}

export interface Allocation {
  /** @format uuid */
  allocationId: string;
  name: string;

  /** @format uuid */
  ownerId: string;
  account: Account;

  /** @format uuid */
  parentAllocationId?: string;
  childrenAllocationIds?: string[];
}

export interface CreateBusinessProspectRequest {
  /**
   * Email address of the prospect
   * @pattern ^[^@]+@[^@.]+\.[^@]+$
   * @example johnw@hightable.com
   */
  email: string;

  /**
   * The first name of the person
   * @example John
   */
  firstName: string;

  /**
   * The last name of the person
   * @example Wick
   */
  lastName: string;
}

export interface CreateBusinessProspectResponse {
  /** @format uuid */
  businessProspectId?: string;
  businessProspectStatus?:
    | "NEW"
    | "EMAIL_VERIFIED"
    | "MOBILE_VERIFIED"
    | "COMPLETED";
}

export interface ValidateBusinessProspectIdentifierRequest {
  /**
   * Type of Identifier to validate
   * @example EMAIL
   */
  identifierType?: "EMAIL" | "PHONE";

  /**
   * OTP received via email/phone
   * @example 67890
   */
  otp?: string;
}

export interface SetBusinessProspectPhoneRequest {
  /**
   * Phone number in e.164 format
   * @pattern ^\+[1-9][0-9]{9,14}$
   * @example +1234567890
   */
  phone?: string;
}

export interface SetBusinessProspectPasswordRequest {
  /** @example excommunicado */
  password?: string;
}

export interface ConvertBusinessProspectRequest {
  legalName?: string;
  businessType?:
    | "UNSPECIFIED"
    | "LLC"
    | "LLP"
    | "S_CORP"
    | "C_CORP"
    | "B_CORP"
    | "SOLE_PROPRIETORSHIP"
    | "_501_C_3";

  /** @pattern ^[1-9][0-9]{8}$ */
  employerIdentificationNumber?: string;

  /**
   * Phone number in e.164 format
   * @pattern ^\+[1-9][0-9]{9,14}$
   * @example +1234567890
   */
  businessPhone?: string;
  address?: Address;
}

export interface Business {
  /** @format uuid */
  businessId?: string;
  legalName?: string;
  businessType?:
    | "UNSPECIFIED"
    | "LLC"
    | "LLP"
    | "S_CORP"
    | "C_CORP"
    | "B_CORP"
    | "SOLE_PROPRIETORSHIP"
    | "_501_C_3";
  employerIdentificationNumber?: string;

  /**
   * Phone number in e.164 format
   * @example +1234567890
   */
  businessPhone?: string;
  address?: Address;
  onboardingStep?:
    | "BUSINESS_OWNERS"
    | "SOFT_FAIL"
    | "REVIEW"
    | "LINK_ACCOUNT"
    | "TRANSFER_MONEY"
    | "COMPLETE";
  knowYourBusinessStatus?: "PENDING" | "REVIEW" | "FAIL" | "PASS";
  status?: "ONBOARDING" | "ACTIVE" | "SUSPENDED" | "CLOSED";
}

export interface ConvertBusinessProspectResponse {
  business?: Business;

  /** @format uuid */
  businessOwnerId?: string;
}

export interface CreateOrUpdateBusinessOwnerRequest {
  /**
   * The first name of the person
   * @example John
   */
  firstName: string;

  /**
   * The last name of the person
   * @example Wick
   */
  lastName: string;

  /**
   * The date of birth of the person
   * @format date
   * @example 1990-01-01
   */
  dateOfBirth: string;

  /**
   * The tax identification number of the person
   * @example 091827364
   */
  taxIdentificationNumber: string;

  /**
   * Email address of the person
   * @pattern ^[^@]+@[^@.]+\.[^@]+$
   * @example johnw@hightable.com
   */
  email: string;

  /**
   * Phone address of the person
   * @pattern ^\+[1-9][0-9]{9,14}$
   * @example +12345679
   */
  phone: string;
  address?: Address;

  /**
   * Indication if business owner is updated during the onboarding process
   * @example false
   */
  isOnboarding?: boolean;
}

export interface CreateBusinessOwnerResponse {
  /** @format uuid */
  businessOwnerId: string;

  /** Error message for any records that failed. Will be null if successful */
  errorMessage?: string;
}

export interface CreateBinRequest {
  bin?: string;
  name?: string;
}

export interface CreateBinResponse {
  /** @format uuid */
  binId: string;
}

export interface ResetPasswordRequest {
  changePasswordId?: string;
  newPassword?: string;
}

export interface LoginRequest {
  username?: string;
  password?: string;
}

export interface User {
  /** @format uuid */
  userId?: string;

  /** @format uuid */
  businessId?: string;
  type?: "EMPLOYEE" | "BUSINESS_OWNER";
  firstName?: string;
  lastName?: string;
  address?: Address;
  email?: string;
  phone?: string;
  archived?: boolean;
}

export interface ForgotPasswordRequest {
  email?: string;
}

export interface CreateAllocationRequest {
  /**
   * name of the department/ allocation
   * @example advertisement
   */
  name: string;

  /**
   * @format uuid
   * @example 48104ecb-1343-4cc1-b6f2-e6cc88e9a80f
   */
  parentAllocationId: string;

  /** @format uuid */
  ownerId: string;
  amount: Amount;
  limits: CurrencyLimit[];
  disabledMccGroups: string[];
  disabledTransactionChannels: ("ATM" | "POS" | "MOTO" | "ONLINE")[];
}

export interface CreateAllocationResponse {
  /** @format uuid */
  allocationId: string;
}

export interface AllocationFundCardRequest {
  /**
   * @format uuid
   * @example 48104ecb-1343-4cc1-b6f2-e6cc88e9a80f
   */
  allocationAccountId: string;

  /**
   * @format uuid
   * @example 48104ecb-1343-4cc1-b6f2-e6cc88e9a80f
   */
  cardId: string;

  /** @example DEPOSIT */
  reallocationType: "ALLOCATION_TO_CARD" | "CARD_TO_ALLOCATION";
  amount: Amount;
}

export interface AllocationFundCardResponse {
  /** @format uuid */
  businessAdjustmentId?: string;
  businessLedgerBalance?: Amount;

  /** @format uuid */
  allocationAdjustmentId?: string;
  allocationLedgerBalance?: Amount;
}

export interface AccountActivityRequest {
  pageRequest: PageRequest;

  /** @format uuid */
  allocationId?: string;

  /** @format uuid */
  userId?: string;

  /** @format uuid */
  cardId?: string;
  searchText?: string;
  type?:
    | "BANK_LINK"
    | "BANK_DEPOSIT"
    | "BANK_DEPOSIT_RETURN"
    | "BANK_WITHDRAWAL"
    | "BANK_WITHDRAWAL_RETURN"
    | "BANK_UNLINK"
    | "REALLOCATE"
    | "NETWORK_PRE_AUTH"
    | "NETWORK_FINANCIAL_AUTH"
    | "NETWORK_REVERSAL"
    | "NETWORK_SERVICE_FEE";

  /** @format date-time */
  from?: string;

  /** @format date-time */
  to?: string;
}

export interface AccountActivityResponse {
  /** @format uuid */
  accountActivityId?: string;

  /** @format date-time */
  activityTime?: string;
  accountName?: string;
  card?: CardInfo;
  merchant?: Merchant;
  type?:
    | "BANK_LINK"
    | "BANK_DEPOSIT"
    | "BANK_DEPOSIT_RETURN"
    | "BANK_WITHDRAWAL"
    | "BANK_WITHDRAWAL_RETURN"
    | "BANK_UNLINK"
    | "REALLOCATE"
    | "NETWORK_PRE_AUTH"
    | "NETWORK_FINANCIAL_AUTH"
    | "NETWORK_REVERSAL"
    | "NETWORK_SERVICE_FEE";
  status?: "PENDING" | "DECLINED" | "APPROVED" | "PROCESSED";
  amount?: Amount;
  receipt?: ReceiptDetails;
}

export interface Merchant {
  name?: string;
  type?: "UTILITIES" | "GROCERIES" | "RESTAURANTS" | "OTHERS";
  merchantNumber?: string;

  /** @format int32 */
  merchantCategoryCode?: number;
  merchantLogoUrl?: string;
  merchantLatitude?: number;
  merchantLongitude?: number;
}

export interface PagedDataAccountActivityResponse {
  /** @format int32 */
  pageNumber?: number;

  /** @format int32 */
  pageSize?: number;

  /** @format int64 */
  totalElements?: number;
  content?: AccountActivityResponse[];
}

export interface ReceiptDetails {
  /** @format uuid */
  receiptId?: string;
}

export interface GraphDataRequest {
  /** @format uuid */
  allocationId?: string;

  /** @format uuid */
  userId?: string;

  /** @format uuid */
  cardId?: string;

  /** @format date-time */
  from: string;

  /** @format date-time */
  to: string;
}

export interface DashboardGraphData {
  totalSpend?: number;
  averageSpend?: number;
  graphData?: GraphData[];
}

export interface GraphData {
  /** @format date-time */
  from?: string;

  /** @format date-time */
  to?: string;
  amount?: number;
}

export interface ChartDataRequest {
  chartFilter: "MERCHANT_CATEGORY" | "ALLOCATION" | "EMPLOYEE" | "MERCHANT";

  /** @format uuid */
  allocationId?: string;

  /** @format uuid */
  userId?: string;

  /** @format date-time */
  from: string;

  /** @format date-time */
  to: string;
}

export interface AllocationChartData {
  allocation?: AllocationInfo;
  amount?: Amount;
}

export interface AllocationInfo {
  /** @format uuid */
  allocationId?: string;
  name?: string;
}

export interface ChartDataResponse {
  merchantCategoryChartData?: MerchantCategoryChartData[];
  allocationChartData?: AllocationChartData[];
  userChartData?: UserChartData[];
  merchantChartData?: MerchantChartData[];
}

export interface MerchantCategoryChartData {
  merchantType?: "UTILITIES" | "GROCERIES" | "RESTAURANTS" | "OTHERS";
  amount?: Amount;
}

export interface MerchantChartData {
  merchant?: MerchantInfo;
  amount?: Amount;
}

export interface MerchantInfo {
  name?: string;
  type?: "UTILITIES" | "GROCERIES" | "RESTAURANTS" | "OTHERS";
  merchantNumber?: string;

  /** @format int32 */
  merchantCategoryCode?: number;
  merchantLogoUrl?: string;
}

export interface UserChartData {
  user?: UserChartInfo;
  amount?: Amount;
}

export interface UserChartInfo {
  /** @format uuid */
  userId?: string;
  type?: "EMPLOYEE" | "BUSINESS_OWNER";
  firstName?: string;
  lastName?: string;
}

export interface UpdateUserRequest {
  /**
   * The first name of the person
   * @example John
   */
  firstName: string;

  /**
   * The last name of the person
   * @example Wick
   */
  lastName: string;
  address?: Address;

  /**
   * Email address of the person
   * @pattern ^[^@]+@[^@.]+\.[^@]+$
   * @example johnw@hightable.com
   */
  email: string;

  /**
   * Phone number in e.164 format
   * @pattern ^\+[1-9][0-9]{9,14}$
   * @example +1234567890
   */
  phone?: string;

  /** Flag to indicate whether a password should be created for the user */
  generatePassword?: boolean;
}

export interface UpdateUserResponse {
  /** @format uuid */
  userId: string;

  /** Error message for any records that failed. Will be null if successful */
  errorMessage?: string;
}

export interface UpdateCardStatusRequest {
  /** @example BLOCKED */
  status?: "ACTIVE" | "INACTIVE" | "CANCELLED";

  /** @example CARDHOLDER_REQUESTED */
  statusReason?: "NONE" | "CARDHOLDER_REQUESTED";
}

export interface Card {
  /** @format uuid */
  cardId?: string;
  bin?: string;

  /** @format uuid */
  programId?: string;

  /** @format uuid */
  allocationId?: string;

  /** @format uuid */
  userId?: string;

  /** @format uuid */
  accountId?: string;
  status?: "ACTIVE" | "INACTIVE" | "CANCELLED";
  statusReason?: "NONE" | "CARDHOLDER_REQUESTED";
  fundingType?: "POOLED" | "INDIVIDUAL";

  /** @format date-time */
  issueDate?: string;

  /** @format date */
  expirationDate?: string;
  activated?: boolean;

  /** @format date-time */
  activationDate?: string;
  cardLine3?: string;
  cardLine4?: string;
  type?: "PLASTIC" | "VIRTUAL";
  superseded?: boolean;
  cardNumber?: string;
  lastFour?: string;
  address?: Address;
}

export interface UpdateAccountActivityRequest {
  notes: string;
}

export interface Agent {
  email?: string;
  external_id?: string;
}

export interface AlloyWebHookResponse {
  request_token?: string;
  timestamp?: string;
  type?: string;
  description?: string;
  data?: Data;
}

export interface ChildEntity {
  entity_token?: string;
  evaluation_tokens?: string[];
}

export interface Data {
  service?: string;
  entity_token?: string;
  external_entity_id?: string;
  group_token?: string;
  external_group_id?: string;
  review_token?: string;
  application_token?: string;
  application_name?: string;
  outcome?: string;
  reason?: string;
  reasons?: string[];
  started?: string;
  timestamp?: string;
  completed?: string;
  reviewer?: string;
  agent?: Agent;
  notes?: object;
  child_entities?: ChildEntity[];
}

export interface UpdateCardRequest {
  limits?: CurrencyLimit[];
  disabledMccGroups?: string[];
  disabledTransactionChannels?: ("ATM" | "POS" | "MOTO" | "ONLINE")[];
}

export interface CardDetailsResponse {
  card: Card;
  ledgerBalance: Amount;
  availableBalance: Amount;
  allocationName: string;
  limits?: CurrencyLimit[];
  disabledMccGroups?: string[];
  disabledTransactionChannels?: ("ATM" | "POS" | "MOTO" | "ONLINE")[];
}

export interface UpdateAllocationRequest {
  /**
   * name of the department/ allocation
   * @example advertisement
   */
  name?: string;

  /**
   * @format uuid
   * @example 48104ecb-1343-4cc1-b6f2-e6cc88e9a80f
   */
  parentAllocationId?: string;

  /** @format uuid */
  ownerId?: string;
  limits?: CurrencyLimit[];
  disabledMccGroups?: string[];
  disabledTransactionChannels?: ("ATM" | "POS" | "MOTO" | "ONLINE")[];
}

export interface AllocationDetailsResponse {
  allocation?: Allocation;
  owner?: UserData;
  limits?: CurrencyLimit[];
  disabledMccGroups?: string[];
  disabledTransactionChannels?: ("ATM" | "POS" | "MOTO" | "ONLINE")[];
}

export interface Program {
  /** @format uuid */
  programId?: string;
  name?: string;
  bin?: string;
  fundingType?: "POOLED" | "INDIVIDUAL";
  cardType?: "PLASTIC" | "VIRTUAL";
}

export interface Bin {
  bin?: string;
  name?: string;

  /** @format int64 */
  version?: number;

  /** @format date-time */
  created?: string;

  /** @format date-time */
  updated?: string;

  /** @format uuid */
  id?: string;
}

export interface CreateTestDataResponse {
  bins?: Bin[];
  programs?: Program[];
  businesses?: TestBusiness[];
}

export interface CreateUpdateUserRecord {
  user?: User;
  password?: string;
}

export interface TestBusiness {
  business?: Business;
  users?: User[];
  allocations?: Allocation[];
  cards?: Card[];
  createUserRecords?: CreateUpdateUserRecord[];
}

export interface GetBusinessesResponse {
  businesses?: Business[];
}

export interface MccGroup {
  /** @format uuid */
  mccGroupId?: string;
  i2cMccGroupRef?:
    | "UT_MCG_CONFG"
    | "RS_MCG_CONFG"
    | "AV_MCG_CONFG"
    | "MS_MCG_CONFG"
    | "SP_MCG_CONFG"
    | "PS_MCG_CONFG"
    | "BS_MCG_CONFG"
    | "RR_MCG_CONFG"
    | "AE_MCG_CONFG"
    | "SM_MCG_CONFG"
    | "GS_MCG_CONFG"
    | "CR_MCG_CONFG"
    | "CS_MCG_CONFG"
    | "AL_MCG_CONFG"
    | "AR_MCG_CONFG"
    | "HM_MCG_CONFG"
    | "TT_MCG_CONFG"
    | "TE_MCG_CONFG"
    | "MSL_MCG_CONFG"
    | "WS_MCG_CONFG"
    | "OP_MCG_CONFG"
    | "DG_MCG_CONFG"
    | "RES_MCG_CONFG"
    | "GAS_MCG_CONFG"
    | "EDU_MCG_CONFG";
  name?: string;
}

export interface KycDocuments {
  owner?: string;
  documents?: RequiredDocument[];
}

export interface ManualReviewResponse {
  kybRequiredDocuments?: RequiredDocument[];
  kycRequiredDocuments?: KycDocuments[];
}

export interface RequiredDocument {
  documentName?: string;
  type?: string;
  entityTokenId?: string;
}

export interface BankAccount {
  /** @format uuid */
  businessBankAccountId?: string;
  name?: string;
  routingNumber?: string;
  accountNumber?: string;
}

export interface LinkTokenResponse {
  linkToken?: string;
}
