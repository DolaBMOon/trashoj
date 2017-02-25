all:
reset:
	cp default_config.json config.json
	cp default_db.json db.json
.PHONY: all reset
