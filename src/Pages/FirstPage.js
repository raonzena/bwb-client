import React, { Component } from "react";

class FirstPage extends Component {
  render() {
    const { onKeyDown, onChange } = this.props;
    return (
      <div className="js-bigDoor bigDoor">
        <div className="js-search search">
          <input
            type="text"
            placeholder="대문 - search site1"
            onKeyDown={onKeyDown}
            onChange={onChange}
          />
        </div>
      </div>
    );
  }
}

export default FirstPage;
