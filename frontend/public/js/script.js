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
    console.log("registerUser called!");  // ตรวจสอบว่าฟังก์ชั่นถูกเรียกหรือไม่
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
      // ส่งข้อมูลไปยัง API สำหรับการลงทะเบียน
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      // ถ้าการลงทะเบียนสำเร็จ
      if (response.ok) {
        alert('Registration successful!');
        document.getElementById('registerForm').reset(); // รีเซ็ตฟอร์ม
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      // ถ้ามีข้อผิดพลาดในการเชื่อมต่อกับ API
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  }