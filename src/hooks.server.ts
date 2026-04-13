import type { Handle } from '@sveltejs/kit';
import { getTextDirection } from '$lib/paraglide/runtime';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { isStaticAssetPath } from '$lib/utils/request-path';

const handleParaglide: Handle = ({ event, resolve }) => {
	if (isStaticAssetPath(event.url.pathname)) {
		return resolve(event);
	}

	return paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;

		return resolve(event, {
			transformPageChunk: ({ html }) =>
				html
					.replace('%paraglide.lang%', locale)
					.replace('%paraglide.dir%', getTextDirection(locale))
		});
	});
};

export const handle: Handle = handleParaglide;
