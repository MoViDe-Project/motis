<script lang="ts">
	import { Combobox } from 'bits-ui';
	import { geocode, type Match } from './openapi';
	import Bus from 'lucide-svelte/icons/bus-front';
	import House from 'lucide-svelte/icons/map-pin-house';
	import Place from 'lucide-svelte/icons/map-pin';
	import { posToLocation, type Location } from './Location';
	import { GEOCODER_PRECISION } from './Precision';
	import { language } from './i18n/translation';

	const COORD_LVL_REGEX = /^([+-]?\d+(\.\d+)?)\s*,\s*([+-]?\d+(\.\d+)?)\s*,\s*([+-]?\d+(\.\d+)?)$/;
	const COORD_REGEX = /^([+-]?\d+(\.\d+)?)\s*,\s*([+-]?\d+(\.\d+)?)$/;

	let {
		items = $bindable([]),
		selected = $bindable(),
		placeholder,
		name
	}: {
		items?: Array<Location>;
		selected: Location;
		placeholder?: string;
		name?: string;
	} = $props();

	let inputValue = $state('');
	let value = $state('');

	const getDisplayArea = (match: Match | undefined) => {
		if (match) {
			const matchedArea = match.areas.find((a) => a.matched);
			const defaultArea = match.areas.find((a) => a.default);
			if (matchedArea?.name.match(/^[0-9]*$/)) {
				matchedArea.name += ' ' + defaultArea?.name;
			}
			let area = (matchedArea ?? defaultArea)?.name;
			if (area == match.name) {
				area = match.areas[0]!.name;
			}
			return area;
		}
		return '';
	};

	const getLabel = (match: Match) => {
		const displayArea = getDisplayArea(match);
		return displayArea ? match.name + ', ' + displayArea : match.name;
	};

	const updateGuesses = async () => {
		const coordinateWithLevel = inputValue.match(COORD_LVL_REGEX);
		if (coordinateWithLevel) {
			selected = posToLocation(
				[Number(coordinateWithLevel[3]), Number(coordinateWithLevel[1])],
				Number(coordinateWithLevel[5])
			);
			items = [];
			return;
		}

		const coordinate = inputValue.match(COORD_REGEX);
		if (coordinate) {
			selected = posToLocation([Number(coordinate[3]), Number(coordinate[1])], 0);
			items = [];
			return;
		}

		const { data: matches, error } = await geocode({
			query: { text: inputValue, language }
		});
		if (error) {
			console.error('TYPEAHEAD ERROR: ', error);
			return;
		}
		items = matches!.map((match: Match): Location => {
			return {
				label: getLabel(match),
				value: { match, precision: GEOCODER_PRECISION }
			};
		});
		const shown = new Set<string>();
		items = items.filter((x) => {
			const entry = x.value.match?.type + x.label!;
			if (shown.has(entry)) {
				return false;
			}
			shown.add(entry);
			return true;
		});
		preventClickthrough(!!items.length && comboOpen);
	};

	const deserialize = (s: string): Location => {
		const x = JSON.parse(s);
		return {
			value: x,
			label: getLabel(x.match)
		};
	};

	$effect(() => {
		value = JSON.stringify(selected.value);
		inputValue = selected.label!;
	});

	let ref = $state<HTMLElement | null>(null);
	$effect(() => {
		if (ref && inputValue) {
			(ref as HTMLInputElement).value = inputValue;
		}
	});

	let timer: number;
	$effect(() => {
		if (inputValue) {
			clearTimeout(timer);
			timer = setTimeout(() => {
				updateGuesses();
			}, 150);
		}
	});

	let comboOpen = false;
	const preventClickthrough = (prevent: boolean) => {
		const ctr = document.getElementById('searchmask-container')!;
		if (prevent) {
			ctr.style.pointerEvents = 'none';
		} else {
			window.setTimeout(() => (ctr.style.pointerEvents = 'auto'), 1);
		}
	};
</script>

<Combobox.Root
	type="single"
	allowDeselect={false}
	{value}
	onValueChange={(e: string) => {
		if (e) {
			selected = deserialize(e);
			inputValue = selected.label!;
		}
	}}
	onOpenChange={(open) => {
		comboOpen = open;
		preventClickthrough(open);
	}}
>
	<Combobox.Input
		{placeholder}
		{name}
		bind:ref
		class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
		autocomplete="off"
		oninput={(e) => (inputValue = e.currentTarget.value)}
		aria-label={placeholder}
		data-combobox-input={inputValue}
	/>
	{#if items.length !== 0}
		<Combobox.Portal>
			<Combobox.Content
				align="start"
				class="absolute top-2 w-[var(--bits-combobox-anchor-width)] z-10 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md outline-none"
			>
				{#each items as item (item.value)}
					<Combobox.Item
						class="flex w-full cursor-default select-none items-center rounded-sm py-4 pl-4 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50"
						value={JSON.stringify(item.value)}
						label={item.label}
					>
						{#if item.value.match?.type == 'STOP'}
							<Bus />
						{:else if item.value.match?.type == 'ADDRESS'}
							<House />
						{:else if item.value.match?.type == 'PLACE'}
							<Place />
						{/if}
						<span class="ml-4 font-semibold text-nowrap text-ellipsis overflow-hidden">
							{item.value.match?.name}
						</span>
						<span class="ml-2 text-muted-foreground text-nowrap text-ellipsis overflow-hidden">
							{getDisplayArea(item.value.match)}
						</span>
					</Combobox.Item>
				{/each}
			</Combobox.Content>
		</Combobox.Portal>
	{/if}
</Combobox.Root>
