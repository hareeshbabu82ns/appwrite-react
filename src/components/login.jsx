import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
// import appwriteApi from "../api/api";
import Link from '@mui/material/Link';
import { login } from "../state/authSlice";
import { useDispatch } from "react-redux";
import PageContainer from "./container/PageContainer";
import { Avatar, Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography, useTheme } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { toast } from 'react-toastify';
import Copyright from "./copyright";

// import { login } from "../appwrite";
// import { loginWith } from "../hooks";

export default function LogIn() {
  const dispatch = useDispatch()
  const theme = useTheme()
  const [ searchParams ] = useSearchParams();
  const [ email, setEmail ] = useState();
  const [ password, setPassword ] = useState();
  const navigate = useNavigate()

  const handleSubmit = ( event ) => {
    event.preventDefault();
    if ( !email ) {
      toast( 'Email is required.' )
      return;
    }

    if ( !password ) {
      toast( 'Password is required.' )
      return;
    }

    const toastId = toast.loading( 'Login...', { toastId: 'login-action' } );
    dispatch( login( { email, password } ) ).then( ( { error } ) => {
      if ( error ) {
        toast.update( toastId, {
          render: 'login failed',
          type: 'error',
          isLoading: false,
          autoClose: true,
        } );
        console.error( error )
      } else {
        toast.update( toastId, {
          render: 'login successful',
          type: 'success',
          isLoading: false,
          autoClose: true,
        } );
        navigate( searchParams?.get( 'from' ) || '/dashboard' );
      }
    } )

  }

  const toSignup = () => {
    const params = searchParams.toString();
    navigate( `/auth/register?${params}` );
  };

  return (
    <PageContainer title="Login" description="Welcome to AppWriteUI">
      <Container
        component="main"
        maxWidth="sm"
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundImage: "none",
            bgcolor: theme.palette.background.alt,
            borderRadius: "0.55rem",
            padding: { xs: 2, sm: 5 },
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>


          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={( e ) => setEmail( e.target.value )}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={( e ) => setPassword( e.target.value )}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            {/* <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={googleLogin}
                >
                  Google Sign In
                </Button> */}
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" color="inherit">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link onClick={toSignup} variant="body2" color="inherit">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 4 }} />
      </Container>
    </PageContainer>
  )
}