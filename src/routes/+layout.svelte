<script lang="ts">
import "./layout.css";
import "@fontsource/geist-mono/400.css";
import "@fontsource/geist-mono/500.css";
import "@fontsource/geist-mono/700.css";

import { ModeWatcher } from "mode-watcher";
import { prefersReducedMotion } from "svelte/motion";
import { cubicOut } from "svelte/easing";
import { fly } from "svelte/transition";
import { beforeNavigate, goto } from "$app/navigation";
import { page } from "$app/state";
import { swipeNavigate } from "$lib/actions/swipe-navigation";
import favicon from "$lib/assets/favicon.svg";
import ModeToggle from "$lib/components/mode-toggle.svelte";
import { Tabs, TabsList, TabsTrigger } from "$lib/components/ui/tabs";
import { getPageIndex, getSiblingHref, navPages } from "$lib/data/portfolio";

let { children } = $props();
let transitionDirection = $state(0);
let navValue = $state(page.url.pathname);

const routeLabel = $derived(
	navPages.find((entry) => entry.href === page.url.pathname)?.label ?? "Home",
);
const introOffset = $derived.by(() => {
	if (prefersReducedMotion.current || transitionDirection === 0) return 0;
	return transitionDirection > 0 ? 56 : -56;
});
const outroOffset = $derived.by(() => {
	if (prefersReducedMotion.current || transitionDirection === 0) return 0;
	return transitionDirection > 0 ? -56 : 56;
});
const swipeOptions = $derived({
	enabled: true,
	previousHref: getSiblingHref(page.url.pathname, -1),
	nextHref: getSiblingHref(page.url.pathname, 1),
	onNavigate: async (href: string) => {
		await goto(href, { keepFocus: true });
	},
});

$effect(() => {
	navValue = page.url.pathname;
});

$effect(() => {
	if (!navValue || navValue === page.url.pathname) return;
	goto(navValue, { keepFocus: true });
});

beforeNavigate((navigation) => {
	const targetPath = navigation.to?.url.pathname;

	if (!targetPath || targetPath === page.url.pathname) {
		transitionDirection = 0;
		return;
	}

	transitionDirection =
		getPageIndex(targetPath) > getPageIndex(page.url.pathname) ? 1 : -1;
});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Portfolio</title>
	<meta
		content="A mobile-first portfolio shell built with SvelteKit, shadcn-svelte structure, and motion-driven page navigation."
		name="description"
	/>
</svelte:head>

<ModeWatcher />

<div class="relative min-h-screen overflow-x-clip px-3 py-3 sm:px-5 sm:py-5">
	<div class="pointer-events-none absolute inset-0 overflow-hidden">
		<div class="absolute inset-x-0 -top-72 h-112 rounded-full bg-[radial-gradient(circle_at_center,rgba(82,80,71,0.16),transparent_72%)] blur-3xl dark:bg-[radial-gradient(circle_at_center,rgba(240,238,232,0.1),transparent_72%)]"></div>
		<div class="absolute inset-0 bg-[linear-gradient(to_right,rgba(84,81,74,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(84,81,74,0.05)_1px,transparent_1px)] bg-size-[clamp(3rem,7vw,5rem)_clamp(3rem,7vw,5rem)] opacity-55 dark:bg-[linear-gradient(to_right,rgba(247,244,236,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(247,244,236,0.05)_1px,transparent_1px)] dark:opacity-40"></div>
	</div>

	<div class="relative mx-auto flex min-h-[calc(100vh-1.5rem)] max-w-7xl flex-col rounded-[2rem] border border-border bg-background shadow-[0_30px_120px_rgba(27,27,26,0.08)]">
		<header class="flex flex-wrap items-center justify-between gap-4 border-b border-border px-5 py-4 sm:px-7 lg:px-8">
			<div class="grid gap-1">
				<p class="text-[0.64rem] uppercase tracking-[0.32em] text-(--foreground-subtle)">
					Portfolio
				</p>
				<p class="text-sm uppercase tracking-[0.18em] text-foreground">{routeLabel}</p>
			</div>

			<div class="flex items-center gap-2">
				<Tabs aria-label="Primary" bind:value={navValue} class="gap-0">
					<TabsList
						class="h-auto rounded-full border border-border bg-(--surface-1) p-1"
					>
						{#each navPages as item (item.href)}
							<TabsTrigger
								value={item.href}
							>
								{item.label}
							</TabsTrigger>
						{/each}
					</TabsList>
				</Tabs>

				<ModeToggle />
			</div>
		</header>

		<div class="flex items-center justify-between gap-4 border-b border-border px-5 py-3 text-[0.64rem] uppercase tracking-[0.24em] text-(--foreground-subtle) sm:px-7 lg:px-8">
			<p>Swipe between pages on touch devices</p>
			<p class="hidden sm:block">Built for mobile-first review</p>
		</div>

		<main class="relative flex-1 overflow-hidden" use:swipeNavigate={swipeOptions}>
			{#key page.url.pathname}
				<div
					class="min-h-full px-5 py-6 sm:px-7 sm:py-8 lg:px-8 lg:py-10"
					in:fly={{
						x: introOffset,
						duration: prefersReducedMotion.current ? 0 : 280,
						opacity: prefersReducedMotion.current ? 1 : 0.12,
						easing: cubicOut,
					}}
					out:fly={{
						x: outroOffset,
						duration: prefersReducedMotion.current ? 0 : 220,
						opacity: prefersReducedMotion.current ? 1 : 0.12,
						easing: cubicOut,
					}}
				>
					{@render children()}
				</div>
			{/key}
		</main>
	</div>
</div>
