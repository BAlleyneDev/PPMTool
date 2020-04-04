import React from "react";
import PropTypes from "prop-types";

export default class Droppable extends React.Component {
  componentDidUpdate(prevProps) {
    console.log("updated droppable");
  }

  drop = e => {
    e.preventDefault();
    const data = e.dataTransfer.getData("transfer");
    const card = document.getElementById(data);
    card.style.display = 'block';
    e.target.appendChild(card);
    console.log(document.getElementById(data).parentElement);
    document.getElementById(data).setAttribute("container", this.props.id);
  };

  allowedDrop = e => {
    e.preventDefault();
  };
  render() {
    return (
      <div
        id={this.props.id}
        onDrop={this.drop}
        onDragOver={this.allowedDrop}
        style={this.props.style}
      >
        {this.props.children}
      </div>
    );
  }
}

Droppable.propTypes = {
  id: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node
};
