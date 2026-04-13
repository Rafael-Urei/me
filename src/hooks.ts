import type { Reroute } from '@sveltejs/kit';
import { deLocalizeUrl } from '$lib/paraglide/runtime';
import { isStaticAssetPath } from '$lib/utils/request-path';

export const reroute: Reroute = (request) => {
	if (isStaticAssetPath(request.url.pathname)) {
		return;
	}

	return deLocalizeUrl(request.url).pathname;
};
