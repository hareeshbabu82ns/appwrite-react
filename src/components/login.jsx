import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { login } from "../appwrite";
import { loginWith } from "./Login/loginWith";

export default function LogIn() {
  const [ email, setEmail ] = useState();
  const [ password, setPassword ] = useState();
  const navigate = useNavigate()

  const handleSubmit = ( event ) => {
    event.preventDefault();
    if ( !email ) {
      alert( 'Email is required.' )
      return;
    }

    if ( !password ) {
      alert( 'Password is required.' )
      return;
    }

    login( email, password )
      .then( ( account ) => alert( `Successfully logged in from: ${account.osName}` ) )
      .finally( () => navigate( '/' ) )
  }

  return (
    // <form className="form" onSubmit={handleSubmit}>
    //   <label htmlFor="email">
    //     Email
    //   </label>
    //   <input
    //     id="email"
    //     type="email"
    //     onChange={( e ) => setEmail( e.target.value )}
    //   />

    //   <label htmlFor="password">
    //     Password
    //   </label>
    //   <input
    //     id="password"
    //     type="password"
    //     onChange={( e ) => setPassword( e.target.value )}
    //   />

    //   <button type="submit">Log In</button>
    // </form>

    <form className="form" >
      <button type="button"
        onClick={() => { loginWith( `github` ) }}>GitHub Login</button>
    </form>
  )
}