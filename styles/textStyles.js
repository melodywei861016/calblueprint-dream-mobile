import { StyleSheet } from 'react-native';
import colors from './colors';

const textStyles = StyleSheet.create({
  body: {
    color: colors.textDark,
    fontSize: 20
  },

  titleSmall: {
    color: colors.textDark_70,
    fontSize: 16
  },

  titleMedium: {
    color: colors.textDark,
    fontSize: 20, 
    fontWeight: '700'
  },
  
  titleLarge: {
    color: colors.textDark,
    fontSize: 24, 
    fontWeight: '700'
  },
  
  buttonText: {
    color: colors.textLight,
    fontSize: 20,
    fontWeight: '500'
  },

  toastText: {
    color: colors.textLight,
    fontSize: 20
  },

  linkText: {
    color: colors.primaryYellow,
    fontSize: 20
  },
  

});

export { textStyles };
