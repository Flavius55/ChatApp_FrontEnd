import React from 'react';
import ReactDOM from 'react-dom';
import './style/App.css';
import './style/style.css';

class App extends React.Component {
  constructor(){
    super();
    window.componenta = this;
    window.local_api = "http://localhost:3005";
    window.heroku_api = "https://chatappflavius.herokuapp.com";
  }
    
  render(){
    return(
      <div>
        <input name="name" type="text" id="name" placeholder="name"></input>
        <input name="mesage" type="text" id="mesage" placeholder="mesage"></input>
        <div id="content_box">
          
        </div>
        <button onClick={this.TrimiteMesaj}>Trimite Mesaj!</button>
        <button onClick={this.AfiseazaMesaje}>Afiseaza Mesaje!</button>
      </div>
    )
  }

  async TrimiteMesaj(){
    const response = await fetch(window.heroku_api,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "name": document.getElementById("name").value,
        "mesage":document.getElementById("mesage").value
      }),
    });
    //console.log(response);
  }

  async AfiseazaMesaje(){
    
    const response = await fetch(window.heroku_api, 
                {
                    method: 'GET'
                });
     const json = await response.json();
     console.log(json);
     for(let i=0;i<json.length;i++)
     {
       let div_name = document.getElementsByClassName("name")[i];
       let div_mesage = document.getElementsByClassName("mesage")[i];
        if(div_name) 
          {
            div_name.textContent = json[i].name;
            div_mesage.textContent = json[i].mesage;
          }
          else
          {
            const div_name = document.createElement('div');
            div_name.className="name";
            div_name.textContent=json[i].name;
            document.getElementById("content_box").appendChild(div_name)

            const div_mesage = document.createElement('div');
            div_mesage.className="mesage";
            div_mesage.textContent=json[i].mesage;
            document.getElementById("content_box").appendChild(div_mesage)
          }
     }
     
     
  }
}

export default App;
