import { useEffect, useState } from "react";
import { useGetUser } from "../../hooks";
import TodoItem from "./TodoItem";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, fetchTodos, selectAllTodos } from "../../state/todosSlice";

const Todo = () => {
  const [ { user } ] = useGetUser();
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
    <>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          className="w-full my-8 px-6 py-4 text-xl rounded-lg border-0 focus:ring-2 focus:ring-gray-800 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:shadow-xl shadow-md"
          placeholder="🤔   What to do today?"
          value={currentTodo}
          onChange={( e ) => setCurrentTodo( e.target.value )}
        ></input>
      </form>
      <section className="todos-list">
        <h2>Posts</h2>
        {content}
      </section>
    </>
  )

};

export default Todo;
