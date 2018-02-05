var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require( 'gulp-util' );
//var ftp = require( 'vinyl-ftp' );
var ftp = require( 'gulp-sftp' );

var fileGlobsToWatch = [
	'src/**',
	'css/**',
	'js/**',
	'fonts/**',
	'template-parts/**',
	'*.php',
	'*.css'
];

//Sass builder
gulp.task('styles', function() {
    gulp.src('sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css/'))
});

//Ftp sync
gulp.task('deploy-push', function () {

	var conn = ftp( {
		host:     'redvanworkshop.com',
		user:     'rvwtheme',
		password: 'HkZGNy9pYEzwBEUYnAgB',
		remotePath: 'wp-content/themes/redvan-child/.'
	} );

	return gulp.src( fileGlobsToWatch, { base: '.', buffer: false } )
		.pipe(conn)
		//.newer( '/wp-content/themes/twentyseventeen' ) ) // only upload newer files
		//.pipe( conn.dest( '/wp-content/themes/twentyseventeen' ) );

} );
//https://loige.co/gulp-and-ftp-update-a-website-on-the-fly/

//Watch task
gulp.task('default',function() {
    gulp.watch('sass/**/*.scss',['styles']);
});
