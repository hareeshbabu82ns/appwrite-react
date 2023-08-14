import { useState } from "react";
import TodoItem from "./TodoItem";
import { useDispatch } from "react-redux";
import PageContainer from "../../components/container/PageContainer";
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Box } from "@mui/material";
import Header from "../../components/Header";
import { addTodoApi, useAddTodoMutation, useGetTodosQuery } from "../../state/todosApi";

const Todo = () => {
  const [ currentTodo, setCurrentTodo ] = useState( "" );

  const dispatch = useDispatch()

  const { data: todos, isLoading, isError, error } = useGetTodosQuery();
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


  let content

  if ( isLoading ) {
    content = <p>Loading...</p>
  } else if ( isError ) {
    content = <div>{error}</div>
  } else if ( todos ) {
    content = todos.map( ( item ) => (
      <TodoItem key={item[ "$id" ]} item={item} />
    ) )
  }

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
            {content}
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )

};

export default Todo;
