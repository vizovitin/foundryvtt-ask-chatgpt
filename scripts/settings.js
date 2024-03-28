export const moduleName = 'ask-chatgpt';

export const gameSystems = (() => {
	const genericPrompt = "I would like you to help me with running the game by coming up with ideas, answering questions, and improvising. Keep responses as short as possible. Stick to the rules as much as possible.";
	const formatPrompt = "Always format each answer as HTML code without CSS, including lists and tables. Never use Markdown.";
	return {
		'generic': {
			name: 'Generic tabletop RPG',
			prompt: `You are a game master for a tabletop roleplaying game. ${genericPrompt} ${formatPrompt}`,
		},
		'dnd5e': {
			name: 'Dungeons & Dragons 5th Edition',
			prompt: `You are a dungeon master for a Dungeons & Dragons 5th Edition game. ${genericPrompt} Properly format spells, monsters, conditions, and so on. ${formatPrompt}`,
		},
		'pf2e': {
			name: 'Pathfinder Second Edition',
			prompt: `You are a game master for a Pathfinder 2nd Edition game. ${genericPrompt} Properly format spells, monsters, conditions, and so on. ${formatPrompt}`,
		},
		'foundry-ironsworn': {
			name: 'Ironsworn',
			prompt: `You are a game master for an Ironsworn game. ${genericPrompt} Properly format moves, oracle tables, and so on. ${formatPrompt}`,
		},
	};
})();

export const registerSettings = () => {
	// 'world' scope settings are available only to GMs
	game.settings.register(moduleName, 'useCustomGPT', {
		name: 'Use a custom/self-hosted GPT model',
		hint: 'Has to be compatible with OpenAI API. If enabled, the API key and model version settings will be ignored.',
		scope: 'world',
		config: true,
		type: Boolean,
		default: false,
	});

	game.settings.register(moduleName, 'customGPTUrl', {
		name: 'Custom GPT model URL',
		hint: 'URL of the custom GPT model. Has to be compatible with OpenAI API.',
		scope: 'world',
		config: true,
		type: String,
		default: 'http://localhost:1234',
	});
	
	game.settings.register(moduleName, 'apiKey', {
		name: 'OpenAI API key',
		hint: 'API key for ChatGPT from OpenAI. Get yours at https://platform.openai.com/account/api-keys .',
		scope: 'world',
		config: true,
		type: String,
		default: '',
	});

	Hooks.on('renderSettingsConfig', (_settingsConfig, element, _data) => {
		let apiKeyInput = element.find(`input[name='${moduleName}.apiKey']`)[0];
		if (apiKeyInput) {
			apiKeyInput.type = 'password';
			apiKeyInput.autocomplete = 'one-time-code';
		}
	});

	game.settings.register(moduleName, 'modelVersion', {
		name: 'ChatGPT model version',
		hint: 'Version of the ChatGPT model to use. Free accounts do not have access to GPT-4.',
		scope: 'world',
		config: true,
		type: String,
		default: 'gpt-3.5-turbo',
		choices: {
			'gpt-4': 'GPT-4',           // https://platform.openai.com/docs/models/gpt-4
			'gpt-3.5-turbo': 'GPT-3.5', // https://platform.openai.com/docs/models/gpt-3-5
		},
	});

	game.settings.register(moduleName, 'contextLength', {
		name: 'Context length',
		hint: 'Number of messages, including replies, ChatGPT has access to. Increases API usage cost. Context is not shared among users and resets on page reload.',
		scope: 'world',
		config: true,
		type: Number,
		default: 0,
		range: {min: 0, max: 50},
	});

	game.settings.register(moduleName, 'gameSystem', {
		name: 'Game system',
		hint: 'Optimize logic for the game system, including ChatGPT prompt.',
		scope: 'world',
		config: true,
		type: String,
		default: game.system.id in gameSystems ? game.system.id : 'generic',
		choices: Object.fromEntries(
			Object.entries(gameSystems).map(([id, desc]) => [id, desc.name])
		),
		onChange: id => console.log(`${moduleName} | Game system changed to '${id}',`,
			'ChatGPT prompt now is:', getGamePromptSetting()),
	});

	game.settings.register(moduleName, 'gamePrompt', {
		name: 'Custom ChatGPT prompt',
		hint: 'Overrides prompt for the game system above. Set to customize or refine ChatGPT behavior.',
		scope: 'world',
		config: true,
		type: String,
		default: gameSystems[game.settings.get(moduleName, 'gameSystem')].prompt,
		onChange: () => console.log(`${moduleName} | ChatGPT prompt now is:`, getGamePromptSetting()),
	});
}

export const getGamePromptSetting = () => {
	return game.settings.get(moduleName, 'gamePrompt').trim() ||
		gameSystems[game.settings.get(moduleName, 'gameSystem')].prompt;
}
