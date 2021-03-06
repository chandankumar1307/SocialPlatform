import React, { useEffect, useState } from 'react'
import { Grow, Container, Grid } from '@material-ui/core'
import { useDispatch } from "react-redux";
import useStyles from '../../Styles'
import Posts from '../Posts/Posts'
import { getPosts } from '../../actions/Posts';
import Form from '../Form/Form'

const Home = () => {

    const [currentId, setCurrentId] = useState(null);

    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
        console.log(currentId);
    }, [currentId, dispatch])

    return (
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
    )
}

export default Home