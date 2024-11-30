let logout = document.querySelectorAll(".logout");
arrayshopbag = JSON.parse(localStorage.getItem("arrayshopbag")) || [];
logout.forEach(function (e) {
  e.addEventListener("click", () => {
    user = null;
    let mangrong = [];
    let resetshopbag = 0;
    localStorage.setItem("arrayshopbag", JSON.stringify(mangrong));
    localStorage.setItem("countarrayshopbag", JSON.stringify(resetshopbag));
    localStorage.setItem("currentUser", JSON.stringify(user));
    location.reload();
  });
});
login.forEach(function (e) {
  let user = JSON.parse(localStorage.getItem("currentUser"));
  e.addEventListener("click", () => {
    profile();
  });
});
function profile() {
  let user = JSON.parse(localStorage.getItem("currentUser"));
  if (user != null) {
    window.scrollTo(0, 0);
    midcontent.innerHTML = `<div class="leftpage">
      <h1 class="tittleheader">Hồ sơ cá nhân</h1>
      <div class="buttonGroup">
        <div class="buttonTab profilebtn active" id="btnProfile" onclick="profile();">Thông tin cá nhân</div>
        <div class="buttonTab statusbtn" id="btnStatusDelivery" onclick="hienthitheofilter(this);">
          Tình trạng đơn hàng
        </div>
      </div>
    </div>
    <div class="rightpage">
      <div class="user">
    <h1>THÔNG TIN CÁ NHÂN</h1>
    <div id="profile">
      <div class="profile-body">
        <div class="contentTab">
          <span>Email</span>
          <input
          type="text"
          class="input"
          id="email"
          value="${user.email}"
          readonly
        />
        </div>
        <div class="contentTab">
          <span>Name</span>
          <input
          type="text"
          class="input"
          id="name"
          value="${user.name}"
          readonly
        />
        </div>
        <div class="contentTab">
          <span>Phone</span>
          <input
          type="text"
          class="input"
          id="phone"
          value="${user.phone}"
          readonly
        />
        </div>
        <div class="contentTab">
          <span>Address</span>
          <div class="address_user">${user.diachi}</div>
        </div>
    </div>
    <div id="buttonEdit" onclick="chinhsuainfo()">Chỉnh sửa</div>
  </div>`;
    document.querySelector(".profilebtn").classList.add("active");
    document.querySelector(".statusbtn").classList.remove("active");
  }
}
function donhangcuauser() {
  let donhang = [];
  let shopbagispay = JSON.parse(localStorage.getItem("shopbagispay"));
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  for (let i = 0; i < shopbagispay.length; i++) {
    if (shopbagispay[i].IDuser == currentUser.userID) {
      donhang = shopbagispay[i].shopbagispayuser;
    }
  }
  return donhang;
}
function kiemtrangtrangthai(item) {
  let s = "";
  switch (item.status) {
    case "1":
      s = "Chờ xác nhận";
      break;
    case "2":
      s = "Đang đóng gói";
      break;
    case "3":
      s = "Vận chuyển";
      break;
    case "4":
      s = "Hoàn thành";
      break;
  }
  return s;
}

function statusProduct(arr) {
  let rightcontent = document.querySelector(".rightpage");
  document.querySelector(".statusbtn").classList.add("active");
  document.querySelector(".profilebtn").classList.remove("active");
  let s = `<div class="filter">
        <div class="filter-item" id="all" onclick="hienthitheofilter(this);">Tất cả</div>
        <div class="filter-item" id="1" onclick="hienthitheofilter(this);">Chờ xác nhận</div>
        <div class="filter-item" id="2" onclick="hienthitheofilter(this);">Đang đóng gói</div>
        <div class="filter-item" id="3" onclick="hienthitheofilter(this);">Vận chuyển</div>
        <div class="filter-item" id="4" onclick="hienthitheofilter(this);">Hoàn thành</div>
      </div>
      <div class="shopingbag-list">`;

  for (let i = 0; i < arr.length; i++) {
    let status = "";
    switch (arr[i].status) {
      case "1":
        status = `<i class="fas fa-hourglass-half" style="color:#FFA500"></i>
                  <span style="color:#FFA500">${kiemtrangtrangthai(
                    arr[i]
                  )}</span>`;
        break;
      case "2":
        status = `<i class="fas fa-box" style="color:#1E90FF"></i>
                  <span style="color:#1E90FF">${kiemtrangtrangthai(
                    arr[i]
                  )}</span>`;
        break;
      case "3":
        status = `<i class="fas fa-truck" style="color:#32CD32"></i>
                  <span style="color:#32CD32">${kiemtrangtrangthai(
                    arr[i]
                  )}</span>`;
        break;
      case "4":
        status = `<i class="fas fa-check-circle" style="color:#228B22"></i>
                  <span style="color:#228B22">${kiemtrangtrangthai(
                    arr[i]
                  )}</span>`;
        break;
    }

    s += `<div class="shoping-list-item">
          <div class="shoping-list-item-header">
            ${status}
          </div>
          <div class="shoping-list-item-info">
            <div class="img-item-user">
              <img src="${arr[i].img}" alt="" />
            </div>
            <div class="item-content">
              <div class="name-item">${arr[i].obj.nameSP}</div>
              <div class="size-item">${arr[i].size}</div>
              <div class="quatity-price-item">
                <div class="quatity-item">x${arr[i].soluong}</div>
                <div class="price-item">${arr[i].obj.price}đ</div>
              </div>
              <div class="money">
                <div class="thanhtien">Thành tiền:</div>
                <div class="intomoney">${
                  parseInt(arr[i].obj.price) * parseInt(arr[i].soluong)
                }đ</div>
              </div>
            </div>
          </div>
        </div>`;
  }
  s += `</div>`;
  rightcontent.innerHTML = s;
}

