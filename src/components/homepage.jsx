import { useNavigate } from "react-router-dom"
import { useGetFiles, useGetUser } from "../hooks";
import api from "../api/api";
import { useState } from "react";
import { Server } from "../utils/config";
import { useSelector } from "react-redux";


export default function Home() {
  const navigate = useNavigate()

  const user = useSelector( ( state ) => state.users.user )
  const [ stale, setStale ] = useState( { stale: false } );
  const [ { files, isLoading, isError } ] = useGetFiles( stale );

  const handleLogOut = () => api.logout().then( () => navigate( '/login' ) )

  if ( !user ) return <p>You aren't logged in.</p>
  if ( !files ) return <p>Files not loaded.</p>

  return (
    <div>
      <p>Logged in as {user.email}</p>
      <button onClick={handleLogOut}>Log out</button>

      {isLoading && <h1> Loading .... </h1>}

      <p>public files</p>
      {files?.filter( item => item[ "public" ] ).map( ( item ) => (
        <pre key={item[ "$id" ]}>{JSON.stringify( item, null, '\n' )}</pre>
      ) )}
      <p>private files</p>
      {files?.filter( item => !item[ "public" ] ).map( ( item ) => (
        // <p key={item[ "$id" ]}>{JSON.stringify( item, null, '\n' )}</p>
        <img
          key={item[ "$id" ]}
          src={api.getFilePreview( Server.userImagesBucket, item[ '$id' ], 100 ).toString()}
          title={item[ "name" ]}
          alt={item[ "name" ]}
          className="px-1 py-1"
        />
      ) )}
    </div>
  )
}
// export default function Home() {
//   const navigate = useNavigate()
//   const [ user, setUser ] = useState()

//   useEffect( () => {
//     getUserData()
//       .then( ( account ) => setUser( account ) )
//       .catch( ( error ) => navigate( '/login' ) )
//   }, [] )

//   const handleLogOut = () => logout().then( () => navigate( '/login' ) )

//   if ( !user ) return <p>You aren't logged in.</p>

//   return (
//     <div>
//       <p>Logged in as {user.email}</p>
//       <button onClick={handleLogOut}>Log out</button>
//     </div>
//   )
// }