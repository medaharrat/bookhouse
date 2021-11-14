import { makeStyles } from "@material-ui/core/styles";
import palette from "../../../static/palette";

const useStyles = makeStyles({
  navBar: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    top: 'auto',
    zIndex: 99,
    backgroundColor: palette.background.grey,
    color: palette.text.secondary,
    paddingBottom: 'env(safe-area-inset-bottom)',
  },
  grow: {
    flexGrow: 4,
    textAlign: 'center',
  },
})

export { useStyles };


