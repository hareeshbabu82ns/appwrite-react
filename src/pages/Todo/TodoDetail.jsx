import { useNavigate, useParams } from "react-router-dom";
import {
  addTodoApi,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetTodoQuery,
  useUpdateTodoMutation,
} from "../../state/todosApi";
import RefreshIcon from "@mui/icons-material/RefreshOutlined";
import BackIcon from "@mui/icons-material/ArrowBackOutlined";
import SaveIcon from "@mui/icons-material/SaveOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import React, { useEffect, useState } from "react";
import { Button, IconButton, Stack, Switch, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Panel from "../../components/Panel";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useFormik } from "formik";

const initTodo = {
  content: "",
  isComplete: false,
  userId: "",
};

const TodoDetail = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState(initTodo);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [addTodoMutation] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const { data, isLoading, isFetching, refetch } = useGetTodoQuery(id, {
    skip: id === "new",
  });

  useEffect(() => {
    // console.log(data);
    setTodo(data || initTodo);
  }, [data]);

  const processAdd = async ({ content }, { setSubmitting }) => {
    // console.log('Adding Todo');
    const data = {
      content,
      isComplete: false,
    };
    // console.log(data, user);
    const { payload } = await dispatch(addTodoApi({ data, addTodoMutation }));
    console.log(payload);
    if (payload.error) {
      toast(payload.error.data.message, { type: "error" });
    } else {
      toast("Todo updated");
    }
    setSubmitting(false);
    navigate(`/todos/tasks/${payload.data.$id}`, { replace: true });
    return payload.data;
  };

  const processUpdate = async (
    { $id: id, content, isComplete },
    { setSubmitting }
  ) => {
    const res = await updateTodo({
      id,
      data: { content, isComplete },
    });
    // console.log(res);
    if (res.error) {
      toast(res.error.data.message, { type: "error" });
    } else {
      toast("Todo updated");
    }
    setSubmitting(false);
    return res;
  };

  const processDelete = async (id, { setSubmitting }) => {
    setSubmitting(true);
    const res = await deleteTodo(id);
    // console.log(res);
    if (res.error) {
      toast(res.error.data.message, { type: "error" });
    } else {
      toast("Todo deleted");
      navigate(-1);
    }
    setSubmitting(false);
    return res;
  };

  const validate = (values) => {
    const errors = {};
    if (!values.content) {
      errors.content = "Required";
      return errors;
    }
  };

  const onSubmit = (values, { setSubmitting }) =>
    id === "new"
      ? processAdd(values, { setSubmitting })
      : processUpdate(values, { setSubmitting });

  const {
    submitForm,
    isSubmitting,
    setSubmitting,
    handleChange,
    handleSubmit,
    values,
  } = useFormik({
    initialValues: { ...todo },
    enableReinitialize: true,
    validate,
    onSubmit,
  });

  const toolbarActions = (
    <React.Fragment>
      <IconButton
        disabled={isLoading || isFetching}
        onClick={id === "new" ? undefined : refetch}
      >
        <RefreshIcon />
      </IconButton>
    </React.Fragment>
  );

  const backAction = (
    <IconButton disabled={isLoading || isFetching} onClick={() => navigate(-1)}>
      <BackIcon />
    </IconButton>
  );

  const actionsRight = (
    <Stack direction={"row"} gap={1}>
      <Button
        variant="contained"
        color="primary"
        disabled={isSubmitting}
        onClick={submitForm}
        startIcon={<SaveIcon />}
      >
        Save
      </Button>
      <Button
        variant="contained"
        color="warning"
        disabled={id === "new" || isSubmitting}
        onClick={() => processDelete(id, { setSubmitting })}
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>
    </Stack>
  );

  return (
    <Panel
      title={`TodoDetail ${id}`}
      loading={isLoading || isFetching}
      titleIcon={backAction}
      toolbarActions={toolbarActions}
      actionsRight={actionsRight}
    >
      <form onSubmit={handleSubmit}>
        <Grid2 container>
          <Grid2>
            <TextField
              id="content"
              name="content"
              label="Content"
              type="text"
              onChange={handleChange}
              value={values.content}
            />
          </Grid2>

          <Grid2>
            <Switch
              name="isComplete"
              id="isComplete"
              checked={values.isComplete}
              onChange={handleChange}
            />
          </Grid2>
          {/* <Grid2 xs={12}>
            <pre>{JSON.stringify(todo, null, "\t")}</pre>
          </Grid2> */}
        </Grid2>
      </form>
    </Panel>
  );
};

export default TodoDetail;

// import { useNavigate, useParams } from "react-router-dom";
// import {
//   addTodoApi,
//   useAddTodoMutation,
//   useDeleteTodoMutation,
//   useGetTodoQuery,
//   useUpdateTodoMutation,
// } from "../../state/todosApi";
// import RefreshIcon from "@mui/icons-material/RefreshOutlined";
// import BackIcon from "@mui/icons-material/ArrowBackOutlined";
// import SaveIcon from "@mui/icons-material/SaveOutlined";
// import DeleteIcon from "@mui/icons-material/DeleteOutlined";
// import React, { useEffect, useState } from "react";
// import { Field, Form, Formik } from "formik";
// import { Switch, TextField } from "formik-mui";
// import { Button, IconButton, Stack } from "@mui/material";
// import { useDispatch } from "react-redux";
// import { toast } from "react-toastify";
// import Panel from "../../components/Panel";
// import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

