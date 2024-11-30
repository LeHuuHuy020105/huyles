let ArrProduct = JSON.parse(localStorage.getItem("arrayproducts"));
let sell = JSON.parse(localStorage.getItem("shopbagispay")) || [];
localStorage.setItem("currentUser", JSON.stringify(null));
let Arrsell = sell.flatMap((i) => i.shopbagispayuser);
localStorage.setItem("arrayshopbag", JSON.stringify(null));
localStorage.setItem("countarrayshopbag", JSON.stringify(null));
let typeproducts = [
  { typeid: "aothun#", typename: "Áo thun" },
  { typeid: "polo#", typename: "Polo" },
  { typeid: "somi#", typename: "Sơ mi" },
  { typeid: "hoodie#", typename: "Hoodie" },
  { typeid: "sweater#", typename: "Sweater" },
  { typeid: "aokhoac#", typename: "Áo khoác" },
];
function toast({ title = "", message = "", type = "", duration = 5000 }) {
  const main = document.getElementById("toast");
  if (main) {
    const toast = document.createElement("div");

    toast.onclick = function (e) {
      if (e.target.closest(".toast__close")) {
        main.removeChild(toast);
      }
    };

    const icons = {
      success: "fa-solid fa-circle-check",
      error: "fa-solid fa-circle-exclamation",
    };
    const icon = icons[type];

    toast.classList.add("toast", `toast--${type}`);
    toast.innerHTML = `
        <div class="toast__icon">
          <i class="${icon}"></i>
        </div>
        <div class="toast__body">
          <h3 class="toast__title">${title}</h3>
          <p class="toast__msg">${message}</p>
        </div>
        <div class="toast__close">
          <i class="fa-solid fa-xmark"></i>
        </div>
    `;
    main.appendChild(toast);
  }
}
// Hàm tạo id SP
function makeIDproduct() {
  for (let i = 0; i < ArrProduct.length; i++) {
    ArrProduct[i].idproduct = ArrProduct[i].nametag + i;
  }
}

//----------------sp-------------------------
// Hàm xác định trạng thái sản phẩm
function productSatus() {
  ArrProduct.forEach((i) => {
    let count = i.quantity.A + i.quantity.B + i.quantity.C + i.quantity.D;
    let status = "C.XÁC ĐỊNH";
    let colorStatus = "#000";
    if (count > 10) {
      status = "CÒN HÀNG";
      colorStatus = "#32CD32";
    } else if (count == 0) {
      status = "HẾT HÀNG";
      colorStatus = "#EE4B2B";
    } else if (count <= 10) {
      status = "SẮP HẾT";
      colorStatus = "#FDDA0D";
    }
    i.status = status;
    i.colorStatus = colorStatus;
  });
}

// Hàm tạo danh sách sản phẩm
function listSP(arr) {
  let s = "";
  makeIDproduct();
  productSatus();
  arr.forEach((product) => {
    let count =
      product.quantity.A +
      product.quantity.B +
      product.quantity.C +
      product.quantity.D;
    const Price = product.price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    s += `
            <div oncontextmenu="showContextMenu(event, this)" class="list">
                <span style="width: 10%" nametag ="${product.nametag}" class="idProduct">${product.idproduct}</span>
                <img style="width: 20%" src="${product.img}" class="imgProduct" alt="Ảnh">
                <span style="width: 30%" class="nameProduct">${product.nameSP}</span>
                <span style="width: 10%" data="${product.colorr1}" class="colorProduct">${product.colorr1}</span>
                <span style="width: 10%" dataA="${product.quantity.A}" dataB="${product.quantity.B}" dataC="${product.quantity.C}" dataD="${product.quantity.D}" class="countProduct">${count}</span>
                <span style="width: 10%" class="priceProduct">${Price}</span>
                <span style="width: 10%; color: ${product.colorStatus}" class="statusProduct" style="color:${product.colorStatus}">${product.status}</span>
            </div>
    `;
  });
  return s;
}
// Hàm đếm số lượng sản phẩm
function countProduct(arr) {
  return arr.length;
}
// Hàm tìm kiếm sản phẩm
function searchSP() {
  const comboType = document.getElementById("comboType").value;
  const comboStatus = document.getElementById("comboStatus").value;
  let filteredProducts = ArrProduct;
  if (comboType !== "0") {
    filteredProducts = filteredProducts.filter(
      (product) => product.nametag === comboType
    );
  }
  if (comboStatus !== "0") {
    filteredProducts = filteredProducts.filter((product) => {
      if (comboStatus === "1") return product.status === "CÒN HÀNG";
      if (comboStatus === "2") return product.status === "SẮP HẾT";
      if (comboStatus === "3") return product.status === "HẾT HÀNG";
    });
  }
  document.querySelector("#storage-body").innerHTML = listSP(filteredProducts);
  document.querySelector("#amountOfProduct").innerText =
    countProduct(filteredProducts);
}
// Hàm render quản lý san pham
function renderqlsp() {
  document.querySelector(".page-right").innerHTML = `<div class="qlsp">
                <div class="title"><h1>QUẢN LÝ SẢN PHẨM</h1></div>
                <div class="btnAdd"><div class="circle" onclick="btnAdd()"><i class="fa-solid fa-plus"></i></div></div>
                <div class="groupOption">
                        <select name="" class="box" id="comboType" onchange="searchSP()" >
                            <option value="0">Tất cả</option>
                            <option value="aothun#">Áo thun</option>
                            <option value="polo#">Polo</option>
                            <option value="somi#">Sơ mi</option>
                            <option value="hoodie#">Hoodie</option>
                            <option value="sweater#">Sweater</option>
                            <option value="aokhoac#">Áo khoác</option>
                        </select>
                        <select name="" class="box" id="comboStatus" onchange="searchSP()" >
                            <option value="0">Tất cả</option>
                            <option value="1">CÒN HÀNG</option>
                            <option value="2">SẮP HẾT</option>
                            <option value="3">HẾT HÀNG</option>
                        </select>
                        <div class="box">
                            <div class="contentBox">
                                <div class="leftBox">
                                    <h2 id="amountOfProduct">0</h2>
                                    <span>SẢN PHẨM</span>
                                </div>
                                <i class="fa-solid fa-star"></i>
                            </div>
                        </div>
                </div>
                <div class="titleCol">
                    <span style="width: 10%" class="idProduct">ID</span>
                    <span style="width: 20% ; padding-left: 7%" class="imgProduct">Hình ảnh</span>
                    <span style="width: 30% ; padding-left: 5%" class="nameProduct">Tên sản phẩm</span>
                    <span style="width: 10%" class="colorProduct">Màu sắc</span>
                    <span style="width: 10%" class="countProduct">Số lượng</span>
                    <span style="width: 10%" class="priceProduct">Đơn giá</span>
                    <span style="width: 10%" class="statusProduct">Trạng thái</span>
                </div>
                <div id="storage-body"></div>`;
  searchSP();
}

// quan - chuot phai ------

