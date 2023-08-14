import { useState } from "react";
// import appwriteApi from "../api/api";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { register } from "../state/authSlice";
import PageContainer from "./container/PageContainer";
import { Avatar, Box, Button, Card, Grid, Link, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate, useSearchParams } from "react-router-dom";

const initFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function SignUp() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [ searchParams ] = useSearchParams();

  const [ formData, setFormData ] = useState( initFormData );

  const onInputChange = ( e ) => setFormData( { ...formData, [ e.target.name ]: e.target.value } );

  const toSignin = () => {
    const params = searchParams.toString();
    navigate( `/auth/login?${params}` );
  };

  const handleSubmit = async ( e ) => {
    e.preventDefault();

    if ( formData.email.length === 0 || formData.password.length === 0 ) {
      toast( 'eMail or Password can not be empty', { toastId: 'user-form-validation' } );
      return;
    }
    if ( formData.password.length !== formData.confirmPassword.length ) {
      toast( 'Passwords did not match', { toastId: 'user-pwd-form-validation' } );
      return;
    }

    const toastId = toast.loading( 'Signing up...', { toastId: 'signup-action' } );
    try {
      const payload = await dispatch( register( { email: formData.email, password: formData.password, name: `${formData.firstName} ${formData.lastName}` } ) ).unwrap();
      // dispatch( setUser( payload ) );
      // console.log( 'signup successful', payload )
      toast.update( toastId, {
        render: 'signup successful',
        type: 'success',
        isLoading: false,
        autoClose: true,
      } );
      navigate( searchParams?.get( 'from' ) || '/dashboard' );
    } catch ( error ) {
      // console.error( 'signup failed', error );
      toast.update( toastId, {
        render: 'signup failed',
        type: 'error',
        isLoading: false,
        autoClose: true,
      } );
      // dispatch( setUser( null ) );
    }
  };

  return (
    <PageContainer title="Register" description="this is Register page">
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
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '800px' }}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
              </Box>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      value={formData.firstName}
                      onChange={onInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      value={formData.lastName}
                      onChange={onInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={onInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      value={formData.password}
                      onChange={onInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      id="confirmPassword"
                      autoComplete="new-password"
                      value={formData.confirmPassword}
                      onChange={onInputChange}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onSubmit={handleSubmit}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link onClick={toSignin} variant="body2" color="inherit">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>

            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );

  // return (
  //   <form className="form" onSubmit={handleSubmit}>
  //     <label htmlFor="name">
  //       Name
  //     </label>
  //     <input
  //       id="name"
  //       type="name"
  //       onChange={( e ) => setName( e.target.value )}
  //     />

  //     <label htmlFor="email">
  //       Email
  //     </label>
  //     <input
  //       id="email"
  //       type="email"
  //       onChange={( e ) => setEmail( e.target.value )}
  //     />

  //     <label htmlFor="password">
  //       Password
  //     </label>
  //     <input
  //       id="password"
  //       type="password"
  //       onChange={( e ) => setPassword( e.target.value )}
  //     />

  //     <button type="submit">Sign up</button>
  //   </form>
  // )
}