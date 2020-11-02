import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/styles/makeStyles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles(() => ({
  wrapper: {
    backgroundColor: "rgb(36, 44, 65)",
    padding: "1vw 0",
    margin: "3vh",
    width: "15vh",
    display: "flex",
    flexDirection: "column",
    borderRadius: "4px",
    alignItems: "center",
  },
  items: {
    margin: "1.5vh",
  },
  containerStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
}));

const Highlights = ({ weather, nextDaysDate }) => {
  const [highlightsData, setData] = useState(null);
  // const [nowDate, setDate] = useState(null);

  const { wrapper, items, containerStyle } = useStyles();

  useEffect(() => {
    weather !== null && setData(weather[0]);
  }, [weather]);

  /* eslint-disable */
  useEffect(() => {
    weather !== null && weather.map((data) => getDayData(data));
  }, [nextDaysDate]);
  /* eslint-enable */

  function title() {
    if (highlightsData !== null && nextDaysDate !== null) {
      if (nextDaysDate === weather[0].applicable_date) {
        return "Today's Highlights";
      } else {
        return (
          new Date(nextDaysDate)
            .toUTCString()
            .split(" ")
            .slice(0, 3)
            .join(" ") + " Highlights"
        );
      }
    }
  }

  function getDayData(data) {
    if (data.applicable_date === nextDaysDate) {
      setData(data);
    }
  }

  return (
    <Grid container style={{ marginTop: "1vh" }}>
      <Grid
        item
        xs={12}
        sm={false}
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Typography variant="h6" color="initial">
          {title()}
        </Typography>
      </Grid>
      <Grid item container xs={12} className={containerStyle}>
        {highlightsData !== null && (
          <>
            <Grid item xs={10} sm={5} className={wrapper}>
              <Typography className={items} variant="body1" color="initial">
                Wind status
              </Typography>
              <Typography className={items} variant="h4" color="initial">
                {highlightsData.wind_speed.toFixed(0)} mph
              </Typography>
              <Typography className={items} variant="body1" color="initial">
                {highlightsData.wind_direction_compass}
              </Typography>
            </Grid>

            <Grid item xs={10} sm={5} className={wrapper}>
              <Typography className={items} variant="body1" color="initial">
                Humidity
              </Typography>
              <Typography className={items} variant="h4" color="initial">
                {highlightsData.humidity}%
              </Typography>
              <LinearProgress
                style={{ width: "80%" }}
                variant="determinate"
                value={highlightsData.humidity}
              />
            </Grid>

            <Grid item xs={10} sm={5} className={wrapper}>
              <Typography className={items} variant="body1" color="initial">
                Visibility
              </Typography>
              <Typography className={items} variant="h4" color="initial">
                {highlightsData.visibility.toFixed(0)} miles
              </Typography>
            </Grid>

            <Grid item xs={10} sm={5} className={wrapper}>
              <Typography className={items} variant="body1" color="initial">
                Air Pressure
              </Typography>
              <Typography className={items} variant="h4" color="initial">
                {highlightsData.air_pressure} mb
              </Typography>
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  );
};

Highlights.propTypes = {
  weather: PropTypes.array,
  nextDaysDate: PropTypes.string,
  phone: PropTypes.bool,
};

export default Highlights;
