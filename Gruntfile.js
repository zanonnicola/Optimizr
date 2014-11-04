module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        smushit: {
            mygroup: {
                src: ['html/img/*.png','html/img/*.jpg'],
                dest: 'html/build/img/'
            }
        },
        uncss: {
          dist: {
            files: {
              'html/build/css/global.css': ['html/index.html']
            }
          }
        },
        concat: {
            dist: {
                src: [
                    'html/js/*.js' // All JS in the libs folder
                ],
                dest: 'html/build/js/concat.js',
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            all: {
                files: {
                    'html/build/js/concat.js': ['html/build/js/concat.js']
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                  'html/build/css/global.css': ['html/css/*.css']
                }
            }
        },
        inlinecss: {
            main: {
                options: {
                },
                files: {
                    'html/build/index.html': 'html/index.html'
                }
            }
        },
        imagemin: {                          // Task
            dynamic: {                         // Another target
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'html/build/img/',                   // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'html/build/img/'                  // Destination path prefix
                }]
            }
        }
    });

    // 3. Where I tell Grunt I plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-smushit');
    grunt.loadNpmTasks('grunt-inline-css');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-newer');

    // 4. Where I tell Grunt what to do when I type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'uglify', 'cssmin', 'uncss', 'inlinecss', 'newer:imagemin']);

};