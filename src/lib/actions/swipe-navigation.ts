type SwipeDirection = -1 | 1;

type SwipeNavigationOptions = {
	enabled: boolean;
	previousHref?: string;
	nextHref?: string;
	threshold?: number;
	onNavigate: (href: string, direction: SwipeDirection) => Promise<void> | void;
};

const INTERACTIVE_SELECTOR =
	'a, button, input, textarea, select, summary, label, [role="button"], [data-no-swipe]';

export function swipeNavigate(node: HTMLElement, initialOptions: SwipeNavigationOptions) {
	let options = initialOptions;
	let pointerId: number | null = null;
	let startX = 0;
	let startY = 0;
	let axis: 'x' | 'y' | null = null;
	const initialTouchAction = node.style.touchAction;
	const initialOverscrollBehaviorX = node.style.overscrollBehaviorX;

	const supportsTouchNavigation = () =>
		options.enabled &&
		(window.matchMedia('(any-pointer: coarse)').matches || navigator.maxTouchPoints > 0);

	const syncTouchBehavior = () => {
		if (supportsTouchNavigation()) {
			node.style.touchAction = 'pan-y pinch-zoom';
			node.style.overscrollBehaviorX = 'contain';
			return;
		}

		node.style.touchAction = initialTouchAction;
		node.style.overscrollBehaviorX = initialOverscrollBehaviorX;
	};

	const clearGesture = () => {
		pointerId = null;
		axis = null;
	};

	const onPointerDown = (event: PointerEvent) => {
		if (!supportsTouchNavigation() || event.pointerType === 'mouse') return;
		if (event.button !== 0) return;

		const target = event.target as HTMLElement | null;

		if (target?.closest(INTERACTIVE_SELECTOR)) return;

		pointerId = event.pointerId;
		startX = event.clientX;
		startY = event.clientY;
		axis = null;
	};

	const onPointerMove = (event: PointerEvent) => {
		if (pointerId !== event.pointerId) return;

		const dx = event.clientX - startX;
		const dy = event.clientY - startY;

		if (!axis) {
			if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
			axis = Math.abs(dx) > Math.abs(dy) * 1.2 ? 'x' : 'y';
		}

		if (axis === 'x') {
			event.preventDefault();
			return;
		}

		clearGesture();
	};

	const onPointerEnd = async (event: PointerEvent) => {
		if (pointerId !== event.pointerId) return;

		const dx = event.clientX - startX;
		const destination = dx < 0 ? options.nextHref : options.previousHref;
		const direction: SwipeDirection = dx < 0 ? 1 : -1;
		const threshold = options.threshold ?? Math.min(window.innerWidth * 0.18, 88);
		const shouldNavigate = axis === 'x' && !!destination && Math.abs(dx) > threshold;

		clearGesture();

		if (!shouldNavigate) return;

		await options.onNavigate(destination, direction);
	};

	syncTouchBehavior();

	node.addEventListener('pointerdown', onPointerDown, { passive: true });
	node.addEventListener('pointermove', onPointerMove, { passive: false });
	node.addEventListener('pointerup', onPointerEnd);
	node.addEventListener('pointercancel', onPointerEnd);

	return {
		update(nextOptions: SwipeNavigationOptions) {
			options = nextOptions;
			syncTouchBehavior();
		},
		destroy() {
			node.removeEventListener('pointerdown', onPointerDown);
			node.removeEventListener('pointermove', onPointerMove);
			node.removeEventListener('pointerup', onPointerEnd);
			node.removeEventListener('pointercancel', onPointerEnd);
			node.style.touchAction = initialTouchAction;
			node.style.overscrollBehaviorX = initialOverscrollBehaviorX;
		}
	};
}
