import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";


export const ACCEPT_ANSWER = "right";
export const REJECT_ANSWER = "left";
export const styles = theme => ({
  card: {
    maxWidth: 550,
    margin: "0 auto",
    marginTop: 50
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },
  margin: {
    margin: theme.spacing.unit
  },
  greenButton: {
    fontColor: "white",
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  },
  redButton: {
    fontColor: "white",
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[700]
    }
  },
  button: {
    margin: theme.spacing.unit,
    textTransform: "none",
    width: 250,
    color: "white"
  }
});