// Hàm hiển thị menu tùy chỉnh
function showContextMenu(event, element) {
  event.preventDefault();
  // Lấy vị trí chuột
  const posX = event.pageX;
  const posY = event.pageY;
  // Hiển thị menu ở vị trí chuột
  contextMenu.style.display = "block";
  contextMenu.style.left = `${posX}px`;
  contextMenu.style.top = `${posY}px`;

  const idProduct = element.querySelector(".idProduct").textContent;
  const img = element.querySelector(".imgProduct").src;
  const nameProduct = element.querySelector(".nameProduct").textContent;
  const colorProduct = element.querySelector(".colorProduct").textContent;
  const codecolor = element.querySelector(".colorProduct").getAttribute("data");
  const countA = element.querySelector(".countProduct").getAttribute("dataA");
  const countB = element.querySelector(".countProduct").getAttribute("dataB");
  const countC = element.querySelector(".countProduct").getAttribute("dataC");
  const countD = element.querySelector(".countProduct").getAttribute("dataD");
  const price = element.querySelector(".priceProduct").textContent;
  const nametag = element.querySelector(".idProduct").getAttribute("nametag");
  let typeProduct = "";
  switch (true) {
    case nametag.startsWith("hoodie#"):
      typeProduct = "Hoodie";
      break;
    case nametag.startsWith("sweater#"):
      typeProduct = "Sweater";
      break;
    case nametag.startsWith("somi#"):
      typeProduct = "Sơ mi";
      break;
    case nametag.startsWith("polo#"):
      typeProduct = "Polo";
      break;
    case nametag.startsWith("aothun#"):
      typeProduct = "Áo thun";
      break;
    default:
      typeProduct = "Không xác định";
  }
  //xoa san pham
  document.getElementById("deleteProduct").addEventListener("click", () => {
    toggleConfirmationDialog(true);
    document.querySelector(".outbackround").classList.add("actoutbackground");
    document.getElementById("yes").onclick = () => {
      for (let i = 0; i < countProduct(ArrProduct); i++) {
        if (ArrProduct[i].idproduct === idProduct) {
          ArrProduct.splice(i, 1); // 1 la vi tri roi
          i--;
          break;
        }
      }
      localStorage.setItem("arrayproducts", JSON.stringify(ArrProduct));
      renderqlsp();
      toggleConfirmationDialog(false);
      closeTabb();
      document
        .querySelector(".outbackround")
        .classList.remove("actoutbackground");
    };
    document.getElementById("no").onclick = () => {
      toggleConfirmationDialog(false);
      closeTabb();
      document
        .querySelector(".outbackround")
        .classList.remove("actoutbackground");
    };
  });

  //chinh sua
  document.getElementById("viewDetails").addEventListener("click", () => {
    document.querySelector(".outbackround").classList.add("actoutbackground");
    document.querySelector(".viewmenu").classList.add("actz");
    document.querySelector(".viewmenu").classList.remove("nonez");

    document.querySelector(".viewmenu").innerHTML = `<div id="tabAddProduct">
      <div class="headTab">
          <span class="title">CHỈNH SỬA</span>
          <span onclick ="closeTabz()" class="closeTab">ĐÓNG</span>
      </div>
      <form action="">
        <div class="bodyTab">
            <div class="leftTab">
                <div class="contentTab">
                    <span>ID: </span>
                    <span class="ID">${idProduct}</span>
                </div>
                <div class="contentTab">
                    <div id="imageContainer"> 
                      <img src="${img}" class="imgPreview">
                    </div>
                    <input type="file" name="file" id="file" class="inputfile" accept="image/*" onchange="onloandimg(this)">
                    <label style="margin-left:-75px;" for="file">Chọn ảnh</label>
                </div>
                    <div class="contentTab"> 
                        <span>Tên sản phẩm: </span>
                        <input style="width: 50%" type="text" placeholder="Tên sản phẩm" value="${nameProduct}" id="nameAddProduct">
                    </div>
                    <div class="contentTab colorInput">
                        <span>Màu sắc: </span>
                        <input style="width: 25%" type="text" placeholder="[ĐEN, TRẮNG, ....]" value="${colorProduct}" id="colorAddProduct">
                        <input style="width: 25%" type="text" placeholder="Mã màu [#000,#fff]" value="${codecolor}" id="codecolorAddProduct">
                    </div>
                    <div class="contentTab">
                        <span>Số lượngA: </span>
                        <input style="width: 20%" type="text" id="countAddProductA" placeholder="Số lượng" value="${countA}">
                    </div>
            </div>
            <div class="rightTab">
                         <div class="contentTab">
                            <span>Số lượngB: </span>
                            <input style="width: 20%" type="text" id="countAddProductB" placeholder="Số lượng" value="${countB}">
                        </div>
                         <div class="contentTab">
                            <span>Số lượngC: </span>
                            <input style="width: 20%" type="text" id="countAddProductC" placeholder="Số lượng" value="${countC}">
                        </div>
                         <div class="contentTab">
                            <span>Số lượngD: </span>
                            <input style="width: 20%" type="text" id="countAddProductD" placeholder="Số lượng" value="${countD}">
                        </div>
                        <div class="contentTab">
                            <span>Đơn giá: </span>
                            <input style="width: 30%" type="text" id="priceAddProduct" placeholder="Đơn giá" value="${price}">
                        </div>
                        <div class="contentTab">
                            <span>Name Tag </span>
                            <input style="width: 30%" type="text" placeholder="Name Tag" value="${nametag}" id="nameimgAddProduct">
                        </div>
                        <div class="contentTab">
                            <span>Loại </span>
                            <input readonly type="text" value="${typeProduct}" id="typeAddProduct">
                        </div>
            </div>
        </div>
        <div onclick="chinhsua()" class="btnAccept">
            <div class="content-btn">
                <buttom type="sumbit">HOÀN TẤT</buttom>
            </div>
        </div>
      </form>
  </div>`;
  });
}

function chinhsua() {
  let background = document.querySelector(".outbackround");
  let l = document.querySelector(".btnAddproduct");
  l.classList.remove("actz");
  l.classList.add("nonez");
  background.classList.remove("actoutbackground");

  const id = document.querySelector(".ID").innerText;

  const nameProduct = document.getElementById("nameAddProduct").value.trim();
  const colorProduct = document.getElementById("colorAddProduct").value.trim();
  const codecolorProduct = document
    .getElementById("codecolorAddProduct")
    .value.trim();
  const countProductA = parseInt(
    document.getElementById("countAddProductA").value.trim()
  );
  const countProductB = parseInt(
    document.getElementById("countAddProductB").value.trim()
  );
  const countProductC = parseInt(
    document.getElementById("countAddProductC").value.trim()
  );
  const countProductD = parseInt(
    document.getElementById("countAddProductD").value.trim()
  );
  const priceProduct = parseFloat(
    document.getElementById("priceAddProduct").value.trim()
  );
  const nametagProduct = document
    .getElementById("nameimgAddProduct")
    .value.trim();
  const imgElement = document.querySelector(".imgPreview");
  const img = imgElement ? imgElement.src : ""; // Null check for imgPreview
  if (img.startsWith(".")) {
    img = img.substring(1);
  }
  for (let i = 0; i < countProduct(ArrProduct); i++) {
    if (ArrProduct[i].idproduct === id) {
      ArrProduct[i].colorr1 = colorProduct;
      ArrProduct[i].colorr1 = codecolorProduct;
      ArrProduct[i].quantity.A = countProductA;
      ArrProduct[i].quantity.B = countProductB;
      ArrProduct[i].quantity.C = countProductC;
      ArrProduct[i].quantity.D = countProductD;
      ArrProduct[i].price = priceProduct;
      ArrProduct[i].nameSP = nameProduct;
      ArrProduct[i].img = img;
      ArrProduct[i].nametag = nametagProduct;
    }
  }
  closeTabz();
  localStorage.setItem("arrayproducts", JSON.stringify(ArrProduct));
  renderqlsp();
}
// Hàm ẩn menu
function hideContextMenu() {
  let z = document.getElementById("contextMenu");
  if (z != null) {
    z.style.display = "none";
  }
}

// Ẩn menu khi nhấp chuột ra ngoài
window.addEventListener("click", hideContextMenu);
// ---------------------------------------------------------------------------------
// thong ke

const namee = ["Sweater", "Sơ mi", "Hoodie", "Áo khoác", "Áo thun", "Polo"];

