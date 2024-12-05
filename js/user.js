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
  loadpage();
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
          <div class="address_user"></div>
        </div>
    </div>
  </div>`;
    showaddress();
    document.querySelector(".profilebtn").classList.add("active");
    document.querySelector(".statusbtn").classList.remove("active");
  }
}
function showaddress() {
  let diachi = document.querySelector(".address_user");
  // Lấy thông tin các địa chỉ đã lưu trong localStorage
  let addressUsers =
    JSON.parse(localStorage.getItem("addressUserCurrent")) || [];
  let user = JSON.parse(localStorage.getItem("currentUser"));
  let addressUser = getCurrentUserAddresses(); // Hàm này trả về thông tin địa chỉ của người dùng hiện tại

  // Kiểm tra nếu địa chỉ người dùng có tồn tại
  s = `
  <select class="address_user_arr">`;

  if (addressUser && addressUser.address.length > 0) {
    for (let i = 0; i < addressUser.address.length; i++) {
      s += `<option value=${i}>${addressUser.address[i]}</option>`;
    }
  }
  document.querySelector(".address_user").innerHTML = s;
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
  switch (item.status) {
    case "1":
      return "Chờ xác nhận";
    case "2":
      return "Đang đóng gói";
    case "3":
      return "Vận chuyển";
    case "4":
      return "Hoàn thành";
    case "5":
      return "Đã Huỷ";
    default:
      return "Không xác định";
  }
}
function kiemtraconhanguser(item) {
  let products = JSON.parse(localStorage.getItem("arrayproducts"));
  for (let i = 0; i < products.length; i++) {
    console.log(products[i].idproduct, item.obj.idproduct);
    if (products[i].idproduct == item.obj.idproduct) {
      // Kiểm tra tồn kho cho các kích cỡ
      if (item.size in products[i].quantity) {
        return products[i].quantity[item.size] > 0; // Kiểm tra số lượng của size
      }
    }
  }
  return false; // Không tìm thấy sản phẩm hoặc không có size
}
function addShopingBaguser(item) {
  item.status = "1";
  if (kiemtradangnhap() === true) {
    // Check if the selected size is in stock
    if (!kiemtraconhanguser(item)) {
      // console.log(kiemtraconhanguser(item));
      toast({
        title: "ERROR",
        message: "Size " + item.size + " đã hết hàng",
        type: "error",
        duration: 5000,
      });
      return;
    }

    getarrayshopbag();
    soluongspgiohang = arrayshopbag.length;

    // Check if the product already exists in the shopping bag
    let existingItem = kiemtradacotronggiohang(item);
    if (existingItem != null) {
      // Check if adding the new quantity would exceed the available stock
      let products = JSON.parse(localStorage.getItem("arrayproducts"));
      let product = products.find((p) => p.idproduct === item.obj.idproduct);
      let availableStock = product.quantity[item.size];
      if (existingItem.soluong + item.soluong > availableStock) {
        toast({
          title: "ERROR",
          message: "Không đủ hàng trong kho",
          type: "error",
          duration: 5000,
        });
        return;
      } else {
        existingItem.soluong += item.soluong;
        toast({
          title: "SUCCESS",
          message: "Thêm vào giỏ hàng thành công",
          type: "success",
          duration: 5000,
        });
      }
    } else {
      arrayshopbag.push(item);
      soluongspgiohang++;
      toast({
        title: "SUCCESS",
        message: "Thêm vào giỏ hàng thành công",
        type: "success",
        duration: 5000,
      });
    }

    localStorage.setItem("arrayshopbag", JSON.stringify(arrayshopbag)); // Save the shopping bag
    updatecurrentuser();
    localStorage.setItem("countarrayshopbag", JSON.stringify(soluongspgiohang));

    // Update the display of the number of products in the shopping bag
    updateshopingbag();
    chitiethoadon(); // Update the shopping bag details
  } else {
    toast({
      title: "ERROR",
      message: "Vui lòng đăng nhập",
      type: "error",
      duration: 5000,
    });
  }
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
        <div class="filter-item" id="5" onclick="hienthitheofilter(this);">Đã Huỷ</div>
      </div>
      <div class="shopingbag-list">`;

  for (let i = 0; i < arr.length; i++) {
    let status = "";
    let currentTime = new Date(arr[i].time).toLocaleString(); // Lấy thời gian từ đối tượng và chuyển đổi thành chuỗi

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
      case "5":
        status = `<i class="fas fa-times-circle" style="color:#FF0000"></i>
                  <span style="color:#FF0000">${kiemtrangtrangthai(
                    arr[i]
                  )}</span>`;
        break;
    }

    let objcolorcurrentuser = {
      obj: arr[i].obj,
      color: arr[i].color,
      img: arr[i].img,
      soluong: arr[i].soluong,
      size: arr[i].size,
      diachi: arr[i].diachi,
      paymenttype: arr[i].paymenttype,
      status: arr[i].status,
      time: arr[i].time, // Thêm thời gian vào đối tượng
    };

    // Bắt đầu tạo phần tử HTML cho mỗi sản phẩm
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

              <!-- Thêm hiển thị thời gian -->
              <div class="time-order">
                <span>Thời gian: ${currentTime}</span>
              </div>

              <!-- Thêm địa chỉ của đơn hàng -->
              <div class="address-order">
                <span>Địa chỉ: ${arr[i].diachi}</span>
              </div>
              <div class="typepay">${
                arr[i].paymenttype == "1"
                  ? "Thanh toán bằng ngân hàng"
                  : "Thanh toán khi nhận hàng"
              }</div>
            </div>
          </div>
          <div class="money">
            <div class="thanhtien">Thành tiền:</div>
            <div class="intomoney">${
              parseInt(arr[i].obj.price) * parseInt(arr[i].soluong)
            }đ</div>
          </div>
          <div class="actions">`;

    // Trạng thái "Chờ xác nhận" và "Đang đóng gói" có thêm nút "Huỷ đơn"
    if (arr[i].status == 1 || arr[i].status == 2) {
      s += `<div class="cancelorder" onclick='cancelorderproduct(${JSON.stringify(
        arr[i]
      )})'>Huỷ đơn</div>`;
    }

    // Trạng thái "Đã Huỷ" có thêm nút "Mua lại"
    if (arr[i].status == 5) {
      s += `<div class="Buy-details">
                <div class="Buy" onclick='addShopingBaguser(${JSON.stringify(
                  objcolorcurrentuser
                )})'>Mua lại</div>
              </div>`;
    }

    s += `</div></div>`;
  }

  s += `</div>`;
  rightcontent.innerHTML = s;
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
  loadpage(); // Làm mới trang nếu cần

  let mang = [];
  let usercurrent = JSON.parse(localStorage.getItem("currentUser"));
  let arrayshopbagispay =
    JSON.parse(localStorage.getItem("shopbagispay")) || [];

  // Lấy lại mảng giỏ hàng của người dùng hiện tại
  for (let i = 0; i < arrayshopbagispay.length; i++) {
    if (arrayshopbagispay[i].IDuser == usercurrent.userID) {
      mang = arrayshopbagispay[i].shopbagispayuser;
    }
  }

  // Áp dụng bộ lọc theo trạng thái
  let mangfilter = mangtheofilter(item.id, mang);
  statusProduct(mangfilter); // Hiển thị lại sản phẩm sau khi lọc
}

