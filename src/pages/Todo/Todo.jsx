import PageContainer from "../../components/container/PageContainer";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import TodosGrid from "./TodosGrid";

const Todo = () => {
  return (
    <PageContainer
      title="Tasks"
      description="tasks to do"
      sx={{ m: "1.5rem 1.5rem" }}
    >
      <Grid container spacing={2}>
        <Grid xs={5}>
          <TodosGrid />
        </Grid>
        <Grid xs={"auto"}>details</Grid>
      </Grid>
    </PageContainer>
  );
};

export default Todo;
