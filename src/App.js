import React, { Component } from 'react';
import './App.css';
import algo from './algo/algorithm';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: '',
      likelyWords: [],
      allSubmittedWords:[]
    }
  }

  handleChange(e) {
    var probableWords = algo.probableWords(e.target.value);

    if (probableWords.length > 5) {
      this.setState({
        word: e.target.value,
        likelyWords: probableWords.slice(0, 5)
      })
    } else {
      this.setState({
        word: e.target.value,
        likelyWords: probableWords
      })
    }
  }

  handleSubmit() {
    this.setState({
      word: '',
      allSubmittedWords: this.state.allSubmittedWords.concat(this.state.word),
      likelyWords: []
    })
  }

  handleWordClick(word) {
    this.setState({
      word: '',
      allSubmittedWords: this.state.allSubmittedWords.concat(word),
      likelyWords: []
    })
  }

  handleClear() {
    this.setState({
      allSubmittedWords: [],
      likelyWords: [],
      word: ''
    })
  }

  handleKeyPress(e) {
    console.log(e.key);
    if (e.key === 'Enter') {
      if (!this.state.likelyWords[0]) {
        this.setState({
          allSubmittedWords: this.state.allSubmittedWords.concat(this.state.word),
          likelyWords: [],
          word: ''
        })
      } else {
        this.setState({
          allSubmittedWords: this.state.allSubmittedWords.concat(this.state.likelyWords[0].word),
          likelyWords: [],
          word: ''
        })
      }
    }
  }

  render() {
    return (
      <div>
        <div className="likelyWords">
          {this.state.likelyWords.map(likelyWord => (<div><span onClick={() => this.handleWordClick(likelyWord.word)}><b>Word:</b> {likelyWord.word}</span><span><b>  Likelihood:</b> {likelyWord.likelihood}</span></div>))}
        </div>
        <div className="submittedWords">
          {this.state.allSubmittedWords.map((word) => (<span>{word} </span>))}
        </div>
        <div className="Text">
          <input className="textBox" type="text" value={this.state.word} onChange={(e) => this.handleChange(e)} onKeyPress={(e) => this.handleKeyPress(e)}/>
        <div>
          <button className="submit" onClick={() => this.handleSubmit()}>Submit</button><button className="clear" onClick={() => this.handleClear()}>Clear State</button>
        </div>
      </div>
      </div>
    );
  }
}

export default App;
