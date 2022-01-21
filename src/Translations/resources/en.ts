import { AuthenticationMethods } from '@/Hooks/useAvailableBioMethod';

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
    shortcut: {
      havingTroubleLoggingIn: 'Having trouble logging in?',
      loginWithEmailPassword: 'Log in using your email and password',
    },
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
  loginOptions: {
    title: 'Login options',
    subTitle: 'You’ll need to enable Face ID or set up a PIN as a faster, more secure way of logging in next time.',
    [AuthenticationMethods.FACE]: {
      android: {
        title: 'Trusted Face',
        description: 'Enable Trusted Face to log in to ClearSpend',
      },
      ios: {
        title: 'Face ID',
        description: 'Enable Face ID to log in to ClearSpend',
      },
    },
    [AuthenticationMethods.FINGERPRINT]: {
      ios: {
        title: 'Touch ID',
        description: 'Enable Touch ID to log in to ClearSpend',
      },
    },
    [AuthenticationMethods.FINGERPRINT_ANDROID]: {
      android: {
        title: 'Fingerprint',
        description: 'Enable Fingerprint to log in to ClearSpend',
      },
    },
    pin: 'PIN',
    pinDescription: 'Create a 4-digit PIN to log in to ClearSpend',
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
    empty: {
      title: "Looks like you don't have any cards.",
      subTitle: 'When you’re assigned a card, you’ll be able to view and control it from here.',
    },
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
    receipt: {
      takeAPhoto: 'Take a photo of your receipt',
      uploadingReceipt: 'Uploading receipt',
      uploadingReceiptTime: 'This shouldn’t take too long',
      useThisPhoto: 'Use this photo',
      retakePhoto: 'Re-take photo',
      notAuthorizedCameraAccess: 'ClearSpend needs access to your camera to take receipt photos',
      uploadNewReceipt: 'Upload a new receipt',
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
        addANote: 'Add a note',
        setNote: 'Set Note',
        cancel: 'Cancel',
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
    profileInfo: 'View profile info',
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
      currPass: 'Current Password',
      next: 'Next',
    },
    backNav: 'Back',
    newPassword: {
      title: 'New Password',
      changePassword: 'Change Password',
    },
    rules: {
      minLength: 'Must be a minimum of 10 characters',
      maxLength: 'Must be less than 30 characters',
    },
    message: {
      passwordUpdated: 'Your password has been updated',
      signInUsingNewPassword:
        'You will be able to sign in using your new password the next time you open the clearspend app',
      confirmation: 'Ok, got it',
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
