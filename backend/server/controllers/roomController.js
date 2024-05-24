const Room = require("../models/Room.js");
const User = require("../models/User.js");

const createRoom = async (req, res) => {
  try {
    const { roomName, creatorId, avatar, desc } = req.body;

    if (!roomName || !creatorId || !avatar || !desc) {
      return res.status(400).json({ error: "Missing parameter" });
    }

    const newRoom = new Room({
      hostId: creatorId,
      title: roomName,
      avatar,
      desc,
      meetings: [],
      participants: [
        {
          userId: creatorId,
        },
      ],
      pendingUsers: [],
    });

    await newRoom.save();

    res.json({
      success: true,
      message: "Room created successfully!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error creating room!",
      error: err.message,
    });
  }
};

const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();

    res.json(rooms);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Cannot get rooms!",
      error: err.message,
    });
  }
};

const getRoomMembers = async (req, res) => {
  try {
    const { roomId } = req.query;

    // Tìm phòng và populate thông tin của participants
    const room = await Room.findById(roomId).populate(
      "participants.userId",
      "username email avatarUrl role phone"
    ); // Điều chỉnh các trường name và email theo schema User của bạn

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found!",
      });
    }

    res.status(200).json({
      success: true,
      participants: room.participants,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Cannot get room members!",
      error: err.message,
    });
  }
};

const getRoomRequests = async (req, res) => {
  try {
    const { roomId } = req.query;

    // Tìm phòng và populate thông tin của participants
    const room = await Room.findById(roomId).populate({
        path: 'pendingUsers',
        select: 'username email avatarUrl role phone'
      });

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found!",
      });
    }

    res.status(200).json({
      success: true,
      requests: room.pendingUsers,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Cannot get room requests!",
      error: err.message,
    });
  }
};

const joinRoom = async (req, res) => {
  try {
    const { userId, roomId } = req.body;

    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found!",
      });
    }

    room.pendingUsers.push(userId);

    await room.save();

    res.status(200).json({
      success: true,
      message: "User added to pendingUsers successfully!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Cannot join room!",
      error: err.message,
    });
  }
};

const approveUser = async (req, res) => {
  try {
    const { userId, roomId } = req.body;

    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found!",
      });
    }

    room.pendingUsers = room.pendingUsers.filter(
      (pendingUserId) => pendingUserId.toString() !== userId
    );
    room.participants.push({
      userId,
      joinedAt: new Date(),
    });

    await room.save();

    res.status(200).json({
      success: true,
      message: "User approved successfully!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Cannot approve user!",
      error: err.message,
    });
  }
};

const rejectUser = async (req, res) => {
  try {
    const { userId, roomId } = req.body;

    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found!",
      });
    }

    room.pendingUsers = room.pendingUsers.filter(
      (pendingUserId) => pendingUserId.toString() !== userId
    );

    await room.save();

    res.status(200).json({
      success: true,
      message: "User rejected successfully!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Cannot reject user!",
      error: err.message,
    });
  }
};

const inviteToRoom = async (req, res) => {
  try {
    const { userId, roomId } = req.body;

    const room = await Room.findById(roomId);
    const user = await User.findById(userId);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found!",
      });
    }
    if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found!",
        });
      }

    room.participants.push({
      userId,
      joinedAt: new Date(),
    });

    await room.save();

    res.status(200).json({
      success: true,
      message: "User added to participants successfully!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Cannot invite to room!",
      error: err.message,
    });
  }
};

const leaveRoom = async (req, res) => {
  try {
    const { userId, roomId } = req.body;

    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found!",
      });
    }

    const participantIndex = room.participants.findIndex(
      (participant) => participant.userId.toString() === userId
    );
    if (participantIndex === -1) {
      return res.status(400).json({
        success: false,
        message: "User is not a participant of the room!",
      });
    }

    room.participants.splice(participantIndex, 1);

    await room.save();

    res.status(200).json({
      success: true,
      message: "User has left the room successfully!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Cannot leave room!",
      error: err.message,
    });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const { roomId } = req.body;

    // Tìm và xóa phòng từ database
    const deletedRoom = await Room.findByIdAndDelete(roomId);

    if (!deletedRoom) {
      return res.status(404).json({
        success: false,
        message: "Room not found!",
      });
    }

    // // Xóa các cuộc họp thuộc về phòng
    // await Meeting.deleteMany({ _id: { $in: deletedRoom.meetings } });

    res.status(200).json({
      success: true,
      message: "Room deleted successfully!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Cannot delete room!",
      error: err.message,
    });
  }
};

module.exports = {
  createRoom,
  getAllRooms,
  joinRoom,
  approveUser,
  rejectUser,
  inviteToRoom,
  leaveRoom,
  getRoomRequests,
  getRoomMembers,
  deleteRoom,
};
