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
  ACH_DEPOSIT?: LimitPeriodMap;
  ACH_WITHDRAW?: LimitPeriodMap;
  PURCHASE?: LimitPeriodMap;
}

export interface LimitPeriodMap {
  INSTANT?: LimitPeriod;
  DAILY?: LimitPeriod;
  WEEKLY?: LimitPeriod;
  MONTHLY?: LimitPeriod;
}

export interface LimitPeriod {
  amount?: number;
  usedAmount?: number;
}

export interface ControllerError {
  message?: string;
  param?: string;
}

export interface SetCreditCardRequest {
  accountId?: string;
}

export interface Address {
  streetLine1?: string;
  streetLine2?: string;
  locality?: string;
  region?: string;
  postalCode?: string;
  country?:
    | 'UNSPECIFIED'
    | 'ABW'
    | 'AFG'
    | 'AGO'
    | 'AIA'
    | 'ALA'
    | 'ALB'
    | 'AND'
    | 'ANT'
    | 'ARE'
    | 'ARG'
    | 'ARM'
    | 'ASM'
    | 'ATA'
    | 'ATF'
    | 'ATG'
    | 'AUS'
    | 'AUT'
    | 'AZE'
    | 'BDI'
    | 'BEL'
    | 'BEN'
    | 'BFA'
    | 'BGD'
    | 'BGR'
    | 'BHR'
    | 'BHS'
    | 'BIH'
    | 'BLM'
    | 'BLR'
    | 'BLZ'
    | 'BMU'
    | 'BOL'
    | 'BRA'
    | 'BRB'
    | 'BRN'
    | 'BTN'
    | 'BVT'
    | 'BWA'
    | 'CAF'
    | 'CAN'
    | 'CCK'
    | 'CHE'
    | 'CHL'
    | 'CHN'
    | 'CIV'
    | 'CMR'
    | 'COD'
    | 'COG'
    | 'COK'
    | 'COL'
    | 'COM'
    | 'CPV'
    | 'CRI'
    | 'CUB'
    | 'CXR'
    | 'CYM'
    | 'CYP'
    | 'CZE'
    | 'DEU'
    | 'DJI'
    | 'DMA'
    | 'DNK'
    | 'DOM'
    | 'DZA'
    | 'ECU'
    | 'EGY'
    | 'ERI'
    | 'ESH'
    | 'ESP'
    | 'EST'
    | 'ETH'
    | 'FIN'
    | 'FJI'
    | 'FLK'
    | 'FRA'
    | 'FRO'
    | 'FSM'
    | 'GAB'
    | 'GBR'
    | 'GEO'
    | 'GGY'
    | 'GHA'
    | 'GIB'
    | 'GIN'
    | 'GLP'
    | 'GMB'
    | 'GNB'
    | 'GNQ'
    | 'GRC'
    | 'GRD'
    | 'GRL'
    | 'GTM'
    | 'GUF'
    | 'GUM'
    | 'GUY'
    | 'HKG'
    | 'HMD'
    | 'HND'
    | 'HRV'
    | 'HTI'
    | 'HUN'
    | 'IDN'
    | 'IMN'
    | 'IND'
    | 'IOT'
    | 'IRL'
    | 'IRN'
    | 'IRQ'
    | 'ISL'
    | 'ISR'
    | 'ITA'
    | 'JAM'
    | 'JEY'
    | 'JOR'
    | 'JPN'
    | 'KAZ'
    | 'KEN'
    | 'KGZ'
    | 'KHM'
    | 'KIR'
    | 'KNA'
    | 'KOR'
    | 'KWT'
    | 'LAO'
    | 'LBN'
    | 'LBR'
    | 'LBY'
    | 'LCA'
    | 'LIE'
    | 'LKA'
    | 'LSO'
    | 'LTU'
    | 'LUX'
    | 'LVA'
    | 'MAC'
    | 'MAF'
    | 'MAR'
    | 'MCO'
    | 'MDA'
    | 'MDG'
    | 'MDV'
    | 'MEX'
    | 'MHL'
    | 'MKD'
    | 'MLI'
    | 'MLT'
    | 'MMR'
    | 'MNE'
    | 'MNG'
    | 'MNP'
    | 'MOZ'
    | 'MRT'
    | 'MSR'
    | 'MTQ'
    | 'MUS'
    | 'MWI'
    | 'MYS'
    | 'MYT'
    | 'NAM'
    | 'NCL'
    | 'NER'
    | 'NFK'
    | 'NGA'
    | 'NIC'
    | 'NIU'
    | 'NLD'
    | 'NOR'
    | 'NPL'
    | 'NRU'
    | 'NZL'
    | 'OMN'
    | 'PAK'
    | 'PAN'
    | 'PCN'
    | 'PER'
    | 'PHL'
    | 'PLW'
    | 'PNG'
    | 'POL'
    | 'PRI'
    | 'PRK'
    | 'PRT'
    | 'PRY'
    | 'PSE'
    | 'PYF'
    | 'QAT'
    | 'REU'
    | 'ROU'
    | 'RUS'
    | 'RWA'
    | 'SAU'
    | 'SDN'
    | 'SEN'
    | 'SGP'
    | 'SGS'
    | 'SHN'
    | 'SJM'
    | 'SLB'
    | 'SLE'
    | 'SLV'
    | 'SMR'
    | 'SOM'
    | 'SPM'
    | 'SRB'
    | 'SSD'
    | 'STP'
    | 'SUR'
    | 'SVK'
    | 'SVN'
    | 'SWE'
    | 'SWZ'
    | 'SYC'
    | 'SYR'
    | 'TCA'
    | 'TCD'
    | 'TGO'
    | 'THA'
    | 'TJK'
    | 'TKL'
    | 'TKM'
    | 'TLS'
    | 'TON'
    | 'TTO'
    | 'TUN'
    | 'TUR'
    | 'TUV'
    | 'TWN'
    | 'TZA'
    | 'UGA'
    | 'UKR'
    | 'UMI'
    | 'URY'
    | 'USA'
    | 'UZB'
    | 'VAT'
    | 'VCT'
    | 'VEN'
    | 'VGB'
    | 'VIR'
    | 'VNM'
    | 'VUT'
    | 'WLF'
    | 'WSM'
    | 'YEM'
    | 'ZAF'
    | 'ZMB'
    | 'ZWE';
}

export interface Business {
  /** @format uuid */
  businessId?: string;
  legalName?: string;
  businessType?:
    | 'INDIVIDUAL'
    | 'SOLE_PROPRIETORSHIP'
    | 'SINGLE_MEMBER_LLC'
    | 'MULTI_MEMBER_LLC'
    | 'PRIVATE_PARTNERSHIP'
    | 'PUBLIC_PARTNERSHIP'
    | 'PRIVATE_CORPORATION'
    | 'PUBLIC_CORPORATION'
    | 'INCORPORATED_NON_PROFIT'
    | 'ACCOUNTING_FIRM'
    | 'BANK'
    | 'CONSULTING_FIRM';
  employerIdentificationNumber?: string;

  /**
   * Phone number in e.164 format
   * @example +1234567890
   */
  businessPhone?: string;
  address?: Address;
  onboardingStep?:
    | 'BUSINESS'
    | 'BUSINESS_OWNERS'
    | 'SOFT_FAIL'
    | 'REVIEW'
    | 'LINK_ACCOUNT'
    | 'TRANSFER_MONEY'
    | 'COMPLETE';
  knowYourBusinessStatus?: 'PENDING' | 'REVIEW' | 'FAIL' | 'PASS';
  status?: 'ONBOARDING' | 'ACTIVE' | 'SUSPENDED' | 'CLOSED';
  accountingSetupStep?:
    | 'AWAITING_SYNC'
    | 'ADD_CREDIT_CARD'
    | 'MAP_CATEGORIES'
    | 'SETUP_CLASSES'
    | 'SETUP_LOCATIONS'
    | 'COMPLETE';
  autoCreateExpenseCategories?: boolean;
  mcc?: string;
  partnerType?: 'CLIENT' | 'PARTNER' | 'BOTH';
  businessName?: string;
  accountNumber?: string;
  routingNumber?: string;
  description?: string;
  url?: string;
  codatCreditCardId?: string;
  timeZone?: 'US_EASTERN' | 'US_CENTRAL' | 'US_MOUNTAIN' | 'US_PACIFIC' | 'US_ALASKA' | 'US_HAWAII';

  /** @format date-time */
  formationDate?: string;
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
  direction?: 'ASC' | 'DESC';
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
  type?: 'EMPLOYEE' | 'BUSINESS_OWNER';
  firstName?: string;
  lastName?: string;
  archived?: boolean;
}

export interface UserPageData {
  userData?: UserData;
  email?: string;
  archived?: boolean;
  cardInfoList?: CardInfo[];
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
  types?: (
    | 'BANK_DEPOSIT_STRIPE'
    | 'BANK_DEPOSIT_ACH'
    | 'BANK_DEPOSIT_WIRE'
    | 'BANK_DEPOSIT_RETURN'
    | 'BANK_WITHDRAWAL'
    | 'BANK_WITHDRAWAL_RETURN'
    | 'MANUAL'
    | 'NETWORK_AUTHORIZATION'
    | 'NETWORK_CAPTURE'
    | 'NETWORK_REFUND'
    | 'REALLOCATE'
    | 'FEE'
    | 'CARD_FUND_RETURN'
  )[];

  /** @format date-time */
  from?: string;

  /** @format date-time */
  to?: string;
  statuses?: ('PENDING' | 'DECLINED' | 'APPROVED' | 'CANCELED' | 'CREDIT' | 'PROCESSED')[];
  amount?: FilterAmount;
  categories?: string[];
  withReceipt?: boolean;
  withoutReceipt?: boolean;
  syncStatus?: ('SYNCED_LOCKED' | 'READY' | 'NOT_READY')[];
  missingExpenseCategory?: boolean;
}

export interface FilterAmount {
  min?: number;
  max?: number;
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
    | 'BANK_DEPOSIT_STRIPE'
    | 'BANK_DEPOSIT_ACH'
    | 'BANK_DEPOSIT_WIRE'
    | 'BANK_DEPOSIT_RETURN'
    | 'BANK_WITHDRAWAL'
    | 'BANK_WITHDRAWAL_RETURN'
    | 'MANUAL'
    | 'NETWORK_AUTHORIZATION'
    | 'NETWORK_CAPTURE'
    | 'NETWORK_REFUND'
    | 'REALLOCATE'
    | 'FEE'
    | 'CARD_FUND_RETURN';
  status?: 'PENDING' | 'DECLINED' | 'APPROVED' | 'CANCELED' | 'CREDIT' | 'PROCESSED';
  amount?: Amount;
  requestedAmount?: Amount;
  receipt?: ReceiptDetails;
  notes?: string;
  expenseDetails?: ExpenseDetails;
  syncStatus?: 'SYNCED_LOCKED' | 'READY' | 'NOT_READY';

  /** @format date-time */
  lastSyncTime?: string;
  declineDetails?:
    | DeclineDetails
    | AddressPostalCodeMismatch
    | LimitExceeded
    | OperationLimitExceeded
    | SpendControlViolated;
  paymentDetails?: PaymentDetails;
  accountingDetails?: AccountingDetails;
}

export interface AccountingDetails {
  sentToAccounting?: boolean;

  /** @format uuid */
  codatClassId?: string;

  /** @format uuid */
  codatLocationId?: string;
}

export type AddressPostalCodeMismatch = DeclineDetails & { postalCode?: string };

export interface Amount {
  currency?:
    | 'UNSPECIFIED'
    | 'AED'
    | 'AFN'
    | 'ALL'
    | 'AMD'
    | 'ANG'
    | 'AOA'
    | 'ARS'
    | 'AUD'
    | 'AWG'
    | 'AZN'
    | 'BAM'
    | 'BBD'
    | 'BDT'
    | 'BGN'
    | 'BHD'
    | 'BIF'
    | 'BMD'
    | 'BND'
    | 'BOB'
    | 'BRL'
    | 'BSD'
    | 'BTN'
    | 'BWP'
    | 'BYN'
    | 'BYR'
    | 'BZD'
    | 'CAD'
    | 'CDF'
    | 'CHF'
    | 'CLP'
    | 'CNY'
    | 'COP'
    | 'CRC'
    | 'CUC'
    | 'CUP'
    | 'CVE'
    | 'CZK'
    | 'DJF'
    | 'DKK'
    | 'DOP'
    | 'DZD'
    | 'EGP'
    | 'ERN'
    | 'ETB'
    | 'EUR'
    | 'FJD'
    | 'FKP'
    | 'GBP'
    | 'GEL'
    | 'GHS'
    | 'GIP'
    | 'GMD'
    | 'GNF'
    | 'GTQ'
    | 'GYD'
    | 'HKD'
    | 'HNL'
    | 'HRK'
    | 'HTG'
    | 'HUF'
    | 'IDR'
    | 'ILS'
    | 'INR'
    | 'IQD'
    | 'IRR'
    | 'ISK'
    | 'JMD'
    | 'JOD'
    | 'JPY'
    | 'KES'
    | 'KGS'
    | 'KHR'
    | 'KMF'
    | 'KPW'
    | 'KRW'
    | 'KWD'
    | 'KYD'
    | 'KZT'
    | 'LAK'
    | 'LBP'
    | 'LKR'
    | 'LRD'
    | 'LSL'
    | 'LTL'
    | 'LYD'
    | 'MAD'
    | 'MDL'
    | 'MGA'
    | 'MKD'
    | 'MMK'
    | 'MNT'
    | 'MOP'
    | 'MRO'
    | 'MRU'
    | 'MUR'
    | 'MVR'
    | 'MWK'
    | 'MXN'
    | 'MYR'
    | 'MZN'
    | 'NAD'
    | 'NGN'
    | 'NIO'
    | 'NOK'
    | 'NPR'
    | 'NZD'
    | 'OMR'
    | 'PAB'
    | 'PEN'
    | 'PGK'
    | 'PHP'
    | 'PKR'
    | 'PLN'
    | 'PYG'
    | 'QAR'
    | 'RON'
    | 'RSD'
    | 'RUB'
    | 'RUR'
    | 'RWF'
    | 'SAR'
    | 'SBD'
    | 'SCR'
    | 'SDG'
    | 'SEK'
    | 'SGD'
    | 'SHP'
    | 'SLL'
    | 'SOS'
    | 'SRD'
    | 'SSP'
    | 'STD'
    | 'STN'
    | 'SVC'
    | 'SYP'
    | 'SZL'
    | 'THB'
    | 'TJS'
    | 'TMT'
    | 'TND'
    | 'TOP'
    | 'TRY'
    | 'TTD'
    | 'TWD'
    | 'TZS'
    | 'UAH'
    | 'UGX'
    | 'USD'
    | 'UYU'
    | 'UZS'
    | 'VEF'
    | 'VES'
    | 'VND'
    | 'VUV'
    | 'WST'
    | 'XAF'
    | 'XCD'
    | 'XOF'
    | 'XPF'
    | 'YER'
    | 'ZAR'
    | 'ZMW'
    | 'ZWL';
  amount?: number;
}

export interface DeclineDetails {
  reason?:
    | 'INSUFFICIENT_FUNDS'
    | 'INVALID_CARD_STATUS'
    | 'UNLINKED_CARD'
    | 'CARD_NOT_FOUND'
    | 'LIMIT_EXCEEDED'
    | 'OPERATION_LIMIT_EXCEEDED'
    | 'SPEND_CONTROL_VIOLATED'
    | 'ADDRESS_POSTAL_CODE_MISMATCH'
    | 'CVC_MISMATCH'
    | 'EXPIRY_MISMATCH'
    | 'BUSINESS_SUSPENSION'
    | 'ST_ACCOUNT_CLOSED'
    | 'ST_ACCOUNT_FROZEN'
    | 'ST_BANK_ACCOUNT_RESTRICTED'
    | 'ST_BANK_OWNERSHIP_CHANGED'
    | 'ST_COULD_NOT_PROCESS'
    | 'ST_INVALID_ACCOUNT_NUMBER'
    | 'ST_INCORRECT_ACCOUNT_HOLDER_NAME'
    | 'ST_INVALID_CURRENCY'
    | 'ST_NO_ACCOUNT'
    | 'ST_DECLINED'
    | 'ST_FAILED'
    | 'ST_CANCELLED'
    | 'ST_UNKNOWN';
}

export interface ExpenseDetails {
  /** @format int32 */
  iconRef?: number;

  /** @format uuid */
  expenseCategoryId?: string;
  categoryName?: string;
}

export type LimitExceeded = DeclineDetails & {
  entityId?: string;
  entityType?: 'UNKNOWN' | 'ALLOCATION' | 'CARD' | 'BUSINESS';
  limitType?: 'ACH_DEPOSIT' | 'ACH_WITHDRAW' | 'PURCHASE';
  limitPeriod?: 'INSTANT' | 'DAILY' | 'WEEKLY' | 'MONTHLY';
  exceededAmount?: number;
};

