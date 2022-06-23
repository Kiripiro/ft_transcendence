import React, { Component } from 'react';
import Navbar from '../../Module/Navbar/Navbar';
import './../assets/Font.css';
import './HomePage.css'

class HomePage extends Component<{}, {friends: any[]}> {
    constructor(props: any){
        super(props);
        this.state = {
            friends: []
        };
    }

    componentDidMount() {
        fetch('http://localhost:3000/friends')
          .then(res => res.json())
          .then(ret => this.setState({friends: ret}))
        console.log('=== componentDidMount ===');
    }

    // componentDidUpdate(prevProps: any, prevState: any){
    //     if (prevState.friends !== this.state.friends)
    //     {
    //         for (let i = 0; i < this.state.friends.length; i++) {
    //             if (this.state.friends[i].status)
    //             {
    //                 var tag = document.createElement("div");
    //                 tag.className = "online-friends"
    //                 var element = document.getElementById("friendsInfo");
    //                 if (element)
    //                     element.appendChild(tag);
    //             }
    //         }
    //     }
    // }

    render(){
        return (
            <div className='Font'>
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
                                <div className='friends'>
                                    {this.state.friends.map(friend => (<div key={friend.id} className='friend-card'>
                                        {friend.user}
                                    </div>))}
                                </div>
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
