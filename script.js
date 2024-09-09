
const timeframeButtons = document.querySelectorAll('.main-card .date a');
let data = [];

  // Fetch the data from the JSON file
fetch('/data.json')
    .then((response) => response.json())
    .then((jsonData) => {
        data = jsonData;
      updateUI('weekly'); // Default to weekly view
    });

  // Add event listeners to each button (Daily, Weekly, Monthly)
timeframeButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const timeframe = button.textContent.toLowerCase();
        updateUI(timeframe);

        // Remove the active class from all buttons and add it to the clicked one
        timeframeButtons.forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

  // Function to update the UI based on the selected timeframe
function updateUI(timeframe) {
    data.forEach((item) => {
        const card = document.getElementById(item.title.toLowerCase());
        const currentTime = card.querySelector('.time h1');
        const previousTime = card.querySelector('.last-weeck span');

        // Update the stats with a transition effect
        currentTime.style.opacity = 0;
        previousTime.style.opacity = 0;
        setTimeout(() => {
        currentTime.textContent = `${item.timeframes[timeframe].current}hrs`;
        previousTime.textContent = `${item.timeframes[timeframe].previous}hrs`;

        // Show the updated data with fade-in effect
        currentTime.style.opacity = 1;
        previousTime.style.opacity = 1;
      }, 300); // Delay for the animation
    });
}
