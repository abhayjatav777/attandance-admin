import {
  ActionIcon,
  Box,
  Flex,
  Group,
  SimpleGrid,
  Title,
  rem,
} from "@mantine/core";

import { useMemo, useState } from "react";
import { useTodayAttendanceQuery } from "../../hooks/all-student-attendance/query/useTodayAttendance.query";
import NoData from "../../component/no-data/NoData";
import AttendanceCard from "../../component/attendance-card/AttendanceCard";
import { DatePickerInput } from "@mantine/dates";
import {
  IconCalendar,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import moment from "moment";

const Dashboard = () => {
  const [date, setDate] = useState<any>(new Date());
  const { data, isLoading } = useTodayAttendanceQuery({
    paging: {
      itemPerPage: 500,
      page: 1,
    },
    date: date,
  });

  const attendance: TAttendanceData[] = useMemo(() => {
    if (!isLoading && data) {
      return data.data;
    } else {
      return [];
    }
  }, [isLoading, data]);

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
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
            Today Attendance
          </Title>
        </Group>
        <Flex align={"center"}>
          <ActionIcon
            onClick={() => setDate(moment(date).subtract(1, "day").toDate())}
            size={"lg"}
            variant="light"
            bg={"white"}
          >
            <IconChevronLeft size={16} />
          </ActionIcon>
          <DatePickerInput
            maxDate={new Date()}
            styles={{ input: { border: "none" } }}
            icon={
              <IconCalendar
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            }
            placeholder="Pick date"
            value={date}
            onChange={setDate}
          />
          <ActionIcon
            disabled={date ? isToday(date) : false}
            onClick={() => setDate(moment(date).add(1, "day").toDate())}
            size={"lg"}
            variant="light"
            bg={"white"}
          >
            <IconChevronRight size={16} />
          </ActionIcon>
        </Flex>
      </Flex>
      <SimpleGrid cols={3} spacing="xl" mt={25}>
        {attendance.map((item) => (
          <AttendanceCard key={item.studentID} data={item} />
        ))}
      </SimpleGrid>
      {attendance.length === 0 && <NoData title="No Data Found" />}
    </Box>
  );
};
export default Dashboard;
