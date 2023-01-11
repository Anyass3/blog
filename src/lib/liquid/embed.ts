const options = { url: undefined as unknown as URL | undefined, args: [] as string[] };

export const youtube = ({ url, args } = options) => {
	let videoId = '';
	let searchParams = '';
	if (url) {
		if (url.pathname.match(/\/.{11}/)) {
			videoId = url.pathname.slice(1);
			searchParams = url.search;
		} else if (url.pathname.match(/\/watch/)) {
			videoId = url.searchParams.get('v')!;
			searchParams = url.search.replace(/&?v=[\w-]+&?/, '&');
		}
	} else {
		videoId = args[1];
	}
	console.log(url, { videoId, searchParams });
	return `<iframe src="https://www.youtube.com/embed/${videoId + searchParams}"
title="YouTube video player" frameborder="0" style="width:  100%; aspect-ratio: 16 / 9;"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
allowfullscreen>
</iframe>`;
};

export const embeds = {
	'www.youtube.com': youtube,
	'youtu.be': youtube,
	'www.youtu.be': youtube,
	youtube: youtube,
	'youtube.com': youtube
} as Record<string, typeof youtube>;
