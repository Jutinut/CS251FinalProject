  const editBtn = document.getElementById("editBtn");
  const inputs = document.querySelectorAll("#accountForm input");
  let isEditing = false;

  // โหลดข้อมูลจาก localStorage เมื่อเปิดหน้า
  window.addEventListener("DOMContentLoaded", function () {
    const fullName = localStorage.getItem("fullName");
    const phone = localStorage.getItem("phone");
    const salary = localStorage.getItem("salary");

    if (fullName) document.getElementById("full-name").value = fullName;
    if (phone) document.getElementById("phone").value = phone;
    if (salary) document.getElementById("salary").value = salary;

    // อัปเดตชื่อบนหัวโปรไฟล์ด้วย
    if (fullName) document.getElementById("username").textContent = fullName;
  });

  // กดปุ่ม Edit / Save
  editBtn.addEventListener("click", function () {
    isEditing = !isEditing;

    inputs.forEach(input => {
      input.readOnly = !isEditing;
    });

    if (isEditing) {
      editBtn.textContent = "Save";
    } else {
      // บันทึกลง localStorage
      const fullName = document.getElementById("full-name").value;
      const phone = document.getElementById("phone").value;
      const salary = document.getElementById("salary").value;

      localStorage.setItem("fullName", fullName);
      localStorage.setItem("phone", phone);
      localStorage.setItem("salary", salary);

      // แสดงชื่อใหม่บนหัวโปรไฟล์
      document.getElementById("username").textContent = fullName;

      alert("ข้อมูลถูกบันทึกแล้ว ✅");
      editBtn.textContent = "Edit";
    }
  });

  function logout() {
    if (confirm("คุณต้องการออกจากระบบหรือไม่?")) {
      window.location.href = "login.html";
    }
  }