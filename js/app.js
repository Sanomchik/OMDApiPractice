'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Article = React.createClass({
  displayName: 'Article',

  getInitialState: function getInitialState() {
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
  changeUrl: function changeUrl(e) {
    var that = this;
    var text = document.getElementById('searchForm').value;
    this.ajaxRequest(text);
    that.setState({
      showMain: true,
      showSingle: false
    });
  },
  downloadSingleAjax: function downloadSingleAjax(e) {
    var that = this;
    var text = e.target.id + '&plot=full';
    this.ajaxRequest(text, 'i=', 'jsonDataSingle', false);
    that.setState({
      downloadSingleAjaxReady: true,
      showMain: false,
      showSingle: true
    });
  },
  returnMain: function returnMain() {
    var that = this;
    that.setState({
      showMain: true,
      showSingle: false
    });
  },
  downloadOther: function downloadOther() {
    var that = this;
    var text = document.getElementById('searchForm').value;
    var counter = that.state.counter;
    var counterKeyOther = that.state.counterKeyOther;
    var page = '&page=' + (counter + 1);
    var url = text + page;
    var movieListOther = that.state.movieListOther;
    var dataOther = that.state.jsonDataOther;
    this.ajaxRequest(url, 's=', 'jsonDataOther');
    for (var key in dataOther) {
      var imgUrl = dataOther[key].Poster;
      var imgStyle = {
        backgroundImage: 'url(' + imgUrl + ')',
        backgroundSize: 'cover',
        height: '350px'
      };
      movieListOther.push(React.createElement(
        'div',
        { key: counterKeyOther },
        React.createElement(
          'div',
          { className: 'col-md-3 col-sm-6', style: imgStyle },
          React.createElement(
            'div',
            { className: 'movieTitleBg' },
            React.createElement(
              'h2',
              { className: 'movieTitle', id: dataOther[key].imdbID, onClick: this.downloadSingleAjax },
              dataOther[key].Title
            )
          )
        )
      ));
      counterKeyOther++;
    }
    counter++;
    that.setState({
      counter: counter,
      counterKeyOther: counterKeyOther,
      movieListOther: movieListOther
    });
  },
  ajaxRequest: function ajaxRequest(text) {
    var par = arguments.length <= 1 || arguments[1] === undefined ? 's=' : arguments[1];
    var state = arguments.length <= 2 || arguments[2] === undefined ? 'jsonData' : arguments[2];
    var prop = arguments.length <= 3 || arguments[3] === undefined ? 'Search' : arguments[3];

    var url = 'http://www.omdbapi.com/?' + par + text;
    var that = this;
    var xhr = new XMLHttpRequest();
    var json = void 0;
    xhr.open('GET', url);
    xhr.onload = function () {
      if (xhr.status === 200) {
        json = JSON.parse(xhr.response);
        if (prop) {
          that.setState(_defineProperty({}, state, json[prop]));
          console.log('with prop', json);
        } else {
          that.setState(_defineProperty({}, state, json));
          console.log('no prop', json);
          console.log('state ', that.state[state]);
        }
      } else {
        alert(xhr.statusText);
      }
    };
    xhr.send();
  },
  render: function render() {
    var movieList = [];
    var movieListOther = this.state.movieListOther;
    var movieListSingle = [];
    var data = this.state.jsonData;
    var dataSingle = this.state.jsonDataSingle;
    var dataOther = this.state.jsonDataOther;
    for (var key in data) {
      var imgUrl = data[key].Poster;
      var imgStyle = {
        backgroundImage: 'url(' + imgUrl + ')',
        backgroundSize: 'cover',
        height: '350px'
      };
      movieList.push(React.createElement(
        'div',
        { key: key },
        React.createElement(
          'div',
          { className: 'col-md-3 col-sm-6', style: imgStyle },
          React.createElement(
            'div',
            { className: 'movieTitleBg' },
            React.createElement(
              'h2',
              { className: 'movieTitle', id: data[key].imdbID, onClick: this.downloadSingleAjax },
              data[key].Title
            )
          )
        )
      ));
    }
    if (this.state.downloadSingleAjaxReady == true) {

      var that = this;
      var _imgUrl = dataSingle.Poster;
      var _imgStyle = {
        backgroundImage: 'url(' + _imgUrl + ')',
        backgroundSize: 'cover',
        height: '520px'
      };
      movieListSingle.push(React.createElement(
        'div',
        { key: 0 },
        React.createElement('div', { className: 'col-md-4 col-md-offset-1 col-sm-6', style: _imgStyle }),
        React.createElement(
          'div',
          { className: 'col-md-4 col-md-offset-1 col-sm-6' },
          React.createElement(
            'h3',
            null,
            dataSingle.Title
          ),
          React.createElement(
            'span',
            null,
            React.createElement(
              'strong',
              null,
              'Country : '
            ),
            dataSingle.Country
          ),
          React.createElement('br', null),
          React.createElement(
            'span',
            null,
            React.createElement(
              'strong',
              null,
              'Year : '
            ),
            dataSingle.Year
          ),
          React.createElement('br', null),
          React.createElement(
            'span',
            null,
            React.createElement(
              'strong',
              null,
              'Type : '
            ),
            dataSingle.Type
          ),
          React.createElement('br', null),
          React.createElement(
            'span',
            null,
            React.createElement(
              'strong',
              null,
              'Genre : '
            ),
            dataSingle.Genre
          ),
          React.createElement('br', null),
          React.createElement(
            'span',
            null,
            React.createElement(
              'strong',
              null,
              'Language : '
            ),
            dataSingle.Language
          ),
          React.createElement('br', null),
          React.createElement(
            'span',
            null,
            React.createElement(
              'strong',
              null,
              'Actors : '
            ),
            dataSingle.Actors
          ),
          React.createElement('br', null),
          React.createElement(
            'span',
            null,
            React.createElement(
              'strong',
              null,
              'ImdbRating : '
            ),
            dataSingle.imdbRating
          ),
          React.createElement('br', null),
          React.createElement(
            'span',
            null,
            React.createElement(
              'strong',
              null,
              'Plot : '
            ),
            dataSingle.Plot
          ),
          React.createElement('br', null)
        )
      ));
    }
    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: 'col-md-offset-1 col-md-10 menu' },
        React.createElement(
          'div',
          { className: 'col-md-offset-2 col-md-8' },
          React.createElement(
            'div',
            { className: 'input-group input-group-searchForm' },
            React.createElement('input', { type: 'text', className: 'form-control', id: 'searchForm' }),
            React.createElement(
              'button',
              { type: 'button', className: 'btn btn-default', onClick: this.changeUrl, id: 'searchFormButton' },
              React.createElement('span', { className: 'glyphicon glyphicon-search', 'aria-hidden': 'true' })
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'movieList ' + (this.state.showMain == false || this.state.showSingle == true ? 'hidden' : '') },
          React.createElement('div', { className: 'mainWrap' }),
          movieList,
          movieListOther,
          React.createElement(
            'button',
            { type: 'button', className: 'btn downloadOther', onClick: this.downloadOther, id: 'downloadOther' },
            React.createElement('span', { className: 'glyphicon glyphicon-refresh', 'aria-hidden': 'true' })
          )
        ),
        React.createElement(
          'div',
          { className: 'movieList movieListSingle ' + (this.state.showMain == true || this.state.showSingle == false ? 'hidden' : '') },
          React.createElement(
            'button',
            { type: 'button', className: 'btn returnMain', onClick: this.returnMain, id: 'returnMain' },
            'Return to main page'
          ),
          movieListSingle
        )
      )
    );
  }
});

var App = React.createClass({
  displayName: 'App',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'app' },
      React.createElement(Article, null)
    );
  }
});
ReactDOM.render(React.createElement(App, null), document.getElementById('root'));