import React, { Component } from "react";
import { TwitterPicker } from "react-color";
import { PhotoshopPicker } from 'react-color';

export default class ColorPicker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      color: {
        "hex" : this.props.value
      }
    }

    this.showColor = this.showColor.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  showColor(e) {
    const photoshop = document.getElementById("photoshop");
    const selectColor = document.getElementById("selectColor");
    const x = e.clientX;
    const y = e.clientY;
    photoshop.style.display = "inline-block";
    photoshop.style.left = x - selectColor.getBoundingClientRect().left + "px";
    photoshop.style.bottom = -(y - selectColor.getBoundingClientRect().top) + 100 + "px";

    this.setState({
      color: {
        "hex" : this.props.value
      }
    })
  }
  handleReset(){
    this.props.handleChangeColor(this.state.color);
    this.handleClose();
  }
  handleClose(){
    document.getElementById("photoshop").style.display = "none";
  }
  render() {
    return (
      <>
        <div style={{ display: 'inline-block', width: `100%` }} >
          <div id="selectColor" style={{ display: 'inline-block', float: 'left', width: '100px', height: '100px' }}>
            <div id='myColor' style={{ background: this.props.value, width: '100%', height: '100%', cursor: 'pointer' }} onClick={this.showColor} />
          </div>
          <div style={{ display: 'inline-block', float: 'right' }}>
            <TwitterPicker
              style={{ marginRight: 0, border: null, display: 'inline-block' }}
              onChange={this.props.handleChangeColor}
              triangle="hide"
              color={this.props.value}
            />
          </div>
          <div id="photoshop" style={{ display: "none", position: "relative" }}>
            <PhotoshopPicker 
              onChange={this.props.handleChangeColor}
              color={this.props.value} 
              onAccept={this.handleClose} 
              onCancel={this.handleReset}
              header="Color"
            />
          </div>
        </div>
      </>
    )
  }
}