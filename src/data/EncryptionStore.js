import EncryptedStorage from 'react-native-encrypted-storage';

const userTokenKey = 'bantuUsertokenKey';

const userKeyStore = 'bantuUserKey';

const storeBantuUser = async user => {
  try {
    await EncryptedStorage.setItem(userKeyStore, JSON.stringify(user));
  } catch (error) {
    console.log('sfgsafjdgfsagfdsgad ');
  }
};

const storeToken = async token => {
  try {
    await EncryptedStorage.setItem(userTokenKey, JSON.stringify(token));
  } catch (error) {
    console.log('sfgsafjdgfsagfdsgad ');
  }
};

const retrieveBantuUser = async () => {
  try {
    const result = await EncryptedStorage.getItem(userKeyStore);

    if (result !== undefined) {
      // Congrats! You've just retrieved your first value!
      return JSON.parse(!result ? '{}' : result);
    }
  } catch (error) {
    // There was an error on the native side
  }
};

const getUserToken = async () => {
  try {
    const result = await EncryptedStorage.getItem(userTokenKey);

    if (result !== undefined) {
      // Congrats! You've just retrieved your first value!
      return JSON.parse(!result ? '{}' : result);
    }
  } catch (error) {
    // There was an error on the native side
  }
};

const destroyUser = async () => {
  try {
    await EncryptedStorage.clear();
  } catch (error) {}
};

export default {
  storeBantuUser,
  retrieveBantuUser,
  storeToken,
  getUserToken,
  destroyUser,
};
