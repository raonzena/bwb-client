import React from "react";
import "../App.css";
import MeetingListsContainer from "./MeetingListsContainer";

class LeftContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meetingsInfos: undefined,
      restaurantMeetingInfos: undefined,
      clickMarkerRestaurantInfo: undefined,
    };
  }

  fetchMeetingLists = (restaurantInfos) => {
    fetch("http://localhost:3000/meetings/list/region", {
      method: "POST",
      body: JSON.stringify({ restaurantInfos: restaurantInfos }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(result => result.json())
      .then(fetchedMeetingLists => {
        console.log("fetched", fetchedMeetingLists);
        if(restaurantInfos === this.props.restaurantInfos) {
            this.setState({
                meetingsInfos: fetchedMeetingLists,
                clickMarkerRestaurantInfo: this.props.clickMarkerRestaurantInfo,
            });
        } else {
            this.setState({
                restaurantMeetingInfos: fetchedMeetingLists,
            });     
        }
      });
  };

  shouldComponentUpdate() {
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.restaurantInfos !== this.props.restaurantInfos) {
        this.fetchMeetingLists(this.props.restaurantInfos);
    }
    if (prevProps.clickMarkerRestaurantInfo !== this.props.clickMarkerRestaurantInfo) {
        this.fetchMeetingLists(new Array(this.props.clickMarkerRestaurantInfo));
    }
  }

  render() {
    console.log(this.props, 'fuck')
    console.log(this.state, 'shit')
    return (
      <div className="MeetingListsContainer">
        {this.props.restaurantInfos.length > 0 ? (
            this.props.clickMarkerRestaurantInfo ? (
                <MeetingListsContainer
                    meetingsInfos={this.state.restaurantMeetingInfos}
                    restaurantInfos={this.props.restaurantInfos}
                    fetchMeetingLists={this.fetchMeetingLists}
                    clickMarkerRestaurantInfo={this.props.clickMarkerRestaurantInfo} 
                    backToMeetingList={this.props.backToMeetingList}
                /> )
                :
                <MeetingListsContainer
                    meetingsInfos={this.state.meetingsInfos}
                    restaurantInfos={this.props.restaurantInfos}
                    fetchMeetingLists={this.fetchMeetingLists}
                />
            ) : 
            null
        }
      </div>
    );
  }
}

export default LeftContainer;
