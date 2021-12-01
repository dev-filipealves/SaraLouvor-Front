import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    // This is the BETTER way of styling your Material UI components 
    //theme gives you ome pattern styles. If you want to, it is possible to define plain stylization, like 'padding: 10px'
    container : {
        backgroundColor: "paper",
        padding: theme.spacing(8,0,6)
    },
}));

export default useStyles;