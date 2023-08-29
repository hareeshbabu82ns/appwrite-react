import { useNavigate, useParams } from "react-router-dom";
import {
  addTodoApi,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetTodoQuery,
  useUpdateTodoMutation,
} from "../../state/todosApi";
import { LoadingProgress } from "../../components/LoadingProgress";
import { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import { Switch, TextField } from "formik-mui";
import { Button, LinearProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

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

  const { data, isLoading, isFetching } = useGetTodoQuery(id, {
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

  if (isLoading || isFetching) return <LoadingProgress />;

  return (
    <div>
      TodoDetail {id}
      {/* <TodoForm key={id} data={todo} /> */}
      <Formik
        enableReinitialize
        initialValues={todo}
        validate={(values) => {
          const errors = {};
          if (!values.content) {
            errors.content = "Required";
            return errors;
          }
        }}
        onSubmit={(values, { setSubmitting }) =>
          id === "new"
            ? processAdd(values, { setSubmitting })
            : processUpdate(values, { setSubmitting })
        }
      >
        {({ submitForm, isSubmitting, setSubmitting }) => (
          <Form>
            <Field
              component={TextField}
              name="content"
              type="text"
              label="Content"
            />
            <br />
            <Field
              component={Switch}
              name="isComplete"
              type="checkbox"
              label="Complete"
            />
            {isSubmitting && <LinearProgress />}
            <br />
            <Button
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              onClick={submitForm}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              color="warning"
              disabled={id === "new" || isSubmitting}
              onClick={() => processDelete(id, { setSubmitting })}
            >
              Delete
            </Button>
            <pre>{JSON.stringify(todo, null, "\t")}</pre>
          </Form>
        )}
      </Formik>
      {/* <pre>{JSON.stringify(todo, null, "\t")}</pre> */}
    </div>
  );
};

export default TodoDetail;
