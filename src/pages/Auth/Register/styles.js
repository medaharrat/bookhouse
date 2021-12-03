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
        paddingTop: 10,
        paddingBottom: 30,
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
    loading: {
        color: 'blue',
        position: 'absolute',
        marginTop: 10,
        marginLeft: '48%'
    }
})

export { useStyles };