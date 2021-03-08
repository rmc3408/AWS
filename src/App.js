import React from "react";
import { Authenticator, AmplifyTheme } from "aws-amplify-react";
import "./App.css";
import { BrowserRouter, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import MarketPage from './pages/MarketPage';
import { Hub } from "@aws-amplify/core";
import Auth from "@aws-amplify/auth";
import NavBar from "./components/Navbar";

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
        console.log("user sign in failed");
        break;
      default:
        break;
    }
  };

  render() {
    const { user } = this.state;
    console.log(user);
    const sign = user ? (
      <BrowserRouter>
        <>
          <NavBar user={user}/>
          <div className="app-container">
            <Route exact path="/" component={HomePage} />
            <Route exact path="/profile" component={ProfilePage} />
            <Route exact path="/markets/:marketId" component={({ match }) => <MarketPage id={match.params.marketId}/> } />
            
          </div>

        </>
        
      
      
      </BrowserRouter>
    ) : (
      <Authenticator theme={myTheme}></Authenticator>
    );

    return <div>{sign}</div>;
  }
}

const myTheme = {
  ...AmplifyTheme,
  sectionHeader: {
    ...AmplifyTheme.sectionHeader,
    backgroundColor: "#324157"
  },
  formContainer: {
    ...AmplifyTheme.formContainer,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh'
  },
  button: {
    ...AmplifyTheme.button,
    backgroundColor: "#f90",
    marginRight: "15px",
    padding: "10px",
  },
};

export default App;
