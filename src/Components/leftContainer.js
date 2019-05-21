import React from "react";
import MeetingListsContainer from "./MeetingListsContainer";
import RestaurantMeetingList from "./RestaurantMeetingList";

class LeftContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meetingsInfos: undefined
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
        this.setState({
          meetingsInfos: fetchedMeetingLists
        });
      });
  };

  shouldComponentUpdate() {
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.restaurantInfos !== this.props.restaurantInfos) {
        this.fetchMeetingLists(this.props.restaurantInfos);
    } 
    if(prevProps.clickMarkerRestaurantInfo !== this.props.clickMarkerRestaurantInfo) {
        this.fetchMeetingLists(new Array(this.props.clickMarkerRestaurantInfo));
    }
  }

  render() {
    return (
      <div>
        {this.props.restaurantInfos.length > 0 ? (
          <MeetingListsContainer
            meetingsInfos={this.state.meetingsInfos}
            restaurantInfos={this.props.restaurantInfos}
            fetchMeetingLists={this.fetchMeetingLists}
          />
        ) : 
        (this.props.clickMarkerRestaurantInfo ? (
            <RestaurantMeetingList clickMarkerRestaurantInfo={this.props.clickMarkerRestaurantInfo} 
            meetingsInfos={this.state.meetingsInfos}/>
        ) : null)}
      </div>
    );
  }
}

export default LeftContainer;
