import {
  Box,
  Card,
  Center,
  Divider,
  Group,
  Indicator,
  Text,
  createStyles,
} from "@mantine/core";
import moment from "moment";
import React, { FC, memo } from "react";
import { totalTime } from "../../utils/attendance/totalTime";

interface IAttendanceCard {
  data: TAttendanceData;
}

const AttendanceCard: FC<IAttendanceCard> = ({ data }) => {
  const { classes } = useStyles();

  // Helper function to get status color and classes
  const getStatusStyle = () => {
    switch (data.status) {
      case "absent":
        return {
          color: "#FF0000",
          cardStatus: `${classes.cardAbsent}`,
          statusClasses: `${classes.statusBoxAbsent}`,
        };
      case "on time":
        return {
          color: "#53b1fd",
          cardStatus: `${classes.cardOnTime}`,
          statusClasses: `${classes.statusBoxOnTime}`,
        };
      case "late":
        return {
          color: "#f79009",
          cardStatus: `${classes.cardLate}`,
          statusClasses: `${classes.statusBoxLate}`,
        };
      default:
        return {
          color: "#008080",
          cardStatus: `${classes.cardInitiate}`,
          statusClasses: `${classes.statusBoxInitiate}`,
        };
    }
  };
  return (
    <Card
      shadow="md"
      radius="md"
      className={`${classes.card} ${getStatusStyle().cardStatus}`}
      padding="lg"
    >
      <Group style={{ display: "flex", justifyContent: "space-between" }}>
        <Text fz="md" fw={600} color="dark">
          {data.name}
        </Text>
        <Box
          className={`${classes.statusBox} ${getStatusStyle().statusClasses}`}
        >
          <Center>
            <Indicator
              inline
              size={8}
              position="middle-start"
              color={getStatusStyle().color}
            >
              <Text ml={10} size="xs" weight={500}>
                {data.status}
              </Text>
            </Indicator>
          </Center>
        </Box>
      </Group>
      <Divider my="sm" />
      <Group
        spacing="xl"
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Text c="dimmed" weight={500} size="xs">
            In Time
          </Text>
          <Text fz="sm" weight={500}>
            {data.inTime ? moment(data.inTime).format("LT") : "---"}
          </Text>
        </Box>
        <Box>
          <Text c="dimmed" weight={500} size="xs">
            Out Time
          </Text>
          <Text fz="sm" weight={500}>
            {data.outTime ? moment(data.outTime).format("LT") : "---"}
          </Text>
        </Box>
        <Box>
          <Text c="dimmed" weight={500} size="xs">
            Total
          </Text>
          <Text fz="sm" weight={500}>
            {data.outTime ? totalTime(data.inTime, data.outTime) : "---"}
          </Text>
        </Box>
      </Group>
      <Divider my="sm" />
      <Group style={{ display: "flex", justifyContent: "space-between" }}>
        <Text fz="sm" fw={400} c="dimmed">
          Notes:
        </Text>

        <Text ml={10} size="xs" weight={500}>
          {data?.notes}
        </Text>
      </Group>
    </Card>
  );
};

const useStyles = createStyles((theme) => ({
  card: {
    borderStyle: "solid",
    borderWidth: 0,
    borderLeftWidth: "4px",
    borderRadius: 0,
  },
  cardOnTime: {
    borderColor: "#53b1fd",
  },
  cardLate: {
    borderColor: "#f79009",
  },
  cardAbsent: {
    borderColor: "#FF0000",
    color: "#868e96",
  },
  cardInitiate: {
    borderColor: "#008080",
  },
  statusBox: {
    paddingBlock: "0.3rem",
    paddingInline: "0.7rem",
    borderRadius: "0.4rem",
  },
  statusBoxOnTime: {
    backgroundColor: "#eff8ff",
    color: "#53b1fd",
  },
  statusBoxLate: {
    backgroundColor: "#fffaeb",
    color: "#f79009",
  },
  statusBoxAbsent: {
    backgroundColor: "#FFE5E5",
    color: "#FF0000",
  },
  statusBoxInitiate: {
    backgroundColor: "#94ffff21",
    color: "#008080",
  },
  absentDimmed: {
    visibility: "hidden",
  },
}));

export default memo(AttendanceCard);
