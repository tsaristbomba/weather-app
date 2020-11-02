import React from "react";
import PropTypes from "prop-types";

import IconButton from "@material-ui/core/IconButton";
import GpsFixedIcon from "@material-ui/icons/GpsFixed";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import CircularProgress from "@material-ui/core/CircularProgress";
import FiberManualRecordSharpIcon from "@material-ui/icons/FiberManualRecordSharp";
import LocationOnSharpIcon from "@material-ui/icons/LocationOnSharp";
import {
  FaCloudShowersHeavy,
  FaCloudRain,
  FaCloudSunRain,
  FaCloud,
  FaCloudSun,
  FaSun,
} from "react-icons/fa";
import { WiSnow, WiSleet, WiHail, WiThunderstorm } from "react-icons/wi";

const useStyles = makeStyles(() => ({
  searchBtn: {
    backgroundColor: "rgba(170, 170, 170, .4)",
    "&:hover": {
      backgroundColor: "rgba(170, 170, 170, .2)",
    },
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  wrapper2: {
    display: "flex",
    flexDirection: "column",
    marginTop: "10vh",
  },
  icon: {
    marginLeft: "auto",
    backgroundColor: "rgba(170, 170, 170, .4)",
    "&:hover": {
      backgroundColor: "rgba(170, 170, 170, .2)",
    },
  },
  todayIconStyle: {
    margin: "0 auto",
    marginBottom: "7vh",
  },
  todayIconStyle2: {
    margin: "0 auto",
  },
  small: {
    fontSize: "3vh",
    color: "lightgrey",
    letterSpacing: "3px",
  },
  evenSmaller: {
    fontSize: "2vh",
    color: "lightgrey",
    letterSpacing: "1px",
  },
  temperature: {
    fontSize: "13vh",
    margin: "0 auto",
    marginBottom: "7vh",
  },
}));

const Today = ({
  setToggle,
  city,
  weather,
  getMyCity,
  setDate,
  loading,
  convert,
}) => {
  const {
    icon,
    wrapper,
    searchBtn,
    todayIconStyle,
    wrapper2,
    small,
    evenSmaller,
    todayIconStyle2,
    temperature,
  } = useStyles();

  const todayIcon = () => {
    const data = weather !== null && weather[0].weather_state_abbr;
    let res = "";

    switch (data) {
      case "sn":
        res = <WiSnow className={todayIconStyle} size="13vh" />;
        break;
      case "sl":
        res = <WiSleet className={todayIconStyle} size="13vh" />;
        break;
      case "h":
        res = <WiHail className={todayIconStyle} size="13vh" />;
        break;
      case "t":
        res = <WiThunderstorm className={todayIconStyle} size="13vh" />;
        break;
      case "hr":
        res = <FaCloudShowersHeavy className={todayIconStyle} size="13vh" />;
        break;
      case "lr":
        res = <FaCloudRain className={todayIconStyle} size="13vh" />;
        break;
      case "s":
        res = <FaCloudSunRain className={todayIconStyle} size="13vh" />;
        break;
      case "hc":
        res = <FaCloud className={todayIconStyle} size="13vh" />;
        break;
      case "lc":
        res = <FaCloudSun className={todayIconStyle} size="13vh" />;
        break;
      case "c":
        res = <FaSun className={todayIconStyle} size="13vh" />;
        break;
      default:
        break;
    }
    return res;
  };

  return (
    <>
      <>
        <Box className={wrapper}>
          <Button
            variant="contained"
            className={searchBtn}
            onClick={() => setToggle(true)}
          >
            Other Places
          </Button>

          <IconButton className={icon} onClick={() => getMyCity()}>
            <GpsFixedIcon />
          </IconButton>
        </Box>

        <Box
          className={wrapper2}
          onClick={() => setDate(weather[0].applicable_date)}
          style={{ cursor: "pointer" }}
        >
          {weather !== null && city !== null ? (
            <>
              {todayIcon()}
              <Typography
                className={temperature}
                style={{ color: "rgb(67, 100, 182)" }}
                variant="h1"
              >
                {!convert
                  ? weather[0].the_temp.toFixed(0)
                  : ((weather[0].the_temp * 9) / 5 + 32).toFixed(0)}
                <small className={small}>{convert ? "°F" : "°C"}</small>
              </Typography>
              <Typography className={todayIconStyle}>
                <small className={small}>{weather[0].weather_state_name}</small>
              </Typography>
              <Typography className={todayIconStyle2}>
                <small className={evenSmaller}>
                  Today{" "}
                  <FiberManualRecordSharpIcon style={{ fontSize: "5px" }} />{" "}
                  {new Date().toDateString()}
                </small>
              </Typography>
              <Typography style={{ margin: "auto" }}>
                <small className={evenSmaller}>
                  <LocationOnSharpIcon fontSize="small" /> {city}
                </small>
              </Typography>
            </>
          ) : (
            <Grid
              xs={12}
              item
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <CircularProgress />
            </Grid>
          )}
        </Box>
      </>
    </>
  );
};

Today.propTypes = {
  setToggle: PropTypes.func,
  city: PropTypes.string,
  weather: PropTypes.array,
  getMyCity: PropTypes.func,
  setDate: PropTypes.func,
  loading: PropTypes.bool,
  convert: PropTypes.bool,
};

export default Today;
