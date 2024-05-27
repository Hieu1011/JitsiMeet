import { mongoAPI } from "../axios/axios";

// Hàm tạo cuộc họp mới
export const createMeeting = async (roomId, hostId, title, desc, startTime, participants) => {
    console.log(roomId, hostId, title, desc, startTime, participants) ;
    
    try {
        const response = await mongoAPI.post(`/rooms/${roomId}/meetings`, {
            hostId,
            title,
            desc,
            startTime,
            endTime: null,
            participants
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Hàm lấy tất cả các cuộc họp của một phòng
export const getAllMeetings = async (roomId) => {
    try {
        const response = await mongoAPI.get(`/rooms/${roomId}/meetings`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Hàm cập nhật thông tin của một cuộc họp
export const updateMeeting = async (roomId, meetingId, updateFields) => {
    try {
        const response = await mongoAPI.put(`/rooms/${roomId}/meetings/${meetingId}`, updateFields);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
