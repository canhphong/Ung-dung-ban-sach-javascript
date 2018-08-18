
var Dia_chi_Dich_vu = "http://localhost:1000"
var Dia_chi_Media = "http://localhost:1001"
//************** Xử lý Lưu trữ ***********
var Thu_muc_PDF = "../Tap_tin_PDF"

//========================================

function Xuat_Danh_Sach_Tong(Danh_sach_Sach, Th_thong_bao) {
    Th_Cha.innerHTML = ""
    Danh_sach_Sach.forEach(Sach => {
        var The_hien = Tao_The_hien_Sach(Sach, Th_Cha)
        The_hien.childNodes[0].onclick = () => {
            //The_hien.childNodes[0].classList.toggle("CHON")
            // var Sach = The_hien.childNodes[0].parentNode.getAttribute("data")
            // sessionStorage.setItem("giohang", Sach)
            // window.location = "MH_Gio_hang.html"
        }
        The_hien.childNodes[1].onclick = () => {
            //console.log(The_hien.childNodes[1].parentNode.getAttribute("data"))
            var Sach_Chon = JSON.parse(The_hien.childNodes[1].parentNode.getAttribute("data"))
            var noi_dung_HTML =
                `
                <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" id="Th_Close" data-dismiss="modal">&times;</button>
                    <h1 class="modal-title text-success text-center info-book" id="modelTitleId">${Sach_Chon.Ten}</h1>
                </div>
                <div class="modal-body">
                        <div class="row">
                        <div class="col-md-6">
                            <img class="img-full" src="http://localhost:1001/${Sach_Chon.Ma_so}.png" />
                        </div>
                        <div class="col-md-6">
                        <h2 class="text-success">Thể loại: ${Sach_Chon.Nhom_Sach.Ten_the_loai}</h2>
                        <h2 class="text-warning">Nhà xuất bản: ${Sach_Chon.Nhom_Sach.Nha_phat_hanh}</h2>
                        <h2 class="text-danger">Tác giả: ${Sach_Chon.Nhom_Sach.Tac_gia} </h2>
                        <h2 class="text-success">Giá bán: <span class="bg-success">${Sach_Chon.Don_gia_Ban}</span> đồng</h2>
                        <h2 class="text-muted">Mô tả:</h2> <p>${Sach_Chon.Mo_ta}</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
            `
            Th_Chi_tiet.innerHTML = noi_dung_HTML
            // Th_Show.click()
        }
    });
    Th_Thong_bao.innerHTML = `<h3> Cửa hàng có tất cả <span class="text-danger">${Danh_sach_Sach.length}</span> cuốn sách</h3>`
}


function Doc_Danh_sach_Sach() {
    var Du_lieu = {}
    var Xu_ly_HTTP = new XMLHttpRequest()
    var Tham_so = `Ma_so_Xu_ly=Doc_Danh_sach_Sach`
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    Xu_ly_HTTP.send("")
    var Chuoi_JSON = Xu_ly_HTTP.responseText
    if (Chuoi_JSON != "")
        Du_lieu = JSON.parse(Chuoi_JSON)
    return Du_lieu
}
// function Ghi_Phieu_Dat_hang(Dien_thoai, Phieu_dat) {
//     var Kq = ""
//     var Xu_ly_HTTP = new XMLHttpRequest()
//     var Tham_so = `Ma_so_Xu_ly=Ghi_Phieu_Dat_hang&Ma_so_Dien_thoai=${Dien_thoai.Ma_so}`
//     var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
//     Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
//     var Chuoi_goi = JSON.stringify(Phieu_dat)
//     Xu_ly_HTTP.send(Chuoi_goi)
//     Kq = Xu_ly_HTTP.responseText
//     return Kq
// }

function Tai_tap_tin(tap_tin, ten_moi) {
    var element = document.createElement("a")
    document.body.appendChild(element)
    element.setAttribute("href", `${Thu_muc_PDF}/${tap_tin}`)
    element.setAttribute("download", `${ten_moi}`)
    element.click()
    document.body.removeChild(element)
}

function XL_Upload() {
    var Ngay = Tao_Chuoi_The_hien_Ngay()
    Ngay = Ngay.replace(/[/]/g,"_")
    var Ma_so = `Don_Xin_Ung_tuyen-${Ngay}-${Th_Dien_thoai.value}.pdf`
    var reader = new FileReader();
    var Du_lieu_pdf = "";
    reader.onload = function (e) {
        Du_lieu_pdf = e.target.result;
        var Du_lieu = { "Chuoi_nhi_phan": Du_lieu_pdf, "Ten": Ma_so };
        var Xu_ly_HTTP = new XMLHttpRequest()
        var Dia_chi_Xu_ly = `${Dia_chi_Media}/Ghi_PDF`
        Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
        var Chuoi_Goi = JSON.stringify(Du_lieu)
        Xu_ly_HTTP.send(Chuoi_Goi)
        var Chuoi_KQ = Xu_ly_HTTP.responseText
        return Chuoi_KQ
    }
    Th_Thong_bao.innerHTML="Cửa hàng Chúng tôi đã nhận đơn của bạn.<br>Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất"
    reader.readAsDataURL(Th_file.files[0]);
    Th_Close.click()
}
//==============================================

