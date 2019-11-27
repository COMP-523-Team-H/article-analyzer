import React, { Component } from "react"
import Button from "react-bootstrap/Button"
import uuidv4 from "uuid/v4";

class CreateButton extends Component {

	render() {
		return (
			<Button
                variant="secondary"
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
                Create Annotation
            </Button>
		)
	}
}

export default CreateButton


