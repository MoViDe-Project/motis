<p align="center"><img src="./static/logo.svg" width="196" height="196"></p>

> Built with [sv](https://github.com/sveltejs/cli) and [SvelteKit](https://svelte.dev/docs/kit/introduction).

**MoViDe** (**MO**TIS **Vi**sual **De**bugger) is a tool for visually comparing outputs from multiple public transit routing algorithms. It aids the debugging process by enriching the visual display with debug information about these algorithms.

> [!CAUTION]
> To use MoViDe, ensure that the MOTIS instance is up and running.

## Developing

Once you've installed dependencies with `npm install`, start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To deploy MoViDe:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy MoViDe, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
