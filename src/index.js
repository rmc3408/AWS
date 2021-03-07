import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "element-theme-default";
import Amplify from 'aws-amplify';
import awsE from './aws-exports';

Amplify.configure(awsE);

ReactDOM.render(<App />, document.getElementById("root"));
serviceWorker.unregister();
