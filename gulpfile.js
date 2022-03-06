const { src, dest, watch, series, parallel } = require("gulp");

// CSS y SASS
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sourcemaps = require('gulp-sourcemaps');

// imagenes
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done) {
	// Compilar sass

	src('src/scss/app.scss') // 1. Identificar archivo
		.pipe(sourcemaps.init())
		.pipe(sass()) // 2. Compilarlo - compressed: minifica el archivo sass({ outputStyle: 'compressed' })
		.pipe(postcss([autoprefixer()])) // para dar soporte a navegadores como IE
		.pipe(sourcemaps.write('.'))
		.pipe(dest('build/css')); // 3. Guardar el .css

	done();
}

function imagenes() {
	return src("src/img/**/*")
		.pipe(imagemin({ optimizationLevel: 3 }))
		.pipe(dest("build/img"));
}

function versionWebp() {
	const opciones = {
		quality: 50,
	};
	return src("src/img/**/*.{png,jpg}")
		.pipe(webp(opciones))
		.pipe(dest("build/img"));
}

function versionAvif() {
	const opciones = {
		quality: 50,
	};
	return src("src/img/**/*.{png,jpg}")
		.pipe(avif(opciones))
		.pipe(dest("build/img"));
}

function dev() {
	watch("src/scss/**/*.scss", css);
	watch("src/img/**/*", imagenes);
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series(imagenes, versionWebp, versionAvif, css, dev);

// series: inicia una tarea, y cuando finaliza, inicia la siguiente
// parallel: todas inician al mismo tiempo
