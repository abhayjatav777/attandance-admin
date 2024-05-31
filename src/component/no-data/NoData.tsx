import { Center, Text } from "@mantine/core";
import { IconMoodEmpty } from "@tabler/icons-react";
import React, { FC, memo } from "react";

interface TNoData {
  title: string;
}

const NoData: FC<TNoData> = ({ title = "No Data Found" }) => {
  return (
    <Center mih={"90vh"} style={{ flexDirection: "column" }}>
      <IconMoodEmpty size={45} color="#ff008a" />
      <Text variant="text" size={25} weight={"bold"} color="#ff008a">
        {title}
      </Text>
    </Center>
  );
};

export default memo(NoData);
