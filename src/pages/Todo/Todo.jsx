import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, fetchTodos, selectAllTodos } from "../../state/todosSlice";
import PageContainer from "../../components/container/PageContainer";
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Box } from "@mui/material";
import Header from "../../components/Header";
import { userDataSelector } from "../../state/authSlice";

const Todo = () => {
  // const user = useSelector( userIdSelector )
  const user = useSelector( userDataSelector );
  const [ currentTodo, setCurrentTodo ] = useState( "" );

  const dispatch = useDispatch()
  const todos = useSelector( selectAllTodos )

  const todoStatus = useSelector( ( state ) => state.todos.status )
  const error = useSelector( ( state ) => state.todos.error )

  useEffect( () => {
    if ( todoStatus === 'idle' ) {
      dispatch( fetchTodos() )
    }
  }, [ todoStatus, dispatch ] )

  const handleAddTodo = async ( e ) => {
    e.preventDefault();
    // console.log('Adding Todo');
    const data = {
      content: currentTodo,
      isComplete: false,
    };
    // console.log(data, user);
    dispatch( addTodo( { data, user } ) )
    setCurrentTodo( "" );
  };


  if ( !user ) return <p>You aren't logged in.</p>

  let content

  if ( todoStatus === 'loading' ) {
    content = <p>Loading...</p>
  } else if ( todoStatus === 'succeeded' ) {
    content = todos.map( ( item ) => (
      <TodoItem key={item[ "$id" ]} item={item} />
    ) )
  } else if ( todoStatus === 'failed' ) {
    content = <div>{error}</div>
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
                className="w-full my-8 px-6 py-4 text-xl rounded-lg border-0 focus:ring-2 focus:ring-gray-800 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:shadow-xl shadow-md"
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
