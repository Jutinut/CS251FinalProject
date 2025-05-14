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
