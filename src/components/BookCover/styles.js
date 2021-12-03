import { makeStyles } from '@material-ui/core/styles';
import palette from '../../static/palette';

const useStyles = makeStyles({
    title: {
        marginTop: 10,
        fontWeight: 600,
        fontSize: 13,
        width: '70vw',
        fontFamily: 'Poppins regular',
        color: palette.text.secondary
    },
    subtitle: {
        fontWeight: 600,
        fontSize: 12,
        fontFamily: 'Poppins',
        color: palette.text.grey
    },
    swiper: {
        textAlign: 'center',
    },
    cover: {
        height: 220,
        width: 137,
        borderRadius: 8
    },
})

export { useStyles };