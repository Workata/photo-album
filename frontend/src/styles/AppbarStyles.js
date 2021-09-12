import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    // TODO change for display flex instead of position absolute
    root: {
      // flexGrow: 1,
      // width: '100%',
      // display: 'flex',
      // alignItems: 'center',
      // justifyContent: 'space-between',
    },
    appbarTitle: {
      position: 'absolute',
      left: '48%',
    },
    adminButton: {
      position: 'absolute',
      left: 10,
    },
    goBackButton: {
      position: 'absolute',
      right: 10,
    },
  }));
  
  export default useStyles;