// Hàm tạo biểu đồ
function createChart() {
  const ctx = document.getElementById("grapbox").getContext("2d");
  const chartData = {
    labels: namee,
    datasets: [
      {
        label: "Đã Bán",
        data: [
          Arrsell.filter((i) => i.obj.nametag === "sweater#").reduce(
            (i, n) => i + n.soluong,
            0
          ),
          Arrsell.filter((i) => i.obj.nametag === "somi#").reduce(
            (i, n) => i + n.soluong,
            0
          ),
          Arrsell.filter((i) => i.obj.nametag === "hoodie#").reduce(
            (i, n) => i + n.soluong,
            0
          ),
          Arrsell.filter((i) => i.obj.nametag === "aokhoac#").reduce(
            (i, n) => i + n.soluong,
            0
          ),
          Arrsell.filter((i) => i.obj.nametag === "aothun#").reduce(
            (i, n) => i + n.soluong,
            0
          ),
          Arrsell.filter((i) => i.obj.nametag === "polo#").reduce(
            (i, n) => i + n.soluong,
            0
          ),
        ],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
          "rgb(255, 205, 86)",
          "rgb(201, 203, 207)",
          "rgb(54, 162, 235)",
          "rgb(70, 182, 222)",
        ],
      },
    ],
  };
  new Chart(ctx, {
    type: "polarArea",
    data: chartData,
    options: {},
  });
}

//mo menu them san pham
function btnAdd() {
  let backround = document.querySelector(".outbackround");
  let s = document.querySelector(".btnAddproduct");
  s.classList.add("actz");
  s.classList.remove("nonez");
  backround.classList.add("actoutbackground");
  renderBtnadd();
}
//dong menu them san pham
function closeTabb() {
  let backround = document.querySelector(".outbackround");
  let s = document.querySelector(".btnAddproduct");
  s.classList.remove("actz");
  s.classList.add("nonez");
  backround.classList.remove("actoutbackground");
}
//chap nhan
function btnAccept() {
  const nameAddProduct = document.getElementById("nameAddProduct").value.trim();
  const colorAddProduct = document
    .getElementById("colorAddProduct")
    .value.trim();
  const codecolorAddProduct = document
    .getElementById("codecolorAddProduct")
    .value.trim();
  const countAddProductA = parseInt(
    document.getElementById("countAddProductA").value.trim()
  );
  const countAddProductB = parseInt(
    document.getElementById("countAddProductB").value.trim()
  );
  const countAddProductC = parseInt(
    document.getElementById("countAddProductC").value.trim()
  );
  const countAddProductD = parseInt(
    document.getElementById("countAddProductD").value.trim()
  );
  const priceAddProduct = parseFloat(
    document.getElementById("priceAddProduct").value.trim()
  );
  const nametagProduct = document.getElementById("nametagProduct").value.trim();

  // Validation dữ liệu
  if (
    !validateInputs(
      nameAddProduct,
      colorAddProduct,
      priceAddProduct,
      countAddProductA,
      countAddProductB,
      countAddProductC,
      countAddProductD
    )
  ) {
    alert("Vui lòng nhập đầy đủ và đúng dữ liệu.");
    return;
  }
  // Tạo sản phẩm mới
  const id = `${nametagProduct}#${countProduct(ArrProduct) + 1}`;
  const imgElement = document.querySelector(".imgPreview");
  const img = imgElement ? imgElement.src : ""; // Null check cho imgPreview
  const nametag = `${nametagProduct}#`;

  // Hiển thị xác nhận
  toggleConfirmationDialog(true);

  // Gắn sự kiện xác nhận
  document.getElementById("yes").onclick = () => {
    const newProduct = createProduct({
      idproduct: id,
      nameSP: nameAddProduct,
      img: img,
      price: priceAddProduct,
      quantity: {
        A: countAddProductA,
        B: countAddProductB,
        C: countAddProductC,
        D: countAddProductD,
      },
      nametag: nametag,
      nameColor1: colorAddProduct,
      colorr1: codecolorAddProduct,
    });

    // Cập nhật danh sách sản phẩm
    ArrProduct.push(newProduct);
    localStorage.setItem("arrayproducts", JSON.stringify(ArrProduct));
    renderqlsp();
    renderBtnadd();
    toggleConfirmationDialog(false);
    closeTabb();
  };

  document.getElementById("no").onclick = () => {
    toggleConfirmationDialog(false);
    closeTabb();
  };
}

function validateInputs(name, color, price, ...counts) {
  if (!name || !color || isNaN(price) || counts.some((count) => isNaN(count))) {
    return false;
  }
  return true;
}

// Hàm hiển thị/ẩn hộp thoại xác nhận
function toggleConfirmationDialog(show) {
  const confirmationDialog = document.querySelector(".sb");
  if (show) {
    confirmationDialog.classList.add("actsb");
    confirmationDialog.classList.remove("nonesb");
  } else {
    confirmationDialog.classList.remove("actsb");
    confirmationDialog.classList.add("nonesb");
  }
}

function createProduct({
  idproduct,
  nameSP,
  img,
  price,
  quantity,
  nametag,
  nameColor1,
  colorr1,
}) {
  return {
    idproduct: idproduct,
    nameSP: nameSP,
    img: img,
    price: price,
    quantity: quantity,
    nametag: nametag,
    nameColor1: nameColor1,
    colorr1: colorr1,
  };
}
// tai anh len
function onloandimg(input) {
  const imageContainer = document.getElementById("imageContainer");
  const file = input.files[0]; // Lấy tệp đầu tiên

  if (file) {
    const reader = new FileReader();
    // Khi đọc xong file, hiển thị ảnh
    reader.onload = function (e) {
      const img = document.createElement("img");
      img.src = e.target.result; // Gán URL ảnh vào thẻ <img>
      img.classList.add("imgPreview");
      imageContainer.innerHTML = ""; // Xóa nội dung cũ
      imageContainer.appendChild(img); // Thêm ảnh mới
    };
    reader.readAsDataURL(file); // Đọc file dưới dạng Data URL
  }
}

//ham loc san tk
function listSearch_tk() {
  let arr = [...Arrsell];
  let typeProduct = document.getElementById("typeProduct").value;
  if (typeProduct !== "0") {
    arr = Arrsell.filter((i) => i.obj.nametag === typeProduct);
  }
  rankProfit(arr);
}

