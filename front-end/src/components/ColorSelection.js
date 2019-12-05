import React, { Component } from "react"
import Container from "react-bootstrap/Container"
import color from "../util/color"
import constant from "../util/constant"

class ColorSelection extends Component {
    
	render() {
        console.log(this.props);
        var colors = ["red", "green", "gray", "yellow", "blue"];
        var selectionPanel = colors.map(c=>{
            //fix the dynamic styling later
            return <div 
                style={{
                        width:"45px",
                        height:"25px",
                        backgroundColor:color.rgba(constant.COLOR[c], 0.8),
                        margin:"3px",
                        cursor:"pointer"
                }}
                id={c}
                onClick={()=>{this.props.onClick(c)}}
                key={c}
                className="color"
            >
            </div>
        })
		return (
			<Container id="colorPanel" style={{height:"20px",margin:"10px"}}>
				{selectionPanel}
			</Container>
		)
	}
}



export default ColorSelection