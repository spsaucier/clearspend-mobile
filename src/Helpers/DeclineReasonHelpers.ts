import { AccountActivityResponse, DeclineDetails } from '@/generated/capital';
import i18next from '@/Translations';
import { formatCurrency } from '@/Helpers/StringHelpers';

const declineReasons: Partial<
  Readonly<Record<NonNullable<DeclineDetails['reason']>, JSX.Element>>
> = {
  INSUFFICIENT_FUNDS: i18next.t('wallet.declineReason.insufficientFunds'),
  INVALID_CARD_STATUS: i18next.t('wallet.declineReason.invalidCardStatus'),
  CARD_NOT_FOUND: i18next.t('wallet.declineReason.cardNotFound'),
  LIMIT_EXCEEDED: i18next.t('wallet.declineReason.limitExceeded'),
  ADDRESS_POSTAL_CODE_MISMATCH: i18next.t('wallet.declineReason.addressPostalCodeMismatch'),
  CVC_MISMATCH: i18next.t('wallet.declineReason.CVCMismatch'),
  EXPIRY_MISMATCH: i18next.t('wallet.declineReason.expiryMismatch'),
  ST_ACCOUNT_CLOSED: i18next.t('wallet.declineReason.accountClosed'),
  ST_ACCOUNT_FROZEN: i18next.t('wallet.declineReason.accountFrozen'),
  ST_BANK_ACCOUNT_RESTRICTED: i18next.t('wallet.declineReason.bankAccountRestricted'),
  ST_BANK_OWNERSHIP_CHANGED: i18next.t('wallet.declineReason.bankOwnershipChanged'),
  ST_COULD_NOT_PROCESS: i18next.t('wallet.declineReason.couldNotProcess'),
  ST_INVALID_ACCOUNT_NUMBER: i18next.t('wallet.declineReason.invalidAccountNumber'),
  ST_INCORRECT_ACCOUNT_HOLDER_NAME: i18next.t('wallet.declineReason.incorrectAcountHolderName'),
  ST_INVALID_CURRENCY: i18next.t('wallet.declineReason.invalidCurrency'),
  ST_NO_ACCOUNT: i18next.t('wallet.declineReason.noAccount'),
  ST_DECLINED: i18next.t('wallet.declineReason.declined'),
  ST_FAILED: i18next.t('wallet.declineReason.failed'),
  ST_CANCELLED: i18next.t('wallet.declineReason.cancelled'),
  ST_UNKNOWN: i18next.t('wallet.declineReason.unknownReason'),
};

export function getReasonText(details: Required<AccountActivityResponse>['declineDetails']) {
  const reason = declineReasons[details.reason!] || details.reason || '';

  if ('postalCode' in details && details.postalCode) {
    return i18next.t('wallet.declineReason.postalCode', {
      reason: String(reason),
      postalCode: details.postalCode,
    });
  }

  if ('mccGroup' in details) {
    if (details.mccGroup) {
      return i18next.t('wallet.declineReason.mccGroup', {
        reason: String(reason),
        mccGroup: details.mccGroup.toLowerCase().replace(/_/g, ''),
        entityType: details.entityType?.toLowerCase() || 'card',
      });
    }
    if (details.paymentType) {
      return i18next.t('wallet.declineReason.paymentType', {
        reason: String(reason),
        paymentType: details.paymentType.toLowerCase().replace(/_/g, ''),
        entityType: details.entityType?.toLowerCase() || 'card',
      });
    }
  }
  if ('limitType' in details && details.limitType) {
    if ('exceededAmount' in details && details.exceededAmount) {
      return i18next.t('wallet.declineReason.exceededAmount', {
        period: `${details.limitPeriod?.slice(0, 1)}${
          details.limitPeriod?.slice(1)?.toLowerCase() || ''
        }`,
        limitType: details.limitType.toLowerCase().replace(/_/g, ''),
        amount: formatCurrency(details.exceededAmount),
      });
    }
    return i18next.t('wallet.declineReason.limitType', {
      reason: String(reason),
      limitType: details.limitType.toLowerCase().replace(/_/g, ''),
      period: details.limitPeriod?.toLowerCase() || '',
    });
  }

  return reason;
}
