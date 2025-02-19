/**
 * Pads a given number with a leading zero if it is a single digit.
 *
 * @param x - The number to be padded.
 * @returns A string representation of the number, padded with a leading zero if necessary.
 */
const pad = (x: number) => ('0' + x).slice(-2);

/**
 * Formats a given Date object into a string with the format "HH:MM".
 *
 * @param d - The Date object to format.
 * @returns A string representing the formatted time.
 */
export const formatTime = (d: Date): string => {
	return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export const formatStringTime = (s: string) : string =>{
	let d = new Date(s);
	return formatTime(d);
}

