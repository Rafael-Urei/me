<script lang="ts">
import { ModeWatcher } from "mode-watcher";
import { cubicOut } from "svelte/easing";
import { prefersReducedMotion } from "svelte/motion";
import { fly } from "svelte/transition";
import { beforeNavigate, goto } from "$app/navigation";
import { resolve } from "$app/paths";
import { page } from "$app/state";
import type { Pathname } from "$app/types";
import { m } from "$lib/paraglide/messages";
import type { Locale } from "$lib/paraglide/runtime";
import {
	deLocalizeUrl,
	getLocale,
	locales,
	localizeHref,
} from "$lib/paraglide/runtime";
import "./layout.css";
import "@fontsource/geist-mono/400.css";
import "@fontsource/geist-mono/500.css";
import "@fontsource/geist-mono/700.css";
import { swipeNavigate } from "$lib/actions/swipe-navigation";
import favicon from "$lib/assets/favicon.svg";
import ModeToggle from "$lib/components/mode-toggle.svelte";
import { Tabs, TabsList, TabsTrigger } from "$lib/components/ui/tabs";
import { getNavPages, getPageIndex, getSiblingHref } from "$lib/data/portfolio";

let { children } = $props();
let transitionDirection = $state(0);
let navValue = $state("/");
let localeValue = $state<Locale>("pt-BR");

const canonicalPath = $derived.by(
	() => deLocalizeUrl(page.url).pathname as Pathname,
);
const localizedNavPages = $derived.by(() => {
	page.url.pathname;
	return getNavPages();
});
const currentLocale = $derived.by(() => {
	page.url.pathname;
	return getLocale();
});
const ui = $derived.by(() => {
	page.url.pathname;
	return {
		metaTitle: m.app_meta_title(),
		metaDescription: m.app_meta_description(),
		brand: m.app_brand(),
		homeLabel: m.app_nav_home(),
		primaryNavigationAria: m.app_nav_primary_aria(),
		swipeHint: m.app_swipe_hint(),
		mobileReviewHint: m.app_mobile_review_hint(),
		languageSwitcherAria: m.app_language_switcher_aria(),
	};
});
const routeLabel = $derived(
	localizedNavPages.find((entry) => entry.href === canonicalPath)?.label ??
		ui.homeLabel,
);
const introOffset = $derived.by(() => {
	if (prefersReducedMotion.current || transitionDirection === 0) return 0;
	return transitionDirection > 0 ? 56 : -56;
});
const outroOffset = $derived.by(() => {
	if (prefersReducedMotion.current || transitionDirection === 0) return 0;
	return transitionDirection > 0 ? -56 : 56;
});

function localizeInternalPath(path: string, locale?: Locale) {
	return resolve(
		localizeHref(path, locale ? { locale } : undefined) as Pathname,
	);
}

function getLocaleHref(locale: Locale) {
	return localizeInternalPath(canonicalPath, locale);
}

const swipeOptions = $derived({
	enabled: true,
	previousHref: (() => {
		const sibling = getSiblingHref(canonicalPath, -1);
		return sibling ? localizeInternalPath(sibling) : undefined;
	})(),
	nextHref: (() => {
		const sibling = getSiblingHref(canonicalPath, 1);
		return sibling ? localizeInternalPath(sibling) : undefined;
	})(),
	onNavigate: async (href: string) => {
		await goto(href, { keepFocus: true });
	},
});

$effect(() => {
	navValue = canonicalPath;
});

$effect(() => {
	if (!navValue || navValue === canonicalPath) return;
	goto(localizeInternalPath(navValue), { keepFocus: true });
});

$effect(() => {
	localeValue = currentLocale;
});

$effect(() => {
	if (!localeValue || localeValue === currentLocale) return;
	goto(getLocaleHref(localeValue), { keepFocus: true });
});

beforeNavigate((navigation) => {
	const targetUrl = navigation.to?.url;
	if (!targetUrl) {
		transitionDirection = 0;
		return;
	}

	const targetPath = deLocalizeUrl(targetUrl).pathname;
	if (targetPath === canonicalPath) {
		transitionDirection = 0;
		return;
	}

	transitionDirection =
		getPageIndex(targetPath) > getPageIndex(canonicalPath) ? 1 : -1;
});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{ui.metaTitle}</title>
	<meta content={ui.metaDescription} name="description" />
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
					{ui.brand}
				</p>
				<p class="text-sm uppercase tracking-[0.18em] text-foreground">{routeLabel}</p>
			</div>

			<div class="flex items-center gap-2">
				<Tabs aria-label={ui.primaryNavigationAria} bind:value={navValue} class="gap-0">
					<TabsList class="h-auto border border-border bg-(--surface-1) p-1">
						{#each localizedNavPages as item (item.href)}
							<TabsTrigger value={item.href}>{item.label}</TabsTrigger>
						{/each}
					</TabsList>
				</Tabs>

				<Tabs aria-label={ui.languageSwitcherAria} bind:value={localeValue} class="gap-0">
					<TabsList class="h-auto border border-border bg-(--surface-1) p-1">
						{#each locales as locale (locale)}
							<TabsTrigger value={locale}>{locale.toUpperCase()}</TabsTrigger>
						{/each}
					</TabsList>
				</Tabs>

				<ModeToggle />
			</div>
		</header>

		<div class="flex items-center justify-between gap-4 border-b border-border px-5 py-3 text-[0.64rem] uppercase tracking-[0.24em] text-(--foreground-subtle) sm:px-7 lg:px-8">
			<p>{ui.swipeHint}</p>
			<p class="hidden sm:block">{ui.mobileReviewHint}</p>
		</div>

		<main class="relative flex-1 overflow-hidden" use:swipeNavigate={swipeOptions}>
			{#key page.url.pathname}
				<div
					class="min-h-full px-5 py-6 sm:px-7 sm:py-8 lg:px-8 lg:py-10"
					in:fly={{
						x: introOffset,
						duration: prefersReducedMotion.current ? 0 : 280,
						opacity: prefersReducedMotion.current ? 1 : 0.12,
						easing: cubicOut
					}}
					out:fly={{
						x: outroOffset,
						duration: prefersReducedMotion.current ? 0 : 220,
						opacity: prefersReducedMotion.current ? 1 : 0.12,
						easing: cubicOut
					}}
				>
					{@render children()}
				</div>
			{/key}
		</main>
	</div>
</div>
