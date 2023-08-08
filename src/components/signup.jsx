import { useState } from "react";
// import appwriteApi from "../api/api";
import { register } from "../state/usersSlice";
import { useDispatch } from "react-redux";

export default function SignUp() {
  const dispatch = useDispatch()
  const [ name, setName ] = useState();
  const [ email, setEmail ] = useState();
  const [ password, setPassword ] = useState();

  const handleSubmit = ( event ) => {
    event.preventDefault();
    if ( !name ) {
      alert( 'Name is required.' )
      return;
    }

    if ( !email ) {
      alert( 'Email is required.' )
      return;
    }

    if ( !password ) {
      alert( 'Password is required.' )
      return;
    }

    if ( password.length < 8 ) {
      alert( 'Password must be at least 8 characters long.' )
      return;
    }

    dispatch( register( { email, password, name } ) ).then( ( account ) => alert( `Successfully created account with ID: ${account.$id}` ) )
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="name">
        Name
      </label>
      <input
        id="name"
        type="name"
        onChange={( e ) => setName( e.target.value )}
      />

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

      <button type="submit">Sign up</button>
    </form>
  )
}