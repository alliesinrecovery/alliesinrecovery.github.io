document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('username');
    const link1Text = document.getElementById('link1');
    const link4Text = document.getElementById('link4');
    const copyButtons = document.querySelectorAll('.copy-btn');

    // Base URL for the links
    const baseUrl = 'https://alliesinrecovery.net/members/';

    // Function to generate links based on username
    function generateLinks(username) {
        if (!username) {
            link1Text.textContent = '';
            link4Text.textContent = '';
            return;
        }

        link1Text.textContent = `${baseUrl}${username}/profile/edit/group/1/`;
        link4Text.textContent = `${baseUrl}${username}/profile/edit/group/4/`;
    }

    // Handle username input
    usernameInput.addEventListener('input', (e) => {
        generateLinks(e.target.value.trim());
    });

    // Handle copy functionality
    copyButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const targetId = button.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            const textToCopy = targetElement.textContent;

            try {
                await navigator.clipboard.writeText(textToCopy);
                
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
                
                // Fallback copy method
                const tempInput = document.createElement('textarea');
                tempInput.value = textToCopy;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
            }
        });
    });

    // Focus the username input on page load
    usernameInput.focus();
}); 