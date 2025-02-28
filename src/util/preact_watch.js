/*
	preact_watch.js
	---------------

	This is a custom utility function that allows you to watch multiple signals and execute a callback when any change.
	This is useful for when you need to watch multiple signals and execute a callback when any of them change.
	This is similar to the `watchEffect` function in Vue.js.
*/
import { effect } from '@preact/signals-react';

/**
 * Watch multiple signals and execute a callback when any change.
 * 
 * @param {Array<Signal>} signals - List of signals to watch
 * @param {Function} callback - Function to execute when any signal updates
 */
export function watch(signals, callback) {

	return effect(() => {

		// Access all signals to track them
		signals.forEach(signal => signal.value);

		// Call the callback
		callback();
	});
}

export default watch;