let isEdit = false;
function chinhsuainfo() {
  const buttonEdit = document.querySelector("#buttonEdit");
  let usercurrent = JSON.parse(localStorage.getItem("currentUser"));
  const input = document.querySelectorAll("input");
  const name = document.querySelector("#name");
  const phone = document.querySelector("#phone");
  const address_user = document.querySelector(".address_user");

  if (buttonEdit != null) {
    buttonEdit.addEventListener("click", () => {
      if (isEdit) {
        input.forEach(function (e) {
          e.setAttribute("readonly", true);
          e.classList.remove("active");
        });

        let sonha = document.querySelector("#numberaddress");
        let thanhpho = document.querySelector("#city");
        let quan = document.querySelector("#district");
        let huyen = document.querySelector("#ward");

        if (sonha && thanhpho && quan && huyen) {
          sonha = sonha.value.trim();
          thanhpho = thanhpho.value.trim();
          quan = quan.value.trim();
          huyen = huyen.value.trim();

          if (sonha && thanhpho && quan && huyen) {
            let s = `${sonha}, ${huyen}, ${quan}, ${thanhpho}`;

            // Cập nhật thông tin người dùng
            usercurrent.name = name.value;
            usercurrent.phone = phone.value;
            usercurrent.diachi = s;

            // Cập nhật localStorage và sử dụng setTimeout để trì hoãn việc thay đổi giao diện
            setTimeout(() => {
              localStorage.setItem("currentUser", JSON.stringify(usercurrent));
              updateUserDetails(usercurrent);
              // Cập nhật lại giao diện
              profile();

              // Đổi nút thành "Chỉnh sửa"
              buttonEdit.textContent = "Chỉnh sửa";
            }, 500); // Thêm thời gian trì hoãn (500ms)
          } else {
            toast({
              title: "ERROR",
              message: "Các trường địa chỉ chưa đầy đủ!",
              type: "error",
              duration: 5000,
            });
          }
        }
      } else {
        // Nếu là chế độ chỉnh sửa, mở các trường input
        input.forEach(function (e) {
          e.removeAttribute("readonly");
          e.classList.add("active");
        });

        // Thay thế phần address_user với các input/select mới
        address_user.innerHTML = `
          <input type="text" id="numberaddress" placeholder="Nhập số nhà & tên đường" />
          <label for="city">Thành phố:</label>
          <select id="city" onchange="populateDistricts()">
            <option value="">Chọn Thành phố</option>
          </select>
          <label for="district">Quận/Huyện:</label>
          <select id="district" onchange="populateWards()">
            <option value="">Chọn Quận/Huyện</option>
          </select>
          <label for="ward">Phường/Xã:</label>
          <select id="ward">
            <option value="">Chọn Phường/Xã</option>
          </select>`;

        // Đảm bảo dữ liệu được hiển thị trong các select
        populateCities();

        // Đổi nút thành "Lưu lại"
        buttonEdit.textContent = "Lưu lại";
      }

      // Toggle trạng thái chỉnh sửa
      isEdit = !isEdit;
    });
  }
}

function mangtheofilter(statusid, arr) {
  let mang = [];
  if (statusid == "btnStatusDelivery" || statusid == "all") {
    mang = arr;
  } else {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].status == statusid) {
        mang.push(arr[i]);
      }
    }
  }
  return mang;
}
function hienthitheofilter(item) {
  let mang = [];
  let usercurrent = JSON.parse(localStorage.getItem("currentUser"));
  let arrayshopbagispay =
    JSON.parse(localStorage.getItem("shopbagispay")) || [];
  for (let i = 0; i < arrayshopbagispay.length; i++) {
    if (arrayshopbagispay[i].IDuser == usercurrent.userID) {
      mang = arrayshopbagispay[i].shopbagispayuser;
    }
  }
  let mangfilter = mangtheofilter(item.id, mang);
  statusProduct(mangfilter);
}
