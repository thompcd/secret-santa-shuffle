import { writable } from 'svelte/store';

const store = writable([
	{
		id: 1,
		name: 'Corey',
		santa: ''
	},
]);

export default store;
