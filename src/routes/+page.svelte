<script lang="ts">
import ArrowRight from "lucide-svelte/icons/arrow-right";
import BriefcaseBusiness from "lucide-svelte/icons/briefcase-business";
import Globe from "lucide-svelte/icons/globe";
import Mail from "lucide-svelte/icons/mail";
import Terminal from "lucide-svelte/icons/terminal";
import { prefersReducedMotion } from "svelte/motion";
import { revealOnView } from "$lib/actions/reveal";
import { Avatar, AvatarFallback, AvatarImage } from "$lib/components/ui/avatar";
import { buttonVariants } from "$lib/components/ui/button";
import { Separator } from "$lib/components/ui/separator";
import { profile } from "$lib/data/portfolio";

const socialIcons = {
	terminal: Terminal,
	briefcase: BriefcaseBusiness,
	globe: Globe,
	mail: Mail,
} as const;
</script>

<section class="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:gap-12">
	<div class="grid gap-8">
		<div class="grid gap-6" use:revealOnView={{ reducedMotion: prefersReducedMotion.current }}>
			<p class="text-[0.68rem] uppercase tracking-[0.34em] text-(--foreground-subtle)">
				Editorial minimal portfolio / v1 shell
			</p>

			<div class="grid gap-4">
				<h1 class="max-w-[12ch] text-[clamp(2.8rem,12vw,7rem)] leading-[0.9] font-medium uppercase tracking-[-0.08em] text-foreground">
					{profile.name}
				</h1>

				<p class="max-w-160 text-base leading-8 text-(--foreground-soft) sm:text-lg">
					{profile.headline}
				</p>
			</div>
		</div>

		<div
			class="grid gap-6 rounded-[2rem] border border-border bg-(--surface-1) p-5 sm:p-7"
			use:revealOnView={{ delay: 0.08, y: 28, reducedMotion: prefersReducedMotion.current }}
		>
			<div class="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:justify-between">
				<div>
					<p class="text-[0.66rem] uppercase tracking-[0.28em] text-(--foreground-subtle)">
						Short profile
					</p>
					<Avatar size="lg" class="mt-3">
						<AvatarImage alt={profile.name} src={profile.photo} />
						<AvatarFallback>{profile.name.slice(0, 2)}</AvatarFallback>
					</Avatar>
					<p class="mt-3 max-w-xl text-sm leading-7 text-(--foreground-muted) sm:text-[0.96rem]">
						"{profile.bio}"
					</p>
				</div>

				<a class={buttonVariants({ size: 'lg' })} href="/projects">
					View projects
					<ArrowRight class="size-4" />
				</a>
			</div>

			<Separator />

			<div class="grid gap-4 sm:grid-cols-3">
				<div>
					<p class="text-[0.64rem] uppercase tracking-[0.26em] text-(--foreground-subtle)">
						Location
					</p>
					<p class="mt-2 text-sm text-foreground">{profile.location}</p>
				</div>

				<div>
					<p class="text-[0.64rem] uppercase tracking-[0.26em] text-(--foreground-subtle)">
						Email
					</p>
					<a class="mt-2 block text-sm text-foreground" href={`mailto:${profile.email}`}>
						{profile.email}
					</a>
				</div>

				<div>
					<p class="text-[0.64rem] uppercase tracking-[0.26em] text-(--foreground-subtle)">
						Best on
					</p>
					<p class="mt-2 text-sm text-foreground">Mobile, tablet, and recruiter screens</p>
				</div>
			</div>
		</div>
	</div>

	<aside class="grid gap-5" use:revealOnView={{ delay: 0.16, y: 32, reducedMotion: prefersReducedMotion.current }}>
		<div class="rounded-[2rem] border border-border bg-(--surface-1) p-5">
			<p class="text-[0.66rem] uppercase tracking-[0.3em] text-(--foreground-subtle)">
				Social links
			</p>

			<div class="mt-4 grid gap-3">
				{#each profile.socials as social (social.label)}
					{@const Icon = socialIcons[social.icon]}
					<a
						class="flex items-center justify-between rounded-[1.35rem] border border-border bg-background px-4 py-3 transition-colors duration-200 hover:bg-(--surface-2)"
						href={social.href}
						target="_blank"
					>
						<span class="flex items-center gap-3">
							<span class="flex size-9 items-center justify-center rounded-full border border-border bg-(--surface-1)">
								<Icon class="size-4" />
							</span>
							<span>
								<span class="block text-[0.68rem] uppercase tracking-[0.22em] text-(--foreground-subtle)">
									{social.label}
								</span>
								<span class="mt-1 block text-sm text-foreground">{social.handle}</span>
							</span>
						</span>
						<ArrowRight class="size-4 text-(--foreground-subtle)" />
					</a>
				{/each}
			</div>
		</div>
	</aside>
</section>
