import "./App.scss";
import React from "react";
import Header from "./components/Header";
import PostList from "./components/PostList";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <PostList />
      </div>
    );
  }
}

export default App;
