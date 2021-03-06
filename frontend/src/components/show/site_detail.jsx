import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import ShowMap from '../maps/show_map';
import SlideSet from './slideset';

class SiteDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      newPhoto: "",
      errors: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSiteFeatures(feature) {
    if (this.props.site.siteFeatures[feature] === true) {
      return "Yes";
    } else {
      return "No";
    }
  }

  update(property) {
    return e => this.setState({
      [property]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()

    this.state.newPhoto.includes(".com" || ".org" || ".gov") ? 
      this.props.addPhoto({ id: this.props.siteId, photo: { author: this.props.currentUserId, site: this.props.site.name, url: this.state.newPhoto } }) &&
      this.setState({errors: ""}) : 
      this.setState({
        errors: "Invalid URL"
      })
    this.setState({
      newPhoto: ""
    })
  }

  render() {
    const {
      author, name, date, description, _id, photoUrl, lat, lng
    } = this.props.site

    const imageUrls = photoUrl.map(photoObj => photoObj.url);

    if (!this.props.siteAuthor) return null
    return (
      <div className="show-outer-container">
        <div className="show-detail-wrapper">
          <div className="show-map-wrapper">
            <div className="show-map-info">
              <div>
                <ShowMap site={this.props.site}/>
              </div>
            </div>
            <div className="show-btn-container">
              <div>
                <a className="btn" target="_blank" href={`https://maps.google.com/?q=${lat},${lng}`}>Get Directions</a>
              </div>
              <div>
                {
                  this.props.currentUserId === author ?
                      <Link className="btn" to={`/campsites/edit/${_id}`}>Edit</Link>
                    :
                    null
                }
              </div>
            </div>
          </div>
          <div className="show-info-wrapper">
            <div className="show-title-bar">
              <div className="show-name">
                {name}
              </div>
            </div>
            
            <div className="show-mid-section">
              <div className="site-features">
                <div className="hiking">
                  <div className="show-feature-label">
                    <img src="trail_flag.png" />
                    <div>
                      Hiking Trail
                    </div>
                  </div>
                  <div className="show-feature-body">
                    {this.handleSiteFeatures("hiking")}
                  </div>
                </div>
                <div className="parking">
                  <div className="show-feature-label">
                    <img src="parking.png" alt=""/>
                    Nearby Parking
                  </div>
                  <div className="show-feature-body">
                    {this.handleSiteFeatures("parking")}
                  </div>
                </div>
                <div className="fishing">
                  <div className="show-feature-label">
                    <img src="fishing.png" />
                    Fishing Spot
                  </div>
                  <div className="show-feature-body">
                    {this.handleSiteFeatures("fishing")}
                  </div>
                </div>
                <div className="swimming">
                  <div className="show-feature-label">
                    <img src="swimming.png" alt=""/>
                    Swimming
                  </div>
                  <div className="show-feature-body">
                    {this.handleSiteFeatures("swimming")}
                  </div>
                </div>
                <div className="firePit">
                  <div className="show-feature-label">
                    <img src="fire_icon.png" />
                    Campfire
                  </div>
                  <div className="show-feature-body">
                    {this.handleSiteFeatures("firePit")}
                  </div>
                </div>
                <br></br>
                <div className="create-date">
                  <div className="show-feature-label">
                    {/* <h3>First Camper</h3> */}
                  </div>
                  <div className="show-feature-body">
                    <div id="show-username">
                      {this.props.siteAuthor.username} camped here {date}
                    </div>
                    {/* <div >
                      camped here {date}
                    </div> */}
                  </div>
                </div>
              </div>
            
            </div>

            <div className="show-description">
              <h3>Description</h3>
              <div>
                {description}
              </div>
            </div>
          </div>
            <div className="show-picture-wrapper">
              {/* Carousel here */}
              <SlideSet
                imgUrls={imageUrls}
              />
              {/* Add new photo here */}
              <form className="photo-input" onSubmit={this.handleSubmit}>
              <p>{this.state.errors}</p>
                <input
                  type="text"
                  placeholder="Add a photo of this site"
                  value={this.state.newPhoto}
                  onChange={this.update('newPhoto')}
                />
                <button className="btn" type="submit">Submit</button>
              </form>
            </div>
        </div>
      </div>
    )
  }
}

export default withRouter(SiteDetail);