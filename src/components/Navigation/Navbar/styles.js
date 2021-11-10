import { makeStyles } from "@material-ui/core/styles";
import palette from "../../../static/palette";

const useStyles = makeStyles({
  navBar: {
    backgroundColor: palette.background.grey,
    color: palette.text.secondary,
    boxShadow: 'none',
    top: 'auto',
    bottom: 0,
    zIndex: 99,
    paddingBottom: 'env(safe-area-inset-bottom)',
  },
  grow: {
    flexGrow: 4,
    textAlign: 'center',
  },
})

export { useStyles };


