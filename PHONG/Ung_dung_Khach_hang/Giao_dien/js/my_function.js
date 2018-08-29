var limit = 8;  

var Du_lieu = Doc_Danh_sach_Sach();
var Danh_sach_Sach = Du_lieu.Danh_sach_Sach;
if (Danh_sach_Sach.length > 0) {
    Xuat_Danh_sach_Phan_trang(Danh_sach_Sach, Th_Thong_bao, 0, limit);
    Tao_The_Hien_Phan_trang(Danh_sach_Sach, limit, Th_Phan_trang)

} else {
    Th_Thong_bao.innerHTML = "Lỗi đọc dữ liệu"
}

function Xuat_Danh_sach_Phan_trang(Danh_sach_Sach, Th_Thong_bao, vt, limit) {
    Th_Cha.innerHTML = "";
    var dem = 0;
    Danh_sach_Sach.forEach((Sach, index) => {
        var The_hien = Tao_The_hien_Sach(Sach, Th_Cha)
        if (index >= vt && dem < limit) {
            The_hien.childNodes[0].onclick = () => {
                var Sach_Chon = JSON.parse(The_hien.childNodes[0].parentNode.getAttribute("data"))
                var noi_dung_HTML = `<div class="modal fade" id="myModal" role="dialog">
            <div class="modal-dialog">
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
                                      <div class="book-mb5">
                                        <h4 class="text-danger"><i class="fa fa-money" aria-hidden="true"></i> <strong>Giá bán: ${Tao_Chuoi_The_hien_So_nguyen_duong(Sach.Don_gia_Ban)} đồng</strong></h4>
                                        <h4 class="text-success"><i class="fa fa-list-alt" aria-hidden="true"></i> Thể loại: ${Sach_Chon.Nhom_Sach.Ten_the_loai}</h4>
                                        <h4 class="text-warning"><i class="fa fa-address-book" aria-hidden="true"></i> Nhà xuất bản: ${Sach_Chon.Nhom_Sach.Nha_phat_hanh}</h4>
                                        <h4 class="text-danger"><i class="fa fa-user" aria-hidden="true"></i> Tác giả: ${Sach_Chon.Nhom_Sach.Tac_gia} </h4>
                                        <h4 class="text-muted"><i class="fa fa-info" aria-hidden="true"></i> Mô tả:</h4> <p>${Sach_Chon.Mo_ta}</p>
                                     </div>
                                      </div>
                                  </div>
                              </div>
                              <div class="modal-footer">
                                  <a href="MH_Lien_he.html" target="_blank"><button type="button" class="btn btn-warning">Liên hệ mua sách</button></a>
                              </div>
                          </div>
            </div>
          </div>`
                Th_Chi_tiet.innerHTML = noi_dung_HTML;
            }
            dem++;
        } else {
            The_hien.style.cssText = "display:none"
        }
    });
    Th_Thong_bao.innerHTML = `<h4 class="book-alert">Danh sách hiện có <span style="color:red;font-size:17px;">${Danh_sach_Sach.length}</span> cuốn sách</h4>`
}


function Tao_The_Hien_Phan_trang(Danh_sach, So_san_pham_cho_mot_trang, Th_Cha) {
    var Tong_so_san_pham = Danh_sach.length
    var Tong_trang = (Tong_so_san_pham % So_san_pham_cho_mot_trang == 0) ? Tong_so_san_pham / So_san_pham_cho_mot_trang : parseInt(Tong_so_san_pham / So_san_pham_cho_mot_trang) + 1
    var noi_dung_HTML = `<nav aria-label="Page navigation example">`
    noi_dung_HTML += `
    <ul class="pagination justify-content-center">
    `
    for (var i = 1; i <= Tong_trang; i++) {
        var vt = (i - 1) * So_san_pham_cho_mot_trang
        noi_dung_HTML += `<li class="page-item"><a class="page-link" href="javaScript:void(0)" onclick="Xuat_Danh_sach_Phan_trang(Danh_sach_Sach, Th_Thong_bao,${vt} ,${limit})" >${i}</a></li>`
    }
    noi_dung_HTML += `
    </ul>
    </nav>
    `
    Th_Cha.innerHTML = noi_dung_HTML
}


