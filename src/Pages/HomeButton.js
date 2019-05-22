import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import purple from '@material-ui/core/colors/purple'
import deepPurple from '@material-ui/core/colors/deepPurple'

import SvgIcon from '@material-ui/core/SvgIcon';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  icon: {
    margin: theme.spacing.unit * 2,
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    '&:hover': {
      color: red[800],
    },
  },
});

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

function SvgIcons(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      
      {/* <HomeIcon className={classes.icon} color="primary" style={{ fontSize: 50 }} fontSize="large" /> */}
      <HomeIcon
        className={classes.icon}
        color="primary"
        style={{ fontSize: 50 }} fontSize="large"
        component={svgProps => (
          <svg {...svgProps}>
            <defs>
              <linearGradient id="gradient1">
                <stop offset="50%" stopColor={purple[300]} />
                <stop offset="80%" stopColor={deepPurple[600]} />
              </linearGradient>
            </defs>
            {React.cloneElement(svgProps.children[0], { fill: 'url(#gradient1)' })}
          </svg>
        )}
      />
    </div>
  );
}

SvgIcons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SvgIcons);


