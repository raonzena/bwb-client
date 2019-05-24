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
    margin:0,
    padding:0,
  },
};

function MainSearch(props) {
  const { classes } = props;
  console.log(props, 'props MainSearch')

  return (
    <Fragment>
      <div className="searchSection">
        <span className={classes.root + ' searchBar'} style={{margin:0, padding: 0}}>
          <AppBar position="static" color="default" style={{margin: 0, padding: 0}}>
            <Toolbar>
              <Typography className="Input-Bar" variant="h6" color="inherit" style={{margin:0, padding: 0}}>            
                <InputBase
                    className="Input-Bar"
                    type="text"
                    placeholder="       지역을 검색하시오  "
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    onKeyPress={props.handleSearch}
                    style={{ fontSize: 25, margin: 0, padding: 0 }}  
                />
              </Typography>
                   
              {/* < Button color="inherit" onClick={props.handleClickSearch} style={{ fontSize: 50, width: 40 }} > 🔍</Button> */}
            </Toolbar>
          </AppBar>
        </span>
        <span className='searchButton'>
        <SearchButton className="Test" handleClickSearch={props.handleClickSearch} style={{ fontSize: 40, margin: 0, padding: 0}} /> 
        </span>
        </div>
    </Fragment>
  );
}

MainSearch.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainSearch);

