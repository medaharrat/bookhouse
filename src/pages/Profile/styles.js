import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    padding: {
        padding: 10
    },
    profile: {
        height: '85vh'
    },
    btn: {
        textTransform: 'none',
        boxShadow: 'none',
        fontFamily: 'Poppins Regular'
    },
    user: {
        textAlign: 'center'
    },
    name: {
        fontWeight: 500,
        fontFamily: 'Playfair Display',
    },
    tabs: {
        marginTop: 20
    }
})

export { useStyles };