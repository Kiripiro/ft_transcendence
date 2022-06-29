import React from "react";
import FriendList from "./FriendList";
import GetFriend from "./GetFriend";
import { AddFriendHook, FriendListHook } from "./Hooks";
import useFetch from "./useFetch";

function AddFriend() {

	const [isFriendList, setFriendList] = FriendListHook(false);
	const [isAddFriend, setAddFriend] = AddFriendHook(true);
	const { data, setData } = useFetch();

	const handleClick = () => {
		setFriendList(true);
		setAddFriend(false)
    };

	const handleChange = (e: any) => {
		setData({ ...data, slug: e.target.value })
	}

	return (
		<div>
			{isAddFriend && (
				<div>
					<div className="friends-info-typo">
						<h3>Add Friend</h3>
						<div className="button">
							<button onClick={handleClick} className="bi bi-x-lg"></button>
							{isFriendList && <FriendList />}
						</div>
					</div>
					{/* <GetFriend /> */}
					<input type="text" value={data.slug} onChange={handleChange} />
					<br />
      				{data.results.length > 0 ? <GetFriend family={data.results[0]} /> : null}
				</div>
			)}
			{isFriendList && <FriendList />}
		</div>
	)
}

export default AddFriend;