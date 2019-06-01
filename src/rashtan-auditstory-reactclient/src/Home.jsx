import React from 'react';
import './Home.css'

class Home extends React.Component {
  constructor() {
      super();
      this.state = {companies: []};
  }

  componentDidMount() {
    const accessToken = this.props.auth.getAccessToken();

    fetch("api/values", {headers: new Headers({
        "Accept": "application/json",
        "Authorization": `Bearer ${accessToken}`
    })})
        .then(response => response.json())
        .then(data => {
            this.setState({companies: data})
            console.log(data)
        })
        .catch(error => console.log(error))
  }

  render() {
    return <ul>
      {this.state.companies.map((company) =>
        <li><i>{company.name}</i> - <h3>{company.ticker}</h3></li>)}
    </ul>;
  }
}

export default Home;