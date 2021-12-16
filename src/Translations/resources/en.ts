export default {
  general: {
    continue: 'Continue',
    reload: 'Reload',
  },
  login: {
    heading: 'Modern commercial cards and accounts',
    emailLabel: 'Email Address',
    emailPlaceholder: 'Enter your work email address',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Enter Password',
    buttonCta: 'Get Started',
    buttonLogin: 'Log in',
    forgotPassword: 'Forgot Password?',
    businessSection: {
      copy: 'Interested in signing up your business with ClearSpend? ',
      buttonCta: 'Open an account today.',
    },
    invalidCredentials: 'The user credentials are invalid.',
  },
  selectOrganization: {
    title: 'Select your organization',
    subTitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    buttonCta: 'Continue',
  },
  enterMobile: {
    title: 'Enter mobile number',
    subTitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    mobileInputLabel: 'Mobile Number',
    mobileInputPlaceholder: 'Enter your mobile number',
    buttonCta: 'Get OTP',
  },
  verifyAccount: {
    title: 'Verify your account',
    subTitle: 'Enter the verification code send to your mobile number',
    resendCta: "Didn't receive a code? Resend Code (in 15 seconds)",
    buttonCta: 'Verify',
  },
  setPassword: {
    title: 'Set your own password',
    subTitle: 'The password we sent to your email was temporary. Please set your own password now.',
    passwordInputLabel: 'New password',
    passwordInputPlaceholder: 'Enter a new password',
    rules: {
      mustInclude: 'Must include',
      mix: 'Mixture of letters and numbers',
      length: 'At least 8 characters long',
      upperCase: 'At least 1 character in uppercase',
      lowerCase: 'At least 1 character in lowercase',
      special: 'At least one special character, e.g., ! @ # ? ]',
    },
    buttonCta: 'Set password',
  },
  forgotPassword: {
    enterEmail: {
      title: 'Enter your work email',
      subTitle: 'We will send a password reset email to this address',
      emailInputLabel: 'Email Address',
      emailInputPlaceholder: 'Enter your work email address',
      buttonCta: 'Continue',
    },
    checkEmail: {
      title: 'Check your email',
      subTitle:
        'We have sent the password reset email. Please follow the link on the email to set you new password. Make sure check you junk folder. If the email has not arrived after 1 min, you can request another.',
      buttonCta: 'Resend Email',
    },
  },
  wallet: {
    header: 'Hey {{name}}!',
    transactions: {
      recentTransactions: 'Recent Transactions',
      allTransactions: 'Transactions',
      searchTransactions: 'Search transactions',
      noRecent: 'No recent transactions',
      addReceipt: 'Add receipt',
    },
    cardInfo: {
      title: 'Card Info',
    },
    cardDetails: {
      title: 'Card Details',
    },
    transactionDetails: {
      title: 'Transaction Details',
      status: 'Transaction {{status}}',
      viewReceipt: 'View Receipt',
      addReceipt: 'Add Receipt',
      addNotes: 'Add transaction note',
      merchant: {
        title: 'Merchant',
        merchantName: 'Merchant Name',
        merchantId: 'Merchant ID',
        merchantCategory: 'Merchant Category',
      },
      details: {
        title: 'Transaction Details',
        dateTime: 'Posted on',
        amount: 'Posted amount',
        location: 'Country',
      },
      report: 'Report an issue',
      notes: {
        placeholder: 'Add transaction notes...',
      },
    },
  },
  card: {
    virtual: 'Virtual ',
    disposable: 'Disposable ',
    card: 'Card',
    balance: 'Balance',
    frozen: 'Frozen',
    showCardInfo: 'Show Card Info',
    freezeCard: 'Freeze Card',
    unfreezeCard: 'Unfreeze Card',
    validThru: 'Valid Thru',
    cvv: 'CVV',
  },
  cardProfile: {
    cardBalance: 'Card Balance',
    spendControls: 'Spend Controls',
    reportCardLostOrStolen: 'Report Card Lost or Stolen',
    moreSettings: 'More Settings',
    moreSettingsSubtitle: 'Reset PIN, physical card request and more',
    spentToday: 'Spent today',
    limit: 'Limit: {{amount}}',
    spentCurrentMonth: 'Spent this month',
    remaining: 'Remaining: {{amount}}',
    cardIsFrozenForSecurity: 'Card is frozen for security reasons.',
    addToAppleWallet: 'Add to Apple Wallet',
  },
  cardInfo: {
    dismiss: 'Dismiss',
    cardNumber: 'CARD NUMBER',
    copyCVV: 'Copy CVV',
    billingAddress: 'BILLING ADDRESS',
  },
  profile: {
    profileMenu: {
      manageAccount: 'Manage Account',
      biometrics: 'Biometrics',
      faceId: 'Face ID',
      changePassword: 'Change Password',
      notificationSettings: 'Notification Settings',
      viewAuditLog: 'View Audit Log',
      changeCompany: 'Change Company',
      logOut: 'Log out from this device',
    },
    changePassword: {
      title: 'Change Password',
    },
    notificationSettings: {
      title: 'Notification Settings',
      disableAll: 'Disable all notifications',
    },
    auditLog: {
      title: 'Audit Log',
    },
  },
  notifications: {
    title: 'Notifications',
    youHaveNew: 'You have {{newNotifications}} new notifications',
  },
  spendControls: {
    back: 'BACK',
    title: 'Spend Controls',
    limits: 'Limits',
    howMuchSpent: 'Configure how much can be spent on this card',
    limitSection: {
      dailyLimit: 'Daily Limit',
      monthlyLimit: 'Monthly Limit',
    },
    channelsTitle: 'Channels',
    howOftenCardUsed: 'Configure where and how often this card can be used',
    channelsSection: {
      atm: 'ATM',
      validUntil: 'Valid until:',
      cardLimit: 'Limit: $100.00',
      cardValidity: 'Card Validity',
      oneTimeUse: 'One time use',
    },
  },
};
