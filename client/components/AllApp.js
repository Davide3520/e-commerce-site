import React, {useEffect, useMemo} from "react";
import { fetchUserApp } from "../store/User";
import { connect } from "react-redux";
import { useTable } from 'react-table'

const AllJobs = (props) => {
  useEffect(() => {
    const id = props.user.id;
    props.fetchApps(id)
  },[])

  const { apps } = props;
  console.log(apps)
  return (
      <div  className="container">
          {apps.length ? (
            apps.map(app =>
              <div key={app.id} className="info">
                <h4>Company Name</h4>
               <p className="infoP">{app.companyName}</p>
                <h4>Date</h4>
                <p className="infoP">{app.createdAt.slice(0, 10)}</p>
                <h4>Application Link</h4>
                <a className="url" href={app.companyUrl}>{app.companyUrl}</a>
                <h4>Position title</h4>
                <p className="infoP">{app.positionTitle}</p>
                <h4>Response</h4>
                <p className="infoP">{app.response === true ? 'Yes' : 'No'}</p>
              </div>
            )
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


