const { src, dest, watch, series, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

function css(done) {
	// Compilar sass

	src("src/scss/app.scss") // 1. Identificar archivo
		.pipe(sass()) // 2. Compilarlo - compressed: minifica el archivo sass({ outputStyle: 'compressed' })
		.pipe(postcss([autoprefixer()])) // para dar soporte a navegadores como IE
		.pipe(dest("build/css")); // 3. Guardar el .css

	done();
}

function imagenes() {
	return src("src/img/**/*").pipe(dest("build/img"));
}

function dev() {
	watch("src/scss/**/*.scss", css);
	watch("src/img/**/*", imagenes);
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.default = series(imagenes, css, dev);

// series: inicia una tarea, y cuando finaliza, inicia la siguiente
// parallel: todas inician al mismo tiempo
