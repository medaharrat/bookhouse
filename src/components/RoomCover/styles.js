import { makeStyles } from "@material-ui/core/styles";
import palette from "../../static/palette";

const useStyles = makeStyles({
    cover: {
        height: 275,
        filter: 'blur(1px)',
        backgroundImage: props => `url(${props.cover})`,
        backgroundSize: "cover",
    },
    title: {
        fontSize: 14,
    },

})

export { useStyles };