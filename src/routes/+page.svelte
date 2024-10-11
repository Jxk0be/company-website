<script>
    /* Importing Svelte specific needs */
    import { onMount } from "svelte";
    import { browser } from "$app/environment"
    import { reveal } from 'svelte-reveal';
    import LogoText from "$lib/images/Logo.svg?raw"
    import HeroImg from "$lib/images/car.png"
    
    /* Variables */
    let screenWidth
    let isMobile = false

    $: if (screenWidth <= 1023) {
        isMobile = true
    }
    else isMobile = false

    onMount(async () => {
        /* We want the screenWidth to initialize to the window's width */
        if (browser) {
            screenWidth = window?.innerWidth
        }
    })

</script>

<svelte:window bind:innerWidth={screenWidth} />

<div class="text-white w-full h-screen flex flex-col items-center justify-center relative">
    <h1 class="text-3xl z-[2] w-[300px]">{@html LogoText}</h1>
    <h1 class="text-xl z-[2] capitalize">automotive liquid wrapping</h1>
    <img class="absolute top-0 right-0 z-[1] w-full object-cover h-screen" src={HeroImg} alt="carHero" />
</div>
<div use:reveal={{ transition: "slide", blur: 20, x: -50, duration: 1200}} class="bg-[#4090ff] w-full h-screen flex items-center justify-center">
    Testing 
</div>

