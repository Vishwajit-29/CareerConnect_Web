function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const itemText = item.textContent.trim();

            // Basic navigation logic
            switch (itemText) {
                case 'Home':
                    // Scroll to top or refresh page
                    window.scrollTo(0, 0);
                    break;
                case 'Jobs in India':
                    // Scroll to job listings or filter jobs
                    const jobListings = document.querySelector('.job-listings');
                    if (jobListings) {
                        jobListings.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                    break;
                case 'Companies':
                    // Placeholder for companies page or modal
                    alert('Companies page coming soon!');
                    break;
                case 'Profile':
                    // Placeholder for profile section
                    alert('Please login to access your profile');
                    break;
                case 'Login':
                    // Placeholder for login functionality
                    alert('Login functionality will be implemented soon!');
                    break;
            }

            // Close mobile menu
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Call setup function when DOM is fully loaded
document.addEventListener('DOMContentLoaded', setupNavigation);

// Hamburger Menu Toggle
function setupHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    // Enhanced hamburger menu toggle
    function toggleMobileMenu() {
        // Toggle active class on nav links
        navLinks.classList.toggle('active');

        // Toggle hamburger icon animation
        hamburger.classList.toggle('active');
    }

    // Add click event listener to hamburger
    hamburger.addEventListener('click', toggleMobileMenu);

    // Close mobile menu when a nav link is clicked
    const navLinkItems = navLinks.querySelectorAll('a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        const isClickInsideNavbar = hamburger.contains(event.target) ||
            navLinks.contains(event.target);

        if (!isClickInsideNavbar) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Add media query listener to reset menu on larger screens
    const mediaQuery = window.matchMedia('(min-width: 769px)');

    function handleMediaQueryChange(e) {
        if (e.matches) {
            // On larger screens, ensure menu is visible and reset classes
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }

    // Initial check and add listener
    handleMediaQueryChange(mediaQuery);
    mediaQuery.addListener(handleMediaQueryChange);
}

// Call setup function when DOM is fully loaded
document.addEventListener('DOMContentLoaded', setupHamburgerMenu);

// Apply Modal Functionality
const applyButtons = document.querySelectorAll('.apply-btn');
const modal = document.getElementById('apply-modal');
const jobTitleModal = document.getElementById('job-title-modal');

applyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const jobTitle = button.getAttribute('data-job');
        jobTitleModal.textContent = jobTitle;
        modal.style.display = 'block';
    });
});

// Modal Close on Outside Click
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Upload Option Click Handlers
const uploadOptions = document.querySelectorAll('.upload-option');
uploadOptions.forEach(option => {
    option.addEventListener('click', () => {
        const inputId = option.id.replace('-upload', '');
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = inputId === 'resume' ? '.pdf,.doc,.docx' :
            inputId === 'portfolio' ? '.pdf,.zip' : '*/*';
        input.click();

        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                alert(`${option.querySelector('h3').textContent} uploaded successfully!`);
            }
        });
    });
});


// Job Data Array
const jobListings = [{
    title: "Software Engineer",
    company: "Infosys Limited",
    location: "Bangalore, Karnataka",
    type: "Full Time",
    salary: "₹8-12 LPA"
}, {
    title: "Data Scientist",
    company: "TCS",
    location: "Hyderabad, Telangana",
    type: "Remote",
    salary: "₹12-18 LPA"
}, {
    title: "DevOps Engineer",
    company: "Wipro Technologies",
    location: "Pune, Maharashtra",
    type: "Hybrid",
    salary: "₹10-15 LPA"
}, {
    title: "Cloud Architect",
    company: "Cognizant",
    location: "Chennai, Tamil Nadu",
    type: "Full Time",
    salary: "₹15-22 LPA"
}, {
    title: "Machine Learning Engineer",
    company: "Tech Mahindra",
    location: "Noida, Uttar Pradesh",
    type: "Full Time",
    salary: "₹12-18 LPA"
}, {
    title: "Cybersecurity Specialist",
    company: "HCL Technologies",
    location: "Gurugram, Haryana",
    type: "Full Time",
    salary: "₹14-20 LPA"
}, {
    title: "Frontend Developer",
    company: "Accenture",
    location: "Mumbai, Maharashtra",
    type: "Full Time",
    salary: "₹7-11 LPA"
}, {
    title: "Backend Developer",
    company: "Persistent Systems",
    location: "Pune, Maharashtra",
    type: "Full Time",
    salary: "₹9-13 LPA"
}, {
    title: "Product Manager",
    company: "Zoho Corporation",
    location: "Chennai, Tamil Nadu",
    type: "Full Time",
    salary: "₹12-18 LPA"
}, {
    title: "UI/UX Designer",
    company: "Mindtree",
    location: "Bangalore, Karnataka",
    type: "Full Time",
    salary: "₹8-12 LPA"
}];

