export type SocialIcon = "terminal" | "briefcase" | "globe" | "mail";

export type SocialLink = {
	label: string;
	href: string;
	handle: string;
	icon: SocialIcon;
};

export type Profile = {
	name: string;
	headline: string;
	location: string;
	email: string;
	photo: string;
	bio: string;
	socials: SocialLink[];
};

export type ProjectLink = {
	label: string;
	href: string;
};

export type ProjectEntry = {
	slug: string;
	title: string;
	year: string;
	role: string;
	summary: string;
	tags: string[];
	coverImage: string;
	background: string;
	links: ProjectLink[];
};

export type NavPage = {
	href: string;
	label: string;
	index: number;
};

export const profile: Profile = {
	name: "Rafael de Souza Silva",
	headline:
		"Frontend engineer building quiet interfaces with strong motion direction.",
	location: "Brasília, Brazil",
	email: "rafaelss.dev@gmail.com",
	photo: "/profile/portrait.jpeg",
	bio: "Hi! I am Rafael, I'm a Frontend Engineer, currently working at Atendo :3",
	socials: [
		{
			label: "GitHub (Personal)",
			href: "https://github.com/rafael-urei",
			handle: "@rafael-urei",
			icon: "terminal",
		},
		{
			label: "GitHub (Professional)",
			href: "https://github.com/rafael-atendo",
			handle: "@rafael-atendo",
			icon: "terminal",
		},
		{
			label: "LinkedIn",
			href: "https://linkedin.com/in/rafael-souza-390513275",
			handle: "/in/rafael-souza-390513275",
			icon: "briefcase",
		},
		{
			label: "Artstation",
			href: "https://www.artstation.com/rafael_urei",
			handle: "@rafael_urei",
			icon: "globe",
		},
		{
			label: "Email",
			href: "mailto:rafaelss.dev@gmail.com",
			handle: "rafaelss.dev@gmail.com",
			icon: "mail",
		},
	],
};

export const navPages: NavPage[] = [
	{ href: "/", label: "Home", index: 0 },
	{ href: "/projects", label: "Projects", index: 1 },
];

export const projects: ProjectEntry[] = [
	{
		slug: "atendo",
		title: "Atendo",
		year: "2024 - Currently",
		role: "Lead Frontend Engineer",
		summary:
			"An omnichannel customer support platform designed to centralize communication across channels like WhatsApp, email, and web. Atendo enables teams to manage tickets, automate workflows, and monitor performance through a unified interface, improving efficiency and customer satisfaction while reducing operational costs.",
		tags: [
			"MCP",
			"IA",
			"SvelteKit",
			"Design System",
			"Mobile-First",
			"PWA",
			"WebSocket",
			"Svelte 5",
			"Tailwind CSS",
			"Automations",
			"Tickets",
			"NPS/CSAT",
			"SLA",
			"Chatbot",
			"Knowledge Base",
		],
		coverImage: "/projects/atendo.svg",
		background: "#ffffff",
		links: [
			{ label: "Atendo (Site)", href: "https://www.atendo.com/" },
			{ label: "Atendo Cloud", href: "https://atendo.cloud/" },
		],
	},
	{
		slug: "commin",
		title: "Commin",
		year: "2025",
		role: "Lead Frontend Engineer",
		summary:
			"A mobile-first Progressive Web App (PWA) social platform designed for company professionals, inspired by Instagram’s interaction model. Users can publish and draft posts, share videos and images, create events, and run polls. I led the implementation of a gamification system that rewards user engagement with points redeemable for vouchers and other incentives.",
		tags: [
			"SvelteKit",
			"Design System",
			"Gamification",
			"Social Platform",
			"Mobile-First",
			"PWA",
			"WebSocket",
			"Svelte 5",
			"Tailwind CSS",
		],
		coverImage: "/projects/commin.svg",
		background: "#0866ff",
		links: [],
	},
	{
		slug: "commin-crm",
		title: "Commin CRM",
		year: "2025",
		role: "Lead Frontend Engineer",
		summary:
			"A CRM platform built to support and extend the Commin ecosystem. It enables administrators to manage content, monitor user engagement, and configure platform features, providing full control over the social application’s operations.",
		tags: [
			"SvelteKit",
			"Dashboard",
			"Design System",
			"Admin Panel",
			"WebSocket",
			"Svelte 5",
			"Tailwind CSS",
		],
		coverImage: "/projects/commin.svg",
		background: "#0866ff",
		links: [],
	},
	{
		slug: "loreal",
		title: "L’Oréal GDE",
		year: "2025",
		role: "Lead Frontend Engineer",
		summary:
			"A mobile-first Progressive Web App (PWA) designed to deliver educational content about L’Oréal brands in an engaging and accessible way. The platform uses an Instagram-style story interface combined with bite-sized content modules to improve knowledge retention. Users can explore brands, understand product labeling, and access information seamlessly, even offline.",
		tags: [
			"PWA",
			"Mobile-First",
			"UX",
			"Microlearning",
			"Svelte 5",
			"Tailwind CSS",
		],
		coverImage: "/projects/loreal.svg",
		background: "#ffffff",
		links: [],
	},
];

const pageIndex = new Map(navPages.map((page) => [page.href, page.index]));

export function getPageIndex(pathname: string) {
	return pageIndex.get(pathname) ?? 0;
}

export function getSiblingHref(pathname: string, direction: -1 | 1) {
	const current = getPageIndex(pathname);
	return navPages.find((page) => page.index === current + direction)?.href;
}
