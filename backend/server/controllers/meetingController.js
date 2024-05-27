const Meeting = require('../models/Meeting');
const Room = require('../models/Room');

// Tạo một cuộc họp mới và thêm vào mảng meetings của Room
const createMeeting = async (req, res) => {
    try {
        // Tạo một cuộc họp mới và lưu vào cơ sở dữ liệu
        const meeting = new Meeting({
            hostId: req.body.hostId,
            title: req.body.title,
            desc: req.body.desc,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            participants: req.body.participants
        });
        const savedMeeting = await meeting.save();
        
        // Lấy Room tương ứng
        const roomId = req.params.roomId;
        const room = await Room.findById(roomId);
        
        // Thêm đối tượng cuộc họp vào mảng meetings của Room
        room.meetings.push(savedMeeting);
        
        // Lưu Room sau khi đã cập nhật
        await room.save();

        // Trả về kết quả thành công
        res.status(201).json({
            success: true,
            message: "Meeting created and added to room successfully",
            meeting: savedMeeting.toObject(),
            room
        });
    } catch (error) {
      console.log(error);
      
        // Xử lý lỗi nếu có
        res.status(500).json({
            success: false,
            message: "Failed to create meeting",
            error: error.message
        });
    }
};

// Hàm lấy tất cả các cuộc họp trong một phòng
const getAllMeetings = async (req, res) => {
  try {
    const { roomId } = req.params;

    // Tìm kiếm phòng tương ứng
    const room = await Room.findById(roomId).populate({path: 'meetings', select: 'title desc startTime endTime'})

    // Kiểm tra xem phòng có tồn tại không
    if (!room) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    const meetings = room.meetings;

    res.status(200).json({ success: true, meetings });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch meetings",
      error: error.message,
    });
  }
};

const updateMeeting = async (req, res) => {
  try {
    console.log(req);
    
    const { roomId, meetingId } = req.params;
    const updateFields = req.body;

    // Tìm kiếm phòng tương ứng
    const room = await Room.findById(roomId);

    // Kiểm tra xem phòng có tồn tại không
    if (!room) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    // Tìm kiếm cuộc họp trong mảng meetings của phòng
    const meeting = room.meetings.find(meeting => meeting._id.toString() === meetingId);

    // Kiểm tra xem cuộc họp có tồn tại trong phòng không
    if (!meeting) {
      return res.status(404).json({ success: false, message: "Meeting not found" });
    }

    // Cập nhật thông tin của cuộc họp
    Object.assign(meeting, updateFields);
    await room.save();

    res.status(200).json({
      success: true,
      message: "Meeting updated successfully",
      updatedMeeting: meeting,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update meeting",
      error: error.message,
    });
  }
};

module.exports = { createMeeting, getAllMeetings, updateMeeting };
