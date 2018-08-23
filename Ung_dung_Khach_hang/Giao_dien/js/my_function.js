var Du_lieu = Doc_Danh_sach_Sach();
var Danh_sach_Sach = Du_lieu.Danh_sach_Sach;
if (Danh_sach_Sach.length > 0) {
    Xuat_Danh_Sach_Tong(Danh_sach_Sach, Th_Thong_bao)
} else {
    Th_Thong_bao.innerHTML = "Lỗi đọc dữ liệu"
}

Th_Tim.onclick = () => {
    var gtTim = Th_Gia_tri_Tim.value;
    var Danh_sach_Sach_tim = Danh_sach_Sach.filter(x => x.Ten.toLowerCase().includes(gtTim.toLowerCase()));
    Xuat_Danh_Sach_Tong(Danh_sach_Sach_tim, Th_Thong_bao);
    Th_Gia_tri_Tim.value = "";
}

function KeyCode(event) {
    if (event.keyCode == 13) {
        var gtTim = event.target.value;
        var Danh_sach_Sach_tim = Danh_sach_Sach.filter(x => x.Ten.toLowerCase().includes(gtTim.toLowerCase()));
        Xuat_Danh_Sach_Tong(Danh_sach_Sach_tim, Th_Thong_bao);
    }
}

function Xuat_Sach_theo_Don_gia(chuoi_dieu_kien) {
    var Thanh_phan_con = chuoi_dieu_kien.split('-')
    if (Thanh_phan_con.length > 0) {

        var Danh_sach_Sach_theo_Gia = Danh_sach_Sach.filter(x => x.Don_gia_Ban >=
            Thanh_phan_con[0] &&
            x.Don_gia_Ban <= Thanh_phan_con[1])
        Xuat_Danh_Sach_Tong(Danh_sach_Sach_theo_Gia, Th_Thong_bao)
    }
}

function Xuat_Sach_theo_The_loai(theloai) {
    switch (theloai) {
        case 'khoahoc':
            var Danh_sach_Sach_theo_Nhom = Danh_sach_Sach.filter(x => x.Nhom_Sach.Ten_the_loai ==
                "Khoa học")
            Xuat_Danh_Sach_Tong(Danh_sach_Sach_theo_Nhom, Th_Thong_bao)
            break;
        case 'thethao':
            var Danh_sach_Sach_theo_Nhom = Danh_sach_Sach.filter(x => x.Nhom_Sach.Ten_the_loai ==
                "Thể thao")
            Xuat_Danh_Sach_Tong(Danh_sach_Sach_theo_Nhom, Th_Thong_bao)
            break;
        case 'thieunhi':
            var Danh_sach_Sach_theo_Nhom = Danh_sach_Sach.filter(x => x.Nhom_Sach.Ten_the_loai ==
                "Thiếu nhi")
            Xuat_Danh_Sach_Tong(Danh_sach_Sach_theo_Nhom, Th_Thong_bao)
            break;
        case 'tinhcam':
            var Danh_sach_Sach_theo_Nhom = Danh_sach_Sach.filter(x => x.Nhom_Sach.Ten_the_loai ==
                "Tình cảm")
            Xuat_Danh_Sach_Tong(Danh_sach_Sach_theo_Nhom, Th_Thong_bao)
            break;
        case 'vanhoc':
            var Danh_sach_Sach_theo_Nhom = Danh_sach_Sach.filter(x => x.Nhom_Sach.Ten_the_loai ==
                "Văn học")
            Xuat_Danh_Sach_Tong(Danh_sach_Sach_theo_Nhom, Th_Thong_bao)
            break;
        default:
            Xuat_Danh_Sach_Tong(Danh_sach_Sach_theo_Nhom, Th_Thong_bao)
    }
}

