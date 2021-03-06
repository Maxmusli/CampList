import React from 'react';

class ReviewFormEdit extends React.Component {

  constructor(props) {
    super(props)

    this.state = this.props.review
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value })
  }

  dispatchOpenModal() {
    this.props.openModal('login')
  }

  handleSubmit(e) {
    e.preventDefault()
    if (this.props.formType !== 'Update Review' && !this.props.authorId) {
      return this.dispatchOpenModal()
    }

    
    let review = {
      site: this.state.site,
      body: this.state.body,
      rating: this.state.rating,
      author: this.props.authorId
    }


    this.props.submitReview(review)

    this.setState({
      body: '',
      rating: '5'
    })
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit} className="review-form">
        <p className="review-label">{this.props.formType}</p>
        <div className="rating-container">
          <label className="rating-label">Rating (1-5)
            <input 
              className="rating-input"
              type="number"
              min="0"
              max="5"
              value={this.state.rating}
              onChange={this.update("rating")}
              id="rating"
            />
          </label>
        </div>
        <div className="body-container">      
          <textarea
            className="body-input"
            placeholder="Tell us about your stay"
            required
            cols="31"
            value={this.state.body}
            onChange={this.update("body")}
          />           
        </div>
        <div className="submit-btn">
            <button type="submit" className="btn">Submit Review</button>
          </div>
      </form>
    )
  }
}
export default ReviewFormEdit;