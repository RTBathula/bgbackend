module.exports = function(grunt) {

    var  pjson = grunt.file.readJSON('package.json');

    var config = {
        concat: {
            sdk: {
                // the files to concatenate
                    src: ['src/Promises.js','src/CloudApp.js','src/ACL.js','src/CloudNotifications.js','src/CloudObject.js','src/CloudQuery.js','src/CloudSearch.js'
                    ,'src/CloudUser.js','src/CloudRole.js','src/CloudFile.js','src/CloudGeoPoint.js', 'src/PrivateMethods.js'],

                    // the location of the resulting JS file
                    dest: 'dist/cloudboost.js'
                },

            test:{
              // the files to concatenate
                    src: [
                        'test/requireCloudBoost.js',
                        'test/util/util.js',
                        'test/serverTest.js',
                        'test/init/init.js',
                        'test/ACL/*.js',
                        'test/CloudFile/*.js',
                        'test/CloudObject/*.js',
                        'test/CloudExpire/*.js',
                        'test/CloudNotification/*.js',
                        'test/CloudGeoPoint/*.js',
                        'test/CloudQuery/*.js',
                        'test/CloudSearch/*.js',
                        'test/CloudUser/*.js',
                        'test/CloudRole/*.js',
                        'test/CloudApp/*.js'
                    ],
                    dest: 'test/test.js'
                },

            stagingTest:{
                    src: [
                        'test/requireCloudBoost.js',
                        'test/util/util.js',
                        'test/stageTest.js',
                        'test/init/init.js',
                        'test/ACL/*.js',
                        'test/CloudFile/*.js',
                        'test/CloudObject/*.js',
                        'test/CloudExpire/*.js',
                        'test/CloudNotification/*.js',
                        'test/CloudGeoPoint/*.js',
                        'test/CloudQuery/*.js',
                        'test/CloudSearch/*.js',
                        'test/CloudUser/*.js',
                        'test/CloudRole/*.js',
                        'test/CloudApp/*.js'
                    ],
                    dest: 'test/stagingTest.js'
                },

            sdkRelease: {
                // the files to concatenate
                    src: ['dist/cloudboost.js'],

                    // the location of the resulting JS file
                    dest: 'dist/'+pjson.version+'.js'
                },
            },

            uglify:{
                uglifyDev: {
                    files: {
                        'dist/cloudboost.min.js': ['dist/cloudboost.js']
                    }
                },
                uglifyRelease: {
                    files: {
                        
                    }
                }
            },

            bumpup: 'package.json' //update the version of package.json
        };


    config.uglify.uglifyRelease.files['dist/'+pjson.version+'.min.js']=  ['dist/'+pjson.version+'.js'];

    grunt.initConfig(config);

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-bumpup');
    
    grunt.registerTask('default',['concat:sdk','concat:test','concat:stagingTest','bumpup','uglify:uglifyDev']);
    grunt.registerTask('release',['concat:sdkRelease','uglify:uglifyRelease']);
    
};
