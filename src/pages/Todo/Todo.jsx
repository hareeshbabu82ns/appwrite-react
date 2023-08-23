import PageContainer from "../../components/container/PageContainer";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import TodosGrid from "./TodosGrid";

const Todo = () => {
  return (
    <PageContainer title="Tasks" description="tasks to do">
      <Box m="1.5rem 1.5rem">
        <Header title={`Tasks `} subtitle="tasks to do" />
        <Grid container spacing={2}>
          <Grid xs={12}>
            <TodosGrid />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Todo;