function Xuat_Sach_theo_Tac_gia(tacgia) {
    switch (tacgia) {
        case 'ngoctrinh':
            var Danh_sach_Sach_theo_Nhom = Danh_sach_Sach.filter(x => x.Nhom_Sach.Tac_gia ==
                "Ngọc Trinh")
            Xuat_Danh_Sach_Tong(Danh_sach_Sach_theo_Nhom, Th_Thong_bao)
            break;
        case 'kimdung':
            var Danh_sach_Sach_theo_Nhom = Danh_sach_Sach.filter(x => x.Nhom_Sach.Tac_gia ==
                "Kim Dung")
            Xuat_Danh_Sach_Tong(Danh_sach_Sach_theo_Nhom, Th_Thong_bao)
            break;
        case 'nguyenanh':
            var Danh_sach_Sach_theo_Nhom = Danh_sach_Sach.filter(x => x.Nhom_Sach.Tac_gia ==
                "Nguyễn Ánh")
            Xuat_Danh_Sach_Tong(Danh_sach_Sach_theo_Nhom, Th_Thong_bao)
            break;
        case 'tohuu':
            var Danh_sach_Sach_theo_Nhom = Danh_sach_Sach.filter(x => x.Nhom_Sach.Tac_gia ==
                "Tố Hữu")
            Xuat_Danh_Sach_Tong(Danh_sach_Sach_theo_Nhom, Th_Thong_bao)
            break;
        case 'quoctuan':
            var Danh_sach_Sach_theo_Nhom = Danh_sach_Sach.filter(x => x.Nhom_Sach.Tac_gia ==
                "Quốc Tuấn")
            Xuat_Danh_Sach_Tong(Danh_sach_Sach_theo_Nhom, Th_Thong_bao)
            break;
        default:
            Xuat_Danh_Sach_Tong(Danh_sach_Sach_theo_Nhom, Th_Thong_bao)
    }
}

function Xuat_Sach_theo_NPH(nhaphathanh) {
    switch (nhaphathanh) {
        case 'kimdong':
            var Danh_sach_Sach_theo_Nhom = Danh_sach_Sach.filter(x => x.Nhom_Sach.Nha_phat_hanh ==
                "Kim Đồng")
            Xuat_Danh_Sach_Tong(Danh_sach_Sach_theo_Nhom, Th_Thong_bao)
            break;
        case 'nxbtre':
            var Danh_sach_Sach_theo_Nhom = Danh_sach_Sach.filter(x => x.Nhom_Sach.Nha_phat_hanh ==
                "NXB Trẻ")
            Xuat_Danh_Sach_Tong(Danh_sach_Sach_theo_Nhom, Th_Thong_bao)
            break;
        case 'fahasha':
            var Danh_sach_Sach_theo_Nhom = Danh_sach_Sach.filter(x => x.Nhom_Sach.Nha_phat_hanh ==
                "Fahasha")
            Xuat_Danh_Sach_Tong(Danh_sach_Sach_theo_Nhom, Th_Thong_bao)
            break;
        case 'nxbvannghe':
            var Danh_sach_Sach_theo_Nhom = Danh_sach_Sach.filter(x => x.Nhom_Sach.Nha_phat_hanh ==
                "NXB Văn Nghệ")
            Xuat_Danh_Sach_Tong(Danh_sach_Sach_theo_Nhom, Th_Thong_bao)
            break;
        case 'nxbvanhoc':
            var Danh_sach_Sach_theo_Nhom = Danh_sach_Sach.filter(x => x.Nhom_Sach.Nha_phat_hanh ==
                "NXB Văn Học")
            Xuat_Danh_Sach_Tong(Danh_sach_Sach_theo_Nhom, Th_Thong_bao)
            break;
        default:
            Xuat_Danh_Sach_Tong(Danh_sach_Sach_theo_Nhom, Th_Thong_bao)
    }
}

function Sap_Tang() {
    Danh_sach_Sach.sort((a, b) => a.Ten.localeCompare(b.Ten))
    Xuat_Danh_Sach_Tong(Danh_sach_Sach, Th_Thong_bao)
}

function Sap_Giam() {
    Danh_sach_Sach.sort((a, b) => b.Ten.localeCompare(a.Ten))
    Xuat_Danh_Sach_Tong(Danh_sach_Sach, Th_Thong_bao)
}