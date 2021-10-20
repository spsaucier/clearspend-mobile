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
    forgotPassword: 'Forgot Password?',
    businessSection: {
      copy: 'Interested in signing up your business with Tranwall?',
      buttonCta: 'Explore Tranwall Business',
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
      balance: 'Balance: ',
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
    },
  },
  card: {
    virtual: 'Virtual ',
    disposable: 'Disposable ',
    card: 'Card',
    balance: 'Balance',
    frozen: 'Frozen',
    viewControls: 'Tap to view card controls',
    showCardInfo: 'Show Card Info',
    freezeCard: 'Freeze Card',
    unfreezeCard: 'Unfreeze Card',
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
};
