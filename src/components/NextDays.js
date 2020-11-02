import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import {
  FaCloudShowersHeavy,
  FaCloudRain,
  FaCloudSunRain,
  FaCloud,
  FaCloudSun,
  FaSun,
} from "react-icons/fa";
import { WiSnow, WiSleet, WiHail, WiThunderstorm } from "react-icons/wi";
import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles(() => ({
  tempStyle: {
    color: "rgba(170, 170, 170, .6)",
    marginLeft: "auto",
  },
  wrapper: {
    backgroundColor: "rgb(36, 44, 65)",
    padding: "1vh 0",
    marginTop: "1vw",
    margin: ".5vw",
    display: "flex",
    flexDirection: "column",
    borderRadius: "4px",
  },
  iconStyle: {
    margin: "2vw auto",
  },
  text: {
    margin: "0 auto",
  },
}));

const NextDays = ({ weather, setDate, convert }) => {
  const [future, setFuture] = useState(null);

  const { tempStyle, wrapper, iconStyle, text } = useStyles();

  useEffect(() => {
    setFuture(weather !== null ? weather.slice(1, 6) : null);
  }, [weather]);

  const icon = (data) => {
    let res = "";

    switch (data) {
      case "sn":
        res = <WiSnow className={iconStyle} size="4vw" />;
        break;
      case "sl":
        res = <WiSleet className={iconStyle} size="4vw" />;
        break;
      case "h":
        res = <WiHail className={iconStyle} size="4vw" />;
        break;
      case "t":
        res = <WiThunderstorm className={iconStyle} size="4vw" />;
        break;
      case "hr":
        res = <FaCloudShowersHeavy className={iconStyle} size="4vw" />;
        break;
      case "lr":
        res = <FaCloudRain className={iconStyle} size="4vw" />;
        break;
      case "s":
        res = <FaCloudSunRain className={iconStyle} size="4vw" />;
        break;
      case "hc":
        res = <FaCloud className={iconStyle} size="4vw" />;
        break;
      case "lc":
        res = <FaCloudSun className={iconStyle} size="4vw" />;
        break;
      case "c":
        res = <FaSun className={iconStyle} size="4vw" />;
        break;
      default:
        break;
    }
    return res;
  };

  //console.log(future);

  return (
    <Grid container style={{ display: "flex", justifyContent: "center" }}>
      {future !== null &&
        future.map((data, k) => {
          return (
            <Grid
              item
              sm={2}
              xs={10}
              className={wrapper}
              key={k}
              onClick={() => setDate(data.applicable_date)}
              style={{ cursor: "pointer" }}
            >
              <Typography variant="body1" color="initial" className={text}>
                {new Date(data.applicable_date)
                  .toUTCString()
                  .split(" ")
                  .slice(0, 3)
                  .join(" ")}
              </Typography>
              {icon(data.weather_state_abbr)}
              <Typography variant="body1" color="initial" className={text}>
                <span>
                  {!convert
                    ? data.max_temp.toFixed(0) + "°C"
                    : ((data.max_temp * 9) / 5 + 32).toFixed(0) + "°F"}
                </span>
                <span
                  style={{ color: "rgba(170, 170, 170, .6)" }}
                  className={tempStyle}
                >
                  {!convert
                    ? " " + data.min_temp.toFixed(0) + "°C"
                    : " " + ((data.min_temp * 9) / 5 + 32).toFixed(0) + "°F"}
                </span>
              </Typography>
            </Grid>
          );
        })}
    </Grid>
  );
};

NextDays.propTypes = {
  weather: PropTypes.array,
  setDate: PropTypes.func,
  convert: PropTypes.bool,
};

export default NextDays;
