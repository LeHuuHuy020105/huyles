document.querySelector(".footer").innerHTML = `<div id="left-footer">
          <h2 class="address-btn">
            Hệ Thống Cửa Hàng <span><i class="bx bx-chevron-down"></i></span>
          </h2>
          <p id="footer-paragraph">
            <i class="fas fa-map-marker-alt"></i> Chi Nhánh Hồ Chí Minh<br />
            <span class="location"
              ><strong>TP. Thủ Đức</strong> - Quận 9 - Tầng 2 TTTM Vincom Mega
              Mall Vinhomes GrandPark.</span
            ><br />
            <span class="location"
              ><strong>Quận 1</strong> - 160 Nguyễn Cư Trinh, Phường Nguyễn Cư
              Trinh.</span
            ><br />
            <span class="location"
              ><strong>Quận 10</strong> - 561 Sư Vạn Hạnh, Phường 13.</span
            ><br />
            <span class="location"
              ><strong>Quận 1</strong> - The New Playground 26 Lý Tự Trọng, Phường
              Bến Nghé.</span
            ><br />
            <span class="location"
              ><strong>Quận Gò Vấp</strong> - 326 Quang Trung, Phường 10.</span
            ><br />
            <i class="fas fa-map-marker-alt"></i> Chi Nhánh Biên Hòa:<br />
            <span class="location"
              ><strong>TP. Biên Hòa</strong> - 151A Phan Trung, Phường Tân
              Mai.</span
            ><br />
            <i class="fas fa-map-marker-alt"></i> Chi Nhánh Bình Dương:<br />
            <span class="location"
              ><strong>TP. Thủ Dầu Một</strong> - 28 Yersin, Phường Hiệp
              Thành.</span
            ><br />
            <i class="fas fa-map-marker-alt"></i> Chi Nhánh Cần Thơ:<br />
            <span class="location"
              ><strong>Quận Ninh Kiều</strong> - 52 Mậu Thân, Phường An Phú.</span
            ><br />
            <i class="fas fa-map-marker-alt"></i> Chi Nhánh Hà Nội:<br />
            <span class="location"
              ><strong>Đống Đa</strong> - 49-51 Hồ Đắc Di, Phường Nam Đồng.</span
            ><br />
            <i class="fas fa-map-marker-alt"></i> Chi Nhánh Hưng Yên:<br />
            <span class="location"
              ><strong>Văn Giang</strong> - PT.TV 136 - Mega Grand World - Ocean
              Park</span
            ><br />
            <i class="fas fa-map-marker-alt"></i> Chi Nhánh Hải Phòng:<br />
            <span class="location"
              ><strong>Lê Chân</strong> - Tầng 2 TTTM Aeon Mall Hải Phòng Lê Chân
              số 10 Võ Nguyên Giáp, Phường Kênh Dương</span
            ><br />
          </p>
        </div>
        <div id="right-footer">
          <h2 class="social-btn">
            Mạng Xã Hội <span><i class="bx bx-chevron-down"></i></span>
          </h2>
          <ul id="footer-social-ul">
            <li class="footer-social-li">
              <a href="#" class="social-icons"><i class="bx bxl-facebook"></i></a>
            </li>
            <li class="footer-social-li">
              <a href="#" class="social-icons"
                ><i class="bx bxl-instagram"></i
              ></a>
            </li>
            <li>
              <a href="#" class="social-icons"><i class="bx bxl-twitter"></i></a>
            </li>
          </ul>
          <h2 class="policy-btn">
            Chính Sách <span><i class="bx bx-chevron-down"></i></span>
          </h2>
          <ul id="footer-policy-ul">
            <li>
              <div class="footer-policy-a" onclick="policycontent();">Chính sách bảo mật</div>
            </li>
            <li>
              <div class="footer-policy-a" onclick="FAQContent();">FAQ</div>
            </li>
            <li>
              <div class="footer-policy-a" onclick="membershipcontent();">Chính sách Thẻ Thành viên</div>
            </li>
            <li>
              <div class="footer-policy-a" onclick="ExchangeCardPolicyContent();"
                >Chính sách Bảo hành & Đổi trả</div>
            </li>
            <li>
              <div class="footer-policy-a" onclick="ShipCardPolicyContent();">Chính sách giao hàng hỏa tốc</div>
            </li>
          </ul>
        </div>`;
