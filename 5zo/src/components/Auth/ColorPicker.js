import React, { Component } from "react";
import { TwitterPicker } from "react-color";

export default class ColorPicker extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <>
                <div style={{ display: 'inline-block', width: `100%` }} >
                <div style={{ display: 'inline-block', float:'left' ,height : '100px', minHeight : '100px'}}>
                  <div id='myColor' style={{ background: this.props.value, width: '50px',height : '100%', minWidth: '100px', minHeight: '100px' }} />
                </div>
                <div style={{ display: 'inline-block' ,float:'right'}}>
                  <TwitterPicker
                    style={{ marginRight: 0, border: null, display: 'inline-block' , }}

                    onChange={this.props.handleChangeColor}
                    triangle="hide"
                  />
                </div>
              </div>
            </>
        )
    }
}