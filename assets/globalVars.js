import {retrieveKey} from '../API/EncStorage';

export default async function getKey(api, tokentype) {
  const key = await retrieveKey('API');
  const jsonKey = JSON.parse(key).tokenSet;
  const token = jsonKey.find(
    el => el.api === api && el.tokentype === tokentype,
  );
  // console.debug('retrieved token:', token.token);
  return token.token.toString();
}
