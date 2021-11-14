import { makeStyles } from "@material-ui/core/styles";
import palette from "../../static/palette";

const useStyles = makeStyles({
    content: {
        height: 190,
    },
    cover: {
        height: 275,
        width: 200
    },
    colorTag: {
        backgroundImage: palette.background.gradient,
        width: '100%',
        height: 5,
    },
    title: {
        fontSize: 14,
    },
    jumpIn: {
        position: 'relative',
        width: '80%',
        margin: 'auto',
        bottom: 10,
        backgroundColor: palette.background.grey,
        '&:hover':{
            backgroundColor: palette.background.grey,
        }
    },
    jumpInBtn: {
        width: '100%',
        borderColor: palette.borders.dark
    },
    divider: {
        marginBottom: 10
    }
})

export { useStyles };