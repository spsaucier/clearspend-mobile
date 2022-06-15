import React from 'react';
import { useTranslation } from 'react-i18next';
import FullScreenModal from '@/Components/FullScreenModal';

type ExitConfirmationModalProps = {
  visible: boolean;
  onPrimaryAction: () => void;
  onSecondaryAction: () => void;
};

const ExitConfirmationModal = ({
  visible,
  onPrimaryAction,
  onSecondaryAction,
}: ExitConfirmationModalProps) => {
  const { t } = useTranslation();
  return (
    <FullScreenModal
      visible={visible}
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
