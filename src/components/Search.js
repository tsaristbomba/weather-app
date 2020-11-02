import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, IconButton, TextField, Button } from "@material-ui/core";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import Alert from "@material-ui/lab/Alert";

import makeStyles from "@material-ui/styles/makeStyles";
const useStyles = makeStyles(() => ({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  wrapper2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  iconStyle: {
    marginLeft: "auto",
    fontSize: "30px",
    marginBottom: "20px",
  },
  form: {
    display: "inline",
  },
  btn: {
    padding: "8px",
    borderRadius: "0 4px 4px 0",
  },
  cityWrapper: {
    marginTop: "20px",
  },
  cityBox: {
    display: "flex",
    marginTop: "2px",
    padding: "15px",
    borderRadius: "4px",
    cursor: "pointer",
    border: "1px solid transparent",
    "&:hover": {
      border: "1px solid rgba(170, 170, 170, .6)",
    },
    "&:hover $arrow": {
      display: "flex",
    },
  },
  arrow: {
    display: "none",
    marginLeft: "auto",
  },
  alert: {
    position: "absolute",
  },
}));

const Search = ({
  getOtherCity,
  setToggle,
  setError,
  cityError,
  getMyCity,
}) => {
  const [value, setValue] = useState("");

  const {
    wrapper,
    iconStyle,
    form,
    wrapper2,
    btn,
    cityWrapper,
    cityBox,
    arrow,
    alert,
  } = useStyles();

  /* eslint-disable */
  useEffect(() => {
    if (cityError) {
      getMyCity();
      // setToggle(true);
    }
  }, [cityError]);

  useEffect(() => {
    if (cityError === false) {
      setToggle(false);
    }
    handleAlert();
  }, [cityError]);
  /* eslint-enable */

  function handleSubmit(e) {
    e.preventDefault();

    if (value !== "") {
      getOtherCity(value);
    }
  }

  function handleAlert() {
    setTimeout(() => setError(null), 3000);
  }

  return (
    <>
      {cityError && (
        <Alert className={alert} variant="filled" severity="error">
          Location not Found
        </Alert>
      )}

      <Box className={wrapper}>
        <IconButton
          style={{ paddingRight: "0", paddingTop: "0" }}
          onClick={() => setToggle(false)}
        >
          <CloseRoundedIcon className={iconStyle} />
        </IconButton>
      </Box>

      <Box className={wrapper2}>
        <form className={form} onSubmit={(e) => handleSubmit(e)}>
          <TextField
            label="Search Location"
            variant="outlined"
            size="small"
            color="secondary"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button className={btn} color="primary" type="submit">
            Search
          </Button>

          <Box className={cityWrapper}>
            <Box
              onClick={() => {
                getOtherCity("London");
                setToggle(false);
              }}
              className={cityBox}
            >
              London
              <span className={arrow}>
                <ArrowForwardIosRoundedIcon fontSize="small" />
              </span>
            </Box>
            <Box
              onClick={() => {
                getOtherCity("Barcelona");
                setToggle(false);
              }}
              className={cityBox}
            >
              Barcelona
              <span className={arrow}>
                <ArrowForwardIosRoundedIcon fontSize="small" />
              </span>
            </Box>
            <Box
              onClick={() => {
                getOtherCity("Long Beach");
                setToggle(false);
              }}
              className={cityBox}
            >
              Long Beach
              <span className={arrow}>
                <ArrowForwardIosRoundedIcon fontSize="small" />
              </span>
            </Box>
            <Box
              onClick={() => {
                getOtherCity("Brisbane");
                setToggle(false);
              }}
              className={cityBox}
            >
              Brisbane
              <span className={arrow}>
                <ArrowForwardIosRoundedIcon fontSize="small" />
              </span>
            </Box>
          </Box>
        </form>
      </Box>
    </>
  );
};

Search.propTypes = {
  getOtherCity: PropTypes.func,
  setToggle: PropTypes.func,
  setError: PropTypes.func,
  cityError: PropTypes.bool,
  getMyCity: PropTypes.func,
};

export default Search;
