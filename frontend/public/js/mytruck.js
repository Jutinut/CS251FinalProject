document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector(".delivered-button");
    const dots = document.querySelectorAll(".status-dot");
    const lastDot = dots[dots.length - 1];

    button.addEventListener("click", function () {
      // ✅ เปลี่ยนจุดสุดท้ายให้เป็น completed
      lastDot.classList.add("completed");

      // ✅ อัปเดตปุ่ม
      button.textContent = "✓ Completed";
      button.disabled = true;
      button.style.backgroundColor = "green";
      button.style.cursor = "not-allowed";

      // ✅ แจ้งเตือน
      alert("📦 พัสดุถูกทำเครื่องหมายว่าจัดส่งสำเร็จแล้ว");
    });
  });