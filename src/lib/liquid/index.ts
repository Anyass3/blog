import { Liquid } from 'liquidjs';
import { embeds } from './embed';
export const lqEngine = new Liquid();

lqEngine.registerTag('embed', {
	parse(tagToken) {
		this.args = tagToken.args.trim().split(/\s+/);
	},
	render(context, emitter) {
		if (!this.args?.length) return;
		let html = '';
		if (this.args.length == 1) {
			const url = new URL(this.args[0]);
			html = embeds[url.host]({ url, args: this.args });
		} else {
			html = embeds[this.args[0]]({ url: undefined, args: this.args });
		}
		emitter.write(html);
	}
});
