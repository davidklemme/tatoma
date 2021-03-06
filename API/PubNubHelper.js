export const pnSubscribe = async (
  pn,
  channels,
  message,
  uuid,
  markers,
  setMarkers,
  shoutList,
  setShoutList,
) => {
  console.log('PUBNUB --- subscription request', channels);

  pn.unsubscribeAll();
  var existingListener = {
    message: function () {},
  };
  pn.removeListener(existingListener);
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
  //TODO ensure messages are unique
  pn.addListener({
    message: function (event) {
      console.log(
        `PUBNUB --- [${event.message.type}: received]`,
        '  | ',
        event.channel,
        '| ',
        event.message.latitude + ' : ' + event.message.longitude,
      );
      //TODO clean up and use seperate method to check against array of valid types
      if (event.message.type === 'ping') {
        const newMarker = {
          latitude: parseFloat(event.message.latitude),
          longitude: parseFloat(event.message.longitude),
          channel: event.channel,
          timestamp: event.message.timestamp,
        };
        setMarkers(markers => [...markers, newMarker]);
      }
      if (event.message.type === 'shout') {
        const newMessage = {
          message: event.message.message,
          channel: event.channel,
          timestamp: event.message.timestamp,
          uuid: event.message.uuid,
        };
        setShoutList(shoutList => [...shoutList, newMessage]);
      }
      if (event.message.type !== 'shout' && event.message.type !== 'ping') {
        console.warn(
          `PUBNUB --- [${event.message.type}] | received message without valid type`,
        );
      }
    },
  });
};

export const pnPublish = async (pn, channels, message, uuid, type) => {
  console.log('--- PUBNUB --- Publish request \n to channel :', channels, type);
  //TODO handle multi channel messages
  pn.publish(
    {
      channel: channels,
      message: message,
      uuid: uuid,
    },
    function (status, response) {
      if (status.error) {
        console.error('[PUBLISH]', status);
      } else {
        console.log(
          '[PUBLISH: sent]',
          'timetoken: ' + response.timetoken,
          message,
        );
      }
    },
  );
};

export const pnUnsubscribe = async (pn, channels, message, uuid) => {};
