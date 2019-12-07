<script>
	import store from './Store.js';
	import User from './User.svelte';
	
	let users = [];
	let name;
	
	// Get articles
	store.subscribe(data => {
		users = data;
	})
	
	// Add article
	function addUser() {
		const newUser = {
			id: Date.now(),
			name
		};
		store.update(data => {
			return [...data, newUser];
		})
	}
	
	// Remove User
	function removeUser(event) {
		const userToRemove = event.detail;
		let filteredList = users.filter(item => item.id !== userToRemove.id)
		store.set(filteredList);
	}
</script>

<div class="align">
	<h3>New participant</h3>
	<form on:submit|preventDefault={addUser}>
		<input type="text" name="name" id="name" placeholder="Name" bind:value={name} />
		<button type="submit">Add</button>
	</form>
</div>


<style>

form{
	padding: 0;
	padding-bottom: 1rem;
}

.align{
	display: inline-flex;
	justify-content: center;
	align-items: baseline;
	background-color: white;
	width: 100%;
}

.align h3{
	color: #0F8A5F;
	font-weight: 400;
	padding: 0 0.5rem;
	margin: 0;
}

button{
	background-color: #235E6F;
	color: white;
	border: none;
}
</style>