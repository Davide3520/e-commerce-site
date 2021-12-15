import React, {useEffect, useMemo} from "react";
import { fetchUserApp } from "../store/User";
import { connect } from "react-redux";

const AllJobs = (props) => {
  useEffect(() => {
    const id = props.user.id;
    props.fetchApps(id)
  },[])

  const { apps } = props;
  return (
      <div  className="container">
          {apps.length ? (
            apps.map((app, i) => (
              <div key={i} className="info">
                <section className="info-line">
                  <p>Company Name</p>
                  <p className="infoP">{app.companyName}</p>
                </section>
                <section className="info-line">
                  <p>Date</p>
                  <p className="infoP"> placeholder</p>
                </section>
                <section className="info-line">
                  <p>Application Link</p>
                  <a className="url" href={app.companyUrl}>Click Here</a>
                </section>
                <section className="info-line">
                  <p>Position Title</p>
                  <p className="infoP">{app.positionTitle}</p>
                </section>
                <section className="info-line">
                  <p>Location</p>
                  <p className="infoP">{app.location}</p>
                </section>
                <section className="info-line">
                  <p>Response</p>
                  <p className="infoP">{app.response === true ? 'Yes' : 'No'}</p>
                </section>
               </div>
            ))
          ) : ''}
      </div>
  )
}

const mapState = (state) => {
  return {
    apps: state.appReducer,
    user: state.auth
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchApps: (id) => dispatch(fetchUserApp(id))
  }
}

export default connect(mapState, mapDispatch)(AllJobs);


