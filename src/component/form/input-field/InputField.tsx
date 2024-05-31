import { Box, Text, TextInput, TextInputProps } from "@mantine/core";
import { GetInputProps } from "@mantine/form/lib/types";
import React, { memo } from "react";

interface IInputField {
  label: string;
  getInputProps: GetInputProps<any>;
  name: string;
  type?: TextInputProps["type"];
}

const InputField: React.FC<IInputField> = ({
  label,
  getInputProps,
  name,
  type = "text",
}) => {
  return (
    <Box style={{ marginTop: "1rem", marginBottom: "1rem" }}>
      <Text mb={15} style={{ marginBottom: "0.4rem", marginTop: "0.4rem" }}>
        {label}
      </Text>
      <TextInput type={type} placeholder="" {...getInputProps(name)} />
    </Box>
  );
};

export default memo(InputField);
