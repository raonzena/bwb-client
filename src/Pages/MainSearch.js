import React, { Component, Fragment } from "react";
import HomeButton from "./HomeButton"

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { Button } from "@material-ui/core";

const styles = {
  root: {
    flexGrow: 1,
  },
};

function MainSearch(props) {
  const { classes } = props;

  return (
    <div className="Search-Div">
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
          <Button color="inherit"><HomeButton/></Button>
            <Typography className="Input-Bar" variant="h6" color="inherit" >            
              <InputBase
                  className="Input-Bar"
                  type="text"
                  placeholder="     🔍     지역을 검색하시오  "
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  onKeyDown={props.handleSearch}
                  style={{ fontSize: 40 }}
              />  
            </Typography>
            
          </Toolbar>
          
        </AppBar>
        
      </div>
      <div className="Search-Div">
      
      {/* <input 
          className="Input-Bar"
          type="text"
          
          onKeyDown={props.handleSearch}
        /> */}
      </div>  
    </div>
  );
}

MainSearch.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainSearch);

// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

// const styles = {
//   root: {
//     flexGrow: 1,
//   },
//   grow: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginLeft: -12,
//     marginRight: 20,
//   },
// };


