import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import $ from 'jquery';

const style = {
  container: {
    textAlign: 'center'
  }
};

class App extends React.Component {

  constructor(props,context){
    super(props,context);
    this.state = {
      dataSource: []
    };

    this.handleUpdateInput = this.handleUpdateInput.bind(this);

  }

  handleUpdateInput(text){
    if(text.trim() === ""){
      return;
    }
    $.ajax({
      url: `http://localhost:3000/placesautocomplete/${text}`,
      type: 'GET'
    }).then(function(data){
      this.setState({dataSource: data});
    }.bind(this));

  }

  onNewRequest(chosenRequest){
    console.log("test",chosenRequest.obj);
    return;
  }

  render() {

    const suggestions = this.state.dataSource.map(function(suggestion){
      return {
        text: suggestion.description,
        value: suggestion.description,
        obj: suggestion
      };
    });

    return (
      <MuiThemeProvider>
        <div style={style.container}>
          <h1>Welcome to Gran Turisto</h1>
          <AutoComplete
            floatingLabelText="Search for your destination"
            filter={function(searchText, key){
              return true;
            }}
            dataSource={suggestions}
            onUpdateInput={this.handleUpdateInput}
            onNewRequest={this.onNewRequest}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
