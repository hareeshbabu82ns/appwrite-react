import { useDispatch } from "react-redux";
import { deleteButton } from "../icons";
import { deleteTodo, updateTodo } from "../../state/todosSlice";

const TodoItem = ( { item } ) => {

  const dispatch = useDispatch()

  const handleComplete = async ( e, item ) => {
    let data = {
      isComplete: !item[ "isComplete" ],
    };
    dispatch( updateTodo( { id: item[ "$id" ], data } ) )
  };

  const handleDelete = async ( e, item ) => {
    dispatch( deleteTodo( item[ "$id" ] ) )
  };

  return (
    <li className="flex justify-between items-center mt-4 px-4">
      <div className="flex">
        <input
          type="checkbox"
          className="h-6 w-6 text-green-500 rounded-md border-4 border-green-200 focus:ring-0 transition duration-75 ease-in-out transform hover:scale-125"
          checked={item[ "isComplete" ]}
          onChange={( e ) => handleComplete( e, item )}
        />
        <div
          className={`capitalize ml-3 text-md font-medium ${item[ "isComplete" ] ? "line-through" : ""
            }`}
        >
          {item[ "content" ]}
        </div>
      </div>
      <button
        onClick={( e ) => handleDelete( e, item )}
        className="focus:outline-none transition duration-75 ease-in-out transform hover:scale-125"
      >
        {deleteButton}
      </button>
    </li>
  );
};

export default TodoItem;
