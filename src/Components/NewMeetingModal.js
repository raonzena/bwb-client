import React from "react";
import ReactDOM from "react-dom";
import Calendar from "./Calendar";

class NewMeetingModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      month: new Date().getMonth() + 1,
      date: new Date().getDate(),
      hour: null,
      minute: "00"
    };
    this.textInput = null;
    this.maxNum = 10;
    this.numberOptionArr = [];
  }

  MonthHandler = month => {
    this.setState({
      month: month
    });
  };

  createSubmitData = () => {
    let date = this.state.date !== document.querySelector("#dateSelector").value ? document.querySelector("#dateSelector").value : this.state.date
    let hour = this.state.hour !== document.querySelector("#dateSelector").value ? document.querySelector("#hourSelector").value : this.state.hour
    let submitData = {};
    submitData.meeting_name = this.name.value;
    submitData.time =
      "2019-" +
      this.state.month +
      "-" +
      date +
      " " +
      hour +
      ":" +
      this.state.minute;
    submitData.limit = this.number.value;
    return submitData;
  };

  createNumberOptions = () => {
    for (let i = 2; i <= this.maxNum; i++) {
      this.numberOptionArr.push(
        <option value={i} key={i}>
          {i}
        </option>
      );
    }
  };

  setDate = date => {
    this.setState({
      date: date
    });
  };

  setHour = hour => {
    this.setState({
      hour: hour
    });
  };

  setMinute = minute => {
    this.setState({
      minute: minute
    });
  };

  componentDidMount = () => {
    this.createNumberOptions();
  };
  render() {
    return this.props.show
      ? ReactDOM.createPortal(
        <div className="modal">
          <button className="closeBtn" onClick={this.props.closeModal}>
            <span aria-hidden="true">&times;</span>
          </button>
          <div>
            <strong>모임이름</strong>
            <input
              id="inputMeetingName"
              ref={input => (this.name = input)}
              type="text"
              placeholder="모임이름"
            />
          </div>
          <div>
            <strong>주최자</strong> {this.props.nickname}
          </div>
          <div>
            <strong>날짜/시간</strong>
            <span>2019년</span>
            <Calendar
              month={this.state.month}
              date={this.state.date}
              onMonthChange={this.MonthHandler}
              onDateChage={this.setDate}
              onHourChange={this.setHour}
              onMinuteChange={this.setMinute}
            />
          </div>
          <div>
            <strong>장소</strong> {this.props.placeName}
          </div>
          <div>
            <strong>최대인원</strong>
            <select
              id="numberSelector"
              ref={select => (this.number = select)}
            >
              {this.numberOptionArr}
            </select>
          </div>
          <button
            className="submitMeetingBtn"
            onClick={() =>
              this.props.submitNewMeeting(this.createSubmitData())
            }
          >
            추가하기
            </button>
        </div>,
        document.querySelector("#modal_root")
      )
      : null;
  }
}

export default NewMeetingModal;