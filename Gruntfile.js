module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      stylesheets: {
        files: ['assets/stylesheets/scss/*.scss', 'assets/stylesheets/scss/**/*.scss'],
        tasks: ['clean', 'sass', 'cssmin'],
        options: {
          spawn: false
        }
      },
      javascripts: {
        files: ['assets/javascript/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: false
        }
      },
      icons: {
        files: ['assets/images/icons/*.svg'],
        tasks: ['webfont', 'clean', 'sass', 'cssmin'],
        options: {
          spawn: false
        }
      }
    },

    webfont: {
      icons: {
        src:        'assets/images/icons/*.svg',
        dest:       'assets/fonts',
        destCss:    'assets/stylesheets/scss/base',
        options: {
          font:               'icon-font',
          autoHint:           false,
          engine:             'node',
          htmlDemo:           false,
          relativeFontPath:   '../fonts',
          syntax:             'bootstrap',
          stylesheet:         'scss',
          styles:             'icon',
          types:              'eot,woff2,woff,ttf,svg'
        }
      }
    },

    clean: {
      mincss: [
        'assets/stylesheets/css/master.min.css',
        'assets/stylesheets/css/master.css'
      ]
    },

    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'assets/stylesheets/css/master.css': 'assets/stylesheets/scss/master.scss'
        }
      }
    },

    cssmin: {
      minify: {
        expand: true,
        cwd: 'assets/stylesheets/css',
        src: ['*.css', '!*.min.css'],
        dest: 'assets/stylesheets/css',
        ext: '.min.css'
      }
    },

    concat: {
      app: {
        src: [
          'assets/javascript/master.js'
        ],
        dest: 'assets/javascript/dist/master.concat.js'
      }
    },

    uglify: {
      app: {
        files: {
          'assets/javascript/dist/master.min.js': ['assets/javascript/dist/master.concat.js']
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-webfont');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['webfont', 'clean', 'sass', 'cssmin', 'concat', 'uglify']);
};
