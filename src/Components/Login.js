import React from "react";
import Fetch from "../helpers/fetch";
import { Redirect } from "react-router-dom";
import PropTypes from 'prop-types';
import {Avatar, Button, CssBaseline, FormControl, Input, InputLabel, Paper, Typography, withStyles } from '@material-ui/core/';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});


const Login = props => {
  const { classes } = props;
  if (props.isLogin === false) {
    return (
      <main className={classes.main} style={{width: '500px'}}>
        <CssBaseline />
        <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">로그인</Typography>
        <form
          className={classes.form}
          onSubmit={
            e => {
              e.preventDefault();
              if (e.target.id.value === "") {
                alert("아이디를 입력해주세요!");
                return false;
              } else if (e.target.pw.value === "") {
                alert("비밀번호를 입력해주세요!");
                return false;
              } else {
                var loginUser = {
                  id: e.target.id.value,
                  pw: e.target.pw.value
                };

                Fetch.fetchLogin(loginUser)
                  .then(response => {
                    if (response.status === 204) {
                      alert("가입된 회원이 아닙니다!");
                    } else if (response.status === 409) {
                      alert("비밀번호가 일치하지 않습니다!");
                    }
                    return response.json();
                  })
                  .then(token => {
                    localStorage.setItem("token", token.token);

                    document.querySelector(".my-page-button").style.display =
                      "block";
                    props.changeIsLogin(true);
                  })
                  .catch(err => {
                    return err;
                  });
              }
            }
          }
        >
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="id">아이디</InputLabel>
            <Input id="id" name="id" autoComplete="id" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">비밀번호</InputLabel>
            <Input name="pw" type="password" id="password" autoComplete="current-password" />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >로그인</Button>
        </form>
        </Paper>
      </main>
    );
  } else {
    return (
      <div>
        <Redirect to="/" />
      </div>
    );
  }
};

// export default Login;
Login.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Login);