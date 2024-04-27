import React, {useCallback, useRef} from 'react';
import {JitsiMeeting} from '@jitsi/react-native-sdk/index';
import userInfo from '../../../assets/data/userInfo';

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
          token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJteWFwcGlkIiwiaXNzIjoibXlhcHBpZCIsInN1YiI6IioiLCJyb29tIjoiTmhhblN1TVdHIiwiaWF0IjoxNzE0MjA5NzkwLCJuYmYiOjE3MTQxMzcxMjAsImV4cCI6MTcxNDIzNzkyMCwiY29udGV4dCI6eyJ1c2VyIjp7ImlkIjoiMTAxMTIwMDIiLCJuYW1lIjoiZmFuZzEwMTEiLCJlbWFpbCI6ImhpZXV0azIwMDJAZ21haWwuY29tIiwiYXZhdGFyIjoiaHR0cHM6Ly9ib290ZGV5LmNvbS9pbWcvQ29udGVudC9hdmF0YXIvYXZhdGFyMS5wbmcifX19.vggcTnOcIWJAgRTiKX0ixXQIaClJW-6JunNZ04ovsz0'
          userInfo={{displayName: userInfo.displayName, email: userInfo.email}}
          serverURL={'https://meet.jit.si/'} />
  );
};

export default Meeting;
