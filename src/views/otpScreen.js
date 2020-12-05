import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Typography from '@material-ui/core/Typography';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';

export default function Otp(props) {
  console.warn(props);
  const classes = useStyles();
  const history = useHistory();
  

  const [userName,setUserName] = useState('');
  const [otp,setOtp] = useState('');
  const [showValidateError,setShowValidateError] = useState(false);
  const [showOTP,setShowOTP] = useState(false);
  const [showPassword,setShowPassword] = useState(false);
  const [email,setEmail] = useState("abcd@gmail.com");
  const [password,setPassword] = useState('');
  const [reTypePassword,setReTypePassword] = useState('');
  const [passwordError,setPasswordError] = useState(false);

  const onOTPClick = (event) => {
    let isValidateError;
    if(userName === "" ){
        isValidateError = true;
        setShowValidateError(true);
        toast.error("Missing Required Field.");
    }else{
       setShowOTP(true);
      setShowValidateError(false);
    }
    if(isValidateError){
        return;
      }
    event.preventDefault();
  };

  const onVerifyClick = (event) => {
    let isValidateError;
    if(otp === "" ){
        isValidateError = true;
        setShowValidateError(true);
        toast.error("Missing Required Field.");
    }else{
        setShowOTP(false);
        setShowPassword(true);
      setShowValidateError(false);
    }
    if(isValidateError){
        return;
      }
      toast.success("OTP Verified Successfully.");
    event.preventDefault();
  };

  const onUpdatePasswordClick = (event) => {
    let isValidateError;
    if(password === ""  && reTypePassword === ""){
        isValidateError=true;
        setShowValidateError(true);
        toast.error("Missing Required Field.");
    }else{
      setShowValidateError(false);
    }
    if(password !== reTypePassword && (!isValidateError)){
        isValidateError=true;
        setPasswordError(true);
        toast.error("Password Mismatch.");
      }else{
          setPasswordError(false);
        }
        if(isValidateError){
            return
        }

    toast.success("Password Updated Successfully.");
    history.push('/login')
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
         {showOTP? "Verify OTP" : showPassword ? "New Password" : "Request OTP"} 
        </h4>
          <Grid container spacing={2}>
          {! showOTP && ! showPassword ?  <Grid item xs={12}>
              <TextField
                id="user_name"
                name="user_name"
                label="User Name / Phone No"
                size="small"
                variant="outlined"
                required
                fullWidth
                value={userName}
                error={showValidateError && userName === ""}
                onChange={(event)=>setUserName(event.target.value.trim())}
              />
            </Grid> : null}
            {showOTP ? 
            <Grid item xs={12}>
            <Typography   color="textSecondary" style={{paddingBottom:"16px"}}>
             Note : OTP is send to registered mail address {email}
            </Typography>
              <TextField
                id="otp"
                name="otp"
                label="OTP"
                type="text"
                size="small"
                variant="outlined"
                required
                fullWidth
                value={otp}
                error={showValidateError &&  otp === ""}
                onChange={(event)=>setOtp(event.target.value.trim())}
              />
            </Grid> : null}

          {showPassword ? 
          <Grid item xs={12}>
              <TextField
                id="password"
                name="password"
                label="New Password"
                type="password"
                size="small"
                variant="outlined"
                required
                fullWidth
                value={password}
                error={showValidateError &&  password === ""}
                onChange={(event)=>setPassword(event.target.value.trim())}
              />
            </Grid> : null }
        {showPassword ? 
            <Grid item xs={12}>
              <TextField
                id="confirm_password"
                name="confirm_password"
                label="Retype Password"
                type="password"
                size="small"
                variant="outlined"
                required
                fullWidth
                value={reTypePassword}
                helperText={passwordError ?"Password mismatch":""}
                error={(showValidateError && reTypePassword === "") || passwordError}
                onChange={(event)=>setReTypePassword(event.target.value.trim())}
              />
            </Grid> :null}

          </Grid>
          {showOTP ? 
           <Button
           type="submit"
           fullWidth
           variant="contained"
           color="primary"
           style={{marginTop:"16px", marginBottom:"16px"}}
           onClick={onVerifyClick}
         >
           Verify
         </Button>:
         showPassword ? 
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{marginTop:"16px", marginBottom:"16px"}}
            onClick={onUpdatePasswordClick}
          >
            Update Password
          </Button>:
          <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{marginTop:"16px", marginBottom:"16px"}}
          onClick={onOTPClick}
        >
          OTP
        </Button>}
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