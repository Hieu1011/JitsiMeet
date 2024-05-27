const express = require("express");
const {
  createMeeting,
  getAllMeetings,
  updateMeeting,
} = require("../controllers/meetingController");

const router = express.Router();

router.post("/rooms/:roomId/meetings", createMeeting);
router.get("/rooms/:roomId/meetings", getAllMeetings);
router.patch("/rooms/:roomId/meetings/:meetingId", updateMeeting);

module.exports = router;
