import { useDeleteTodoMutation, useUpdateTodoMutation } from "../../state/todosApi";
import { Checkbox, IconButton, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';

const TodoItem = ( { item } ) => {


  const [ deleteTodo ] = useDeleteTodoMutation()
  const [ updateTodo ] = useUpdateTodoMutation()

  const handleComplete = async ( e, item ) => {
    const data = {
      isComplete: !item[ "isComplete" ],
    };
    await updateTodo( { id: item[ "$id" ], data } )
  };

  const handleDelete = async ( e, item ) => {
    await deleteTodo( item[ "$id" ] )
  };
  const labelId = `checkbox-list-label-${item[ "$id" ]}`;

  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={( e ) => handleDelete( e, item )}>
          <DeleteIcon />
        </IconButton>
      }
      disablePadding
    >
      <ListItemAvatar>
        <Checkbox
          edge="start"
          checked={item[ "isComplete" ]}
          tabIndex={-1}
          disableRipple
          inputProps={{ 'aria-labelledby': labelId }}
          onChange={( e ) => handleComplete( e, item )}
        />
      </ListItemAvatar>
      <ListItemText id={labelId} primary={item[ "content" ]} />

    </ListItem>
  );
};

export default TodoItem;
