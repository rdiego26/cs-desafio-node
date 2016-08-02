var grunt = require('grunt');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-jscs');
grunt.loadNpmTasks('grunt-mocha-test');
grunt.loadNpmTasks('grunt-mocha-istanbul');
grunt.loadNpmTasks('grunt-contrib-jshint');

grunt.initConfig({

  watch: {
    scripts: {
      files: ['src/**/*.{js,json}', '*.js', 'test/**/*.js'],
      tasks: ['default']
    }
  },
  env: {

  },
  jscs: {
    all: ['src/**/*.js', 'test/**/*.js'],
    options: {
      config: './src/.jscsrc'
    }
  },
  mochaTest: {
    all: {
      options: {
        reporter: 'spec'
      },
      src: ['test/**/*.js']
    },
    unit: {
      options: {
        reporter: 'spec'
      },
      src: ['test/specs/*.js']
    },
    api: {
      options: {
        reporter: 'spec'
      },
      src: ['test/api/*.js']
    }
  },
  jshint: {
    all: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
    options: {
      "curly": true,
      "eqeqeq": true,
      "undef": true,
      "esversion": 6,
      "globals": {
        "process": true,
        "module": true,
        "require": true,
        "console": true,
        "describe": true,
        "it": true,
        "before": true,
        "after": true,
        "afterEach": true
      }
    }
  },
  mocha_istanbul: {
    coverage: {
      src: ['test/*.js', 'test/specs/*.js', 'test/api/*.js'],
      options: {
        excludes: ['src/.jscsrc']
      }
    }
  }
});

grunt.registerTask('dev', ['jscs:all', 'jshint', 'mocha_istanbul', 'watch']);
grunt.registerTask('coverage', ['mocha_istanbul']);
grunt.registerTask('default', ['jscs:all', 'jshint', 'mocha_istanbul', 'mochaTest:unit']);