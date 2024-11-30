// Populate city select box
const citySelect = document.getElementById("city");
address.data.forEach((city) => {
  const option = document.createElement("option");
  option.value = city.level1_id;
  option.text = city.name;
  citySelect.appendChild(option);
});

// Function to populate district select box based on selected city
function populateDistricts() {
  const districtSelect = document.getElementById("district");
  districtSelect.innerHTML = '<option value="">Chọn Quận/Huyện</option>';
  const cityId = citySelect.value;
  const selectedCity = address.data.find((city) => city.level1_id === cityId);

  if (selectedCity) {
    selectedCity.level2s.forEach((district) => {
      const option = document.createElement("option");
      option.value = district.level2_id;
      option.text = district.name;
      districtSelect.appendChild(option);
    });
  }
  // Clear the wards select box
  document.getElementById("ward").innerHTML =
    '<option value="">Chọn Phường/Xã</option>';
}

// Function to populate ward select box based on selected district
function populateWards() {
  const wardSelect = document.getElementById("ward");
  wardSelect.innerHTML = '<option value="">Chọn Phường/Xã</option>';
  const districtId = document.getElementById("district").value;
  const cityId = citySelect.value;
  const selectedCity = address.data.find((city) => city.level1_id === cityId);
  const selectedDistrict = selectedCity?.level2s.find(
    (district) => district.level2_id === districtId
  );

  if (selectedDistrict) {
    selectedDistrict.level3s.forEach((ward) => {
      const option = document.createElement("option");
      option.value = ward.level3_id;
      option.text = ward.name;
      wardSelect.appendChild(option);
    });
  }
}
