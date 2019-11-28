import React, { Component } from "react"
import Button from "react-bootstrap/Button"
import uuidv4 from "uuid/v4";
import plus from "../plus.png"

class CreateButton extends Component {

	render() {
		return (
            <Button
                id="create"
                style={style}
                onClick={this.props.pendingAnnotation? 
                    null
                    :
                    (e) => {
                        this.props.createAnnotation({
                            type: "text",
                            id: uuidv4(),
                            workspace: this.props.workspace,
                            name: this.props.name,
                            content: "",
                            color: this.props.color,
                            range:this.props.pendingRange
                        })
                    }}
            >
            
            </Button>
		)
	}
}

var style = {
    borderRadius:"50%",
    background:"url(" + plus + ")",
    backgroundSize: "50px 54px",
    border:"none"
}

export default CreateButton


