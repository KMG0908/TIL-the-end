import React, { Component } from "react";
import { TwitterPicker } from "react-color";
import { PhotoshopPicker } from 'react-color';
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
import { CompactPicker } from 'react-color'
import Button from '@material-ui/core/Button';
import "./color.css"

export default class ColorPicker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      color: {
        "hex" : this.props.value
      },
      displayColorPicker: false,
    }
  }
  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
    document.body.scrollTop = document.body.scrollHeight;
  };
  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };
  render() {
    const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '36px',
          borderRadius: '2px',
          background: `${this.props.value}`,
          backgroundClip: 'content-box',
          padding: '1px',
          border: '1px solid gray'
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          display: 'inline-block',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
          marginLeft: '226px'
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <>
        <div style={{ display: 'flex', width: `100%` }} className="container">
          <div style={ styles.swatch } >
            <div style={ styles.color } />
            <label>색</label>
          </div>
          <CompactPicker onChange={ this.props.handleChangeColor }></CompactPicker>
          <div>
            <SketchPicker color={ this.props.value } onChange={ this.props.handleChangeColor } disableAlpha={true} presetColors={[]} />
          </div>
          {/* { this.state.displayColorPicker ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ this.handleClose }/>
            <SketchPicker color={ this.props.value } onChange={ this.props.handleChangeColor } disableAlpha={true}
            presetColors = {['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF']} />
          </div> : null } */}
        </div>
      </>
    )
  }
}