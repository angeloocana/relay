var gulp = require("gulp");
var ts = require("gulp-typescript");
var babel = require("gulp-babel");
//var rename = require("gulp-rename");
var webpack = require("gulp-webpack");

gulp.task("js", function () {
    // Using my existing tsconfig.json file
    var tsProject = ts.createProject(__dirname + "/tsconfig.json");

    // The `base` part is needed so
    //  that `dest()` doesnt map folders correctly after rename
    return tsProject.src()
        .pipe(tsProject())
        //.pipe(babel())
        // .pipe(rename(function (path) {
        //     path.extname = ".js";
        // }))
        .pipe(gulp.dest("dist/"));
});

gulp.task("webpack", function(){
	var conf = {
		output:{
                	filename: "bundle.js"
        	},
        	module:{
                	loaders: [
                       	 { test: /\.js$/, loader: 'babel-loader',
                        	        query: {presets:['react','es2015']}
                	        }
        	        ]
	        }

	};

	return gulp.src('dist/frontend/app.js')
		.pipe(webpack(conf))
		.pipe(gulp.dest('dist/public/'));
});
