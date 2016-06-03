noop:
	
publish_patch:
	npm version patch && git push --all origin && git push --tags && npm publish
publish_minor:
	npm version minor && git push --all origin && git push --tags && npm publish
publish_major:
	npm version major && git push --all origin && git push --tags && npm publish
