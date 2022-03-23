import { findKey } from 'lodash';

export const nameToInitials = (fullName: string): string => {
  const namesArray = fullName.trim().split(' ');
  return namesArray.length === 1
    ? `${namesArray[0].charAt(0)}`
    : `${namesArray[0].charAt(0)}${namesArray[namesArray.length - 1].charAt(0)}`;
};

export const sentenceCase = (str: string): string => {
  if (!str || str.length < 2) {
    return str;
  }
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
};

export const formatCurrency = (num = 0) =>
  num.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });

export function formatPhone(val: string | undefined): string {
  if (!val) return '';
  return val
    .replace(/[^\d]/g, '')
    .replace(/^(\d)?(\d{3})(\d{3})(\d{4})$/, '+$1 ($2) $3-$4')
    .replace('+ ', '');
}

export const enum MediaType {
  image,
  pdf,
}

const mimeTypeSignatures = {
  [MediaType.pdf]: ['application/pdf', 'JVBERi'], // PDF
  [MediaType.image]: ['image/jpg', 'image/jpeg', 'image/png', 'iVBORw0KGgo'], // PNG, JPEG || JPG
};

export const detectMimeType = (contentType: string, base64: string) => {
  const values = Object.values(mimeTypeSignatures);
  const byContentType = values.find((value) => value.find((x) => contentType === x));

  let key;
  if (byContentType) {
    key = findKey(mimeTypeSignatures, (x) => x === byContentType);
  } else {
    const bySignature = values.find((value) => value.find((x) => base64.indexOf(x) !== -1));
    key = findKey(mimeTypeSignatures, (x) => x === bySignature);
  }
  return Number(key!);
};
