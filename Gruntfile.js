module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      all: {
        files: ['assets/style/scss/*.scss', 'assets/style/scss/**/*.scss', 'assets/script/*.js', 'assets/script/**/*.js'],
        tasks: ['webfont', 'clean', 'sass', 'cssmin', 'concat', 'uglify'],
        options: {
          spawn: false
        }
      }
    },

    webfont: {
      icons: {
        src:        'assets/images/icons/*.svg',
        dest:       'assets/fonts',
        destCss:    'assets/style/scss/base',
        options: {
          font:               'icon-font',
          autoHint:           false,
          engine:             'node',
          htmlDemo:           false,
          relativeFontPath:   '../font',
          syntax:             'bootstrap',
          stylesheet:         'scss',
          styles:             'icon',
          types:              'eot,woff2,woff,ttf,svg'
        }
      }
    },

    clean: {
      mincss: [
        'assets/style/css/master.min.css',
        'assets/style/css/master.css'
      ]
    },

    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'assets/style/css/master.css': 'assets/style/scss/master.scss'
        }
      }
    },

    cssmin: {
      minify: {
        expand: true,
        cwd: 'assets/style/css',
        src: ['*.css', '!*.min.css'],
        dest: 'assets/style/css',
        ext: '.min.css'
      }
    },

    concat: {
      app: {
        src: [
          'assets/javascript/master.js'
        ],
        dest: 'assets/javascript/master.concat.js'
      }
    },

    uglify: {
      app: {
        files: {
          'assets/javascript/master.min.js': ['assets/javascript/master.concat.js']
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
