// Gruntfile.js
module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Mocha
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          timeout: 5000,
          quiet: false, // Optionally suppress output to standard out (defaults to false)
          clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
        },
        src: ['test/**/*spec.js']
      }
    }

  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.registerTask('default', ['mochaTest']);
};