// Hàm render quản lý thống kê
function renderqltk() {
  document.querySelector(".page-right").innerHTML = `<div class = qltk>
  <h1>SỐ LIỆU THỐNG KÊ</h1>
  <div class="overview">
      <div class="chart ff"><canvas style="display: block; box-sizing: border-box;" id="grapbox" width="541px" height="541px"></canvas></div>
      <div class="ll">
         <div class="boder first">
          <h1>Thống kê</h1>    
         </div> 
         <div class="boder">
              <div class="left-boder">
                  <h2 style="color: blue;">${Arrsell.reduce(
                    (i, n) => i + n.soluong,
                    0
                  )}</h2>
                  <h2 style="font-weight: 200;">ĐÃ BÁN</h2> 
              </div>
              <div class="right-boder"><i style="font-size: 40px;font-weight: 200;" class='bx bx-cart-alt'></i></div>   
         </div> 
         <div class="boder">
              <div class="left-boder">
                  <h2 style="color: blue;">${Arrsell.reduce(
                    (i, n) => i + n.soluong * n.obj.price,
                    0
                  ).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}</h2>
                  <h2 style="font-weight: 200;">DOANH THU</h2>
              </div>
              <div class="right-boder"><i style="font-size: 40px;font-weight: 200;" class='bx bx-money-withdraw'></i></div>   
         </div> 
      </div>
   </div>
</div>
<div class="part">
  <div style="width: 70%" class="rankProfit">
      <div style="margin-top: 0px; position:unset; " class="titleCol">
            <span style="width: 30%;" class="name">TÊN SẢN PHẨM</span>
            <span style="width: 30%;" class="sold">Đã bán</span>
            <span style="width: 10%; float: right" class="profits">DOANH THU</span>
      </div>
      <div id="rankProfit-body"></div>
  </div>
  <div style="width: 30%" onchange="listSearch_tk()" class="data-number">
              <select name="" id="typeProduct" class="box">
                    <option value="0">Tất cả</option>
                    <option value="aothun#">Áo thun</option>
                    <option value="polo#">Polo</option>
                    <option value="somi#">Sơ mi</option>
                    <option value="hoodie#">Hoodie</option>
                    <option value="sweater#">Sweater</option>
                    <option value="aokhoac#">Áo khoác</option>
              </select>
    </div>
</div>`;
  createChart(); // Tạo biểu đồ khi nhấp vào "QUẢN LÝ THỐNG KÊ"
  rankProfit(Arrsell);
}
function processProductList(Arrsell) {
  let map = new Map();
  for (let i of Arrsell) {
    let key = i.obj.idproduct + i.obj.nameSP;
    if (map.has(key)) {
      // Nếu sản phẩm đã tồn tại, cộng dồn số lượng
      map.get(key).soluong += i.soluong;
    } else {
      // Nếu chưa tồn tại, thêm sản phẩm vào Map
      map.set(key, { ...i });
    }
  }
  let resultArr = Array.from(map.values());
  return resultArr;
}
//ham tao doanh thu
function rankProfit(arrs) {
  let arr = processProductList(arrs);
  let s = "";
  const sortArrsell = arr.sort(
    (a, b) => b.soluong * b.obj.price - a.soluong * a.obj.price
  );
  sortArrsell.forEach((i) => {
    s += ` <div class="rankProfit-Child">
            <span style="width: 30%;" class="name">${i.obj.nameSP}</span>
            <span style="width: 30%;" class="sold">${i.soluong}</span>
            <span style="width: 10%;  class="profits">${(
              i.obj.price * i.soluong
            ).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}</span>
           </div>`;
  });
  document.getElementById("rankProfit-body").innerHTML = s;
}

function renderBtnadd() {
  let s = "";
  s += `<div id="tabAddProduct">
                <div class="headTab">
                    <span class="title">THÊM SẢN PHẨM</span>
                    <span onclick ="closeTabb()" class="closeTab">ĐÓNG</span>
                </div>
                <form action="">
                  <div class="bodyTab">
                      <div class="leftTab">
                          <div class="contentTab">
                              <span>STT: </span>
                              <span>${countProduct(ArrProduct) + 1}</span>
                          </div>
                          <div class="contentTab">
                              <div id="imageContainer"></div>
                              <input type="file" name="file" id="file" class="inputfile" accept="image/*" onchange="onloandimg(this)">
                              <label style="margin-left:-75px;" for="file">Chọn ảnh</label>
                          </div>
                              <div class="contentTab"> 
                                  <span>Tên sản phẩm: </span>
                                  <input style="width: 50%" type="text" placeholder="Tên sản phẩm" value="" id="nameAddProduct">
                              </div>
                              <div class="contentTab colorInput">
                                  <span>Màu sắc: </span>
                                  <input style="width: 25%" type="text" placeholder="[ĐEN, TRẮNG, ....]" value="" id="colorAddProduct">
                                  <input style="width: 25%" type="text" placeholder="Mã màu [#000,#fff]" value="" id="codecolorAddProduct">
                              </div>
                              <div class="contentTab">
                                  <span>Số lượng A: </span>
                                  <input style="width: 20%" type="text" id="countAddProductA" placeholder="Số lượng" value="">
                              </div>
                      </div>
                      <div class="rightTab">
                                  <div class="contentTab">
                                      <span>Số lượng B: </span>
                                      <input style="width: 20%" type="text" id="countAddProductB" placeholder="Số lượng" value="">
                                  </div>
                                  <div class="contentTab">
                                      <span>Số lượng C: </span>
                                      <input style="width: 20%" type="text" id="countAddProductC" placeholder="Số lượng" value="">
                                  </div>
                                  <div class="contentTab">
                                      <span>Số lượng D: </span>
                                      <input style="width: 20%" type="text" id="countAddProductD" placeholder="Số lượng" value="">
                                  </div>
                                  <div class="contentTab">
                                      <span>Đơn giá: </span>
                                      <input style="width: 30%" type="text" id="priceAddProduct" placeholder="Đơn giá" value="">
                                  </div>
                                  <div class="contentTab">
                                      <span>Name Tag </span>
                                      <input style="width: 30%" type="text" placeholder="Name Tag" value="" id="nametagProduct">
                                  </div>
                                  
                      </div>
                  </div>  
                  <div onclick="btnAccept()" class="btnAccept">
                      <div class="content-btn">
                          <buttom type="sumbit">HOÀN TẤT</buttom>
                      </div>
                  </div>
                </form>
            </div>`;
  document.querySelector(".btnAddproduct").innerHTML = s;
}

//dong tap cua view
function closeTabz() {
  document.querySelector(".outbackround").classList.remove("actoutbackground");
  document.querySelector(".viewmenu").classList.remove("actz");
  document.querySelector(".viewmenu").classList.add("nonez");
}
// -------------------------------------------------------------------
function savepage(n) {
  localStorage.setItem("currentadmin", n);
}

function onload() {
  const QLTK = document.querySelector(".b1");
  const QLDH = document.querySelector(".b2");
  const QLSP = document.querySelector(".b3");
  const QLND = document.querySelector(".b4");

  const s = parseInt(localStorage.getItem("currentadmin")) || 1;

  QLTK.addEventListener("click", () => {
    QLTK.classList.add("act");
    QLDH.classList.remove("act");
    QLSP.classList.remove("act");
    QLND.classList.remove("act");
    savepage(1);
    renderqltk();
  });

  QLDH.addEventListener("click", () => {
    QLTK.classList.remove("act");
    QLDH.classList.add("act");
    QLSP.classList.remove("act");
    QLND.classList.remove("act");
    savepage(2);
    renderqldh();
  });

  QLSP.addEventListener("click", () => {
    QLTK.classList.remove("act");
    QLDH.classList.remove("act");
    QLSP.classList.add("act");
    QLND.classList.remove("act");
    let getButton1ContextMenu = document.getElementById(
      "button1-contextMenu"
    ).nextSibling;
    getButton1ContextMenu.nodeValue = "Chỉnh sửa";
    document.getElementById("deleteProduct").style.display = "block";
    savepage(3);
    renderqlsp();
  });

  QLND.addEventListener("click", () => {
    QLTK.classList.remove("act");
    QLDH.classList.remove("act");
    QLSP.classList.remove("act");
    QLND.classList.add("act");
    savepage(4);
    renderqlnd();
  });

  // Thiết lập trạng thái ban đầu
  switch (s) {
    case 1:
      QLTK.classList.add("act");
      renderqltk();
      break;
    case 2:
      QLDH.classList.add("act");
      renderqldh();
      break;
    case 3:
      QLSP.classList.add("act");
      renderqlsp();
      break;
    case 4:
      QLND.classList.add("act");
      renderqlnd();
      break;
  }
}
// -----------------------------------------------