function Tao_the_hien_Upload(Th_Cha) {
    Th_Cha.innerHTML = ""
    var The_hien = document.createElement("table");
    Th_Cha.appendChild(The_hien);
    The_hien.className = "table table-bordered"; 
    var noi_dung = "";
    noi_dung += `<tr>`
    noi_dung += `<td><h4 class="modal-title text-danger" id="modelTitleId"></h4></td>`
    noi_dung += `</tr>`
    noi_dung += `<tr>`
    noi_dung += `<td>Họ Tên</td><td><input type="text" id="Th_Ten" style="width:20rem" /></td>`
    noi_dung += `</tr>`
    noi_dung += `<tr>`
    noi_dung += `<td>Điện thoại</td><td><input type="text" id="Th_Dien_thoai" /></td>`
    noi_dung += `</tr>`
    noi_dung += `<tr>`
    noi_dung += `<td>Tập tin (pdf)</td><td><input type="file" id="Th_file" /></td>`
    noi_dung += `</tr>`
    noi_dung += `<tr align="center">`
    noi_dung += `<td colspan=2><button class="btn btn-danger" onclick="XL_Upload()" id="Th_Close">Đồng ý</button> </td>`
    noi_dung += `</tr>`
    The_hien.innerHTML = noi_dung
}


function Tao_The_hien_Sach(Sach, Th_Cha) {
    var the_hien = document.createElement("div")
    the_hien.setAttribute("data", JSON.stringify(Sach))
    Th_Cha.appendChild(the_hien)
    var Chuoi_HTML = `
    <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
    <div class="info-book">
    <img class="img-full" src="http://localhost:1001/${Sach.Ma_so}.png" alt="">
    <h2 class="text-success">${Sach.Ten}</h2>
    <h3 class="text-danger">Đơn giá Bán: ${Tao_Chuoi_The_hien_So_nguyen_duong(Sach.Don_gia_Ban)} đ</h3>
    <h3 class="text-muted">Thể loại: ${Sach.Nhom_Sach.Ten_the_loai}</h3>
    <h3 class="text-muted">Tác giả: ${Sach.Nhom_Sach.Tac_gia}</h3>
    <h3 class="text-muted">Nhà phát hành: ${Sach.Nhom_Sach.Nha_phat_hanh}</h3>
    <div class="text-center">
        <button type="button" class="btn btn-info btn-rounded dim" data-toggle="modal" data-target="#modelId">Xem chi tiết</button>
    </div>
</div>
    `
    the_hien.innerHTML = Chuoi_HTML;
    return the_hien
}

function Xuat_Thong_tin_Cua_hang(Cua_hang, Th_Cha) {
    var The_hien = document.createElement("div")

    Th_Cha.appendChild(The_hien)
    var noi_dung_HTML = `<img src="http://localhost:1001/${Cua_hang.Ma_so}.png" class="img-fluid float-left" />
<h2 class="text-center text-primary">${Cua_hang.Ten}
    <br>
    <small> ${Cua_hang.Dia_chi} - ${Cua_hang.Dien_thoai}</small>
</h2>`
    The_hien.innerHTML = noi_dung_HTML;
}



//==============================================================================
// Xử lý biến Số nguyên
function Nhap_So_nguyen_duong(Th_So_nguyen) {
    var Kq = {}
    Kq.So_nguyen = parseInt(Th_So_nguyen.value.trim())
    Kq.Hop_le = !isNaN(Kq.So_nguyen) && Kq.So_nguyen > 0
    return Kq
}

function Tao_Chuoi_The_hien_So_nguyen_duong(So_nguyen) {
    var Chuoi_The_hien = ""
    var Chuoi_So_nguyen = So_nguyen.toString()
    var So_Ky_so = Chuoi_So_nguyen.length
    if (So_Ky_so % 3 == 0) {
        for (var Chi_so = 0; Chi_so < Chuoi_So_nguyen.length; Chi_so++) {
            Chuoi_The_hien += Chuoi_So_nguyen[Chi_so]
            if (Chi_so % 3 == 2 && Chi_so < Chuoi_So_nguyen.length - 1)
                Chuoi_The_hien += "."
        }
    } else if (So_Ky_so % 3 == 1) {
        Chuoi_The_hien = Chuoi_So_nguyen[0]
        if (So_Ky_so > 1)
            Chuoi_The_hien += "."
        Chuoi_So_nguyen = Chuoi_So_nguyen.slice(1)
        for (var Chi_so = 0; Chi_so < Chuoi_So_nguyen.length; Chi_so++) {
            Chuoi_The_hien += Chuoi_So_nguyen[Chi_so]
            if (Chi_so % 3 == 2 && Chi_so < Chuoi_So_nguyen.length - 1)
                Chuoi_The_hien += "."

        }
    } else if (So_Ky_so % 3 == 2) {
        Chuoi_The_hien = Chuoi_So_nguyen[0] + Chuoi_So_nguyen[1]
        if (So_Ky_so > 2)
            Chuoi_The_hien += "."
        Chuoi_So_nguyen = Chuoi_So_nguyen.slice(2)
        for (var Chi_so = 0; Chi_so < Chuoi_So_nguyen.length; Chi_so++) {
            Chuoi_The_hien += Chuoi_So_nguyen[Chi_so]
            if (Chi_so % 3 == 2 && Chi_so < Chuoi_So_nguyen.length - 1)
                Chuoi_The_hien += "."
        }
    }
    return Chuoi_The_hien
}
// Xử lý Biến Số thực
function Nhap_So_thuc_duong(Th_So_thuc) {
    var Kq = {}
    Kq.So_thuc = parseInt(Th_So_thuc.value.trim())
    Kq.Hop_le = !isNaN(Kq.So_thuc) && Kq.So_thuc > 0
    return Kq
}

