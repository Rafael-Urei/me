const STATIC_FILE_EXTENSION_PATTERN =
	/\.(?:avif|bmp|css|gif|ico|jpeg|jpg|js|json|map|mp4|png|svg|txt|webm|webp|woff2?|xml)$/i;

export function isStaticAssetPath(pathname: string): boolean {
	return (
		pathname.startsWith('/_app/') ||
		pathname.startsWith('/favicon') ||
		pathname === '/robots.txt' ||
		pathname === '/manifest.webmanifest' ||
		pathname === '/site.webmanifest' ||
		pathname === '/sitemap.xml' ||
		STATIC_FILE_EXTENSION_PATTERN.test(pathname)
	);
}
