import React, { useEffect } from "react";
import FriendList from "./FriendList";
import { AddFriendHook, FriendListHook } from "./Hooks";

function AddFriend() {

	const [isFriendList, setFriendList] = FriendListHook(false);
	const [isAddFriend, setAddFriend] = AddFriendHook(true);

	const handleClick = () => {
		setFriendList(true);
		setAddFriend(false)
    };

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
					<form>
						<input type='text' />
						<input type="submit" />
					</form>
				</div>
			)}
			{isFriendList && <FriendList />}
		</div>
	)
}

export default AddFriend;