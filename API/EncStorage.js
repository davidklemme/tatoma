import EncryptedStorage from 'react-native-encrypted-storage';
import {fetchAPIKeys} from './Relay';

export async function storeKey(type, tokenSet) {
  console.debug('storing keySet: ', tokenSet);
  try {
    await EncryptedStorage.setItem(
      type,
      JSON.stringify({
        tokenSet,
      }),
    );
  } catch (error) {
    console.error(error);
  }
}

export const retrieveKey = async type => {
  try {
    const key = await EncryptedStorage.getItem(type);
    if (!key) {
      console.debug('Cannot find valid keySet in local Storage');
      try {
        const newKey = await fetchAPIKeys();
        console.debug('fetched keys', newKey);
        if (newKey) {
          await storeKey(type, newKey);
        }

        return key;
      } catch (e) {
        console.error(e);
      }
    }
    return key;
  } catch (e) {
    console.error(e);
  }
};
