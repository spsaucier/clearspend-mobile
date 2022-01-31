import React from 'react';
import { TouchableOpacity } from 'react-native';
import useBiometricLogin from '@/Hooks/useBiometricLogin';
import { FaceIdIcon } from '../../../Components/Icons/faceIdIcon';
import { RoundedBox } from '../BioPasscode/SetBiometricsOrPasscodeScreen';

interface Props {
  onSuccess?: () => void;
  onFail?: () => void;
}

export const PromptBio = ({ onSuccess, onFail }: Props) => {
  const { reprompt } = useBiometricLogin(onSuccess, onFail);
  return (
    <TouchableOpacity onPress={reprompt}>
      <RoundedBox>
        <FaceIdIcon />
      </RoundedBox>
    </TouchableOpacity>
  );
};
