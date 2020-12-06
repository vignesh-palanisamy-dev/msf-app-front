import React,{useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import {  toast } from 'react-toastify';
import { register } from '../service/authenticationService';
import * as encryptUtil from '../utils/encryptUtil';
import { viewProfile } from '../service/profileService';

export default function SignUp(props) {
  const classes = useStyles();
  const history = useHistory();
  
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [userName,setUserName] = useState('');
  const [password,setPassword] = useState('');
  const [reTypePassword,setReTypePassword] = useState('');
  const [emailId,setEmailId] = useState('');
  const [phoneNo,setPhoneNo] = useState(0);
  const [dateOfBirth,setDateOfBirth] = useState('2017-05-24');
  const [company,setCompany] = useState('');
  const [experience,setExperience] = useState(0);
  const [showValidateError,setShowValidateError] = useState(false);
  const [passwordError,setPasswordError] = useState(false);
  const [emailError,setEmailError] = useState(false);
  const [userExistError,setUserExistError] = useState("");

  useEffect(() =>{
    viewProfile().then((response) =>{
        if(response?.userData){
          history.push("/home");
        }
      });
   },[]);

  const onRegisterClick = (event) => {
    let isValidateError;
    if((userName === "" || password === "" ||  reTypePassword === "" || 
       emailId === "" ||  phoneNo === "") && (!isValidateError)){
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
    if(!emailId.toLocaleLowerCase().includes("@gmail.com")&& (!isValidateError)){
      isValidateError=true;
      setEmailError(true);
      toast.error("Invalid Mail Address.");
    }else{
      setEmailError(false);
    }
 if(isValidateError){
   return;
 }
 let pwd= encryptUtil.getEncrypt(password.toString());
 let dataMap = {user_name : userName, 
           password : pwd, phone_no : phoneNo,
           email_id : emailId, 
           first_name : firstName,
           last_name : lastName,
           d_o_b : dateOfBirth,
           company_name: company,
           experience : experience};

 register(dataMap).then(() =>{
   history.push("/login");
 }).catch(error =>{
  if(error.response?.data?.result?.userData){
    let userData = error.response.data.result.userData;
    setUserExistError("");
    if(userData.user_name === userName){
      setUserExistError("userName");
    }else if(userData.phone_no === phoneNo){
      setUserExistError("phoneNo");
    }
  }
 })
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
          Register
        </h4>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="first_name"
                name="first_name"
                label="First Name"
                variant="outlined"
                size="small"
                fullWidth
                autoFocus
                value={firstName}
                onChange={(event)=>setFirstName(event.target.value.trim())}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="last_name"
                name="last_name"
                label="Last Name"
                size="small"
                variant="outlined"
                fullWidth
                value={lastName}
                onChange={(event)=>setLastName(event.target.value.trim())}
              />
            </Grid>
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
                error={(showValidateError && userName === "")||(userExistError === "userName")}
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="email_id"
                name="email_id"
                label="Email Address"
                type="email"
                variant="outlined"
                size="small"
                required
                fullWidth
                value={emailId}
                helperText={"Supports only @gmail.com"}
                error={(showValidateError && emailId === "") || emailError}
                onChange={(event)=>setEmailId(event.target.value.trim())}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="phone_no"
                name="phone_no"
                label="Phone No"
                variant="outlined"
                type="number"
                size="small"
                required
                fullWidth
                value={phoneNo}
                error={(showValidateError && phoneNo === "")||(userExistError === "phoneNo")}
                onChange={(event)=>setPhoneNo(event.target.value.trim())}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
               <TextField
                 id="d_o_b"
                 name="d_o_b"
                 label="Birthday"
                 type="date"
                 fullWidth
                 size="small"
                 variant="outlined"
                 value={dateOfBirth}
                 onChange={(event)=>setDateOfBirth(event.target.value.trim())}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="company"
                name="company"
                label="Company"
                variant="outlined"
                size="small"
                fullWidth
                value={company}
                onChange={(event)=>setCompany(event.target.value.trim())}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="experience"
                name="experience"
                label="Experience(Y)"
                type ="number"
                variant="outlined"
                size="small"
                fullWidth
                value={experience}
                onChange={(event)=>setExperience(event.target.value.trim())}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{marginTop:"16px"}}
            onClick={onRegisterClick}
          >
            Sign Up
          </Button>
          <Grid container justify="center" style={{padding:'16px'}}>
            <Grid item>
              <Link  variant="body2" onClick={() => history.push("/login")}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
      </div>
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