import { moduleName } from './settings.js';


let history = [];

export function pushHistory(...args) {
	const maxHistoryLength = game.settings.get(moduleName, 'contextLength');

	history.push(...args);
	if (history.length > maxHistoryLength) {
		history = history.slice(history.length - maxHistoryLength);
	}

	return history;
}
