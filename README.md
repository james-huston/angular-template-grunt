# angular-template-grunt
This is a template for building reusable angular modules that include a grunt build process.

## Creating your repo based on this template
To fire up this template, create your own new empty repo and then run the following command from withing it's root directory.

	curl -o angular-template-grunt.zip \
	'http://stash.redventures.net/plugins/servlet/archive/projects/BOWM/repos/angular-template-grunt?at=refs%2Fheads%2Fmaster' \
	&& unzip angular-template-grunt.zip && rm -f angular-template-grunt.zip


## Customizing the template to your project
To customize the template to your project you need to rename a few things. 
	
* Edit the package.json file and change the "name" property to match your repo name.
* Edit the src/index.js file and change the name of the module to match your repo name.
* Edit the examples/index.html file and change the name of the js file in the last script tag to match the name of your project.

## Beginning development
### Install requirements
You must install the requirements for your project (npm and bower) before you can build/start development. You can change the requirements in the package.json and bower.json files if needed. Once you have things all set (or leave them alone to try things out) you need to run the following commans from the root of your repo.

	npm install
	bower install
	
You will now have your npm/node modules installed and your bower modules installed in the components/ directory.

### Do an initial build
To do an initial build of your project you can now run the following command.

	grunt
	
This will lint check your js files, run your unit tests (but NOT your e2e tests!), create your template files, concat everything together, and drop it into the build/ directory.

### And now the magic begins
Once you have an intial build finished you are ready to start developing. To get you build (including unit tests) to run as you edit files, run the following command in the root of your repo.

	grunt watch
	
This will fire up grunt and have it watch your src/ and tests/unit folders as well as Gruntfile.js and do a build whenever they change.

### File locations

#### JS source
Javascript source files should go somewhere under the src/ folder and end in with a .js file extension. These will all be concatted together and dumped in the build/<your-project-name>.js and build/<your-project-name>.min.js files.

#### HTML templates
Your HTML templates should go inside of the src/ folder (or a subdirectory) and end in .tpl.html. These will be converted to Javascript magically using the HTML2JS Grunt module and then be concatted into the build/ project files along with the rest of your JS.

To access your templates from inside of your module, use their path from the root of the project. For example to get to src/index.tpl.html inside of a json object you would use something like:

	{
		templateUrl: 'src/index.tpl.html'
	}
	
The key here is the the single quotes around the name of the template that tell Angular to first look in it's template cache for the template before attempting to load it from the server using an XHR request. Tricksie this is.

#### Unit Tests
Unit tests live in the tests/unit folder. They should have the same name as the file in src/ that they are testing except that they should end in .spec.js instead of .js. For example if your module file is src/superapp.js then your unit test file should be tests/unit/superapp.spec.js.

The library used for validating tests is [Jasmine](http://pivotal.github.io/jasmine/) so all of the functionality available in the Jasmine testing environment should be available to you.

#### EndToEnd (e2e) Tests
EndToEnd (e2e) tests are used to test your module in a full browser. This allows you to emulate user actions in various browsers to verify that it acts like it should.

Your e2e reside in the tests/e2e/ folder. Generally speaking they should follow the same naming scheme as your unit tests. You may need to test a large range of functionality here though so it's likely a different organization is required. As long as your files are somewhere under tests/e2e/ and end in .spec.js they will be executed as e2e tests.

The e2e testing is run using the [angular_scenario](http://docs.angularjs.org/guide/dev_guide.e2e-testing) runner for [Karma](http://karma-runner.github.io/0.8/index.html). It uses a subset of functionality similiar to Jasmine but geared towards the DOM. You can read more on the [angular website](http://docs.angularjs.org/guide/dev_guide.e2e-testing).

As an example, the following test is fine for a unit test.

	describe('When running a bogus test', function () {
		it('should find true to be truthy', function () {
			expect(true).toBeTruthy()
		});
	});
	
This test will NOT work in and e2e test because oddly enough you will find true to be undefined. This is because the expect statement works differently in the e2e world and is expecting something related to the browser DOM as it's parameter. True is not one of those things.

## Running your unit tests
If you need to manually run your unit tests (i.e. you aren't using "grunt watch" to do things for you) you can do so with the following command.

	grunt karma:unit
	
## Running EndToEnd (e2e) tests
Your e2e tests are the similiar to unit tests except they test your module from the browser UI side. This allows you to load things up in the browser and simulate browser actions such as filling in inputs, clicking buttons, etc. in your unit tests. To run your end to end unit tests you have to first have your local dev server running so make sure you have already started your 'grunt watch' command.

Once grunt has your dev server up and running you can run your karma e2e test with the following command.

	grunt karma:e2e
	
This will launch the browser(s) specified in your configs/karma_e2e.config.js file and run your test files from tests/e2e/\*\*/*.spec.js in each browser. 

These tests are not run automatically with a standard build because they take longer than standard unit tests (significantly since you have been very thourough and written many of them right?). 

## Installing your module in an application
To install your module in an application, you need to manually add a line to the bower.json file of your application. This is because our modules are not registered in the public bower registry. If we were going to use our template module in an app the bower.json file would look something like this.

	{
		"name": "ng-boilerplate",
		"version": "0.2.0",
		"dependencies": {
			"angular": "latest",
			"angular-template-grunt": "https://github.com/james-huston/angular-template-grunt.git"
		}
	}
	
This assumes that the angular-template-grunt repo is publically readable. If it is not, you will need to use an SSH URL and it will look like this.

	{
		"name": "ng-boilerplate",
		"version": "0.2.0",
		"dependencies": {
			"angular": "latest",
			"angular-template-grunt": "https://github.com/james-huston/angular-template-grunt.git"
		}
	}

If you want to install a specific/approximate version or tag you can do so by adding it after the .git on the url in the form of #<tag>. For example to get version a version greater than or equal 0.3.0:

	{
		"name": "ng-boilerplate",
		"version": "0.2.0",
		"dependencies": {
			"angular": "latest",
			"angular-template-grunt": "https://github.com/james-huston/angular-template-grunt.git#>0.3.0"
		}
	}

And finally if you want exactly version 0.3.0:

	{
		"name": "ng-boilerplate",
		"version": "0.2.0",
		"dependencies": {
			"angular": "latest",
			"angular-template-grunt": "https://github.com/james-huston/angular-template-grunt.git#0.3.0"
		}
	}
