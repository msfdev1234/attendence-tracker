import FirebaseBaseModel from "./FirebaseBaseModel";

class AttendanceDetailModel extends FirebaseBaseModel {
  constructor() {
    super("attendanceDetail");
  }

  async addAttendanceDetail(data) {
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("An array of attendance details data is required");
    }
    return await this.insertBulk(data);
  }
}

export default AttendanceDetailModel;
