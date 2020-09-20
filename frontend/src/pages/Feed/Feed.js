import React, { Component, Fragment } from "react";
// import openSocket from 'socket.io-client';

// import Post from '../../components/Feed/Post/Post';
// import Button from '../../components/Button/Button';
// import FeedEdit from '../../components/Feed/FeedEdit/FeedEdit';
// import Input from '../../components/Form/Input/Input';
// import Paginator from '../../components/Paginator/Paginator';
// import Loader from '../../components/Loader/Loader';
import ErrorHandler from "../../components/ErrorHandler/ErrorHandler";
import "./Feed.css";

class Feed extends Component {
  state = {
    isEditing: false,
    posts: [],
    totalPosts: 0,
    editPost: null,
    name: "",
    email: "",
    add: "",
    notes: "",
    postPage: 1,
    postsLoading: true,
    editLoading: false,
  };

  componentDidMount() {
    fetch("http://localhost:8080/auth/info", {
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
          add: resData.add,
          notes: resData.notes,
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
      <Fragment>
        <ErrorHandler error={this.state.error} onHandle={this.errorHandler} />

        <section className="feed__status">
          <h2>
            Welcome, {this.state.name.toUpperCase()}. Here is some of your basic
            information.
          </h2>
          <p>Name: {this.state.name}</p>
          <p>Email: {this.state.email}</p>
          <p>Your address: {this.state.add}</p>
          <p>Notes: {this.state.notes}</p>
        </section>
      </Fragment>
    );
  }
}

export default Feed;
