import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { login, reset } from "../../features/auth/authSlice";
import Loader from "../../components/Loader";
 
const Login = () => {
  const paperStyle = {
    padding: 20,
    height: "430px",
    width: 380,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#207cad", margin: 10 };
  const btnstyle = { margin: "25px 0", backgroundColor: "#207cad" };

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
     if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
        toast.success("Login Successful",{autoClose: 1000,hideProgressBar: true,});
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    const userData = {
      username,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>
        <form onSubmit={submitForm}>
          <TextField
            label="Username"
            placeholder="Enter username"
            name="username"
            value={username}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            fullWidth
            required
          />
          <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
          >
            Sign in
          </Button>
          <Typography>
            <Link href="#">Forgot password ?</Link>
          </Typography>
        </form>
      </Paper>
    </Grid>

   
    </>
  

    
  );
};

export default Login;