//thuy
// tao danh sach nguoi dung
function listAccounts() {
  let accounts = JSON.parse(localStorage.getItem("storageUsers")) || [];
  // console.log(accounts);
  let s = "";
  accounts.forEach((account) => {
    s += `<div class="listAcc" style="text-align: center; border-bottom: 1px solid rgba(112, 112, 112, 0.3);">
        <span class="idAccount" style="width: 5%;">${account.userID}</span>
        <span class="nameAccount" style="width: 26%;">${account.name}</span>
        <span class="phoneAccount" style="width: 10%;">${account.phone}</span>
        <span class="emailAccount" style="width: 10%;">${account.email}</span>
        <span class="addressAccount" style="width: 17%;">${
          account.diachi
        }</span>
        <span class="passwordAccount" style="width: 12%;">${
          account.password
        }</span>
        <span class="statusAccount" style="width: 10%;">${
          account.statususer == "1" ? "Bình thường" : "Đã khoá"
        }</span>
        <button class="btnAccount" style="width: 10%;" onclick="toggleLockUser('${
          account.userID
        }')">${account.statususer == "0" ? "Mở khóa" : "Khóa"}</button>
      </div>`;
  });
  return s;
}

function timkiemTheoID(id) {
  let accounts = JSON.parse(localStorage.getItem("storageUsers")) || [];
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i].userID == id) {
      return i;
    }
  }
  return null;
}
function toggleLockUser(idAccount) {
  let accounts = JSON.parse(localStorage.getItem("storageUsers")) || [];
  let index = timkiemTheoID(idAccount);
  if (accounts[index]) {
    if (accounts[index].statususer == "1") {
      accounts[index].statususer = "0";
    } else {
      accounts[index].statususer = "1";
    }
    localStorage.setItem("storageUsers", JSON.stringify(accounts));
    checkAccount();
  }
}
// kiem tra tai khoan
function checkAccount() {
  let accounts = JSON.parse(localStorage.getItem("storageUsers")) || [];
  let locked = 0;
  for (let acc of accounts) {
    if (acc.statususer == "0") {
      locked++;
    }
  }
  document.getElementById("amountOfAccount").innerHTML = accounts.length;
  document.getElementById("amountLockedAccount").innerHTML = locked;
  document.getElementById("amountUnlockedAccount").innerHTML =
    accounts.length - locked;
  document.getElementById("manageCustomer-body").innerHTML = listAccounts();
}

function renderqlnd() {
  document.querySelector(".page-right").innerHTML = `<div class="qlnd">
                <div class="title">
                    <h1>QUẢN LÝ NGƯỜI DÙNG</h1>
                </div>
                <div class="manageCustomer">
                    <div class="areNumberAboutAccounts">
                        <div class="box">
                            <div class="contentBox">
                                <div class="leftContent">
                                    <h2 id="amountOfAccount">0</h2>
                                    <span>TÀI KHOẢN</span>
                                </div>
                                <div class="rightContent">
                                    <i class='bx bxs-user-account'></i>
                                </div>
                            </div>
                        </div>
                        <div class="box">
                            <div class="contentBox">
                                <div class="leftContent">
                                    <h2 id="amountUnlockedAccount">0</h2>
                                    <span>TK HOẠT ĐỘNG</span>
                                </div>
                                <div class="rightContent">
                                    <i class='bx bxs-lock-open'></i>
                                </div>
                            </div>
                        </div>
                        <div class="box">
                            <div class="contentBox">
                                <div class="leftContent">
                                    <h2 id="amountLockedAccount">0</h2>
                                    <span>TK BỊ KHÓA</span>
                                </div>
                                <div class="rightContent">
                                    <i class='bx bx-key'></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="titleCol" style="text-align: center;">
                        <span class="idAccount" style="width: 5%;">ID</span>
                        <span class="nameAccount" style="width: 26%;">Tên</span>
                        <span class="phoneAccount" style="width: 10%;">SĐT</span>
                        <span class="emailAccount" style="width: 10%;">Email</span>
                        <span class="usernameAccoutn" style="width: 17%;">Địa chỉ</span>
                        <span class="passwordAccount" style="width: 12%;">Mật khẩu</span>
                        <span class="statusAccount" style="width: 10%;">Trạng thái</span>
                        <span class="Chitiet" style="width: 10%;">Chi tiết</span>
                    </div>
                    <div id="manageCustomer-body">
                        
                    </div>
                </div>
            </div>`;
  checkAccount();
}

// // vinh render qldh
// let getShopBag = JSON.parse(localStorage.getItem("shopbagispay")) || [];

// // in đơn hàng
// function listDH(ordersOfUser) {
//   let s = "";
//   console.log(ordersOfUser);
//   for (let i = 0; i < ordersOfUser.shopbagispayuser.length; i++) {
//     let Price = ordersOfUser.shopbagispayuser[i].obj.price.toLocaleString(
//       "vi-VN",
//       { style: "currency", currency: "VND" }
//     );
//     let stringStatus = "";
//     if (ordersOfUser.shopbagispayuser[i].status === "1")
//       stringStatus = "Chờ xác nhận";
//     else if (ordersOfUser.shopbagispayuser[i].status === "2")
//       stringStatus = "Đang gói hàng";
//     else if (ordersOfUser.shopbagispayuser[i].status === "3")
//       stringStatus = "Vận chuyển";
//     else if (ordersOfUser.shopbagispayuser[i].status === "4")
//       stringStatus = "Hoàn thành";
//     s += `
//                 <div class="list">
//                 <span style="width: 10%" class="userID">${
//                   ordersOfUser.IDuser
//                 }</span>
//                 <div style="width: 5%; display: flex; justify-content: left;">
//                   <input type="checkbox" class="myCheckbox" onchange='setDH(${JSON.stringify(
//                     ordersOfUser
//                   )},${i})'/>
//                 </div>
//                 <span style="width: 10%" class="idProduct">${
//                   ordersOfUser.shopbagispayuser[i].obj.idproduct
//                 }</span>
//                 <img style="width: 20%" src="${
//                   ordersOfUser.shopbagispayuser[i].obj.img
//                 }" class="imgProduct" alt="Ảnh lỗi">
//                 <span style="width: 30%" class="nameProduct">${
//                   ordersOfUser.shopbagispayuser[i].obj.nameSP
//                 }</span>
//                 <span style="width: 5%" class="countProduct">${
//                   ordersOfUser.shopbagispayuser[i].soluong
//                 }</span>
//                 <span style="width: 10%" class="priceProduct">${Price}</span>
//                 <span style="width: 10%" class="deliveryStatus">${stringStatus}</span>
//             </div>
//     `;
//   }
//   return s;
// }
// let mang = [];
// // tìm kiếm đơn hàng có trạng thái vận chuyển cần tìm
// function setDH(user, itemindex) {
//   let itemispay = {
//     userpay: user,
//     itemindexi: itemindex,
//   };
//   mang.push(itemispay);
// }

// function doYouAccept() {
//   let shopbagispay = JSON.parse(localStorage.getItem("shopbagispay"));
//   let input = document.querySelectorAll(".myCheckbox");
//   let getDeliveryStatus = document.querySelector(
//     "#deliveryStatusSelection"
//   ).value;
//   for (let i = 0; i < shopbagispay.length; i++) {
//     for (let j = 0; j < mang.length; j++) {
//       if (shopbagispay[i].IDuser == mang[j].userpay.IDuser) {
//         shopbagispay[i].shopbagispayuser[mang[j].itemindexi].status =
//           getDeliveryStatus;
//         console.log(
//           shopbagispay[i].shopbagispayuser[mang[j].itemindexi].status
//         );
//       }
//     }
//   }
//   mang = [];
//   input.forEach((input) => {
//     input.checked = false;
//   });
//   localStorage.setItem("shopbagispay", JSON.stringify(shopbagispay));
//   location.reload();
// }

