<script>
    /* Importing Svelte specific needs */
    import { onMount } from "svelte";
    import { browser } from "$app/environment"
    import { reveal } from 'svelte-reveal';
    import LogoText from "$lib/images/Logo.svg?raw"
    import HeroImg from "$lib/images/car.png"
    import { isMenuOpen } from "../store/nav.js";
    import { goto } from '$app/navigation';
    
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

    const awaitNav = (route) => {
        goto(route)
        $isMenuOpen = false
    }
</script>

<svelte:window bind:innerWidth={screenWidth} />

<div class="text-white w-full h-screen md:h-[70vh] flex flex-col items-center justify-center relative lg:px-[24px] md:px-[16px]">
    <h1 class="text-3xl z-[2] md:w-[400px] md:max-w-[500px] min-w-[315px] max-w-[400px] w-3/4">{@html LogoText}</h1>
    <h1 class="text-xl z-[2] capitalize whitespace-nowrap">automotive liquid wrapping</h1>
    <div class="md:w-[400px] px-[16px] md:px-0 mt-4 z-[2] gap-3 w-full flex justify-between items-center h-[40px]">
        <button on:click={() => awaitNav("/quote")} class="h-full min-w-[156px] w-1/2 uppercase rounded-md border-slate-100 border-[2px] bg-transparent">Get a free quote</button>
        <a href="#about" class="h-full min-w-[156px] w-1/2 flex items-center justify-center uppercase rounded-md border-slate-100 border-[2px] bg-transparent">Learn more</a>
    </div>
    <img class="absolute top-0 right-0 z-[1] w-full object-cover md:h-[70vh] h-screen" src={HeroImg} alt="carHero" />
</div>

<div use:reveal={{ transition: "slide", blur: 20, x: -50, duration: 1200}} class="lg:px-[24px] md:px-[16px] flex-col w-full h-screen flex items-center">
    <div id="about" class="w-full h-[100px]">&nbsp;</div>
    <h1 class="text-3xl font-bold">About Fusion Auto Lab</h1> 
</div>



