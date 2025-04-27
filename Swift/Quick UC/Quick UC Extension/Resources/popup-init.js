document.addEventListener('DOMContentLoaded', function() {
    // Hide the fallback message
    document.getElementById('fallback').style.display = 'none';
    
    // Create a basic button to verify DOM manipulation works
    const btn = document.createElement('button');
    btn.textContent = 'Test Button';
    btn.onclick = () => alert('Button works!');
    document.getElementById('button-container').appendChild(btn);
  });