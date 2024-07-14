<script lang="ts">
	import { Button, Container, Head, Hr, Html, Img, Preview, Section, Text } from 'svelte-email';

	export let firstName = 'You';
	export let imgSrc = '';
	export let newBlogTitle = '';
	export let blogUrl = 'https://abu.zetaseek.com/blog';

	const fontFamily =
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';

	const main = {
		backgroundColor: 'rgb(29, 28, 45)',
		color: '#29b3bf'
	};

	const container = {
		margin: '0 auto',
		padding: '20px 48px'
	};

	const logo = {
		margin: '0 auto'
	};

	const paragraph = {
		fontFamily,
		fontSize: '16px',
		lineHeight: '26px'
	};

	const btnContainer = {
		textAlign: 'center' as const
	};

	const button = {
		fontFamily,
		backgroundColor: '#31e5c1',
		borderRadius: '3px',
		color: 'green',
		fontSize: '16px',
		textDecoration: 'none',
		textAlign: 'center' as const,
		display: 'block'
	};

	const hr = {
		borderColor: '#cccccc',
		margin: '20px 0'
	};

	const footer = {
		fontFamily,
		color: '#58e288',
		fontSize: '12px'
	};

	$: newBlog = !!newBlogTitle;
</script>

<Html lang="en">
	<Head />
	<Preview preview="Welcome to svelte-email" />
	<Section style={main}>
		<Container style={container}>
			{#if imgSrc}
				<Img src={imgSrc} alt="" style={logo} width="200" height="50" />
			{/if}
			<Text style={paragraph}>Hi {firstName}, welcome to Abu's blog</Text>
			<Text style={paragraph}>Where you can read about some philosophy and coding</Text>
			{#if newBlog}
				<Text style={paragraph}>I just published a new blog post:</Text>
				<Text style={paragraph}>{newBlogTitle}</Text>
			{/if}
			<Section style={btnContainer}>
				<Button pX={12} pY={12} style={button} href={blogUrl}>
					{#if newBlog}
						check out the new blog
					{:else}
						visit the blog
					{/if}
				</Button>
			</Section>
			<Text style={paragraph}>Happy reading!</Text>
			<Hr style={hr} />
			<Text style={footer}>Abu's blog</Text>
		</Container>
	</Section>
</Html>
