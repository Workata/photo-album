import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {

    },
    loginInput: {
      color: 'black',
      backgroundColor: 'white',
      marginBottom: 30,
    },
    adminButton: {
      position: 'absolute',
      left: 10,
    },
    goBackButton: {
      position: 'absolute',
      right: 10,
    },
    error: {}
  }));
  
  export default useStyles;