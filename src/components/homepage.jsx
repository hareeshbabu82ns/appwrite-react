import { useNavigate } from "react-router-dom";
import { useGetFiles } from "../hooks";
import api from "../api/api";
import { Server } from "../utils/config";
import { logout, userDataSelector } from "../state/authSlice";

import PageContainer from "./PageContainer";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(userDataSelector);

  const [{ files, isLoading }] = useGetFiles();

  const handleLogOut = () =>
    dispatch(logout()).then(({ error }) => {
      if (!error) navigate("/auth/login");
    });

  if (!user) return <p>You aren not logged in.</p>;
  if (!files) return <p>Files not loaded.</p>;

  return (
    <PageContainer
      title="Dashboard"
      description="this is Dashboard"
      sx={{ m: "1.5rem 1.5rem" }}
    >
      <p>Logged in as {user.email}</p>
      <button onClick={handleLogOut}>Log out</button>

      {isLoading && <h1> Loading .... </h1>}

      <p>public files</p>
      {files
        ?.filter((item) => item["public"])
        .map((item) => (
          <pre key={item["$id"]}>{JSON.stringify(item, null, "\n")}</pre>
        ))}
      <p>private files</p>
      {files
        ?.filter((item) => !item["public"])
        .map((item) => (
          // <p key={item[ "$id" ]}>{JSON.stringify( item, null, '\n' )}</p>
          <img
            key={item["$id"]}
            src={api
              .getFilePreview(Server.userImagesBucket, item["$id"], 100)
              .toString()}
            title={item["name"]}
            alt={item["name"]}
            className="px-1 py-1"
          />
        ))}
    </PageContainer>
  );
}