export interface Merchant {
  name?: string;
  type?:
    | 'UNKNOWN'
    | 'AC_REFRIGERATION_REPAIR'
    | 'ACCOUNTING_BOOKKEEPING_SERVICES'
    | 'ADVERTISING_SERVICES'
    | 'AGRICULTURAL_COOPERATIVE'
    | 'AIRLINES_AIR_CARRIERS'
    | 'AIRPORTS_FLYING_FIELDS'
    | 'AMBULANCE_SERVICES'
    | 'AMUSEMENT_PARKS_CARNIVALS'
    | 'ANTIQUE_REPRODUCTIONS'
    | 'ANTIQUE_SHOPS'
    | 'AQUARIUMS'
    | 'ARCHITECTURAL_SURVEYING_SERVICES'
    | 'ART_DEALERS_AND_GALLERIES'
    | 'ARTISTS_SUPPLY_AND_CRAFT_SHOPS'
    | 'AUTO_BODY_REPAIR_SHOPS'
    | 'AUTO_PAINT_SHOPS'
    | 'AUTO_SERVICE_SHOPS'
    | 'AUTO_AND_HOME_SUPPLY_STORES'
    | 'AUTOMATED_CASH_DISBURSE'
    | 'AUTOMATED_FUEL_DISPENSERS'
    | 'AUTOMOBILE_ASSOCIATIONS'
    | 'AUTOMOTIVE_PARTS_AND_ACCESSORIES_STORES'
    | 'AUTOMOTIVE_TIRE_STORES'
    | 'BAIL_AND_BOND_PAYMENTS'
    | 'BAKERIES'
    | 'BANDS_ORCHESTRAS'
    | 'BARBER_AND_BEAUTY_SHOPS'
    | 'BETTING_CASINO_GAMBLING'
    | 'BICYCLE_SHOPS'
    | 'BILLIARD_POOL_ESTABLISHMENTS'
    | 'BOAT_DEALERS'
    | 'BOAT_RENTALS_AND_LEASES'
    | 'BOOK_STORES'
    | 'BOOKS_PERIODICALS_AND_NEWSPAPERS'
    | 'BOWLING_ALLEYS'
    | 'BUS_LINES'
    | 'BUSINESS_SECRETARIAL_SCHOOLS'
    | 'BUYING_SHOPPING_SERVICES'
    | 'CABLE_SATELLITE_AND_OTHER_PAY_TELEVISION_AND_RADIO'
    | 'CAMERA_AND_PHOTOGRAPHIC_SUPPLY_STORES'
    | 'CANDY_NUT_AND_CONFECTIONERY_STORES'
    | 'CAR_RENTAL_AGENCIES'
    | 'CAR_WASHES'
    | 'CAR_AND_TRUCK_DEALERS_NEW_USED'
    | 'CAR_AND_TRUCK_DEALERS_USED_ONLY'
    | 'CARPENTRY_SERVICES'
    | 'CARPET_UPHOLSTERY_CLEANING'
    | 'CATERERS'
    | 'CHARITABLE_AND_SOCIAL_SERVICE_ORGANIZATIONS_FUNDRAISING'
    | 'CHEMICALS_AND_ALLIED_PRODUCTS'
    | 'CHILD_CARE_SERVICES'
    | 'CHILDRENS_AND_INFANTS_WEAR_STORES'
    | 'CHIROPODISTS_PODIATRISTS'
    | 'CHIROPRACTORS'
    | 'CIGAR_STORES_AND_STANDS'
    | 'CIVIC_SOCIAL_FRATERNAL_ASSOCIATIONS'
    | 'CLEANING_AND_MAINTENANCE'
    | 'CLOTHING_RENTAL'
    | 'COLLEGES_UNIVERSITIES'
    | 'COMMERCIAL_EQUIPMENT'
    | 'COMMERCIAL_FOOTWEAR'
    | 'COMMERCIAL_PHOTOGRAPHY_ART_AND_GRAPHICS'
    | 'COMMUTER_TRANSPORT_AND_FERRIES'
    | 'COMPUTER_NETWORK_SERVICES'
    | 'COMPUTER_PROGRAMMING'
    | 'COMPUTER_REPAIR'
    | 'COMPUTER_SOFTWARE_STORES'
    | 'COMPUTERS_PERIPHERALS_AND_SOFTWARE'
    | 'CONCRETE_WORK_SERVICES'
    | 'CONSTRUCTION_MATERIALS'
    | 'CONSULTING_PUBLIC_RELATIONS'
    | 'CORRESPONDENCE_SCHOOLS'
    | 'COSMETIC_STORES'
    | 'COUNSELING_SERVICES'
    | 'COUNTRY_CLUBS'
    | 'COURIER_SERVICES'
    | 'COURT_COSTS'
    | 'CREDIT_REPORTING_AGENCIES'
    | 'CRUISE_LINES'
    | 'DAIRY_PRODUCTS_STORES'
    | 'DANCE_HALL_STUDIOS_SCHOOLS'
    | 'DATING_ESCORT_SERVICES'
    | 'DENTISTS_ORTHODONTISTS'
    | 'DEPARTMENT_STORES'
    | 'DETECTIVE_AGENCIES'
    | 'DIGITAL_GOODS_MEDIA'
    | 'DIGITAL_GOODS_APPLICATIONS'
    | 'DIGITAL_GOODS_GAMES'
    | 'DIGITAL_GOODS_LARGE_VOLUME'
    | 'DIRECT_MARKETING_CATALOG_MERCHANT'
    | 'DIRECT_MARKETING_COMBINATION_CATALOG_AND_RETAIL_MERCHANT'
    | 'DIRECT_MARKETING_INBOUND_TELEMARKETING'
    | 'DIRECT_MARKETING_INSURANCE_SERVICES'
    | 'DIRECT_MARKETING_OTHER'
    | 'DIRECT_MARKETING_OUTBOUND_TELEMARKETING'
    | 'DIRECT_MARKETING_SUBSCRIPTION'
    | 'DIRECT_MARKETING_TRAVEL'
    | 'DISCOUNT_STORES'
    | 'DOCTORS'
    | 'DOOR_TO_DOOR_SALES'
    | 'DRAPERY_WINDOW_COVERING_AND_UPHOLSTERY_STORES'
    | 'DRINKING_PLACES'
    | 'DRUG_STORES_AND_PHARMACIES'
    | 'DRUGS_DRUG_PROPRIETARIES_AND_DRUGGIST_SUNDRIES'
    | 'DRY_CLEANERS'
    | 'DURABLE_GOODS'
    | 'DUTY_FREE_STORES'
    | 'EATING_PLACES_RESTAURANTS'
    | 'EDUCATIONAL_SERVICES'
    | 'ELECTRIC_RAZOR_STORES'
    | 'ELECTRICAL_PARTS_AND_EQUIPMENT'
    | 'ELECTRICAL_SERVICES'
    | 'ELECTRONICS_REPAIR_SHOPS'
    | 'ELECTRONICS_STORES'
    | 'ELEMENTARY_SECONDARY_SCHOOLS'
    | 'EMPLOYMENT_TEMP_AGENCIES'
    | 'EQUIPMENT_RENTAL'
    | 'EXTERMINATING_SERVICES'
    | 'FAMILY_CLOTHING_STORES'
    | 'FAST_FOOD_RESTAURANTS'
    | 'FINANCIAL_INSTITUTIONS'
    | 'FINES_GOVERNMENT_ADMINISTRATIVE_ENTITIES'
    | 'FIREPLACE_FIREPLACE_SCREENS_AND_ACCESSORIES_STORES'
    | 'FLOOR_COVERING_STORES'
    | 'FLORISTS'
    | 'FLORISTS_SUPPLIES_NURSERY_STOCK_AND_FLOWERS'
    | 'FREEZER_AND_LOCKER_MEAT_PROVISIONERS'
    | 'FUEL_DEALERS_NON_AUTOMOTIVE'
    | 'FUNERAL_SERVICES_CREMATORIES'
    | 'FURNITURE_REPAIR_REFINISHING'
    | 'FURNITURE_HOME_FURNISHINGS_AND_EQUIPMENT_STORES_EXCEPT_APPLIANCES'
    | 'FURRIERS_AND_FUR_SHOPS'
    | 'GENERAL_SERVICES'
    | 'GIFT_CARD_NOVELTY_AND_SOUVENIR_SHOPS'
    | 'GLASS_PAINT_AND_WALLPAPER_STORES'
    | 'GLASSWARE_CRYSTAL_STORES'
    | 'GOLF_COURSES_PUBLIC'
    | 'GOVERNMENT_SERVICES'
    | 'GROCERY_STORES_SUPERMARKETS'
    | 'HARDWARE_STORES'
    | 'HARDWARE_EQUIPMENT_AND_SUPPLIES'
    | 'HEALTH_AND_BEAUTY_SPAS'
    | 'HEARING_AIDS_SALES_AND_SUPPLIES'
    | 'HEATING_PLUMBING_A_C'
    | 'HOBBY_TOY_AND_GAME_SHOPS'
    | 'HOME_SUPPLY_WAREHOUSE_STORES'
    | 'HOSPITALS'
    | 'HOTELS_MOTELS_AND_RESORTS'
    | 'HOUSEHOLD_APPLIANCE_STORES'
    | 'INDUSTRIAL_SUPPLIES'
    | 'INFORMATION_RETRIEVAL_SERVICES'
    | 'INSURANCE_DEFAULT'
    | 'INSURANCE_UNDERWRITING_PREMIUMS'
    | 'INTRA_COMPANY_PURCHASES'
    | 'JEWELRY_STORES_WATCHES_CLOCKS_AND_SILVERWARE_STORES'
    | 'LANDSCAPING_SERVICES'
    | 'LAUNDRIES'
    | 'LAUNDRY_CLEANING_SERVICES'
    | 'LEGAL_SERVICES_ATTORNEYS'
    | 'LUGGAGE_AND_LEATHER_GOODS_STORES'
    | 'LUMBER_BUILDING_MATERIALS_STORES'
    | 'MANUAL_CASH_DISBURSE'
    | 'MARINAS_SERVICE_AND_SUPPLIES'
    | 'MASONRY_STONEWORK_AND_PLASTER'
    | 'MASSAGE_PARLORS'
    | 'MEDICAL_SERVICES'
    | 'MEDICAL_AND_DENTAL_LABS'
    | 'MEDICAL_DENTAL_OPHTHALMIC_AND_HOSPITAL_EQUIPMENT_AND_SUPPLIES'
    | 'MEMBERSHIP_ORGANIZATIONS'
    | 'MENS_AND_BOYS_CLOTHING_AND_ACCESSORIES_STORES'
    | 'MENS_WOMENS_CLOTHING_STORES'
    | 'METAL_SERVICE_CENTERS'
    | 'MISCELLANEOUS_APPAREL_AND_ACCESSORY_SHOPS'
    | 'MISCELLANEOUS_AUTO_DEALERS'
    | 'MISCELLANEOUS_BUSINESS_SERVICES'
    | 'MISCELLANEOUS_FOOD_STORES'
    | 'MISCELLANEOUS_GENERAL_MERCHANDISE'
    | 'MISCELLANEOUS_GENERAL_SERVICES'
    | 'MISCELLANEOUS_HOME_FURNISHING_SPECIALTY_STORES'
    | 'MISCELLANEOUS_PUBLISHING_AND_PRINTING'
    | 'MISCELLANEOUS_RECREATION_SERVICES'
    | 'MISCELLANEOUS_REPAIR_SHOPS'
    | 'MISCELLANEOUS_SPECIALTY_RETAIL'
    | 'MOBILE_HOME_DEALERS'
    | 'MOTION_PICTURE_THEATERS'
    | 'MOTOR_FREIGHT_CARRIERS_AND_TRUCKING'
    | 'MOTOR_HOMES_DEALERS'
    | 'MOTOR_VEHICLE_SUPPLIES_AND_NEW_PARTS'
    | 'MOTORCYCLE_SHOPS_AND_DEALERS'
    | 'MOTORCYCLE_SHOPS_DEALERS'
    | 'MUSIC_STORES_MUSICAL_INSTRUMENTS_PIANOS_AND_SHEET_MUSIC'
    | 'NEWS_DEALERS_AND_NEWSSTANDS'
    | 'NON_FI_MONEY_ORDERS'
    | 'NON_FI_STORED_VALUE_CARD_PURCHASE_LOAD'
    | 'NONDURABLE_GOODS'
    | 'NURSERIES_LAWN_AND_GARDEN_SUPPLY_STORES'
    | 'NURSING_PERSONAL_CARE'
    | 'OFFICE_AND_COMMERCIAL_FURNITURE'
    | 'OPTICIANS_EYEGLASSES'
    | 'OPTOMETRISTS_OPHTHALMOLOGIST'
    | 'ORTHOPEDIC_GOODS_PROSTHETIC_DEVICES'
    | 'OSTEOPATHS'
    | 'PACKAGE_STORES_BEER_WINE_AND_LIQUOR'
    | 'PAINTS_VARNISHES_AND_SUPPLIES'
    | 'PARKING_LOTS_GARAGES'
    | 'PASSENGER_RAILWAYS'
    | 'PAWN_SHOPS'
    | 'PET_SHOPS_PET_FOOD_AND_SUPPLIES'
    | 'PETROLEUM_AND_PETROLEUM_PRODUCTS'
    | 'PHOTO_DEVELOPING'
    | 'PHOTOGRAPHIC_STUDIOS'
    | 'PHOTOGRAPHIC_PHOTOCOPY_MICROFILM_EQUIPMENT_AND_SUPPLIES'
    | 'PICTURE_VIDEO_PRODUCTION'
    | 'PIECE_GOODS_NOTIONS_AND_OTHER_DRY_GOODS'
    | 'PLUMBING_HEATING_EQUIPMENT_AND_SUPPLIES'
    | 'POLITICAL_ORGANIZATIONS'
    | 'POSTAL_SERVICES_GOVERNMENT_ONLY'
    | 'PRECIOUS_STONES_AND_METALS_WATCHES_AND_JEWELRY'
    | 'PROFESSIONAL_SERVICES'
    | 'PUBLIC_WAREHOUSING_AND_STORAGE'
    | 'QUICK_COPY_REPRO_AND_BLUEPRINT'
    | 'RAILROADS'
    | 'REAL_ESTATE_AGENTS_AND_MANAGERS_RENTALS'
    | 'RECORD_STORES'
    | 'RECREATIONAL_VEHICLE_RENTALS'
    | 'RELIGIOUS_GOODS_STORES'
    | 'RELIGIOUS_ORGANIZATIONS'
    | 'ROOFING_SIDING_SHEET_METAL'
    | 'SECRETARIAL_SUPPORT_SERVICES'
    | 'SECURITY_BROKERS_DEALERS'
    | 'SERVICE_STATIONS'
    | 'SEWING_NEEDLEWORK_FABRIC_AND_PIECE_GOODS_STORES'
    | 'SHOE_REPAIR_HAT_CLEANING'
    | 'SHOE_STORES'
    | 'SMALL_APPLIANCE_REPAIR'
    | 'SNOWMOBILE_DEALERS'
    | 'SPECIAL_TRADE_SERVICES'
    | 'SPECIALTY_CLEANING'
    | 'SPORTING_GOODS_STORES'
    | 'SPORTING_RECREATION_CAMPS'
    | 'SPORTS_CLUBS_FIELDS'
    | 'SPORTS_AND_RIDING_APPAREL_STORES'
    | 'STAMP_AND_COIN_STORES'
    | 'STATIONARY_OFFICE_SUPPLIES_PRINTING_AND_WRITING_PAPER'
    | 'STATIONERY_STORES_OFFICE_AND_SCHOOL_SUPPLY_STORES'
    | 'SWIMMING_POOLS_SALES'
    | 'T_UI_TRAVEL_GERMANY'
    | 'TAILORS_ALTERATIONS'
    | 'TAX_PAYMENTS_GOVERNMENT_AGENCIES'
    | 'TAX_PREPARATION_SERVICES'
    | 'TAXICABS_LIMOUSINES'
    | 'TELECOMMUNICATION_EQUIPMENT_AND_TELEPHONE_SALES'
    | 'TELECOMMUNICATION_SERVICES'
    | 'TELEGRAPH_SERVICES'
    | 'TENT_AND_AWNING_SHOPS'
    | 'TESTING_LABORATORIES'
    | 'THEATRICAL_TICKET_AGENCIES'
    | 'TIMESHARES'
    | 'TIRE_RETREADING_AND_REPAIR'
    | 'TOLLS_BRIDGE_FEES'
    | 'TOURIST_ATTRACTIONS_AND_EXHIBITS'
    | 'TOWING_SERVICES'
    | 'TRAILER_PARKS_CAMPGROUNDS'
    | 'TRANSPORTATION_SERVICES'
    | 'TRAVEL_AGENCIES_TOUR_OPERATORS'
    | 'TRUCK_STOP_ITERATION'
    | 'TRUCK_UTILITY_TRAILER_RENTALS'
    | 'TYPESETTING_PLATE_MAKING_AND_RELATED_SERVICES'
    | 'TYPEWRITER_STORES'
    | 'U_S_FEDERAL_GOVERNMENT_AGENCIES_OR_DEPARTMENTS'
    | 'UNIFORMS_COMMERCIAL_CLOTHING'
    | 'USED_MERCHANDISE_AND_SECONDHAND_STORES'
    | 'UTILITIES'
    | 'VARIETY_STORES'
    | 'VETERINARY_SERVICES'
    | 'VIDEO_AMUSEMENT_GAME_SUPPLIES'
    | 'VIDEO_GAME_ARCADES'
    | 'VIDEO_TAPE_RENTAL_STORES'
    | 'VOCATIONAL_TRADE_SCHOOLS'
    | 'WATCH_JEWELRY_REPAIR'
    | 'WELDING_REPAIR'
    | 'WHOLESALE_CLUBS'
    | 'WIG_AND_TOUPEE_STORES'
    | 'WIRES_MONEY_ORDERS'
    | 'WOMENS_ACCESSORY_AND_SPECIALTY_SHOPS'
    | 'WOMENS_READY_TO_WEAR_STORES'
    | 'WRECKING_AND_SALVAGE_YARDS';
  amount?: Amount;
  merchantNumber?: string;

