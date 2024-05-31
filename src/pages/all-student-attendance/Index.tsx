import { MonthPickerInput } from "@mantine/dates";
import AttendanceList from "./component/AttendanceList";
import { Box, Flex, Group, Title } from "@mantine/core";

import { useGetAllStudentAttendance } from "../../hooks/all-student-attendance/query/useAllStudentAttendance.query";
import { useMemo, useState } from "react";
import { CONSTANTS } from "../../constant";
import AttendanceExport from "./component/data/AttendanceExport";
const AllStudentAttendance = () => {
  const [month, setMonth] = useState<any>(new Date());
  const [activePage, setActivePage] = useState(1);
  const [pagedData, setPagedData] = useState({
    total: 0,
  });

  const { data, isLoading } = useGetAllStudentAttendance({
    paging: {
      itemPerPage: CONSTANTS.PAGE_LIMIT,
      page: activePage,
    },
    date: month,
  });

  const attendance: TAttendanceData[] = useMemo(() => {
    if (!isLoading && data) {
      setPagedData(data.pageData);
      return data.data;
    } else {
      return [];
    }
  }, [isLoading, data]);

  return (
    <Box>
      <Box>
        <Flex
          mih={50}
          gap="md"
          justify="space-between"
          align="center"
          direction="row"
        >
          <Group>
            <Title order={3} weight={500} c="gray">
              Time Sheets
            </Title>
            <MonthPickerInput
              placeholder={month}
              value={month}
              onChange={setMonth}
            />
          </Group>
          <AttendanceExport date={month} />
        </Flex>
      </Box>

      <AttendanceList
        pagedData={pagedData}
        setActivePage={setActivePage}
        loading={isLoading}
        attendance={attendance}
      />
    </Box>
  );
};
export default AllStudentAttendance;
