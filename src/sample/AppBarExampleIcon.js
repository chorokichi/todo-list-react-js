//@flow
import * as React from 'react';
import { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class AppBarExampleIcon extends Component<{}> {
  render() {
    return (
      // Material-UIのコンポーネントを使うためにはMuiThemeProviderで囲む必要あり？
      <MuiThemeProvider>
        <AppBar
          title="Title"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
      </MuiThemeProvider>
    );
  }
}

export default AppBarExampleIcon;