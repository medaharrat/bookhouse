import { makeStyles } from "@material-ui/core/styles";
import palette from "../../static/palette";

const useStyles = makeStyles({
    title: {
      color: palette.text.secondary,
      fontWeight: 600,
    },
    avatarContainer: {
      textAlign: "center"
    },
    avatar: {
      height: style => (style.height) ? style.height : 50,  
      width: style => (style.height) ? style.height : 50,  
      border: speaking => (speaking ? '1px solid black' : ''),
      borderRadius: 20,
    },
    muted: {
      "& .MuiBadge-badge": {
        color: palette.text.secondary,
        backgroundColor: palette.background.default,
        border: `1px solid ${palette.borders.light}`,
        boxShadow: 'none'
      },
    },
    mutedIcon: {
      height: 15,
      width: 15,
    }
})

export { useStyles };