// function renderqldh() {
//   document.querySelector(".page-right").innerHTML = `<div class="qldh">
//                 <div class="title"><h1>QUẢN LÝ ĐƠN HÀNG</h1></div>
//                 <div class="btnAdd"><div class="circle" onclick="btnAdd()"><i class="fa-solid fa-plus"></i></div></div>
//                 <div class="groupOption">
//                         <select name="" class="box" id="deliveryStatusSelection">
//                             <option value="1">Chờ xác nhận</option>
//                             <option value="2">Đang gói hàng</option>
//                             <option value="3">Vận chuyển</option>
//                             <option value="4">Hoàn thành</option>
//                         </select>
//                         <button class="box" id="acceptChangeStatus" style="width: 10%;
//   box-shadow: 0 7px 25px rgba(0, 0, 0, 0.2);
//   border-radius: 10px;
//   margin-right: 200px;
//   border: none;
//   height: fit-content;
//   padding: 10px;" onclick="doYouAccept()">Xác nhận</button>
//                         <div class="box">
//                             <div class="contentBox">
//                                 <div class="leftBox">
//                                     <h2 id="amountOfProduct">0</h2>
//                                     <span>ĐƠN HÀNG</span>
//                                 </div>
//                                 <i class="fa-solid fa-star"></i>
//                             </div>
//                         </div>
//                 </div>
//                 <div class="titleCol">
//                     <span style="width: 10%" class="userID">userID</span>
//                     <span style="width: 5%" class="selectProduct">Chọn</span>
//                     <span style="width: 10%" class="idProduct">ID</span>
//                     <span style="width: 20% ; padding-left: 7%" class="imgProduct">Hình ảnh</span>
//                     <span style="width: 30% ; padding-left: 5%" class="nameProduct">Tên sản phẩm</span>
//                     <span style="width: 5%" class="countProduct">Số lượng</span>
//                     <span style="width: 10%" class="priceProduct">Đơn giá</span>
//                     <span style="width: 10%" class="deliveryStatus">Vận chuyển</span>
//                 </div>
//                 <div id="storage-body"></div>`;
//   let s = "";
//   for (let i = 0; i < getShopBag.length; i++) {
//     s += listDH(getShopBag[i]);
//   }
//   document.querySelector("#storage-body").innerHTML = s;
// }
// vinh render qldh
let getShopBag = JSON.parse(localStorage.getItem("shopbagispay")) || [];

function showDetailInformation(event, element) {
  event.preventDefault();
  // Lấy vị trí chuột
  const posX = event.pageX;
  const posY = event.pageY;
  // Hiển thị menu ở vị trí chuột
  contextMenu.style.display = "block";
  contextMenu.style.left = `${posX}px`;
  contextMenu.style.top = `${posY}px`;

  let idProduct = element.querySelector(".idProduct").textContent;
  let userID = element.querySelector(".userID").textContent;
  let parseUserIDToInt = parseInt(userID);
  let order;
  let flag = false;
  for (let i = 0; i < getShopBag.length; i++) {
    if (flag) break;
    if (parseUserIDToInt !== getShopBag[i].IDuser) continue;
    for (let j = 0; j < getShopBag[i].shopbagispayuser.length; j++) {
      if (idProduct === getShopBag[i].shopbagispayuser[j].obj.idproduct) {
        order = {
          IDuser: getShopBag[i].IDuser,
          shopbagispayuser: [getShopBag[i].shopbagispayuser[j]],
        };
        flag = true;
        break;
      }
    }
  }
  console.log(order);
  let imgProduct = order.shopbagispayuser[0].obj.img;
  let nameProduct = order.shopbagispayuser[0].obj.nameSP;
  let colorProduct = order.shopbagispayuser[0].color;
  let price = element.querySelector(".priceProduct").textContent;
  let nametagProduct = order.shopbagispayuser[0].obj.nametag;
  let quantity = order.shopbagispayuser[0].soluong;
  let typeProduct = "";
  let nameOfCustomer = "";
  let addressOfCustomer = "";
  let getStorageUsers = JSON.parse(localStorage.getItem("storageUsers"));
  console.log(getStorageUsers);
  for (let i = 0; i < getStorageUsers.length; i++) {
    if (parseInt(userID) === getStorageUsers[i].userID) {
      nameOfCustomer = getStorageUsers[i].name;
      addressOfCustomer = getStorageUsers[i].diachi;
      break;
    }
  }
  switch (true) {
    case nametagProduct.startsWith("hoodie#"):
      typeProduct = "Hoodie";
      break;
    case nametagProduct.startsWith("sweater#"):
      typeProduct = "Sweater";
      break;
    case nametagProduct.startsWith("somi#"):
      typeProduct = "Sơ mi";
      break;
    case nametagProduct.startsWith("polo#"):
      typeProduct = "Polo";
      break;
    case nametagProduct.startsWith("aothun#"):
      typeProduct = "Áo thun";
      break;
    default:
      typeProduct = "Không xác định";
  }

  //chi tiết đơn hàng
  // Lấy phần tử chứa chữ "Chỉnh sửa"
  let getButton1ContextMenu = document.getElementById(
    "button1-contextMenu"
  ).nextSibling;

  // Thay đổi nội dung của phần tử đó thành "Chi tiết"
  getButton1ContextMenu.nodeValue = "Chi tiết";

  // Ẩn nút button khi chạy đoạn mã này
  document.getElementById("deleteProduct").style.display = "none";

  document.getElementById("viewDetails").addEventListener("click", () => {
    getButton1ContextMenu.nodeValue = "Chỉnh sửa";
    document.getElementById("deleteProduct").style.display = "block";
    document.querySelector(".outbackround").classList.add("actoutbackground");
    document.querySelector(".viewmenu").classList.add("actz");
    document.querySelector(".viewmenu").classList.remove("nonez");

    document.querySelector(".viewmenu").innerHTML = `<div id="tabAddProduct">
      <div class="headTab">
          <span class="title">THÔNG TIN CHI TIẾT</span>
          <span onclick ="closeTabz()" class="closeTab">ĐÓNG</span>
      </div>
      <form action="">
        <div class="bodyTab">
          <div class="leftTab">
            <div class="contentTab">
              <span>ID: </span>
              <span class="ID">${idProduct}</span>
            </div>
            <div class="contentTab">
              <div id="imageContainer"> 
                <img src="${imgProduct}" class="imgPreview">
              </div>
            </div>
            <div class="contentTab"> 
              <span>Tên sản phẩm: </span>
              <input readonly style="width: 50%" type="text" placeholder="Tên sản phẩm" value="${nameProduct}" id="nameAddProduct">
            </div>
            <div class="contentTab colorInput">
              <span>Màu sắc: </span>
              <input readonly style="width: 25%" type="text" placeholder="[ĐEN, TRẮNG, ....]" value="${colorProduct}" id="colorAddProduct">
            </div>
            <div class="contentTab">
              <span>Số lượng mua: </span>
              <input readonly style="width: 20%" type="text" id="countAddProductA" placeholder="Số lượng" value="${quantity}">
            </div>
          </div>
          <div class="rightTab">
            <div class="contentTab">
              <span>Tên khách hàng: </span>
              <input readonly style="width: 20%" type="text" id="nameOfCustomer" placeholder="Số lượng" value="${nameOfCustomer}">
            </div>
            <div class="contentTab">
              <span>Địa chỉ khách hàng: </span>
              <input readonly style="width: 20%" type="text" id="addressOfCustomer" placeholder="Số lượng" value="${addressOfCustomer}">
            </div>
            <div class="contentTab">
              <span>Đơn giá: </span>
              <input readonly style="width: 30%" type="text" id="priceAddProduct" placeholder="Đơn giá" value="${price}">
            </div>
            <div class="contentTab">
              <span>Name Tag </span>
              <input readonly style="width: 30%" type="text" placeholder="Name Tag" value="${nametagProduct}" id="nameimgAddProduct">
            </div>
            <div class="contentTab">
              <span>Loại </span>
              <input readonly type="text" value="${typeProduct}" id="typeAddProduct">
            </div>
          </div>
        </div>
      </form>
  </div>`;
  });
}

