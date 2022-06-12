import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '@/Components/Modal';

type ExitConfirmationModalProps = {
  onPrimaryAction: () => void;
  onSecondaryAction: () => void;
};

const ExitConfirmationModal = ({
  onPrimaryAction,
  onSecondaryAction,
}: ExitConfirmationModalProps) => {
  const { t } = useTranslation();
  return (
    <Modal
      danger
      testID="ask-exit-confirmation-modal"
      title={t('general.areYourSureExit')}
      text={t('general.youWillLoseProgress')}
      onPrimaryActionLabel={t('general.exit')}
      onPrimaryAction={onPrimaryAction}
      onSecondaryAction={onSecondaryAction}
    />
  );
};
export default ExitConfirmationModal;
