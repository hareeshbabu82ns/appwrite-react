import PageContainer from "../../components/PageContainer";
import { Outlet } from "react-router-dom";

const Todo = () => {
  return (
    <PageContainer
      title="Tasks"
      description="tasks to do"
      sx={{ m: "1.5rem 1.5rem" }}
    >
      <Outlet />
    </PageContainer>
  );
};

export default Todo;
