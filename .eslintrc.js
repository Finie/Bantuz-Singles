module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {'prettier/prettier': ['error', {endOfLine: 'auto'}]},
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.jsx'],
      rules: {
        'no-undef': 'off',
      },
    },
  ],
};
