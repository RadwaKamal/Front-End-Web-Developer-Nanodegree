/**
 * This is image helper for creating Image objects and caching them in case of resuing
 */

function image_helper() {

	let cachedImgs = {};
	let ctx;
	
	/**
	* @load
	* @param oneOrArr - one to create img for or array
	* @param {object} context
	*/
	function load(oneOrArr, context) {
		ctx = context;
		if(oneOrArr instanceof Array)
			oneOrArr.forEach((name) => _load(name))
		else 
			_load(oneOrArr)
	}

	function _load(name) {
		if (cachedImgs[name]) {
			return cachedImgs[name]
		} else {
			let img = new Image();
			img.src = `images/${name}.svg`;
			img.onload = function() {
				ctx.mozImageSmoothingEnabled = false;
				ctx.webkitImageSmoothingEnabled = false;
				ctx.msImageSmoothingEnabled = false;
				ctx.imageSmoothingEnabled = false;
				ctx.imageSmoothingQuality = "high";
			}

			cachedImgs[name] = img;
		}
	}	

	function get_img(name) {
		try {
			return cachedImgs[name]
		}
		catch(e) {
			throw `error occurred: ${e}`
		}
	}

	return {
		load: load,
		get_img: get_img
	}
}

module.exports = image_helper;