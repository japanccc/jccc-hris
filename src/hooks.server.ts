import { sequence } from '@sveltejs/kit/hooks';
import { handleClerk } from 'svelte-clerk/server';
import { CLERK_SECRET_KEY } from '$env/static/private';
import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public';
import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { syncUserFromClerk } from '$lib/server/auth';

// Initialize Clerk
const clerkHandle = handleClerk(PUBLIC_CLERK_PUBLISHABLE_KEY, {
	secretKey: CLERK_SECRET_KEY,
	protectedPaths: ['/dashboard', '/employees', '/admin'],
	signInUrl: '/sign-in'
});

// Sync Clerk user to our database
const authSync: Handle = async ({ event, resolve }) => {
	const { userId } = event.locals.auth;

	if (userId) {
		// Sync user from Clerk to our database
		event.locals.user = await syncUserFromClerk(userId);
	} else {
		event.locals.user = null;
	}

	return resolve(event);
};

// Authorization middleware
const authGuard: Handle = async ({ event, resolve }) => {
	// Admin-only routes
	const adminRoutes = ['/admin'];
	const isAdminRoute = adminRoutes.some(route =>
		event.url.pathname.startsWith(route)
	);

	if (isAdminRoute && event.locals.user?.role !== 'admin') {
		throw redirect(303, '/dashboard?error=forbidden');
	}

	return resolve(event);
};

export const handle: Handle = sequence(clerkHandle, authSync, authGuard);
