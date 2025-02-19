export const formatDurationSec = (t: number): string => {
	const hours = Math.floor(t / 3600);
	const minutes = Math.ceil((t - hours * 3600) / 60);
	const str = [
		hours !== 0 ? hours + ' h' : '',
		minutes !== 0 || hours === 0 ? minutes + ' min' : ''
	]
		.join(' ')
		.trim();
	return str;
};

export const formatDistanceMeters = (m: number): string => {
	const kilometers = Math.floor(m / 1000);
	const meters = kilometers > 5 ? 0 : Math.ceil(m - kilometers * 1000);
	const str = [kilometers !== 0 ? kilometers + ' km' : '', meters !== 0 ? meters + ' m' : '']
		.join(' ')
		.trim();
	return str;
};

export const formatDurationSecWithSeconds = (t: number): string => {
    const hours = Math.floor(t / 3600);
    const minutes = Math.floor((t - hours * 3600) / 60);
    const seconds = (t - hours * 3600) % 60;
    const str = [
        hours !== 0 ? hours + ' h' : '',
        minutes !== 0 || hours === 0 ? minutes + ' min' : '',
        seconds !== 0 || hours !== 0 || minutes === 0 ? seconds + ' sec' : ''
    ]
        .join(' ')
        .trim();
    return str;
};