import React, {useState} from "react";
import { fetchNewApp } from "../store/User";
import { connect } from "react-redux";

class NewJobsApp extends React.Component {
  constructor() {
    super()
    this.state = {
      companyName: '',
      companyUrl: '',
      positionTitle: '',
      response: false,
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
    })
  }

  render() {

    const {companyName, companyUrl, positionTitle} = this.state;
    const {handleChange, handleSubmit} = this;
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="companyName">Company Name:</label>
        <input
        name="companyName"
        onChange={handleChange}
        value={companyName || ''}
        />

        <label htmlFor="companyUrl">Application Link:</label>
        <input
        type="url"
        name="companyUrl"
        onChange={handleChange}
        value={companyUrl || ''}/>

        <label htmlFor="positionTitle">Position Title:</label>
        <input
        type="text"
        name="positionTitle"
        onChange={handleChange}
        value={positionTitle || ''}/>

        <div>
          <button>Submit</button>
        </div>
      </form>
    )
  }
}


const mapDispatch = (dispatch) => {
  return {
    create: (application) => dispatch(fetchNewApp(application))
  }
}


export default connect(null, mapDispatch)(NewJobsApp);
