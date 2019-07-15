import React, { Component, Fragment } from "react";
import PropTypes from 'prop-types';
import MyPageContents from "../components/MyPageContents";
import fetchHelper from "../helpers/fetch";
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

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
      right: false,
      currentItem: null
    };
  }
  
  getMyPageList = async (side, open) => {
    var id = localStorage.getItem("token");
    if (localStorage.getItem("token")) {
      await fetchHelper.getMyPageList(id)
        .then(response => {
          return response.json();
        })
        .then(json => {
          this.setState({
            currentItem: json,
            right: open 
          });
        })
        .catch(err => {
          console.log('error')
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
        <button className="my-page-button" onClick={()=>{this.getMyPageList('right', true)}}>
          MyPage
        </button>
        <Drawer anchor="right" open={this.state.right} onClose={()=>{this.getMyPageList('right', false)}}>
          <div
            tabIndex={0}
            role="button"
            onClick={()=>{this.getMyPageList('right', false)}}
            onKeyDown={()=>{this.getMyPageList('right', false)}}
            className={classes.list}
          >
            <MyPageContents
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