document.getElementById("bottom-footer").innerHTML = `<p id="bottom-paragraph">
          Copyright © 2023 Shop Studio. Powered by ManUtd
        </p>`;
const address_btn = document.querySelector(".address-btn");
const social_btn = document.querySelector(".social-btn");
const content_addressbtn = document.querySelector("#footer-paragraph");
const content_socialbtn = document.querySelector("#footer-social-ul");
const policy_btn = document.querySelector(".policy-btn");
const content_policybtn = document.querySelector("#footer-policy-ul");
let flag_address_btn = 0;
address_btn.addEventListener("click", () => {
  if (flag_address_btn == 0) {
    address_btn.classList.add("active");
    content_addressbtn.classList.add("active");
    flag_address_btn = 1;
  } else {
    address_btn.classList.remove("active");
    content_addressbtn.classList.remove("active");
    flag_address_btn = 0;
  }
});
let flag_social_btn = 0;
social_btn.addEventListener("click", () => {
  if (flag_social_btn == 0) {
    social_btn.classList.add("active");
    content_socialbtn.classList.add("active");
    flag_social_btn = 1;
  } else {
    social_btn.classList.remove("active");
    content_socialbtn.classList.remove("active");
    flag_social_btn = 0;
  }
});
let flag_policy_btn = 0;
policy_btn.addEventListener("click", () => {
  if (flag_policy_btn == 0) {
    policy_btn.classList.add("active");
    content_policybtn.classList.add("active");
    flag_policy_btn = 1;
  } else {
    policy_btn.classList.remove("active");
    content_policybtn.classList.remove("active");
    flag_policy_btn = 0;
  }
});
function policycontent() {
  loadpage();
  window.scrollTo(0, 0);
  midcontent.innerHTML = `<div id="privacy-policy">
      <h1 class="policy-content privacy">
        CHÍNH SÁCH BẢO MẬT THÔNG TIN CÁ NHÂN
      </h1>
      <p class="policy-content privacy">
        <strong>Chính sách bảo mật thông tin cá nhân</strong><br />
        Cám ơn quý khách đã quan tâm và truy cập vào website. Chúng tôi tôn
        trọng và cam kết sẽ bảo mật những thông tin mang tính riêng tư của Quý
        khách.<br />
        Chính sách bảo mật sẽ giải thích cách chúng tôi tiếp nhận, sử dụng và
        (trong trường hợp nào đó) tiết lộ thông tin cá nhân của Quý khách.<br />
        Bảo vệ dữ liệu cá nhân và gây dựng được niềm tin cho quý khách là vấn đề
        rất quan trọng với chúng tôi. Vì vậy, chúng tôi sẽ dùng tên và các thông
        tin khác liên quan đến quý khách tuân thủ theo nội dung của Chính sách
        bảo mật. Chúng tôi chỉ thu thập những thông tin cần thiết liên quan đến
        giao dịch mua bán.<br />
        Chúng tôi sẽ giữ thông tin của khách hàng trong thời gian luật pháp quy
        định hoặc cho mục đích nào đó. Quý khách có thể truy cập vào website và
        trình duyệt mà không cần phải cung cấp chi tiết cá nhân. Lúc đó, Quý
        khách đang ẩn danh và chúng tôi không thể biết bạn là ai nếu Quý khách
        không đăng nhập vào tài khoản của mình.<br /><br />
        <strong>1. Thu thập thông tin cá nhân</strong><br />
        Chúng tôi thu thập, lưu trữ và xử lý thông tin của bạn cho quá trình mua
        hàng và cho những thông báo sau này liên quan đến đơn hàng, và để cung
        cấp dịch vụ, bao gồm một số thông tin cá nhân: danh hiệu, tên, giới
        tính, ngày sinh, email, địa chỉ, địa chỉ giao hàng, số điện thoại, fax,
        chi tiết thanh toán, chi tiết thanh toán bằng thẻ hoặc chi tiết tài
        khoản ngân hàng.<br />
        Chúng tôi sẽ dùng thông tin quý khách đã cung cấp để xử lý đơn đặt hàng,
        cung cấp các dịch vụ và thông tin yêu cầu thông qua website và theo yêu
        cầu của bạn.<br />
        Hơn nữa, chúng tôi sẽ sử dụng các thông tin đó để quản lý tài khoản của
        bạn; xác minh và thực hiện giao dịch trực tuyến, nhận diện khách vào
        web, nghiên cứu nhân khẩu học, gửi thông tin bao gồm thông tin sản phẩm
        và dịch vụ. Nếu quý khách không muốn nhận bất cứ thông tin tiếp thị của
        chúng tôi thì có thể từ chối bất cứ lúc nào.<br />
        Chúng tôi có thể chuyển tên và địa chỉ cho bên thứ ba để họ giao hàng
        cho bạn (ví dụ cho bên chuyển phát nhanh hoặc nhà cung cấp).<br />
        Chi tiết đơn đặt hàng của bạn được chúng tôi lưu giữ nhưng vì lí do bảo
        mật nên chúng tôi không công khai trực tiếp được. Tuy nhiên, quý khách
        có thể tiếp cận thông tin bằng cách đăng nhập tài khoản trên web. Tại
        đây, quý khách sẽ thấy chi tiết đơn đặt hàng của mình, những sản phẩm đã
        nhận và những sản phẩm đã gửi và chi tiết email, ngân hàng và bản tin mà
        bạn đặt theo dõi dài hạn.<br />
        Quý khách cam kết bảo mật dữ liệu cá nhân và không được phép tiết lộ cho
        bên thứ ba. Chúng tôi không chịu bất kỳ trách nhiệm nào cho việc dùng
        sai mật khẩu nếu đây không phải lỗi của chúng tôi.<br />
        Chúng tôi có thể dùng thông tin cá nhân của bạn để nghiên cứu thị
        trường. Mọi thông tin chi tiết sẽ được ẩn và chỉ được dùng để thống kê.
        Quý khách có thể từ chối không tham gia bất cứ lúc nào.<br /><br />
        <strong>2. Bảo mật</strong><br />
        Chúng tôi có biện pháp thích hợp về kỹ thuật và an ninh để ngăn chặn
        truy cập trái phép hoặc trái pháp luật hoặc mất mát hoặc tiêu hủy hoặc
        thiệt hại cho thông tin của bạn.<br />
        Chúng tôi khuyên quý khách không nên đưa thông tin chi tiết về việc
        thanh toán với bất kỳ ai bằng e-mail, chúng tôi không chịu trách nhiệm
        về những mất mát quý khách có thể gánh chịu trong việc trao đổi thông
        tin của quý khách qua internet hoặc email.<br />
        Quý khách tuyệt đối không sử dụng bất kỳ chương trình, công cụ hay hình
        thức nào khác để can thiệp vào hệ thống hay làm thay đổi cấu trúc dữ
        liệu. Nghiêm cấm việc phát tán, truyền bá hay cổ vũ cho bất kỳ hoạt động
        nào nhằm can thiệp, phá hoại hay xâm nhập vào dữ liệu của hệ thống
        website. Mọi vi phạm sẽ bị tước bỏ mọi quyền lợi cũng như sẽ bị truy tố
        trước pháp luật nếu cần thiết.<br />
        Mọi thông tin giao dịch sẽ được bảo mật nhưng trong trường hợp cơ quan
        pháp luật yêu cầu, chúng tôi sẽ buộc phải cung cấp những thông tin này
        cho các cơ quan pháp luật. Các điều kiện, điều khoản và nội dung của
        trang web này được điều chỉnh bởi luật pháp Việt Nam và tòa án Việt Nam
        có thẩm quyền xem xét.<br /><br />
        <strong>3. Quyền lợi khách hàng</strong><br />
        Quý khách có quyền yêu cầu truy cập vào dữ liệu cá nhân của mình, có
        quyền yêu cầu chúng tôi sửa lại những sai sót trong dữ liệu của bạn mà
        không mất phí. Bất cứ lúc nào bạn cũng có quyền yêu cầu chúng tôi ngưng
        sử dụng dữ liệu cá nhân của bạn cho mục đích tiếp thị.
      </p>
    </div>`;
}
function FAQContent() {
  loadpage();
  window.scrollTo(0, 0);
  midcontent.innerHTML = `<div id="FAQ-policy">
      <h1 class="policy-content FAQ">FAQ - CÂU HỎI THƯỜNG GẶP</h1>
      <p class="policy-content FAQ">
        <strong>1. Chính sách đổi trả của cửa hàng như thế nào?</strong><br />
        Chúng tôi hỗ trợ đổi trả sản phẩm trong vòng <strong>7 ngày</strong> kể
        từ ngày nhận hàng. Sản phẩm cần phải chưa qua sử dụng, còn nguyên tem
        nhãn và đầy đủ hóa đơn. Quý khách vui lòng liên hệ với bộ phận chăm sóc
        khách hàng để được hướng dẫn cụ thể về thủ tục đổi trả.<br /><br />
        <strong>2. Tôi có thể hủy đơn hàng sau khi đặt không?</strong><br />
        Có thể, nếu đơn hàng chưa được gửi đi. Quý khách vui lòng liên hệ với
        cửa hàng sớm nhất để được hỗ trợ hủy đơn hàng. Nếu đơn hàng đã được giao
        cho đơn vị vận chuyển, chúng tôi không thể hỗ trợ hủy nữa.<br /><br />
        <strong>3. Thời gian giao hàng là bao lâu?</strong><br />
        Thời gian giao hàng thường từ <strong>3-5 ngày làm việc</strong> đối với
        các khu vực nội thành và <strong>5-7 ngày</strong> đối với các khu vực
        xa hơn. Sau khi đơn hàng được gửi đi, chúng tôi sẽ cung cấp mã vận đơn
        để quý khách có thể theo dõi tình trạng giao hàng.<br /><br />
        <strong>4. Cửa hàng có những phương thức thanh toán nào?</strong><br />
        Chúng tôi chấp nhận nhiều phương thức thanh toán như: thanh toán khi
        nhận hàng (COD), chuyển khoản ngân hàng, và thanh toán qua thẻ tín dụng
        hoặc ví điện tử.<br /><br />
        <strong>5. Làm sao để tôi biết kích cỡ nào phù hợp với mình?</strong
        ><br />
        Mỗi sản phẩm đều có bảng size chi tiết kèm theo hướng dẫn chọn size. Nếu
        bạn vẫn chưa chắc chắn, vui lòng liên hệ với bộ phận hỗ trợ khách hàng
        để được tư vấn và chọn kích cỡ phù hợp nhất.<br /><br />
        <strong>6. Shop có chương trình khuyến mãi nào không?</strong><br />
        Chúng tôi thường xuyên có các chương trình khuyến mãi, giảm giá và ưu
        đãi dành cho khách hàng thân thiết. Để cập nhật thông tin khuyến mãi,
        bạn có thể theo dõi trang web hoặc đăng ký nhận tin qua email của chúng
        tôi.
      </p>
    </div>`;
}
function membershipcontent() {
  loadpage();
  window.scrollTo(0, 0);
  midcontent.innerHTML = `<div id="membership-card-policy">
      <h1 class="policy-content membership-card">CHÍNH SÁCH THẺ THÀNH VIÊN</h1>
      <p class="policy-content membership-card">
        <strong>1. Đăng ký thẻ thành viên</strong><br />
        Khách hàng có thể đăng ký thẻ thành viên miễn phí tại bất kỳ cửa hàng
        nào của chúng tôi hoặc qua trang web chính thức. Để hoàn tất đăng ký,
        vui lòng cung cấp thông tin cá nhân cơ bản, bao gồm họ tên, số điện
        thoại, và địa chỉ email.<br /><br />
        <strong>2. Quyền lợi của thẻ thành viên</strong><br />
        <strong>Ưu đãi đặc biệt</strong>: Thành viên được hưởng ưu đãi giảm giá
        từ <strong>5% đến 15%</strong> cho các sản phẩm mới hoặc trong những đợt
        khuyến mãi đặc biệt.<br />
        <strong>Điểm tích lũy</strong>: Với mỗi đơn hàng, thành viên sẽ được
        tích lũy điểm thưởng. Điểm này có thể quy đổi thành tiền để sử dụng
        trong những lần mua sắm sau.<br />
        <strong>Quà tặng sinh nhật</strong>: Vào tháng sinh nhật, thành viên sẽ
        nhận được quà tặng hoặc phiếu giảm giá đặc biệt từ cửa hàng.<br />
        <strong>Ưu tiên sự kiện</strong>: Thành viên sẽ được mời tham dự các sự
        kiện thời trang, ra mắt sản phẩm mới, và các chương trình giảm giá độc
        quyền.<br /><br />
        <strong>3. Điều kiện và điều khoản sử dụng thẻ</strong><br />
        Thẻ thành viên chỉ được sử dụng cho các đơn hàng của người sở hữu thẻ và
        không được chuyển nhượng.<br />
        Điểm tích lũy có giá trị trong vòng <strong>12 tháng</strong> kể từ ngày
        tích lũy, sau đó điểm sẽ tự động hết hạn.<br />
        Cửa hàng có quyền thay đổi chính sách ưu đãi và điều khoản sử dụng thẻ
        mà không cần báo trước. Mọi thông báo thay đổi sẽ được cập nhật trên
        trang web chính thức.<br /><br />
        <strong>4. Cấp lại thẻ</strong><br />
        Trong trường hợp mất thẻ, quý khách vui lòng liên hệ với cửa hàng hoặc
        bộ phận chăm sóc khách hàng để được hỗ trợ cấp lại thẻ thành viên. Phí
        cấp lại thẻ là <strong>50,000 VND</strong>.<br /><br />
        <strong>5. Hủy thẻ thành viên</strong><br />
        Quý khách có thể yêu cầu hủy thẻ thành viên bất kỳ lúc nào. Khi hủy thẻ,
        mọi điểm tích lũy và quyền lợi liên quan sẽ không còn giá trị.
      </p>
    </div>`;
}
function ExchangeCardPolicyContent() {
  loadpage();
  window.scrollTo(0, 0);
  midcontent.innerHTML = `<div id="exchange-card-policy">
      <h1 class="policy-content exchange">CHÍNH SÁCH BẢO HÀNH VÀ ĐỔI TRẢ</h1>
      <p class="policy-content exchange">
        <strong>Chính sách bảo hành</strong><br />
        Tất cả các sản phẩm của chúng tôi đều được bảo hành trong vòng
        <strong>30 ngày</strong> kể từ ngày mua đối với các lỗi từ nhà sản xuất.
        Để yêu cầu bảo hành, sản phẩm phải chưa qua sử dụng, còn nguyên tem mác
        và hóa đơn mua hàng.<br /><br />
        <strong>Điều kiện đổi trả</strong><br />
        Sản phẩm chỉ được chấp nhận đổi trả trong vòng
        <strong>7 ngày</strong> kể từ ngày nhận hàng. Sản phẩm phải chưa qua sử
        dụng, còn nguyên tem nhãn, không bị hư hỏng do tác động bên ngoài, và
        kèm theo hóa đơn.<br /><br />
        <strong>Quy trình đổi trả</strong><br />
        Quý khách vui lòng liên hệ với bộ phận chăm sóc khách hàng để đăng ký
        đổi trả. Sau khi yêu cầu được xác nhận, chúng tôi sẽ cung cấp hướng dẫn
        gửi lại sản phẩm. Thời gian xử lý đổi trả là từ
        <strong>3-5 ngày làm việc</strong> kể từ khi nhận được sản phẩm.<br /><br />
        <strong>Chi phí vận chuyển</strong><br />
        Chi phí vận chuyển đổi trả sẽ được miễn phí nếu sản phẩm gặp lỗi từ nhà
        sản xuất. Đối với các lý do đổi trả khác, quý khách vui lòng thanh toán
        phí vận chuyển.<br /><br />
        <strong>Hoàn tiền</strong><br />
        Sau khi nhận và kiểm tra sản phẩm, chúng tôi sẽ hoàn tiền cho quý khách
        trong vòng <strong>7 ngày làm việc</strong> qua phương thức thanh toán
        ban đầu. Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ với bộ phận chăm
        sóc khách hàng để được hỗ trợ.
      </p>
    </div>`;
}
function ShipCardPolicyContent() {
  loadpage();
  window.scrollTo(0, 0);
  midcontent.innerHTML = `<div id="ship-card-policy">
      <h1 class="policy-content ship">CHÍNH SÁCH GIAO HÀNG HỎA TỐC</h1>
      <p class="policy-content ship">
        <strong>Chính sách giao hàng hỏa tốc</strong><br />
        Chúng tôi cung cấp dịch vụ giao hàng hỏa tốc cho tất cả các đơn hàng
        được đặt tại cửa hàng của chúng tôi. Dịch vụ này giúp quý khách nhận sản
        phẩm trong thời gian ngắn nhất.<br /><br />
        <strong>Thời gian giao hàng</strong><br />
        Sản phẩm sẽ được giao trong vòng <strong>2-4 giờ</strong> sau khi đơn
        hàng được xác nhận và thanh toán thành công, tùy vào khu vực giao hàng.
        Chúng tôi cam kết giao hàng đúng hẹn và đảm bảo sản phẩm đến tay quý
        khách trong tình trạng tốt nhất.<br /><br />
        <strong>Phí giao hàng</strong><br />
        Phí giao hàng hỏa tốc sẽ được tính dựa trên khoảng cách và khu vực giao
        hàng. Quý khách có thể kiểm tra phí giao hàng khi điền thông tin địa chỉ
        trong quá trình thanh toán.<br /><br />
        <strong>Điều kiện áp dụng</strong><br />
        Dịch vụ giao hàng hỏa tốc chỉ áp dụng cho các đơn hàng trong khu vực
        <strong>vùng nội thành</strong> và <strong>các khu vực lân cận</strong>.
        Đơn hàng phải được đặt trong giờ hành chính từ
        <strong>9:00 sáng đến 5:00 chiều</strong> để đảm bảo giao hàng đúng thời
        gian.<br /><br />
        <strong>Hướng dẫn theo dõi đơn hàng</strong><br />
        Quý khách có thể theo dõi trạng thái đơn hàng qua hệ thống theo dõi trực
        tuyến trên website của chúng tôi hoặc liên hệ với bộ phận chăm sóc khách
        hàng để được hỗ trợ.<br /><br />
        <strong>Đảm bảo chất lượng</strong><br />
        Chúng tôi cam kết sản phẩm sẽ được đóng gói cẩn thận và giao đến tay quý
        khách trong tình trạng nguyên vẹn. Nếu có bất kỳ vấn đề nào xảy ra trong
        quá trình giao hàng, quý khách vui lòng liên hệ ngay với chúng tôi để
        được hỗ trợ kịp thời.
      </p>
    </div>
    <div id="policy-contact">
      <a href="#" class="policy-contact-a" id="before">
        <i class="fa-solid fa-phone"></i>
      </a>
      <h3 id="policy-contact-h3">Hỗ trợ / Mua hàng:</h3>
      <a href="#" class="policy-contact-a">0923 811 183</a>
    </div>`;
}
