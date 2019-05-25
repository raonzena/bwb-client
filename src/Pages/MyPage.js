import React, { Component, Fragment } from "react";
import PropTypes from 'prop-types';
import MyPageContents from "../Components/MyPageContents";
import fetchHelper from "../helpers/fetch";
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';

const styles = {
  list: {
    width: 400,
    margin: 30,
    font:'bold',
  },
  fullList: {
    width: 'auto',
  },
};

class MyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      top: false,
      left: false,
      bottom: false,
      right: false,
      currentItem: null
    };
  }

  toggleDrawer = (side, open) => event => {
    this.getMyPageList(side, open);
  };
  
  getMyPageList = async (side, open) => {
    var id = localStorage.getItem("token");
    if (localStorage.getItem("token")) {
      fetchHelper
      .getMyPageList(id)
      .then(response => {
          return response.json();
        })
        .then(json => {
          if(side) {
            this.setState({
              currentItem: json,
              [side]: open 
            });
          } else {
            this.setState({
              currentItem: json
            });
          }
        })
        .catch(err => {
          return err;
        });
    }
  };

  componentDidMount = () => {
    if(!this.props.isLogin) {
      document.querySelector(".my-page-button").style.display = "none"
    } else {
      document.querySelector(".my-page-button").style.display = "block"
    }
    this.getMyPageList();
  }
  
  componentDidUpdate = () => {
    if(!this.props.isLogin) {
      document.querySelector(".my-page-button").style.display = "none"
    } else {
      document.querySelector(".my-page-button").style.display = "block"
    }
  }

  render() {
    const {classes} = this.props;
    return (
      <Fragment>
        <button className="my-page-button w3-button w3-white" onClick={this.toggleDrawer('right', true)}>
          MyPage
        </button>
        <Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('right', false)}
            onKeyDown={this.toggleDrawer('right', false)}
            className={classes.list}
          >
            <MyPageContents
              closeMyPageList={this.closeMyPageList}
              currentItem={this.state.currentItem}
            />
          </div>
        </Drawer>
      </Fragment>
    );
  }
}

// export default MyPage;

MyPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyPage);