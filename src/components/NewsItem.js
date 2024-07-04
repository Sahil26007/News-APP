import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {

    let {title,text,imageUrl,newsUrl,author,publishedAt} = this.props;
    return (
      <div>
              <div className="card" >
              <img src={imageUrl?imageUrl:"no_image.png"} className="card-img-top" alt="..."/>
              <div className="card-body">
              <h5 className="card-title">{title}...</h5>
              <p className="card-text">{text}...</p>
              <p className="card-text"><small className='text-muted'>By {author?author:"Unknown"} on  {new Date(publishedAt).toGMTString()}</small></p>
              <a  rel="noopener noreferrer" href={newsUrl} target="_blank"  className="btn btn-dark">Read More</a>
 
              </div>
              </div>
      </div>

    )
  }
}

export default NewsItem