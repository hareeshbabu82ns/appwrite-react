import { useState } from "react";
// import appwriteApi from "../api/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { register } from "../state/authSlice";
import PageContainer from "./PageContainer";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate, useSearchParams } from "react-router-dom";
import Copyright from "./copyright";

const initFormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SignUp() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState(initFormData);

  const onInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const toSignin = () => {
    const params = searchParams.toString();
    navigate(`/auth/login?${params}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.email.length === 0 || formData.password.length === 0) {
      toast("eMail or Password can not be empty", {
        toastId: "user-form-validation",
      });
      return;
    }
    if (formData.password.length !== formData.confirmPassword.length) {
      toast("Passwords did not match", { toastId: "user-pwd-form-validation" });
      return;
    }

    const toastId = toast.loading("Signing up...", {
      toastId: "signup-action",
    });
    try {
      const payload = await dispatch(
        register({
          email: formData.email,
          password: formData.password,
          name: `${formData.firstName} ${formData.lastName}`,
        })
      ).unwrap();
      // dispatch( setUser( payload ) );
      // console.log( 'signup successful', payload )
      toast.update(toastId, {
        render: "signup successful",
        type: "success",
        isLoading: false,
        autoClose: true,
      });
      navigate(searchParams?.get("from") || "/dashboard");
    } catch (error) {
      // console.error( 'signup failed', error );
      toast.update(toastId, {
        render: "signup failed",
        type: "error",
        isLoading: false,
        autoClose: true,
      });
      // dispatch( setUser( null ) );
    }
  };

  return (
    <PageContainer title="Register" description="this is Register page">
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
            Sign up
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
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
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </PageContainer>
  );
}
