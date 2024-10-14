<script>
    import Icon from '@iconify/svelte';
    import { onMount } from "svelte";
    import { browser } from "$app/environment"
    import LogoText from "$lib/images/Logo.svg?raw"
    import NavData from "$lib/data/NavData.json"
    import { goto } from '$app/navigation';
    import { isMenuOpen } from "../../store/nav.js";

    $: jsonData = NavData?.data
    let screenWidth
    let isMobile = false

    const preventScrolling = (event) => {
        event.preventDefault()
    }

    $: if ($isMenuOpen) {
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

    $: if (!isMobile) $isMenuOpen = false

    const awaitNav = (route) => {
        goto(route)
        $isMenuOpen = false
    }

    const handleMenu = () => {
        $isMenuOpen = !$isMenuOpen
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

<div class={`w-full text-white z-[4] font-semibold fixed h-[70px] bg-[#212121] border-b-[1px] border-black/10`}>
    <div class="lg:px-[24px] relative z-[4] px-[16px] h-full w-full flex items-center justify-between">
        <button on:click={() => awaitNav("/")} class="cursor-pointer w-[100px]">{@html LogoText}</button>

        {#if !$isMenuOpen}
            <button on:click={handleMenu} class={`lg:hidden text-[35px] text-white transition-all ease-in-out rounded-xl duration-150`}>
                <Icon icon="lucide:menu" />
            </button>
        {:else}
            <button on:click={handleMenu} class={`lg:hidden text-[35px] text-white transition-all ease-in-out rounded-xl duration-150`}>
                <Icon icon="ep:close-bold" />
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

<div class={`${$isMenuOpen ? 'translate-y-[26%]' : 'translate-y-[-74%]'} fixed bg-[#212121] right-0 z-[3] text-lg font-semibold duration-[200ms] ease-in-out flex justify-start flex-col transition-all lg:hidden text-white w-full`}>
    <button on:click={() => awaitNav("/")} class="py-[12px] w-full text-left px-[24px] border-b-[1px] border-white/10 capitalize">Home</button>
    {#each jsonData?.links as link, idx}
        {#if idx === jsonData?.links?.length - 1}
            <button on:click={() => awaitNav(link)} class="text-left px-[24px] py-[12px] w-full capitalize">{link}</button>
        {:else}
            {#if link.toLowerCase() === "our work"}
                <button on:click={() => awaitNav("our-work")} class="w-full text-left px-[24px] border-b-[1px] border-white/10 py-[12px] capitalize">{link}</button>
            {:else}
                <button on:click={() => awaitNav(link)} class="w-full border-b-[1px] text-left px-[24px] border-white/10 py-[12px] capitalize">{link}</button>
            {/if}
        {/if}
    {/each}
</div>