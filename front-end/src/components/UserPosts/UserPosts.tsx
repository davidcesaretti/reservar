import React, { useEffect } from "react";
import { useAuth } from "../../firebase/index";

import { useDispatch, useSelector } from "react-redux";
import { findPost } from "../../actions";
import {
  Card,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import CardComp from "../CardComp/CardComp";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    paddingTop: "1rem",
    marginTop: "1rem",
    color: "black",
    textShadow: "1.4px 1.4px 1px #B2B1B9",
    fontSize: "calc(2vw + 1em)",
  },
  noPublications: {
    fontSize: '2em',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    margin: '0 auto',
    paddingTop: '50px'
  }
}));

function UserPosts() {
  const dispatch = useDispatch();
  const auth = useAuth().user?.email;
  const post = useSelector((state: any) => state.postHost);
  console.log(post);

  useEffect(() => {
    if (auth) {
      dispatch(findPost({ email: auth }));
    }
  }, [auth]);
  console.log(auth);

  const classes = useStyles();
  console.log(post, "       POSTTTT");

  return (
    <div>
      <Grid>
        <Typography className={classes.title} variant="h4" align="center">
          My properties
        </Typography>
      </Grid>
      <Container className={classes.cardGrid} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {post.length === 0 ? <div className={classes.noPublications}>You don't have published properties</div> :
            post.map((e) => (
              <Grid item key={e} xs={12} sm={6} md={6}>
                <Card className={classes.card}>
                  <CardComp
                    _id={e._id}
                    image={e.image}
                    score={e.score}
                    name={e.name}
                    type={e.type}
                    address={e.address}
                    accommodates={e.accommodates}
                    beds={e.beds}
                    price={e.price}
                    click={console.log("")}
                    boton={true}
                    deleteButton={true}
                  />
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>
    </div>
  );
}

export default UserPosts;
