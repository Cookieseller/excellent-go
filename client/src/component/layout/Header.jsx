import React, { Component } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { subscribeToNameChange } from "../../api/Namechange";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { headline: "Excellent-Go" };
  }

  componentDidMount() {
    subscribeToNameChange((err, name) => {
      this.setState({ headline: name });
    });
  }

  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="headline" color="inherit">
            {this.state.headline}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}
