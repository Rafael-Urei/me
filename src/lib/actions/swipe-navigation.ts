import { animate } from 'motion';

type SwipeDirection = -1 | 1;

type SwipeNavigationOptions = {
	enabled: boolean;
	previousHref?: string;
	nextHref?: string;
	reducedMotion?: boolean;
	threshold?: number;
	onWarmRoute?: (href: string) => Promise<void> | void;
	onNavigate: (href: string, direction: SwipeDirection) => Promise<void> | void;
};

const INTERACTIVE_SELECTOR =
	'a, button, input, textarea, select, summary, label, [role="button"], [data-no-swipe]';

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export function swipeNavigate(node: HTMLElement, initialOptions: SwipeNavigationOptions) {
	let options = initialOptions;
	let pointerId: number | null = null;
	let startX = 0;
	let startY = 0;
	let deltaX = 0;
	let axis: 'x' | 'y' | null = null;
	let navigating = false;
	let awaitingRouteSwap = false;
	const initialTouchAction = node.style.touchAction;
	const initialOverscrollBehaviorX = node.style.overscrollBehaviorX;

	const supportsTouchNavigation = () =>
		options.enabled &&
		(window.matchMedia('(any-pointer: coarse)').matches || navigator.maxTouchPoints > 0);

	const resetStyles = () => {
		node.style.transform = '';
		node.style.opacity = '';
	};

	const syncTouchBehavior = () => {
		if (supportsTouchNavigation()) {
			// Keep vertical scrolling native while reserving horizontal drags for swipe navigation.
			node.style.touchAction = 'pan-y pinch-zoom';
			node.style.overscrollBehaviorX = 'contain';
			return;
		}

		node.style.touchAction = initialTouchAction;
		node.style.overscrollBehaviorX = initialOverscrollBehaviorX;
	};

	const settle = (x: number, opacity = 1, duration = 0.28) =>
		animate(
			node,
			{ x, opacity },
			{
				duration: options.reducedMotion ? 0.01 : duration,
				ease: EASE_OUT
			}
		);

	const clearGesture = () => {
		pointerId = null;
		axis = null;
		deltaX = 0;
	};

	const onPointerDown = (event: PointerEvent) => {
		if (!supportsTouchNavigation() || navigating || event.pointerType === 'mouse') return;
		if (event.button !== 0) return;

		const target = event.target as HTMLElement | null;

		if (target?.closest(INTERACTIVE_SELECTOR)) return;

		pointerId = event.pointerId;
		startX = event.clientX;
		startY = event.clientY;
		deltaX = 0;
		axis = null;
		node.style.willChange = 'transform, opacity';
		if (options.previousHref) void options.onWarmRoute?.(options.previousHref);
		if (options.nextHref) void options.onWarmRoute?.(options.nextHref);
	};

	const onPointerMove = (event: PointerEvent) => {
		if (pointerId !== event.pointerId) return;

		const dx = event.clientX - startX;
		const dy = event.clientY - startY;

		if (!axis) {
			if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
			axis = Math.abs(dx) > Math.abs(dy) * 1.2 ? 'x' : 'y';
		}

		if (axis === 'y') {
			clearGesture();
			node.style.willChange = '';
			return;
		}

		const destination = dx < 0 ? options.nextHref : options.previousHref;
		const constrainedX = destination ? dx : dx * 0.2;

		if (destination) void options.onWarmRoute?.(destination);

		deltaX = constrainedX;
		event.preventDefault();

		const visibleOffset = options.reducedMotion ? constrainedX * 0.12 : constrainedX;
		node.style.transform = `translate3d(${visibleOffset}px, 0, 0)`;
		node.style.opacity = options.reducedMotion ? '1' : `${1 - Math.min(Math.abs(constrainedX) / 960, 0.18)}`;
	};

	const onPointerEnd = async (event: PointerEvent) => {
		if (pointerId !== event.pointerId) return;

		const activeDirection: SwipeDirection = deltaX < 0 ? 1 : -1;
		const destination = deltaX < 0 ? options.nextHref : options.previousHref;
		const threshold = options.threshold ?? Math.min(window.innerWidth * 0.18, 88);
		const shouldNavigate = axis === 'x' && !!destination && Math.abs(deltaX) > threshold;

		clearGesture();
		node.style.willChange = '';

		if (!shouldNavigate) {
			await settle(0, 1).finished;
			resetStyles();
			return;
		}

		navigating = true;
		awaitingRouteSwap = true;
		const travel = activeDirection === 1 ? -Math.min(window.innerWidth * 0.42, 220) : Math.min(window.innerWidth * 0.42, 220);

		try {
			await settle(travel, options.reducedMotion ? 1 : 0.72, 0.24).finished;
			node.style.transform = `translate3d(${travel}px, 0, 0)`;
			node.style.opacity = '0';
			await options.onNavigate(destination, activeDirection);
		} catch (error) {
			awaitingRouteSwap = false;
			throw error;
		} finally {
			if (!awaitingRouteSwap) {
				navigating = false;
				resetStyles();
			}
		}
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
			if (awaitingRouteSwap) {
				awaitingRouteSwap = false;
				navigating = false;
				resetStyles();
			}

			if (!supportsTouchNavigation()) {
				resetStyles();
				node.style.willChange = '';
			}
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
