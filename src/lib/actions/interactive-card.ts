import { animate, hover, press } from 'motion';

type InteractiveCardOptions = {
	reducedMotion?: boolean;
};

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export function interactiveCard(node: HTMLElement, initialOptions: InteractiveCardOptions = {}) {
	let options = initialOptions;
	let stopHover = () => {};
	let stopPress = () => {};

	const setup = () => {
		stopHover();
		stopPress();
		node.style.transformOrigin = 'center center';

		if (options.reducedMotion) return;

		stopHover = hover(node, () => {
			animate(
				node,
				{
					y: -6,
					scale: 1.01,
					boxShadow: '0 28px 80px rgba(27, 27, 26, 0.12)'
				},
				{
					duration: 0.28,
					ease: EASE_OUT
				}
			);

			return () => {
				animate(
					node,
					{
						y: 0,
						scale: 1,
						boxShadow: '0 0 0 rgba(27, 27, 26, 0)'
					},
					{
						duration: 0.26,
						ease: EASE_OUT
					}
				);
			};
		});

		stopPress = press(node, () => {
			animate(node, { scale: 0.985 }, { duration: 0.16, ease: EASE_OUT });

			return () => {
				animate(node, { scale: 1 }, { duration: 0.22, ease: EASE_OUT });
			};
		});
	};

	setup();

	return {
		update(nextOptions: InteractiveCardOptions) {
			options = nextOptions;
			setup();
		},
		destroy() {
			stopHover();
			stopPress();
		}
	};
}
