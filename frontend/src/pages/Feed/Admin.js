import React, { Component, Fragment } from "react";

import ErrorHandler from "../../components/ErrorHandler/ErrorHandler";
import "./Feed.css";

class Feed extends Component {
  state = {
    isEditing: false,
    posts: [],
    totalPosts: 0,
    editPost: null,
    name: [],
    email: [],
    postPage: 1,
    postsLoading: true,
    editLoading: false,
  };

  componentDidMount() {
    fetch("https://api-dot-master-sector-289216.et.r.appspot.com/auth/userlist", {
      headers: {
        Authorization: "Bearer " + this.props.token,
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch user status.");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        this.setState({
          name: resData.name,
          email: resData.email,
        });
      })
      .catch(this.catchError);
  }

  errorHandler = () => {
    this.setState({ error: null });
  };

  catchError = (error) => {
    this.setState({ error: error });
  };

  render() {
    return (
      <div style={{textAlign: "center"}}>
        <ErrorHandler error={this.state.error} onHandle={this.errorHandler} />

        <section className="feed__status">
          <h2 style={{ textAlign: "center" }}>Welcome, to the admin page.</h2>
          <h3>There are current {this.state.name.length} user.</h3>
          <h4>Here is the name of all user</h4>
          <p style={{fontWeight: 'bold'}}>Name:</p>
          <ul style={{listStyle: "none", padding: 0}}>
            {this.state.name.map((user) => {
              return <li key={Math.random() * 100}>{user}</li>;
            })}
          </ul>
          
        </section>
      </div>
    );
  }
}

export default Feed;
