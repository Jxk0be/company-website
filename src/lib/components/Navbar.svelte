<script>
    import Icon from '@iconify/svelte';
    import { onMount } from "svelte";
    import { browser } from "$app/environment"
    import LogoText from "$lib/images/Logo.svg?raw"
    import NavData from "$lib/data/NavData.json"
    import { goto } from '$app/navigation';

    $: jsonData = NavData?.data
    let isMenuOpen = false
    let screenWidth
    let isMobile = false

    const preventScrolling = (event) => {
        event.preventDefault()
    }

    $: if (isMenuOpen) {
        if (browser) {
            window.addEventListener('wheel', preventScrolling, { passive: false })
            window.addEventListener('touchmove', preventScrolling, { passive: false })
        }
    }
    else {
        if (browser) {
            window.removeEventListener('wheel', preventScrolling)
            window.removeEventListener('touchmove', preventScrolling)
        }
    }

    $: if (!isMobile) isMenuOpen = false

    const awaitNav = (route) => {
        goto(route)
        isMenuOpen = false
    }

    const handleMenu = () => {
        isMenuOpen = !isMenuOpen
    }

    $: if (screenWidth <= 1023) {
        isMobile = true
    }
    else isMobile = false

    onMount(async () => {
        if (browser) {
            screenWidth = window?.innerWidth
        }
    })

</script>

<svelte:window bind:innerWidth={screenWidth} />

<div class={`${isMenuOpen ? 'top-0 opacity-100' : 'opacity-0 top-[-100%]'} w-full text-white text-3xl font-semibold duration-[350ms] flex justify-center items-center flex-col lg:hidden transition-all h-full bg-[#212121] z-[5] fixed right-0`}>
    <button class="fixed text-[35px] top-0 right-0 h-[70px] flex items-center pr-[16px]" on:click={handleMenu}>
        <Icon icon="ep:close-bold" />
    </button>

    <button on:click={() => awaitNav("/")} class="my-3 capitalize">Home</button>
    {#each jsonData?.links as link, idx}
        {#if idx === jsonData?.links?.length - 1}
            <button on:click={() => awaitNav(link)} class="my-3 capitalize">{link}</button>
        {:else}
            {#if link.toLowerCase() === "our work"}
                <button on:click={() => awaitNav("our-work")} class="my-3 capitalize">{link}</button>
            {:else}
                <button on:click={() => awaitNav(link)} class="my-3 capitalize">{link}</button>
            {/if}
        {/if}
    {/each}
</div>

<div class={`w-full text-white z-[3] font-semibold fixed h-[70px] bg-[#212121] border-b-[1px] border-black/10`}>
    <div class="lg:px-[24px] relative z-[4] px-[16px] h-full w-full flex items-center justify-between">
        <button on:click={() => awaitNav("/")} class="cursor-pointer w-[100px]">{@html LogoText}</button>

        {#if !isMenuOpen}
            <button on:click={handleMenu} class={`lg:hidden text-[35px] text-white transition-all ease-in-out rounded-xl duration-150`}>
                <Icon icon="lucide:menu" />
            </button>
        {/if}


        <div class="hidden lg:flex w-auto items-center justify-between">
            <button on:click={() => awaitNav("/")} class="mr-8">Home</button>
            {#each jsonData?.links as link, idx}
                {#if idx === jsonData?.links?.length - 1}
                    <button on:click={() => awaitNav(link)} class="capitalize">{link}</button>
                {:else}
                    {#if link.toLowerCase() === "our work"}
                        <button on:click={() => awaitNav("our-work")} class="mr-8 capitalize">{link}</button>
                    {:else}
                        <button on:click={() => awaitNav(link)} class="mr-8 capitalize">{link}</button>
                    {/if}
                {/if}
            {/each}
        </div>
    </div>
</div>