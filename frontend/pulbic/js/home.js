  const parcelData = {
    "PKG123": "📦 จัดส่งสำเร็จแล้ว",
    "PKG456": "🚚 ระหว่างขนส่ง",
    "PKG789": "⏳ รอจัดส่ง",
  };

  document.querySelector(".track-button").addEventListener("click", function () {
    const trackingInput = document.getElementById("tracking-number");
    const trackingNumber = trackingInput.value.trim().toUpperCase();
    const resultBox = document.getElementById("status-result");

    if (!trackingNumber) {
      resultBox.textContent = "⚠️ กรุณาใส่หมายเลขพัสดุก่อนติดตาม";
      resultBox.style.color = "orangered";
      return;
    }

    // ตรวจสอบหมายเลขในฐานข้อมูลจำลอง
    if (parcelData[trackingNumber]) {
      resultBox.textContent = parcelData[trackingNumber];
      resultBox.style.color = "green";
    } else {
      resultBox.textContent = "❌ ไม่พบข้อมูลพัสดุ " + trackingNumber;
      resultBox.style.color = "crimson";
    }
  });