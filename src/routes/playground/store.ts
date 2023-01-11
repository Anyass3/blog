// @ts-ignore
import StoreX from 'stores-x';
const content = `# what can I do?  well for now:

## Write markdown

> **hmm**, _yes_ \`markdown\`

## Declare variables as

$GREETINGS=Hello World

> The variable declaration is hidden

Read  as \`{$GREETINGS}\`

## Highlight code blocks
\`\`\`py,python
def main():
    greetings="{$GREETINGS} guys!"
    print(greetings)
\`\`\`
\`\`\`typescript
const main = () => {
    var greetings="{$GREETINGS} guys!";
    console.log(greetings);
}
\`\`\`
\`\`\`diff
+ always plan decentralise
- always plan centralise
\`\`\`

{% assign name='liquidjs' %}
{% assign github_profile='https://github.com/Anyass3' %}
## {{ name | capitalize | prepend: 'Use '}} tags/templates

my **[github profile]({{ github_profile }})**

## Embeds: For now only youtube

> I will add more later, like twitter etc.

### DMT meetup

{% embed https://www.youtube.com/watch?v=Crrdjzt3CK0&t=128s %}

### Some hole-punch meetup

{% embed youtube QWWHKLyCFTU?&starts=123 %}

----------

## Checkout:

[markdown-hljs](https://github.com/Anyass3/markdown-hljs) for the markdown and highlighting

[liquidJS](https://github.com/harttle/liquidjs) for the liquid templates

For blog and image storage/database => [hyperbee](https://github.com/holepunchto/hyperbee)

## Updates
More updates coming for both ui and new features
`;
export default StoreX([
	{
		state: {
			content,
			title: 'Edit me please!',
			cover: {}
		}
	}
]);
