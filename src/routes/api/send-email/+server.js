import { json } from '@sveltejs/kit'

export function GET({ url }) {
    // TODO: Setup a google account (Business Email Bot) that will send the information to the business email (FusionAutoLab@gmail.com)
    // and it will also CC the person's email that they entered in the form.

    return json("Hello")
}