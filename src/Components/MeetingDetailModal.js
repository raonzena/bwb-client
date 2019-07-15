import React from "react";
import ReactDOM from "react-dom";
import CloseButton from "../pages/CloseButton";


const displayParticipants = dataArray => {
  let displayItems = {};
  let displayContents = "";
  for (let i = 0; i < dataArray.length - 1; i++) {
    displayContents = displayContents + dataArray[i].user.nickname;
    if (i !== dataArray.length - 2) {
      displayContents += ", ";
    }
  }
  displayItems.displayNames = displayContents;
  displayItems.displayCounts =
    dataArray.length - 1 + " / " + dataArray[0].meeting.limit;
  return displayItems;
};

const isParticipants = dataArray => {
  for (let i = 0; i <= dataArray.length - 2; i++) {
    if (dataArray[i].user.userId === dataArray[dataArray.length - 1].userId) {
      return true;
    }
  }
  return false;
};

const buttonDisplayIdentifier = dataArray => {
  let identifier;
  //*****/
  if (dataArray[dataArray.length - 1].userId === dataArray[0].user.userId) {
    if (dataArray.length === 2) {
      identifier = "모임 삭제";
    } else {
      identifier = 0; //[no button]
    }
  } else {
    if (isParticipants(dataArray)) {
      identifier = "참가 취소";
    } else {
      if (dataArray.length - 1 === dataArray[0].meeting.limit) {
        identifier = 0; //[no button]
      } else {
        identifier = "참가하기";
      }
    }
  }

  return identifier;
};

const dateFormater = inputDate => {
  let returnDate = "";
  let date = inputDate.slice(0, 10);
  let hour = Number(inputDate.slice(11, 13)) + 9;
  let time = inputDate.slice(13, 16);
  returnDate = date + " " + hour + time;
  return returnDate;
};



const MeetingDetailModal = props => {
  let buttonNameClose = "BACK";

  return props.show
    ? ReactDOM.createPortal(
      <div className="modal" > 
        <CloseButton className="closeBtn" aria-hidden="true" closeModal={props.closeModal} buttonName = {buttonNameClose}/>
        <div className="modalTitle">
          <h1>
            <strong>{props.data[0].meeting.name}</strong>{"  "}
          </h1>
        </div>
        <div>
          
          <h3><strong>주최자</strong></h3> {props.data[0].meeting.user.nickname}
        </div>
        <div>
          <h3><strong>날짜/시간</strong></h3>{"  "}
          {dateFormater(props.data[0].meeting.time)}
        </div>
        <div>
          <h3><strong>참가자</strong></h3>{"  "}
          {displayParticipants(props.data).displayNames}
          
          <span>{"  =>   "}</span>
          <img className="numOfParticipants"
                src="https://i.ibb.co/pyW3HKh/baseline-people-outline-white-18dp.png"
                alt="baseline-people-outline-pink"
          />
          {displayParticipants(props.data).displayCounts}
        </div>
        {buttonDisplayIdentifier(props.data) === 0 ? null : (
          <button
            className="participateBtn"
            onClick={() =>
              props.buttonHandler(
                buttonDisplayIdentifier(props.data),
                props.data[0].meeting_id
              )
            }
            style={{height:40}}
          >
            {buttonDisplayIdentifier(props.data)}
          </button>
        )}
        
      </div>,
      document.querySelector("#modal_root"),
      
    )
    : null;

};



export default MeetingDetailModal;


// import PropTypes from 'prop-types';

// class Modal extends React.Component {
//   render() {
//     // Render nothing if the "show" prop is false
//     if(!this.props.show) {
//       return null;
//     }

//     // The gray background
//     const backdropStyle = {
//       position: 'fixed',
//       top: 0,
//       bottom: 0,
//       left: 0,
//       right: 0,
//       backgroundColor: 'rgba(0,0,0,0.3)',
//       padding: 50
//     };

//     // The modal "window"
//     const modalStyle = {
//       backgroundColor: '#fff',
//       borderRadius: 5,
//       maxWidth: 500,
//       minHeight: 300,
//       margin: '0 auto',
//       padding: 30
//     };

//     return (
//       <div className="backdrop" style={{backdropStyle}}>
//         <div className="modal" style={{modalStyle}}>
//           {this.props.children}

//           <div className="footer">
//             <button onClick={this.props.onClose}>
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// Modal.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   show: PropTypes.bool,
//   children: PropTypes.node
// };

// export default Modal;