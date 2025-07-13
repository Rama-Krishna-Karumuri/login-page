const properties = [
    {
        id: 1,
        title: "Modern Downtown Apartment",
        location: "Downtown, San Francisco",
        description: "Spacious 2-bedroom apartment in the heart of downtown with stunning city views and modern amenities.",
        price: "$2,500",
        priceNote: "/month",
        category: "residential",
        image: "https://images.unsplash.com/photo-1527576539890-dfa815648363?w=500&q=80",
        features: ["2 bed", "2 bath", "1200 sqft"]
    },
    {
        id: 2,
        title: "Luxury Penthouse Suite",
        location: "Upper East Side, NYC",
        description: "Exclusive penthouse with panoramic city views, private terrace, and premium amenities.",
        price: "$5,500",
        priceNote: "/month",
        category: "residential",
        image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=500&q=80",
        features: ["3 bed", "3 bath", "2200 sqft"]
    },
    {
        id: 3,
        title: "Prime Commercial Building",
        location: "Business District, Chicago",
        description: "Modern office building with high-end finishes, excellent location for businesses.",
        price: "$15,000",
        priceNote: "/month",
        category: "commercial",
        image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=500&q=80",
        features: ["5000 sqft", "Parking", "Elevator"]
    },
    {
        id: 4,
        title: "Cozy Studio Loft",
        location: "Brooklyn, NY",
        description: "Charming studio apartment in historic building with exposed brick and modern amenities.",
        price: "$1,800",
        priceNote: "/month",
        category: "residential",
        image: "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?w=500&q=80",
        features: ["1 bed", "1 bath", "600 sqft"]
    },
    {
        id: 5,
        title: "Development Land Plot",
        location: "Suburban Austin, TX",
        description: "Prime residential development land with excellent access and utilities ready.",
        price: "$250,000",
        priceNote: "total",
        category: "land",
        image: "https://images.unsplash.com/photo-1551038247-3d9af20df552?w=500&q=80",
        features: ["2.5 acres", "Utilities ready", "Zoned residential"]
    },
    {
        id: 6,
        title: "Modern Family Home",
        location: "Suburban Oakland, CA",
        description: "Beautiful 4-bedroom family home with large garden, garage, and excellent school district.",
        price: "$3,200",
        priceNote: "/month",
        category: "residential",
        image: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=500&q=80",
        features: ["4 bed", "3 bath", "2800 sqft"]
    },
    {
        id: 7,
        title: "Commercial Warehouse",
        location: "Industrial Zone, Miami",
        description: "Large warehouse facility perfect for storage, distribution, or light manufacturing.",
        price: "$8,500",
        priceNote: "/month",
        category: "commercial",
        image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=500&q=80",
        features: ["10000 sqft", "Loading dock", "High ceiling"]
    },
    {
        id: 8,
        title: "Waterfront Land",
        location: "Coastal Virginia",
        description: "Stunning waterfront property with private beach access and development potential.",
        price: "$850,000",
        priceNote: "total",
        category: "land",
        image: "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?w=500&q=80",
        features: ["5 acres", "Beach access", "Development ready"]
    }
];

// DOM elements
const propertiesGrid = document.getElementById('propertiesGrid');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');

// Current filters
let currentCategory = 'all';
let currentSearch = '';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderProperties();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', function(e) {
        currentSearch = e.target.value.toLowerCase();
        renderProperties();
    });

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            currentCategory = this.dataset.category;
            renderProperties();
        });
    });
}

// Render properties
function renderProperties() {
    const filteredProperties = properties.filter(property => {
        const matchesCategory = currentCategory === 'all' || property.category === currentCategory;
        const matchesSearch = property.title.toLowerCase().includes(currentSearch) ||
                             property.location.toLowerCase().includes(currentSearch) ||
                             property.description.toLowerCase().includes(currentSearch);
        
        return matchesCategory && matchesSearch;
    });

    if (filteredProperties.length === 0) {
        propertiesGrid.innerHTML = `
            <div class="no-results">
                <h3>No properties found</h3>
                <p>Try adjusting your search or filters</p>
            </div>
        `;
        return;
    }

    propertiesGrid.innerHTML = filteredProperties.map(property => `
        <div class="property-card" onclick="viewProperty(${property.id})">
            <img src="${property.image}" alt="${property.title}" class="property-image">
            <div class="property-content">
                <span class="property-category">${property.category.charAt(0).toUpperCase() + property.category.slice(1)}</span>
                <h3 class="property-title">${property.title}</h3>
                <div class="property-location">
                    📍 ${property.location}
                </div>
                <p class="property-description">${property.description}</p>
                <div class="property-features">
                    ${property.features.map(feature => `<span>• ${feature}</span>`).join('')}
                </div>
                <div class="property-price">${property.price}</div>
                <div class="property-price-note">${property.priceNote}</div>
            </div>
        </div>
    `).join('');
}

// View property function (placeholder)
function viewProperty(id) {
    const property = properties.find(p => p.id === id);
    alert(`Viewing: ${property.title}\nLocation: ${property.location}\nPrice: ${property.price} ${property.priceNote}`);
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
