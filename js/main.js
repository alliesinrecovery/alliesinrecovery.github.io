document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('username');
    const link1Input = document.getElementById('link1');
    const link4Input = document.getElementById('link4');
    const copyButtons = document.querySelectorAll('.copy-btn');

    // Base URL for the links
    const baseUrl = 'https://alliesinrecovery.net/members/';

    // Function to generate links based on username
    function generateLinks(username) {
        if (!username) {
            link1Input.value = '';
            link4Input.value = '';
            return;
        }

        link1Input.value = `${baseUrl}${username}/profile/edit/group/1/`;
        link4Input.value = `${baseUrl}${username}/profile/edit/group/4/`;
    }

    // Handle username input
    usernameInput.addEventListener('input', (e) => {
        generateLinks(e.target.value.trim());
    });

    // Handle copy functionality
    copyButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const targetId = button.getAttribute('data-target');
            const targetInput = document.getElementById(targetId);

            try {
                await navigator.clipboard.writeText(targetInput.value);
                
                // Visual feedback
                button.classList.add('success');
                const icon = button.querySelector('i');
                icon.classList.remove('fa-copy');
                icon.classList.add('fa-check');

                // Reset after 1.5 seconds
                setTimeout(() => {
                    button.classList.remove('success');
                    icon.classList.remove('fa-check');
                    icon.classList.add('fa-copy');
                }, 1500);
            } catch (err) {
                console.error('Failed to copy text: ', err);
                // Fallback selection method
                targetInput.select();
                document.execCommand('copy');
            }
        });
    });
}); 