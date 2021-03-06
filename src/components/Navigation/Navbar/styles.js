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
    backgroundColor: palette.background.smooth,
    color: palette.text.secondary,
    paddingBottom: 'env(safe-area-inset-bottom)',
  },
  grow: {
    flexGrow: 4,
    textAlign: 'center',
  },
  plus: {
    fontSize: 18,
    marginRight: 10
  },
  startWrapper: {
    width: '40%',

  },
  start: {
    backgroundImage: palette.background.gradient,
    borderRadius: 10,
    textTransform: 'none',
    fontSize: 16,
    textAlign: 'center'
  },
  startBtn: {
    width: '100%',
    color: `${palette.text.white} !important`
  },
  modal: {
    position: 'relative',
    top: '35vh',
    width: 400,
    margin: 'auto',
    backgroundColor: palette.background.grey,
    borderRadius: 10,
    boxShadow: palette.background.shadow,
    padding: 20,
    textAlign: 'center'
  },
})

export { useStyles };


