import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import addTaskPic from "../../undraw_online_articles_79ff.svg";

class Landing extends Component {
  componentDidMount() {
    if (this.props.security.validToken) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div className="jumbotron-style landing">
        <div className="light-overlay landing-inner text-dark">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <div className="jumbotron light-overlay">
                  <h1 className="display-4">
                    BAlleyneDev Project Management Tool!{" "}
                    <img
                      src={addTaskPic}
                      width="100vh"
                      height="100vh"
                      alt="people building a mobile app"
                    />
                  </h1>
                  <p className="lead">
                    This is a tool built to help effectively keep your projects
                    on track!
                  </p>
                  <hr className="my-4" />
                  <p>
                    Create your account to start managing your projects the
                    Agile way.
                  </p>
                  <Link to="/register" className="btn btn-lg btn-primary mr-2">
                    Sign Up
                  </Link>
                  <Link to="/login" className="btn btn-lg btn-success mr-2">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.security
});

export default connect(
  mapStateToProps,
  {}
)(Landing);
