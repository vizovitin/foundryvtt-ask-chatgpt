# Ask ChatGPT

Customizable ChatGPT integration for Foundry VTT.

![](https://img.shields.io/badge/Foundry_VTT-v10-informational)

## Installation

You can install the module using the following manifest URL:

## How to use

First enter you [OpenAI API key](https://platform.openai.com/account/api-keys) in the module settings.
Some popular game systems, such as [D&D 5e](https://foundryvtt.com/packages/dnd5e) are automatically
detected and supported w/o additional customizations. For others you may customize the ChatGPT prompt.

After that simply ask ChatGPT in the Foundry VTT chat!

Ask command `/?` will make the question and reply visible to all:

> GM: /? what's the cost of standing up from prone?

> GPT: Standing up from prone costs half of your movement speed.

Whisper command `/w gpt` will make the question and reply visible only to the sender and additional recipients:

> Player: /w [gpt, gm] time to don and doff armor

> GPT: According to the rules in the Player's Handbook, donning and doffing armor takes
> a specific amount of time depending on the type of armor:
>
> | Armor Type   | Donning Time | Doffing Time |
> | ------------ | ------------ | ------------ |
> | Light Armor  | 1 minute     | 1 minute     |
> | Medium Armor | 5 minutes    | 1 minute     |
> | Heavy Armor  | 10 minutes   | 5 minutes    |
> | Shield       | 1 action     | 1 action     |

## How it works

This module sends questions from the corresponding `/?` and `/w gpt` commands to the ChatGPT
and (generally) properly formats replies. It is also possible to have multi-message conversations
with ChatGPT, provided context length is increased in the module settings. Note that ChatGPT is
not aware of other messages in the chat log, or any other objects in your game.

ChatGPT behavior is primarily governed by a prompt, which by default depends on your game system,
but may also be overridden in the module settings.

Note that while ChatGPT is aware of several game system rulesets, adventures, items, creatures, and
so on, it may and will occasionally provide false information. However it's a great tool for DMs
to use for inspiration and quick generation of various bits of information.

> Note: Due to the way Foundry VTT modules function, your OpenAI API key is not really secret
> from your players.

## Acknowledgements

Inspired and partially based on [gpt4-dnd5e](https://github.com/ctbritt/gpt4-dnd5e).

Thanks to [OpenAI](https://openai.com) for awesome AI tools.
