// Wait for the DOM content to be fully loaded before executing the code
document.addEventListener('DOMContentLoaded', function() {
    // Add an event listener to the 'start-button' element
    document.getElementById('start-button').addEventListener('click', function(){
            // Redirect to the '/canvas' page when the button is clicked
            window.location.href = '/canvas';
        })
}