document.addEventListener('DOMContentLoaded', () => {

    // --- DATA ---
    // IMPORTANT: Edit this array to add your projects.
    const projectsData = [
        {
            id: 'optsupply',
            title: 'OptiSupply (Logistics Analytics)',
            short_desc: 'Reduced shipping costs and delays for a fashion company using data analysis.',
            tags: ['Data Analyst', 'Python', 'SQL'],
            description: 'Analyzed historical shipping data to identify inefficiencies in routing and carrier selection. Built a model to forecast demand and optimize inventory allocation, leading to a 15% reduction in shipping costs.',
            techStack: ['Python', 'pandas', 'SQL', 'Matplotlib', 'Excel'],
            githubLink: '#' // Add your link here
        },
        {
            id: 'wikianalysis',
            title: 'Wikipedia Analysis',
            short_desc: 'A web tool to scrape, tokenize, and find top N frequent terms from any Wikipedia article.',
            tags: ['Data Analyst', 'SWE', 'Python'],
            description: 'This end-to-end project involves web scraping, NLP preprocessing (tokenization, stop-word removal), and frequency analysis. The results are displayed through a simple Flask web UI.',
            techStack: ['Python', 'Flask', 'BeautifulSoup', 'NLTK', 'HTML/CSS'],
            githubLink: '#'
        },
        {
            id: 'fraud-detection',
            title: 'Credit Fraud Detection',
            short_desc: 'Prototyped a credit-fraud detection ML model with class-imbalance handling.',
            tags: ['Data Scientist', 'AI/ML', 'Python'],
            description: 'Used techniques like SMOTE to handle heavily imbalanced datasets. Evaluated models like Logistic Regression and Random Forest based on F1-score and Precision-Recall curves to measure lift.',
            techStack: ['scikit-learn', 'pandas', 'NumPy', 'Matplotlib'],
            githubLink: '#'
        },
        {
            id: 'recsys',
            title: 'Recommendation System',
            short_desc: 'Designed a hybrid recommendation system to improve user retention.',
            tags: ['Data Scientist', 'AI/ML', 'SWE'],
            description: 'Implemented a system combining popularity-based recommendations for new users and collaborative filtering for existing users. This hybrid approach improved retention and new-user acquisition metrics.',
            techStack: ['Python', 'pandas', 'scikit-learn', 'Surprise'],
            githubLink: '#'
        },
        {
            id: 'codelock',
            title: 'CodeLock iOS App',
            short_desc: 'Privacy/security iOS app with encryption-first flows and usage analytics.',
            tags: ['SWE', 'iOS'],
            description: 'Built an iOS application focusing on user privacy. Implemented core features using Swift and instrumented usage analytics to track user behavior, then shipped changes that measurably improved retention.',
            techStack: ['Swift', 'Xcode', 'Firebase Analytics'],
            githubLink: '#'
        }
    ];

    // --- ELEMENTS ---
    const dynamicRoleEl = document.getElementById('dynamic-role');
    const landingPage = document.getElementById('landing-page');
    const rolePagesContainer = document.getElementById('role-pages-container');
    const roleCards = document.querySelectorAll('.role-card');
    const projectGrid = document.getElementById('project-grid');
    const modal = document.getElementById('project-modal');
    const closeModalBtn = document.querySelector('.close-button');

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

        let typeSpeed = isDeleting ? 100 : 200;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(typeWriter, typeSpeed);
    }

    // --- PAGE NAVIGATION ---
    function showPage(pageId) {
        landingPage.style.display = 'none';
        
        // Hide all pages first
        const pages = rolePagesContainer.querySelectorAll('.page');
        pages.forEach(p => p.style.display = 'none');
        
        const pageToShow = document.getElementById(pageId);
        if (pageToShow) {
            rolePagesContainer.style.display = 'block';
            pageToShow.style.display = 'block';
        }
    }

    function showLandingPage() {
        rolePagesContainer.style.display = 'none';
        landingPage.style.display = 'block';
    }

    // --- PROJECTS ---
    function populateProjects() {
        projectGrid.innerHTML = ''; // Clear existing projects
        projectsData.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.dataset.projectId = project.id;
            
            card.innerHTML = `
                <h4>${project.title}</h4>
                <p>${project.short_desc}</p>
                <div class="tags-container">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            `;
            
            card.addEventListener('click', () => openModal(project.id));
            projectGrid.appendChild(card);
        });
    }

    // --- MODAL ---
    function openModal(projectId) {
        const project = projectsData.find(p => p.id === projectId);
        if (!project) return;
        
        document.getElementById('modal-title').textContent = project.title;
        document.getElementById('modal-description').textContent = project.description;
        
        const tagsContainer = document.getElementById('modal-tags');
        tagsContainer.innerHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        
        const techContainer = document.getElementById('modal-tech');
        techContainer.innerHTML = project.techStack.map(tech => `<div class="tech-item">${tech}</div>`).join('');
        
        const githubLink = document.getElementById('modal-github');
        githubLink.href = project.githubLink;

        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
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
    
    closeModalBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });

    // --- INITIALIZATION ---
    function init() {
        typeWriter();
        populateProjects();
    }

    init();
});
