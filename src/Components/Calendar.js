import React from "react";

class Calendar extends React.Component {
  monthCreator = () => {
    let month = new Date().getMonth() + 1;
    let monthOptionArr = [];
    for (let i = month; i <= 12; i++) {
      monthOptionArr.push(
        <option value={i} key={i}>
          {i}
        </option>
      );
    }
    return monthOptionArr;
  };

  dateCreator = month => {
    let dateByMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let startDate = 1;
    let dateOptionArr = [];
    let now = new Date();
    if (Number(month) === now.getMonth() + 1) {
      let nowTime = Number(now.toLocaleTimeString("en-US", { hour12: false }).slice(0, 2)) + 1
      if (nowTime >= 22) {
        startDate = now.getDate() + 1
      } else {
        startDate = now.getDate();
      }
    }
    for (let i = startDate; i <= dateByMonth[month - 1]; i++) {
      dateOptionArr.push(
        <option value={i} key={i}>
          {i}
        </option>
      );
    }
    return dateOptionArr;
  };

  hourCreator = (month, date) => {
    let hourOptionArr = [];
    let now = new Date();
    let nowTime =
      Number(now.toLocaleTimeString("en-US", { hour12: false }).slice(0, 2)) + 1;
    if (
      !(month === new Date().getMonth() + 1) ||
      !(date === new Date().getDate()) || nowTime >= 22
    ) {
      nowTime = 11;
    }
    //hour dropdown
    for (let i = nowTime; i <= 21; i++) {
      hourOptionArr.push(
        <option value={i} key={i}>
          {i}
        </option>
      );
    }
    return hourOptionArr;
  };

  componentDidMount = () => {
    this.props.onDateChage(document.querySelector("#dateSelector").value)
    this.props.onHourChange(document.querySelector("#hourSelector").value)
  }

  render() {
    return (
      <React.Fragment>
        <select
          id="monthSelector"
          onChange={select => this.props.onMonthChange(select.target.value)}
        >
          {this.monthCreator()}
        </select>
        <span>월</span>
        <select
          id="dateSelector"
          onChange={select => this.props.onDateChage(select.target.value)}
        >
          {this.dateCreator(this.props.month)}
        </select>
        <span>일</span>
        <select
          id="hourSelector"
          onChange={select => this.props.onHourChange(select.target.value)}
        >
          {this.hourCreator(this.props.month, this.props.date)}
        </select>
        <span>:</span>
        <select
          id="minuteSelector"
          onChange={select => this.props.onMinuteChange(select.target.value)}
        >
          <option key="00">00</option>
          <option key="30">30</option>
        </select>
      </React.Fragment>
    );
  }
}

export default Calendar;
