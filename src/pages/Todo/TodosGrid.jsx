import { useState } from "react";
import StyledDataGrid from "../../components/StyledDataGrid";
import { GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { useDeleteTodoMutation, useGetTodosQuery } from "../../state/todosApi";



const TodosGrid = () => {
  const [ page, setPage ] = useState( 0 );
  const [ pageSize, setPageSize ] = useState( 25 );
  const [ sort, setSort ] = useState( {} );
  const [ filters, setFilters ] = useState( [] );

  const { data: todos, isLoading } = useGetTodosQuery( { pageSize, offset: page * pageSize, sort, filters } );


  const [ deleteTodo ] = useDeleteTodoMutation()
  const handleDelete = async ( id ) => {
    // console.log( id )
    await deleteTodo( id )
  };

  const columns = [
    {
      field: "$id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "content",
      headerName: "Title",
      flex: 2,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      getActions: ( { id } ) => {
        return [
          <GridActionsCellItem
            key={`edit_${id}`}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => { }}
            color="inherit"
          />,
          <GridActionsCellItem
            key={`delete_${id}`}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDelete( id )}
            color="inherit"
          />,
        ];
      }
    },
  ];

  return (
    <>
      <StyledDataGrid
        loading={isLoading}
        rows={todos?.documents || []}
        columns={columns}
        getRowId={( row ) => row[ "$id" ]}
        pagination
        page={page}
        // sx={{ height: "80vh" }}
        autoHeight
        initialState={{
          pagination: {
            paginationModel: { pageSize, page },
          },
          columns: {
            columnVisibilityModel: {
              $id: false,
            },
          },
        }}
        rowCount={todos?.total || 0}
        paginationMode="server"
        sortingMode="server"
        filterMode="server"
        onPaginationModelChange={( m ) => {
          if ( page !== m.page ) setPage( m.page );
          if ( pageSize !== m.pageSize ) setPageSize( m.pageSize );
        }}
        onSortModelChange={( m ) => {
          setSort( m[ 0 ] );
        }}
        onFilterModelChange={( newFilterModel ) => {
          console.log( newFilterModel );
          setFilters( newFilterModel.items )
        }}
      ></StyledDataGrid>
    </>
  );
};

export default TodosGrid;
