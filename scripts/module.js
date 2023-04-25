const moduleName = 'ask-chatgpt';

Hooks.once('init', () => {
	console.log(`${moduleName} | init`);
});

Hooks.once('ready', () => {
	console.log(`${moduleName} | ready`);
});
