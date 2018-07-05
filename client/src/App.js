import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    battletag: null,
  };

  componentWillMount() {
    axios.get('/api/user')
      .then(res => this.setBattletag(res.data.user));
  }

  setBattletag = (battletag) => {
    this.setState({ battletag });
  };

  handleClick = () => {
    axios.get('/auth/bnet')
      .then(res => console.log(res));
  };

  render() {
    const { battletag } = this.state;

    return (
      <div>
        {battletag
          ? (
            <p>Welcome {battletag}</p>
          ) : (
            <div>
              <a href="/auth/bnet">Login(via browser navigation)</a>
              <hr />
              <button type="button" onClick={this.handleClick}>Login(via http)</button>
            </div>
          )
        }
      </div>
    );
  }
}

export default App;
