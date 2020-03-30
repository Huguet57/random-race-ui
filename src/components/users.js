import React from 'react'

const colors = ["white", "red", "green", "yellow"];

const Users = ({ users }) => {
  return (
	<div>
	  <center><h1>User List</h1></center>
	  {users.map((user) => (
		<div class="card">
		  <div class="card-body" style={{ backgroundColor: colors[user.gamble + 1] }}>
			<h5 class="card-title">{user.id}</h5>
			<h6 class="card-subtitle mb-2 text-muted">{user.name}</h6>
		  </div>
		</div>
	  ))}
	</div>
  )
};

export default Users;
