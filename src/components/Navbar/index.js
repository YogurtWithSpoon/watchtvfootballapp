import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import SportsSoccerIcon from "@material-ui/icons/SportsSoccer";
import Brightness5Icon from "@material-ui/icons/Brightness5";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import { useStateValue } from "../../datalayer";
import { actionTypes } from "../../reducer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "40px",
    color: "default",
  },
  title: {
    flexGrow: 1,
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  navbar: {
    background: theme.palette.background.paper,
  },
  black: {
    color: theme.palette.text.secondary,
  },
}));

export default function Navbar({ mainTheme, switchTheme }) {
  const classes = useStyles();
  const [{}, dispatch] = useStateValue();

  const addPlayer = () => {
    dispatch({
      type: actionTypes.SET_PLAYER
    })
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.navbar}>
          <SportsSoccerIcon className={classes.black} />
          <Typography variant="h6" className={classes.title}>
            Watch Football
          </Typography>
          <IconButton
            onClick={addPlayer}
          >
            <AddIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              switchTheme(!mainTheme);
            }}
          >
            {mainTheme ? <Brightness5Icon /> : <Brightness2Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
