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
    },

    realFavicon: {
      favicons: {
        src: 'assets/images/favicons/master/master.png',
        dest: 'assets/images/favicons/dest/',
        options: {
          iconsPath: 'assets/images/favicons/dest/',
          html: [ 'index.html', 'venmo/index.html', 'creative-mornings/index.html', 'energy-hog/index.html', 'greatest-hotels/index.html' ],
          design: {
            ios: {
              pictureAspect: 'backgroundAndMargin',
              backgroundColor: '#ffffff',
              margin: '14%',
              assets: {
                ios6AndPriorIcons: false,
                ios7AndLaterIcons: false,
                precomposedIcons: false,
                declareOnlyDefaultIcon: true
              }
            },
            desktopBrowser: {},
            windows: {
              pictureAspect: 'noChange',
              backgroundColor: '#da532c',
              onConflict: 'override',
              assets: {
                windows80Ie10Tile: false,
                windows10Ie11EdgeTiles: {
                  small: false,
                  medium: true,
                  big: false,
                  rectangle: false
                }
              }
            },
            androidChrome: {
              pictureAspect: 'noChange',
              themeColor: '#ffffff',
              manifest: {
                display: 'standalone',
                orientation: 'notSet',
                onConflict: 'override',
                declared: true
              },
              assets: {
                legacyIcon: false,
                lowResolutionIcons: false
              }
            },
            safariPinnedTab: {
              pictureAspect: 'blackAndWhite',
              threshold: 95.3125,
              themeColor: '#5bbad5'
            }
          },
          settings: {
            scalingAlgorithm: 'Mitchell',
            errorOnImageTooSmall: false
          }
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
  grunt.loadNpmTasks('grunt-real-favicon');

  grunt.registerTask('default', ['webfont', 'clean', 'sass', 'cssmin', 'concat', 'uglify']);
};
