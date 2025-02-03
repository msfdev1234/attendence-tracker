const distanceBetweenTwoPoints = (lat1, lon1, lat2, lon2) => {
	if (lat1 === lat2 && lon1 === lon2) {
		return 0; // No distance if the coordinates are the same
	} else {
		const radlat1 = (Math.PI * lat1) / 180;
		const radlat2 = (Math.PI * lat2) / 180;
		const theta = lon1 - lon2;
		const radtheta = (Math.PI * theta) / 180;
		let dist =
			Math.sin(radlat1) * Math.sin(radlat2) +
			Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = (dist * 180) / Math.PI; // Convert radian to degree
		dist = dist * 60 * 1.1515; // Degrees to miles
		dist = dist * 1609.34; // Miles to meters
		return dist;
	}
};

export default distanceBetweenTwoPoints;