  /** @format int32 */
  merchantCategoryCode?: number;
  merchantCategoryGroup?:
    | 'CHILD_CARE'
    | 'DIGITAL_GOODS'
    | 'EDUCATION'
    | 'ENTERTAINMENT'
    | 'FOOD_BEVERAGE'
    | 'GAMBLING'
    | 'GOVERNMENT'
    | 'HEALTH'
    | 'MEMBERSHIPS'
    | 'MONEY_TRANSFER'
    | 'SERVICES'
    | 'SHOPPING'
    | 'TRAVEL'
    | 'UTILITIES'
    | 'OTHER';
  merchantLogoUrl?: string;
  merchantLatitude?: number;
  merchantLongitude?: number;
  merchantCountry?:
    | 'UNSPECIFIED'
    | 'ABW'
    | 'AFG'
    | 'AGO'
    | 'AIA'
    | 'ALA'
    | 'ALB'
    | 'AND'
    | 'ANT'
    | 'ARE'
    | 'ARG'
    | 'ARM'
    | 'ASM'
    | 'ATA'
    | 'ATF'
    | 'ATG'
    | 'AUS'
    | 'AUT'
    | 'AZE'
    | 'BDI'
    | 'BEL'
    | 'BEN'
    | 'BFA'
    | 'BGD'
    | 'BGR'
    | 'BHR'
    | 'BHS'
    | 'BIH'
    | 'BLM'
    | 'BLR'
    | 'BLZ'
    | 'BMU'
    | 'BOL'
    | 'BRA'
    | 'BRB'
    | 'BRN'
    | 'BTN'
    | 'BVT'
    | 'BWA'
    | 'CAF'
    | 'CAN'
    | 'CCK'
    | 'CHE'
    | 'CHL'
    | 'CHN'
    | 'CIV'
    | 'CMR'
    | 'COD'
    | 'COG'
    | 'COK'
    | 'COL'
    | 'COM'
    | 'CPV'
    | 'CRI'
    | 'CUB'
    | 'CXR'
    | 'CYM'
    | 'CYP'
    | 'CZE'
    | 'DEU'
    | 'DJI'
    | 'DMA'
    | 'DNK'
    | 'DOM'
    | 'DZA'
    | 'ECU'
    | 'EGY'
    | 'ERI'
    | 'ESH'
    | 'ESP'
    | 'EST'
    | 'ETH'
    | 'FIN'
    | 'FJI'
    | 'FLK'
    | 'FRA'
    | 'FRO'
    | 'FSM'
    | 'GAB'
    | 'GBR'
    | 'GEO'
    | 'GGY'
    | 'GHA'
    | 'GIB'
    | 'GIN'
    | 'GLP'
    | 'GMB'
    | 'GNB'
    | 'GNQ'
    | 'GRC'
    | 'GRD'
    | 'GRL'
    | 'GTM'
    | 'GUF'
    | 'GUM'
    | 'GUY'
    | 'HKG'
    | 'HMD'
    | 'HND'
    | 'HRV'
    | 'HTI'
    | 'HUN'
    | 'IDN'
    | 'IMN'
    | 'IND'
    | 'IOT'
    | 'IRL'
    | 'IRN'
    | 'IRQ'
    | 'ISL'
    | 'ISR'
    | 'ITA'
    | 'JAM'
    | 'JEY'
    | 'JOR'
    | 'JPN'
    | 'KAZ'
    | 'KEN'
    | 'KGZ'
    | 'KHM'
    | 'KIR'
    | 'KNA'
    | 'KOR'
    | 'KWT'
    | 'LAO'
    | 'LBN'
    | 'LBR'
    | 'LBY'
    | 'LCA'
    | 'LIE'
    | 'LKA'
    | 'LSO'
    | 'LTU'
    | 'LUX'
    | 'LVA'
    | 'MAC'
    | 'MAF'
    | 'MAR'
    | 'MCO'
    | 'MDA'
    | 'MDG'
    | 'MDV'
    | 'MEX'
    | 'MHL'
    | 'MKD'
    | 'MLI'
    | 'MLT'
    | 'MMR'
    | 'MNE'
    | 'MNG'
    | 'MNP'
    | 'MOZ'
    | 'MRT'
    | 'MSR'
    | 'MTQ'
    | 'MUS'
    | 'MWI'
    | 'MYS'
    | 'MYT'
    | 'NAM'
    | 'NCL'
    | 'NER'
    | 'NFK'
    | 'NGA'
    | 'NIC'
    | 'NIU'
    | 'NLD'
    | 'NOR'
    | 'NPL'
    | 'NRU'
    | 'NZL'
    | 'OMN'
    | 'PAK'
    | 'PAN'
    | 'PCN'
    | 'PER'
    | 'PHL'
    | 'PLW'
    | 'PNG'
    | 'POL'
    | 'PRI'
    | 'PRK'
    | 'PRT'
    | 'PRY'
    | 'PSE'
    | 'PYF'
    | 'QAT'
    | 'REU'
    | 'ROU'
    | 'RUS'
    | 'RWA'
    | 'SAU'
    | 'SDN'
    | 'SEN'
    | 'SGP'
    | 'SGS'
    | 'SHN'
    | 'SJM'
    | 'SLB'
    | 'SLE'
    | 'SLV'
    | 'SMR'
    | 'SOM'
    | 'SPM'
    | 'SRB'
    | 'SSD'
    | 'STP'
    | 'SUR'
    | 'SVK'
    | 'SVN'
    | 'SWE'
    | 'SWZ'
    | 'SYC'
    | 'SYR'
    | 'TCA'
    | 'TCD'
    | 'TGO'
    | 'THA'
    | 'TJK'
    | 'TKL'
    | 'TKM'
    | 'TLS'
    | 'TON'
    | 'TTO'
    | 'TUN'
    | 'TUR'
    | 'TUV'
    | 'TWN'
    | 'TZA'
    | 'UGA'
    | 'UKR'
    | 'UMI'
    | 'URY'
    | 'USA'
    | 'UZB'
    | 'VAT'
    | 'VCT'
    | 'VEN'
    | 'VGB'
    | 'VIR'
    | 'VNM'
    | 'VUT'
    | 'WLF'
    | 'WSM'
    | 'YEM'
    | 'ZAF'
    | 'ZMB'
    | 'ZWE';
  codatSupplierName?: string;
  codatSupplierId?: string;
  statementDescriptor?: string;
}

export type OperationLimitExceeded = DeclineDetails & {
  entityId?: string;
  entityType?: 'UNKNOWN' | 'ALLOCATION' | 'CARD' | 'BUSINESS';
  limitType?: 'ACH_DEPOSIT' | 'ACH_WITHDRAW' | 'PURCHASE';
  limitPeriod?: 'INSTANT' | 'DAILY' | 'WEEKLY' | 'MONTHLY';
};

export interface PagedDataAccountActivityResponse {
  /** @format int32 */
  pageNumber?: number;

  /** @format int32 */
  pageSize?: number;

  /** @format int64 */
  totalElements?: number;
  content?: AccountActivityResponse[];
}

export interface PaymentDetails {
  paymentType?: 'POS' | 'ONLINE' | 'MANUAL_ENTRY';
  foreignTransactionFee?: Amount;
  foreignTransaction?: boolean;
}

export interface ReceiptDetails {
  receiptId?: string[];
}

export type SpendControlViolated = DeclineDetails & {
  entityId?: string;
  entityType?: 'UNKNOWN' | 'ALLOCATION' | 'CARD' | 'BUSINESS';
  mccGroup?:
    | 'CHILD_CARE'
    | 'DIGITAL_GOODS'
    | 'EDUCATION'
    | 'ENTERTAINMENT'
    | 'FOOD_BEVERAGE'
    | 'GAMBLING'
    | 'GOVERNMENT'
    | 'HEALTH'
    | 'MEMBERSHIPS'
    | 'MONEY_TRANSFER'
    | 'SERVICES'
    | 'SHOPPING'
    | 'TRAVEL'
    | 'UTILITIES'
    | 'OTHER';
  paymentType?: 'POS' | 'ONLINE' | 'MANUAL_ENTRY';
  foreignDisabled?: boolean;
};

export interface CardStatementRequest {
  /** @format uuid */
  cardId?: string;

  /** @format date-time */
  startDate?: string;

  /** @format date-time */
  endDate?: string;
}

export interface BusinessStatementRequest {
  /** @format date-time */
  startDate?: string;

  /** @format date-time */
  endDate?: string;
}

export interface NetworkMessageRequest {
  /** @format uuid */
  cardId?: string;
  networkMessageType?: 'AUTH_REQUEST' | 'AUTH_CREATED' | 'AUTH_UPDATED' | 'TRANSACTION_CREATED';
  amount?: Amount;

  /** @format uuid */
  priorNetworkMessageId?: string;
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

export interface TransactBankAccountRequest {
  bankAccountTransactType?: 'DEPOSIT' | 'WITHDRAW';
  amount?: Amount;
}

export interface CreateAdjustmentResponse {
  /** @format uuid */
  adjustmentId?: string;
}

export interface CreateReceiptResponse {
  /** @format uuid */
  receiptId?: string;
}

export interface ExpenseCategory {
  /** @format int32 */
  iconRef?: number;
  categoryName?: string;
  expenseCategoryId?: string;
  status?: string;
  pathSegments?: string[];
}

export interface CodatError {
  itemId?: string;
  message?: string;
}

export interface CodatSyncDirectCostResponse {
  status?: string;
  pushOperationKey?: string;
  validation?: CodatValidation;
}

export interface CodatValidation {
  errors?: CodatError[];
}

export interface SyncTransactionResponse {
  status?: string;
  codatResponse?: CodatSyncDirectCostResponse;
}

export interface CreateAssignSupplierRequest {
  /** @format uuid */
  accountActivityId?: string;
  supplierName?: string;
}

export interface CreateAssignSupplierResponse {
  /** @format uuid */
  accountActivityId?: string;
}

export interface SetCategoryNamesRequest {
  /** @format uuid */
  categoryId?: string;
  name?: string;
}

export interface CreateCreditCardRequest {
  accountName?: string;
}

export interface CodatCreateBankAccountResponse {
  validation?: CodatValidation;
  pushOperationKey?: string;
  status?: string;
}

export interface CodatWebhookPushStatusChangedRequest {
  CompanyId?: string;
  Data?: CodatWebhookPushStatusData;
}

export interface CodatWebhookPushStatusData {
  dataType?: string;
  status?: string;
  pushOperationKey?: string;
}

export interface CodatWebhookDataSyncCompleteRequest {
  CompanyId?: string;
  Data?: CodatWebhookSyncData;
}

export interface CodatWebhookSyncData {
  dataType?: string;
}

export interface CodatWebhookConnectionChangedData {
  dataConnectionId?: string;
  newStatus?: string;
}

export interface CodatWebhookConnectionChangedRequest {
  CompanyId?: string;
  Data?: CodatWebhookConnectionChangedData;
}

export interface ChartOfAccounts {
  /** @format uuid */
  businessId?: string;
  nestedAccounts?: CodatAccountNested[];

  /** @format int64 */
  version?: number;

  /** @format date-time */
  created?: string;

  /** @format date-time */
  updated?: string;

  /** @format uuid */
  id?: string;
}

export interface CodatAccountNested {
  id?: string;
  name?: string;
  status?: string;
  fullyQualifiedCategory?: string;
  fullyQualifiedName?: string;
  type?: string;
  updateStatus?: 'NOT_CHANGED' | 'NEW' | 'DELETED' | 'RENAMED';
  children?: CodatAccountNested[];
}

export interface AddChartOfAccountsMappingRequest {
  accountRef?: string;

  /** @format uuid */
  expenseCategoryId?: string;
  expenseCategoryName?: string;
  fullyQualifiedCategory?: string;
}

export interface ChartOfAccountsMappingResponse {
  accountRef?: string;

  /** @format int32 */
  categoryIconRef?: number;

  /** @format uuid */
  expenseCategoryId?: string;
}

export interface GetChartOfAccountsMappingResponse {
  results?: ChartOfAccountsMappingResponse[];
}

/**
 * The allocations to assign to this card and any customizations of their spend controls. Leaving spend control fields as null will default to the allocation's spend controls.
 */
export interface CardAllocationSpendControls {
  /**
   * The ID of the allocation connected with this card.
   * @format uuid
   */
  allocationId: string;

  /** The name of the allocation connected with this card. */
  allocationName?: string;

  /** Currency limits for this card/allocation pair. If a create/update operation and this is null, the existing value for the allocation/card will be used. */
  limits?: CurrencyLimit[];

  /** Disabled MCC Groups for this card/allocation pair. If a create/update operation and this is null, the existing value for the allocation/card will be used. */
  disabledMccGroups?: (
    | 'CHILD_CARE'
    | 'DIGITAL_GOODS'
    | 'EDUCATION'
    | 'ENTERTAINMENT'
    | 'FOOD_BEVERAGE'
    | 'GAMBLING'
    | 'GOVERNMENT'
    | 'HEALTH'
    | 'MEMBERSHIPS'
    | 'MONEY_TRANSFER'
    | 'SERVICES'
    | 'SHOPPING'
    | 'TRAVEL'
    | 'UTILITIES'
    | 'OTHER'
  )[];

  /** Disabled Payment Types for this card/allocation pair. If a create/update operation and this is null, the existing value for the allocation/card will be used. */
  disabledPaymentTypes?: ('POS' | 'ONLINE' | 'MANUAL_ENTRY')[];

  /** Disable foreign transactions for this card/allocation pair. If a create/update operation and this is null, the existing value for the allocation/card will be used. */
  disableForeign?: boolean;
}

/**
 * Currency limits for this card/allocation pair. If a create/update operation and this is null, the existing value for the allocation/card will be used.
 */
export interface CurrencyLimit {
  currency:
    | 'UNSPECIFIED'
    | 'AED'
    | 'AFN'
    | 'ALL'
    | 'AMD'
    | 'ANG'
    | 'AOA'
    | 'ARS'
    | 'AUD'
    | 'AWG'
    | 'AZN'
    | 'BAM'
    | 'BBD'
    | 'BDT'
    | 'BGN'
    | 'BHD'
    | 'BIF'
    | 'BMD'
    | 'BND'
    | 'BOB'
    | 'BRL'
    | 'BSD'
    | 'BTN'
    | 'BWP'
    | 'BYN'
    | 'BYR'
    | 'BZD'
    | 'CAD'
    | 'CDF'
    | 'CHF'
    | 'CLP'
    | 'CNY'
    | 'COP'
    | 'CRC'
    | 'CUC'
    | 'CUP'
    | 'CVE'
    | 'CZK'
    | 'DJF'
    | 'DKK'
    | 'DOP'
    | 'DZD'
    | 'EGP'
    | 'ERN'
    | 'ETB'
    | 'EUR'
    | 'FJD'
    | 'FKP'
    | 'GBP'
    | 'GEL'
    | 'GHS'
    | 'GIP'
    | 'GMD'
    | 'GNF'
    | 'GTQ'
    | 'GYD'
    | 'HKD'
    | 'HNL'
    | 'HRK'
    | 'HTG'
    | 'HUF'
    | 'IDR'
    | 'ILS'
    | 'INR'
    | 'IQD'
    | 'IRR'
    | 'ISK'
    | 'JMD'
    | 'JOD'
    | 'JPY'
    | 'KES'
    | 'KGS'
    | 'KHR'
    | 'KMF'
    | 'KPW'
    | 'KRW'
    | 'KWD'
    | 'KYD'
    | 'KZT'
    | 'LAK'
    | 'LBP'
    | 'LKR'
    | 'LRD'
    | 'LSL'
    | 'LTL'
    | 'LYD'
    | 'MAD'
    | 'MDL'
    | 'MGA'
    | 'MKD'
    | 'MMK'
    | 'MNT'
    | 'MOP'
    | 'MRO'
    | 'MRU'
    | 'MUR'
    | 'MVR'
    | 'MWK'
    | 'MXN'
    | 'MYR'
    | 'MZN'
    | 'NAD'
    | 'NGN'
    | 'NIO'
    | 'NOK'
    | 'NPR'
    | 'NZD'
    | 'OMR'
    | 'PAB'
    | 'PEN'
    | 'PGK'
    | 'PHP'
    | 'PKR'
    | 'PLN'
    | 'PYG'
    | 'QAR'
    | 'RON'
    | 'RSD'
    | 'RUB'
    | 'RUR'
    | 'RWF'
    | 'SAR'
    | 'SBD'
    | 'SCR'
    | 'SDG'
    | 'SEK'
    | 'SGD'
    | 'SHP'
    | 'SLL'
    | 'SOS'
    | 'SRD'
    | 'SSP'
    | 'STD'
    | 'STN'
    | 'SVC'
    | 'SYP'
    | 'SZL'
    | 'THB'
    | 'TJS'
    | 'TMT'
    | 'TND'
    | 'TOP'
    | 'TRY'
    | 'TTD'
    | 'TWD'
    | 'TZS'
    | 'UAH'
    | 'UGX'
    | 'USD'
    | 'UYU'
    | 'UZS'
    | 'VEF'
    | 'VES'
    | 'VND'
    | 'VUV'
    | 'WST'
    | 'XAF'
    | 'XCD'
    | 'XOF'
    | 'XPF'
    | 'YER'
    | 'ZAR'
    | 'ZMW'
    | 'ZWL';
  typeMap: LimitTypeMap;
}

export interface IssueCardRequest {
  cardType: ('PHYSICAL' | 'VIRTUAL')[];

  /**
   * @format uuid
   * @example 38104ecb-1343-4cc1-b6f2-e6cc88e9a80f
   */
  userId: string;
  currency:
    | 'UNSPECIFIED'
    | 'AED'
    | 'AFN'
    | 'ALL'
    | 'AMD'
    | 'ANG'
    | 'AOA'
    | 'ARS'
    | 'AUD'
    | 'AWG'
    | 'AZN'
    | 'BAM'
    | 'BBD'
    | 'BDT'
    | 'BGN'
    | 'BHD'
    | 'BIF'
    | 'BMD'
    | 'BND'
    | 'BOB'
    | 'BRL'
    | 'BSD'
    | 'BTN'
    | 'BWP'
    | 'BYN'
    | 'BYR'
    | 'BZD'
    | 'CAD'
    | 'CDF'
    | 'CHF'
    | 'CLP'
    | 'CNY'
    | 'COP'
    | 'CRC'
    | 'CUC'
    | 'CUP'
    | 'CVE'
    | 'CZK'
    | 'DJF'
    | 'DKK'
    | 'DOP'
    | 'DZD'
    | 'EGP'
    | 'ERN'
    | 'ETB'
    | 'EUR'
    | 'FJD'
    | 'FKP'
    | 'GBP'
    | 'GEL'
    | 'GHS'
    | 'GIP'
    | 'GMD'
    | 'GNF'
    | 'GTQ'
    | 'GYD'
    | 'HKD'
    | 'HNL'
    | 'HRK'
    | 'HTG'
    | 'HUF'
    | 'IDR'
    | 'ILS'
    | 'INR'
    | 'IQD'
    | 'IRR'
    | 'ISK'
    | 'JMD'
    | 'JOD'
    | 'JPY'
    | 'KES'
    | 'KGS'
    | 'KHR'
    | 'KMF'
    | 'KPW'
    | 'KRW'
    | 'KWD'
    | 'KYD'
    | 'KZT'
    | 'LAK'
    | 'LBP'
    | 'LKR'
    | 'LRD'
    | 'LSL'
    | 'LTL'
    | 'LYD'
    | 'MAD'
    | 'MDL'
    | 'MGA'
    | 'MKD'
    | 'MMK'
    | 'MNT'
    | 'MOP'
    | 'MRO'
    | 'MRU'
    | 'MUR'
    | 'MVR'
    | 'MWK'
    | 'MXN'
    | 'MYR'
    | 'MZN'
    | 'NAD'
    | 'NGN'
    | 'NIO'
    | 'NOK'
    | 'NPR'
    | 'NZD'
    | 'OMR'
    | 'PAB'
    | 'PEN'
    | 'PGK'
    | 'PHP'
    | 'PKR'
    | 'PLN'
    | 'PYG'
    | 'QAR'
    | 'RON'
    | 'RSD'
    | 'RUB'
    | 'RUR'
    | 'RWF'
    | 'SAR'
    | 'SBD'
    | 'SCR'
    | 'SDG'
    | 'SEK'
    | 'SGD'
    | 'SHP'
    | 'SLL'
    | 'SOS'
    | 'SRD'
    | 'SSP'
    | 'STD'
    | 'STN'
    | 'SVC'
    | 'SYP'
    | 'SZL'
    | 'THB'
    | 'TJS'
    | 'TMT'
    | 'TND'
    | 'TOP'
    | 'TRY'
    | 'TTD'
    | 'TWD'
    | 'TZS'
    | 'UAH'
    | 'UGX'
    | 'USD'
    | 'UYU'
    | 'UZS'
    | 'VEF'
    | 'VES'
    | 'VND'
    | 'VUV'
    | 'WST'
    | 'XAF'
    | 'XCD'
    | 'XOF'
    | 'XPF'
    | 'YER'
    | 'ZAR'
    | 'ZMW'
    | 'ZWL';
  isPersonal: boolean;

  /** The allocations to assign to this card and any customizations of their spend controls. Leaving spend control fields as null will default to the allocation's spend controls.  */
  allocationSpendControls?: CardAllocationSpendControls[];

  /** The Stripe reference for a previously cancelled card that this is replacing */
  replacementFor?: string;

  /** The reason this card is a replacement. Required if replacementFor is provided. If LOST or STOLEN, the card must have had a similar reason set in Stripe for its cancellation */
  replacementReason?: 'LOST' | 'STOLEN' | 'DAMAGED' | 'EXPIRED';

  /** @example DEBIT */
  binType?: 'DEBIT';

