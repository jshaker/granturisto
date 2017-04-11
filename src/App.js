//Importing dependencies from React, Jquery, Material UI, MomentJS and Image source
import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import $ from 'jquery';
import CircularProgress from 'material-ui/CircularProgress';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';
import Logo from '../public/granturisto.png';

//Defining Inline CSS
const styles = {
  container: {
    textAlign: 'center'
  },
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400
  },
  logo: {
    marginTop:'auto',
    marginBottom: 'auto',
    marginLeft: '5',
    marginRight: '5'
  }
};

//Defining the main React Component
class App extends React.Component {

  constructor(props,context){
    super(props,context);
    //Defining initial state variables
    this.state = {
      dataSource1: [],
      dataSource2: [],
      departure: null,
      destination: null,
      loading: false,
      tabIndex: 'Airport Directions',
      apiResponse: null,
      directions: null
    };
    //Binding class method to scope "this"
    this.handleUpdateInput1 = this.handleUpdateInput1.bind(this);
    this.handleUpdateInput2 = this.handleUpdateInput2.bind(this);
    this.onNewRequest1 = this.onNewRequest1.bind(this);
    this.onNewRequest2 = this.onNewRequest2.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.clearData = this.clearData.bind(this);
    this.submitRequest = this.submitRequest.bind(this);
  }

  //On click for tabbed view
  handleTabChange(tabIndex){
    this.setState({
      tabIndex: tabIndex
    });
  }

  //Autocomplete on change
  handleUpdateInput1(text){
    if(text.trim() === ""){
      return;
    }
    //Querying places for matching text
    $.ajax({
      url: 'http://localhost:3000/getPlaces',
      type: 'GET',
      data: {
        search: text
      }
    }).then(function(response){
      //Setting state variable to display in autocomplete
      this.setState({dataSource1: response});
    }.bind(this));
  }

  //Autocomplete on change
  handleUpdateInput2(text){
    if(text.trim() === ""){
      return;
    }
    //Querying places for matching text
    $.ajax({
      url: 'http://localhost:3000/getPlaces',
      type: 'GET',
      data: {
        search: text
      }
    }).then(function(response){
      //Setting state variable to display in autocomplete
      this.setState({dataSource2: response});
    }.bind(this));
  }

  //Fired when an autocomplete option is clicked
  onNewRequest1(chosenRequest){
    if(typeof chosenRequest !== "object"){
      return;
    }
    this.setState({departure: chosenRequest.obj});
  }

  onNewRequest2(chosenRequest){
    if(typeof chosenRequest !== "object"){
      return;
    }
    this.setState({destination: chosenRequest.obj});
  }

  submitRequest(){
    //Display loading animation
    this.setState({loading: true});
    $.ajax({
      url: 'http://localhost:3000/getTrip',
      type: 'POST',
      data: {departure: this.state.departure, destination: this.state.destination}
    }).then(function(response){
      console.log("response",response);
      //Stop loading animation and load api response into state variable
      this.setState({loading:false, apiResponse: response});
    }.bind(this));
  }

  //Used to start a new search
  clearData(){
    this.setState({apiResponse: null,tabIndex: 'Airport Directions'});
  }

  render() {
    //This determines whether tabbed view or search view is displayed
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
                  {this.state.apiResponse.directions.map((directions) =>
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
              <div style={{marginLeft:200, marginRight:200}}>
              <List>
                {this.state.apiResponse.flights.map((flights) =>
                  <div>
                  <ListItem primaryText={<p>{flights.MinPrice}$ - Direct: {flights.Direct ? "Yes" : "No"}</p>} secondaryText={
                    <p>
                      <span style={{color: '#1976D2'}}>{moment(flights.OutboundLeg.DepartureDate).format("dddd, MMMM Do YYYY")} ------- {moment(flights.InboundLeg.DepartureDate).format("dddd, MMMM Do YYYY")}</span>
                    </p>
                  } />
                  <Divider />
                  </div>
                )}
              </List>
              </div>
              </div>
            </Tab>
            <Tab label="Hotels"
                 value="Hotels"
                 icon={<FontIcon className="material-icons">hotel</FontIcon>}
            >
              <div>
                <div style={{marginLeft:200, marginRight:200}}>
                  <List>
                    {this.state.apiResponse.hotels.map((hotels) =>
                      <div>
                      <ListItem primaryText={hotels.name} secondaryText={
                        <p>
                          <span style={{color: '#1976D2'}}>{hotels.rating}/5 - {hotels.vicinity}</span>
                        </p>
                      } />
                      <Divider />
                      </div>
                    )}
                  </List>
                </div>
              </div>
            </Tab>
            <Tab label="Touristic Attractions"
                 value="Touristic Attractions"
                 icon={<FontIcon className="material-icons">account_balance</FontIcon>}
            >
              <div>
                <div style={{marginLeft:200, marginRight:200}}>
                <List>
                  {this.state.apiResponse.touristAttractions.map((touristAttractions) =>
                    <div>
                    <ListItem primaryText={touristAttractions.name} secondaryText={
                      <p>
                        <span style={{color: '#1976D2'}}>{touristAttractions.rating}/5 - {touristAttractions.formatted_address}</span>
                      </p>
                    } />
                    <Divider />
                    </div>
                  )}
                </List>
                </div>
              </div>
            </Tab>
            <Tab label="Weather"
                 value="Weather"
                 icon={<FontIcon className="material-icons">wb_sunny</FontIcon>}
            >
              <div style={{marginLeft:200, marginRight:200}}>
              <List>
                {this.state.apiResponse.weather.daily.data.map((data, i) =>
                  <div>
                  <ListItem primaryText={<p><span>{moment().add(i, 'days').format('dddd')} --- {data.summary}</span></p>} secondaryText={
                      <p><span>Max Temperature: {data.temperatureMax} degrees ---
                      Feels Like Max: {data.apparentTemperatureMax} degrees ---
                      Chances of Precipitation: {data.precipProbability}% ---
                      Max Wind Speed: {data.windSpeed} km/h</span></p>
                  } />
                  <Divider />
                  </div>
                )}
              </List>
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
    const suggestions1 = this.state.dataSource1.map(function(suggestion){
      return {
        text: suggestion.name,
        value: suggestion.name,
        obj: suggestion
      };
    });

    const suggestions2 = this.state.dataSource2.map(function(suggestion){
      return {
        text: suggestion.name,
        value: suggestion.name,
        obj: suggestion
      };
    });

    //Displays initial search view
    return (
      <MuiThemeProvider>
        <div style={styles.container}>
          <img src={Logo}/><br/>
          <AutoComplete
            floatingLabelText="Search for your departure"
            filter={function(searchText, key){
              return true;
            }}
            maxSearchResults={10}
            dataSource={suggestions1}
            onUpdateInput={this.handleUpdateInput1}
            onNewRequest={this.onNewRequest1}
          /><br/>
          <AutoComplete
            floatingLabelText="Search for your destination"
            filter={function(searchText, key){
              return true;
            }}
            maxSearchResults={10}
            dataSource={suggestions2}
            onUpdateInput={this.handleUpdateInput2}
            onNewRequest={this.onNewRequest2}
          /><br/>
          <RaisedButton label="Submit"
                        primary={true}
                        disabled={!this.state.departure || !this.state.destination || this.state.loading}
                        onTouchTap={this.submitRequest}
          /><br/>
          <div>
            {this.state.loading ? <CircularProgress size={80} thickness={5} /> : null}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
