import FirebaseBaseModel from "./FirebaseBaseModel";

class AttendanceModel extends FirebaseBaseModel {
  constructor() {
    super("attendance");
  }

  async addAttendance(data) {
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("An array of attendance data is required");
    }
    return await this.insertBulk("attendance", data);
  }
}

export default AttendanceModel;
