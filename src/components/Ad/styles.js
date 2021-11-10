import { makeStyles } from '@material-ui/core/styles';
import palette from '../../static/palette';

const useStyles = makeStyles({
    ad: {
        backgroundImage: palette.background.gradient,
        padding: 10,
        textAlign: 'center',
    },
    desc: {
        padding: 10,
        fontFamily: 'Poppins Regular',
        fontWeight: 800,
        color: palette.text.white,
    },
    link: {
        textDecoration: 'none !important',
        marginTop: 100,
    },
    btn: {
        color: `${palette.text.white}`,
        border: `1px solid ${palette.text.white}`
    }
})

export { useStyles };