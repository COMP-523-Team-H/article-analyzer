import React, { Component } from "react"
import Container from "react-bootstrap/Container"

class ColorSelection extends Component {
    
	render() {
        var colors = ["red", "green", "gray", "yellow", "blue"];
        var selectionPanel = colors.map(color=>{
            //fix the dynamic styling later
            return <div 
                style={{
                        width:"20px",
                        height:"20px",
                        float:"left",
                        backgroundColor:color,
                        margin:"3px",
                        cursor:"pointer"
                }}
                onClick={()=>{this.props.onClick(color)}}
                key={color}
            >

            </div>
        })
		return (
			<Container style={{height:"20px",margin:"10px"}}>
				{selectionPanel}
			</Container>
		)
	}
}



export default ColorSelection