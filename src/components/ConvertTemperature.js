import React from "react";
import PropTypes from "prop-types";
import { Box, Grid } from "@material-ui/core";

import makeStyles from "@material-ui/styles/makeStyles";
const useStyles = makeStyles(() => ({
  icon: {
    border: "none",
    fontWeight: "700",
    marginRight: "10px",
    borderRadius: "50%",
    cursor: "pointer",
    padding: "15px 18px",
    fontSize: "14px",
    backgroundColor: "rgba(170, 170, 170, .4)",
    "&:hover": {
      backgroundColor: "rgba(170, 170, 170, .2)",
    },
  },
}));

const ConvertTemperature = ({ setConvert, phone }) => {
  const { icon } = useStyles();

  return (
    <Box style={{ marginRight: "2vw" }}>
      <Grid
        style={
          phone
            ? { display: "flex", justifyContent: "center" }
            : { display: "flex", justifyContent: "flex-end" }
        }
        item
        xs={12}
      >
        <button
          className={icon}
          aria-label="celsius"
          onClick={() => setConvert(false)}
        >
          °C
        </button>
        <button
          className={icon}
          aria-label="fahrenheit"
          onClick={() => setConvert(true)}
        >
          °F
        </button>
      </Grid>
    </Box>
  );
};

ConvertTemperature.propTypes = {
  setConvert: PropTypes.func,
  phone: PropTypes.bool,
};

export default ConvertTemperature;
