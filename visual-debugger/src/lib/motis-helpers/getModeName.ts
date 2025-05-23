import type { Leg } from '@data/type-declarations/planTypes.ts';

import { t } from '@/motis-helpers/i18n/translation.ts';


export const getModeName = (l: Leg) => {
	switch (l.mode) {
		case 'WALK':
			return t.walk;
		case 'BIKE':
			return t.bike;
		case 'RENTAL':
			switch (l.rental?.formFactor) {
				case 'BICYCLE':
					return t.bike;
				case 'CARGO_BICYCLE':
					return t.cargoBike;
				case 'CAR':
					return t.car;
				case 'MOPED':
					return t.moped;
				case 'SCOOTER_SEATED':
					return t.scooterSeated;
				case 'SCOOTER_STANDING':
					return t.scooterStanding;
				case 'OTHER':
				default:
					return t.bike;
			}
		case 'CAR':
		case 'CAR_PARKING':
			return t.car;
		default:
			return `${l.mode}`;
	}
};
