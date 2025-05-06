import AttendanceDetailModel from "models/AttendanceDetailModel";

const attendanceDetailModel = new AttendanceDetailModel();

export const addAttendanceDetail = async (attendanceDetailData) => {
  try {
    return await attendanceDetailModel.addAttendanceDetail(
      attendanceDetailData
    );
  } catch (error) {
    console.error("Error adding attendance detail:", error);
    throw error;
  }
};
