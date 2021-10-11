import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import BlogCard from "../components/BlogCard";
import { useBlog } from "../contexts/BlogContext";
import Typography from "@material-ui/core/Typography";
import loadingGif from "../assets/loading.gif";
import noData from "../assets/no-data.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& > *": {
      margin: theme.spacing(5),
    },
  },
  paper: {
    height: 140,
    width: 100,
  },
  title: {
    fontFamily: "Girassol",
    textAlign: "center",
    justifyContent: "center",
    color: "#046582",
  },
  mainRoot: {
    marginTop: 100,
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const { currentBlogs } = useBlog();

  return (
    <div className={classes.mainRoot}>
      <Typography className={classes.title} variant="h4" noWrap>
        Dashboard
      </Typography>
      <>
        <Grid container className={classes.root} spacing={5} justify="center">
          <Grid item xs={12}>
            <Grid container justify="center" spacing={5}>
              {currentBlogs === undefined ? (
                <img src={loadingGif} alt="loading" />
              ) : currentBlogs.length > 0 ? (
                currentBlogs?.map((item, id) => (
                  <Grid key={id} item>
                    <BlogCard post={item} />
                  </Grid>
                ))
              ) : (
                <img src={noData} alt="no-data" />
              )}
            </Grid>
          </Grid>
        </Grid>
      </>
    </div>
  );
};

export default Dashboard;
