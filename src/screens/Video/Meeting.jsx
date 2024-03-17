import React, {useCallback, useRef} from 'react';

import {JitsiMeeting} from '@jitsi/react-native-sdk/index';

const Meeting = ({navigation, route}) => {
  const jitsiMeeting = useRef(null);

  const { room } = route.params;

  const onReadyToClose = useCallback(() => {
    navigation.navigate('Home');
    jitsiMeeting.current.close();
  }, [navigation]);

  const eventListeners = {
    onReadyToClose
  };

  return (
      <JitsiMeeting
          eventListeners={eventListeners}
          ref={jitsiMeeting}
          style={{flex: 1}}
          room={room}
          serverURL={'https://meet.jit.si/'} />
  );
};

export default Meeting;