Th_Trang_chu.onclick = () => {
    Xuat_Danh_sach_Phan_trang(Danh_sach_Sach, Th_Thong_bao, 0, limit);
    Tao_The_Hien_Phan_trang(Danh_sach_Sach, limit, Th_Phan_trang)
}



Th_Tim.onclick = () => {
    var gtTim = Th_Gia_tri_Tim.value;
    var Danh_sach_Sach_tim = Danh_sach_Sach.filter(x => x.Ten.toLowerCase().includes(gtTim.toLowerCase()));
    Xuat_Danh_sach_Phan_trang(Danh_sach_Sach_tim, Th_Thong_bao, 0, limit);
    if (Danh_sach_Sach_tim.length > limit) {
        Tao_The_Hien_Phan_trang(Danh_sach_Sach_tim, limit, Th_Phan_trang)
    }
    Th_Gia_tri_Tim.value = "";
}

function KeyCode(event) {
    if (event.keyCode == 13) {
        var gtTim = event.target.value;
        var Danh_sach_Sach_tim = Danh_sach_Sach.filter(x => x.Ten.toLowerCase().includes(gtTim.toLowerCase()));
        Xuat_Danh_sach_Phan_trang(Danh_sach_Sach_tim, Th_Thong_bao, 0, limit);
        if (Danh_sach_Sach_tim.length > limit) {
            Tao_The_Hien_Phan_trang(Danh_sach_Sach_tim, limit, Th_Phan_trang)
        }
        Th_Gia_tri_Tim.value = "";
    }
}

function Sap_Tang() {
    Danh_sach_Sach.sort((a, b) => a.Ten.localeCompare(b.Ten))
    Xuat_Danh_sach_Phan_trang(Danh_sach_Sach, Th_Thong_bao, 0, limit);
    Tao_The_Hien_Phan_trang(Danh_sach_Sach, limit, Th_Phan_trang)
}

function Sap_Giam() {
    Danh_sach_Sach.sort((a, b) => b.Ten.localeCompare(a.Ten))
    Xuat_Danh_sach_Phan_trang(Danh_sach_Sach, Th_Thong_bao, 0, limit);
    Tao_The_Hien_Phan_trang(Danh_sach_Sach, limit, Th_Phan_trang)
}

function Xuat_Sach_theo_Don_gia(chuoi_dieu_kien) {
    var Thanh_phan_con = chuoi_dieu_kien.split('-')
    if (Thanh_phan_con.length > 0) {
        var Danh_sach_Sach_theo_Gia = Danh_sach_Sach.filter(x => x.Don_gia_Ban >=
            Thanh_phan_con[0] && x.Don_gia_Ban <= Thanh_phan_con[1])
        Xuat_Danh_sach_Phan_trang(Danh_sach_Sach_theo_Gia, Th_Thong_bao, 0, limit);
        if (Danh_sach_Sach_theo_Gia.length > limit) {
            Tao_The_Hien_Phan_trang(Danh_sach_Sach_theo_Gia, limit, Th_Phan_trang)
        }
        Danh_sach_Sach_theo_Gia.value = "";
    }
}

