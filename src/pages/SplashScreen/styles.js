import { makeStyles } from '@material-ui/core/styles';
import palette from '../../static/palette';

const useStyles = makeStyles({
    title: {
        fontWeight: 600,
        width: '70vw',
        marginBottom: 30,
        fontFamily: 'Playfair Display',
        color: palette.text.secondary
    },
    subtitle: {
        textAlign: 'center',
        fontWeight: 600,
        marginBottom: 30,
        fontSize: 26,
        fontFamily: 'Playfair Display',
        color: palette.text.secondary
    },
    btn: {
        textTransform: 'none',
        boxShadow: 'none',
        fontFamily: 'Poppins Regular',
    },
    imgWrap: {
        textAlign: 'center',
        marginTop: 50
    },
    img: {
        height: '90%',
        width: '90%',
    },
    divider: {
        marginTop: 100
    }
})

export { useStyles };




