import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { CLERK_SECRET_KEY } from '$env/static/private';
import { createClerkClient } from 'svelte-clerk/server';

const clerk = createClerkClient({ secretKey: CLERK_SECRET_KEY });

/**
 * Get user from our database by Clerk user ID
 */
export async function getUserFromClerkId(clerkUserId: string) {
	const [user] = await db
		.select({
			id: table.user.id,
			email: table.user.email,
			name: table.user.name,
			role: table.user.role,
			avatarUrl: table.user.avatarUrl,
			isActive: table.user.isActive
		})
		.from(table.user)
		.where(eq(table.user.id, clerkUserId))
		.limit(1);

	return (user as { id: string; email: string; name: string; role: 'admin' | 'national_leader' | 'manager' | 'employee'; avatarUrl: string | null; isActive: boolean } | undefined) || null;
}

/**
 * Sync user from Clerk to our database
 * Called on every authenticated request
 */
export async function syncUserFromClerk(clerkUserId: string) {
	// Check if user exists in our DB
	let user = await getUserFromClerkId(clerkUserId);

	if (user) {
		return user; // User already synced
	}

	// Fetch user from Clerk
	const clerkUser = await clerk.users.getUser(clerkUserId);

	// Create user in our database
	const [newUser] = await db
		.insert(table.user)
		.values({
			id: clerkUserId,
			email: clerkUser.emailAddresses[0].emailAddress,
			name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() ||
				clerkUser.emailAddresses[0].emailAddress.split('@')[0],
			avatarUrl: clerkUser.imageUrl,
			googleId: clerkUser.externalAccounts.find(a => a.provider === 'google')?.externalId,
			role: 'employee', // Default role
			isActive: true,
			createdAt: new Date(),
			updatedAt: new Date()
		})
		.returning();

	return newUser;
}

/**
 * Update user role (admin function)
 */
export async function updateUserRole(
	userId: string,
	role: 'admin' | 'national_leader' | 'manager' | 'employee'
) {
	await db
		.update(table.user)
		.set({ role, updatedAt: new Date() })
		.where(eq(table.user.id, userId));
}
