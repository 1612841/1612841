'use strict';

module.exports = function(grunt) {

    require('time-grunt')(grunt);
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
      });
    grunt.initConfig({
        sass: {
            dist: {
                files: {
                    'css/index.css': 'css/index.scss'
                }
            }
        },
        watch: {
            files: 'css/*.scss', //toi muon xem tat ca cac tap tin css trong muc scss cua toi
            tasks: ['sass'] //neu bat ki trong so chung duoc sua doi, thuc hien nhiem vu sua doi bang lenh nay
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [ // bat cu tap tin nao thay doi thi trinh duyet cung se load lai lan nua
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                    ],
                    option: {
                        watchTask: true, //watchTash dang chay dang running
                        server: {
                            baseDir: "./" //chi dinh thu muc dang lam viec
                        }
                    }
                }
            }
        },
        copy: {
            html: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: './',
                    src: ['*.html'],
                    dest: 'dist'
                }]
            },
            fonts: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'node_modules/font-awesome',
                    src: ['fonts/*.*'],
                    dest: 'dist'
                }]
            }
        },
        clean: {
            build: {
                src: ['dist/']
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd:'./',
                    src: ['img/*.{png,jpg,gif}'],
                    dest: 'dist/'
                }]
            }
        },
        useminPrepare: {
            foo: {
                dest: 'dist',
                src: ['contactus.html', 'aboutus.html', 'index.html']
            },
            options: {
                flow: {
                    steps: {
                        css: ['cssmin'],
                        js: ['uglify']
                    },
                    post: {
                        css:[{
                            name:'cssmin',
                            createConfig: function (context, block) {
                                var generated = context.options.generated;
                                generated.options = {
                                    keepSpecialComments: 0, rebase: false
                                };
                            }
                        }]
                    }
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {}
        },
        uglify: {
            dist: {}
        },
        cssmin: {
            dist: {}
        },
        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 20
            },
            release: {
                files: [{
                    src: [
                        'dist/js/*.js',
                        'dist/css/*.css'
                    ]
                }]
            }
        },
        usemin: {
            html: ['dist/contactus.html','dist/aboutus.html','dist/index.html'],
            options: {
                assetsDirs: ['dist', 'dist/css','dist/js']
            }
        },

        htmlmin: {                                         // Task
            dist: {                                        // Target
                options: {                                 // Target options
                    collapseWhitespace: true
                },
                files: {                                   // Dictionary of files
                    'dist/index.html': 'dist/index.html',  // 'destination': 'source'
                    'dist/contactus.html': 'dist/contactus.html',
                    'dist/aboutus.html': 'dist/aboutus.html',
                }
            }
        }


    });

    grunt.registerTask('css', ['sass']); /*chuyen doi sass -> css, grunt css enter */
    grunt.registerTask('default', ['browserSync', 'watch']); //thuc hien browserSync truoc roi watch sau, khong duoc nguoc lai
    grunt.registerTask('build', [
        'clean',
        'copy',
        'imagemin',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ]);
}
/* cai dat watch: npm install --save-dev grunt-contrib-watch xem thoi gian chuyen doi scss thanh css*/
/* cai dat browserSync: npm install --save-dev grunt-browser-sync  xem trang web trong trinh duyet, va sua doi no*/
// cau hinh cho 2 chuc nang tren