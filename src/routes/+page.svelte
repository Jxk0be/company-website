<script>
    /* Importing Svelte specific needs */
    import { onMount } from "svelte";
    import { browser } from "$app/environment"
    import { reveal } from 'svelte-reveal';
    import LogoText from "$lib/images/Logo.svg?raw"
    import HeroImg from "$lib/images/car.png"
    import { isMenuOpen } from "../store/nav.js";
    import { goto } from '$app/navigation';
    import Carousel from 'svelte-carousel';

    /* Variables */
    let screenWidth
    let isMobile = false
    let carousel

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

    const handleNextClick = () => {
        carousel?.goToNext()
    }
</script>

<svelte:window bind:innerWidth={screenWidth} />

<div class="text-white w-full h-[500px] mb-[30px] flex flex-col items-center justify-center relative lg:px-[24px] md:px-[16px]">
    <h1 class="text-3xl z-[2] md:w-[300px] w-[250px]">{@html LogoText}</h1>
    <h1 class="text-xl z-[2] capitalize whitespace-nowrap">automotive liquid wrapping</h1>
    <div class="md:w-[400px] md:min-w-[500px] max-w-[400px] px-[16px] md:px-0 mt-4 z-[2] w-full flex justify-center items-center h-[40px]">
        <button on:click={() => awaitNav("/quote")} class="h-full min-w-[156px] w-1/2 text-nowrap uppercase rounded-md border-slate-100 border-[2px] bg-transparent">Get a free quote</button>
    </div>
    <img class="absolute top-0 right-0 z-[1] w-full object-cover h-[500px]" src={HeroImg} alt="carHero" />
</div>

<div use:reveal={{ transition: "slide", blur: 20, x: -50, duration: 1200}} class="lg:px-[24px] md:px-[16px] flex-col w-full h-[500px] flex items-center">
    <h1 class="text-3xl font-[500] text-center">About Fusion Auto Lab</h1> 

    {#if browser}
        <div class="lg:px-[24px] select-none flex flex-col px-[16px] w-full max-w-[1140px] h-full">
            <Carousel bind:this={carousel}
            autoplay autoplayDuration={4000} arrows={false}
            >
                <div class="flex md:flex-row flex-col h-[400px] w-full justify-center md:justify-between items-center">
                    <h1>Service 1 & Explanation</h1>
                    <h1>Imagine an Image here</h1>
                </div>
                <div class="flex md:flex-row flex-col h-[400px] w-full justify-center md:justify-between items-center">
                    <h1>Service 2 & Explanation</h1>
                    <h1>Imagine an Image here</h1>
                </div>
                <div class="flex md:flex-row flex-col h-[400px] w-full justify-center md:justify-between items-center">
                    <h1>Service 3 & Explanation</h1>
                    <h1>Imagine an Image here</h1>
                </div>
            </Carousel>
    
            <button on:click={handleNextClick}>Next</button>
        </div>
    {/if}

</div>

<div class="lg:px-[24px] md:px-[16px] flex-col w-full h-[400px] mt-[30px] flex items-center bg-slate-100">

</div>







