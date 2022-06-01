import React, { useEffect, useState } from "react";
import memories from './images/memories.png'
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import Posts from './components/Posts/Posts'
import Form from './components/Form/Form'
import { useDispatch } from "react-redux";
import useStyles from './Styles'
import { getPosts } from './actions/Posts'

const App = () => {
  const [currentId, setCurrentId] = useState(null);

  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
    console.log(currentId);
  }, [currentId, dispatch])

  return (
    <Container maxwidth="lg">
      <AppBar className={classes.appBar} position='static' color='inherit'>
        <Typography className={classes.heading} variant='h2' align='center'>Memories</Typography>
        <img className={classes.image} src={memories} alt="memories" height="60" />
      </AppBar>
      <Grow in>
        <Container >
          <Grid container className={classes.mainContainer} justifyContent="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>

    </Container>
  )
};

export default App;