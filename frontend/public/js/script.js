const { response } = require("express");

function showRegister() {
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("registerBox").classList.remove("hidden");
  }
  
  function showLogin() {
    document.getElementById("registerBox").classList.add("hidden");
    document.getElementById("loginBox").classList.remove("hidden");
  }

  function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  input.type = input.type === "password" ? "text" : "password";
}

// เมื่อโหลดหน้าจอเสร็จให้เริ่มทำงาน
window.onload = function() {
  function submitReport() {
    console.log("Submit button clicked");

    // ซ่อนฟอร์มการรายงาน
    document.querySelector('form').style.display = 'none';

    // แสดงข้อความสำเร็จ
    document.getElementById('successMessage').style.display = 'block';
  }

  // ผูกฟังก์ชันกับปุ่ม Submit
  document.querySelector('button').addEventListener('click', submitReport);
};

async function registerUser() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('registerPassword').value;
  const name = document.getElementById('name').value;
  const address = document.getElementById('address').value;
  const phone = document.getElementById('phone').value;

  const userData = {
    Username: username,
    Password: password,
    Name: name,
    Address: address,
    Phone: phone
  };

  try {
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      alert('Registration successful!');
      document.getElementById('registerForm').reset();
      window.location.href = 'login.html'
    } else {
      alert('Registration failed. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again later.');
  }
}

async function loginUser(event) {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  const userData = {
    Username: username,
    Password: password
  };

  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.status === 200) {
      alert('Login successful');
      sessionStorage.setItem('userName', data.user.Name);
      sessionStorage.setItem('userAddress', data.user.Address);
      sessionStorage.setItem('userPhone', data.user.Phone);

      window.location.href = 'home.html';
    } else {
      alert('Login Failed: ' + (data.message || 'Invalid credentials'));
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again later.');
  }
}


/* async function loginUser() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const userData = {
      Username: username,
      Password: password
    };

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        alert('Login successful');
        sessionStorage.setItem('userName', data.user.Name);
        sessionStorage.setItem('userAddress', data.user.Address);
        sessionStorage.setItem('userPhone', data.user.Phone);

        window.location.href = 'home.html'
      } else {
        alert('Login Failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  } */