import { useState } from "react";
import { useNavigate } from "react-router-dom"
// import appwriteApi from "../api/api";
import { login } from "../state/usersSlice";
import { useDispatch } from "react-redux";

// import { login } from "../appwrite";
// import { loginWith } from "../hooks";

export default function LogIn() {
  const dispatch = useDispatch()
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

    dispatch( login( { email, password } ) ).then( () => navigate( '/' ) ).error( e => console.error( e ) )
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="email">
        Email
      </label>
      <input
        id="email"
        type="email"
        onChange={( e ) => setEmail( e.target.value )}
      />

      <label htmlFor="password">
        Password
      </label>
      <input
        id="password"
        type="password"
        onChange={( e ) => setPassword( e.target.value )}
      />

      <button type="submit">Log In</button>
    </form>

    // <form className="form" >
    //   <button type="button"
    //     onClick={() => { loginWith( `github` ) }}>GitHub Login</button>
    // </form>
  )
}