function Xuat_Sach_theo_The_loai(theloai) {
    switch (theloai) {
        case 'khoahoc':
            var Danh_sach_Sach_theo_Nhom = Danh_sach_Sach.filter(x => x.Nhom_Sach.Ten_the_loai ==
                "Khoa học")
            Xuat_Danh_sach_Phan_trang(Danh_sach_Sach_theo_Nhom, Th_Thong_bao, 0, limit);
            if (Danh_sach_Sach_theo_Nhom.length > limit) {
                Tao_The_Hien_Phan_trang(Danh_sach_Sach_theo_Nhom, limit, Th_Phan_trang)
            }
            break;
        case 'thethao':
            var Danh_sach_Sach_theo_Nhom = Danh_sach_Sach.filter(x => x.Nhom_Sach.Ten_the_loai ==
                "Thể thao")
            Xuat_Danh_sach_Phan_trang(Danh_sach_Sach_theo_Nhom, Th_Thong_bao, 0, limit);
            if (Danh_sach_Sach_theo_Nhom.length > limit) {
                Tao_The_Hien_Phan_trang(Danh_sach_Sach_theo_Nhom, limit, Th_Phan_trang)
            }
            break;
        case 'thieunhi':
            var Danh_sach_Sach_theo_Nhom = Danh_sach_Sach.filter(x => x.Nhom_Sach.Ten_the_loai ==
                "Thiếu nhi")
            Xuat_Danh_sach_Phan_trang(Danh_sach_Sach_theo_Nhom, Th_Thong_bao, 0, limit);
            if (Danh_sach_Sach_theo_Nhom.length > limit) {
                Tao_The_Hien_Phan_trang(Danh_sach_Sach_theo_Nhom, limit, Th_Phan_trang)
            }
            break;
        case 'tinhcam':
            var Danh_sach_Sach_theo_Nhom = Danh_sach_Sach.filter(x => x.Nhom_Sach.Ten_the_loai ==
                "Tình cảm")
            Xuat_Danh_sach_Phan_trang(Danh_sach_Sach_theo_Nhom, Th_Thong_bao, 0, limit);
            if (Danh_sach_Sach_theo_Nhom.length > limit) {
                Tao_The_Hien_Phan_trang(Danh_sach_Sach_theo_Nhom, limit, Th_Phan_trang)
            }
            break;
        case 'vanhoc':
            var Danh_sach_Sach_theo_Nhom = Danh_sach_Sach.filter(x => x.Nhom_Sach.Ten_the_loai ==
                "Văn học")
            Xuat_Danh_sach_Phan_trang(Danh_sach_Sach_theo_Nhom, Th_Thong_bao, 0, limit);
            if (Danh_sach_Sach_theo_Nhom.length > limit) {
                Tao_The_Hien_Phan_trang(Danh_sach_Sach_theo_Nhom, limit, Th_Phan_trang)
            }
            break;
        default:
            Xuat_Danh_sach_Phan_trang(Danh_sach_Sach_theo_Nhom, Th_Thong_bao)
    }
}

function Xuat_Sach_theo_Tac_gia(tacgia) {
    switch (tacgia) {
        case 'ngoctrinh':
            var Danh_sach_Sach_theo_Nhom = Danh_sach_Sach.filter(x => x.Nhom_Sach.Tac_gia ==
                "Ngọc Trinh")
            Xuat_Danh_sach_Phan_trang(Danh_sach_Sach_theo_Nhom, Th_Thong_bao, 0, limit);
            if (Danh_sach_Sach_theo_Nhom.length > limit) {
                Tao_The_Hien_Phan_trang(Danh_sach_Sach_theo_Nhom, limit, Th_Phan_trang)
            }
            break;
        case 'kimdung':
            var Danh_sach_Sach_theo_Nhom = Danh_sach_Sach.filter(x => x.Nhom_Sach.Tac_gia ==
                "Kim Dung")
            Xuat_Danh_sach_Phan_trang(Danh_sach_Sach_theo_Nhom, Th_Thong_bao, 0, limit);
            if (Danh_sach_Sach_theo_Nhom.length > limit) {
                Tao_The_Hien_Phan_trang(Danh_sach_Sach_theo_Nhom, limit, Th_Phan_trang)
            }
            break;
        case 'nguyenanh':
            var Danh_sach_Sach_theo_Nhom = Danh_sach_Sach.filter(x => x.Nhom_Sach.Tac_gia ==
                "Nguyễn Ánh")
            Xuat_Danh_sach_Phan_trang(Danh_sach_Sach_theo_Nhom, Th_Thong_bao, 0, limit);
            if (Danh_sach_Sach_theo_Nhom.length > limit) {
                Tao_The_Hien_Phan_trang(Danh_sach_Sach_theo_Nhom, limit, Th_Phan_trang)
            }
            break;
        case 'tohuu':
            var Danh_sach_Sach_theo_Nhom = Danh_sach_Sach.filter(x => x.Nhom_Sach.Tac_gia ==
                "Tố Hữu")
            Xuat_Danh_sach_Phan_trang(Danh_sach_Sach_theo_Nhom, Th_Thong_bao, 0, limit);
            if (Danh_sach_Sach_theo_Nhom.length > limit) {
                Tao_The_Hien_Phan_trang(Danh_sach_Sach_theo_Nhom, limit, Th_Phan_trang)
            }
            break;
        case 'quoctuan':
            var Danh_sach_Sach_theo_Nhom = Danh_sach_Sach.filter(x => x.Nhom_Sach.Tac_gia ==
                "Quốc Tuấn")
            Xuat_Danh_sach_Phan_trang(Danh_sach_Sach_theo_Nhom, Th_Thong_bao, 0, limit);
            if (Danh_sach_Sach_theo_Nhom.length > limit) {
                Tao_The_Hien_Phan_trang(Danh_sach_Sach_theo_Nhom, limit, Th_Phan_trang)
            }
            break;
        default:
            Xuat_Danh_sach_Phan_trang(Danh_sach_Sach_theo_Nhom, Th_Thong_bao)
    }
}

