<script lang="ts">
import ArrowUpRight from "lucide-svelte/icons/arrow-up-right";
import { interactiveCard } from "$lib/actions/interactive-card";
import { revealOnView } from "$lib/actions/reveal";
import { Badge } from "$lib/components/ui/badge";
import { buttonVariants } from "$lib/components/ui/button";
import type { ProjectEntry } from "$lib/data/portfolio";
import { cn } from "$lib/utils";

type Props = {
	project: ProjectEntry;
	index?: number;
	reducedMotion?: boolean;
	class?: string;
};

let {
	project,
	index = 0,
	reducedMotion = false,
	class: className,
}: Props = $props();
</script>

<article
  style="--project-background: {project.background}"
	class={cn(
		'group relative overflow-hidden rounded-[2rem] border border-border bg-(--surface-1)/92 p-4 shadow-[0_16px_50px_rgba(27,27,26,0.06)] sm:p-5',
		className
	)}
	use:revealOnView={{ delay: index * 0.08, y: 28, reducedMotion }}
	use:interactiveCard={{ reducedMotion }}
>
	<div class="relative overflow-hidden rounded-[1.5rem] p-4 border border-border bg-(--project-background)">
		<img
			alt={`${project.title} cover art`}
			class="aspect-16/11 h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
			src={project.coverImage}
		/>
		<div class="pointer-events-none absolute inset-0 bg-linear-to-t from-(--surface-0)/16 via-transparent to-transparent"></div>
	</div>

	<div class="mt-5 grid gap-5">
		<div class="flex flex-wrap items-center justify-between gap-3">
			<div>
				<p class="text-[0.68rem] uppercase tracking-[0.24em] text-(--foreground-subtle)">
					{project.year} / {project.role}
				</p>
				<h3 class="mt-2 text-[1.15rem] uppercase tracking-[0.08em] text-foreground sm:text-[1.35rem]">
					{project.title}
				</h3>
			</div>
		</div>

		<p class="max-w-[40ch] text-sm leading-7 text-(--foreground-muted) sm:text-[0.96rem]">
			{project.summary}
		</p>

		<div class="flex flex-wrap gap-2">
			{#each project.tags as tag (`${project.slug}-${tag}`)}
				<Badge>{tag}</Badge>
			{/each}
		</div>

		<div class="flex flex-wrap items-center gap-3">
			{#each project.links as link (`${project.slug}-${link.label}`)}
				<a
					class={buttonVariants({ variant: 'ghost', size: 'sm' })}
					data-no-swipe
					href={link.href}
				>
					{link.label}
					<ArrowUpRight class="size-3.5" />
				</a>
			{/each}
		</div>
	</div>
</article>
