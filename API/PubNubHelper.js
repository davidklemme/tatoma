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

export const pnSubscribe = async (
  pn,
  channels,
  message,
  uuid,
  markers,
  setMarkers,
) => {
  console.log('PUBNUB --- subscription request', channels);
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
  console.log(
    '===> subscribed channels: ',
    pn.getSubscribedChannels(),
    '\n===> with topics: ',
    channels,
  );
  pn.addListener({
    message: function (event) {
      console.log(
        'PUBNUB --- [MESSAGE: received]',
        '  | ',
        event.channel,
        '| ',
        event.message.latitude + ' : ' + event.message.longitude,
      );
      const newMarker = {
        latitude: parseFloat(event.message.latitude),
        longitude: parseFloat(event.message.longitude),
        channel: event.channel,
        timestamp: event.message.timestamp,
      };
      setMarkers(markers => [...markers, newMarker]);
    },
  });
};

export const pnPublish = async (pn, channels, message, uuid) => {
  console.log('--- PUBNUB --- Publish request \n to channel :', channels);
  //TODO handle multi channel messages
  pn.publish(
    {
      channel: channels,
      message: message,
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
