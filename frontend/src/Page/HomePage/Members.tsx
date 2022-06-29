import React from "react";

type Person = {
	members: any;
};

export default function Members({ members }: Person) {
  return (
    <ul>
      {members.map((el: any, i: any) => (
        <li key={i}>{el.name}</li>
      ))}
    </ul>
  );
}