// in đơn hàng
function listDH(ordersOfUser) {
  let s = "";
  for (let i = 0; i < ordersOfUser.shopbagispayuser.length; i++) {
    let Price = ordersOfUser.shopbagispayuser[i].obj.price.toLocaleString(
      "vi-VN",
      { style: "currency", currency: "VND" }
    );
    let stringStatus = "";
    if (ordersOfUser.shopbagispayuser[i].status === "1")
      stringStatus = "Chờ xác nhận";
    else if (ordersOfUser.shopbagispayuser[i].status === "2")
      stringStatus = "Đang gói hàng";
    else if (ordersOfUser.shopbagispayuser[i].status === "3")
      stringStatus = "Vận chuyển";
    else if (ordersOfUser.shopbagispayuser[i].status === "4")
      stringStatus = "Hoàn thành";
    s += `
            <div oncontextmenu="showDetailInformation(event, this)" class="list">
                <span style="width: 10%" class="userID">${ordersOfUser.IDuser}</span>
                <div style="width: 5%; display: flex; justify-content: left;">
                  <input type="checkbox" class="myCheckbox"/>
                </div>
                <span style="width: 10%" class="idProduct">${ordersOfUser.shopbagispayuser[i].obj.idproduct}</span>
                <img style="width: 20%" src="${ordersOfUser.shopbagispayuser[i].obj.img}" class="imgProduct" alt="Ảnh lỗi">
                <span style="width: 30%" class="nameProduct">${ordersOfUser.shopbagispayuser[i].obj.nameSP}</span>
                <span style="width: 5%" class="countProduct">${ordersOfUser.shopbagispayuser[i].soluong}</span>
                <span style="width: 10%" class="priceProduct">${Price}</span>
                <span style="width: 10%" class="deliveryStatus">${stringStatus}</span>
            </div>
    `;
  }
  return s;
}

// set trạng thái vận chuyển cho những đơn hàng đang chọn
function setDH() {
  let getDeliveryStatusSelection = document.getElementById(
    "deliveryStatusSelection"
  ).value;
  // mảng chứa các vị trí của những đơn hàng đang chọn
  let checkboxPositionArray = [];
  let getAllCheckbox = document.querySelectorAll(".myCheckbox");
  for (let i = 0; i < getAllCheckbox.length; i++) {
    if (getAllCheckbox[i].checked) {
      checkboxPositionArray.push(i);
    }
  }
  let filteredProducts = [];
  let count = 0;
  let countOrder = 0;
  // đếm số lượng đơn hàng
  for (let i = 0; i < getShopBag.length; i++) {
    for (let j = 0; j < getShopBag[i].shopbagispayuser.length; j++) {
      countOrder++;
    }
  }
  if (getAllCheckbox.length === countOrder) {
    for (let i = 0; i < getShopBag.length; i++) {
      for (let j = 0; j < getShopBag[i].shopbagispayuser.length; j++) {
        if (checkboxPositionArray.includes(count)) {
          let obj = {
            IDuser: getShopBag[i].IDuser,
            shopbagispayuser: [getShopBag[i].shopbagispayuser[j]],
          };
          filteredProducts.push(obj);
        }
        count++;
      }
    }
  } else {
    let getProductID = document.querySelectorAll(".idProduct");
    let getUserID = document.querySelectorAll(".userID");
    let storageTmp = [];
    let obj = {};
    for (let i = 1; i < getProductID.length; i++) {
      obj = {
        IDuser: getUserID[i].innerText,
        idproduct: getProductID[i].innerText,
      };
      storageTmp.push(obj);
    }
    let indexOfStorageTmp = 0;
    for (let i = 0; i < getShopBag.length; i++) {
      if (indexOfStorageTmp === storageTmp.length) break;
      if (
        parseInt(storageTmp[indexOfStorageTmp].IDuser) === getShopBag[i].IDuser
      ) {
        for (let j = 0; j < getShopBag[i].shopbagispayuser.length; j++) {
          if (
            storageTmp[indexOfStorageTmp].idproduct ===
            getShopBag[i].shopbagispayuser[j].obj.idproduct
          ) {
            obj = {
              IDuser: getShopBag[i].IDuser,
              shopbagispayuser: [getShopBag[i].shopbagispayuser[j]],
            };
            filteredProducts.push(obj);
            indexOfStorageTmp++;
            if (indexOfStorageTmp === storageTmp.length) break;
          }
        }
      }
    }
  }
  //set trạng thái vận chuyển cho những đơn hàng đang chọn
  for (let i = 0; i < filteredProducts.length; i++) {
    if (getDeliveryStatusSelection === "0") {
      filteredProducts[i].shopbagispayuser[0].status = "1";
    } else if (getDeliveryStatusSelection === "1") {
      filteredProducts[i].shopbagispayuser[0].status = "2";
    } else if (getDeliveryStatusSelection === "2") {
      filteredProducts[i].shopbagispayuser[0].status = "3";
    } else if (getDeliveryStatusSelection === "3") {
      filteredProducts[i].shopbagispayuser[0].status = "4";
    }
  }
  // push lên localStorage
  let index = 0;
  for (let i = 0; i < filteredProducts.length; i++) {
    for (let j = 0; j < getShopBag[j].length; ) {
      // tìm kiếm theo IDuser
      if (filteredProducts[i].IDuser === getShopBag[j].IDuser) {
        // duyệt qua hết shopbagispayuser của getShopBag[j] thì nhảy qua getShopBag[j + 1]
        if (index === getShopBag[j].shopbagispayuser.length) {
          j++;
          continue;
        }
        // tìm kiếm theo idproduct
        if (
          filteredProducts[i].shopbagispayuser[0].obj.idproduct ===
          getShopBag[j].shopbagispayuser[index].obj.idproduct
        ) {
          getShopBag[j].shopbagispayuser[index] =
            filteredProducts[i].shopbagispayuser[0];
          index = 0;
          break;
        }
        index++;
      }
    }
  }
  localStorage.setItem("shopbagispay", JSON.stringify(getShopBag));
  // lấy tất cả đơn hàng
  getShopBag = JSON.parse(localStorage.getItem("shopbagispay"));
  let s = "";
  for (let i = 0; i < getShopBag.length; i++) {
    s += listDH(getShopBag[i]);
  }
  document.querySelector("#storage-body").innerHTML = s;
  // reset filteredDeliveryStatus
  let getFilteredDeliveryStatus = document.querySelector(
    "#filteredDeliveryStatus"
  );
  getFilteredDeliveryStatus.innerHTML = `
    <option value="" disabled selected>Lọc trạng thái</option>
    <option value="0">Chờ xác nhận</option>
    <option value="1">Đang gói hàng</option>
    <option value="2">Vận chuyển</option>
    <option value="3">Hoàn thành</option>
  `;
}

function doYouAccept() {
  setDH();
}

