import React, { useCallback, useEffect, useRef, useState } from 'react';
import { JitsiMeeting } from '@jitsi/react-native-sdk/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { ActivityIndicator, View, Text, SafeAreaView, LogBox } from 'react-native';
import { useSelector } from 'react-redux';
import { createMeeting, updateMeeting } from '../../api/meetingApi';
// Remove unused imports: LogBox, useEffect (duplicated)
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Meeting = ({ navigation, route }) => {
  const { data, room, roomId } = route.params;
  const jitsiMeeting = useRef(null);
  const [meetingId, setMeetingId] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const userInfo = useSelector(state => state.user.info);
  console.log(userInfo);

  const [token, setToken] = useState('');

  const onReadyToClose = useCallback(async () => {
      navigation.goBack();
      if (jitsiMeeting.current) {
        jitsiMeeting.current.end();
      }

  }, [navigation]);

  const adminLeft = useCallback(async () => {
    try {
      console.log('Ending meeting with ID:', meetingId);
      if (meetingId) {
        await updateMeeting(roomId, meetingId, { endTime: new Date() });
        setMeetingId(''); // Reset the meetingId after closing the meeting
      } else {
        console.error('Meeting ID is missing');
      }
    } catch (error) {
      console.error(error);
    } finally {
      navigation.goBack();
      if (jitsiMeeting.current) {
        jitsiMeeting.current.end();
      }
    }
  }, [roomId, meetingId, navigation]);

  const adminJoined = useCallback(async() => {
    try {
      const currentUser = {
        userId: userInfo.id,
        joinedAt: new Date()
      }
      const time = moment().format('HH:mm, DD/MM/YYYY');
      const res = await createMeeting(roomId, userInfo.id, "Cuộc họp", `${time} tại ${data.title}`, new Date(), [currentUser])
      console.log(res.meeting._id);
      
      setMeetingId(res.meeting._id)
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onConferenceWillJoin = useCallback(() => {
    console.log('Conference Will Join');
  }, []);

  const adminListerners = {
    onReadyToClose: () => onReadyToClose(),
    onConferenceLeft: () => adminLeft(),
    onConferenceJoined: () => adminJoined(),
    onConferenceWillJoin
  };

  const memberListerners = {
    onReadyToClose,
    onConferenceWillJoin
  };


  const getToken = async () => {
    try {
      const tokenRes = await AsyncStorage.getItem('token');
      if (!tokenRes) return;
      else setToken(tokenRes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  // Kiểm tra xem userInfo có giá trị không trước khi truyền vào JitsiMeeting
  if (!userInfo || token === '') {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10
        }}>
        <ActivityIndicator size={24} />
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            textAlignVertical: 'center'
          }}>
          Loading
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <JitsiMeeting
      eventListeners={userInfo.moderator ? adminListerners : memberListerners}
      ref={jitsiMeeting}
      config={{
        disableModeratorIndicator: true,
        hideRecordingLabel: true,
        screenshotCapture: {
          enabled: true,
          mode: 'recording'
        }
      }}
      flags={{ 'invite.enabled': false }}
      style={{ flex: 1 }}
      room={room}
      token={token}
      userInfo={{
        displayName: userInfo.name,
        avatarURL: userInfo.avatar,
        email: userInfo.email
      }}
      serverURL={'https://8x8.vc/'}
    />
  );
};

export default Meeting;
