 import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {

  static defaultProps = {
    country : 'in',
    pagesize : '9',
    category : 'general',
  }

  static propTypes = {
    country : PropTypes.string,
    pagesize :PropTypes.string,
    category : PropTypes.string
  }
 capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  constructor(props){
    super(props);
    this.state={
      articles : [],
      loading: true,
      page:1,
      totalResults : 0
    };

    document.title = `${this.capitalizeFirstLetter(this.props.category)} - SG News`;
  }

  // this is used to when we are fetching any data
  async componentDidMount(){

   let  url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4552029570d249639a6e8406470fbb9a&pageSize=${this.props.pagesize}`;
   this.setState({loading:true})
   let data = await fetch(url);
   let parsedData = await data.json()

   this.setState({
    articles : parsedData.articles,
    totalResults: parsedData.totalResults,
    loading:false})
  }

  handleNextClick = async () =>{

        let  url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4552029570d249639a6e8406470fbb9a&page=${this.state.page+1}&pageSize=${this.props.pagesize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData = await data.json()
        
        this.setState({
          page: this.state.page+1,
          articles: parsedData.articles,
          loading:false
        })
    
  }

  handlePrevClick = async () =>{
    
    let  url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4552029570d249639a6e8406470fbb9a&page=${this.state.page-1}&pageSize=${this.props.pagesize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json()
   
    this.setState({
      page: this.state.page-1,
      articles: parsedData.articles,
      loading:false
    })
  }

  fetchMoreData = async () => {
    

        let  url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4552029570d249639a6e8406470fbb9a&page=${this.state.page+1}&pageSize=${this.props.pagesize}`;
        
        
        let data = await fetch(url);
        let parsedData = await data.json()

        this.setState({
            page : this.state.page + 1,
            articles : this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
          })
  };
  
  // render is used to render the html code in class based components for render The DOM
  render() {


    return (

      <>
        
        <h2 className=' fixed text-center  ' style={{margin: '20px 0px', marginTop: "80px" , fontSize : '3rem'}}>Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h2>

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!== this.totalResults}
          

          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }

        />
            <div className='container'>

              <div className="row my-2" >
                
                {this.state.articles.map((element)=>{
                  return <div className='col-md-4 my-2' key={element.url}>
                  <NewsItem title ={element.title?element.title.slice(0,40):""} text={element.description?element.description.slice(0,70):""} imageUrl = {element.urlToImage} newsUrl={element.url} author={element.author}publishedAt={element.publishedAt}/>
                </div>
                })}

              </div>
            </div>
            

              {/* <div className = "contianer d-flex justify-content-between">
                  <button disabled={this.state.page<=1} type="button" className="btn btn-success" onClick={this.handlePrevClick}>&larr; Previous</button>
                  <button disabled={Math.ceil(this.state.totalResults/this.props.pagesize)===this.state.page}type="button" className="btn btn-success" onClick={this.handleNextClick}>Next &rarr;</button>
              </div> */}
      </>
    )
  }
}

export default News