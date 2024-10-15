<script>
    import { reveal } from 'svelte-reveal';

    let fullName = ""
    let email = ""
    let message = ""
    let formError = false


    const clearFields = () => {
        fullName = ""
        email = ""
        message = ""
        formError = false
    }

    const handleFormSubmission = async () => {
        handleName()

        // If we handle everything and there's errors, we don't want to do anything else
        if (formError) {
            console.log("Error: Form is not valid")
            return
        }

        try {
            const response = await fetch('/api/send-email')
            const data = await response.json()

            console.log(data)

            // Clean-up the form if we successfully sent the mail
            // TODO: Decide if we want to clear right away or not
            clearFields()
        }
        catch(error) {
            console.log(error)
            return
        }
    }

    const handleName = () => {
        const nameParts = fullName?.trim()?.split(' ')

        if (nameParts?.length !== 2) {
            formError = true
            return
        }
    }

    const handleEmail = () => {
        // This will run when a user submits the form
    }

    const handleMessage = () => {
        // This will run when a user submits the form
    }

    const validName = (event) => {
        fullName = event?.target?.value

        if (fullName?.length === 0) {
            formError = true
            return
        }

        const isValidName = /^[A-Za-z]+ [A-Za-z]+$/.test(fullName?.trim());

        if (!isValidName) {
            formError = true
            return
        }
        else {
            formError = false
            return
        }
    }

    const validEmail = () => {
        // Make sure it is a valid email format as they type
    }

    const validMessage = () => {
        // Think about length of the email as they type
    }

    // TODO: Have some sort of popup on the UI if we run into any of our "validY()" functions
    // TODO: Have a popup error message if the form submit fails
</script>

<div use:reveal={{ transition: "slide", blur: 20, x: -50, duration: 1200}} class="w-full h-screen flex justify-center items-center">
    <form on:submit={handleFormSubmission} class="md:w-[750px] pt-[40px] text-white flex flex-col md:justify-normal justify-center items-center md:h-[600px] md:p-[26px] px-[16px] h-screen w-full md:rounded-[32px] bg-[#171717]">
        <div class="w-full md:h-[1/4]">
            <h1 class="pb-2">Full Name</h1>
            <input on:input={validName} bind:value={fullName} class="pl-2 text-black resize-none outline-none rounded-[12px] w-full h-[40px]" placeholder="Enter your name..." />
        </div>

        <div class="w-full md:h-1/4 pt-[20px]">
            <h1 class="pb-2">Email</h1>
            <input on:input={handleEmail} bind:value={email} class="pl-2 text-black resize-none outline-none rounded-[12px] w-full h-[40px]" placeholder="Enter your email..." />
        </div>

        <div class="w-full md:h-full h-[50%] pb-[32px] pt-[20px]">
            <h1 class="pb-2">Your Message</h1>
            <textarea on:input={handleMessage} bind:value={message} class="p-2 text-black resize-none outline-none border-none rounded-[12px] h-full w-full" placeholder="Enter your message..." />
        </div>

        <button class="px-[24px] py-1 rounded-[16px] mt-[20px] bg-white text-black" type="submit">Submit</button>
    </form>
</div>