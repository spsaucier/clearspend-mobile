import { AuthenticationMethods } from '@/Hooks/useAvailableBioMethod';

export default {
  general: {
    continue: 'Continue',
    reload: 'Reload',
    back: 'BACK',
  },
  error: {
    generic: 'Looks like something went wrong.',
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
    twoFactor: {
      placeholder: '******',
      sms: {
        label: 'Enter the code sent to your mobile number',
      },
      email: {
        label: 'Enter the code sent to your email address',
      },
      authenticator: {
        label: 'Enter the code available in your authenticator app',
      },
      error: 'Unable to log in with the entered code',
    },
  },
  selectOrganization: {
    title: 'Select your organization',
    subTitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    buttonCta: 'Continue',
  },
  enterMobile: {
    title: 'Enter mobile number',
    titlePart1: 'Enter your',
    titlePart2: ' mobile number',
    subTitle: 'We’ll send a verification code to this number.',
    buttonCta: 'Send Verification Code',
    error: 'Invalid phone number',
  },
  otp: {
    title: 'Enter the 6 digit code we sent to your device',
    titlePart1: 'Enter the',
    titlePart2: ' 6 digit code',
    titlePart3: ' we sent to your mobile device',
    resendCode: 'Resend code',
    buttonCta: 'Verified',
    incorrect: 'The entered OTP was incorrect',
  },
  loginOptions: {
    title: 'Login options',
    subTitle:
      'You’ll need to{{faceOrBio}} set up a PIN as a faster, more secure way of logging in next time.',
    subTitleFaceOrBio: ' enable {{type}} or',
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
        title: 'Biometric login',
        description: 'Enable biometric login to log in to ClearSpend',
      },
    },
    pin: 'PIN',
    pinDescription: 'Create a 4-digit PIN to log in to ClearSpend',
    passcode: {
      confirmYour: 'Confirm your ',
      createYour: 'Create your ',
      enterYour: 'Enter your ',
      fourDigitPasscode: '4-digit PIN',
      mismatch: 'Your PINs did not match',
      incorrect: 'Incorrect PIN',
      tryAgain: 'Please try again',
    },
  },
  setPassword: {
    title: 'Set your own password',
    titlePart1: 'Set your own',
    titlePart2: ' password',
    subTitle: 'The password we sent to your email was temporary. Please set your own password now.',
    samePasswordError: 'The new password cannot be the same as your past three passwords.',
    genericPasswordError: 'Unable to set new password',
    incorrectCurrentPasswordError: 'Incorrect current password',
    passwordInputLabel: 'New password',
    passwordInputPlaceholder: 'Enter a new password',
    rules: {
      length: 'Must be between 10 and 30 characters',
    },
    buttonCta: 'Next',
    termsAndPrivacyAcceptance:
      'I am 18 years of age and agree to ClearSpend’s <key1>Terms of Service</key1> and <key2>Privacy Policy</key2>',
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
  toasts: {
    addressUpdated: 'Address updated successfully',
    disable2faInvalid: 'Insufficient information to disable 2FA',
    mobileSaved: 'Mobile number saved',
    mobileSaveFailed: 'Unable to save your phone number',
    previousNumberRemoved: 'Previous mobile number removed as authentication method',
    resendFailed: 'Re-sending verification code failed',
    updatePasswordFailed: 'Failed to update password',
    updatePasswordSuccess: 'Your password has been successfully updated',
    verificationResent: 'Verification code re-sent to {{number}}',
    receiptUploadedSuccessfully: 'Receipt uploaded successfully',
    cantAccessCardScreenIfFrozenToast:
      'This card needs to be unfrozen before you can view the card details',
    notificationsHaveBeenTurnedOff: 'All notifications have been turned off',
  },
  categories: {
    merchant: {
      childCare: 'Child Care',
      digitalGoods: 'Digital Goods',
      education: 'Education',
      entertainment: 'Entertainment',
      foodAndBeverage: 'Food & Beverage',
      gambling: 'Gambling',
      government: 'Government',
      health: 'Health',
      memberships: 'Memberships',
      moneyTransfer: 'Money Transfer',
      services: 'Services',
      shopping: 'Shopping',
      travel: 'Travel',
      utilities: 'Utilities',
      other: 'Other',
    },
  },
  paymentTypes: {
    pointOfSales: 'Point of sale (POS)',
    manualEntry: 'Manual Entry',
    online: 'Online',
  },
  wallet: {
    refreshCardAndTransactions: 'Refreshing card and transactions',
    empty: {
      title: 'Looks like you don’t have any cards.',
      subTitle: 'When you’re assigned a card, you’ll be able to view and control it from here.',
    },
    transactions: {
      recentTransactions: 'Recent Transactions',
      allTransactions: 'Transactions',
      searchTransactions: 'Search transactions',
      empty: 'Your recent transactions will show here when you start using this card',
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
      addAnotherReceipt: 'Add another receipt',
      deleteReceipt: 'Delete receipt',
      deleteConfirmation: 'Are you sure you want to delete this receipt from the transaction?',
      deleteConfirmationSecondary: 'This action is permanent and can not be undone.',
      deleteCancel: 'Cancel',
      deleteError: 'There was a problem deleting this receipt. Please try again later.',
      unableToLoadReceipt: 'Unable to load receipt',
    },
    transactionDetails: {
      title: 'Transaction Details',
      status: 'Transaction {{status}}',
      addReceipt: 'Add a receipt',
      expenseCategory: 'Expense category',
      reportIssue: 'Report an issue',
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
        addNoteError:
          'There was a problem adding a note to this transaction. Please try again later.',
        updateNoteError:
          'There was a problem updating the note on this transaction. Please try again later.',
      },
      addReceiptPanel: {
        takePhoto: 'Take a photo',
        selectPhoto: 'Select a photo',
        uploadFile: 'Upload a file',
      },
      selectCategory: {
        title: 'Select A Category',
        fetchCategoriesError: "We couldn't load the expense categories. Please try again later.",
        updateCategoryError:
          'There was a problem setting your expense category. Please try again later',
        lockedTransactionError:
          'This transaction category has been synced with your accounting software and can not be changed',
      },
      unsupportedCategoryError:
        "Your company's expense categories have changed. Please re-categorize this transaction.",
    },
    filterTransactions: {
      filterTransactionsBy: 'Filter transactions by',
      missingReceipt: 'Missing receipt',
      missingCategory: 'Missing category',
      applyFilterButtonCta: 'Apply filter',
      resetAllFiltersCta: 'Reset all filters',
    },
    declineReason: {
      mccGroup: '{{reason}}: {{mccGroup}} not permitted on this {{entityType}}',
      paymentType: '{{reason}}: {{paymentType}} not permitted on this {{entityType}}',
      postalCode: '{{reason}} ({{postalCode}} entered)',
      exceededAmount: '{{period}} {{limitType}} limit exceeded by {{amount}}',
      limitType: '{{reason}}: {{limitType}} {{period}} limit exceeded',
      insufficientFunds: 'Insufficient funds',
      invalidCardStatus: 'Invalid card status',
      cardNotFound: 'Card not found',
      limitExceeded: 'Limit exceeded',
      addressPostalCodeMismatch: 'Address: Postal code mismatch',
      CVCMismatch: 'CVC mismatch',
      expiryMismatch: 'Expiry mismatch',
      accountClosed: 'Account closed',
      accountFrozen: 'Account frozen',
      bankAccountRestricted: 'Bank account restricted',
      bankOwnershipChanged: 'Bank ownership changed',
      couldNotProcess: 'Could not process',
      invalidAccountNumber: 'Invalid account number',
      incorrectAcountHolderName: 'Incorrect account-holder name',
      invalidCurrency: 'Invalid currency',
      noAccount: 'No account',
      declined: 'Declined',
      failed: 'Failed',
      cancelled: 'Cancelled',
      unknownReason: 'Unknown reason',
    },
  },
  card: {
    virtual: 'Virtual ',
    disposable: 'Disposable ',
    card: 'Card',
    balance: 'Balance',
    frozen: 'Frozen',
    validThru: 'Valid Thru',
    cvv: 'CVV',
    options: {
      cardOptions: 'Card Options',
      showCardInfo: 'Show Card Info',
      freezeCard: 'Freeze Card',
      unfreezeCard: 'Unfreeze Card',
      freezingCard: 'Freezing...',
      unfreezingCard: 'Unfreezing...',
      freezeSuccessToast: 'Card has been frozen',
      unfreezeSuccessToast: 'Card has been unfrozen',
      freezeErrorToast: 'Card could not be frozen',
      unfreezeErrorToast: 'Card could not be unfrozen',
      spendControls: 'Spend Controls',
    },
  },
  addToDigitalWallet: {
    digitalWalletDescription: 'ClearSpend',
    success: 'Done! Card added to your wallet.',
    failure: 'Sorry, unable to add card to wallet.',
    cancelled: 'Add to wallet canceled.',
  },
  activateCard: {
    activateCSCard: 'Activate your ClearSpend card',
    getStartedInstructions:
      'If you’ve received your physical card in the mail, you’ll be able to activate it instantly. All you need are the last 4 digits found on the back of your card.',
    getStartedButtonCta: 'Get Started',
    enterDigitsInstruction1: 'Enter the last 4 digits of the 16-digit card number.',
    enterDigitsInstruction2: 'This can be found on the back of your physical ClearSpend card',
    loadingTitle: 'Checking your information',
    loadingSubTitle: 'This may take several minutes',
    successTitle: 'You’re good to go!',
    successSubTitle: 'Your ClearSpend card has been activated and can now be used.',
    activateAnotherCardButtonCta: 'Activate Another Card',
    viewCardsButtonCta: 'View My Cards',
    error:
      'We could not find a card that matches this number or user. Please try the number again.',
  },
  cardProfile: {
    cardBalance: 'Card Balance',
    spendControls: 'Spend Controls',
    reportCardLostOrStolen: 'Report Card Lost or Stolen',
    moreSettings: 'More Settings',
    moreSettingsSubtitle: 'Reset PIN, physical card request and more',
    cardLimits: 'Card Limits',
    spentToday: 'Daily',
    limit: 'Limit: {{amount}}',
    spentCurrentMonth: 'Monthly',
    remaining: 'Remaining: {{amount}}',
    singleTransaction: 'Single Transaction',
    cardIsFrozenForSecurity: 'Card is frozen for security reasons.',
    availableToSpendMeans: 'Available balance',
    availableToSpendMeansDescription:
      'Amount shown is the balance available to this card, minus any pending transaction holds. Actual spending power may be limited by daily, monthly, or single-transaction limits set by your company.',
    okGotIt: 'Ok, got it',
  },
  cardInfo: {
    dismiss: 'Dismiss',
    cardNumber: 'CARD NUMBER',
    copyCVV: 'Copy CVV',
    billingAddress: 'CARD BILLING ADDRESS',
    billingAddressInfo:
      "This is your company's main address. Use this address as your billing address for e-commerce payments.",
  },
  cardSpendControl: {
    title: 'Spend controls',
    resetControlsHeadline: 'Reset spend controls to default allocation settings',
    resetControls: 'Reset controls',
    applyChanges: 'Apply changes',
    success: 'Changes successfully saved.',
  },
  spendControl: {
    amount: 'Amount',
    purchasing: 'Purchasing',
    categories: 'Categories',
    allCategories: 'All categories',
    dailyLimit: 'Daily limit',
    monthyLimit: 'Monthy limit',
    transactionLimit: 'Transaction limit',
    paymentTypes: 'Payment types',
    allPaymentTypes: 'All payment types',
    international: 'International (3% fee)',
  },
  profile: {
    profileInfo: 'View profile info',
    profileMenu: {
      updatePersonalDetails: 'Update personal details',
      loginOptions: 'Log in options',
      activateCard: 'Activate card',
      notifications: 'Notifications',
      biometrics: 'Biometrics',
      faceId: 'Face ID',
      changePassword: 'Change Password',
      changeCompany: 'Change Company',
      logOut: 'Log out',
      admin: 'Admin',
      manager: 'Manager',
    },
    appVersion: 'App version: {{appVersion}}',
    loginOptions: {
      title: 'Log in options',
      pin: 'Update PIN',
      pinOr: 'Update PIN or {{method}}',
      updatePassword: 'Update password',
    },
    legalDocs: {
      title: 'Legal documents',
      terms: 'Terms of Service',
      privacy: 'Privacy Policy',
      cardholder: 'Cardholder agreement',
    },
    updateAccount: {
      title: 'Personal details',
      updateEmail: 'Update email',
      updatePhone: 'Update phone number',
      updateAddress: 'Update address',
    },
    updateEmail: {
      title: 'New email address',
    },
    updatePhone: {
      title: 'Enter your new mobile number',
      secondary: 'We’ll send a verification code to this number',
    },
    updateAddress: {
      title: 'New address',
      cta: 'Save Address',
      selectedAddress: 'Selected address:',
      placeholder: 'Address line 1',
      line2Placeholder: 'Address line 2 (optional)',
    },
    updateAuth: {
      disabled: '{{method}} authentication disabled',
      success: '{{method}} authentication enabled',
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
      rules: {
        minLength: 'Must be a minimum of 10 characters',
        maxLength: 'Must be less than 30 characters',
      },
    },
    notificationSettings: {
      title: 'Notifications',
      allNotifications: 'All notifications',
      enableNotificationsUsingSettings:
        'Please re-enable notifications for the ClearSpend app in your phone’s settings.',
      cancel: 'Cancel',
      settings: 'Go to Settings',
    },
  },
  notifications: {
    title: 'Notifications',
    youHaveNew: 'You have {{newNotifications}} new notifications',
  },
  termsAndPrivacyPolicyUpdated: {
    title: "We've <key1>updated</key1> our Terms of Service and Privacy Policy",
    subTitle: 'Please agree to these updated documents to keep using ClearSpend.',
    termsOfService: 'Terms of Service',
    privacyPolicy: 'Privacy Policy',
    acceptAndContinue: 'Accept and continue',
    cancelAndLogout: 'Cancel and log out',
    error: 'Unable to accept terms and conditions',
  },
  admin: {
    welcome: 'Welcome back <key1>{{name}}</key1>',
    actionsTab: 'Actions',
    requestsTab: 'Requests',
    issueACard: 'Issue a card',
    increaseALimit: 'Increase a limit',
    requests: {
      newRequestFrom: 'New request from ',
    },
    employees: {
      employeesTitle: 'Employees',
      addEmployee: 'Add employee',
      employeeOptions: 'Employee options',
      viewWallet: 'View wallet',
      issueCard: 'Issue a card',
      employeeDetails: 'Employee details',
      archiveEmployee: 'Archive employee',
    },
    allocations: {
      allocationsTitle: 'Allocations',
      newAllocation: 'New allocation',
      allocationOptions: 'Allocation options',
      addFunds: 'Add funds',
      removeFunds: 'Remove funds',
      editSpendControls: 'Edit spend controls',
      viewCards: 'View cards',
    },
  },
  adminFlows: {
    nextStepCta: 'Next',
    issueCard: {
      cardTypeTitle: 'Select card type',
      cardTypeText:
        'Virtual cards can be accessed through the ClearSpend mobile app or added to your Apple or Android wallet.',
      cardTypeOptionPhysicalLabel: 'Physical Card',
      cardTypeOptionPhysicalText: 'Arrives in 1-2 weeks',
      cardTypeOptionVirtualLabel: 'Virtual Card',
      cardTypeOptionVirtualText: 'Available immediately',
      employeeTitle: 'Select employee',
      cardDetailsTitle: 'Card details',
      cardDetailsLabel: 'Show employee name',
      addressTitle: 'Select delivery address',
      addressBusinessOption: 'Business',
      addressEmployeeOption: 'Employee',
      addressNewOption: 'New address',
      newAddressTitle: 'New address',
      newAddressCta: 'Add delivery address',
      allocationTitle: 'Allocation',
      allocationText: 'Choose the allocation that will fund your new card.',
      spendControlsTitle: 'Spend controls',
      spendControlsText:
        'Set limits for how much can be spent with this card for each transaction, or over the course of a day or month.',
      cardRequestLoadingText: 'Issuing card...',
      cardRequestErrorTitle: 'There was a problem issuing this card.',
      cardRequestErrorText: 'Please try again later.',
      cardConfirmationTitle: 'You’re all set!',
      confirmCta: 'Issue new card',
      confirmationPrimaryActionCta: 'Return to dashboard',
      confirmationSecondaryActionCta: 'Issue another card',
      confirmationVirtualCard:
        'A new card has been issued to <key1>{{name}}</key1> and will be available to activate immediately.',
      confirmationPhysicalCard:
        'A new card has been issued to <key1>{{name}}</key1> and will be delivered to <key2>{{address}}</key2> in 2-3 weeks. ',
    },
  },
};
