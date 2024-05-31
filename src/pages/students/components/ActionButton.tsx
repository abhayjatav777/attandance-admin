import { ActionIcon, Group, Tooltip } from "@mantine/core";
import {
  IconEdit,
  IconExternalLink,
  IconUser,
  IconUserOff,
} from "@tabler/icons-react";
import React, { FC, memo } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateBlockActionMutation } from "../../../hooks/students/mutation/useUpdateBlockAction.mutation";
import { showNotification } from "@mantine/notifications";

interface IActionButton {
  row: TStudentData;
  handleClick: () => void;
  refresh: () => void;
}

const ActionButton: FC<IActionButton> = ({ handleClick, refresh, row }) => {
  const navigate = useNavigate();
  const { isLoading, mutateAsync } = useUpdateBlockActionMutation();
  const handleBlockAction = async () => {
    const res = await mutateAsync({ _id: row._id });
    if (res.status === "success") {
      refresh();
      showNotification({
        message: res.message,
        color: "green",
      });
    } else {
      showNotification({
        message: res.message,
        color: "red",
      });
    }
  };

  return (
    <Group>
      <Tooltip label="Edit Student">
        <ActionIcon
          variant="outline"
          color="blue"
          onClick={() => {
            handleClick();
          }}
        >
          <IconEdit />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Attendance">
        <ActionIcon
          variant="outline"
          color="teal"
          onClick={() => navigate("/attendance/" + row._id)}
        >
          <IconExternalLink size={20} cursor={10} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label={row.blocked ? "Un-Block Student" : "Block Student"}>
        <ActionIcon
          loading={isLoading}
          disabled={isLoading}
          onClick={handleBlockAction}
          variant="outline"
          color={row.blocked ? "red" : "cyan"}
        >
          {row.blocked ? (
            <IconUserOff size={20} cursor={10} />
          ) : (
            <IconUser size={20} cursor={10} />
          )}
        </ActionIcon>
      </Tooltip>
    </Group>
  );
};

export default memo(ActionButton);
