document.addEventListener('DOMContentLoaded', () => {
    // Select all the input elements that contribute to the score
    const form = document.getElementById('hsp-form');
    const allInputs = form.querySelectorAll('select, .bonus');

    // Select the display elements
    const totalPointsDisplay = document.getElementById('total-points');
    const resultMessageDisplay = document.getElementById('result-message');

    function calculatePoints() {
        let totalPoints = 0;

        // 1. Get points from <select> dropdowns
        const degreePoints = parseInt(document.getElementById('degree').value) || 0;
        const experiencePoints = parseInt(document.getElementById('experience').value) || 0;
        const salaryPoints = parseInt(document.getElementById('salary').value) || 0;
        const agePoints = parseInt(document.getElementById('age').value) || 0;
        
        totalPoints += degreePoints + experiencePoints + salaryPoints + agePoints;

        // 2. Get points from <input type="checkbox"> bonuses
        const bonusCheckboxes = document.querySelectorAll('.bonus:checked');
        bonusCheckboxes.forEach(checkbox => {
            totalPoints += parseInt(checkbox.value) || 0;
        });

        // 3. Update the display
        totalPointsDisplay.textContent = totalPoints;

        // 4. Update the result message
        if (totalPoints >= 80) {
            resultMessageDisplay.textContent = 'Congratulations! You meet the 80-point threshold for special incentives.';
            resultMessageDisplay.className = 'success';
        } else if (totalPoints >= 70) {
            resultMessageDisplay.textContent = 'Congratulations! You meet the 70-point requirement for the HSP visa.';
            resultMessageDisplay.className = 'success';
        } else {
            const needed = 70 - totalPoints;
            resultMessageDisplay.textContent = `You need ${needed} more point(s) to reach the 70-point threshold.`;
            resultMessageDisplay.className = 'failure';
        }
    }

    // Add an event listener to every input
    allInputs.forEach(input => {
        input.addEventListener('change', calculatePoints);
    });

    // Initial calculation on page load
    calculatePoints();
});
