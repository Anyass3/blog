import{S as g,i as m,s as f,e as b,c as y,a as k,d as h,b as _,g as p,_ as x,F as d,M as z,$ as w}from"./vendor-bcb5457f.js";import{s as S}from"./index-4478c180.js";function M(r){let e,t,c;return{c(){e=b("div"),this.h()},l(o){e=y(o,"DIV",{class:!0}),k(e).forEach(h),this.h()},h(){_(e,"class","h-full overflow-y-auto")},m(o,s){p(o,e,s),t||(c=x(r[1].call(null,e)),t=!0)},p:d,i:d,o:d,d(o){o&&h(e),t=!1,c()}}}function q(r,e,t){let c,o,{content:s=""}=e;const i=S.g("content");z(r,i,n=>t(6,o=n));let{codeStyle:l="/hljs/github-dark.css"}=e,a;const u=n=>{t(4,a=n.attachShadow({mode:"open"}))};return r.$$set=n=>{"content"in n&&t(2,s=n.content),"codeStyle"in n&&t(3,l=n.codeStyle)},r.$$.update=()=>{r.$$.dirty&8&&t(5,c=l?`<link rel="stylesheet" href=${l} />
		
		<style>
			*{
				-webkit-user-select:text;
				   -moz-user-select:text;
				    -ms-user-select:text;
				        user-select:text;
			}
			:root {
				--zeta-green: #31e5c1;
				--zeta-green-highlight: #34fed7;
				--zeta-green_check: rgb(55, 136, 124);
				--zeta-dark-green: #248576;
				--dmt-magenta: #2b294c;
				--dmt-dark-violet: #2e1740;
			}
			img {
				max-width: 100%;
				height: auto;
			}
			a {
				background-color: var(--zeta-green);
				color: green
				
			}
			p code {
				background-color: #0d1117;;
				color: #c9d1d9;
			}
			a p code,
			a code {
				background-color: var(--zeta-green-highlight);
				color: green
			}
			blockquote {
				border-left: 0.25rem solid #3eb0ef;;
				padding-left: 5px;
			}
			p{
				font-size: 1.2rem;
			}</style>
	`:""),r.$$.dirty&116&&a&&t(4,a.innerHTML=c+w(s||o),a)},[i,u,s,l,a,c,o]}class j extends g{constructor(e){super();m(this,e,q,M,f,{content:2,codeStyle:3})}}export{j as R};
