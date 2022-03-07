import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCameraById,
  getCameraFirmware,
  getCameraLocation,
  reset,
  getCameraDeviceInfoById,
  getCameraStatus,
} from "../../features/cameras/cameraSlice";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import { useParams,useNavigate } from "react-router-dom";
import image from "../../images/logo_large.png";
import "./Detail.css";
import Loader from "../../components/Loader";
  
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 700,
  },
  padding: theme.spacing(2),

  image: {
    width: 128,
    height: 60,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

const Detail = () => {
  const classes = useStyles();
  const { id } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const {
    camera,
    cameraDeviceInfo,
    cameraFirmware,
    cameraLocation,
    cameraStatus,
  } = useSelector((state) => state.cameras);
  
  useEffect(() => {
    if(!user){
      navigate("/login");
    }
    dispatch(getCameraById(id));
    dispatch(getCameraStatus(id));
    dispatch(getCameraDeviceInfoById(id));
    dispatch(getCameraLocation(id));
    dispatch(getCameraFirmware(id));
    return () => {
      dispatch(reset());
    };
  }, [id,user,navigate,dispatch]);

  if(!cameraFirmware.currentVersion){
return <Loader />
  }
 
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img className={classes.img} alt="logo" src={image} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="h6">
                    {camera.name}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                  {cameraDeviceInfo.model}
                  </Typography>
                </Grid>
                <Grid item></Grid>
              </Grid>
            </Grid>

            <Grid item>
              {cameraStatus ? (
                <>
                  <span className="online"></span> <span>&nbsp;ONLINE</span>
                </>
              ) : (
                <>
                  <span className="offline"></span> <span>&nbsp;OFFLINE</span>{" "}
                </>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}>Name : {camera.name} </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          Brand : {cameraDeviceInfo.brand}
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          Model : {cameraDeviceInfo.model}
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          MAC address : {camera.ethMacAddress}
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          Time Zone : {cameraLocation.timeZone}
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          Firmware Version : {cameraFirmware.currentVersion}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Detail;
