import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useMMKVString } from 'react-native-mmkv';
import useBiometricLogin from '@/Hooks/useBiometricLogin';
import { FaceIdIcon } from '../../../Components/Icons/faceIdIcon';
import { RoundedBox } from '../BioPasscode/SetBiometricsOrPasscodeScreen';
import { AuthenticationMethods } from '@/Hooks/useAvailableBioMethod';
import { TouchIdIcon } from '@/Components/Icons/touchIdIcon';
import { AVAILABLE_BIO_KEY } from '@/Store/keys';

interface Props {
  onSuccess?: () => void;
  onFail?: () => void;
}

export const PromptBio = ({ onSuccess, onFail }: Props) => {
  const [availableBio] = useMMKVString(AVAILABLE_BIO_KEY);
  const { reprompt } = useBiometricLogin(onSuccess, onFail);
  return (
    <TouchableOpacity onPress={reprompt}>
      <RoundedBox>
        {availableBio === AuthenticationMethods.FACE ? (
          <FaceIdIcon />
        ) : (
          <TouchIdIcon />
        )}
      </RoundedBox>
    </TouchableOpacity>
  );
};
