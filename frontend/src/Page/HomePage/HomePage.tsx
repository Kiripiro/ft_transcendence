import { rmSync } from 'fs';
import React, { Component, useEffect, useState } from 'react';
import Navbar from '../../Module/Navbar/Navbar';
import './../assets/Font.css';
import './HomePage.css';
import FriendList from './FriendList';
import { AddFriendHook, FriendListHook } from './Hooks';
import AddFriend from './AddFriend';
import { useSelector } from 'react-redux';
import { RootState } from '../../State';
import axios from 'axios';
import ReactDOM from 'react-dom';

var test = false
const matches: any[] = [];

const HomePage = (props: any) => {
    const userData = useSelector((state: RootState) => state.user)
    // console.log(userData.user);
    const [isFriendList, setFriendList] = FriendListHook(true);
    const [isAddFriend, setAddFriend] = AddFriendHook(false);

    const [matchesHistory, setMatchesHistory] = useState(Array<any>)

    
    useEffect(() => {
        
        if (!test) {
            axios.get('http://localhost:5001/matchesHistory/' + userData.user?.id).then((res) => {
                let matches: any[] = []
                res.data.forEach((item: { id_user1: number, score_u1: number, id_user2: number, score_u2: number, winner_id: number }) => {
                    matches.push(<div key={matches.length.toString()} className={(item.winner_id == userData.user?.id ? 'game game-win' : 'game game-lose')} >
                        <div className='player'>
                            <div className='Score'>{item.score_u1}</div>
                            <div className='PlayerNickname'>{item.id_user1 == userData.user?.id ? userData.user.login : ""}</div>
                        </div>
                        <div className='player'>
                        <div className='Score'>{item.score_u2}</div>
                            <div className='PlayerNickname'>{item.id_user2 == userData.user?.id ? userData.user.login : ""}</div>
                        </div>
                    </div>)
                })
                console.log('matches', matches)
                var invertMatches: any[] = []
                for (let index = matches.length - 1; index >= 0; index--)
                    invertMatches.push(matches[index])
                setMatchesHistory(invertMatches)
            })
            test = true
        }
    })

    return (
        <div className='Font'>
            <div className="horizontal">
                <Navbar />
                <div className="vertical">
                    <main>
                        <div className="match-history">
                            <h3>Match History</h3>
                            {matchesHistory}
                        </div>
                        <div className="stat">
                            <div className="rank"></div>
                            <div className="graph"></div>
                        </div>
                    </main>
                    <div className="info">
                        <div className="user-info">
                            <div className="user-picture">
                                <img src={userData.user?.profile_pic} />
                            </div>
                            <p className="username">{userData.user?.login}</p>
                            <p className="level">lvl</p>
                        </div>
                        <div className="friends-info">
                            {isFriendList && <FriendList />}
                            {isAddFriend && <AddFriend />}
                        </div>
                        <div className="chat"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
