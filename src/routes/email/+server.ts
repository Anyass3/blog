
import { sendEmail } from '$lib/email/sender';
import WelcomeEmail from '$lib/email/welcome.svelte';
// import { render } from 'svelte-email';
import { render } from 'svelte/server';

async function getWelcomeEmailHtml(name = "You") {
    const output = await render(
        WelcomeEmail,
        {
            props: {
                firstName: name
            }
        }
    );
    // console.log("html", html);
    console.log("head", output.head);
    return output.body
}

export const POST = async ({ request }) => {
    const { email, name } = await request.json();
    const html = await getWelcomeEmailHtml(name);
    sendEmail(email, 'Welcome to Abu\'s blog', html)

    return new Response(JSON.stringify({ message: 'Email sent' }));
}

// export const GET = async () => {
//     const [email, name] = ['tourayzainab8@gmail.com', 'Zaiabou'];
//     const html = await getWelcomeEmailHtml(name);
//     sendEmail(email, 'Welcome to Abu\'s blog', html)

//     return new Response(JSON.stringify({ message: 'Email sent' }));
// }