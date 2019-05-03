import React, { Component, Fragment } from "react";
import { Stage, Layer } from "react-konva";
import { Header } from "./layout";
import { Map } from "./element";
import { Grid, List, ListItem, ListItemText } from "@material-ui/core";

export default class extends Component {
    generate(element) {
      return [0, 1, 2].map(value =>
        React.cloneElement(element, {
          key: value,
        }),
      );
    }
    


    updateStageScale() {
        const CANVAS_VIRTUAL_WIDTH = 1024;
        const CANVAS_VIRTUAL_HEIGHT = 1024;

        const toolbarHeight = 72;
        const scale = Math.min(
            window.innerWidth / CANVAS_VIRTUAL_WIDTH,
            (window.innerHeight - toolbarHeight) / CANVAS_VIRTUAL_HEIGHT
        );

        this.setState({stageScale: scale});
    }
    
    componentWillMount() {
        this.updateStageScale();
    }        

    componentWillUnmount() {
        window.removeEventListener("resize", () => {
            this.updateStageScale();
        });
    }

    componentDidMount() {
        window.addEventListener("resize", () => {
            this.updateStageScale()
        });
    }

    render() {
        
        return (
            <Fragment>
                <Header />
                <Grid container spacing={12}>
                    <Grid item sm={9}>
                        <Stage width={window.innerWidth} height={window.innerHeight} scaleX={this.state.stageScale} scaleY={this.state.stageScale}>
                            <Layer>
                                <Map mapImageSource="de_dust2.png" />
                            </Layer>
                        </Stage>
                    </Grid>
                    <Grid item sm={3}>
                        <div>
                            <List dense="false">
                            {this.generate(
                              <ListItem>
                                <ListItemText
                                  primary="Single-line item"
                                />
                              </ListItem>,
                            )}
                          </List>
                        </div>
                    </Grid>
                </Grid>
            </Fragment>
        );
    }
}
