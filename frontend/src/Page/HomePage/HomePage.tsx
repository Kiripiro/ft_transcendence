import React, { useState, Component } from 'react';
import Navbar from '../../Module/Navbar/Navbar';
import './../assets/Font.css';
import './HomePage.css'

class HomePage extends Component<{}, {clubs: any[]}> {

    constructor(props: any){
        super(props);
        this.state = {
            clubs: []
        };
    }
    
    componentDidMount(){
        // fetch('http://localhost:3000/profile')
        // .then(response => response.json())
        // .then(profile => console.log(profile));
        fetch('http://localhost:3000/friends')
        .then(response => response.json())
        .then(teams => this.setState({clubs: teams}))
    }

    render(){
        // var text = document.createTextNode("Tutorix is the best e-learning platform");
        // tag.appendChild(text);
        for (let i = 0; i < this.state.clubs.length; i++) {
            if (this.state.clubs[i].status)
            {
                var tag = document.createElement("div");
                tag.className = "online-friend"
                var element = document.getElementById("friendsInfo");
                if (element)
                    element.appendChild(tag);
            }
        }
        return (
            <div className='Font'>
                {/* {this.state.clubs.map(club => (<div className='friends'> {club.user} </div>))}
                <h1>{this.state.clubs}</h1> */}
                <div className="horizontal">
                    <Navbar/>
                    <div className="vertical">
                        <main>
                            <div className="match-history">
                                <h3>Match History</h3>
                            </div>
                            <div className="stat">
                                <div className="rank"></div>
                                <div className="graph"></div>
                            </div>
                        </main>
                        <div className="info">
                            <div className="user-info">
                                <div className="user-picture"></div>
                                <p className="username">username</p>
                                <p className="level">lvl</p>
                            </div>
                            <div className="friends-info" id='friendsInfo'>
                                <h3>Friends</h3>
                            </div>
                            <div className="chat"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
  };
  
  export default HomePage;
  