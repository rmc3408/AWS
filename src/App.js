import React from "react";
import { Authenticator, AmplifyTheme } from "aws-amplify-react";
import "./App.css";
import { Hub } from "@aws-amplify/core";
import Auth from "@aws-amplify/auth";

class App extends React.Component {
  state = {
    user: null,
  };

  componentDidMount() {
    this.getUser();
    Hub.listen("auth", this, "onHubCapsule");
  }

  async getUser() {
    const theUser = await Auth.currentAuthenticatedUser();
    if (theUser) {
      this.setState({
        user: theUser,
      });
    }
  }

  onHubCapsule = (capsule) => {
    switch (capsule.payload.event) {
      case "signIn":
        console.log("signed IN");
        this.getUser();
        break;
      case "signUp":
        console.log("signed UP");
        break;
      case "signOut":
        console.log("signed out");
        this.setState({ user: null });
        break;
      case "signIn_failure":
        console.error("user sign in failed");
        break;
      default:
        break;
    }
  };

  render() {
    const { username } = this.state;
    const sign = username ? (
      <div>Welcome User </div>
    ) : (
      <Authenticator theme={myTheme}></Authenticator>
    );

    return <div>{sign}</div>;
  }
}

const myTheme = {
  ...AmplifyTheme,
  formContainer: {
    ...AmplifyTheme.formContainer,
    paddingTop: "40px",
  },
  button: {
    ...AmplifyTheme.button,
    color: "blue",
    padding: "10px",
  },
};
export default App;
