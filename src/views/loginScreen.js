import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';

export default function LogIn(props) {
  console.warn(props);
  const classes = useStyles();
  const history = useHistory();
  

  const [userName,setUserName] = useState('');
  const [password,setPassword] = useState('');
  const [showValidateError,setShowValidateError] = useState(false);



  const onLoginClick = (event) => {
    let isValidateError;
    if(userName === "" || password === "" ){
        isValidateError=true;
        setShowValidateError(true);
        toast.error("Missing Required Field.");
    }else{
      setShowValidateError(false);
    }
    if(isValidateError){
      return;
    }
    toast.success("Login Successfully.");
    event.preventDefault();
  };


  return (
    <Container maxWidth="xs" style={{background:"#ffff", borderRadius:"5px"}} >
      <div className={classes.container}>
        <Avatar style={{ 
          background: 'linear-gradient(48deg, rgb(38 194 199 / 58%) 30%, rgb(0 43 255 / 99%) 90%)',
          marginTop:"16px"}}>
          <LockOutlinedIcon />
        </Avatar>
        <h4 style={{lineHeight:"0px",paddingBottom:"8px"}} color="textSecondary">
          Log In
        </h4>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="user_name"
                name="user_name"
                label="User Name"
                size="small"
                variant="outlined"
                required
                fullWidth
                value={userName}
                error={showValidateError && userName === ""}
                onChange={(event)=>setUserName(event.target.value.trim())}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                size="small"
                variant="outlined"
                required
                fullWidth
                value={password}
                error={showValidateError &&  password === ""}
                onChange={(event)=>setPassword(event.target.value.trim())}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{marginTop:"16px"}}
            onClick={onLoginClick}
          >
            Sign In
          </Button>
          <Grid container justify="center" style={{padding:'16px'}}>
            <Grid item>
              <Link href="register" variant="body2">
                Don't have an account? Register
              </Link>
            </Grid>
          </Grid>
          <Grid container justify="center" style={{paddingBottom:'16px'}}>
            <Grid item>
              <Link href="otp" variant="body2">
                Forget Password? 
              </Link>
            </Grid>
          </Grid>
      </div>
      <ToastContainer
      position="bottom-left"
      hideProgressBar />
      </Container>
  );
}

const useStyles = makeStyles(() => ({
  container: {
    marginTop: "16px",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));