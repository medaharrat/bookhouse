import { makeStyles } from "@material-ui/core/styles";
import palette from "../../static/palette";

const useStyles = makeStyles({
    layout: {
        backgroundColor: palette.background.default,
    },
    title: {
        display: 'block',
        color: palette.text.primary,
        fontWeight: 800,
        textAlign: 'center',
        padding: 20,
        userSelect: 'none'
    },
    alert: {
        marginTop: 70,
        width: '400px',
        margin: 'auto'
    }
})

export { useStyles };