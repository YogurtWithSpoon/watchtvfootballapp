import "./App.css";
import {useStateValue} from './datalayer'
import React, { useState } from "react";
import { Container } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import MenuIcon from '@material-ui/icons/Menu';
import Navbar from "./components/Navbar";
import IconButton from "@material-ui/core/IconButton";
import AppsIcon from '@material-ui/icons/Apps';
import CssBaseline from "@material-ui/core/CssBaseline";
import Player from "./components/Player";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

function App() {
  const [prefersDarkMode, setDarkMode] = useState(false);
  const [playerGrid,setGrid] = useState(true)
  const [state, dispatch] = useStateValue()
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
          background: {
            default: prefersDarkMode ? "#222222" : "#ffffff"
          },
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Navbar
          mainTheme={prefersDarkMode}
          switchTheme={setDarkMode}
        />
        <Container >
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={() => setGrid(true)}>
              <MenuIcon />
            </IconButton>
            <IconButton onClick={() => setGrid(false)}>
              <AppsIcon />
            </IconButton>
          </Box>
          <Grid container spacing={2}>
          {
            Object.keys(state).map(i => {
              return (
                <Grid item key={i} xs={playerGrid ? 12 : 6}>
                <Player key={i} channelID={i}/>
                </Grid>
              )
            })
          }
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
