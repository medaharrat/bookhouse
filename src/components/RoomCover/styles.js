import { makeStyles } from "@material-ui/core/styles";
import palette from "../../static/palette";

const useStyles = makeStyles({
    content: {
        height: 190,
    },
    cover: {
        height: 275,
        width: 200
        //filter: 'blur(1px)',
        //backgroundImage: props => `url(${props.cover})`,
        //backgroundSize: "cover",
    },
    colorTag: {
        backgroundColor: 'orange',
        width: '100%',
        height: 5
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
    }
})

export { useStyles };