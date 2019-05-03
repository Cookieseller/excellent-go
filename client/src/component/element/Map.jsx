import React, { Component } from "react";
import { Image } from "react-konva";

export default class Map extends Component {

    state = {
        image: null
    };

    componentDidMount() {
        this.loadImage();
    }

    componentDidUpdate(oldProps) {
        if (oldProps.mapImageSource !== this.props.mapImageSource) {
            this.loadImage();
        }
    }

    componentWillUnmount() {
        this.image.removeEventListener('load', this.handleLoad);
    }

    loadImage() {
        this.image = new window.Image();
        this.image.src = this.props.mapImageSource;
        this.image.addEventListener('load', this.handleLoad);
    }
    
    handleLoad = () => {
        this.setState({
            image: this.image
        });
        // if you keep same image object during source updates you will have to update layer manually:
        // this.imageNode.getLayer().batchDraw();
    };
    
    render() {
        return (
            <Image
                image={this.state.image}
                ref={node => {this.imageNode = node;}}>
            </Image>
        );
    }
}