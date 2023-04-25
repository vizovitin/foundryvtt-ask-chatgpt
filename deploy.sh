#!/bin/bash

set -e
cd "`dirname "$0"`"

MODULE_NAME="ask-chatgpt"
: ${FOUNDRY_DEPLOY_VERSION:=0.0.1-dev}

if [ -z "$FOUNDRY_DEPLOY_TARGET" -o "$1" = "-h" -o "$1" = "--help" ]; then
	cat <<-EOT
		Usage: FOUNDRY_DEPLOY_TARGET="user@host:/path/to/foundry-vtt-data-dir" ./`basename "$0"` [ rsync-arg ... ]

		Environment variables:
		  FOUNDRY_DEPLOY_TARGET     deploy path
		  FOUNDRY_DEPLOY_VERSION    module version (optional)
		EOT
	exit 2
fi

FILES=(
	module.json
	scripts
	styles
)

trap -- 'mv -f module.json.orig module.json' EXIT
sed -i.orig -e "s|#{VERSION}#|$FOUNDRY_DEPLOY_VERSION|" module.json

rsync -avizcC --delete --safe-links --exclude-from .gitignore "$@" \
	"${FILES[@]}" \
	"$FOUNDRY_DEPLOY_TARGET/Data/modules/$MODULE_NAME/"
