<script lang="ts">
	import { ClerkProvider, SignedIn, SignedOut, UserButton } from 'svelte-clerk';
	import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ClerkProvider publishableKey={PUBLIC_CLERK_PUBLISHABLE_KEY} {...data}>
	<div class="min-h-screen bg-gray-50">
		<nav class="bg-white shadow">
			<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div class="flex h-16 justify-between">
					<div class="flex">
						<a href="/" class="flex items-center">
							<span class="text-xl font-bold">JCCC HRIS</span>
						</a>

						<SignedIn>
							<div class="ml-10 flex items-center space-x-4">
								<a href="/dashboard" class="text-gray-700 hover:text-gray-900">Dashboard</a>
								<a href="/employees" class="text-gray-700 hover:text-gray-900">Employees</a>
							</div>
						</SignedIn>
					</div>

					<div class="flex items-center">
						<SignedIn>
							<UserButton afterSignOutUrl="/" />
						</SignedIn>

						<SignedOut>
							<a href="/sign-in" class="text-gray-700 hover:text-gray-900">Sign In</a>
						</SignedOut>
					</div>
				</div>
			</div>
		</nav>

		<main class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
			{@render children()}
		</main>
	</div>
</ClerkProvider>
