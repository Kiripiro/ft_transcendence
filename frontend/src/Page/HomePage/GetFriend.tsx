import axios from "axios";
import React, { useEffect, useState } from "react";
import Members from "./Members";

type Person = {
	family: any;
  };

export default function GetFriend({ family }: Person) {
	return (
		<div>
			<h1>{family.name}</h1>
			<Members members={family.members} />
		</div>
	)
}
