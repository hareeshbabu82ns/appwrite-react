import {
  // GridToolbarColumnsButton,
  GridToolbarContainer,
  // GridToolbarDensitySelector,
  GridToolbarExport,
} from "@mui/x-data-grid";
import PropTypes from "prop-types";
import { useState } from "react";
import {
  IconButton,
  Button,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import NewIcon from "@mui/icons-material/CreateOutlined";
import DownloadIcon from "@mui/icons-material/DownloadOutlined";
import RefetchIcon from "@mui/icons-material/RefreshOutlined";
import AddIcon from "@mui/icons-material/AddOutlined";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const TodoGridToolbar = ({ onRefetch, onExport, onAddTodo, onNewClicked }) => {
  const [todo, setTodo] = useState("");
  return (
    <GridToolbarContainer>
      <Grid2 container flex={1} alignItems={"center"} mx={1}>
        <Grid2 xs={"auto"}>
          <Stack direction={"row"} spacing={2}>
            {/* <GridToolbarColumnsButton /> */}
            {/* <GridToolbarDensitySelector /> */}
            <Button
              size="small"
              color="primary"
              startIcon={<NewIcon />}
              onClick={onNewClicked}
            >
              New
            </Button>
            {!onExport && <GridToolbarExport />}
          </Stack>
        </Grid2>
        <Grid2 flexGrow={1} />
        <Grid2 xs={"auto"} gap={2}>
          <Stack direction={"row"} gap={1}>
            <TextField
              label="Add Todo..."
              variant="outlined"
              size="small"
              fullWidth
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
        </Grid2>
      </Grid2>
    </GridToolbarContainer>
  );
};

TodoGridToolbar.propTypes = {
  onRefetch: PropTypes.func,
  onExport: PropTypes.func,
  onAddTodo: PropTypes.func,
  onNewClicked: PropTypes.func,
};

export default TodoGridToolbar;
