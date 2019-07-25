import React from 'react';
import ReactDOM from 'react-dom';

const baseURL = process.env.ENDPOINT;

const getWeatherFromApi = async () => {
  try {
    const response = await fetch(`${baseURL}/weather`);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nowIcon: "",
      predictionIcon: "",
    };
  }

  async componentWillMount() {
    const weather = await getWeatherFromApi();
    this.setState({nowIcon: weather.now.icon.slice(0, -1)});
    this.setState({predictionIcon: weather.three_hour_forecast.icon.slice(0, -1)});
  }

  render() {
    const { nowIcon, predictionIcon } = this.state;

    return (
      <div className="icon">
        <h3>Now:</h3>
        { nowIcon && <img src={`/img/${nowIcon}.svg`} /> }
        <h3>Three hours from now:</h3>
        { predictionIcon && <img src={`/img/${predictionIcon}.svg`} /> }
      </div>
    );
  }
}

ReactDOM.render(
  <Weather />,
  document.getElementById('app')
);
