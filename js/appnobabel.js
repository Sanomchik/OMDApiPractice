let Article = React.createClass({
  getInitialState: function() {
    return { 
      jsonData: {},
      jsonDataOther: {},
      jsonDataSingle: {},
      movieListOther: [],
      movieListSingle: [],
      movieListOtherCounter: 0,
      counter: 1,
      counterKeyOther: 1,
      downloadSingleAjaxReady: false,
      showMain: false,
      showSingle: false
    };
  },
  changeUrl: function(e) {
    let that = this;
    let text = document.getElementById('searchForm').value;
    this.ajaxRequest(text);
    that.setState({
      showMain: true,
      showSingle: false
    })
  },
  downloadSingleAjax: function(e) {
    let that = this;
    let text = e.target.id+'&plot=full';
    this.ajaxRequest(text, 'i=', 'jsonDataSingle', false);
    that.setState({
      downloadSingleAjaxReady: true,
      showMain: false,
      showSingle: true
    })
  },
  returnMain: function() {
   let that = this;
   that.setState({
    showMain: true,
    showSingle: false
  })
 },
 downloadOther: function() {
  let that = this;
  let text = document.getElementById('searchForm').value;
  let counter = that.state.counter
  let counterKeyOther = that.state.counterKeyOther
  let page = '&page=' + (counter + 1);
  let url = text + page;
  let movieListOther = that.state.movieListOther;
  let dataOther = that.state.jsonDataOther;
  this.ajaxRequest(url, 's=', 'jsonDataOther');
  for(let key in dataOther) {
    let imgUrl = dataOther[key].Poster;
    let imgStyle = {
      backgroundImage: 'url(' + imgUrl + ')',
      backgroundSize: 'cover',
      height: '350px'
    }
    movieListOther.push(
      <div key={counterKeyOther}>
      <div className="col-md-3 col-sm-6" style={imgStyle} >
      <div className="movieTitleBg">
      <h2 className="movieTitle" id={dataOther[key].imdbID} onClick={this.downloadSingleAjax} >{dataOther[key].Title}</h2>
      </div>
      </div>
      </div>
      )
    counterKeyOther++
  }
  counter++
  that.setState({
    counter: counter,
    counterKeyOther: counterKeyOther,
    movieListOther: movieListOther
  })

},
ajaxRequest: function(text,par = 's=', state ='jsonData', prop = 'Search') {
  let url = 'http://www.omdbapi.com/?' + par + text;
  let that = this;
  let xhr = new XMLHttpRequest();
  let json;
  xhr.open('GET', url);
  xhr.onload = function() {
    if (xhr.status === 200) {
      json = JSON.parse(xhr.response);
      if (prop) {
        that.setState({
          [state]: json[prop]
        })
        console.log('with prop', json)
      }
      else {
        that.setState({
          [state]: json
        })
        console.log('no prop', json)
        console.log('state ', that.state[state])
      }
    } else {
      alert(xhr.statusText);
    }
  };
  xhr.send();
},
render: function () {
  let movieList = [];
  let movieListOther = this.state.movieListOther;
  let movieListSingle = [];
  let data = this.state.jsonData;
  let dataSingle = this.state.jsonDataSingle;
  let dataOther = this.state.jsonDataOther;
  for(var key in data) {
    let imgUrl = data[key].Poster;
    let imgStyle = {
      backgroundImage: 'url(' + imgUrl + ')',
      backgroundSize: 'cover',
      height: '350px'
    }
    movieList.push(
      <div key={key}>
      <div className="col-md-3 col-sm-6" style={imgStyle} >
      <div className="movieTitleBg">
      <h2 className="movieTitle" id={data[key].imdbID} onClick={this.downloadSingleAjax} >{data[key].Title}</h2>
      </div>
      </div>
      </div>
      )
  }
  if (this.state.downloadSingleAjaxReady == true) {

    let that = this;
    let imgUrl = dataSingle.Poster;
    let imgStyle = {
      backgroundImage: 'url(' + imgUrl + ')',
      backgroundSize: 'cover',
      height: '520px'
    }
    movieListSingle.push(
      <div key={0}>
      <div className="col-md-4 col-md-offset-1 col-sm-6" style={imgStyle} >
      </div>
      <div className="col-md-4 col-md-offset-1 col-sm-6">
      <h3>{dataSingle.Title}</h3>
      <span><strong>Country : </strong>{dataSingle.Country}</span><br/>
      <span><strong>Year : </strong>{dataSingle.Year}</span><br/>
      <span><strong>Type : </strong>{dataSingle.Type}</span><br/>
      <span><strong>Genre : </strong>{dataSingle.Genre}</span><br/>
      <span><strong>Language : </strong>{dataSingle.Language}</span><br/>
      <span><strong>Actors : </strong>{dataSingle.Actors}</span><br/>
      <span><strong>ImdbRating : </strong>{dataSingle.imdbRating}</span><br/>
      <span><strong>Plot : </strong>{dataSingle.Plot}</span><br/>
      </div>
      </div>
      )

  }
  return (
    <div>
    <div className="col-md-offset-1 col-md-10 menu">
    <div className="col-md-offset-2 col-md-8">
    <div className="input-group input-group-searchForm">
    <input type="text" className="form-control"  id="searchForm"/>
    <button type="button" className="btn btn-default" onClick={this.changeUrl} id="searchFormButton">
    <span className="glyphicon glyphicon-search" aria-hidden="true">
    </span>
    </button>
    </div>
    </div>
    <div className={'movieList ' + (this.state.showMain == false || this.state.showSingle == true ? 'hidden' : '')}>
    <div className="mainWrap">
    </div>
    {movieList}
    {movieListOther}
    <button type="button" className="btn downloadOther" onClick={this.downloadOther} id="downloadOther">
    <span className="glyphicon glyphicon-refresh" aria-hidden="true">
    </span>
    </button>
    </div>
    <div className={'movieList movieListSingle ' + (this.state.showMain == true || this.state.showSingle == false ? 'hidden' : '')}>
    <button type="button" className="btn returnMain" onClick={this.returnMain} id="returnMain">
    Return to main page
    </button>
    {movieListSingle}
    </div>
    </div>
    </div>
    );
}
});

let App = React.createClass({
  render: function () {
    return (
      <div className = 'app'>
      <Article />
      </div>
      );
  }
});
ReactDOM.render(
  <App />,
  document.getElementById('root')
  )
;