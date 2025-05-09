document.getElementById('registrationForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
  
    const userData = { name, email };
  
    // Simulate AJAX POST using localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
  
    alert("User registered successfully!");
    this.reset();
  });
  