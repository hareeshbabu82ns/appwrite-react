import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
// import appwriteApi from "../api/api";
import Link from '@mui/material/Link';
import { login } from "../state/authSlice";
import { useDispatch } from "react-redux";
import PageContainer from "./container/PageContainer";
import { Avatar, Box, Button, Card, Checkbox, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { toast } from 'react-toastify';

// import { login } from "../appwrite";
// import { loginWith } from "../hooks";

export default function LogIn() {
  const dispatch = useDispatch()
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
    <PageContainer title="Login" description="this is Login page">
      <Box
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }}
      >
        <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            xl={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px' }}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
              </Box>

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
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
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
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>

    // <form className="form" >
    //   <button type="button"
    //     onClick={() => { loginWith( `github` ) }}>GitHub Login</button>
    // </form>
  )
}