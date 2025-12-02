// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			auth: {
				userId: string | null;
				sessionId: string | null;
				session: any | null;
			};
			user: {
				id: string;
				email: string;
				name: string;
				role: 'admin' | 'national_leader' | 'manager' | 'employee';
				avatarUrl: string | null;
				isActive: boolean;
			} | null;
		}
	}
}

export {};
