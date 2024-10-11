<script>
    import "../app.css";
    import Navbar from "$lib/components/Navbar.svelte";
    import { onMount } from "svelte";
    import LogoText from "$lib/images/Logo.svg?raw"

    let animation = true
    let grow = true
    onMount(async () => {
        const delay = ms => new Promise(res => setTimeout(res, ms));
        await delay(500)
        grow = false
        await delay(500)
        grow = true 
        await delay(1000)
        grow = false
        animation = false
        document.body.style.overflow = "auto";
    })
</script>

<div class={`${animation ? 'top-0 left-0 opacity-100 z-[70]' : 'opacity-0 z-[-1]'} bg-black text-3xl font-bold flex justify-center items-center duration-300 ease-in-out transition-all w-screen h-full fixed`}>
    <h1 class={`${grow ? 'scale-100 drop-shadow-[0_0_0rem_#61BEFF]' : 'drop-shadow-[0_0_0.75rem_#61BEFF] scale-[120%]'} duration-[700ms] ease-in-out transition-all w-1/2 md:w-1/6 drop-shadow-[0_0_0.75rem_#61BEFF]`}>{@html LogoText}</h1>
</div>

<Navbar />
<div class="lg:px-[24px] h-screen w-full md:px-[16px]">
    <slot />
</div>
