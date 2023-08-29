import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from "@mui/x-data-grid";
import PropTypes from "prop-types";
import { useState } from "react";
import FlexBetween from "../../components/FlexBetween";
import { IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import DownloadIcon from "@mui/icons-material/DownloadOutlined";
import RefetchIcon from "@mui/icons-material/RefreshOutlined";
import AddIcon from "@mui/icons-material/AddOutlined";

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

export default TodoGridToolbar;
