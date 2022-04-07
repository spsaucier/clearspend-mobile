import { PixelRatio, Dimensions } from 'react-native';
import tw from '../Styles/tailwind';

export const defaultCellInputStyles = () => {
  const WIDTH = Dimensions.get('window').width;
  const FONT_SIZE = 24;
  const LINE_HEIGHT = FONT_SIZE * 2.5;
  const WIDTH_AR = (FONT_SIZE * 2) / WIDTH;
  const HEIGHT_AR = (LINE_HEIGHT) / WIDTH;

  return {
    root: { padding: 20, minHeight: 300, maxWidth: 100 },
    codeFieldRoot: { marginTop: 20 },
    cellRoot: {
      width: WIDTH_AR * WIDTH,
      height: HEIGHT_AR * WIDTH * PixelRatio.getFontScale(),
      borderWidth: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderColor: 'transparent',
      ...tw`rounded`,
      borderRadius: 5,
      marginHorizontal: 4,
    },
    focusCell: {
      opacity: 1,
    },
    cellText: {
      lineHeight: LINE_HEIGHT,
      fontSize: FONT_SIZE,
      textAlign: 'center' as 'center',
      fontFamily: 'telegraf',
      fontWeight: '500' as '500',
      color: tw.color('primary'),
    },
  };
};
