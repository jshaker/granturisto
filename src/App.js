import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import $ from 'jquery';
import CircularProgress from 'material-ui/CircularProgress';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

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
      tabIndex: 'Airport Directions',
      apiResponse: null,
      directions: null
    };
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.onNewRequest = this.onNewRequest.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.clearData = this.clearData.bind(this);
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
      data: {userLocation: this.state.userLocation, destination: chosenRequest.obj}
    }).then(function(response){
      console.log("response",response);
      setTimeout(function(){
        this.setState({loading:false, apiResponse: response, directions: response.directions});
        console.log(this.state.directions)
      }.bind(this), 1000);
    }.bind(this));
  }

  clearData(){
    this.setState({apiResponse: null});
  }

  render() {
    if(this.state.apiResponse){
      return (
        <MuiThemeProvider>
          <Tabs value={this.state.tabIndex} onChange={this.handleTabChange}>
            <Tab label="Airport Directions"
                 value="Airport Directions"
                 icon={<FontIcon className="material-icons">directions</FontIcon>}
            >
              <div style={{marginLeft:200, marginRight:200}}>
                <List>
                  {this.state.directions.map((directions) =>
                    <div>
                    <ListItem primaryText={directions.html_instructions.replace(/<(?:.|\n)*?>/gm, '')} secondaryText={
                      <p>
                        <span style={{color: '#1976D2'}}>{directions.distance.text}</span>
                      </p>
                    } />
                    <Divider />
                    </div>
                  )}
                </List>
              </div>
            </Tab>
            <Tab label="Flights"
                 value="Flights"
                 icon={<FontIcon className="material-icons">flight</FontIcon>}
            >
              <div>
                <h2 style={styles.headline}>Flights</h2>
                <p>
                  TODO
                </p>
              </div>
            </Tab>
            <Tab label="Hotels"
                 value="Hotels"
                 icon={<FontIcon className="material-icons">hotel</FontIcon>}
            >
              <div>
                <h2 style={styles.headline}>Hotels</h2>
                <p>
                  TODO
                </p>
              </div>
            </Tab>
            <Tab label="Touristic Attractions"
                 value="Touristic Attractions"
                 icon={<FontIcon className="material-icons">account_balance</FontIcon>}
            >
              <div>
                <h2 style={styles.headline}>Touristic Attractions</h2>
                <p>
                  TODO
                </p>
              </div>
            </Tab>
            <Tab label="Weather"
                 value="Weather"
                 icon={<FontIcon className="material-icons">wb_sunny</FontIcon>}
            >
              <div>
                <h2 style={styles.headline}>Weather</h2>
                <p>
                  TODO
                </p>
              </div>
            </Tab>
            <Tab label="New Search"
                 value="Close"
                 onActive={this.clearData}
                 icon={<FontIcon className="material-icons">search</FontIcon>}
            />
          </Tabs>
        </MuiThemeProvider>
      );
    }

    const suggestions = this.state.dataSource.map(function(suggestion){
      return {
        text: suggestion.name,
        value: suggestion.name,
        obj: suggestion
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
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
