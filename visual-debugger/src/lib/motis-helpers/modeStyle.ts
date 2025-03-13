import type { Mode, Rental } from '@data/type-declarations/planTypes.ts';

export type Colorable = {
	routeColor?: string;
	routeTextColor?: string;
	mode: Mode;
};

export type TripInfo = {
	tripId?: string;
	routeShortName?: string;
};

export type RentalInfo = {
	rental?: Rental;
};

export type LegLike = Colorable & TripInfo & RentalInfo;

/**
 * Returns the style for a given mode of transportation.
 *
 * @param l - An object representing a leg of a journey, containing the mode of transportation and optional rental information.
 * @returns A tuple containing:
 *  - The icon name for the mode of transportation.
 *  - The primary color for the mode of transportation.
 *  - The secondary color for the mode of transportation.
 *
 * The function handles various modes of transportation including walking, biking, rental vehicles, cars, and various forms of public transit.
 * For rental vehicles, it further distinguishes between different types such as bicycles, cargo bicycles, cars, mopeds, and scooters.
 * If the mode of transportation is not recognized, it defaults to returning a train icon with black and white colors.
 */
export const getModeStyle = (l: LegLike): [string, string, string] => {
	switch (l.mode) {
		case 'WALK':
			return ['walk', 'hsl(var(--foreground) / 1)', 'hsl(var(--background) / 1)'];

		case 'BIKE':
			return ['bike', '#075985', 'white'];

		case 'RENTAL':
			switch (l.rental?.formFactor) {
				case 'BICYCLE':
					return ['bike', '#075985', 'white'];
				case 'CARGO_BICYCLE':
					return ['cargo_bike', '#075985', 'white'];
				case 'CAR':
					return ['car', '#333333', 'white'];
				case 'MOPED':
					return ['moped', '#075985', 'white'];
				case 'SCOOTER_SEATED':
				case 'SCOOTER_STANDING':
					return ['scooter', '#075985', 'white'];
				case 'OTHER':
				default:
					return ['bike', '#075985', 'white'];
			}

		case 'CAR':
		case 'CAR_PARKING':
			return ['car', '#333333', 'white'];

		case 'TRANSIT':
		case 'BUS':
			return ['bus', '#ff9800', 'white'];
		case 'COACH':
			return ['bus', '#9ccc65', 'white'];

		case 'TRAM':
			return ['tram', '#ff9800', 'white'];

		case 'METRO':
			return ['sbahn', '#4caf50', 'white'];

		case 'SUBWAY':
			return ['ubahn', '#3f51b5', 'white'];

		case 'FERRY':
			return ['ship', '#00acc1', 'white'];

		case 'AIRPLANE':
			return ['plane', '#90a4ae', 'white'];

		case 'HIGHSPEED_RAIL':
			return ['train', '#9c27b0', 'white'];

		case 'LONG_DISTANCE':
			return ['train', '#e91e63', 'white'];

		case 'NIGHT_RAIL':
			return ['train', '#1a237e', 'white'];

		case 'REGIONAL_FAST_RAIL':
		case 'REGIONAL_RAIL':
		case 'RAIL':
			return ['train', '#f44336', 'white'];
	}

	return ['train', '#000000', 'white'];
};

export const getColor = (l: Colorable): [string, string] => {
	const [_, defaultColor, defaultTextColor] = getModeStyle(l);
	return !l.routeColor || l.routeColor === '000000'
		? [defaultColor, defaultTextColor]
		: ['#' + l.routeColor, '#' + l.routeTextColor || '000000'];
	
};

export const routeBorderColor = (l: Colorable) => {
	return `border-color: ${getColor(l)[0]}`;
};

export const routeColor = (l: Colorable) => {
	const [color, textColor] = getColor(l);
	return `background-color: ${color}; color: ${textColor}; fill: ${textColor}`;
};
