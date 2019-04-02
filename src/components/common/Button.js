import React, { Component } from "react";

class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "hover": false
        };

        this.toggleHover = this.toggleHover.bind(this);
    }

    toggleHover(){
        this.setState({ "hover" : !this.state.hover});
    }

    render(){
        const submitButtonStyle = {
            "width": "100%",
            "fontFamily": "Open Sans",
            "height": "36px",
            "lineHeight": "36px",
            "display": "inline-block",
            "borderRadius": "2px",
            "background-color": "#D9A920",
            "color": "#FFF",
            "border": "10px",
            "textTransform": "uppercase",
            "boxSizing": "border-box",
            "cursor": "pointer",
            "textDecoration": "none",
            "margin": "0px",
            "padding": "0px",
            "outline": "none",
            "fontSize": "14px",
            "position": "relative",
            "textAlign": "center",
            "fontWeight": "500",
            "opacity": "1",
            "letterSpacing": "0px",
        };

        const submitButtonHoverStyle = {
            "width": "100%",
            "fontFamily": "Open Sans",
            "height": "36px",
            "lineHeight": "36px",
            "display": "inline-block",
            "borderRadius": "2px",
            "background-color": "#D9A920",
            "color": "#FFF",
            "border": "10px",
            "textTransform": "uppercase",
            "boxSizing": "border-box",
            "cursor": "pointer",
            "textDecoration": "none",
            "margin": "0px",
            "padding": "0px",
            "outline": "none",
            "fontSize": "14px",
            "position": "relative",
            "textAlign": "center",
            "fontWeight": "500",
            "opacity": "0.4",
            "letterSpacing": "0px",
        };

        return (
            <button
                type="submit"
                style={(this.state.hover)? submitButtonHoverStyle : submitButtonStyle}
                onMouseEnter={() => this.toggleHover()}
                onMouseLeave={() => this.toggleHover()}>
                    {this.props.title}
            </button>
        );
    }

}

export default Button;