  /** @example DEBIT */
  fundingType?: 'POOLED' | 'INDIVIDUAL';
  shippingAddress?: Address;
}

export interface IssueCardResponse {
  /** @format uuid */
  cardId: string;

  /** Error message for any records that failed. Will be null if successful */
  errorMessage?: string;
}

export interface Card {
  /** @format uuid */
  cardId?: string;

  /** @format uuid */
  allocationId?: string;

  /** @format uuid */
  userId?: string;

  /** @format uuid */
  accountId?: string;
  status?: 'ACTIVE' | 'INACTIVE' | 'CANCELLED';
  statusReason?: 'NONE' | 'CARDHOLDER_REQUESTED' | 'USER_ARCHIVED' | 'LOST' | 'STOLEN';
  fundingType?: 'POOLED' | 'INDIVIDUAL';

  /** @format date-time */
  issueDate?: string;

  /** @format date */
  expirationDate?: string;
  activated?: boolean;

  /** @format date-time */
  activationDate?: string;
  cardLine3?: string;
  cardLine4?: string;
  type?: 'PHYSICAL' | 'VIRTUAL';
  superseded?: boolean;
  cardNumber?: string;
  lastFour?: string;
  address?: Address;
  externalRef?: string;
  availableAllocationIds?: string[];
}

export interface CardDetailsResponse {
  card: Card;
  ledgerBalance?: Amount;
  availableBalance?: Amount;

  /** @format uuid */
  linkedAllocationId?: string;
  linkedAllocationName?: string;
  allowedAllocationsAndLimits?: CardAllocationSpendControls[];
}

export interface SearchCardRequest {
  pageRequest: PageRequest;
  users?: string[];
  allocations?: string[];
  searchText?: string;
  balance?: FilterAmount;
  statuses?: ('ACTIVE' | 'INACTIVE' | 'CANCELLED')[];
  types?: ('PHYSICAL' | 'VIRTUAL')[];
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
  cardStatus?: 'ACTIVE' | 'INACTIVE' | 'CANCELLED';
  cardType?: 'PHYSICAL' | 'VIRTUAL';
  activated?: boolean;

  /** @format date-time */
  activationDate?: string;
}

export interface RevealCardRequest {
  /** @format uuid */
  cardId?: string;
  nonce?: string;
}

export interface RevealCardResponse {
  externalRef?: string;
  ephemeralKey?: string;
}

export interface EphemeralKeyRequest {
  /** @format uuid */
  cardId?: string;
  apiVersion?: string;
}

export interface BusinessStatusResponse {
  /** @format uuid */
  businessId?: string;
  status?: 'ONBOARDING' | 'ACTIVE' | 'SUSPENDED' | 'CLOSED';
}

export interface PlaidLogEntryRequest {
  /** @format int32 */
  pageNum?: number;

  /** @format int32 */
  pageSize?: number;
}

export interface PagedDataPlaidLogEntryMetadata {
  /** @format int32 */
  pageNumber?: number;

  /** @format int32 */
  pageSize?: number;

  /** @format int64 */
  totalElements?: number;
  content?: PlaidLogEntryMetadata[];
}

export interface PlaidLogEntryMetadata {
  /** @format uuid */
  id?: string;

  /** @format uuid */
  businessId?: string;

  /** @format date-time */
  created?: string;
  plaidResponseType?:
    | 'BALANCE'
    | 'OWNER'
    | 'ACCOUNT'
    | 'LINK_TOKEN'
    | 'ACCESS_TOKEN'
    | 'SANDBOX_LINK_TOKEN'
    | 'ERROR'
    | 'OTHER';
}

export interface UpdateAllocationBalanceRequest {
  amount: Amount;

  /** @example CSR credit */
  notes: string;
}

export interface UpdateAllocationBalanceResponse {
  /** @format uuid */
  adjustmentId?: string;
  ledgerBalance?: Amount;
}

export interface UpdateBusiness {
  legalName?: string;
  businessName?: string;
  businessType?:
    | 'INDIVIDUAL'
    | 'SOLE_PROPRIETORSHIP'
    | 'SINGLE_MEMBER_LLC'
    | 'MULTI_MEMBER_LLC'
    | 'PRIVATE_PARTNERSHIP'
    | 'PUBLIC_PARTNERSHIP'
    | 'PRIVATE_CORPORATION'
    | 'PUBLIC_CORPORATION'
    | 'INCORPORATED_NON_PROFIT'
    | 'ACCOUNTING_FIRM'
    | 'BANK'
    | 'CONSULTING_FIRM';
  employerIdentificationNumber?: string;

  /**
   * Phone number in e.164 format
   * @example +1234567890
   */
  businessPhone?: string;
  address?: Address;
  mcc?: string;
  description?: string;
  url?: string;
  timeZone?: 'US_EASTERN' | 'US_CENTRAL' | 'US_MOUNTAIN' | 'US_PACIFIC' | 'US_ALASKA' | 'US_HAWAII';
}

export interface BusinessReallocationRequest {
  /** @format uuid */
  allocationIdFrom?: string;

  /** @format uuid */
  allocationIdTo?: string;
  amount?: Amount;
}

export interface BusinessFundAllocationResponse {
  /** @format uuid */
  adjustmentIdFrom?: string;
  ledgerBalanceFrom?: Amount;

  /** @format uuid */
  adjustmentIdTo?: string;
  ledgerBalanceTo?: Amount;
}

export interface UpdateAutoCreateExpenseCategoriesRequest {
  autoCreateExpenseCategories?: boolean;
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
  allocationId?: string;

  /** @format uuid */
  ledgerAccountId: string;
  type: 'ALLOCATION' | 'CARD';

  /** @format uuid */
  cardId?: string;
  ledgerBalance: Amount;
  availableBalance?: Amount;
}

export interface Allocation {
  /** @format uuid */
  allocationId: string;
  name: string;
  account: Account;

  /** @format uuid */
  parentAllocationId?: string;
  childrenAllocationIds?: string[];
  archived?: boolean;
}

export interface UpdateBusinessAccountingStepRequest {
  accountingSetupStep?:
    | 'AWAITING_SYNC'
    | 'ADD_CREDIT_CARD'
    | 'MAP_CATEGORIES'
    | 'SETUP_CLASSES'
    | 'SETUP_LOCATIONS'
    | 'COMPLETE';
}

export interface CreateOrUpdateBusinessProspectRequest {
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

  /**
   * The Business type
   * @example SINGLE_MEMBER_LLC
   */
  businessType?:
    | 'INDIVIDUAL'
    | 'SOLE_PROPRIETORSHIP'
    | 'SINGLE_MEMBER_LLC'
    | 'MULTI_MEMBER_LLC'
    | 'PRIVATE_PARTNERSHIP'
    | 'PUBLIC_PARTNERSHIP'
    | 'PRIVATE_CORPORATION'
    | 'PUBLIC_CORPORATION'
    | 'INCORPORATED_NON_PROFIT'
    | 'ACCOUNTING_FIRM'
    | 'BANK'
    | 'CONSULTING_FIRM';

  /**
   * Relationship to business Owner
   * @example true
   */
  relationshipOwner?: boolean;

  /**
   * Relationship to business Executive
   * @example true
   */
  relationshipExecutive?: boolean;

  /**
   * Terms of Service and Privacy Policy Acceptance
   * @example true
   */
  tosAndPrivacyPolicyAcceptance: boolean;
}

export interface CreateBusinessProspectResponse {
  /** @format uuid */
  businessProspectId?: string;
  businessProspectStatus?: 'NEW' | 'EMAIL_VERIFIED' | 'MOBILE_VERIFIED' | 'COMPLETED';
}

export interface ValidateBusinessProspectIdentifierRequest {
  /**
   * Type of Identifier to validate
   * @example EMAIL
   */
  identifierType?: 'EMAIL' | 'PHONE';

  /**
   * OTP received via email/phone
   * @example 67890
   */
  otp?: string;
}

export interface ValidateIdentifierResponse {
  /** @example true */
  'If email already exist on the system. User can login, reset password or use another email'?: boolean;
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
  legalName: string;

  /** @pattern ^[1-9][0-9]{8}$ */
  employerIdentificationNumber: string;

  /**
   * Phone number in e.164 format
   * @pattern ^\+[1-9][0-9]{9,14}$
   * @example +1234567890
   */
  businessPhone: string;
  address?: Address;
  mcc: string;

  /**
   * Description
   * @example Business small description
   */
  description: string;

  /**
   * Timezone
   * @example US_CENTRAL
   */
  timeZone: 'US_EASTERN' | 'US_CENTRAL' | 'US_MOUNTAIN' | 'US_PACIFIC' | 'US_ALASKA' | 'US_HAWAII';

  /**
   * Doing business as name if is different by company name
   * @example business
   */
  businessName?: string;

  /**
   * Business url
   * @example https://fecebook.com/business
   */
  url?: string;
}

export interface ConvertBusinessProspectResponse {
  business?: Business;

  /** @format uuid */
  businessOwnerId?: string;
  errorMessages?: string[];
}

export interface OwnersProvidedRequest {
  /**
   * No other owners to provide
   * If this will be set to true, will send to stripe info that we have no owner to provide.
   */
  noOtherOwnersToProvide?: boolean;

  /**
   * No executive to provide
   * If this will be set to true, will send to stripe info that we have no executive to provide.
   */
  noExecutiveToProvide?: boolean;
}

export interface OwnersProvidedResponse {
  business: Business;

  /** Error message for any records that failed. Will be null if successful */
  errorMessages?: string[];
}

export interface CreateOrUpdateBusinessOwnerRequest {
  /** @format uuid */
  id?: string;

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
   * Relationship to business Owner
   * @example true
   */
  relationshipOwner?: boolean;

  /**
   * Relationship to business Executive
   * @example true
   */
  relationshipExecutive?: boolean;

  /**
   * Percentage Ownership from business
   * @example 25
   */
  percentageOwnership?: number;

  /**
   * Title on business
   * @example CEO
   */
  title?: string;

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
  phone?: string;
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
  errorMessages?: string[];
}

export interface BusinessNotification {
  /** @format uuid */
  businessId?: string;

  /** @format uuid */
  userId?: string;
  type?:
    | 'CHART_OF_ACCOUNTS_CREATED'
    | 'CHART_OF_ACCOUNTS_DELETED'
    | 'CHART_OF_ACCOUNTS_RENAMED'
    | 'USER_ACCEPTED_COA_CHANGES';
  data?: BusinessNotificationData;

  /** @format int64 */
  version?: number;

  /** @format date-time */
  created?: string;

  /** @format date-time */
  updated?: string;

  /** @format uuid */
  id?: string;
}

export interface BusinessNotificationData {
  oldValue?: string;
  newValue?: string;
}

export interface TwoFactorStartLoggedInResponse {
  twoFactorId?: string;
  methodId?: string;
  trustChallenge?: string;
}

export interface DeviceInfo {
  description?: string;
  lastAccessedAddress?: string;

  /** @format date-time */
  lastAccessedInstant?: string;
  name?: string;
  type?:
    | 'BROWSER'
    | 'DESKTOP'
    | 'LAPTOP'
    | 'MOBILE'
    | 'OTHER'
    | 'SERVER'
    | 'TABLET'
    | 'TV'
    | 'UNKNOWN';
}

export interface EventInfo {
  data?: Record<string, object>;
  deviceDescription?: string;
  deviceName?: string;
  deviceType?: string;
  ipAddress?: string;
  location?: Location;
  os?: string;
  userAgent?: string;
}

export interface Location {
  city?: string;
  country?: string;

  /** @format double */
  latitude?: number;

  /** @format double */
  longitude?: number;
  region?: string;
  zipcode?: string;
  displayString?: string;
}

export interface MetaData {
  device?: DeviceInfo;
  scopes?: string[];
}

export interface TwoFactorLoginRequest {
  eventInfo?: EventInfo;

  /** @format uuid */
  applicationId?: string;
  ipAddress?: string;
  metaData?: MetaData;
  newDevice?: boolean;
  noJWT?: boolean;
  code?: string;
  trustComputer?: boolean;
  twoFactorId?: string;

  /** @format uuid */
  userId?: string;
}

export interface RelationshipToBusiness {
  owner?: boolean;
  executive?: boolean;
  representative?: boolean;
  director?: boolean;
}

export interface UserLoginResponse {
  twoFactorId?: string;
  changePasswordId?: string;
  changePasswordReason?: 'Administrative' | 'Breached' | 'Expired' | 'Validation';

  /** @format uuid */
  userId?: string;

  /** @format uuid */
  businessId?: string;
  type?: 'EMPLOYEE' | 'BUSINESS_OWNER';
  firstName?: string;
  lastName?: string;
  address?: Address;
  email?: string;
  phone?: string;
  archived?: boolean;
  relationshipToBusiness?: RelationshipToBusiness;
}

export interface FirstTwoFactorValidateRequest {
  code?: string;
  method?: 'sms' | 'email';
  destination?: string;
}

export interface TwoFactorResponse {
  recoveryCodes?: string[];
}

export interface FirstTwoFactorSendRequest {
  destination?: string;
  method?: 'sms' | 'email';
}

export interface ResetPasswordRequest {
  changePasswordId?: string;
  newPassword?: string;
}

export interface LoginRequest {
  username?: string;
  password?: string;
}

export interface ForgotPasswordRequest {
  email?: string;
}

export interface ChangePasswordRequest {
  /** @format uuid */
  userId?: string;
  currentPassword?: string;
  newPassword?: string;
  trustChallenge?: string;
  twoFactorId?: string;
  twoFactorCode?: string;
}

export interface ChangePasswordResponse {
  oneTimePassword?: string;
  state?: Record<string, object>;
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
  amount: Amount;
  limits: CurrencyLimit[];
  disabledMccGroups: (
    | 'CHILD_CARE'
    | 'DIGITAL_GOODS'
    | 'EDUCATION'
    | 'ENTERTAINMENT'
    | 'FOOD_BEVERAGE'
    | 'GAMBLING'
    | 'GOVERNMENT'
    | 'HEALTH'
    | 'MEMBERSHIPS'
    | 'MONEY_TRANSFER'
    | 'SERVICES'
    | 'SHOPPING'
    | 'TRAVEL'
    | 'UTILITIES'
    | 'OTHER'
  )[];
  disabledPaymentTypes: ('POS' | 'ONLINE' | 'MANUAL_ENTRY')[];
  disableForeign: boolean;
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
  reallocationType: 'ALLOCATION_TO_CARD' | 'CARD_TO_ALLOCATION';
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

export interface AllocationAutoTopUpConfigCreateRequest {
  /** @format int32 */
  monthlyDay: number;
  amount: Amount;
}

export interface AllocationAutoTopUpConfigResponse {
  /** @format uuid */
  id?: string;

  /** @format int32 */
  monthlyDay?: number;
  amount?: Amount;
  active?: boolean;
}

export interface LedgerActivityRequest {
  /** @format uuid */
  allocationId?: string;

  /** @format uuid */
  userId?: string;

  /** @format uuid */
  cardId?: string;
  searchText?: string;
  types?: (
    | 'BANK_DEPOSIT_STRIPE'
    | 'BANK_DEPOSIT_ACH'
    | 'BANK_DEPOSIT_WIRE'
    | 'BANK_DEPOSIT_RETURN'
    | 'BANK_WITHDRAWAL'
    | 'BANK_WITHDRAWAL_RETURN'
    | 'MANUAL'
    | 'NETWORK_AUTHORIZATION'
    | 'NETWORK_CAPTURE'
    | 'NETWORK_REFUND'
    | 'REALLOCATE'
    | 'FEE'
    | 'CARD_FUND_RETURN'
  )[];

  /** @format date-time */
  from?: string;

  /** @format date-time */
  to?: string;
  statuses?: ('PENDING' | 'DECLINED' | 'APPROVED' | 'CANCELED' | 'CREDIT' | 'PROCESSED')[];
  amount?: FilterAmount;
  categories?: string[];
  withReceipt?: boolean;
  withoutReceipt?: boolean;
  syncStatus?: ('SYNCED_LOCKED' | 'READY' | 'NOT_READY')[];
  missingExpenseCategory?: boolean;
  pageRequest: PageRequest;
}

export interface AllocationInfo {
  /** @format uuid */
  allocationId?: string;
  name?: string;
}

export interface BankInfo {
  name?: string;
  accountNumberLastFour?: string;
}

export interface LedgerAccount {
  type?: 'BANK' | 'MERCHANT' | 'ALLOCATION' | 'CARD';
}

export interface LedgerActivityResponse {
  /** @format uuid */
  accountActivityId?: string;

  /** @format date-time */
  activityTime?: string;
  type?:
    | 'BANK_DEPOSIT_STRIPE'
    | 'BANK_DEPOSIT_ACH'
    | 'BANK_DEPOSIT_WIRE'
    | 'BANK_DEPOSIT_RETURN'
    | 'BANK_WITHDRAWAL'
    | 'BANK_WITHDRAWAL_RETURN'
    | 'MANUAL'
    | 'NETWORK_AUTHORIZATION'
    | 'NETWORK_CAPTURE'
    | 'NETWORK_REFUND'
    | 'REALLOCATE'
    | 'FEE'
    | 'CARD_FUND_RETURN';
  status?: 'PENDING' | 'DECLINED' | 'APPROVED' | 'CANCELED' | 'CREDIT' | 'PROCESSED';
  user?: LedgerUser;
  amount?: Amount;
  requestedAmount?: Amount;
  syncStatus?: 'SYNCED_LOCKED' | 'READY' | 'NOT_READY';
  hold?: LedgerHoldInfo;
  account?: LedgerAllocationAccount | LedgerBankAccount | LedgerCardAccount | LedgerMerchantAccount;
  referenceAccount?:
    | LedgerAllocationAccount
    | LedgerBankAccount
    | LedgerCardAccount
    | LedgerMerchantAccount;
  receipt?: ReceiptDetails;
  notes?: string;
  expenseDetails?: ExpenseDetails;

  /** @format date-time */
  lastSyncTime?: string;
  declineDetails?:
    | DeclineDetails
    | AddressPostalCodeMismatch
    | LimitExceeded
    | OperationLimitExceeded
    | SpendControlViolated;
  paymentDetails?: PaymentDetails;
  statementDescriptor?: string;
}

export type LedgerAllocationAccount = LedgerAccount & { allocationInfo?: AllocationInfo };

export type LedgerBankAccount = LedgerAccount & { bankInfo?: BankInfo };

export type LedgerCardAccount = LedgerAccount & { cardInfo?: CardInfo };

export interface LedgerHoldInfo {
  /** @format uuid */
  holdId?: string;

  /** @format date-time */
  expirationDate?: string;
}

export type LedgerMerchantAccount = LedgerAccount & { merchantInfo?: Merchant };

export interface LedgerUser {
  type?: 'USER' | 'SYSTEM' | 'EXTERNAL';
  userInfo?: UserInfo;
}

export interface PagedDataLedgerActivityResponse {
  /** @format int32 */
  pageNumber?: number;

  /** @format int32 */
  pageSize?: number;