function filteredByDeliveryStatus() {
  getShopBag = JSON.parse(localStorage.getItem("shopbagispay"));
  let getFilteredDeliveryStatus = document.querySelector(
    "#filteredDeliveryStatus"
  ).value;
  let number = parseInt(getFilteredDeliveryStatus) + 1;
  let s = "";
  for (let i = 0; i < getShopBag.length; i++) {
    for (let j = 0; j < getShopBag[i].shopbagispayuser.length; j++) {
      if (number !== parseInt(getShopBag[i].shopbagispayuser[j].status)) {
        continue;
      }
      let Price = getShopBag[i].shopbagispayuser[j].obj.price.toLocaleString(
        "vi-VN",
        { style: "currency", currency: "VND" }
      );
      let stringStatus = "";
      if (getFilteredDeliveryStatus === "0") stringStatus = "Chờ xác nhận";
      else if (getFilteredDeliveryStatus === "1")
        stringStatus = "Đang gói hàng";
      else if (getFilteredDeliveryStatus === "2") stringStatus = "Vận chuyển";
      else if (getFilteredDeliveryStatus === "3") stringStatus = "Hoàn thành";
      s += `
              <div oncontextmenu="showDetailInformation(event, this)" class="list">
                  <span style="width: 10%" class="userID">${getShopBag[i].IDuser}</span>
                  <div style="width: 5%; display: flex; justify-content: left;">
                    <input type="checkbox" class="myCheckbox"/>
                  </div>
                  <span style="width: 10%" class="idProduct">${getShopBag[i].shopbagispayuser[j].obj.idproduct}</span>
                  <img style="width: 20%" src="${getShopBag[i].shopbagispayuser[j].obj.img}" class="imgProduct" alt="Ảnh lỗi">
                  <span style="width: 30%" class="nameProduct">${getShopBag[i].shopbagispayuser[j].obj.nameSP}</span>
                  <span style="width: 5%" class="countProduct">${getShopBag[i].shopbagispayuser[j].soluong}</span>
                  <span style="width: 10%" class="priceProduct">${Price}</span>
                  <span style="width: 10%" class="deliveryStatus">${stringStatus}</span>
              </div>
      `;
    }
  }
  document.querySelector("#storage-body").innerHTML = s;
  // reset filteredDeliveryStatus
  let getDeliveryStatusSelection = document.getElementById(
    "deliveryStatusSelection"
  );
  getDeliveryStatusSelection.innerHTML = `
    <option value="" disabled selected>Chỉnh trạng thái</option>
    <option value="0">Chờ xác nhận</option>
    <option value="1">Đang gói hàng</option>
    <option value="2">Vận chuyển</option>
    <option value="3">Hoàn thành</option>
  `;
}

function renderqldh() {
  document.querySelector(".page-right").innerHTML = `<div class="qldh">
                <div class="title"><h1>QUẢN LÝ ĐƠN HÀNG</h1></div>
                <div class="groupOption">
                        <select name="" class="box" id="filteredDeliveryStatus" onchange="filteredByDeliveryStatus()">
                            <option value="" disabled selected>Lọc trạng thái</option>
                            <option value="0">Chờ xác nhận</option>
                            <option value="1">Đang gói hàng</option>
                            <option value="2">Vận chuyển</option>
                            <option value="3">Hoàn thành</option>
                        </select>
                        <select name="" class="box" id="deliveryStatusSelection">
                            <option value="" disabled selected>Chỉnh trạng thái</option>
                            <option value="0">Chờ xác nhận</option>
                            <option value="1">Đang gói hàng</option>
                            <option value="2">Vận chuyển</option>
                            <option value="3">Hoàn thành</option>
                        </select>
                        <button class="box" id="acceptChangeStatus" style="width: 10%;
                          box-shadow: 0 7px 25px rgba(0, 0, 0, 0.2);
                          border-radius: 10px;
                          margin-right: 200px;
                          border: none;
                          height: fit-content;
                          padding: 10px;" onclick="doYouAccept()">Xác nhận</button>
                        <div class="box">
                            <div class="contentBox">
                                <div class="leftBox">
                                    <h2 id="amountOfProduct">0</h2>
                                    <span>ĐƠN HÀNG</span>
                                </div>
                                <i class="fa-solid fa-star"></i>
                            </div>
                        </div>
                </div>
                <div class="titleCol">
                    <span style="width: 10%" class="userID">userID</span>
                    <span style="width: 5%" class="selectProduct">Chọn</span>
                    <span style="width: 10%" class="idProduct">ID</span>
                    <span style="width: 20% ; padding-left: 7%" class="imgProduct">Hình ảnh</span>
                    <span style="width: 30% ; padding-left: 5%" class="nameProduct">Tên sản phẩm</span>
                    <span style="width: 5%" class="countProduct">Số lượng</span>
                    <span style="width: 10%" class="priceProduct">Đơn giá</span>
                    <span style="width: 10%" class="deliveryStatus">Vận chuyển</span>
                </div>
                <div id="storage-body"></div>`;
  let s = "";
  for (let i = 0; i < getShopBag.length; i++) {
    s += listDH(getShopBag[i]);
  }
  document.querySelector("#storage-body").innerHTML = s;
}
// login
let adminAccount = {
  email: "admin@gmail.com",
  password: "admin",
  typeuser: "0",
};
let getSignInButton = "";
let getEmailSignIn = "";
let getPasswordSignIn = "";

function checkEmail(str) {
  let idx = str.indexOf("@");
  let idxWhiteSpace = str.indexOf(" ");
  if (idx === -1 || idxWhiteSpace !== -1) {
    return false;
  } else if (str.substring(idx) !== "@gmail.com") {
    return false;
  }
  return true;
}
function loadpage() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  const loader = document.querySelector(".loader");
  // Start the loader animation
  loader.classList.add("active");

  setTimeout(function () {
    loader.classList.remove("active");
  }, 1000); // Duration should match the time for loader animation
}
function signInButton(event) {
  event.preventDefault();
  getSignInButton = document.querySelector("#sign-in-button");
  getEmailSignIn = document.querySelector("#Email");
  getPasswordSignIn = document.querySelector("#Password");
  if (
    getEmailSignIn.value.trim() === "" ||
    !getEmailSignIn.value.includes("@") ||
    !checkEmail(getEmailSignIn.value)
  ) {
    toast({
      title: "ERROR",
      message: "Vui lòng nhập đúng Email !",
      type: "error",
      duration: 5000,
    });
    getEmailSignIn.focus();
    return;
  } else if (getPasswordSignIn.value.trim() === "") {
    toast({
      title: "ERROR",
      message: "Vui lòng nhập mật khẩu !",
      type: "error",
      duration: 5000,
    });
    getPasswordSignIn.focus();
    return;
  }
  if (
    getEmailSignIn.value === adminAccount.email &&
    getPasswordSignIn.value === adminAccount.password
  ) {
    loadpage();
    let getPage = document.querySelector(".page");
    getPage.innerHTML = `
      <div class="page-left second-icon">
        <div style="height: 10%" class="F-L"><h1>Tình Hình Hoạt Động</h1></div>
        <div style="height: 60%" class="box-l">
          <div class="L b1">QUẢN LÝ THỐNG KÊ</div>
          <div class="L b2">QUẢN LÝ ĐƠN HÀNG</div>
          <div class="L b3">QUẢN LÝ SẢN PHẢM</div>
          <div class="L b4">QUẢN LÝ NGƯỜI DÙNG</div>
        </div>
        <div class="signout">Đăng xuất</div>
        <div class="L-e">
          <a href="./index.html">
            <i class="fa-solid fa-house"></i>TRỞ VỀ TRANG CHỦ</a
          >
        </div>
      </div>
      <div class="page-right"></div>

      <div class="btnAddproduct nonez"></div>
      <div class="outbackround"></div>

      <div class="viewmenu nonez"></div>

      <div id="contextMenu" class="context-menu">
        <button id="viewDetails">
          <i style="margin-right: 5px" class="bx bxs-edit" id="button1-contextMenu"></i>Chỉnh sửa
        </button>
        <hr />
        <button id="deleteProduct">
          <i style="margin-right: 5px" class="bx bx-trash" id="button2-contextMenu"></i>Xóa sản phẩm
        </button>
      </div>

      <div class="sb nonesb">
        <h3>XÁC NHẬN</h3>
        <div class="sub">
          <button id="yes">YES</button>
          <button id="no">NO</button>
        </div>
      </div>
        `;
    onload();
    return;
  }
}
