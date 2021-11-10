import { makeStyles } from "@material-ui/core/styles";
import palette from "../../../static/palette";

const useStyles = makeStyles({
    margin: {
        marginTop: 10,
        marginBottom: 10,
    },
    center: {
        textAlign: 'center'
    },
    title: {
        fontFamily: 'Playfair Display',
        fontWeight: 600,
        color: palette.text.secondary
    },
    subtitle: {
        fontSize: 16,
        paddingTop: 7,
        fontFamily: 'Poppins Regular',
        color: palette.text.secondary
    },
    form: {
        margin: 'auto'
    },
    btn: {
        textTransform: 'none',
        boxShadow: 'none',
        fontFamily: 'Poppins Regular'
    },
})

export { useStyles };