  /** @format int64 */
  totalElements?: number;
  content?: LedgerActivityResponse[];
}

export interface UserInfo {
  /** @format uuid */
  userId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
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
  count?: number;
}

export interface ChartDataRequest {
  chartFilter: 'MERCHANT_CATEGORY' | 'ALLOCATION' | 'EMPLOYEE' | 'MERCHANT';

  /** @format uuid */
  allocationId?: string;

  /** @format uuid */
  userId?: string;

  /** @format date-time */
  from: string;

  /** @format date-time */
  to: string;
  sortDirection?: 'ASC' | 'DESC';
}

export interface AllocationChartData {
  allocation?: AllocationInfo;
  amount?: Amount;
}

export interface ChartDataResponse {
  merchantCategoryChartData?: MerchantCategoryChartData[];
  allocationChartData?: AllocationChartData[];
  userChartData?: UserChartData[];
  merchantChartData?: MerchantChartData[];
}

export interface MerchantCategoryChartData {
  merchantType?:
    | 'UNKNOWN'
    | 'AC_REFRIGERATION_REPAIR'
    | 'ACCOUNTING_BOOKKEEPING_SERVICES'
    | 'ADVERTISING_SERVICES'
    | 'AGRICULTURAL_COOPERATIVE'
    | 'AIRLINES_AIR_CARRIERS'
    | 'AIRPORTS_FLYING_FIELDS'
    | 'AMBULANCE_SERVICES'
    | 'AMUSEMENT_PARKS_CARNIVALS'
    | 'ANTIQUE_REPRODUCTIONS'
    | 'ANTIQUE_SHOPS'
    | 'AQUARIUMS'
    | 'ARCHITECTURAL_SURVEYING_SERVICES'
    | 'ART_DEALERS_AND_GALLERIES'
    | 'ARTISTS_SUPPLY_AND_CRAFT_SHOPS'
    | 'AUTO_BODY_REPAIR_SHOPS'
    | 'AUTO_PAINT_SHOPS'
    | 'AUTO_SERVICE_SHOPS'
    | 'AUTO_AND_HOME_SUPPLY_STORES'
    | 'AUTOMATED_CASH_DISBURSE'
    | 'AUTOMATED_FUEL_DISPENSERS'
    | 'AUTOMOBILE_ASSOCIATIONS'
    | 'AUTOMOTIVE_PARTS_AND_ACCESSORIES_STORES'
    | 'AUTOMOTIVE_TIRE_STORES'
    | 'BAIL_AND_BOND_PAYMENTS'
    | 'BAKERIES'
    | 'BANDS_ORCHESTRAS'
    | 'BARBER_AND_BEAUTY_SHOPS'
    | 'BETTING_CASINO_GAMBLING'
    | 'BICYCLE_SHOPS'
    | 'BILLIARD_POOL_ESTABLISHMENTS'
    | 'BOAT_DEALERS'
    | 'BOAT_RENTALS_AND_LEASES'
    | 'BOOK_STORES'
    | 'BOOKS_PERIODICALS_AND_NEWSPAPERS'
    | 'BOWLING_ALLEYS'
    | 'BUS_LINES'
    | 'BUSINESS_SECRETARIAL_SCHOOLS'
    | 'BUYING_SHOPPING_SERVICES'
    | 'CABLE_SATELLITE_AND_OTHER_PAY_TELEVISION_AND_RADIO'
    | 'CAMERA_AND_PHOTOGRAPHIC_SUPPLY_STORES'
    | 'CANDY_NUT_AND_CONFECTIONERY_STORES'
    | 'CAR_RENTAL_AGENCIES'
    | 'CAR_WASHES'
    | 'CAR_AND_TRUCK_DEALERS_NEW_USED'
    | 'CAR_AND_TRUCK_DEALERS_USED_ONLY'
    | 'CARPENTRY_SERVICES'
    | 'CARPET_UPHOLSTERY_CLEANING'
    | 'CATERERS'
    | 'CHARITABLE_AND_SOCIAL_SERVICE_ORGANIZATIONS_FUNDRAISING'
    | 'CHEMICALS_AND_ALLIED_PRODUCTS'
    | 'CHILD_CARE_SERVICES'
    | 'CHILDRENS_AND_INFANTS_WEAR_STORES'
    | 'CHIROPODISTS_PODIATRISTS'
    | 'CHIROPRACTORS'
    | 'CIGAR_STORES_AND_STANDS'
    | 'CIVIC_SOCIAL_FRATERNAL_ASSOCIATIONS'
    | 'CLEANING_AND_MAINTENANCE'
    | 'CLOTHING_RENTAL'
    | 'COLLEGES_UNIVERSITIES'
    | 'COMMERCIAL_EQUIPMENT'
    | 'COMMERCIAL_FOOTWEAR'
    | 'COMMERCIAL_PHOTOGRAPHY_ART_AND_GRAPHICS'
    | 'COMMUTER_TRANSPORT_AND_FERRIES'
    | 'COMPUTER_NETWORK_SERVICES'
    | 'COMPUTER_PROGRAMMING'
    | 'COMPUTER_REPAIR'
    | 'COMPUTER_SOFTWARE_STORES'
    | 'COMPUTERS_PERIPHERALS_AND_SOFTWARE'
    | 'CONCRETE_WORK_SERVICES'
    | 'CONSTRUCTION_MATERIALS'
    | 'CONSULTING_PUBLIC_RELATIONS'
    | 'CORRESPONDENCE_SCHOOLS'
    | 'COSMETIC_STORES'
    | 'COUNSELING_SERVICES'
    | 'COUNTRY_CLUBS'
    | 'COURIER_SERVICES'
    | 'COURT_COSTS'
    | 'CREDIT_REPORTING_AGENCIES'
    | 'CRUISE_LINES'
    | 'DAIRY_PRODUCTS_STORES'
    | 'DANCE_HALL_STUDIOS_SCHOOLS'
    | 'DATING_ESCORT_SERVICES'
    | 'DENTISTS_ORTHODONTISTS'
    | 'DEPARTMENT_STORES'
    | 'DETECTIVE_AGENCIES'
    | 'DIGITAL_GOODS_MEDIA'
    | 'DIGITAL_GOODS_APPLICATIONS'
    | 'DIGITAL_GOODS_GAMES'
    | 'DIGITAL_GOODS_LARGE_VOLUME'
    | 'DIRECT_MARKETING_CATALOG_MERCHANT'
    | 'DIRECT_MARKETING_COMBINATION_CATALOG_AND_RETAIL_MERCHANT'
    | 'DIRECT_MARKETING_INBOUND_TELEMARKETING'
    | 'DIRECT_MARKETING_INSURANCE_SERVICES'
    | 'DIRECT_MARKETING_OTHER'
    | 'DIRECT_MARKETING_OUTBOUND_TELEMARKETING'
    | 'DIRECT_MARKETING_SUBSCRIPTION'
    | 'DIRECT_MARKETING_TRAVEL'
    | 'DISCOUNT_STORES'
    | 'DOCTORS'
    | 'DOOR_TO_DOOR_SALES'
    | 'DRAPERY_WINDOW_COVERING_AND_UPHOLSTERY_STORES'
    | 'DRINKING_PLACES'
    | 'DRUG_STORES_AND_PHARMACIES'
    | 'DRUGS_DRUG_PROPRIETARIES_AND_DRUGGIST_SUNDRIES'
    | 'DRY_CLEANERS'
    | 'DURABLE_GOODS'
    | 'DUTY_FREE_STORES'
    | 'EATING_PLACES_RESTAURANTS'
    | 'EDUCATIONAL_SERVICES'
    | 'ELECTRIC_RAZOR_STORES'
    | 'ELECTRICAL_PARTS_AND_EQUIPMENT'
    | 'ELECTRICAL_SERVICES'
    | 'ELECTRONICS_REPAIR_SHOPS'
    | 'ELECTRONICS_STORES'
    | 'ELEMENTARY_SECONDARY_SCHOOLS'
    | 'EMPLOYMENT_TEMP_AGENCIES'
    | 'EQUIPMENT_RENTAL'
    | 'EXTERMINATING_SERVICES'
    | 'FAMILY_CLOTHING_STORES'
    | 'FAST_FOOD_RESTAURANTS'
    | 'FINANCIAL_INSTITUTIONS'
    | 'FINES_GOVERNMENT_ADMINISTRATIVE_ENTITIES'
    | 'FIREPLACE_FIREPLACE_SCREENS_AND_ACCESSORIES_STORES'
    | 'FLOOR_COVERING_STORES'
    | 'FLORISTS'
    | 'FLORISTS_SUPPLIES_NURSERY_STOCK_AND_FLOWERS'
    | 'FREEZER_AND_LOCKER_MEAT_PROVISIONERS'
    | 'FUEL_DEALERS_NON_AUTOMOTIVE'
    | 'FUNERAL_SERVICES_CREMATORIES'
    | 'FURNITURE_REPAIR_REFINISHING'
    | 'FURNITURE_HOME_FURNISHINGS_AND_EQUIPMENT_STORES_EXCEPT_APPLIANCES'
    | 'FURRIERS_AND_FUR_SHOPS'
    | 'GENERAL_SERVICES'
    | 'GIFT_CARD_NOVELTY_AND_SOUVENIR_SHOPS'
    | 'GLASS_PAINT_AND_WALLPAPER_STORES'
    | 'GLASSWARE_CRYSTAL_STORES'
    | 'GOLF_COURSES_PUBLIC'
    | 'GOVERNMENT_SERVICES'
    | 'GROCERY_STORES_SUPERMARKETS'
    | 'HARDWARE_STORES'
    | 'HARDWARE_EQUIPMENT_AND_SUPPLIES'
    | 'HEALTH_AND_BEAUTY_SPAS'
    | 'HEARING_AIDS_SALES_AND_SUPPLIES'
    | 'HEATING_PLUMBING_A_C'
    | 'HOBBY_TOY_AND_GAME_SHOPS'
    | 'HOME_SUPPLY_WAREHOUSE_STORES'
    | 'HOSPITALS'
    | 'HOTELS_MOTELS_AND_RESORTS'
    | 'HOUSEHOLD_APPLIANCE_STORES'
    | 'INDUSTRIAL_SUPPLIES'
    | 'INFORMATION_RETRIEVAL_SERVICES'
    | 'INSURANCE_DEFAULT'
    | 'INSURANCE_UNDERWRITING_PREMIUMS'
    | 'INTRA_COMPANY_PURCHASES'
    | 'JEWELRY_STORES_WATCHES_CLOCKS_AND_SILVERWARE_STORES'
    | 'LANDSCAPING_SERVICES'
    | 'LAUNDRIES'
    | 'LAUNDRY_CLEANING_SERVICES'
    | 'LEGAL_SERVICES_ATTORNEYS'
    | 'LUGGAGE_AND_LEATHER_GOODS_STORES'
    | 'LUMBER_BUILDING_MATERIALS_STORES'
    | 'MANUAL_CASH_DISBURSE'
    | 'MARINAS_SERVICE_AND_SUPPLIES'
    | 'MASONRY_STONEWORK_AND_PLASTER'
    | 'MASSAGE_PARLORS'
    | 'MEDICAL_SERVICES'
    | 'MEDICAL_AND_DENTAL_LABS'
    | 'MEDICAL_DENTAL_OPHTHALMIC_AND_HOSPITAL_EQUIPMENT_AND_SUPPLIES'
    | 'MEMBERSHIP_ORGANIZATIONS'
    | 'MENS_AND_BOYS_CLOTHING_AND_ACCESSORIES_STORES'
    | 'MENS_WOMENS_CLOTHING_STORES'
    | 'METAL_SERVICE_CENTERS'
    | 'MISCELLANEOUS_APPAREL_AND_ACCESSORY_SHOPS'
    | 'MISCELLANEOUS_AUTO_DEALERS'
    | 'MISCELLANEOUS_BUSINESS_SERVICES'
    | 'MISCELLANEOUS_FOOD_STORES'
    | 'MISCELLANEOUS_GENERAL_MERCHANDISE'
    | 'MISCELLANEOUS_GENERAL_SERVICES'
    | 'MISCELLANEOUS_HOME_FURNISHING_SPECIALTY_STORES'
    | 'MISCELLANEOUS_PUBLISHING_AND_PRINTING'
    | 'MISCELLANEOUS_RECREATION_SERVICES'
    | 'MISCELLANEOUS_REPAIR_SHOPS'
    | 'MISCELLANEOUS_SPECIALTY_RETAIL'
    | 'MOBILE_HOME_DEALERS'
    | 'MOTION_PICTURE_THEATERS'
    | 'MOTOR_FREIGHT_CARRIERS_AND_TRUCKING'
    | 'MOTOR_HOMES_DEALERS'
    | 'MOTOR_VEHICLE_SUPPLIES_AND_NEW_PARTS'
    | 'MOTORCYCLE_SHOPS_AND_DEALERS'
    | 'MOTORCYCLE_SHOPS_DEALERS'
    | 'MUSIC_STORES_MUSICAL_INSTRUMENTS_PIANOS_AND_SHEET_MUSIC'
    | 'NEWS_DEALERS_AND_NEWSSTANDS'
    | 'NON_FI_MONEY_ORDERS'
    | 'NON_FI_STORED_VALUE_CARD_PURCHASE_LOAD'
    | 'NONDURABLE_GOODS'
    | 'NURSERIES_LAWN_AND_GARDEN_SUPPLY_STORES'
    | 'NURSING_PERSONAL_CARE'
    | 'OFFICE_AND_COMMERCIAL_FURNITURE'
    | 'OPTICIANS_EYEGLASSES'
    | 'OPTOMETRISTS_OPHTHALMOLOGIST'
    | 'ORTHOPEDIC_GOODS_PROSTHETIC_DEVICES'
    | 'OSTEOPATHS'
    | 'PACKAGE_STORES_BEER_WINE_AND_LIQUOR'
    | 'PAINTS_VARNISHES_AND_SUPPLIES'
    | 'PARKING_LOTS_GARAGES'
    | 'PASSENGER_RAILWAYS'
    | 'PAWN_SHOPS'
    | 'PET_SHOPS_PET_FOOD_AND_SUPPLIES'
    | 'PETROLEUM_AND_PETROLEUM_PRODUCTS'
    | 'PHOTO_DEVELOPING'
    | 'PHOTOGRAPHIC_STUDIOS'
    | 'PHOTOGRAPHIC_PHOTOCOPY_MICROFILM_EQUIPMENT_AND_SUPPLIES'
    | 'PICTURE_VIDEO_PRODUCTION'
    | 'PIECE_GOODS_NOTIONS_AND_OTHER_DRY_GOODS'
    | 'PLUMBING_HEATING_EQUIPMENT_AND_SUPPLIES'
    | 'POLITICAL_ORGANIZATIONS'
    | 'POSTAL_SERVICES_GOVERNMENT_ONLY'
    | 'PRECIOUS_STONES_AND_METALS_WATCHES_AND_JEWELRY'
    | 'PROFESSIONAL_SERVICES'
    | 'PUBLIC_WAREHOUSING_AND_STORAGE'
    | 'QUICK_COPY_REPRO_AND_BLUEPRINT'
    | 'RAILROADS'
    | 'REAL_ESTATE_AGENTS_AND_MANAGERS_RENTALS'
    | 'RECORD_STORES'
    | 'RECREATIONAL_VEHICLE_RENTALS'
    | 'RELIGIOUS_GOODS_STORES'
    | 'RELIGIOUS_ORGANIZATIONS'
    | 'ROOFING_SIDING_SHEET_METAL'
    | 'SECRETARIAL_SUPPORT_SERVICES'
    | 'SECURITY_BROKERS_DEALERS'
    | 'SERVICE_STATIONS'
    | 'SEWING_NEEDLEWORK_FABRIC_AND_PIECE_GOODS_STORES'
    | 'SHOE_REPAIR_HAT_CLEANING'
    | 'SHOE_STORES'
    | 'SMALL_APPLIANCE_REPAIR'
    | 'SNOWMOBILE_DEALERS'
    | 'SPECIAL_TRADE_SERVICES'
    | 'SPECIALTY_CLEANING'
    | 'SPORTING_GOODS_STORES'
    | 'SPORTING_RECREATION_CAMPS'
    | 'SPORTS_CLUBS_FIELDS'
    | 'SPORTS_AND_RIDING_APPAREL_STORES'
    | 'STAMP_AND_COIN_STORES'
    | 'STATIONARY_OFFICE_SUPPLIES_PRINTING_AND_WRITING_PAPER'
    | 'STATIONERY_STORES_OFFICE_AND_SCHOOL_SUPPLY_STORES'
    | 'SWIMMING_POOLS_SALES'
    | 'T_UI_TRAVEL_GERMANY'
    | 'TAILORS_ALTERATIONS'
    | 'TAX_PAYMENTS_GOVERNMENT_AGENCIES'
    | 'TAX_PREPARATION_SERVICES'
    | 'TAXICABS_LIMOUSINES'
    | 'TELECOMMUNICATION_EQUIPMENT_AND_TELEPHONE_SALES'
    | 'TELECOMMUNICATION_SERVICES'
    | 'TELEGRAPH_SERVICES'
    | 'TENT_AND_AWNING_SHOPS'
    | 'TESTING_LABORATORIES'
    | 'THEATRICAL_TICKET_AGENCIES'
    | 'TIMESHARES'
    | 'TIRE_RETREADING_AND_REPAIR'
    | 'TOLLS_BRIDGE_FEES'
    | 'TOURIST_ATTRACTIONS_AND_EXHIBITS'
    | 'TOWING_SERVICES'
    | 'TRAILER_PARKS_CAMPGROUNDS'
    | 'TRANSPORTATION_SERVICES'
    | 'TRAVEL_AGENCIES_TOUR_OPERATORS'
    | 'TRUCK_STOP_ITERATION'
    | 'TRUCK_UTILITY_TRAILER_RENTALS'
    | 'TYPESETTING_PLATE_MAKING_AND_RELATED_SERVICES'
    | 'TYPEWRITER_STORES'
    | 'U_S_FEDERAL_GOVERNMENT_AGENCIES_OR_DEPARTMENTS'
    | 'UNIFORMS_COMMERCIAL_CLOTHING'
    | 'USED_MERCHANDISE_AND_SECONDHAND_STORES'
    | 'UTILITIES'
    | 'VARIETY_STORES'
    | 'VETERINARY_SERVICES'
    | 'VIDEO_AMUSEMENT_GAME_SUPPLIES'
    | 'VIDEO_GAME_ARCADES'
    | 'VIDEO_TAPE_RENTAL_STORES'
    | 'VOCATIONAL_TRADE_SCHOOLS'
    | 'WATCH_JEWELRY_REPAIR'
    | 'WELDING_REPAIR'
    | 'WHOLESALE_CLUBS'
    | 'WIG_AND_TOUPEE_STORES'
    | 'WIRES_MONEY_ORDERS'
    | 'WOMENS_ACCESSORY_AND_SPECIALTY_SHOPS'
    | 'WOMENS_READY_TO_WEAR_STORES'
    | 'WRECKING_AND_SALVAGE_YARDS';
  amount?: Amount;
}

export interface MerchantChartData {
  merchant?: MerchantInfo;
  amount?: Amount;
}

export interface MerchantInfo {
  name?: string;
  type?:
    | 'UNKNOWN'
    | 'AC_REFRIGERATION_REPAIR'
    | 'ACCOUNTING_BOOKKEEPING_SERVICES'
    | 'ADVERTISING_SERVICES'
    | 'AGRICULTURAL_COOPERATIVE'
    | 'AIRLINES_AIR_CARRIERS'
    | 'AIRPORTS_FLYING_FIELDS'
    | 'AMBULANCE_SERVICES'
    | 'AMUSEMENT_PARKS_CARNIVALS'
    | 'ANTIQUE_REPRODUCTIONS'
    | 'ANTIQUE_SHOPS'
    | 'AQUARIUMS'
    | 'ARCHITECTURAL_SURVEYING_SERVICES'
    | 'ART_DEALERS_AND_GALLERIES'
    | 'ARTISTS_SUPPLY_AND_CRAFT_SHOPS'
    | 'AUTO_BODY_REPAIR_SHOPS'
    | 'AUTO_PAINT_SHOPS'
    | 'AUTO_SERVICE_SHOPS'
    | 'AUTO_AND_HOME_SUPPLY_STORES'
    | 'AUTOMATED_CASH_DISBURSE'
    | 'AUTOMATED_FUEL_DISPENSERS'
    | 'AUTOMOBILE_ASSOCIATIONS'
    | 'AUTOMOTIVE_PARTS_AND_ACCESSORIES_STORES'
    | 'AUTOMOTIVE_TIRE_STORES'
    | 'BAIL_AND_BOND_PAYMENTS'
    | 'BAKERIES'
    | 'BANDS_ORCHESTRAS'
    | 'BARBER_AND_BEAUTY_SHOPS'
    | 'BETTING_CASINO_GAMBLING'
    | 'BICYCLE_SHOPS'
    | 'BILLIARD_POOL_ESTABLISHMENTS'
    | 'BOAT_DEALERS'
    | 'BOAT_RENTALS_AND_LEASES'
    | 'BOOK_STORES'
    | 'BOOKS_PERIODICALS_AND_NEWSPAPERS'
    | 'BOWLING_ALLEYS'
    | 'BUS_LINES'
    | 'BUSINESS_SECRETARIAL_SCHOOLS'
    | 'BUYING_SHOPPING_SERVICES'
    | 'CABLE_SATELLITE_AND_OTHER_PAY_TELEVISION_AND_RADIO'
    | 'CAMERA_AND_PHOTOGRAPHIC_SUPPLY_STORES'
    | 'CANDY_NUT_AND_CONFECTIONERY_STORES'
    | 'CAR_RENTAL_AGENCIES'
    | 'CAR_WASHES'
    | 'CAR_AND_TRUCK_DEALERS_NEW_USED'
    | 'CAR_AND_TRUCK_DEALERS_USED_ONLY'
    | 'CARPENTRY_SERVICES'
    | 'CARPET_UPHOLSTERY_CLEANING'
    | 'CATERERS'
    | 'CHARITABLE_AND_SOCIAL_SERVICE_ORGANIZATIONS_FUNDRAISING'
    | 'CHEMICALS_AND_ALLIED_PRODUCTS'
    | 'CHILD_CARE_SERVICES'
    | 'CHILDRENS_AND_INFANTS_WEAR_STORES'
    | 'CHIROPODISTS_PODIATRISTS'
    | 'CHIROPRACTORS'
    | 'CIGAR_STORES_AND_STANDS'
    | 'CIVIC_SOCIAL_FRATERNAL_ASSOCIATIONS'
    | 'CLEANING_AND_MAINTENANCE'
    | 'CLOTHING_RENTAL'
    | 'COLLEGES_UNIVERSITIES'
    | 'COMMERCIAL_EQUIPMENT'
    | 'COMMERCIAL_FOOTWEAR'
    | 'COMMERCIAL_PHOTOGRAPHY_ART_AND_GRAPHICS'
    | 'COMMUTER_TRANSPORT_AND_FERRIES'
    | 'COMPUTER_NETWORK_SERVICES'
    | 'COMPUTER_PROGRAMMING'
    | 'COMPUTER_REPAIR'
    | 'COMPUTER_SOFTWARE_STORES'
    | 'COMPUTERS_PERIPHERALS_AND_SOFTWARE'
    | 'CONCRETE_WORK_SERVICES'
    | 'CONSTRUCTION_MATERIALS'
    | 'CONSULTING_PUBLIC_RELATIONS'
    | 'CORRESPONDENCE_SCHOOLS'
    | 'COSMETIC_STORES'
    | 'COUNSELING_SERVICES'
    | 'COUNTRY_CLUBS'
    | 'COURIER_SERVICES'
    | 'COURT_COSTS'
    | 'CREDIT_REPORTING_AGENCIES'
    | 'CRUISE_LINES'
    | 'DAIRY_PRODUCTS_STORES'
    | 'DANCE_HALL_STUDIOS_SCHOOLS'
    | 'DATING_ESCORT_SERVICES'
    | 'DENTISTS_ORTHODONTISTS'
    | 'DEPARTMENT_STORES'
    | 'DETECTIVE_AGENCIES'
    | 'DIGITAL_GOODS_MEDIA'
    | 'DIGITAL_GOODS_APPLICATIONS'
    | 'DIGITAL_GOODS_GAMES'
    | 'DIGITAL_GOODS_LARGE_VOLUME'
    | 'DIRECT_MARKETING_CATALOG_MERCHANT'
    | 'DIRECT_MARKETING_COMBINATION_CATALOG_AND_RETAIL_MERCHANT'
    | 'DIRECT_MARKETING_INBOUND_TELEMARKETING'
    | 'DIRECT_MARKETING_INSURANCE_SERVICES'
    | 'DIRECT_MARKETING_OTHER'
    | 'DIRECT_MARKETING_OUTBOUND_TELEMARKETING'
    | 'DIRECT_MARKETING_SUBSCRIPTION'
    | 'DIRECT_MARKETING_TRAVEL'
    | 'DISCOUNT_STORES'
    | 'DOCTORS'
    | 'DOOR_TO_DOOR_SALES'
    | 'DRAPERY_WINDOW_COVERING_AND_UPHOLSTERY_STORES'
    | 'DRINKING_PLACES'
    | 'DRUG_STORES_AND_PHARMACIES'
    | 'DRUGS_DRUG_PROPRIETARIES_AND_DRUGGIST_SUNDRIES'
    | 'DRY_CLEANERS'
    | 'DURABLE_GOODS'
    | 'DUTY_FREE_STORES'
    | 'EATING_PLACES_RESTAURANTS'
    | 'EDUCATIONAL_SERVICES'
    | 'ELECTRIC_RAZOR_STORES'
    | 'ELECTRICAL_PARTS_AND_EQUIPMENT'
    | 'ELECTRICAL_SERVICES'
    | 'ELECTRONICS_REPAIR_SHOPS'
    | 'ELECTRONICS_STORES'
    | 'ELEMENTARY_SECONDARY_SCHOOLS'
    | 'EMPLOYMENT_TEMP_AGENCIES'
    | 'EQUIPMENT_RENTAL'
    | 'EXTERMINATING_SERVICES'
    | 'FAMILY_CLOTHING_STORES'
    | 'FAST_FOOD_RESTAURANTS'
    | 'FINANCIAL_INSTITUTIONS'
    | 'FINES_GOVERNMENT_ADMINISTRATIVE_ENTITIES'
    | 'FIREPLACE_FIREPLACE_SCREENS_AND_ACCESSORIES_STORES'
    | 'FLOOR_COVERING_STORES'
    | 'FLORISTS'
    | 'FLORISTS_SUPPLIES_NURSERY_STOCK_AND_FLOWERS'
    | 'FREEZER_AND_LOCKER_MEAT_PROVISIONERS'
    | 'FUEL_DEALERS_NON_AUTOMOTIVE'
    | 'FUNERAL_SERVICES_CREMATORIES'
    | 'FURNITURE_REPAIR_REFINISHING'
    | 'FURNITURE_HOME_FURNISHINGS_AND_EQUIPMENT_STORES_EXCEPT_APPLIANCES'
    | 'FURRIERS_AND_FUR_SHOPS'
    | 'GENERAL_SERVICES'
    | 'GIFT_CARD_NOVELTY_AND_SOUVENIR_SHOPS'
    | 'GLASS_PAINT_AND_WALLPAPER_STORES'
    | 'GLASSWARE_CRYSTAL_STORES'
    | 'GOLF_COURSES_PUBLIC'
    | 'GOVERNMENT_SERVICES'
    | 'GROCERY_STORES_SUPERMARKETS'
    | 'HARDWARE_STORES'
    | 'HARDWARE_EQUIPMENT_AND_SUPPLIES'
    | 'HEALTH_AND_BEAUTY_SPAS'
    | 'HEARING_AIDS_SALES_AND_SUPPLIES'
    | 'HEATING_PLUMBING_A_C'
    | 'HOBBY_TOY_AND_GAME_SHOPS'
    | 'HOME_SUPPLY_WAREHOUSE_STORES'
    | 'HOSPITALS'
    | 'HOTELS_MOTELS_AND_RESORTS'
    | 'HOUSEHOLD_APPLIANCE_STORES'
    | 'INDUSTRIAL_SUPPLIES'
    | 'INFORMATION_RETRIEVAL_SERVICES'
    | 'INSURANCE_DEFAULT'
    | 'INSURANCE_UNDERWRITING_PREMIUMS'
    | 'INTRA_COMPANY_PURCHASES'
    | 'JEWELRY_STORES_WATCHES_CLOCKS_AND_SILVERWARE_STORES'
    | 'LANDSCAPING_SERVICES'
    | 'LAUNDRIES'
    | 'LAUNDRY_CLEANING_SERVICES'
    | 'LEGAL_SERVICES_ATTORNEYS'
    | 'LUGGAGE_AND_LEATHER_GOODS_STORES'
    | 'LUMBER_BUILDING_MATERIALS_STORES'
    | 'MANUAL_CASH_DISBURSE'
    | 'MARINAS_SERVICE_AND_SUPPLIES'
    | 'MASONRY_STONEWORK_AND_PLASTER'
    | 'MASSAGE_PARLORS'
    | 'MEDICAL_SERVICES'
    | 'MEDICAL_AND_DENTAL_LABS'
    | 'MEDICAL_DENTAL_OPHTHALMIC_AND_HOSPITAL_EQUIPMENT_AND_SUPPLIES'
    | 'MEMBERSHIP_ORGANIZATIONS'
    | 'MENS_AND_BOYS_CLOTHING_AND_ACCESSORIES_STORES'
    | 'MENS_WOMENS_CLOTHING_STORES'
    | 'METAL_SERVICE_CENTERS'
    | 'MISCELLANEOUS_APPAREL_AND_ACCESSORY_SHOPS'
    | 'MISCELLANEOUS_AUTO_DEALERS'
    | 'MISCELLANEOUS_BUSINESS_SERVICES'
    | 'MISCELLANEOUS_FOOD_STORES'
    | 'MISCELLANEOUS_GENERAL_MERCHANDISE'
    | 'MISCELLANEOUS_GENERAL_SERVICES'
    | 'MISCELLANEOUS_HOME_FURNISHING_SPECIALTY_STORES'
    | 'MISCELLANEOUS_PUBLISHING_AND_PRINTING'
    | 'MISCELLANEOUS_RECREATION_SERVICES'
    | 'MISCELLANEOUS_REPAIR_SHOPS'
    | 'MISCELLANEOUS_SPECIALTY_RETAIL'
    | 'MOBILE_HOME_DEALERS'
    | 'MOTION_PICTURE_THEATERS'
    | 'MOTOR_FREIGHT_CARRIERS_AND_TRUCKING'
    | 'MOTOR_HOMES_DEALERS'
    | 'MOTOR_VEHICLE_SUPPLIES_AND_NEW_PARTS'
    | 'MOTORCYCLE_SHOPS_AND_DEALERS'
    | 'MOTORCYCLE_SHOPS_DEALERS'
    | 'MUSIC_STORES_MUSICAL_INSTRUMENTS_PIANOS_AND_SHEET_MUSIC'
    | 'NEWS_DEALERS_AND_NEWSSTANDS'
    | 'NON_FI_MONEY_ORDERS'
    | 'NON_FI_STORED_VALUE_CARD_PURCHASE_LOAD'
    | 'NONDURABLE_GOODS'
    | 'NURSERIES_LAWN_AND_GARDEN_SUPPLY_STORES'
    | 'NURSING_PERSONAL_CARE'
    | 'OFFICE_AND_COMMERCIAL_FURNITURE'
    | 'OPTICIANS_EYEGLASSES'
    | 'OPTOMETRISTS_OPHTHALMOLOGIST'
    | 'ORTHOPEDIC_GOODS_PROSTHETIC_DEVICES'
    | 'OSTEOPATHS'
    | 'PACKAGE_STORES_BEER_WINE_AND_LIQUOR'
    | 'PAINTS_VARNISHES_AND_SUPPLIES'
    | 'PARKING_LOTS_GARAGES'
    | 'PASSENGER_RAILWAYS'
    | 'PAWN_SHOPS'
    | 'PET_SHOPS_PET_FOOD_AND_SUPPLIES'
    | 'PETROLEUM_AND_PETROLEUM_PRODUCTS'
    | 'PHOTO_DEVELOPING'
    | 'PHOTOGRAPHIC_STUDIOS'
    | 'PHOTOGRAPHIC_PHOTOCOPY_MICROFILM_EQUIPMENT_AND_SUPPLIES'
    | 'PICTURE_VIDEO_PRODUCTION'
    | 'PIECE_GOODS_NOTIONS_AND_OTHER_DRY_GOODS'
    | 'PLUMBING_HEATING_EQUIPMENT_AND_SUPPLIES'
    | 'POLITICAL_ORGANIZATIONS'
    | 'POSTAL_SERVICES_GOVERNMENT_ONLY'
    | 'PRECIOUS_STONES_AND_METALS_WATCHES_AND_JEWELRY'
    | 'PROFESSIONAL_SERVICES'
    | 'PUBLIC_WAREHOUSING_AND_STORAGE'
    | 'QUICK_COPY_REPRO_AND_BLUEPRINT'
    | 'RAILROADS'
    | 'REAL_ESTATE_AGENTS_AND_MANAGERS_RENTALS'
    | 'RECORD_STORES'
    | 'RECREATIONAL_VEHICLE_RENTALS'
    | 'RELIGIOUS_GOODS_STORES'
    | 'RELIGIOUS_ORGANIZATIONS'
    | 'ROOFING_SIDING_SHEET_METAL'
    | 'SECRETARIAL_SUPPORT_SERVICES'
    | 'SECURITY_BROKERS_DEALERS'
    | 'SERVICE_STATIONS'
    | 'SEWING_NEEDLEWORK_FABRIC_AND_PIECE_GOODS_STORES'
    | 'SHOE_REPAIR_HAT_CLEANING'
    | 'SHOE_STORES'
    | 'SMALL_APPLIANCE_REPAIR'
    | 'SNOWMOBILE_DEALERS'
    | 'SPECIAL_TRADE_SERVICES'
    | 'SPECIALTY_CLEANING'
    | 'SPORTING_GOODS_STORES'
    | 'SPORTING_RECREATION_CAMPS'
    | 'SPORTS_CLUBS_FIELDS'
    | 'SPORTS_AND_RIDING_APPAREL_STORES'
    | 'STAMP_AND_COIN_STORES'
    | 'STATIONARY_OFFICE_SUPPLIES_PRINTING_AND_WRITING_PAPER'
    | 'STATIONERY_STORES_OFFICE_AND_SCHOOL_SUPPLY_STORES'
    | 'SWIMMING_POOLS_SALES'
    | 'T_UI_TRAVEL_GERMANY'
    | 'TAILORS_ALTERATIONS'
    | 'TAX_PAYMENTS_GOVERNMENT_AGENCIES'
    | 'TAX_PREPARATION_SERVICES'
    | 'TAXICABS_LIMOUSINES'
    | 'TELECOMMUNICATION_EQUIPMENT_AND_TELEPHONE_SALES'
    | 'TELECOMMUNICATION_SERVICES'
    | 'TELEGRAPH_SERVICES'
    | 'TENT_AND_AWNING_SHOPS'
    | 'TESTING_LABORATORIES'
    | 'THEATRICAL_TICKET_AGENCIES'
    | 'TIMESHARES'
    | 'TIRE_RETREADING_AND_REPAIR'
    | 'TOLLS_BRIDGE_FEES'
    | 'TOURIST_ATTRACTIONS_AND_EXHIBITS'
    | 'TOWING_SERVICES'
    | 'TRAILER_PARKS_CAMPGROUNDS'
    | 'TRANSPORTATION_SERVICES'
    | 'TRAVEL_AGENCIES_TOUR_OPERATORS'
    | 'TRUCK_STOP_ITERATION'
    | 'TRUCK_UTILITY_TRAILER_RENTALS'
    | 'TYPESETTING_PLATE_MAKING_AND_RELATED_SERVICES'
    | 'TYPEWRITER_STORES'
    | 'U_S_FEDERAL_GOVERNMENT_AGENCIES_OR_DEPARTMENTS'
    | 'UNIFORMS_COMMERCIAL_CLOTHING'
    | 'USED_MERCHANDISE_AND_SECONDHAND_STORES'
    | 'UTILITIES'
    | 'VARIETY_STORES'
    | 'VETERINARY_SERVICES'
    | 'VIDEO_AMUSEMENT_GAME_SUPPLIES'
    | 'VIDEO_GAME_ARCADES'
    | 'VIDEO_TAPE_RENTAL_STORES'
    | 'VOCATIONAL_TRADE_SCHOOLS'
    | 'WATCH_JEWELRY_REPAIR'
    | 'WELDING_REPAIR'
    | 'WHOLESALE_CLUBS'
    | 'WIG_AND_TOUPEE_STORES'
    | 'WIRES_MONEY_ORDERS'
    | 'WOMENS_ACCESSORY_AND_SPECIALTY_SHOPS'
    | 'WOMENS_READY_TO_WEAR_STORES'
    | 'WRECKING_AND_SALVAGE_YARDS';
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
  type?: 'EMPLOYEE' | 'BUSINESS_OWNER';
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

