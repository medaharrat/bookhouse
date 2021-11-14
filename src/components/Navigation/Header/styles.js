import { makeStyles } from "@material-ui/core/styles";
import palette from "../../../static/palette";

const useStyles = makeStyles({
  header: {
    backgroundColor: palette.background.default,
    boxShadow: 'none',
  },
  icon: {
    color: palette.text.grey
  },
  grow: {
    flexGrow: 1,
  },
  divider: {
    height: 60
  }
})

export { useStyles };


