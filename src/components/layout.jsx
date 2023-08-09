import { Outlet, Link, useNavigate } from "react-router-dom"
import appwriteLogo from "/src/assets/react.svg"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUser, logout } from "../state/usersSlice"
import { useGetUserQuery } from "../state/api"

export default function Layout() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { data: user } = useGetUserQuery();
  // const user = useSelector( ( state ) => state.users.user )
  const userStatus = useSelector( ( state ) => state.users.status )
  const error = useSelector( ( state ) => state.users.error )

  useEffect( () => {
    if ( userStatus === 'idle' ) {
      dispatch( fetchUser() )
    }
  }, [ userStatus, dispatch, navigate ] )

  const handleLogOut = () => dispatch( logout() ).then( () => navigate( '/login' ) )

  return (
    <main>
      <nav>
        <ul className="navigation-bar">
          <li>
            <Link to="/">Home</Link>
          </li>

          {user && (
            <>
              <li>
                <Link to="/todos">Todos</Link>
              </li>
              <li>
                <Link onClick={handleLogOut}>Log Out</Link>
              </li>
            </>
          )}

          {!user && (
            <>
              <li>
                <Link to="/login">Log In</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </>
          )}

        </ul>
      </nav>

      <div className="appwrite-logo">
        <img src={appwriteLogo} alt="Appwrite's logo" />
      </div>

      <section className="content">
        <Outlet />
      </section>

    </main >
  )
}