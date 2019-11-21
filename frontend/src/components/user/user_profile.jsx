import React from 'react';
import { Redirect } from "react-router-dom";
import TabsContainer from './tabs_container';


class UserProfile extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      session: this.props.session
    }
  }

  componentDidMount() {
    this.props.fetchReviews()
    this.props.fetchSites()
  }



  render() {
    if (!this.state.session) return <Redirect to="/"/>
    if (!this.props.sites) return null

    
    let { userReviews, userCampsites, sites } = this.props;
    return(
      <div className="user-main">
        <div className="user-details">
          Hi {this.props.username}!
        </div>
        <div className="user-tabs">
          <TabsContainer 
            userCampsites={userCampsites}
            userReviews={userReviews}
            sites={sites}
          />
        </div>
      </div>
    );
  }
}

export default UserProfile;