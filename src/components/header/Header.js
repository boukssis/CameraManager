import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import image from "../../images/logo_large.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  image: {
    flexGrow: 1,
    width: 160,
    height: 80,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logout());
    await dispatch(reset());

    navigate("/login");
  };

  const handleClick= ()=>{
    navigate('/')
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <ButtonBase className={classes.image}>
            <img onClick={handleClick} className={classes.img} alt="logo" src={image} />
          </ButtonBase>

          {user && (
            <Button color="inherit" onClick={handleLogout}>
              {" "}
              <ExitToAppIcon /> &nbsp; Logout{" "}
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
