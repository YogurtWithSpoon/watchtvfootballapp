import React, { useState, useEffect,useMemo } from "react";
import ReactHlsPlayer from "react-hls-player";
import axios from "axios";
import {useStateValue} from '../../datalayer'
import {actionTypes} from '../../reducer'

//material ui
import { makeStyles } from "@material-ui/core/styles";
import { Select } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import MenuItem from "@material-ui/core/MenuItem";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    padding: "20px",
    marginBottom: "30px",
  },
  navbar__player: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0 20px",
  },
});

function Player({channelID}){
  const classes = useStyles();
  const [state,dispatch] = useStateValue();
  const [channel, setChannel] = useState(state[channelID].name)

  const deletePlayer = () => {
    dispatch({
      type: actionTypes.DELETE_PLAYER,
      player: channelID
    })
  };

  const handleChange = (event) => {
    setChannel(event.target.value);
  };

  const loadURL = (ch) => {
    let url = `http://localhost:5000/player/?channel=${ch}`;
    axios.get(url).then(link => {
      dispatch({
        type: actionTypes.SET_NAME,
        payload: [channelID,ch,link.data]
      })
    });
  }

  useEffect(() => {
    loadURL(channel)
    console.log(`${channelID} mount`)
    return () => console.log(`${channelID} unmount`)
  },[channel])

  const player = useMemo(() => 
      (<ReactHlsPlayer
            url={state[channelID].url}
            autoplay={true}
            controls={true}
            width="100%"
            height="auto"
      />),[state[channelID].url])


  return (
    <Card className={classes.root}>
      <div className={classes.navbar__player}>
        <Select
          value={state[channelID].name}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="" disabled>
            Выбрать канал
          </MenuItem>
          <MenuItem value={"matchtvhd"}>Матч ТВ HD</MenuItem>
          <MenuItem value={"matchpremierhd"}>Матч Премьер HD</MenuItem>
          <MenuItem value={"matchfootball1hd"}>Матч Футбол 1 HD</MenuItem>
          <MenuItem value={"matchfootball2hd"}>Матч Футбол 2 HD</MenuItem>
          <MenuItem value={"matchfootball3hd"}>Матч Футбол 3 HD</MenuItem>
        </Select>
        <IconButton onClick={deletePlayer}>
          <ClearIcon />
        </IconButton>
      </div>
      <CardContent>
        {Boolean(state[channelID].url) ? (
          player
        ) : (
          <h1>Канал не выбран</h1>
        )}
      </CardContent>
    </Card>
  );
};

export default Player;