function Xuat_Sach_theo_NPH(nhaphathanh) {
    switch (nhaphathanh) {
        case 'kimdong':
            var Danh_sach_Sach_theo_Nhom = Danh_sach_Sach.filter(x => x.Nhom_Sach.Nha_phat_hanh ==
                "Kim Đồng")
            Xuat_Danh_sach_Phan_trang(Danh_sach_Sach_theo_Nhom, Th_Thong_bao, 0, limit);
            if (Danh_sach_Sach_theo_Nhom.length > limit) {
                Tao_The_Hien_Phan_trang(Danh_sach_Sach_theo_Nhom, limit, Th_Phan_trang)
            }
            break;
        case 'nxbtre':
            var Danh_sach_Sach_theo_Nhom = Danh_sach_Sach.filter(x => x.Nhom_Sach.Nha_phat_hanh ==
                "NXB Trẻ")
            Xuat_Danh_sach_Phan_trang(Danh_sach_Sach_theo_Nhom, Th_Thong_bao, 0, limit);
            if (Danh_sach_Sach_theo_Nhom.length > limit) {
                Tao_The_Hien_Phan_trang(Danh_sach_Sach_theo_Nhom, limit, Th_Phan_trang)
            }
            break;
        case 'fahasha':
            var Danh_sach_Sach_theo_Nhom = Danh_sach_Sach.filter(x => x.Nhom_Sach.Nha_phat_hanh ==
                "Fahasha")
            Xuat_Danh_sach_Phan_trang(Danh_sach_Sach_theo_Nhom, Th_Thong_bao, 0, limit);
            if (Danh_sach_Sach_theo_Nhom.length > limit) {
                Tao_The_Hien_Phan_trang(Danh_sach_Sach_theo_Nhom, limit, Th_Phan_trang)
            }
            break;
        case 'nxbvannghe':
            var Danh_sach_Sach_theo_Nhom = Danh_sach_Sach.filter(x => x.Nhom_Sach.Nha_phat_hanh ==
                "NXB Văn Nghệ")
            Xuat_Danh_sach_Phan_trang(Danh_sach_Sach_theo_Nhom, Th_Thong_bao, 0, limit);
            if (Danh_sach_Sach_theo_Nhom.length > limit) {
                Tao_The_Hien_Phan_trang(Danh_sach_Sach_theo_Nhom, limit, Th_Phan_trang)
            }
            break;
        case 'nxbvanhoc':
            var Danh_sach_Sach_theo_Nhom = Danh_sach_Sach.filter(x => x.Nhom_Sach.Nha_phat_hanh ==
                "NXB Văn Học")
            Xuat_Danh_sach_Phan_trang(Danh_sach_Sach_theo_Nhom, Th_Thong_bao, 0, limit);
            if (Danh_sach_Sach_theo_Nhom.length > limit) {
                Tao_The_Hien_Phan_trang(Danh_sach_Sach_theo_Nhom, limit, Th_Phan_trang)
            }
            break;
        default:
            Xuat_Danh_sach_Phan_trang(Danh_sach_Sach_theo_Nhom, Th_Thong_bao)
    }
}



function validate() {
    if (document.myForm.name.value == "") {
        alert("Vui lòng nhập Tên của bạn.");
        document.myForm.name.focus();
        return false;
    }
    if (document.myForm.email.value == "") {
        alert("Vui lòng nhập Email của bạn.");
        document.myForm.name.focus();
        return false;
    }
    if (document.myForm.title.value == "") {
        alert("Vui lòng nhập Tiêu đề.");
        document.myForm.title.focus();
        return false;
    }
    if (document.myForm.content.value == "") {
        alert("Vui lòng nhập Nội dung.");
        document.myForm.content.focus();
        return false;
    }
    return (true);
}