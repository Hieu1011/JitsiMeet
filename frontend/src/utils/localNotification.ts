import notifee from '@notifee/react-native'

// Tạo thông báo về cuộc họp 
export const onDisplayNotification = async(timetring: string) =>{
  await notifee.requestPermission()

  const channelId = await notifee.createChannel({
    id: 'Meeting',
    name: 'Meeting Calendar'
  })

  await notifee.displayNotification({
    title: 'Thông báo về lịch trình ngày mai',
    body: `Bạn sẽ có một cuộc họp vào lúc ${timetring}`,
    android:{
      channelId,
      // smallIcon: ''
      pressAction: {
        id: 'default'
      }
    }
  })
}