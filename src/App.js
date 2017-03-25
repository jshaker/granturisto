import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import $ from 'jquery';
import CircularProgress from 'material-ui/CircularProgress';
import {Tabs, Tab} from 'material-ui/Tabs';

const styles = {
  container: {
    textAlign: 'center'
  },
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400
  }
};

class App extends React.Component {

  constructor(props,context){
    super(props,context);
    this.state = {
      dataSource: [],
      userLocation: null,
      loading: false,
      tabIndex: 'Airport Directions'
    };
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.onNewRequest = this.onNewRequest.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(function(location){
      this.setState({userLocation: location.coords});
    }.bind(this));
  }

  handleTabChange(tabIndex){
    this.setState({
      tabIndex: tabIndex
    });
  }

  handleUpdateInput(text){
    if(text.trim() === ""){
      return;
    }
    $.ajax({
      url: 'http://localhost:3000/getPlaces',
      type: 'GET',
      data: {
        search: text
      }
    }).then(function(response){
      this.setState({dataSource: response});
    }.bind(this));

  }

  onNewRequest(chosenRequest){
    if(typeof chosenRequest !== "object"){
      return;
    }
    this.setState({loading: true});
    $.ajax({
      url: 'http://localhost:3000/getTrip',
      type: 'POST',
      data: {userLocation: this.state.userLocation, destination: chosenRequest.value}
    }).then(function(response){
      setTimeout(function(){
        this.setState({loading:false});
      }.bind(this), 1000);
    }.bind(this));
  }

  render() {

    const suggestions = this.state.dataSource.map(function(suggestion){
      return {
        text: suggestion.description,
        value: suggestion.description
      };
    });

    return (
      <MuiThemeProvider>
        <div style={styles.container}>
          <h1>Welcome to Gran Turisto</h1>
          <AutoComplete
            floatingLabelText="Search for your destination"
            filter={function(searchText, key){
              return true;
            }}
            maxSearchResults={10}
            dataSource={suggestions}
            onUpdateInput={this.handleUpdateInput}
            onNewRequest={this.onNewRequest}
            disabled={!this.state.userLocation}
          />
          <div>
            {this.state.loading ? <CircularProgress size={80} thickness={5} /> : null}
          </div>
          <div>
            <Tabs value={this.state.tabIndex} onChange={this.handleTabChange}>
              <Tab label="Airport Directions" value="Airport Directions">
                <div>
                  <h2 style={styles.headline}>Airport Directions</h2>
                  <p>
                    TODO
                  </p>
                </div>
              </Tab>
              <Tab label="Flights" value="Flights">
                <div>
                  <h2 style={styles.headline}>Flights</h2>
                  <p>
                    TODO
                  </p>
                </div>
              </Tab>
              <Tab label="Hotels" value="Hotels">
                <div>
                  <h2 style={styles.headline}>Hotels</h2>
                  <p>
                    TODO
                  </p>
                </div>
              </Tab>
              <Tab label="Weather" value="Weather">
                <div>
                  <h2 style={styles.headline}>Weather</h2>
                  <p>
                    TODO
                  </p>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
