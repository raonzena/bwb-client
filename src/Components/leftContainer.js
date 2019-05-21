import React from "react";
import MeetingListsContainer from "./MeetingListsContainer";



class LeftContainer extends React.Component {
    constructor(props) {
        console.log(props)
        super(props)
        this.state = {
            meetingsInfos: undefined
        }
    }



    fetchMeetingLists = () => {
        fetch("http://localhost:3000/meetings/list/region", {
            method: "POST",
            body: JSON.stringify({ restaurantInfos: this.props.restaurantInfos }),
            headers: {
                "Content-Type": "application/json",
            }
        }).then(result =>
            result.json()
        ).then(fetchedMeetingLists => {
            console.log('fetched', fetchedMeetingLists)
            this.setState({
                meetingsInfos: fetchedMeetingLists
            })
        })
    }

    shouldComponentUpdate() {
        return true;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.restaurantInfos !== this.props.restaurantInfos) {
            this.fetchMeetingLists();
        }
    }

    render() {
        return (
            <div>
                {this.props.restaurantInfos.length > 0 ?
                    (< MeetingListsContainer meetingsInfos={this.state.meetingsInfos}
                        restaurantInfos={this.props.restaurantInfos} fetchMeetingLists={this.fetchMeetingLists} />)
                    : null
                }
            </div >
        );
    }

};

export default LeftContainer;
