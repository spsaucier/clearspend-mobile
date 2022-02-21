import React, { useEffect } from 'react';
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
  promptOnMount?: boolean;
}

export const PromptBio = ({ onSuccess, onFail, promptOnMount }: Props) => {
  const [availableBio] = useMMKVString(AVAILABLE_BIO_KEY);
  const { reprompt } = useBiometricLogin(onSuccess, onFail);

  useEffect(() => {
    if (promptOnMount) {
      reprompt();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TouchableOpacity onPress={reprompt}>
      <RoundedBox>
        {availableBio === AuthenticationMethods.FACE ? <FaceIdIcon /> : <TouchIdIcon />}
      </RoundedBox>
    </TouchableOpacity>
  );
};