function Tao_Chuoi_The_hien_So_thuc_duong(So_thuc, So_so_le) {
    So_thuc = parseFloat(So_thuc)
    var Chuoi_The_hien = ""
    if (!So_so_le)
        So_so_le = 2
    var Thanh_phan_con = So_thuc
        .toFixed(So_so_le)
        .split(".")
    Chuoi_The_hien = Tao_Chuoi_The_hien_So_nguyen_duong(Thanh_phan_con[0])
    if (Thanh_phan_con.length == 2 && parseInt(Thanh_phan_con[1]) != 0 && So_so_le > 0)
        Chuoi_The_hien += "," + Tao_Chuoi_The_hien_So_nguyen_duong(Thanh_phan_con[1])
    return Chuoi_The_hien
}

function Tao_Chuoi_The_hien_Tien(So_tien, n) {
    if (!n)
        n = 0

    var Chuoi_The_hien = Tao_Chuoi_The_hien_So_thuc_duong(So_tien, n)

    return Chuoi_The_hien
}

// Xử lý với Biến Ngày
function La_Ngay_Hien_hanh(Ngay) {
    var Ngay_Hien_hanh = new Date()
    Ngay = new Date(Ngay)
    var Kq = Ngay_Hien_hanh.getDate() == Ngay.getDate() &&
        Ngay_Hien_hanh.getMonth() == Ngay.getMonth() &&
        Ngay_Hien_hanh.getFullYear() == Ngay.getFullYear()

    return Kq
}

function Tao_Chuoi_The_hien_Ngay(Ngay) {
    var Chuoi_The_hien = ""
    if (!Ngay)
        Ngay = new Date()
    Chuoi_The_hien = Ngay.getDate() + "/" + (Ngay.getMonth() + 1) + "/" + Ngay.getFullYear()
    return Chuoi_The_hien
}

function Tao_Chuoi_The_hien_Gio(Ngay) {
    var Chuoi_The_hien = ""
    if (!Ngay)
        Ngay = new Date()
    Chuoi_The_hien = Ngay.getHours() + ":" + Ngay.getMinutes() + ":" + Ngay.getMinutes()
    return Chuoi_The_hien
}

function Tao_Chuoi_The_hien_Ngay_Gio(Ngay) {
    var Chuoi_The_hien = Tao_Chuoi_The_hien_Ngay(Ngay) + " " + Tao_Chuoi_The_hien_Gio(Ngay)
    return Chuoi_The_hien
}

function Kiem_tra_Ngay(Chuoi_ngay) {
    var Thanh_phan_con = Chuoi_ngay.split("/")
    var Hop_le = Thanh_phan_con.length == 3 && !isNaN(Thanh_phan_con[0]) && !isNaN(Thanh_phan_con[1]) && !isNaN(Thanh_phan_con[2])
    if (Hop_le) {
        var Ng = parseInt(Thanh_phan_con[0])
        var Th = parseInt(Thanh_phan_con[1])
        var Nm = parseInt(Thanh_phan_con[2])
        var So_ngay_cua_Th = new Date(Nm, Th, 0).getDate()
        // var So_ngay_cua_Th = new Date(Nm, Th+1 , 0).getDate()
        Hop_le = Ng >= 1 && Ng <= So_ngay_cua_Th && Th >= 1 && Th <= 12 && Nm > 0
    }
    return Hop_le
}

function Nhap_Ngay(Th_Ngay) {
    var Kq = {}
    var Chuoi_Ngay = Th_Ngay
        .value
        .trim()
    Kq.Hop_le = Kiem_tra_Ngay(Chuoi_Ngay)
    if (Kq.Hop_le) {
        var Thanh_phan_con = Chuoi_ngay.split("/")
        Kq.Ngay = new Date(Thanh_phan_con[1] + "-" + Thanh_phan_con[0] + "-" + Thanh_phan_con[2])
    }

    return Kq
}





