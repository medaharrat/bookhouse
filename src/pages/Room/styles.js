import { makeStyles } from '@material-ui/core/styles';
import palette from '../../static/palette';

const useStyles = makeStyles({
    room: {
        backgroundColor: palette.background.grey,
        height: '75vh',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        userSelect: 'none'
    },
    attendees: {
        overflowY: 'scroll',
        overflowX: 'hidden',
        maxHeight: '55vh',
        width: '80vw',
    },
    title: {
        color: palette.text.secondary,
        padding: 20,
        fontSize: 20,
        fontWeight: 600,
    },
    subtitle: {
        color: palette.text.secondary,
        textAlign: 'center',
        padding: 10,
        fontWeight: 600,
    },
    controls: {
        position: 'absolute',
        zIndex: 99,
        width: '100%',
        height: '10vh',
        bottom: 0,
        backgroundColor: palette.background.darkgrey,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    leave: {
        borderRadius: 15,
        padding: 10,
        color: palette.text.grey,
        backgroundColor: palette.background.grey,
    },
    controlBtn: {
        color: palette.text.grey,
        backgroundColor: palette.background.grey,
    },
    raised: {
        color: palette.text.primary
    },
    controllOff: {
        color: '#FF0000'
    },
    modal: {
        position: 'relative',
        top: '35vh',
        width: 400,
        margin: 'auto',
        backgroundColor: palette.background.grey,
        borderRadius: 10,
        boxShadow: palette.background.shadow,
        padding: 20,
        textAlign: 'center'
    },
    modalActions: {
        justifyContent: 'center',
    },
    modalController: {
        border: `1px solid ${palette.background.darkgrey}`,
        margin: 10
    },

})

export { useStyles };




