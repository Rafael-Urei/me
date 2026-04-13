import { m } from '$lib/paraglide/messages';

export type SocialIcon = 'terminal' | 'briefcase' | 'globe' | 'mail';

type SocialLinkId =
	| 'github_personal'
	| 'github_professional'
	| 'linkedin'
	| 'artstation'
	| 'email';

type ProjectLinkId = 'site' | 'cloud';

type ProjectTagId =
	| 'mcp'
	| 'ai'
	| 'sveltekit'
	| 'design_system'
	| 'mobile_first'
	| 'pwa'
	| 'websocket'
	| 'svelte_5'
	| 'tailwind_css'
	| 'automations'
	| 'tickets'
	| 'nps_csat'
	| 'sla'
	| 'chatbot'
	| 'knowledge_base'
	| 'gamification'
	| 'social_platform'
	| 'dashboard'
	| 'admin_panel'
	| 'ux'
	| 'microlearning';

type ProjectId = 'atendo' | 'commin' | 'commin_crm' | 'loreal';

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

const profileSeed = {
	name: 'Rafael de Souza Silva',
	email: 'rafaelss.dev@gmail.com',
	photo: '/profile/portrait.jpeg',
	socials: [
		{
			id: 'github_personal' as const,
			href: 'https://github.com/rafael-urei',
			handle: '@rafael-urei',
			icon: 'terminal' as const
		},
		{
			id: 'github_professional' as const,
			href: 'https://github.com/rafael-atendo',
			handle: '@rafael-atendo',
			icon: 'terminal' as const
		},
		{
			id: 'linkedin' as const,
			href: 'https://linkedin.com/in/rafael-souza-390513275',
			handle: '/in/rafael-souza-390513275',
			icon: 'briefcase' as const
		},
		{
			id: 'artstation' as const,
			href: 'https://www.artstation.com/rafael_urei',
			handle: '@rafael_urei',
			icon: 'globe' as const
		},
		{
			id: 'email' as const,
			href: 'mailto:rafaelss.dev@gmail.com',
			handle: 'rafaelss.dev@gmail.com',
			icon: 'mail' as const
		}
	]
};

const navPageSeed = [
	{ href: '/', id: 'home' as const, index: 0 },
	{ href: '/projects', id: 'projects' as const, index: 1 }
];

const projectSeed = [
	{
		id: 'atendo' as const,
		slug: 'atendo',
		title: 'Atendo',
		yearId: 'present' as const,
		roleId: 'lead_frontend_engineer' as const,
		tagIds: [
			'mcp',
			'ai',
			'sveltekit',
			'design_system',
			'mobile_first',
			'pwa',
			'websocket',
			'svelte_5',
			'tailwind_css',
			'automations',
			'tickets',
			'nps_csat',
			'sla',
			'chatbot',
			'knowledge_base'
		] as const,
		coverImage: '/projects/atendo.svg',
		background: '#ffffff',
		links: [
			{ id: 'site' as const, href: 'https://www.atendo.com/' },
			{ id: 'cloud' as const, href: 'https://atendo.cloud/' }
		]
	},
	{
		id: 'commin' as const,
		slug: 'commin',
		title: 'Commin',
		yearId: '2025' as const,
		roleId: 'lead_frontend_engineer' as const,
		tagIds: [
			'sveltekit',
			'design_system',
			'gamification',
			'social_platform',
			'mobile_first',
			'pwa',
			'websocket',
			'svelte_5',
			'tailwind_css'
		] as const,
		coverImage: '/projects/commin.svg',
		background: '#0866ff',
		links: []
	},
	{
		id: 'commin_crm' as const,
		slug: 'commin-crm',
		title: 'Commin CRM',
		yearId: '2025' as const,
		roleId: 'lead_frontend_engineer' as const,
		tagIds: [
			'sveltekit',
			'dashboard',
			'design_system',
			'admin_panel',
			'websocket',
			'svelte_5',
			'tailwind_css'
		] as const,
		coverImage: '/projects/commin.svg',
		background: '#0866ff',
		links: []
	},
	{
		id: 'loreal' as const,
		slug: 'loreal',
		title: 'L’Oréal GDE',
		yearId: '2025' as const,
		roleId: 'lead_frontend_engineer' as const,
		tagIds: ['pwa', 'mobile_first', 'ux', 'microlearning', 'svelte_5', 'tailwind_css'] as const,
		coverImage: '/projects/loreal.svg',
		background: '#ffffff',
		links: []
	}
] as const;

