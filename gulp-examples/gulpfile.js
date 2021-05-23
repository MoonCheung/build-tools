let gulp = require('gulp') //获取gulp模块
let uglify = require('gulp-uglify') //用来压缩JS
let minifycss = require('gulp-minify-css') //用来压缩CSS
let imagemin = require('gulp-imagemin') //压缩图片,提高图片加载速度
let sass = require('gulp-sass') //用来压缩sass
let gutil = require('gulp-util') //gulp自带输出有带时间和颜色，利用这个实现效果
let watchPath = require('gulp-watch-path') //获取编译路径和输出路径
let combiner = require('stream-combiner2') //用来捕获错误信息
let sourcemaps = require('gulp-sourcemaps') //用来谷歌调试
let autoprefixer = require('gulp-autoprefixer') //会补全各个浏览器前缀

// ************************ 小白第一次学习gulp ************************
// //task作为核心文件，可压缩js文件，在命令行使用gulp script 启动此任务
// gulp.task('script', function(){
// 	//1.找到文件
// 	gulp.src('./client/js/*.js')
// 	//2.压缩文件
// 			.pipe(uglify())
// 	//3.另存压缩后文件路径
// 			.pipe(gulp.dest('dist/js'))	
// })

// gulp.task('css', function(){
// 	gulp.src('./client/css/*.css')
// 			.pipe(minifycss())
// 			.pipe(gulp.dest('dist/css'))
// })

// gulp.task('sass', function(){
// 	return gulp.src('./client/sass/*.scss')
// 						 .pipe(sass().on('error', sass.logError))
// 						 .pipe(gulp.dest('dist/css'))
// })

// //在命令行使用 gulp auto 启动此任务
// gulp.task('auto', function(){
// 	//监听文件修改，当文件被修改则执行 script 任务
// 	gulp.watch('./client/js/*.js', ['script'])
// })

// //在命令行使用 gulp 启动此任务,会运行script, auto任务
// gulp.task('default', ['script', 'auto'])

// ************************ 小白第二次学习gulp构建项目 ************************

// gulp.task('uglifyjs', function(){
// 	gulp.src('./client/js/**/*.js')
// 			.pipe(uglify())
// 			.pipe(gulp.dest('dist/js'))
// })

// gulp.task('default', function(){
// 	gulp.watch('./client/js/**/*.js' ,['uglifyjs'])
// })

var handleError = function(err) {
  var colors = gutil.colors;
  console.log('\n');
  gutil.log(colors.red('Error!'))
  gutil.log('fileName: ' + colors.red(err.fileName))
  gutil.log('lineNumber: ' + colors.red(err.lineNumber))
  gutil.log('message: ' + err.message)
  gutil.log('plugin: ' + colors.yellow(err.plugin))
}

gulp.task('watchjs', function() {
  gulp.watch('client/js/**/*.js', function(event) {
    var paths = watchPath(event, 'client/', 'dist/')
    /*
    	paths
    			{ srcPath: 'client/js/log.js',
    				srcDir: 'client/js/',
    				distPath: 'dist/js/log.js',
    				distDir: 'dist/js/',
    				srcFilename: 'log.js',
    				distFilename: 'log.js' }
    */
    gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
    gutil.log('Dist: ' + paths.distPath)
    // gulp.src(paths.srcPath)
    // 		 .pipe(uglify())
    // 		 .pipe(gulp.dest(paths.distDir))

    var combined = combiner.obj([
      gulp.src(paths.srcPath),
      sourcemaps.init(),
      uglify(),
      sourcemaps.write('./'),
      gulp.dest(paths.distDir)
    ])

    combined.on('error', handleError)
  })
})

gulp.task('uglifyjs', function() {
  var combined = combiner.obj([
    gulp.src('client/js/**/*.js'),
    sourcemaps.init(),
    uglify(),
    sourcemaps.write('./'),
    gulp.dest('dist/js/')
  ])

  combined.on('error', handleError)
})

gulp.task('watchcss', function() {
  gulp.watch('client/css/**/*.css', function(event) {
    var paths = watchPath(event, 'client/', 'dist/')
    gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
    gutil.log('Dist: ' + paths.distPath)

    gulp.src(paths.srcPath)
      .pipe(sourcemaps.init())
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(minifycss())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(paths.distDir))
  })
})

gulp.task('watchimage', function() {
  gulp.watch('client/images/**/*', function() {
    var paths = watchPath(event, 'client/', 'dist/')
    gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
    gutil.log('Dist: ' + paths.distPath)

    gulp.src(paths.srcPath)
      .pipe(imagemin({
        progressive: true
      }))
      .pipe(gulp.dest(paths.distDir))
  })
})

gulp.task('image', function() {
  gulp.src('client/images/**/*')
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(gulp.dest('dist/images/'))
})

gulp.task('watchcopy', function() {
  gulp.watch('client/fonst/**/*', function(event) {
    var paths = watchPath(event, 'client/', 'dist/')
    gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
    gutil.log('Dist: ' + paths.distPath)

    gulp.src(paths.srcPath)
      .pipe(gulp.dest(paths.distDir))

  })
})

gulp.task('copy', function() {
  gulp.src('client/fonst/**/*')
    .pipe(gulp.dest('dist/fonst/'))
})


gulp.task('default', [
  //build
  'uglifyjs', 'image', 'copy',
  //watch
  'watchjs', 'watchcss', 'watchimage', 'watchcopy'
])