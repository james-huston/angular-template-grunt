build:
	@npm install
	@bower install
	@grunt

clean:
	@rm -f $(LIB)
