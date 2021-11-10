import { makeStyles } from '@material-ui/core/styles';
import palette from '../../static/palette';

const useStyles = makeStyles({
    p2: {
        padding: 20
    },
    title: {
        fontWeight: 600,
        width: '70vw',
        marginBottom: 30,
        fontFamily: 'Playfair Display',
        color: palette.text.secondary
    },
    subtitle: {
        fontWeight: 600,
        marginBottom: 30,
        fontSize: 26,
        fontFamily: 'Poppins Regular',
        color: palette.text.secondary
    },
    btn: {
        textTransform: 'none',
        boxShadow: 'none',
        fontFamily: 'Poppins Regular'
    },
    divider: {
        marginTop: 50
    },
})

export { useStyles };