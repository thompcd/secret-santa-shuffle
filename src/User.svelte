<script>
	import { createEventDispatcher } from 'svelte';
	
	const dispatch = createEventDispatcher();
	
	export let user;
	
	function onRemove() {
		dispatch('removeUser', user);
	}
</script>

<style>
	h2 {
		padding: 0;
		margin: 0 0 10px 0;
	}
	article {
		padding: 10px;
		margin-bottom: 20px;
		border: solid 1px orange;
		width: 50%;
		position: relative;
	}
	button {
		position: inline;
		font-size: 12px;
		background-color: unset;
		border: none;
		color: red;
	}
	button:hover{
		background-color:red;
		color: white;
	}
</style>

<user>
	<h2>{user.name}</h2>
	<em>{user.id}</em>
	<button on:click={onRemove}> X </button>
</user>