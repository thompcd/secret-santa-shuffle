<script>
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import store from './Store.js';
	import User from './User.svelte';
	import Users from './Users.svelte';
	
	let users = [];
	let name;
	
	// Get articles
	store.subscribe(data => {
		users = data;
	})
	
	let initialOrder = users;
	
	$: partners = [];
	$: listHeight = (users.length * 52) + 150;
	$: bgHeight = listHeight + 50;

	//handle all of the app logic in the click function, like the animal I am
	const handleClick = function(){
		//order will be empty the first time or match previous shuffle
		partners = users;
		
		//to make things dramatic, we want to redo the shuffle until no elements match their original position rather than optimizing the algorithm
		do {
			partners = shuffle(partners)
		} while (hasOriginalPosition(users, partners));
	}
	
	//arrays must match in length to be valid
	//check the shuffled version of the array versus non-shuffled
	function hasOriginalPosition(array1,array2){
		for(let i = array1.length-1; i>0; i--){
			if (array1[i].id === array2[i].id){
				//the id in the corresponding slot is the same - not a good shuffle
				return true;
			}
	}
		return false;
	}

	// return new randomly sorted array from shuffle function
	function shuffle(array) {
	return [...array].sort(() => 0.5 - Math.random());
	}

	// Remove User
	function removeUser(event) {
		const userToRemove = event.detail;
		let filteredList = users.filter(item => item.id !== userToRemove.id)
		store.set(filteredList);
	}

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

	//ooooh, pretty animations
	const [send, receive] = crossfade({
			fallback(node, params) {
				const style = getComputedStyle(node);
				const transform = style.transform === 'none' ? '' : style.transform;

				return {
					duration: 500,
					easing: quintOut,
					css: t => `
						transform: ${transform} scale(${t});
						opacity: ${t}
					`
				};
			}
		});
</script>

<svelte:window bind:innerHeight={bgHeight}/>
<div class="background" style="height:{bgHeight};">
	<div class="board">
		<div class="button-container">
			<div class="button-wrapper">
				<Users />
				<button class="repeating-linear main-btn" on:click={handleClick}>Shuffle</button>
				<span class="subtext">
					Click button to assign new secret santas
				</span>
			</div>
		</div>

		<div class="left" style="height:{listHeight}px">
			<h2>
				Participant
			</h2>
			{#each users as person}
			<div class="user">
				<p>{person.name}</p>
				<button class="remove" on:click={removeUser}> X </button>
			</div>
			{/each}
		</div>
		<div class="right" style="height:{listHeight}px">
			<h2>
				Secret Santa
			</h2>
			<span class="placeholder">
			{#each partners as person (person.id)}
				<p class="user"
				in:receive="{{key: person.id}}"
				out:send="{{key: person.id}}" 
				animate:flip >
				{person.name}
				</p>
			{/each}
				</span>
		</div>
	</div>
</div>


<style>
	.background{
		display: flex;
		flex-align: center;
		background: #C0392B;
		background: repeating-linear-gradient(
		45deg,
		#E74C3C,
		#E74C3C 10px,
		#C0392B 10px,
		#C0392B 20px);
	}
	
	.board {
		max-width: 36em;
		width: 100%;
		height: 100%;
		margin: auto auto;
		padding: 2rem;
	}
	
	.left, .right {
		float: left;
		min-width: 100px;
		max-width: 300px;
		min-height: 200px;
		width: 50%;
		height: 70vh;
		background-color: white;
	}
	
	.left h2, .right h2{
		height: 40px;
	}

	.left .user, .right .user{
		width: 100%;
		display: inline-flex;
		align-items: baseline;
		justify-content: center;
	}

	.user p{
		padding-right: 0.5rem;
	}
	
	.button-container{
		padding-top: 2rem;
		width: 100%;
		background-color: white;
	}
	.button-wrapper{
		display: flex;
		flex-direction: column;
		padding: 1rem;
		padding-bottom: 0;
	}
	.main-btn{
		margin: auto;
		width: 200px;
		height: 80px;
	}
	button {
		border: 3px solid #235E6F;
		font-weight: bold;
		text-transform: uppercase;
		font-size: 1.3rem;
		background-color: #34A65F;
		color: white;
	}
	button:hover{
		background-color: #F5624D;
	}
	button:active{
		background-color: #235E6F;
	}
	
	.remove {
		position: inline;
		font-size: 1.1rem;
		background-color: unset;
		border: none;
		color: red;
	}
	.remove:hover{
		background-color:red;
		color: white;
	}

	h2 {
		font-size: 2em;
		font-weight: 200;
		user-select: none;
		color: #0F8A5F;
		text-align: center;
	}
	p{
		text-align: center;
		font-size: 1.1em;
	}
	.subtext{
		padding-top: 1rem;
		text-align: center;
		font-weight: 300;
	}
	
</style>
