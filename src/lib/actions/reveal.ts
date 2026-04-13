import { animate, inView } from 'motion';

type RevealOptions = {
	delay?: number;
	y?: number;
	reducedMotion?: boolean;
};

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export function revealOnView(node: HTMLElement, initialOptions: RevealOptions = {}) {
	let options = initialOptions;
	let cleanup = () => {};

	const setup = () => {
		cleanup();

		if (options.reducedMotion) {
			node.style.opacity = '1';
			node.style.transform = 'none';
			return;
		}

		node.style.opacity = '0';
		node.style.transform = `translate3d(0, ${options.y ?? 24}px, 0)`;
		node.style.willChange = 'transform, opacity';

		cleanup = inView(node, () => {
			animate(
				node,
				{ opacity: 1, y: 0 },
				{
					delay: options.delay ?? 0,
					duration: 0.64,
					ease: EASE_OUT
				}
			);

			node.style.willChange = '';
		});
	};

	setup();

	return {
		update(nextOptions: RevealOptions) {
			options = nextOptions;
			setup();
		},
		destroy() {
			cleanup();
		}
	};
}
