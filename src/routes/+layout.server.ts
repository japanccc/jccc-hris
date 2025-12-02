import { buildClerkProps } from 'svelte-clerk/server';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	return buildClerkProps(event.locals.auth());
};
