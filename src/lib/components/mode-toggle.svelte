<script lang="ts">
import Moon from "lucide-svelte/icons/moon";
import Sun from "lucide-svelte/icons/sun";
import { toggleMode } from "mode-watcher";
import { m } from "$lib/paraglide/messages";
import { Button } from "$lib/components/ui/button";
</script>

<Button
	aria-label={m.app_toggle_theme()}
	class="relative rounded-full border-border bg-(--surface-1) text-(--foreground-muted) hover:bg-(--surface-2) hover:text-foreground"
	onclick={toggleMode}
	size="icon"
	variant="outline"
>
	<Sun class="size-4 scale-100 rotate-0 transition-all duration-300 ease-out dark:scale-0 dark:-rotate-90" />
	<Moon class="absolute size-4 scale-0 rotate-90 transition-all duration-300 ease-out dark:scale-100 dark:rotate-0" />
	<span class="sr-only">{m.app_toggle_theme()}</span>
</Button>
