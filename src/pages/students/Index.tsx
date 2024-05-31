import React, { useMemo, useRef, useState } from "react";
import { Box, Group, Switch } from "@mantine/core";
import { useGetAllStudent } from "../../hooks/students/query/getAllStudent.query";
import StudentModal, { IStudentModalRef } from "./modal/StudentModal";
import CustomTable from "../../component/table";
import ThemeButton from "../../component/button/ThemeButton";
import { COLUMNS } from "../../columns";
import { CONSTANTS } from "../../constant";
import { IconPlus } from "@tabler/icons-react";
import ActionButton from "./components/ActionButton";

const Students = () => {
  const modalRef = useRef<IStudentModalRef>(null);
  const [checked, setChecked] = useState(false);
  const tableColumns = [...COLUMNS.student];
  const [search, setSearch] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [pagedData, setPagedData] = useState({
    total: 0,
  });
  const { refetch, data, isLoading } = useGetAllStudent({
    paging: {
      itemPerPage: CONSTANTS.PAGE_LIMIT,
      page: activePage,
    },
    searchParams: {
      search,
    },
    blocked: checked,
  });

  const students: TStudentData[] = useMemo(() => {
    if (!isLoading && data) {
      setPagedData(data.pageData);
      return data.data;
    } else {
      return [];
    }
  }, [isLoading, data]);

  tableColumns.push({
    header: "Student Actions",
    key: "editStudent",
    renderCell: (row: TStudentData) => (
      <ActionButton
        handleClick={() => {
          modalRef.current?.toggleModal();
          modalRef.current?.updateData(row);
        }}
        refresh={refetch}
        row={row}
      />
    ),
  });

  return (
    <Box>
      <StudentModal reload={refetch} ref={modalRef} />
      <CustomTable
        loading={isLoading}
        columns={tableColumns}
        data={students}
        paginationProps={{
          setPage: setActivePage,
          totalPages: pagedData.total,
        }}
        headerProps={{
          search: true,
          onChangeText: (text) => setSearch(text),
          rightComponent: (
            <Group spacing={10} mx={10}>
              <Switch
                color="cyan"
                size="lg"
                offLabel="Un-Blocked"
                onLabel="Blocked"
                checked={checked}
                onChange={(event) => setChecked(event.currentTarget.checked)}
              />
              <Box onClick={() => modalRef.current?.toggleModal()}>
                <ThemeButton
                  title="Add Students"
                  mr={15}
                  leftIcon={<IconPlus size={20} />}
                />
              </Box>
            </Group>
          ),
        }}
      />
    </Box>
  );
};

export default Students;
