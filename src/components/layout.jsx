import { Outlet, Link, useNavigate } from "react-router-dom"
import appwriteLogo from "/src/assets/react.svg"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../state/authSlice"

export default function Layout() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isLoggedIn = useSelector( ( state ) => state.auth.userId );

  const handleLogOut = () => dispatch( logout() ).then( () => navigate( '/auth/login' ) )

  return (
    <main>
      <nav>
        <ul className="navigation-bar">
          <li>
            <Link to="/">Home</Link>
          </li>

          {isLoggedIn && (
            <>
              <li>
                <Link to="/todos">Todos</Link>
              </li>
              <li>
                <Link onClick={handleLogOut}>Log Out</Link>
              </li>
            </>
          )}

          {!isLoggedIn && (
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