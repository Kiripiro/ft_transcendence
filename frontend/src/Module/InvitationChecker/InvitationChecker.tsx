import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../State";

import './InvitationChecker.css'

function InvitationChecker(props: { children: any }) {

	const utilsData = useSelector((state: RootState) => state.utils)
	const userData = useSelector((state: RootState) => state.user)

	const [inviteSocketID, setInviteSocketID] = useState("")

	utilsData.socket.on('invite_request_custom',
		function (info: {
			inviteSocketID: string,
			inviteUser: {
				id: number,
				login: string,
				nickname: string,
				wins: number,
				looses: number,
				rank: number,
				profile_pic: string
			}
		}) {
			console.log('sisisis')
			var modal = document.getElementById("invitationModal");
			if (modal)
				modal.style.display = "block";
			var h3 = document.getElementById("invitePlayer")
			if (h3)
				h3.innerHTML = info.inviteUser.login + " invite you to play on a custom map !"
			setInviteSocketID(info.inviteSocketID)
		});

	return (
		<>
			<div id="invitationModal" className="invitationModal">
				<div className="invitationModal-content">
					<div className="inviteNameDiv">
						<h3 id='invitePlayer' />
					</div>
					<div className="blocksContainerRow">
						<button className='inviteButton decline' onClick={() => {
							var modal = document.getElementById("invitationModal");
							if (modal)
								modal.style.display = "none";
							utilsData.socket.emit("DECLINE_INVITATION", {sendTo: inviteSocketID, user: userData.user})
						}} >Decline</button>
						<button className='inviteButton accept' onClick={() => {
							utilsData.socket.emit("ACCEPT_INVITATION", { user: userData.user, inviteID: inviteSocketID })
							window.location.href = 'http://172.16.1.10:3000/pong'
						}}>Accept</button>
					</div>
				</div>
			</div>
			{props.children}
		</>
	);

}

export default InvitationChecker;