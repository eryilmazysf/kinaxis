import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import placeholder from "../assets/placeholder.png";
import AccountCircle from "@material-ui/icons/AccountCircle";
import moment from "moment";
import { useBlog } from "../contexts/BlogContext";
import { useAuth } from "../contexts/AuthContext";
import Button from "@material-ui/core/Button";
import loadingGif from "../assets/loading.gif";
import { useHistory } from "react-router-dom";
import { toastSuccessNotify } from "../helpers/ToastNotify";
import noData from "../assets/no-data.png";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 70,
    marginBottom: 20,
  },
  cardRoot: {
    minWidth: 250,
    width: "75vw",
  },
  media: {
    paddingTop: "75%", // 16:9
  },
  image: {
    padding: 5,
  },
  avatar: {
    marginBottom: "0.35em",
  },
  cardContent: {
    backgroundColor: "#efeefe",
    minHeight: "200px",
  },
  title: {
    fontFamily: "Girassol",
    textAlign: "center",
    margin: 20,
    color: "#046582",
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    margin: 20,
  },
  dataStyle: {
    textAlign: "center",
  },
});
// match belong to ReactRouter prop
export default function Details({ match }) {
  const classes = useStyles();
  const { getOneBlog, deleteOneBlog } = useBlog();
  const { currentUser } = useAuth();
  const history = useHistory();

  const result = getOneBlog(match.params.id);

  const deleteHandler = (id) => {
    console.log("DeleteHandler", id);
    deleteOneBlog(id);
    history.push("/");
    toastSuccessNotify("Deleted successfully!");
  };

  const updateHandler = (id) => {
    history.push(`/update-blog/${id}`);
  };

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h4" noWrap>
        ──── Details ────
      </Typography>
      {result?.length > 0 ? (
        result?.map((item, index) => (
          <div key={index}>
            <Card className={classes.cardRoot} key={index}>
              <div>
                <CardMedia
                  className={classes.media}
                  image={item.image || placeholder}
                  title={item.title}
                />
                <CardContent className={classes.cardContent}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    className={classes.title}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    className={classes.dataStyle}
                  >
                    {moment(item.published_date).format("MMM DD, YYYY")}
                  </Typography>
                  <p>{item.content}</p>
                </CardContent>
              </div>
              <CardActions>
                <AccountCircle className={classes.avatar} />
                <Typography gutterBottom variant="h6" component="h2">
                  {item.author}
                </Typography>
              </CardActions>
            </Card>
            {/* just owner can update or delete blog */}
            {item.author === currentUser?.email ? (
              <div className={classes.buttonGroup}>
                <Button
                  variant="contained"
                  onClick={() => updateHandler(item.id)}
                >
                  Update
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => deleteHandler(item.id)}
                >
                  Delete
                </Button>
              </div>
            ) : null}
          </div>
        ))
      ) : result === undefined ? (
        <img src={loadingGif} alt="loading" />
      ) : (
        <>
          <img src={noData} alt="no data" />
        </>
      )}
    </div>
  );
}
