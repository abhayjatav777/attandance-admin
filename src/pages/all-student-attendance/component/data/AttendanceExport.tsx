import { Group } from "@mantine/core";
import React, { FC, memo } from "react";
import ExcelExport from "../../../../component/excel-export/ExcelExport";
import { useGetAllStudentAttendance } from "../../../../hooks/all-student-attendance/query/useAllStudentAttendance.query";

interface IAttendanceExport {
  date: Date;
}

const AttendanceExport: FC<IAttendanceExport> = ({ date }) => {
  const { data, isLoading } = useGetAllStudentAttendance({ date });
  return (
    <Group>
      <ExcelExport
        loading={isLoading}
        fileName={"Attendance_" + new Date().toDateString()}
        ExcelData={data?.data}
      />
    </Group>
  );
};

export default memo(AttendanceExport);
