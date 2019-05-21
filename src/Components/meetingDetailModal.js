import React from "react";
import ReactDOM from "react-dom";

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
  console.log(dataArray);
  let identifier;
  //*****/
  if (dataArray[dataArray.length - 1].userId === dataArray[0].user.userId) {
    //user가 모임의 주최자
    if (dataArray.length === 2) {
      //참가자가 0명 (오너만 참가)
      identifier = "모임 삭제";
    } else {
      //참가자가 1명 이상
      identifier = 0; //[no button]
    }
  } else {
    //user가 오너가 아닌 경우
    if (isParticipants(dataArray)) {
      identifier = "참가 취소";
    } else {
      if (dataArray.length - 1 === dataArray[0].meeting.limit) {
        //참가인원 초과
        identifier = 0; //[no button]
      } else {
        //참가 가능
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
  return props.show
    ? ReactDOM.createPortal(
      <div className="modal">
        <button className="closeBtn" onClick={props.closeModal}>
          <span aria-hidden="true">&times;</span>
        </button>
        <h4>
          <strong>{props.data[0].meeting.name}</strong>{" "}
        </h4>
        <div>
          <strong>주최자</strong> {props.data[0].meeting.user.nickname}
        </div>
        <div>
          <strong>날짜/시간</strong>{" "}
          {dateFormater(props.data[0].meeting.time)}
        </div>
        <div>
          <strong>참가자</strong>{" "}
          {displayParticipants(props.data).displayNames}{" "}
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
          >
            {buttonDisplayIdentifier(props.data)}
          </button>
        )}
      </div>,
      document.querySelector("#modal_root")
    )
    : null;
};

export default MeetingDetailModal;