function getSocialLabel(id: SocialLinkId) {
	switch (id) {
		case 'github_personal':
			return m.app_social_github_personal_label();
		case 'github_professional':
			return m.app_social_github_professional_label();
		case 'linkedin':
			return m.app_social_linkedin_label();
		case 'artstation':
			return m.app_social_artstation_label();
		case 'email':
			return m.app_social_email_label();
	}
}

function getNavLabel(id: 'home' | 'projects') {
	switch (id) {
		case 'home':
			return m.app_nav_home();
		case 'projects':
			return m.app_nav_projects();
	}
}

function getProjectYear(id: 'present' | '2025') {
	switch (id) {
		case 'present':
			return m.app_project_year_2024_present();
		case '2025':
			return m.app_project_year_2025();
	}
}

function getProjectRole(id: 'lead_frontend_engineer') {
	switch (id) {
		case 'lead_frontend_engineer':
			return m.app_role_lead_frontend_engineer();
	}
}

function getProjectSummary(id: ProjectId) {
	switch (id) {
		case 'atendo':
			return m.app_project_atendo_summary();
		case 'commin':
			return m.app_project_commin_summary();
		case 'commin_crm':
			return m.app_project_commin_crm_summary();
		case 'loreal':
			return m.app_project_loreal_summary();
	}
}

function getProjectLinkLabel(projectId: ProjectId, linkId: ProjectLinkId) {
	if (projectId === 'atendo' && linkId === 'site') return m.app_project_atendo_link_site();
	if (projectId === 'atendo' && linkId === 'cloud') return m.app_project_atendo_link_cloud();
	return '';
}

function getProjectTag(id: ProjectTagId) {
	switch (id) {
		case 'mcp':
			return m.app_tag_mcp();
		case 'ai':
			return m.app_tag_ai();
		case 'sveltekit':
			return m.app_tag_sveltekit();
		case 'design_system':
			return m.app_tag_design_system();
		case 'mobile_first':
			return m.app_tag_mobile_first();
		case 'pwa':
			return m.app_tag_pwa();
		case 'websocket':
			return m.app_tag_websocket();
		case 'svelte_5':
			return m.app_tag_svelte_5();
		case 'tailwind_css':
			return m.app_tag_tailwind_css();
		case 'automations':
			return m.app_tag_automations();
		case 'tickets':
			return m.app_tag_tickets();
		case 'nps_csat':
			return m.app_tag_nps_csat();
		case 'sla':
			return m.app_tag_sla();
		case 'chatbot':
			return m.app_tag_chatbot();
		case 'knowledge_base':
			return m.app_tag_knowledge_base();
		case 'gamification':
			return m.app_tag_gamification();
		case 'social_platform':
			return m.app_tag_social_platform();
		case 'dashboard':
			return m.app_tag_dashboard();
		case 'admin_panel':
			return m.app_tag_admin_panel();
		case 'ux':
			return m.app_tag_ux();
		case 'microlearning':
			return m.app_tag_microlearning();
	}
}

export function getProfile(): Profile {
	return {
		name: profileSeed.name,
		headline: m.app_profile_headline(),
		location: m.app_profile_location(),
		email: profileSeed.email,
		photo: profileSeed.photo,
		bio: m.app_profile_bio(),
		socials: profileSeed.socials.map((social) => ({
			label: getSocialLabel(social.id),
			href: social.href,
			handle: social.handle,
			icon: social.icon
		}))
	};
}

export function getNavPages(): NavPage[] {
	return navPageSeed.map((page) => ({
		href: page.href,
		label: getNavLabel(page.id),
		index: page.index
	}));
}

export function getProjects(): ProjectEntry[] {
	return projectSeed.map((project) => ({
		slug: project.slug,
		title: project.title,
		year: getProjectYear(project.yearId),
		role: getProjectRole(project.roleId),
		summary: getProjectSummary(project.id),
		tags: project.tagIds.map(getProjectTag),
		coverImage: project.coverImage,
		background: project.background,
		links: project.links.map((link) => ({
			label: getProjectLinkLabel(project.id, link.id),
			href: link.href
		}))
	}));
}

const pageIndex = new Map(navPageSeed.map((page) => [page.href, page.index]));

export function getPageIndex(pathname: string) {
	return pageIndex.get(pathname) ?? 0;
}

export function getSiblingHref(pathname: string, direction: -1 | 1) {
	const current = getPageIndex(pathname);
	return navPageSeed.find((page) => page.index === current + direction)?.href;
}
