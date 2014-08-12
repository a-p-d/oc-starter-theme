module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({

    // Metadata
    pkg: grunt.file.readJSON('package.json'),

    banner: '/*!\n' +
            ' * <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>) \n' +
            ' * Copyright <%= pkg.author.name %> \n' +
            ' * Licensed under <%= pkg.license.type %> \n' +
            ' */\n',

    // Task configuration.
    clean: {
      css: ["assets/stylesheets/*.css"],
      js: ["assets/scripts/*.js"],
      fonts: ["assets/fonts/"]
    },

    // CSS Compile
    less: {
      main: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: 'main.css.map',
          sourceMapFilename: 'assets/stylesheets/less/main.css.map'
        },
        files: {
          'assets/stylesheets/main.css': 'assets/stylesheets/less/main.less'
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: [
          'Android 2.3',
          'Android >= 4',
          'Chrome >= 20',
          'Firefox >= 24', // Firefox 24 is the latest ESR
          'Explorer >= 8',
          'iOS >= 6',
          'Opera >= 12',
          'Safari >= 6'
        ]
      },
      main: {
        options: {
          map: true
        },
        src: 'assets/stylesheets/main.css'
      }
    },
    
    csscomb: {
      options: {
        config: 'config/.csscomb.json'
      },
      main: {
        files: {
          'assets/stylesheets/main.css': ['assets/stylesheets/main.css']
        }
      }
    },

    usebanner: {
      options: {
        position: 'top',
        banner: '<%= banner %>'
      },
      css: {
        src: 'assets/stylesheets/*.css'
      }
    },

    // JS compile
    concat: {
     options: {
        banner: '<%= banner %>\n<%= jqueryCheck %>',
        stripBanners: false
      },
      main: {
        src: ["assets/scripts/partials/*.js"],
        dest: 'assets/scripts/main.js'
      }
    },
    
    jshint: {
      options: {
        jshintrc: 'config/.jshintrc'
      },
      main: {
        src: 'assets/scripts/main.js'
      }
    },
        
    // Copy assets from the vendor folder
    copy: {
      fontawesome: {
        expand: true,
        flatten: true,
        src: 'assets/vendor/font-awesome/fonts/*',
        dest: 'assets/fonts/'
      }
    },
  });

  // Autoload Grunt plugins from the devDependencies array of package.json 
  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });

  // Tasks
  grunt.registerTask('css-compile', ['clean:css', 'less', 'autoprefixer', 'csscomb', 'usebanner:css']);
  grunt.registerTask('js-compile', ['clean:js', 'concat', 'jshint' ]);
  grunt.registerTask('fonts-compile', ['clean:fonts', 'copy:fontawesome' ]);
  grunt.registerTask('build', ['css-compile', 'js-compile', 'fonts-compile']);
  
};