  /** @format uuid */
  ownerId?: string;
}

export interface UpdateUserResponse {
  /** @format uuid */
  userId: string;

  /** Error message for any records that failed. Will be null if successful */
  errorMessage?: string;
}

export interface CardAndAccount {
  card?: Card;
  account?: Account;
}

export interface UpdateCardStatusRequest {
  /** @example CARDHOLDER_REQUESTED */
  statusReason?: 'NONE' | 'CARDHOLDER_REQUESTED' | 'USER_ARCHIVED' | 'LOST' | 'STOLEN';
}

export interface ActivateCardRequest {
  /** @pattern ^\d{4}$ */
  lastFour?: string;

  /** @example CARDHOLDER_REQUESTED */
  statusReason?: 'NONE' | 'CARDHOLDER_REQUESTED' | 'USER_ARCHIVED' | 'LOST' | 'STOLEN';
}

export interface UpdateAccountActivityRequest {
  notes: string;

  /** @format uuid */
  expenseCategoryId?: string;
  supplierId?: string;
  supplierName?: string;
}

export interface UpdateCodatLocationRequest {
  /** @format uuid */
  locationId?: string;
}

export interface UpdateCodatClassRequest {
  /** @format uuid */
  classId?: string;
}

export interface TermsAndConditionsResponse {
  /** @format uuid */
  userId?: string;