// Function to create job card HTML
function setupSearchInteraction() {
    const jobInput = document.getElementById('job-input');
    const locationInput = document.getElementById('location-input');
    const searchBtn = document.getElementById('search-btn');
    const searchResultsPopup = document.getElementById('search-results-popup');
    const jobListingsContainer = document.querySelector('.job-listings');

    // Focus and Click Handling for Search Inputs
    function handleSearchInputFocus() {
        if (jobInput.value.trim() === '' && locationInput.value.trim() === '') {
            // Show all jobs when search inputs are empty and focused
            renderSearchResultsPopup(jobListings);
        } else {
            searchJobs();
        }
    }

    jobInput.addEventListener('focus', handleSearchInputFocus);
    locationInput.addEventListener('focus', handleSearchInputFocus);

    // Search Functionality
    function searchJobs() {
        const jobQuery = jobInput.value.toLowerCase().trim();
        const locationQuery = locationInput.value.toLowerCase().trim();

        // Filter jobs
        const filteredJobs = jobListings.filter(job => {
            const matchesJobTitle = job.title.toLowerCase().includes(jobQuery) ||
                job.company.toLowerCase().includes(jobQuery);
            const matchesLocation = job.location.toLowerCase().includes(locationQuery);

            // If both inputs are empty, show all jobs
            if (!jobQuery && !locationQuery) return true;

            // If only job input is provided
            if (jobQuery && !locationQuery) return matchesJobTitle;

            // If only location input is provided
            if (!jobQuery && locationQuery) return matchesLocation;

            // If both inputs are provided
            return matchesJobTitle && matchesLocation;
        });

        // Render Search Results Popup
        renderSearchResultsPopup(filteredJobs);

        // Render Job Listings
        renderJobListings(filteredJobs);
    }

    // Render Search Results Popup
    function renderSearchResultsPopup(jobs) {
        // Clear previous results
        searchResultsPopup.innerHTML = '';

        // If no jobs found
        if (jobs.length === 0) {
            searchResultsPopup.innerHTML = `
        <div class="no-results">
            <p>No jobs found matching your search criteria</p>
        </div>
    `;
            searchResultsPopup.style.display = 'block';
            return;
        }

        // Create result items
        jobs.forEach(job => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('search-result-item');
            resultItem.innerHTML = `
        <div class="search-result-title">${job.title} at ${job.company}</div>
        <div class="search-result-details">
            <i class="fas fa-map-marker-alt"></i> ${job.location} | 
            <i class="fas fa-briefcase"></i> ${job.type} | 
            <i class="fas fa-rupee-sign"></i> ${job.salary}
        </div>
    `;

            // Add click event to select job and open apply modal
            resultItem.addEventListener('click', () => {
                // Close search results popup
                searchResultsPopup.style.display = 'none';

                // Find the corresponding job card and trigger its apply button
                const matchingJobCard = Array.from(document.querySelectorAll('.job-card'))
                    .find(card =>
                        card.querySelector('.job-title').textContent === job.title &&
                        card.querySelector('p').textContent === job.company
                    );

                if (matchingJobCard) {
                    const applyButton = matchingJobCard.querySelector('.apply-btn');
                    if (applyButton) {
                        applyButton.click();
                    }
                }
            });

            searchResultsPopup.appendChild(resultItem);
        });

        // Show popup
        searchResultsPopup.style.display = 'block';
    }

    // Existing render and create job card functions remain the same

    // Event Listeners
    searchBtn.addEventListener('click', searchJobs);

    // Close popup when clicking outside
    document.addEventListener('click', (event) => {
        if (!searchResultsPopup.contains(event.target) &&
            event.target !== jobInput &&
            event.target !== locationInput &&
            event.target !== searchBtn) {
            searchResultsPopup.style.display = 'none';
        }
    });

    // Allow search on Enter key press
    jobInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') searchJobs();
    });

    locationInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') searchJobs();
    });

    // Initial render of all jobs
    renderJobListings(jobListings);
}

// Call setup function when DOM is fully loaded
document.addEventListener('DOMContentLoaded', setupSearchInteraction);