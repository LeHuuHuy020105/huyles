loadpage();
function effecttext() {
  document.addEventListener("DOMContentLoaded", function () {
    const newclothes = document.querySelector(".newclothes");
    const addresses = document.querySelectorAll(".addr");
    const cities = document.querySelectorAll(".city");
    function fadeDown() {
      newclothes.classList.add("fadedown");
    }
    function fadeRight() {
      addresses.forEach((address) => {
        const rect = address.getBoundingClientRect(); // lay thong tin vi tri va kich thuoc cua phan tu
        if (rect.top < window.innerHeight) {
          address.classList.add("faderight");
        }
      });
    }
    function flipLeft() {
      cities.forEach((city) => {
        const rect = city.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          setTimeout(() => {
            city.classList.add("flipleft");
          }, 100); // Thời gian chờ 100ms trước khi thêm lớp
        }
      });
    }

    window.addEventListener("scroll", fadeRight);
    window.addEventListener("scroll", flipLeft);
    flipLeft();
    fadeDown();
  });
}
effecttext();
// const addresses = document.querySelectorAll(".addr");
// // mang dia chi
// let addressData = [
//   {
//     title: "Tầng 2 TTTM Vincom Mega Mall Vinhomes GrandPark, Quận 9, Thủ Đức",
//     mainImage: "./img/123145878_1076154636180003_5653497440869614680_n.jpeg",
//     thumbnails: [
//       "./img/collection_pannel.jpg",
//       "./img/1utr1ac4.bmp",
//       "./img/collection_pannel.jpg",
//       "./img/1utr1ac4.bmp",
//     ],
//   },
//   {
//     title: "160 Nguyễn Cư Trinh, Phường Nguyễn Cư Trinh, Quận 1.",
//     mainImage: "/img/collection_pannel.jpg",
//     thumbnails: [
//       "./img/collection_pannel.jpg",
//       "./img/1utr1ac4.bmp",
//       "./img/collection_pannel.jpg",
//       "./img/1utr1ac4.bmp",
//     ],
//   },
//   {
//     title: "561 Sư Vạn Hạnh, Phường 13, Quận 10, HCM.",
//     mainImage: "./img/1utr1ac4.bmp",
//     thumbnails: [
//       "./img/123145878_1076154636180003_5653497440869614680_n.jpeg",
//       "./img/1utr1ac4.bmp",
//       "./img/collection_pannel.jpg",
//       "./img/1utr1ac4.bmp",
//     ],
//   },
//   // Thêm các địa chỉ khác nếu cần
// ];

// function seeAddress(index) {
//   const address = addressData[index];
//   if (address) {
//     let thumbnailsHTML = "";
//     for (let src of address.thumbnails) {
//       thumbnailsHTML += `<div class="store_list_item">
//                     <img src="${src}" alt="" />
//                   </div>
//             `;
//     }
//     document.querySelector(".wrapper").innerHTML = `
//             </div><div class="model">
//             <div class="model_wrapper">
//               <div class="title_addr">
//                 <h3>${address.title}</h3>
//               </div>
//               <div class="store_wrapper">
//                 <div class="store_main">
//                   <img id="mainImage" src="${address.mainImage}" alt="" />
//                 </div>
//                 <div class="store_thumb">
//                   <div class="store_lists">
//                     ${thumbnailsHTML}
//                   </div>
//                 </div>
//               </div>
//             </div>
//         `;
//   }
// }

// addresses.forEach((add, index) => {
//   add.addEventListener("click", function () {
//     seeAddress(index);

//     const imgmain = document.getElementById("mainImage");
//     const imgthumbs = document.querySelectorAll(".store_list_item img");

//     let currentIndex = 0;
//     imgthumbs.forEach((img, indeximg) => {
//       img.addEventListener("click", function () {
//         currentIndex = indeximg;
//         imgmain.src = addressData[index].thumbnails[indeximg];
//         console.log(imgmain);
//       });
//     });
//   });
// });
// function loadcontact() {
//   location.reload();
// }