  /** @format date-time */
  acceptedTimestampByUser?: string;
  isAcceptedTermsAndConditions?: boolean;

  /** @format date-time */
  documentTimestamp?: string;
}

export interface UpdateCardSpendControlsRequest {
  allocationSpendControls?: CardAllocationSpendControls[];
}

export interface BusinessLimitOperationRecord {
  businessLimitType?: 'ACH_DEPOSIT' | 'ACH_WITHDRAW' | 'PURCHASE';
  limitOperationPeriods?: LimitPeriodOperationRecord[];
}

export interface BusinessLimitRecord {
  businessLimitType?: 'ACH_DEPOSIT' | 'ACH_WITHDRAW' | 'PURCHASE';
  limitPeriods?: LimitPeriodRecord[];
}

export interface BusinessSettings {
  limits?: LimitRecord[];
  operationLimits?: LimitOperationRecord[];

  /** @format int32 */
  issuedPhysicalCardsLimit?: number;

  /** @format int32 */
  issuedPhysicalCardsTotal?: number;
  foreignTransactionFeePercents?: number;
  achFundsAvailabilityMode?: 'STANDARD' | 'FAST' | 'IMMEDIATE';
  immediateAchFundsLimit?: number;
}

export interface LimitOperationRecord {
  currency?:
    | 'UNSPECIFIED'
    | 'AED'
    | 'AFN'
    | 'ALL'
    | 'AMD'
    | 'ANG'
    | 'AOA'
    | 'ARS'
    | 'AUD'
    | 'AWG'
    | 'AZN'
    | 'BAM'
    | 'BBD'
    | 'BDT'
    | 'BGN'
    | 'BHD'
    | 'BIF'
    | 'BMD'
    | 'BND'
    | 'BOB'
    | 'BRL'
    | 'BSD'
    | 'BTN'
    | 'BWP'
    | 'BYN'
    | 'BYR'
    | 'BZD'
    | 'CAD'
    | 'CDF'
    | 'CHF'
    | 'CLP'
    | 'CNY'
    | 'COP'
    | 'CRC'
    | 'CUC'
    | 'CUP'
    | 'CVE'
    | 'CZK'
    | 'DJF'
    | 'DKK'
    | 'DOP'
    | 'DZD'
    | 'EGP'
    | 'ERN'
    | 'ETB'
    | 'EUR'
    | 'FJD'
    | 'FKP'
    | 'GBP'
    | 'GEL'
    | 'GHS'
    | 'GIP'
    | 'GMD'
    | 'GNF'
    | 'GTQ'
    | 'GYD'
    | 'HKD'
    | 'HNL'
    | 'HRK'
    | 'HTG'
    | 'HUF'
    | 'IDR'
    | 'ILS'
    | 'INR'
    | 'IQD'
    | 'IRR'
    | 'ISK'
    | 'JMD'
    | 'JOD'
    | 'JPY'
    | 'KES'
    | 'KGS'
    | 'KHR'
    | 'KMF'
    | 'KPW'
    | 'KRW'
    | 'KWD'
    | 'KYD'
    | 'KZT'
    | 'LAK'
    | 'LBP'
    | 'LKR'
    | 'LRD'
    | 'LSL'
    | 'LTL'
    | 'LYD'
    | 'MAD'
    | 'MDL'
    | 'MGA'
    | 'MKD'
    | 'MMK'
    | 'MNT'
    | 'MOP'
    | 'MRO'
    | 'MRU'
    | 'MUR'
    | 'MVR'
    | 'MWK'
    | 'MXN'
    | 'MYR'
    | 'MZN'
    | 'NAD'
    | 'NGN'
    | 'NIO'
    | 'NOK'
    | 'NPR'
    | 'NZD'
    | 'OMR'
    | 'PAB'
    | 'PEN'
    | 'PGK'
    | 'PHP'
    | 'PKR'
    | 'PLN'
    | 'PYG'
    | 'QAR'
    | 'RON'
    | 'RSD'
    | 'RUB'
    | 'RUR'
    | 'RWF'
    | 'SAR'
    | 'SBD'
    | 'SCR'
    | 'SDG'
    | 'SEK'
    | 'SGD'
    | 'SHP'
    | 'SLL'
    | 'SOS'
    | 'SRD'
    | 'SSP'
    | 'STD'
    | 'STN'
    | 'SVC'
    | 'SYP'
    | 'SZL'
    | 'THB'
    | 'TJS'
    | 'TMT'
    | 'TND'
    | 'TOP'
    | 'TRY'
    | 'TTD'
    | 'TWD'
    | 'TZS'
    | 'UAH'
    | 'UGX'
    | 'USD'
    | 'UYU'
    | 'UZS'
    | 'VEF'
    | 'VES'
    | 'VND'
    | 'VUV'
    | 'WST'
    | 'XAF'
    | 'XCD'
    | 'XOF'
    | 'XPF'
    | 'YER'
    | 'ZAR'
    | 'ZMW'
    | 'ZWL';
  businessLimitOperations?: BusinessLimitOperationRecord[];
}

export interface LimitPeriodOperationRecord {
  period?: 'INSTANT' | 'DAILY' | 'WEEKLY' | 'MONTHLY';

  /** @format int32 */
  value?: number;
}

export interface LimitPeriodRecord {
  period?: 'INSTANT' | 'DAILY' | 'WEEKLY' | 'MONTHLY';
  value?: number;
}

export interface LimitRecord {
  currency?:
    | 'UNSPECIFIED'
    | 'AED'
    | 'AFN'
    | 'ALL'
    | 'AMD'
    | 'ANG'
    | 'AOA'
    | 'ARS'
    | 'AUD'
    | 'AWG'
    | 'AZN'
    | 'BAM'
    | 'BBD'
    | 'BDT'
    | 'BGN'
    | 'BHD'
    | 'BIF'
    | 'BMD'
    | 'BND'
    | 'BOB'
    | 'BRL'
    | 'BSD'
    | 'BTN'
    | 'BWP'
    | 'BYN'
    | 'BYR'
    | 'BZD'
    | 'CAD'
    | 'CDF'
    | 'CHF'
    | 'CLP'
    | 'CNY'
    | 'COP'
    | 'CRC'
    | 'CUC'
    | 'CUP'
    | 'CVE'
    | 'CZK'
    | 'DJF'
    | 'DKK'
    | 'DOP'
    | 'DZD'
    | 'EGP'
    | 'ERN'
    | 'ETB'
    | 'EUR'
    | 'FJD'
    | 'FKP'
    | 'GBP'
    | 'GEL'
    | 'GHS'
    | 'GIP'
    | 'GMD'
    | 'GNF'
    | 'GTQ'
    | 'GYD'
    | 'HKD'
    | 'HNL'
    | 'HRK'
    | 'HTG'
    | 'HUF'
    | 'IDR'
    | 'ILS'
    | 'INR'
    | 'IQD'
    | 'IRR'
    | 'ISK'
    | 'JMD'
    | 'JOD'
    | 'JPY'
    | 'KES'
    | 'KGS'
    | 'KHR'
    | 'KMF'
    | 'KPW'
    | 'KRW'
    | 'KWD'
    | 'KYD'
    | 'KZT'
    | 'LAK'
    | 'LBP'
    | 'LKR'
    | 'LRD'
    | 'LSL'
    | 'LTL'
    | 'LYD'
    | 'MAD'
    | 'MDL'
    | 'MGA'
    | 'MKD'
    | 'MMK'
    | 'MNT'
    | 'MOP'
    | 'MRO'
    | 'MRU'
    | 'MUR'
    | 'MVR'
    | 'MWK'
    | 'MXN'
    | 'MYR'
    | 'MZN'
    | 'NAD'
    | 'NGN'
    | 'NIO'
    | 'NOK'
    | 'NPR'
    | 'NZD'
    | 'OMR'
    | 'PAB'
    | 'PEN'
    | 'PGK'
    | 'PHP'
    | 'PKR'
    | 'PLN'
    | 'PYG'
    | 'QAR'
    | 'RON'
    | 'RSD'
    | 'RUB'
    | 'RUR'
    | 'RWF'
    | 'SAR'
    | 'SBD'
    | 'SCR'
    | 'SDG'
    | 'SEK'
    | 'SGD'
    | 'SHP'
    | 'SLL'
    | 'SOS'
    | 'SRD'
    | 'SSP'
    | 'STD'
    | 'STN'
    | 'SVC'
    | 'SYP'
    | 'SZL'
    | 'THB'
    | 'TJS'
    | 'TMT'
    | 'TND'
    | 'TOP'
    | 'TRY'
    | 'TTD'
    | 'TWD'
    | 'TZS'
    | 'UAH'
    | 'UGX'
    | 'USD'
    | 'UYU'
    | 'UZS'
    | 'VEF'
    | 'VES'
    | 'VND'
    | 'VUV'
    | 'WST'
    | 'XAF'
    | 'XCD'
    | 'XOF'
    | 'XPF'
    | 'YER'
    | 'ZAR'
    | 'ZMW'
    | 'ZWL';
  businessLimits?: BusinessLimitRecord[];
}

export interface ChangeMethodRequest {
  /** @format uuid */
  userId?: string;

  /** @format uuid */
  businessId?: string;
  destination?: string;
  method?: 'sms' | 'email';
  trustChallenge?: string;
  twoFactorId?: string;
  twoFactorCode?: string;
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
  limits?: CurrencyLimit[];
  disabledMccGroups?: (
    | 'CHILD_CARE'
    | 'DIGITAL_GOODS'
    | 'EDUCATION'
    | 'ENTERTAINMENT'
    | 'FOOD_BEVERAGE'
    | 'GAMBLING'
    | 'GOVERNMENT'
    | 'HEALTH'
    | 'MEMBERSHIPS'
    | 'MONEY_TRANSFER'
    | 'SERVICES'
    | 'SHOPPING'
    | 'TRAVEL'
    | 'UTILITIES'
    | 'OTHER'
  )[];
  disabledPaymentTypes?: ('POS' | 'ONLINE' | 'MANUAL_ENTRY')[];
  disableForeign?: boolean;
}

export interface AllocationDetailsResponse {
  allocation?: Allocation;
  limits?: CurrencyLimit[];
  disabledMccGroups?: (
    | 'CHILD_CARE'
    | 'DIGITAL_GOODS'
    | 'EDUCATION'
    | 'ENTERTAINMENT'
    | 'FOOD_BEVERAGE'
    | 'GAMBLING'
    | 'GOVERNMENT'
    | 'HEALTH'
    | 'MEMBERSHIPS'
    | 'MONEY_TRANSFER'
    | 'SERVICES'
    | 'SHOPPING'
    | 'TRAVEL'
    | 'UTILITIES'
    | 'OTHER'
  )[];
  disabledPaymentTypes?: ('POS' | 'ONLINE' | 'MANUAL_ENTRY')[];
  disableForeign?: boolean;
}

export interface StopAllCardsRequest {
  applyToChildAllocations?: boolean;
  cancelVirtualCards?: boolean;
  stopPhysicalCardsType?: 'CANCEL' | 'UNLINK' | 'NONE';
}

export interface StopAllCardsResponse {
  cancelledCards?: string[];
  unlinkedCards?: string[];
}

export interface ArchiveAllocationResponse {
  archivedAllocationIds?: string[];
}

export interface AllocationAutoTopUpConfigUpdateRequest {
  /** @format uuid */
  id: string;

  /** @format int32 */
  monthlyDay: number;
  amount: Amount;
  active: boolean;
}

export interface User {
  /** @format uuid */
  userId?: string;

  /** @format uuid */
  businessId?: string;
  type?: 'EMPLOYEE' | 'BUSINESS_OWNER';
  firstName?: string;
  lastName?: string;
  address?: Address;
  email?: string;
  phone?: string;
  archived?: boolean;
  relationshipToBusiness?: RelationshipToBusiness;
}

export interface Receipt {
  /** @format uuid */
  receiptId: string;

  /** @format date-time */
  created: string;

  /** @format uuid */
  businessId: string;

  /** @format uuid */
  allocationId: string;

  /** @format uuid */
  accountId?: string;
  amount: Amount;
}

export interface CardAccount {
  /**
   * @format uuid
   * @example c9609768-647d-4f00-b755-e474cc761c33
   */
  allocationId?: string;

  /**
   * @format uuid
   * @example 54826974-c2e3-4eee-a305-ba6f847748e8
   */
  accountId?: string;

  /** @example ALLOCATION */
  accountType?: 'ALLOCATION' | 'CARD';
  ledgerBalance?: Amount;
}

export interface UserAllocationRolesResponse {
  userRolesAndPermissionsList: UserRolesAndPermissionsRecord[];
}

export interface UserRolesAndPermissionsRecord {
  /** @format uuid */
  allocationId: string;

  /** @format uuid */
  parentAllocationId?: string;
  user?: UserData;
  allocationRole?: string;
  inherited?: boolean;
  allocationPermissions?: (
    | 'READ'
    | 'CATEGORIZE'
    | 'LINK_RECEIPTS'
    | 'EMPLOYEE'
    | 'MANAGE_FUNDS'
    | 'MANAGE_CARDS'
    | 'MANAGE_USERS'
    | 'MANAGE_PERMISSIONS'
    | 'MANAGE_CONNECTIONS'
    | 'VIEW_OWN'
    | 'LINK_BANK_ACCOUNTS'
    | 'MANAGE_CATEGORIES'
  )[];
  globalUserPermissions?: (
    | 'BATCH_ONBOARD'
    | 'CROSS_BUSINESS_BOUNDARY'
    | 'GLOBAL_READ'
    | 'CUSTOMER_SERVICE'
    | 'CUSTOMER_SERVICE_MANAGER'
    | 'APPLICATION'
  )[];
}

export interface AllocationsAndPermissionsResponse {
  allocations?: Allocation[];
  userRoles?: UserRolesAndPermissionsRecord[];
}

export interface PartnerBusiness {
  /** @format uuid */
  businessId?: string;
  status?: 'ONBOARDING' | 'ACTIVE' | 'SUSPENDED' | 'CLOSED';
  legalName?: string;
  onboardingStep?:
    | 'BUSINESS'
    | 'BUSINESS_OWNERS'
    | 'SOFT_FAIL'
    | 'REVIEW'
    | 'LINK_ACCOUNT'
    | 'TRANSFER_MONEY'
    | 'COMPLETE';
  businessName?: string;
  ledgerBalance?: Amount;
}

export interface CreateTestDataResponse {
  businesses?: TestBusiness[];
}

export interface CreateUpdateUserRecord {
  user?: User;
  password?: string;
}

export interface TestBusiness {
  business?: Business;
  allocations?: Allocation[];
  cards?: Card[];
  createUserRecords?: CreateUpdateUserRecord[];
}

export interface GetBusinessesResponse {
  businesses?: Business[];
}

export interface BusinessOwner {
  /** @format uuid */
  businessId?: string;
  type?: 'UNSPECIFIED' | 'PRINCIPLE_OWNER' | 'ULTIMATE_BENEFICIAL_OWNER';
  firstName?: NullableEncryptedString;
  lastName?: NullableEncryptedString;
  title?: string;
  relationshipOwner?: boolean;
  relationshipRepresentative?: boolean;
  relationshipExecutive?: boolean;
  relationshipDirector?: boolean;
  percentageOwnership?: number;
  address?: Address;
  taxIdentificationNumber?: NullableEncryptedString;
  email?: string;
  phone?: string;

  /** @format date */
  dateOfBirth?: string;
  countryOfCitizenship?:
    | 'UNSPECIFIED'
    | 'ABW'
    | 'AFG'
    | 'AGO'
    | 'AIA'
    | 'ALA'
    | 'ALB'
    | 'AND'
    | 'ANT'
    | 'ARE'
    | 'ARG'
    | 'ARM'
    | 'ASM'
    | 'ATA'
    | 'ATF'
    | 'ATG'
    | 'AUS'
    | 'AUT'
    | 'AZE'
    | 'BDI'
    | 'BEL'
    | 'BEN'
    | 'BFA'
    | 'BGD'
    | 'BGR'
    | 'BHR'
    | 'BHS'
    | 'BIH'
    | 'BLM'
    | 'BLR'
    | 'BLZ'
    | 'BMU'
    | 'BOL'
    | 'BRA'
    | 'BRB'
    | 'BRN'
    | 'BTN'
    | 'BVT'
    | 'BWA'
    | 'CAF'
    | 'CAN'
    | 'CCK'
    | 'CHE'
    | 'CHL'
    | 'CHN'
    | 'CIV'
    | 'CMR'
    | 'COD'
    | 'COG'
    | 'COK'
    | 'COL'
    | 'COM'
    | 'CPV'
    | 'CRI'
    | 'CUB'
    | 'CXR'
    | 'CYM'
    | 'CYP'
    | 'CZE'
    | 'DEU'
    | 'DJI'
    | 'DMA'
    | 'DNK'
    | 'DOM'
    | 'DZA'
    | 'ECU'
    | 'EGY'
    | 'ERI'
    | 'ESH'
    | 'ESP'
    | 'EST'
    | 'ETH'
    | 'FIN'
    | 'FJI'
    | 'FLK'
    | 'FRA'
    | 'FRO'
    | 'FSM'
    | 'GAB'
    | 'GBR'
    | 'GEO'
    | 'GGY'
    | 'GHA'
    | 'GIB'
    | 'GIN'
    | 'GLP'
    | 'GMB'
    | 'GNB'
    | 'GNQ'
    | 'GRC'
    | 'GRD'
    | 'GRL'
    | 'GTM'
    | 'GUF'
    | 'GUM'
    | 'GUY'
    | 'HKG'
    | 'HMD'
    | 'HND'
    | 'HRV'
    | 'HTI'
    | 'HUN'
    | 'IDN'
    | 'IMN'
    | 'IND'
    | 'IOT'
    | 'IRL'
    | 'IRN'
    | 'IRQ'
    | 'ISL'
    | 'ISR'
    | 'ITA'
    | 'JAM'
    | 'JEY'
    | 'JOR'
    | 'JPN'
    | 'KAZ'
    | 'KEN'
    | 'KGZ'
    | 'KHM'
    | 'KIR'
    | 'KNA'
    | 'KOR'
    | 'KWT'
    | 'LAO'
    | 'LBN'
    | 'LBR'
    | 'LBY'
    | 'LCA'
    | 'LIE'
    | 'LKA'
    | 'LSO'
    | 'LTU'
    | 'LUX'
    | 'LVA'
    | 'MAC'
    | 'MAF'
    | 'MAR'
    | 'MCO'
    | 'MDA'
    | 'MDG'
    | 'MDV'
    | 'MEX'
    | 'MHL'
    | 'MKD'
    | 'MLI'
    | 'MLT'
    | 'MMR'
    | 'MNE'
    | 'MNG'
    | 'MNP'
    | 'MOZ'
    | 'MRT'
    | 'MSR'
    | 'MTQ'
    | 'MUS'
    | 'MWI'
    | 'MYS'
    | 'MYT'
    | 'NAM'
    | 'NCL'
    | 'NER'
    | 'NFK'
    | 'NGA'
    | 'NIC'
    | 'NIU'
    | 'NLD'
    | 'NOR'
    | 'NPL'
    | 'NRU'
    | 'NZL'
    | 'OMN'
    | 'PAK'
    | 'PAN'
    | 'PCN'
    | 'PER'
    | 'PHL'
    | 'PLW'
    | 'PNG'
    | 'POL'
    | 'PRI'
    | 'PRK'
    | 'PRT'
    | 'PRY'
    | 'PSE'
    | 'PYF'
    | 'QAT'
    | 'REU'
    | 'ROU'
    | 'RUS'
    | 'RWA'
    | 'SAU'
    | 'SDN'
    | 'SEN'
    | 'SGP'
    | 'SGS'
    | 'SHN'
    | 'SJM'
    | 'SLB'
    | 'SLE'
    | 'SLV'
    | 'SMR'
    | 'SOM'
    | 'SPM'
    | 'SRB'
    | 'SSD'
    | 'STP'
    | 'SUR'
    | 'SVK'
    | 'SVN'
    | 'SWE'
    | 'SWZ'
    | 'SYC'
    | 'SYR'
    | 'TCA'
    | 'TCD'
    | 'TGO'
    | 'THA'
    | 'TJK'
    | 'TKL'
    | 'TKM'
    | 'TLS'
    | 'TON'
    | 'TTO'
    | 'TUN'
    | 'TUR'
    | 'TUV'
    | 'TWN'
    | 'TZA'
    | 'UGA'
    | 'UKR'
    | 'UMI'
    | 'URY'
    | 'USA'
    | 'UZB'
    | 'VAT'
    | 'VCT'
    | 'VEN'
    | 'VGB'
    | 'VIR'
    | 'VNM'
    | 'VUT'
    | 'WLF'
    | 'WSM'
    | 'YEM'
    | 'ZAF'
    | 'ZMB'
    | 'ZWE';
  subjectRef?: string;
  knowYourCustomerStatus?: 'PENDING' | 'REVIEW' | 'FAIL' | 'PASS';
  status?: 'ACTIVE' | 'RETIRED';
  stripePersonReference?: string;

