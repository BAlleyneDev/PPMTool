import React from "react";
import Draggable from "../Draggable";
import Droppable from "../Droppable";

const droppableStyle = {
  backgroundColor: "#555",
  width: "200px",
  height: "400px",
  margin: "32px"
};

export default class DndTest extends React.Component {
  onChange(e) {
    var length = document.getElementById("dr1").children.length;
    console.log(length);
  }

  render() {
    return (
      <div
        style={{
          width: "100%",
          padding: "32px",
          display: "flex",
          "justify-content": "center"
        }}
      >
        <Droppable
          id="dr1"
          value="dr1"
          style={droppableStyle}
          onChange={this.onChange}
        >
          <Draggable id="item1" style={{ margin: "8px" }}>
            <div
              style={{
                padding: "8px",
                color: "#555",
                "background-color": "white",
                "border-radius": "3px"
              }}
            >
              Some text 1
            </div>
          </Draggable>
          <Draggable
            id="item2"
            style={{ margin: "8px" }}
            onChange={this.onChange}
          >
            <div
              style={{
                padding: "8px",
                color: "#555",
                "background-color": "white",
                "border-radius": "3px"
              }}
            >
              Some text 2
            </div>
          </Draggable>
        </Droppable>

        <Droppable id="dr2" value="dr2" style={droppableStyle}></Droppable>
      </div>
    );
  }
}
