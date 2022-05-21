export const manifest = {
	appDir: "_app",
	assets: new Set(["favicon.png","hljs/a11y-dark.css","hljs/a11y-light.css","hljs/agate.css","hljs/an-old-hope.css","hljs/androidstudio.css","hljs/arduino-light.css","hljs/arta.css","hljs/ascetic.css","hljs/atom-one-dark-reasonable.css","hljs/atom-one-dark.css","hljs/atom-one-light.css","hljs/base16/3024.css","hljs/base16/apathy.css","hljs/base16/apprentice.css","hljs/base16/ashes.css","hljs/base16/atelier-cave-light.css","hljs/base16/atelier-cave.css","hljs/base16/atelier-dune-light.css","hljs/base16/atelier-dune.css","hljs/base16/atelier-estuary-light.css","hljs/base16/atelier-estuary.css","hljs/base16/atelier-forest-light.css","hljs/base16/atelier-forest.css","hljs/base16/atelier-heath-light.css","hljs/base16/atelier-heath.css","hljs/base16/atelier-lakeside-light.css","hljs/base16/atelier-lakeside.css","hljs/base16/atelier-plateau-light.css","hljs/base16/atelier-plateau.css","hljs/base16/atelier-savanna-light.css","hljs/base16/atelier-savanna.css","hljs/base16/atelier-seaside-light.css","hljs/base16/atelier-seaside.css","hljs/base16/atelier-sulphurpool-light.css","hljs/base16/atelier-sulphurpool.css","hljs/base16/atlas.css","hljs/base16/bespin.css","hljs/base16/black-metal-bathory.css","hljs/base16/black-metal-burzum.css","hljs/base16/black-metal-dark-funeral.css","hljs/base16/black-metal-gorgoroth.css","hljs/base16/black-metal-immortal.css","hljs/base16/black-metal-khold.css","hljs/base16/black-metal-marduk.css","hljs/base16/black-metal-mayhem.css","hljs/base16/black-metal-nile.css","hljs/base16/black-metal-venom.css","hljs/base16/black-metal.css","hljs/base16/brewer.css","hljs/base16/bright.css","hljs/base16/brogrammer.css","hljs/base16/brush-trees-dark.css","hljs/base16/brush-trees.css","hljs/base16/chalk.css","hljs/base16/circus.css","hljs/base16/classic-dark.css","hljs/base16/classic-light.css","hljs/base16/codeschool.css","hljs/base16/colors.css","hljs/base16/cupcake.css","hljs/base16/cupertino.css","hljs/base16/danqing.css","hljs/base16/darcula.css","hljs/base16/dark-violet.css","hljs/base16/darkmoss.css","hljs/base16/darktooth.css","hljs/base16/decaf.css","hljs/base16/default-dark.css","hljs/base16/default-light.css","hljs/base16/dirtysea.css","hljs/base16/dracula.css","hljs/base16/edge-dark.css","hljs/base16/edge-light.css","hljs/base16/eighties.css","hljs/base16/embers.css","hljs/base16/equilibrium-dark.css","hljs/base16/equilibrium-gray-dark.css","hljs/base16/equilibrium-gray-light.css","hljs/base16/equilibrium-light.css","hljs/base16/espresso.css","hljs/base16/eva-dim.css","hljs/base16/eva.css","hljs/base16/flat.css","hljs/base16/framer.css","hljs/base16/fruit-soda.css","hljs/base16/gigavolt.css","hljs/base16/github.css","hljs/base16/google-dark.css","hljs/base16/google-light.css","hljs/base16/grayscale-dark.css","hljs/base16/grayscale-light.css","hljs/base16/green-screen.css","hljs/base16/gruvbox-dark-hard.css","hljs/base16/gruvbox-dark-medium.css","hljs/base16/gruvbox-dark-pale.css","hljs/base16/gruvbox-dark-soft.css","hljs/base16/gruvbox-light-hard.css","hljs/base16/gruvbox-light-medium.css","hljs/base16/gruvbox-light-soft.css","hljs/base16/hardcore.css","hljs/base16/harmonic16-dark.css","hljs/base16/harmonic16-light.css","hljs/base16/heetch-dark.css","hljs/base16/heetch-light.css","hljs/base16/helios.css","hljs/base16/hopscotch.css","hljs/base16/horizon-dark.css","hljs/base16/horizon-light.css","hljs/base16/humanoid-dark.css","hljs/base16/humanoid-light.css","hljs/base16/ia-dark.css","hljs/base16/ia-light.css","hljs/base16/icy-dark.css","hljs/base16/ir-black.css","hljs/base16/isotope.css","hljs/base16/kimber.css","hljs/base16/london-tube.css","hljs/base16/macintosh.css","hljs/base16/marrakesh.css","hljs/base16/materia.css","hljs/base16/material-darker.css","hljs/base16/material-lighter.css","hljs/base16/material-palenight.css","hljs/base16/material-vivid.css","hljs/base16/material.css","hljs/base16/mellow-purple.css","hljs/base16/mexico-light.css","hljs/base16/mocha.css","hljs/base16/monokai.css","hljs/base16/nebula.css","hljs/base16/nord.css","hljs/base16/nova.css","hljs/base16/ocean.css","hljs/base16/oceanicnext.css","hljs/base16/one-light.css","hljs/base16/onedark.css","hljs/base16/outrun-dark.css","hljs/base16/papercolor-dark.css","hljs/base16/papercolor-light.css","hljs/base16/paraiso.css","hljs/base16/pasque.css","hljs/base16/phd.css","hljs/base16/pico.css","hljs/base16/pop.css","hljs/base16/porple.css","hljs/base16/qualia.css","hljs/base16/railscasts.css","hljs/base16/rebecca.css","hljs/base16/ros-pine-dawn.css","hljs/base16/ros-pine-moon.css","hljs/base16/ros-pine.css","hljs/base16/sagelight.css","hljs/base16/sandcastle.css","hljs/base16/seti-ui.css","hljs/base16/shapeshifter.css","hljs/base16/silk-dark.css","hljs/base16/silk-light.css","hljs/base16/snazzy.css","hljs/base16/solar-flare-light.css","hljs/base16/solar-flare.css","hljs/base16/solarized-dark.css","hljs/base16/solarized-light.css","hljs/base16/spacemacs.css","hljs/base16/summercamp.css","hljs/base16/summerfruit-dark.css","hljs/base16/summerfruit-light.css","hljs/base16/synth-midnight-terminal-dark.css","hljs/base16/synth-midnight-terminal-light.css","hljs/base16/tango.css","hljs/base16/tender.css","hljs/base16/tomorrow-night.css","hljs/base16/tomorrow.css","hljs/base16/twilight.css","hljs/base16/unikitty-dark.css","hljs/base16/unikitty-light.css","hljs/base16/vulcan.css","hljs/base16/windows-10-light.css","hljs/base16/windows-10.css","hljs/base16/windows-95-light.css","hljs/base16/windows-95.css","hljs/base16/windows-high-contrast-light.css","hljs/base16/windows-high-contrast.css","hljs/base16/windows-nt-light.css","hljs/base16/windows-nt.css","hljs/base16/woodland.css","hljs/base16/xcode-dusk.css","hljs/base16/zenburn.css","hljs/brown-paper.css","hljs/brown-papersq.png","hljs/codepen-embed.css","hljs/color-brewer.css","hljs/dark.css","hljs/default.css","hljs/devibeans.css","hljs/docco.css","hljs/far.css","hljs/foundation.css","hljs/github-dark-dimmed.css","hljs/github-dark.css","hljs/github.css","hljs/gml.css","hljs/googlecode.css","hljs/gradient-dark.css","hljs/gradient-light.css","hljs/grayscale.css","hljs/hybrid.css","hljs/idea.css","hljs/ir-black.css","hljs/isbl-editor-dark.css","hljs/isbl-editor-light.css","hljs/kimbie-dark.css","hljs/kimbie-light.css","hljs/lightfair.css","hljs/lioshi.css","hljs/magula.css","hljs/mono-blue.css","hljs/monokai-sublime.css","hljs/monokai.css","hljs/night-owl.css","hljs/nnfx-dark.css","hljs/nnfx-light.css","hljs/nord.css","hljs/obsidian.css","hljs/paraiso-dark.css","hljs/paraiso-light.css","hljs/pojoaque.css","hljs/pojoaque.jpg","hljs/purebasic.css","hljs/qtcreator-dark.css","hljs/qtcreator-light.css","hljs/rainbow.css","hljs/routeros.css","hljs/school-book.css","hljs/shades-of-purple.css","hljs/srcery.css","hljs/stackoverflow-dark.css","hljs/stackoverflow-light.css","hljs/sunburst.css","hljs/tomorrow-night-blue.css","hljs/tomorrow-night-bright.css","hljs/vs.css","hljs/vs2015.css","hljs/xcode.css","hljs/xt256.css"]),
	_: {
		mime: {".png":"image/png",".css":"text/css",".jpg":"image/jpeg"},
		entry: {"file":"start-f2030fb6.js","js":["start-f2030fb6.js","chunks/vendor-bcb5457f.js","chunks/singletons-a6a7384f.js"],"css":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/3.js'),
			() => import('./nodes/4.js')
		],
		routes: [
			{
				type: 'page',
				pattern: /^\/$/,
				params: null,
				path: "/",
				shadow: () => import('./entries/endpoints/index.ts.js'),
				a: [0,2],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/write\/?$/,
				params: null,
				path: "/write",
				shadow: () => import('./entries/endpoints/write.ts.js'),
				a: [0,3],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/([^/]+?)\/?$/,
				params: (m) => ({ blog: m[1]}),
				path: null,
				shadow: () => import('./entries/endpoints/_blog_.ts.js'),
				a: [0,4],
				b: [1]
			}
		]
	}
};
