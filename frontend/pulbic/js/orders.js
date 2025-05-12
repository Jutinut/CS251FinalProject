const slider = document.getElementById("weightSlider");
    const weightValue = document.getElementById("weightValue");
    slider.addEventListener("input", function () {
      weightValue.textContent = parseFloat(slider.value).toFixed(1) + " KG";
    });

    const parcels = [];

    function addParcel() {
      const phone = document.getElementById("phone").value.trim();
      const name = document.getElementById("name").value.trim();
      const area = document.getElementById("area").value.trim();
      const fullAddress = document.getElementById("fullAddress").value.trim();
      const weight = parseFloat(document.getElementById("weightSlider").value).toFixed(1);

      if (!phone || !name || !area || !fullAddress) {
        alert("กรุณากรอกข้อมูลให้ครบทุกช่องก่อนเพิ่มพัสดุ");
        return;
      }

      const parcel = { phone, name, area, fullAddress, weight };
      parcels.push(parcel);

      const list = document.getElementById("parcelList");
      const item = document.createElement("li");
      item.textContent = `${name} (${phone}) - ${area} - ${weight} KG`;
      list.appendChild(item);

      // Clear form inputs (except weight)
      document.getElementById("phone").value = "";
      document.getElementById("name").value = "";
      document.getElementById("area").value = "";
      document.getElementById("fullAddress").value = "";
    }

    document.getElementById("parcelForm").addEventListener("submit", function(e) {
      e.preventDefault();
      if (parcels.length === 0) {
        alert("กรุณาเพิ่มอย่างน้อย 1 พัสดุก่อนกดยืนยัน");
        return;
      }
      console.log("ส่งพัสดุทั้งหมด:", parcels);
      alert("ระบบได้รับข้อมูลพัสดุทั้งหมดแล้ว (" + parcels.length + " รายการ)");
      // ที่นี่สามารถส่งไปยัง backend ได้ผ่าน fetch() หรือ form.submit()
    });