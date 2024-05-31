import { createStyles, Text, Flex, Box, Stack } from "@mantine/core";
import ThemePagination from "../../../component/table/pagination/ThemePagination";
import { FC, memo } from "react";
import { totalTime } from "../../../utils/attendance/totalTime";
import moment from "moment";
import ThemeLoader from "../../../component/loader/ThemeLoader";
import NoData from "../../../component/no-data/NoData";

interface IAttendanceList {
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  pagedData: { total: number };

  loading: boolean;
  attendance: TAttendanceData[];
}

const AttendanceList: FC<IAttendanceList> = ({
  pagedData,
  setActivePage,
  loading,
  attendance,
}) => {
  const { classes } = useStyles();

  const list = attendance.map((item) => (
    <Box>
      <Box className={classes.list}>
        <Flex
          mih={50}
          justify="space-between"
          align="center"
          direction="row"
          wrap="wrap"
        >
          <Flex mih={50} justify="space-between" align="center" w={"100%"}>
            <Box className={classes.detailsContainer} p={0} m={0}>
              <Text weight={600} size="sm" c="#ff008a">
                {item.name}
              </Text>
            </Box>
            <Box className={classes.detailsContainer} p={0} m={0}>
              <Text weight={600} size="sm">
                {moment(item.createdAt).format("DD-MMM-YYYY ")}
              </Text>

              <Text weight={500} size="sm" c="dimmed">
                Total Hours :
                {item.outTime ? totalTime(item.inTime, item.outTime) : " ---"}
              </Text>
            </Box>
            <Box className={classes.detailsContainer}>
              <Text weight={600} size="sm" c="dimmed">
                In
              </Text>
              <Text weight={500} size="sm">
                {item.inTime ? moment(item.inTime).format("LT") : "---"}
              </Text>
            </Box>
            <Box className={classes.detailsContainer}>
              <Text weight={600} size="sm" c="dimmed">
                Out
              </Text>

              <Text weight={500} size="sm">
                {item.outTime ? moment(item.outTime).format("LT") : "---"}
              </Text>
            </Box>
            <Box className={classes.detailsContainer} w={70}>
              <Text weight={600} size="sm" c="dimmed">
                Status
              </Text>
              <Text
                weight={500}
                size="sm"
                color={
                  item.status === "on time"
                    ? "#009900"
                    : item.status === "late"
                    ? "#f79009"
                    : "#FF0000"
                }
              >
                {item.status}
              </Text>
            </Box>
            <Box w="15rem" className={classes.detailsContainer}>
              <Text weight={600} size="sm" c="dimmed">
                Note
              </Text>
              <Text weight={500} size="sm">
                {item.notes ? item.notes : "---"}
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Box>
  ));

  return (
    <Box>
      <Box mt={20}>
        <Stack mt={20} h="85vh" bg="var(--mantine-color-blue-light)">
          {list} <ThemeLoader loading={loading} />
          <ThemePagination
            setPage={setActivePage}
            totalPages={pagedData.total}
          />
          {!loading && attendance.length === 0 && (
            <NoData title="No Attendance Available" />
          )}
        </Stack>
      </Box>
    </Box>
  );
};
const useStyles = createStyles((theme) => ({
  moreIcon: {
    cursor: "pointer",
    color: "#ff008a",
    "&:hover": {
      color: "#1c7ed6",
    },
  },
  list: {
    backgroundColor: "#f3f4fc",
    border: "1px solid #e7e7ea",
    paddingInline: "0.7rem",
  },
  detailsContainer: {
    marginInline: "1rem",
    flexGrow: 1,
    width: "10rem",
  },

  mainBox: {
    paddingTop: 50,
  },
}));
export default memo(AttendanceList);