  /** @format int64 */
  version?: number;

  /** @format date-time */
  created?: string;

  /** @format date-time */
  updated?: string;

  /** @format uuid */
  id?: string;
}

export interface BusinessRecord {
  business?: Business;
  businessOwners?: BusinessOwner[];
  user?: User;
  allocation?: Allocation;
}

export interface NullableEncryptedString {
  encrypted?: string;
}

export interface SyncCountResponse {
  /** @format int32 */
  count?: number;
}

export interface CodatCategory {
  /** @format uuid */
  businessId?: string;
  codatCategoryId?: string;
  originalName?: string;
  categoryName?: string;
  type?: 'CLASS' | 'LOCATION';

  /** @format int64 */
  version?: number;

  /** @format date-time */
  created?: string;

  /** @format date-time */
  updated?: string;

  /** @format uuid */
  id?: string;
}

export interface CodatAccountNestedResponse {
  results?: CodatAccountNested[];
}

export interface CodatBankAccount {
  id?: string;
  accountName?: string;
}

export interface CodatBankAccountsResponse {
  results?: CodatBankAccount[];
}

export interface AuditLogDisplayValue {
  firstName?: string;
  lastName?: string;
  email?: string;
  eventType?: string;
  changedValue?: string;
  transactionId?: string;

  /** @format date-time */
  auditTime?: string;

  /** @format int64 */
  timestamp?: number;
  userId?: string;
}

export interface CodatSupplier {
  id?: string;
  supplierName?: string;
  status?: string;
  defaultCurrency?: string;
}

export interface GetSuppliersResponse {
  /** @format int32 */
  totalElements?: number;
  results?: CodatSupplier[];
}

export interface AllocationFundsManagerResponse {
  userDataList: UserData[];
}

export interface AccountBalance {
  /** @format double */
  available?: number;

  /** @format double */
  current?: number;

  /** @format double */
  limit?: number;
  isoCurrencyCode?: string;
  unofficialCurrencyCode?: string;

  /** @format date-time */
  lastUpdatedDatetime?: string;
}

export interface AccountBase {
  accountId?: string;
  balances?: AccountBalance;
  mask?: string;
  name?: string;
  officialName?: string;
  type?: 'investment' | 'credit' | 'depository' | 'loan' | 'brokerage' | 'other';
  subtype?:
    | '401a'
    | '401k'
    | '403B'
    | '457b'
    | '529'
    | 'brokerage'
    | 'cash isa'
    | 'education savings account'
    | 'ebt'
    | 'gic'
    | 'health reimbursement arrangement'
    | 'hsa'
    | 'isa'
    | 'ira'
    | 'lif'
    | 'life insurance'
    | 'lira'
    | 'lrif'
    | 'lrsp'
    | 'non-taxable brokerage account'
    | 'other'
    | 'other insurance'
    | 'other annuity'
    | 'prif'
    | 'rdsp'
    | 'resp'
    | 'rlif'
    | 'rrif'
    | 'pension'
    | 'profit sharing plan'
    | 'retirement'
    | 'roth'
    | 'roth 401k'
    | 'rrsp'
    | 'sep ira'
    | 'simple ira'
    | 'sipp'
    | 'stock plan'
    | 'thrift savings plan'
    | 'tfsa'
    | 'trust'
    | 'ugma'
    | 'utma'
    | 'variable annuity'
    | 'credit card'
    | 'paypal'
    | 'cd'
    | 'checking'
    | 'savings'
    | 'money market'
    | 'prepaid'
    | 'auto'
    | 'business'
    | 'commercial'
    | 'construction'
    | 'consumer'
    | 'home'
    | 'home equity'
    | 'loan'
    | 'mortgage'
    | 'overdraft'
    | 'line of credit'
    | 'student'
    | 'cash management'
    | 'keogh'
    | 'mutual fund'
    | 'recurring'
    | 'rewards'
    | 'safe deposit'
    | 'sarsep'
    | 'null';
  verificationStatus?:
    | 'pending_automatic_verification'
    | 'pending_manual_verification'
    | 'manually_verified'
    | 'verification_expired'
    | 'verification_failed';
}

export interface AccountIdentity {
  accountId?: string;
  balances?: AccountBalance;
  mask?: string;
  name?: string;
  officialName?: string;
  type?: 'investment' | 'credit' | 'depository' | 'loan' | 'brokerage' | 'other';
  subtype?:
    | '401a'
    | '401k'
    | '403B'
    | '457b'
    | '529'
    | 'brokerage'
    | 'cash isa'
    | 'education savings account'
    | 'ebt'
    | 'gic'
    | 'health reimbursement arrangement'
    | 'hsa'
    | 'isa'
    | 'ira'
    | 'lif'
    | 'life insurance'
    | 'lira'
    | 'lrif'
    | 'lrsp'
    | 'non-taxable brokerage account'
    | 'other'
    | 'other insurance'
    | 'other annuity'
    | 'prif'
    | 'rdsp'
    | 'resp'
    | 'rlif'
    | 'rrif'
    | 'pension'
    | 'profit sharing plan'
    | 'retirement'
    | 'roth'
    | 'roth 401k'
    | 'rrsp'
    | 'sep ira'
    | 'simple ira'
    | 'sipp'
    | 'stock plan'
    | 'thrift savings plan'
    | 'tfsa'
    | 'trust'
    | 'ugma'
    | 'utma'
    | 'variable annuity'
    | 'credit card'
    | 'paypal'
    | 'cd'
    | 'checking'
    | 'savings'
    | 'money market'
    | 'prepaid'
    | 'auto'
    | 'business'
    | 'commercial'
    | 'construction'
    | 'consumer'
    | 'home'
    | 'home equity'
    | 'loan'
    | 'mortgage'
    | 'overdraft'
    | 'line of credit'
    | 'student'
    | 'cash management'
    | 'keogh'
    | 'mutual fund'
    | 'recurring'
    | 'rewards'
    | 'safe deposit'
    | 'sarsep'
    | 'null';
  verificationStatus?:
    | 'pending_automatic_verification'
    | 'pending_manual_verification'
    | 'manually_verified'
    | 'verification_expired'
    | 'verification_failed';
  owners?: Owner[];
}

export interface AccountsGetResponse {
  accounts?: AccountBase[];
  item?: Item;
  requestId?: string;
}

export interface AuthGetNumbers {
  ach?: NumbersACH[];
  eft?: NumbersEFT[];
  international?: NumbersInternational[];
  bacs?: NumbersBACS[];
}

export interface AuthGetResponse {
  accounts?: AccountBase[];
  numbers?: AuthGetNumbers;
  item?: Item;
  requestId?: string;
}

export interface Email {
  data?: string;
  primary?: boolean;
  type?: 'primary' | 'secondary' | 'other';
}

export interface Error {
  errorType?:
    | 'INVALID_REQUEST'
    | 'INVALID_RESULT'
    | 'INVALID_INPUT'
    | 'INSTITUTION_ERROR'
    | 'RATE_LIMIT_EXCEEDED'
    | 'API_ERROR'
    | 'ITEM_ERROR'
    | 'ASSET_REPORT_ERROR'
    | 'RECAPTCHA_ERROR'
    | 'OAUTH_ERROR'
    | 'PAYMENT_ERROR'
    | 'BANK_TRANSFER_ERROR';
  errorCode?: string;
  errorMessage?: string;
  displayMessage?: string;
  requestId?: string;
  causes?: object[];

  /** @format double */
  status?: number;
  documentationUrl?: string;
  suggestedAction?: string;
}

export interface IdentityGetResponse {
  accounts?: AccountIdentity[];
  item?: Item;
  requestId?: string;
}

export interface Item {
  itemId?: string;
  institutionId?: string;
  webhook?: string;
  error?: Error;
  availableProducts?: (
    | 'assets'
    | 'auth'
    | 'balance'
    | 'identity'
    | 'investments'
    | 'liabilities'
    | 'payment_initiation'
    | 'transactions'
    | 'credit_details'
    | 'income'
    | 'income_verification'
    | 'deposit_switch'
    | 'standing_orders'
  )[];
  billedProducts?: (
    | 'assets'
    | 'auth'
    | 'balance'
    | 'identity'
    | 'investments'
    | 'liabilities'
    | 'payment_initiation'
    | 'transactions'
    | 'credit_details'
    | 'income'
    | 'income_verification'
    | 'deposit_switch'
    | 'standing_orders'
  )[];

  /** @format date-time */
  consentExpirationTime?: string;
  updateType?: 'background' | 'user_present_required';
}

export interface ItemPublicTokenExchangeResponse {
  accessToken?: string;
  itemId?: string;
  requestId?: string;
}

export interface LinkTokenCreateResponse {
  linkToken?: string;

  /** @format date-time */
  expiration?: string;
  requestId?: string;
}

export interface NumbersACH {
  accountId?: string;
  account?: string;
  routing?: string;
  wireRouting?: string;
}

export interface NumbersBACS {
  accountId?: string;
  account?: string;
  sortCode?: string;
}

export interface NumbersEFT {
  accountId?: string;
  account?: string;
  institution?: string;
  branch?: string;
}

export interface NumbersInternational {
  accountId?: string;
  iban?: string;
  bic?: string;
}

export interface Owner {
  names?: string[];
  phoneNumbers?: PhoneNumber[];
  emails?: Email[];
  addresses?: Address[];
}

export interface PhoneNumber {
  data?: string;
  primary?: boolean;
  type?: 'home' | 'work' | 'office' | 'mobile' | 'mobile1' | 'other';
}

export type PlaidAccessTokenLogEntryDetails = PlaidLogEntryDetailsObject & {
  message?: ItemPublicTokenExchangeResponse;
};

export type PlaidAccountLogEntryDetails = PlaidLogEntryDetailsObject & {
  message?: AuthGetResponse;
};

export type PlaidBalanceLogEntryDetails = PlaidLogEntryDetailsObject & {
  message?: AccountsGetResponse;
};

export type PlaidLinkTokenLogEntryDetails = PlaidLogEntryDetailsObject & {
  message?: LinkTokenCreateResponse;
};

export interface PlaidLogEntryDetailsObject {
  /** @format uuid */
  id?: string;

  /** @format uuid */
  businessId?: string;

  /** @format date-time */
  created?: string;
  plaidResponseType?:
    | 'BALANCE'
    | 'OWNER'
    | 'ACCOUNT'
    | 'LINK_TOKEN'
    | 'ACCESS_TOKEN'
    | 'SANDBOX_LINK_TOKEN'
    | 'ERROR'
    | 'OTHER';
  message?: object;
}

export type PlaidOwnerLogEntryDetails = PlaidLogEntryDetailsObject & {
  message?: IdentityGetResponse;
};

export type SandboxLinkTokenLogEntryDetails = PlaidLogEntryDetailsObject & {
  message?: SandboxPublicTokenCreateResponse;
};

export interface SandboxPublicTokenCreateResponse {
  publicToken?: string;
  requestId?: string;
}

export interface BusinessProspectData {
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

  /**
   * The Business type
   * @example SINGLE_MEMBER_LLC
   */
  businessType:
    | 'INDIVIDUAL'
    | 'SOLE_PROPRIETORSHIP'
    | 'SINGLE_MEMBER_LLC'
    | 'MULTI_MEMBER_LLC'
    | 'PRIVATE_PARTNERSHIP'
    | 'PUBLIC_PARTNERSHIP'
    | 'PRIVATE_CORPORATION'
    | 'PUBLIC_CORPORATION'
    | 'INCORPORATED_NON_PROFIT'
    | 'ACCOUNTING_FIRM'
    | 'BANK'
    | 'CONSULTING_FIRM';

  /**
   * Relationship to business Owner
   * @example true
   */
  relationshipOwner?: boolean;

  /**
   * Relationship to business Representative
   * @example true
   */
  relationshipRepresentative?: boolean;

  /**
   * Relationship to business Executive
   * @example true
   */
  relationshipExecutive?: boolean;

  /**
   * Relationship to business Director
   * @example true
   */
  relationshipDirector?: boolean;
}

export interface BusinessOwnerInfo {
  /** @format uuid */
  businessOwnerId?: string;

  /** @format uuid */
  businessId?: string;
  firstName?: string;
  lastName?: string;

  /** @format date */
  dateOfBirth?: string;
  taxIdentificationNumber?: string;
  relationshipOwner?: boolean;
  relationshipRepresentative?: boolean;
  relationshipExecutive?: boolean;
  relationshipDirector?: boolean;
  percentageOwnership?: number;
  title?: string;
  address?: Address;
  email?: string;
  phone?: string;
}

export interface BankAccount {
  /** @format uuid */
  businessBankAccountId?: string;
  name?: string;
  routingNumber?: string;
  accountNumber?: string;
  accountLinkStatus?: 'LINKED' | 'MICROTRANSACTION_PENDING' | 'RE_LINK_REQUIRED';
}

export interface LinkTokenResponse {
  linkToken?: string;
}

export interface ApplicationReviewRequirements {
  kybRequiredFields?: string[];
  kycRequiredFields?: Record<string, string[]>;
  kybRequiredDocuments?: RequiredDocument[];
  kycRequiredDocuments?: KycDocuments[];
  requireOwner?: boolean;
  requireRepresentative?: boolean;
  pendingVerification?: string[];
  errorCodes?: (
    | 'invalid_address_city_state_postal_code'
    | 'invalid_street_address'
    | 'invalid_value_other'
    | 'verification_document_address_mismatch'
    | 'verification_document_address_missing'
    | 'verification_document_corrupt'
    | 'verification_document_country_not_supported'
    | 'verification_document_dob_mismatch'
    | 'verification_document_duplicate_type'
    | 'verification_document_expired'
    | 'verification_document_failed_copy'
    | 'verification_document_failed_greyscale'
    | 'verification_document_failed_other'
    | 'verification_document_failed_test_mode'
    | 'verification_document_fraudulent'
    | 'verification_document_id_number_mismatch'
    | 'verification_document_id_number_missing'
    | 'verification_document_incomplete'
    | 'verification_document_invalid'
    | 'verification_document_issue_or_expiry_date_missing'
    | 'verification_document_manipulated'
    | 'verification_document_missing_back'
    | 'verification_document_missing_front'
    | 'verification_document_name_mismatch'
    | 'verification_document_name_missing'
    | 'verification_document_nationality_mismatch'
    | 'verification_document_not_readable'
    | 'verification_document_not_signed'
    | 'verification_document_not_uploaded'
    | 'verification_document_photo_mismatch'
    | 'verification_document_too_large'
    | 'verification_document_type_not_supported'
    | 'verification_failed_address_match'
    | 'verification_failed_business_iec_number'
    | 'verification_failed_document_match'
    | 'verification_failed_id_number_match'
    | 'verification_failed_keyed_identity'
    | 'verification_failed_keyed_match'
    | 'verification_failed_name_match'
    | 'verification_failed_other'
    | 'verification_failed_tax_id_match'
    | 'verification_failed_tax_id_not_issued'
    | 'verification_missing_executives'
    | 'verification_missing_owners'
    | 'verification_requires_additional_memorandum_of_associations'
  )[];
}

export interface KycDocuments {
  owner?: string;
  documents?: RequiredDocument[];
}

export interface RequiredDocument {
  documentName?: string;
  type?: string;
  entityTokenId?: string;
}

export interface AllocationRolePermissionRecord {
  /** @format uuid */
  id?: string;

  /** @format uuid */
  businessId?: string;
  role_name: string;
  permissions: (
    | 'READ'
    | 'CATEGORIZE'
    | 'LINK_RECEIPTS'
    | 'EMPLOYEE'
    | 'MANAGE_FUNDS'
    | 'MANAGE_CARDS'
    | 'MANAGE_USERS'
    | 'MANAGE_PERMISSIONS'
    | 'MANAGE_CONNECTIONS'
    | 'VIEW_OWN'
    | 'LINK_BANK_ACCOUNTS'
    | 'MANAGE_CATEGORIES'
  )[];
}

export interface AllocationRolePermissionsResponse {
  userAllocationRoleList: AllocationRolePermissionRecord[];
}

export interface CardAllocationDetails {
  /**
   * The ID of the allocation connected with this card.
   * @format uuid
   */
  allocationId: string;
}
