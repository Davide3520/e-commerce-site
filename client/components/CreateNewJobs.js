import React, {useState} from "react";
import { fetchNewApp } from "../store/User";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class NewJobsApp extends React.Component {
  constructor() {
    super()
    this.state = {
      companyName: '',
      companyUrl: '',
      positionTitle: '',
      response: false,
      location: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.create({ ...this.state });
    this.setState({
      companyName: "",
      companyUrl: "",
      positionTitle: "",
      location:''
    })
  }

  render() {

    const {companyName, companyUrl, positionTitle, location} = this.state;
    const {handleChange, handleSubmit} = this;
    return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="companyName">Company Name:</label>
        <input
        className="input-form"
        name="companyName"
        onChange={handleChange}
        value={companyName || ''}
        />

        <label htmlFor="companyUrl">Application Link:</label>
        <input
        className="input-form"
        type="url"
        name="companyUrl"
        onChange={handleChange}
        value={companyUrl || ''}
        maxLength="30"
        />

        <label htmlFor="positionTitle">Position Title:</label>
        <input
        className="input-form"
        type="text"
        name="positionTitle"
        onChange={handleChange}
        value={positionTitle || ''}/>

        <label htmlFor="location">Location:</label>
        <input
        className="input-form"
        type="text"
        name="location"
        onChange={handleChange}
        value={location || ''}
        />

        <div>
          <button className="form-button">Submit</button>
          <Link to='/'><button className="form-button">All My Applications</button></Link>
        </div>
      </form>
    </div>
    )
  }
}


const mapDispatch = (dispatch) => {
  return {
    create: (application) => dispatch(fetchNewApp(application))
  }
}


export default connect(null, mapDispatch)(NewJobsApp);
