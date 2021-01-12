import React, { useEffect, useState } from "react";

import Today from "./Today";
import NextDays from "./NextDays";
import Highlights from "./Highlights";
import Search from "./Search";
import ConvertTemperature from "./ConvertTemperature";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useTheme from "@material-ui/core/styles/useTheme";
import makeStyles from "@material-ui/styles/makeStyles";
const useStyles = makeStyles(() => ({
  wrapper: {
    width: "100%",
    background: "rgb(31, 36, 49)",
    padding: "3vh 0",
    margin: "0 auto",
  },

  wrapper2: {
    width: "100%",
    background: "rgb(36, 44, 65)",
    padding: "3vh",
  },
  todayIconStyle: {
    marginTop: "1vh",
    justifyContent: "center",
    margin: "auto",
  },
}));

const axios = require("axios");

const Home = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [city, setCity] = useState(null);
  const [id, setId] = useState(null);
  const [weather, setWeather] = useState(null);
  const [toggleSearch, setToggle] = useState(false);
  const [nextDaysDate, setDate] = useState(null);
  const [cityError, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [convert, setConvert] = useState(false);

  const { wrapper, wrapper2, todayIconStyle } = useStyles();
  const theme = useTheme();
  const phone = useMediaQuery(theme.breakpoints.down("xs"));
  const lowHeight = useMediaQuery("(max-height: 680px)");

  /* eslint-disable */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  useEffect(() => {
    latitude !== null && getMyCity();
  }, [latitude, longitude]);

  useEffect(() => {
    id !== null && getWeather();
  }, [id]);

  useEffect(() => {
    const date = new Date().toISOString().split("").slice(0, 10).join("");

    setDate(date);
  }, []);
  /* eslint-enable */

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  //MY GEOLOCATION START
  function success(pos) {
    const crd = pos.coords;

    setLatitude(crd.latitude);
    setLongitude(crd.longitude);
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  //MY GEOLOCATION END

  function getMyCity() {
    try {
      setCity(null);
      setId(null);
      setWeather(null);
      setLoading(true);

      axios
        .get(
          `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?lattlong=${latitude},${longitude}`
        )
        .then((res) => {
          const data = res.data[0];

          setCity(data.title);
          setId(data.woeid);
        });

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  function getOtherCity(query) {
    try {
      setCity(null);
      setError(null);
      setId(null);
      setWeather(null);
      setLoading(true);

      axios
        .get(
          `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${query}`
        )
        .then((res) => {
          const data = res.data[0];

          setId(data.woeid);
          setCity(data.title);
          setError(false);
        });
      setLoading(false);
    } catch (err) {
      console.log(err);

      setError(true);
      setLoading(false);
    }
  }

  function getWeather() {
    try {
      axios
        .get(
          `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${id}/`
        )
        .then((res) => {
          const data = res.data.consolidated_weather;

          setWeather(data);
        });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Grid container>
      <>
        {" "}
        <Grid item container xs={12} sm={3}>
          <Box
            className={wrapper2}
            style={
              weather !== null && city !== null
                ? { height: "100%" }
                : { height: "100vh" }
            }
          >
            {toggleSearch ? (
              <Search
                getOtherCity={getOtherCity}
                setToggle={setToggle}
                setError={setError}
                cityError={cityError}
                getMyCity={getMyCity}
              />
            ) : (
              <Today
                setToggle={setToggle}
                city={city}
                weather={weather}
                getMyCity={getMyCity}
                setDate={setDate}
                loading={loading}
                convert={convert}
              />
            )}
          </Box>
        </Grid>
        <Grid
          item
          container
          xs={12}
          sm={9}
          style={phone || lowHeight ? { height: "100%" } : { height: "100vh" }}
          className={wrapper}
        >
          <Grid item sm={1} xs={false} />

          <Grid item sm={10}>
            <ConvertTemperature setConvert={setConvert} phone={phone} />

            {weather !== null && city !== null ? (
              <>
                <NextDays
                  weather={weather}
                  setDate={setDate}
                  convert={convert}
                />
                <Highlights weather={weather} nextDaysDate={nextDaysDate} />
              </>
            ) : (
              <Grid
                xs={12}
                item
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "8vh",
                }}
              >
                <CircularProgress className={todayIconStyle} />
              </Grid>
            )}
          </Grid>

          <Grid item sm={1} xs={false} />
        </Grid>
      </>
    </Grid>
  );
};

export default Home;
