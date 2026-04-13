<script lang="ts">
import ArrowLeft from "lucide-svelte/icons/arrow-left";
import { prefersReducedMotion } from "svelte/motion";
import ProjectCard from "$lib/components/project-card.svelte";
import { buttonVariants } from "$lib/components/ui/button";
import { projects } from "$lib/data/portfolio";
import { cn } from "$lib/utils";
</script>

<section class="grid gap-8">
	<div class="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,20rem)] lg:items-end">
		<div class="grid gap-4">
			<h1 class="max-w-[12ch] text-[clamp(2.4rem,10vw,5rem)] leading-[0.92] font-medium uppercase tracking-[-0.08em] text-foreground">
			  Selected projects
			</h1>
		</div>

		<div class="grid gap-3 rounded-[2rem] border border-border bg-(--surface-1) p-5">
			<p class="text-[0.64rem] uppercase tracking-[0.28em] text-(--foreground-subtle)">
				Navigation
			</p>
			<p class="text-sm leading-7 text-(--foreground-muted)">
				Swipe right to return home on touch devices, or use the visible route controls.
			</p>
			<a class={buttonVariants({ variant: 'default', size: 'lg' })} href="/">
				<ArrowLeft class="size-4" />
				Back home
			</a>
		</div>
	</div>

	<div class="grid gap-6 xl:grid-cols-2">
		{#each projects as project, index (project.slug)}
			<div class={cn(index % 2 === 1 ? 'xl:translate-y-12' : '')}>
				<ProjectCard {project} {index} reducedMotion={prefersReducedMotion.current} />
			</div>
		{/each}
	</div>
</section>
