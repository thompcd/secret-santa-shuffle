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


<h3>Add new participant</h3>
<form on:submit|preventDefault={addUser}>
	<input type="text" name="name" id="name" placeholder="Name" bind:value={name} />
	<br />
	<button type="submit">Add</button>
</form>
