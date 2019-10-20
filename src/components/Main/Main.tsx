import React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import "./Main.css";
import SearchPanel from "../SearchPanel/SearchPanel";

const Main: React.FunctionComponent = () => {
  return (
    <>
      <CssBaseline />
      <Container fixed>
        <Grid container direction="column" justify="center">
          <Grid item xs={12}>
            <SearchPanel />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Main;