// const initTodo = {
//   content: "",
//   isComplete: false,
//   userId: "",
// };

// const TodoDetail = () => {
//   const { id } = useParams();
//   const [todo, setTodo] = useState(initTodo);
//   const navigate = useNavigate();

//   const dispatch = useDispatch();

//   const [addTodoMutation] = useAddTodoMutation();
//   const [updateTodo] = useUpdateTodoMutation();
//   const [deleteTodo] = useDeleteTodoMutation();

//   const { data, isLoading, isFetching, refetch } = useGetTodoQuery(id, {
//     skip: id === "new",
//   });

//   useEffect(() => {
//     // console.log(data);
//     setTodo(data || initTodo);
//   }, [data]);

//   const processAdd = async ({ content }, { setSubmitting }) => {
//     // console.log('Adding Todo');
//     const data = {
//       content,
//       isComplete: false,
//     };
//     // console.log(data, user);
//     const { payload } = await dispatch(addTodoApi({ data, addTodoMutation }));
//     console.log(payload);
//     if (payload.error) {
//       toast(payload.error.data.message, { type: "error" });
//     } else {
//       toast("Todo updated");
//     }
//     setSubmitting(false);
//     navigate(`/todos/tasks/${payload.data.$id}`, { replace: true });
//     return payload.data;
//   };

//   const processUpdate = async (
//     { $id: id, content, isComplete },
//     { setSubmitting }
//   ) => {
//     const res = await updateTodo({
//       id,
//       data: { content, isComplete },
//     });
//     // console.log(res);
//     if (res.error) {
//       toast(res.error.data.message, { type: "error" });
//     } else {
//       toast("Todo updated");
//     }
//     setSubmitting(false);
//     return res;
//   };

//   const processDelete = async (id, { setSubmitting }) => {
//     setSubmitting(true);
//     const res = await deleteTodo(id);
//     // console.log(res);
//     if (res.error) {
//       toast(res.error.data.message, { type: "error" });
//     } else {
//       toast("Todo deleted");
//       navigate(-1);
//     }
//     setSubmitting(false);
//     return res;
//   };

//   const toolbarActions = (
//     <React.Fragment>
//       <IconButton
//         disabled={isLoading || isFetching}
//         onClick={id === "new" ? undefined : refetch}
//       >
//         <RefreshIcon />
//       </IconButton>
//     </React.Fragment>
//   );

//   const backAction = (
//     <IconButton disabled={isLoading || isFetching} onClick={() => navigate(-1)}>
//       <BackIcon />
//     </IconButton>
//   );

//   return (
//     <Formik
//       enableReinitialize
//       initialValues={todo}
//       validate={(values) => {
//         const errors = {};
//         if (!values.content) {
//           errors.content = "Required";
//           return errors;
//         }
//       }}
//       onSubmit={(values, { setSubmitting }) =>
//         id === "new"
//           ? processAdd(values, { setSubmitting })
//           : processUpdate(values, { setSubmitting })
//       }
//     >
//       {({ submitForm, isSubmitting, setSubmitting }) => {
//         const actionsRight = (
//           <Stack direction={"row"} gap={1}>
//             <Button
//               variant="contained"
//               color="primary"
//               disabled={isSubmitting}
//               onClick={submitForm}
//               startIcon={<SaveIcon />}
//             >
//               Save
//             </Button>
//             <Button
//               variant="contained"
//               color="warning"
//               disabled={id === "new" || isSubmitting}
//               onClick={() => processDelete(id, { setSubmitting })}
//               startIcon={<DeleteIcon />}
//             >
//               Delete
//             </Button>
//           </Stack>
//         );
//         return (
//           <Panel
//             title={`TodoDetail ${id}`}
//             loading={isLoading || isFetching}
//             titleIcon={backAction}
//             toolbarActions={toolbarActions}
//             actionsRight={actionsRight}
//           >
//             <Form>
//               <Grid2 container>
//                 <Grid2>
//                   <Field
//                     component={TextField}
//                     name="content"
//                     type="text"
//                     label="Content"
//                   />
//                 </Grid2>

//                 <Grid2>
//                   <Field
//                     component={Switch}
//                     name="isComplete"
//                     type="checkbox"
//                     label="Complete"
//                   />
//                 </Grid2>
//                 <Grid2 xs={12}>
//                   <pre>{JSON.stringify(todo, null, "\t")}</pre>
//                 </Grid2>
//               </Grid2>
//             </Form>
//           </Panel>
//         );
//       }}
//     </Formik>
//   );
// };

// export default TodoDetail;
