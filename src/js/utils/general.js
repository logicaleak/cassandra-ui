module.exports.calcCenterOfPolygon = function(polygonPoints) {
	var lngTotal = 0;
	var latTotal = 0;
	var count = 0;
	polygonPoints.forEach(function(point) {
		count = count + 1;
		var lat = point.lat;
		latTotal = lat + latTotal;
		var lng = point.lng;
		lngTotal = lngTotal + lng;
	});

	return {
		lat: latTotal / count,
		lng: lngTotal / count
	};

}