function cancelorderproduct(item) {
  let user = JSON.parse(localStorage.getItem("currentUser"));
  let shopbagispay = JSON.parse(localStorage.getItem("shopbagispay")) || [];

  // Tìm sản phẩm trong giỏ hàng của người dùng
  for (let i = 0; i < shopbagispay.length; i++) {
    if (shopbagispay[i].IDuser == user.userID) {
      // Cập nhật trạng thái của sản phẩm
      for (let j = 0; j < shopbagispay[i].shopbagispayuser.length; j++) {
        if (
          shopbagispay[i].shopbagispayuser[j].time == item.time &&
          shopbagispay[i].shopbagispayuser[j].size == item.size
        ) {
          // So sánh bằng thời gian để tìm đúng sản phẩm
          shopbagispay[i].shopbagispayuser[j].status = "5"; // Thay đổi trạng thái "Đã Huỷ"
          console.log(
            "Trạng thái sau khi thay đổi:",
            shopbagispay[i].shopbagispayuser[j]
          );
        }
      }
    }
  }

  // Cập nhật lại localStorage sau khi thay đổi
  localStorage.setItem("shopbagispay", JSON.stringify(shopbagispay));

  // Cập nhật kho
  updatewarehouse(item);

  // Sau khi huỷ đơn, bạn cần làm mới giao diện và áp dụng lại bộ lọc
  hienthitheofilter({ id: "all" }); // Truyền đối tượng { id: "all" } để hiển thị tất cả sản phẩm
}

function updatewarehouse(item) {
  let products = JSON.parse(localStorage.getItem("arrayproducts"));
  for (let i = 0; i < products.length; i++) {
    if (products[i].idproduct == item.obj.idproduct) {
      switch (item.size) {
        case "A":
          products[i].quantity.A =
            parseInt(item.soluong) + parseInt(products[i].quantity.A);
          break;
        case "B":
          products[i].quantity.B =
            parseInt(item.soluong) + parseInt(products[i].quantity.B);
          break;
        case "C":
          products[i].quantity.C =
            parseInt(item.soluong) + parseInt(products[i].quantity.C);
          break;
        case "D":
          products[i].quantity.D =
            parseInt(item.soluong) + parseInt(products[i].quantity.D);
          break;
      }
    }
  }
  localStorage.setItem("arrayproducts", JSON.stringify(products));
}
function detailorderproduct() {
  console.log("huy2");
}
