/**
 * Mock Booth Finder Logic
 * Provides dynamic booth locations based on pincode for a functional demo.
 */
const BoothData = {
    "110001": { name: "Sarvodaya Bal Vidyalaya", address: "Sector 4, New Delhi" },
    "110002": { name: "MCD Primary School", address: "Daryaganj, New Delhi" },
    "400001": { name: "St. Xavier's High School", address: "Fort, Mumbai" },
    "560001": { name: "Government Arts College", address: "MG Road, Bangalore" },
    "default": { name: "Local Community Center", address: "Main Street, Central District" }
};

document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('search-booth-btn');
    const input = document.getElementById('booth-input');
    const resultPanel = document.getElementById('booth-result-panel');
    const boothNameEl = document.getElementById('booth-name');
    const boothAddrEl = document.getElementById('booth-address');

    searchBtn?.addEventListener('click', () => {
        const val = input.value.trim();
        if (!val) {
            alert("Please enter a Pincode or Locality");
            return;
        }

        // Show loading state
        searchBtn.innerText = "Searching...";
        searchBtn.disabled = true;

        setTimeout(() => {
            const data = BoothData[val] || BoothData["default"];
            
            boothNameEl.innerText = data.name;
            boothAddrEl.innerText = data.address;
            resultPanel.style.display = 'block';
            
            searchBtn.innerText = "Search";
            searchBtn.disabled = false;
            
            // Add a little glow animation to the result
            resultPanel.style.animation = 'none';
            resultPanel.offsetHeight; // trigger reflow
            resultPanel.style.animation = 'slideIn 0.3s ease';
        }, 800);
    });
});
