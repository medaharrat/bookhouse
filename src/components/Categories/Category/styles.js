import { makeStyles } from '@material-ui/core/styles';
import palette from '../../../static/palette';

const useStyles = makeStyles({
    category: {
        display: 'flex',
        backgroundColor: palette.background.grey,
        width: 200
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 100,
    },
    title: {
        fontSize: 18,
    },
    subtitle: {
        fontSize: 14,
    }
})

export { useStyles };