import React, { Component, Fragment } from "react";
import SearchButton from './SearchButton'

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
    
    <Fragment>
        <span className={classes.root}>
          <AppBar position="static" color="default">
            <Toolbar>
            < Button color="inherit" onClick={props.handleClickHome} style={{ fontSize: 40 }} > 🔍 </Button>
              <Typography className="Input-Bar" variant="h6" color="inherit" >            
                <InputBase
                    className="Input-Bar"
                    type="text"
                    placeholder="       지역을 검색하시오  "
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    onKeyPress={props.handleSearch}
                    style={{ fontSize: 25 }}  
                />
              </Typography>
              <SearchButton className="Test" style={{ fontSize: 40 }} /> 
            </Toolbar>
           
          </AppBar>
        </span>
    </Fragment>
  );
}

MainSearch.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainSearch);

