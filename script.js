document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENTS ---
    const dynamicRoleEl = document.getElementById('dynamic-role');
    const landingPage = document.getElementById('landing-page');
    const rolePagesContainer = document.getElementById('role-pages-container');
    const roleCards = document.querySelectorAll('.role-card');

    // --- DYNAMIC TEXT (TYPEWRITER) ---
    const roles = ["Data Analytics", "Data Engineering", "Data Science", "Software Engineering", "AI/ML"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
        const currentRole = roles[roleIndex];
        let displayText = '';

        if (isDeleting) {
            displayText = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            displayText = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }
        
        dynamicRoleEl.textContent = displayText;
        let typeSpeed = isDeleting ? 75 : 150;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(typeWriter, typeSpeed);
    }

    // --- PAGE NAVIGATION ---
    function showPage(pageId) {
        landingPage.style.display = 'none';
        
        const pages = rolePagesContainer.querySelectorAll('.page');
        pages.forEach(p => p.style.display = 'none');
        
        const pageToShow = document.getElementById(pageId);
        if (pageToShow) {
            rolePagesContainer.style.display = 'block';
            pageToShow.style.display = 'block';
            window.scrollTo(0, 0); // Scroll to top of new page
        }
    }

    function showLandingPage() {
        rolePagesContainer.style.display = 'none';
        landingPage.style.display = 'block';
        window.scrollTo(0, 0);
    }

    // --- EVENT LISTENERS ---
    roleCards.forEach(card => {
        card.addEventListener('click', () => {
            const pageId = card.getAttribute('data-page');
            showPage(pageId);
        });
    });

    const backButtons = document.querySelectorAll('.back-button');
    backButtons.forEach(button => {
        button.addEventListener('click', showLandingPage);
    });
    
    // --- INITIALIZATION ---
    typeWriter();
});
