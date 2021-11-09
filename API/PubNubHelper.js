import React, * as react from 'react';
import {Text} from 'react-native';
import AppContext from '../Components/AppContext';
import PubNub from 'pubnub';
import {
  REACT_APP_AUTH0_ISSUER_BASE_URL,
  REACT_APP_AUTH0_CLIENT_ID,
  REACT_APP_AUTH0_BASE_URL,
  REACT_APP_PUBNUB_PUBLISH_KEY,
  REACT_APP_PUBNUB_SUBSCRIBE_KEY,
} from '@env';

export const pnSubscribe = async (pn, channels, message, uuid) => {
  console.log('PUBNUB --- subscription request');
  pn.subscribe(
    {
      channels: [channels],
      withPresence: true,
    },
    function (status, response) {
      console.log('--- PUBNUB ---', response);
      if (status.error) {
        console.error('[SUBSCRIPTION]', status);
      } else {
        console.log(
          '[SUBSCRIPTION: subscribed]',
          'timetoken: ' + response.timetoken,
        );
      }
    },
  );
};

export const pnPublish = async (pn, channels, message, uuid) => {
  console.log('--- PUBNUB --- Publish request \n to channel :', channels[0]);
  //TODO handle multi channel messages
  pn.publish(
    {
      channel: channels,
      message: {lat: `${52}`, long: `${13}`, entry: 'anEntry'},
    },
    function (status, response) {
      if (status.error) {
        console.error('[PUBLISH]', status);
      } else {
        console.log('[PUBLISH: sent]', 'timetoken: ' + response.timetoken);
      }
    },
  );
};

export const pnUnsubscribe = async (pn, channels, message, uuid) => {};
