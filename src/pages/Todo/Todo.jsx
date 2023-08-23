import { useState } from "react";
import { useDispatch } from "react-redux";
import PageContainer from "../../components/container/PageContainer";
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Box } from "@mui/material";
import Header from "../../components/Header";
import { addTodoApi, useAddTodoMutation } from "../../state/todosApi";
import TodosGrid from "./TodosGrid";

const Todo = () => {
  const [ currentTodo, setCurrentTodo ] = useState( "" );

  const dispatch = useDispatch()

  const [ addTodoMutation ] = useAddTodoMutation()

  const handleAddTodo = async ( e ) => {
    e.preventDefault();
    // console.log('Adding Todo');
    const data = {
      content: currentTodo,
      isComplete: false,
    };
    // console.log(data, user);
    dispatch( addTodoApi( { data, addTodoMutation } ) )
    setCurrentTodo( "" );
  };

  return (
    <PageContainer title="Tasks" description="tasks to do">
      <Box m="1.5rem 1.5rem">
        <Header title={`Tasks `} subtitle="tasks to do" />
        <Grid container spacing={2}>
          <Grid xs={12}>
            <form onSubmit={handleAddTodo}>
              <input
                type="text"
                placeholder="🤔   What to do today?"
                value={currentTodo}
                onChange={( e ) => setCurrentTodo( e.target.value )}
              ></input>
            </form>
          </Grid>
          <Grid xs={12}>
            <TodosGrid />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )

};

export default Todo;
