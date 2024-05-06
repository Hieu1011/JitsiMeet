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
          token='eyJraWQiOiJ2cGFhcy1tYWdpYy1jb29raWUtYWE4NzkxNzk1OWNmNGYwZjk1ZDNiNWVhYzQ4ZWRiMWUvMTk1YzhkLVNBTVBMRV9BUFAiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJqaXRzaSIsImlzcyI6ImNoYXQiLCJpYXQiOjE3MTQzODM1ODcsImV4cCI6MTcxNDM5MDc4NywibmJmIjoxNzE0MzgzNTgyLCJzdWIiOiJ2cGFhcy1tYWdpYy1jb29raWUtYWE4NzkxNzk1OWNmNGYwZjk1ZDNiNWVhYzQ4ZWRiMWUiLCJjb250ZXh0Ijp7ImZlYXR1cmVzIjp7ImxpdmVzdHJlYW1pbmciOnRydWUsIm91dGJvdW5kLWNhbGwiOnRydWUsInNpcC1vdXRib3VuZC1jYWxsIjpmYWxzZSwidHJhbnNjcmlwdGlvbiI6dHJ1ZSwicmVjb3JkaW5nIjp0cnVlfSwidXNlciI6eyJoaWRkZW4tZnJvbS1yZWNvcmRlciI6ZmFsc2UsIm1vZGVyYXRvciI6dHJ1ZSwibmFtZSI6IjIwNTIwOTk0IiwiaWQiOiJnb29nbGUtb2F1dGgyfDEwNjYzNjY0MjEyMjIyNzQzMTc1MyIsImF2YXRhciI6IiIsImVtYWlsIjoiMjA1MjA5OTRAZ20udWl0LmVkdS52biJ9fSwicm9vbSI6IioifQ.CrvFZhr1KLjIu0D8aiv-IPbFiRRisjDe9b4rTycN5KSgrFc0-nxoRosGHKushrZdCIMB_gEqVGKAQJpu3QI2ai1r1NBk9SOdqk6mQE2HbzB148-Mh8xEKwh35eWdZvpGh7RBz3fDMDaIhkI85vZYEfuI1DAQSssZHlUsNEMUh_T5mmeZOPLgzJ5Lnx61_a15aqRv7zf4itPIypn8Z0q163tl6HLpNBmADXgJPdYeXdH68Lh7mo4YZXcQMZb_T0nR6ab3OB000KjK4Qg0PwQcLnTWVLkguamtI-tRJita7aErMMFa8oTlcdRoDLOzoKuGmRBdKRZv3IcqjFG7GycgLQ'
          // userInfo={{displayName: userInfo.displayName, email: userInfo.email}}
          serverURL={'https://8x8.vc/'} />
  );
};

export default Meeting;
