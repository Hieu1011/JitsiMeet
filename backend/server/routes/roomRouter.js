const express = require("express");

const {
  createRoom,
  getAllRooms,
  joinRoom,
  approveUser,
  rejectUser,
  inviteToRoom,
  leaveRoom,
  getRoomMembers,
  getRoomRequests,
  deleteRoom
} = require("../controllers/roomController");

const router = express.Router();

router.post("/createRoom", createRoom);
router.get("/getAllRooms", getAllRooms);
router.post("/joinRoom", joinRoom);
router.post("/approveUser", approveUser);
router.post("/rejectUser", rejectUser);
router.post("/inviteToRoom", inviteToRoom);
router.post("/leaveRoom", leaveRoom);
router.get("/getRoomMembers", getRoomMembers);
router.get("/getRoomRequests", getRoomRequests);
router.post("/deleteRoom", deleteRoom);

module.exports = router;
