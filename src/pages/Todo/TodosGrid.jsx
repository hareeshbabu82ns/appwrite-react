import { useState } from "react";
import StyledDataGrid from "../../components/StyledDataGrid";
import {
  GridActionsCellItem,
  GridRowModes,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from "@mui/x-data-grid";
import {
  addTodoApi,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "../../state/todosApi";
import {
  Checkbox,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import PropTypes from "prop-types";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import DownloadIcon from "@mui/icons-material/DownloadOutlined";
import RefetchIcon from "@mui/icons-material/RefreshOutlined";
import AddIcon from "@mui/icons-material/AddOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";

const TodosGrid = () => {
  const [rowModesModel, setRowModesModel] = useState({});
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const [sort, setSort] = useState({});
  const [filters, setFilters] = useState([]);
  const dispatch = useDispatch();

  const {
    data: todos,
    isLoading,
    refetch,
  } = useGetTodosQuery({ pageSize, offset: page * pageSize, sort, filters });

  const [addTodoMutation] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    updateTodo({ id: newRow["$id"], data: { content: newRow.content } });
    return updatedRow;
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const handleDeleteClick = (id) => async () => {
    // console.log( id )
    await deleteTodo(id);
  };

  const handleAddTodo = async (content) => {
    // console.log('Adding Todo');
    const data = {
      content,
      isComplete: false,
    };
    // console.log(data, user);
    return dispatch(addTodoApi({ data, addTodoMutation }));
  };

  const columns = [
    {
      field: "$id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "isComplete",
      headerName: "Done",
      width: 100,
      renderCell: ({ value, row }) => {
        return (
          <Checkbox
            checked={value}
            onChange={(_, checked) =>
              updateTodo({ id: row["$id"], data: { isComplete: checked } })
            }
          />
        );
      },
    },
    {
      field: "content",
      headerName: "Title",
      flex: 2,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={`save_${id}`}
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={`cancel_${id}`}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }
        return [
          <GridActionsCellItem
            key={`edit_${id}`}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={`delete_${id}`}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <>
      <StyledDataGrid
        loading={isLoading}
        rows={todos?.documents || []}
        columns={columns}
        getRowId={(row) => row["$id"]}
        pagination
        page={page}
        // sx={{ height: "80vh" }}
        autoHeight
        initialState={{
          pagination: {
            paginationModel: { pageSize, page },
          },
          columns: {
            columnVisibilityModel: {
              $id: false,
            },
          },
        }}
        rowCount={todos?.total || 0}
        paginationMode="server"
        sortingMode="server"
        filterMode="server"
        onPaginationModelChange={(m) => {
          if (page !== m.page) setPage(m.page);
          if (pageSize !== m.pageSize) setPageSize(m.pageSize);
        }}
        onSortModelChange={(m) => {
          setSort(m[0]);
        }}
        onFilterModelChange={(newFilterModel) => {
          console.log(newFilterModel);
          setFilters(newFilterModel.items);
        }}
        slots={{ toolbar: TodoGridToolbar }}
        slotProps={{
          toolbar: { onRefetch: refetch, onAddTodo: handleAddTodo },
        }}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
      ></StyledDataGrid>
    </>
  );
};

const TodoGridToolbar = ({ onRefetch, onExport, onAddTodo }) => {
  const [todo, setTodo] = useState("");
  return (
    <GridToolbarContainer>
      <FlexBetween width="100%">
        <FlexBetween>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          {!onExport && <GridToolbarExport />}
        </FlexBetween>
        <Stack direction={"row"} gap={1}>
          <TextField
            label="Add Todo..."
            sx={{ mb: "0.5rem", width: "15rem" }}
            variant="standard"
            size="small"
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={async () => {
                      await onAddTodo(todo);
                      setTodo("");
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {onExport && (
            <IconButton size="small" onClick={onExport}>
              <DownloadIcon />
            </IconButton>
          )}
          <IconButton size="small" onClick={onRefetch}>
            <RefetchIcon />
          </IconButton>
        </Stack>
      </FlexBetween>
    </GridToolbarContainer>
  );
};

TodoGridToolbar.propTypes = {
  onRefetch: PropTypes.func,
  onExport: PropTypes.func,
  onAddTodo: PropTypes.func,
};

export default TodosGrid;
