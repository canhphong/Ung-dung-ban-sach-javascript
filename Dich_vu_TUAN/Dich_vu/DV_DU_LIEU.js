var http = require("http");
var Luu_tru = require("../Xu_ly/XL_LUU_TRU.js")
var Xu_ly_Tham_so = require('querystring')
var Port = 1000
var Du_lieu = {}
Du_lieu.Danh_sach_Sach = Luu_tru.Doc_Danh_sach("SACH")
Du_lieu.Danh_sach_The_loai = Luu_tru.Doc_Danh_sach("THE_LOAI")
Du_lieu.Danh_sach_Tac_gia = Luu_tru.Doc_Danh_sach("TAC_GIA")
Du_lieu.Danh_sach_Nha_phat_hanh = Luu_tru.Doc_Danh_sach("NHA_PHAT_HANH")
Du_lieu.Cua_hang = Luu_tru.Doc_Thong_tin_Cua_hang()
Du_lieu.Nguoi_dung = Luu_tru.Doc_Thong_tin_Nguoi_dung()
Du_lieu.Danh_sach_Xoa_Nha_phat_hanh = Luu_tru.Doc_Danh_sach_Xoa("NHA_PHAT_HANH")
Du_lieu.Danh_sach_Xoa_Sach = Luu_tru.Doc_Danh_sach_Xoa("SACH")
Du_lieu.Danh_sach_Xoa_The_loai = Luu_tru.Doc_Danh_sach_Xoa("THE_LOAI")
Du_lieu.Danh_sach_Xoa_Tac_gia = Luu_tru.Doc_Danh_sach_Xoa("TAC_GIA")
//Du_lieu.Danh_sach_Thanh_ly = Luu_tru.Doc_Danh_sach_Thanh_ly("DIEN_THOAI")
var Dich_vu = http.createServer(
    (Yeu_cau, Dap_ung) => {
        var Chuoi_Nhan = ""
        var Chuoi_Kq = "{}"
        var Dia_chi = Yeu_cau
            .url
            .replace("/", "").replace("?", "")
        var Tham_so = Xu_ly_Tham_so.parse(Dia_chi)
        var Ma_so_Xu_ly = Tham_so.Ma_so_Xu_ly
        Yeu_cau.on('data', (chunk) => {
            Chuoi_Nhan += chunk
        })
        Yeu_cau.on('end', () => {
            if (Ma_so_Xu_ly == "Doc_Danh_sach_Sach") {
                var Doi_tuong_Kq = {}
                Doi_tuong_Kq.Danh_sach_Sach = []
                Doi_tuong_Kq.Cua_hang = Du_lieu.Cua_hang
                Du_lieu.Danh_sach_Sach.forEach(Sach_Goc => {
                    var Sach = Object.assign({}, Sach_Goc)
                    Doi_tuong_Kq.Danh_sach_Sach.push(Sach)
                    delete Sach.Don_gia_Nhap
                })
                Chuoi_Kq = JSON.stringify(Doi_tuong_Kq)
                // } else if (Ma_so_Xu_ly == "Doc_Danh_sach_Thanh_ly_Dien_thoai") {
                //     var Doi_tuong_Kq = {}
                //     Doi_tuong_Kq.Danh_sach_Thanh_ly = Du_lieu.Danh_sach_Thanh_ly
                //     Chuoi_Kq = JSON.stringify(Doi_tuong_Kq)

            } else if (Ma_so_Xu_ly == "Doc_Danh_sach_Xoa_Nha_phat_hanh") {
                var Doi_tuong_Kq = {}
                Doi_tuong_Kq.Danh_sach_Xoa_Nha_phat_hanh = Du_lieu.Danh_sach_Xoa_Nha_phat_hanh
                Chuoi_Kq = JSON.stringify(Doi_tuong_Kq)
            } else if (Ma_so_Xu_ly == "Doc_Danh_sach_Xoa_The_loai") {
                var Doi_tuong_Kq = {}
                Doi_tuong_Kq.Danh_sach_Xoa_The_loai = Du_lieu.Danh_sach_Xoa_The_loai
                Chuoi_Kq = JSON.stringify(Doi_tuong_Kq)
            } else if (Ma_so_Xu_ly == "Doc_Danh_sach_Xoa_Tac_gia") {
                var Doi_tuong_Kq = {}
                Doi_tuong_Kq.Danh_sach_Xoa_Tac_gia = Du_lieu.Danh_sach_Xoa_Tac_gia
                Chuoi_Kq = JSON.stringify(Doi_tuong_Kq)
            } else if (Ma_so_Xu_ly == "Doc_Danh_sach_Xoa_Sach") {
                var Doi_tuong_Kq = {}
                Doi_tuong_Kq.Danh_sach_Xoa_Sach = Du_lieu.Danh_sach_Xoa_Sach
                Chuoi_Kq = JSON.stringify(Doi_tuong_Kq)

            } else if (Ma_so_Xu_ly == "Dang_nhap") {
                var Doi_tuong_Kq = {}
                var Thong_tin = JSON.parse(Chuoi_Nhan)
                var Nguoi_dung = Du_lieu.Nguoi_dung.find(x => x.Ten_Dang_nhap.toLowerCase() == Thong_tin.Ten_Dang_nhap.toLowerCase() && x.Mat_khau.toLowerCase() == Thong_tin.Mat_khau.toLowerCase())
                if (Nguoi_dung) {
                    Doi_tuong_Kq.Ten = Nguoi_dung.Ten
                    Doi_tuong_Kq.Ma_so = Nguoi_dung.Ma_so
                    Doi_tuong_Kq.Nhom_Nguoi_dung = Nguoi_dung.Nhom_Nguoi_dung

                }
                Chuoi_Kq = JSON.stringify(Doi_tuong_Kq)
            } else if (Ma_so_Xu_ly == "Doc_Danh_sach_The_loai") {
                var Doi_tuong_Kq = {}
                Doi_tuong_Kq.Danh_sach_The_loai = Du_lieu.Danh_sach_The_loai
                Chuoi_Kq = JSON.stringify(Doi_tuong_Kq)
            } else if (Ma_so_Xu_ly == "Doc_Danh_sach_Tac_gia") {
                var Doi_tuong_Kq = {}
                Doi_tuong_Kq.Danh_sach_Tac_gia = Du_lieu.Danh_sach_Tac_gia
                Chuoi_Kq = JSON.stringify(Doi_tuong_Kq)
            } else if (Ma_so_Xu_ly == "Doc_Danh_sach_Nha_phat_hanh") {
                var Doi_tuong_Kq = {}
                Doi_tuong_Kq.Danh_sach_Nha_phat_hanh = Du_lieu.Danh_sach_Nha_phat_hanh
                Chuoi_Kq = JSON.stringify(Doi_tuong_Kq)
            } else if (Ma_so_Xu_ly == "Ghi_Sach_Moi") {
                var Kq = ""
                var Sach = JSON.parse(Chuoi_Nhan)
                Kq = Luu_tru.Ghi_moi_Doi_tuong("Sach", Sach)
                if (Kq == "") {
                    Du_lieu.Danh_sach_Sach.push(Sach)
                    Chuoi_Kq = JSON.stringify(Sach)
                }
            } else if (Ma_so_Xu_ly == "Ghi_The_loai_Moi") {
                var Kq = ""
                var The_loai = JSON.parse(Chuoi_Nhan)
                Kq = Luu_tru.Ghi_moi_Doi_tuong("The_loai", The_loai)
                if (Kq == "") {
                    Du_lieu.Danh_sach_The_loai.push(The_loai)
                    Chuoi_Kq = JSON.stringify(The_loai)
                }
            } else if (Ma_so_Xu_ly == "Ghi_Tac_gia_Moi") {
                var Kq = ""
                var Tac_gia = JSON.parse(Chuoi_Nhan)
                Kq = Luu_tru.Ghi_moi_Doi_tuong("Tac_gia", Tac_gia)
                if (Kq == "") {
                    Du_lieu.Danh_sach_Tac_gia.push(Tac_gia)
                    Chuoi_Kq = JSON.stringify(Tac_gia)
                }
            } else if (Ma_so_Xu_ly == "Ghi_Nha_phat_hanh_Moi") {
                var Kq = ""
                var Nha_phat_hanh = JSON.parse(Chuoi_Nhan)
                Kq = Luu_tru.Ghi_moi_Doi_tuong("Nha_phat_hanh", Nha_phat_hanh)
                if (Kq == "") {
                    Du_lieu.Danh_sach_Nha_phat_hanh.push(Nha_phat_hanh)
                    Chuoi_Kq = JSON.stringify(Nha_phat_hanh)
                }
                // } else if (Ma_so_Xu_ly == "Ghi_Phieu_Dat_hang") {
                //     var Kq = ""
                //     var Dien_thoai = Du_lieu.Danh_sach_Dien_thoai.find(x => x.Ma_so == Tham_so.Ma_so_Dien_thoai)
                //     var Phieu_Dat_hang = JSON.parse(Chuoi_Nhan)
                //     var So_Phieu_Dat = Dien_thoai.Danh_sach_Phieu_Dat.length + 1
                //     Phieu_Dat_hang.So_Phieu_Dat = So_Phieu_Dat
                //     Dien_thoai.Danh_sach_Phieu_Dat.push(Phieu_Dat_hang)
                //     Kq = Luu_tru.Cap_nhat_Doi_tuong("Dien_thoai", Dien_thoai)
                //     if (Kq == "") {
                //         Chuoi_Kq = "OK"
                //     } else {
                //         Dien_thoai.Danh_sach_Phieu_Dat.pop()
                //         Chuoi_Kq = "Error"
                //     }
                // } else if (Ma_so_Xu_ly == "Ghi_Phieu_Nhap_hang") {
                //     var Kq = ""
                //     var Danh_sach_Phieu_Nhap_hang = JSON.parse(Chuoi_Nhan)
                //     Danh_sach_Phieu_Nhap_hang.forEach(Dien_thoai_Nhap => {
                //         var Dien_thoai = Du_lieu.Danh_sach_Dien_thoai.find(x => x.Ma_so == Dien_thoai_Nhap.Ma_so)
                //         var So_Phieu_Nhap = Dien_thoai.Danh_sach_Phieu_Nhap.length + 1
                //         Dien_thoai_Nhap.Phieu_Nhap_hang.So_Phieu_Nhap = So_Phieu_Nhap
                //         Dien_thoai.Danh_sach_Phieu_Nhap.push(Dien_thoai_Nhap.Phieu_Nhap_hang)
                //         Kq = Luu_tru.Cap_nhat_Doi_tuong("Dien_thoai", Dien_thoai)
                //         if (Kq == "") {
                //             Chuoi_Kq = "OK"
                //         } else {
                //             Dien_thoai.Danh_sach_Phieu_Nhap.pop()
                //             Chuoi_Kq = "Error"
                //         }

                //     })
                // } else if (Ma_so_Xu_ly == "Ghi_Phieu_Ban_hang") {
                //     var Kq = ""
                //     var Dien_thoai = Du_lieu.Danh_sach_Dien_thoai.find(x => x.Ma_so == Tham_so.Ma_so_Dien_thoai)
                //     var Phieu_Ban_hang = JSON.parse(Chuoi_Nhan)
                //     var So_Phieu_Ban = Dien_thoai.Danh_sach_Phieu_Ban.length + 1
                //     Phieu_Ban_hang.So_Phieu_Ban = So_Phieu_Ban
                //     Dien_thoai.Danh_sach_Phieu_Ban.push(Phieu_Ban_hang)
                //     Kq = Luu_tru.Cap_nhat_Doi_tuong("Dien_thoai", Dien_thoai)
                //     if (Kq == "") {
                //         Chuoi_Kq = "OK"
                //     } else {
                //         Dien_thoai.Danh_sach_Phieu_Ban.pop()
                //         Chuoi_Kq = "Error"
                //     }
                // }else if (Ma_so_Xu_ly == "Ghi_Phieu_Giao_hang") {
                //     var Kq = ""
                //     var Phieu_Giao_hang = JSON.parse(Chuoi_Nhan)
                //     var Dien_thoai = Du_lieu.Danh_sach_Dien_thoai.find(x => x.Ma_so == Phieu_Giao_hang.Ma_so)
                //     Dien_thoai.Danh_sach_Phieu_Dat.forEach(Phieu => {
                //         if (Phieu.So_Phieu_Dat == Phieu_Giao_hang.So_Phieu_Dat) {
                //             Phieu.Nhan_vien = Phieu_Giao_hang.Nhan_vien
                //             Phieu.Trang_thai = "DA_GIAO_HANG"
                //         }
                //     })
                //     Kq = Luu_tru.Cap_nhat_Doi_tuong("Dien_thoai", Dien_thoai)
                //     if (Kq == "") {
                //         Chuoi_Kq = "OK"
                //     }

            } else if (Ma_so_Xu_ly == "Cap_nhat_Sach") {
                var Kq = ""
                var Danh_sach_Cap_nhat = JSON.parse(Chuoi_Nhan)
                Danh_sach_Cap_nhat.forEach(Sach_Cap_nhat => {
                    var Sach = Du_lieu.Danh_sach_Sach.find(x => x.Ma_so == Sach_Cap_nhat.Ma_so)
                    Sach.Ten = Sach_Cap_nhat.Ten
                    Sach.Don_gia_Ban = Sach_Cap_nhat.Don_gia_Ban
                    Sach.Don_gia_Nhap = Sach_Cap_nhat.Don_gia_Nhap
                    Sach.Mo_ta = Sach_Cap_nhat.Mo_ta
                    Sach.Nhom_Sach.Ten_the_loai = Sach_Cap_nhat.Nhom_Sach.Ten_the_loai
                    Sach.Nhom_Sach.Tac_gia = Sach_Cap_nhat.Nhom_Sach.Tac_gia
                    Sach.Nhom_Sach.Nha_phat_hanh = Sach_Cap_nhat.Nhom_Sach.Nha_phat_hanh
                    Kq = Luu_tru.Cap_nhat_Doi_tuong("Sach", Sach)
                    if (Kq == "") {
                        Chuoi_Kq = "OK"
                    } else {
                        Chuoi_Kq = "Error"
                    }
                })
            } else if (Ma_so_Xu_ly == "Cap_nhat_The_loai") {
                var Kq = ""
                var Danh_sach_Cap_nhat = JSON.parse(Chuoi_Nhan)
                Danh_sach_Cap_nhat.forEach(The_loai_Cap_nhat => {
                    var The_loai = Du_lieu.Danh_sach_The_loai.find(x => x.Ma_so == The_loai_Cap_nhat.Ma_so)
                    The_loai.Ten_the_loai = The_loai_Cap_nhat.Ten_the_loai
                    The_loai.Mo_ta_the_loai = The_loai_Cap_nhat.Mo_ta_the_loai
                    Kq = Luu_tru.Cap_nhat_Doi_tuong("The_loai", The_loai)
                    if (Kq == "") {
                        Chuoi_Kq = "OK"
                    } else {
                        Chuoi_Kq = "Error"
                    }

                })
            } else if (Ma_so_Xu_ly == "Cap_nhat_Tac_gia") {
                var Kq = ""
                var Danh_sach_Cap_nhat = JSON.parse(Chuoi_Nhan)
                Danh_sach_Cap_nhat.forEach(Tac_gia_Cap_nhat => {
                    var Tac_gia = Du_lieu.Danh_sach_Tac_gia.find(x => x.Ma_so == Tac_gia_Cap_nhat.Ma_so)
                    Tac_gia.Tac_gia = Tac_gia_Cap_nhat.Tac_gia
                    Tac_gia.Mo_ta_tac_gia = Tac_gia_Cap_nhat.Mo_ta_tac_gia
                    Kq = Luu_tru.Cap_nhat_Doi_tuong("Tac_gia", Tac_gia)
                    if (Kq == "") {
                        Chuoi_Kq = "OK"
                    } else {
                        Chuoi_Kq = "Error"
                    }

                })
            } else if (Ma_so_Xu_ly == "Cap_nhat_Nha_phat_hanh") {
                var Kq = ""
                var Danh_sach_Cap_nhat = JSON.parse(Chuoi_Nhan)
                Danh_sach_Cap_nhat.forEach(Nha_phat_hanh_Cap_nhat => {
                    var Nha_phat_hanh = Du_lieu.Danh_sach_Nha_phat_hanh.find(x => x.Ma_so == Nha_phat_hanh_Cap_nhat.Ma_so)
                    Nha_phat_hanh.Nha_phat_hanh = Nha_phat_hanh_Cap_nhat.Nha_phat_hanh
                    Nha_phat_hanh.Mo_ta_nha_phat_hanh = Nha_phat_hanh_Cap_nhat.Mo_ta_nha_phat_hanh
                    Kq = Luu_tru.Cap_nhat_Doi_tuong("Nha_phat_hanh", Nha_phat_hanh)
                    if (Kq == "") {
                        Chuoi_Kq = "OK"
                    } else {
                        Chuoi_Kq = "Error"
                    }

                })
            } else if (Ma_so_Xu_ly == "Xoa_Sach") {
                var Kq = ""
                var Danh_sach_Xoa = JSON.parse(Chuoi_Nhan)
                Danh_sach_Xoa.forEach(Sach_Xoa => {
                    var Sach = Du_lieu.Danh_sach_Sach.find(x => x.Ma_so == Sach_Xoa.Ma_so)
                    Kq = Luu_tru.Xoa_Doi_tuong("Sach", Sach)
                    if (Kq == "") {
                        Du_lieu.Danh_sach_Sach = Du_lieu.Danh_sach_Sach.filter(x => x.Ma_so != Sach_Xoa.Ma_so)
                        Du_lieu.Danh_sach_Xoa_Sach.push(Sach)
                        Chuoi_Kq = "OK"
                    } else {
                        Chuoi_Kq = "Error"
                    }
                })
                console.log(Du_lieu.Danh_sach_Sach)
            } else if (Ma_so_Xu_ly == "Xoa_The_loai") {
                var Kq = ""
                var Danh_sach_Xoa = JSON.parse(Chuoi_Nhan)
                Danh_sach_Xoa.forEach(The_loai_Xoa => {
                    var The_loai = Du_lieu.Danh_sach_The_loai.find(x => x.Ma_so == The_loai_Xoa.Ma_so)
                    Kq = Luu_tru.Xoa_Doi_tuong("The_loai", The_loai)
                    if (Kq == "") {
                        Du_lieu.Danh_sach_The_loai = Du_lieu.Danh_sach_The_loai.filter(x => x.Ma_so != The_loai_Xoa.Ma_so)
                        Du_lieu.Danh_sach_Xoa_The_loai.push(The_loai)
                        Chuoi_Kq = "OK"
                    } else {
                        Chuoi_Kq = "Error"
                    }
                })
                console.log(Du_lieu.Danh_sach_The_loai)
            } else if (Ma_so_Xu_ly == "Xoa_Tac_gia") {
                var Kq = ""
                var Danh_sach_Xoa = JSON.parse(Chuoi_Nhan)
                Danh_sach_Xoa.forEach(Tac_gia_Xoa => {
                    var Tac_gia = Du_lieu.Danh_sach_Tac_gia.find(x => x.Ma_so == Tac_gia_Xoa.Ma_so)
                    Kq = Luu_tru.Xoa_Doi_tuong("Tac_gia", Tac_gia)
                    if (Kq == "") {
                        Du_lieu.Danh_sach_Tac_gia = Du_lieu.Danh_sach_Tac_gia.filter(x => x.Ma_so != Tac_gia_Xoa.Ma_so)
                        Du_lieu.Danh_sach_Xoa_Tac_gia.push(Tac_gia)
                        Chuoi_Kq = "OK"
                    } else {
                        Chuoi_Kq = "Error"
                    }
                })
                console.log(Du_lieu.Danh_sach_Tac_gia)
            } else if (Ma_so_Xu_ly == "Xoa_Nha_phat_hanh") {
                var Kq = ""
                var Danh_sach_Xoa = JSON.parse(Chuoi_Nhan)
                Danh_sach_Xoa.forEach(Nha_phat_hanh_Xoa => {
                    var Nha_phat_hanh = Du_lieu.Danh_sach_Nha_phat_hanh.find(x => x.Ma_so == Nha_phat_hanh_Xoa.Ma_so)
                    Kq = Luu_tru.Xoa_Doi_tuong("Nha_phat_hanh", Nha_phat_hanh)
                    if (Kq == "") {
                        Du_lieu.Danh_sach_Nha_phat_hanh = Du_lieu.Danh_sach_Nha_phat_hanh.filter(x => x.Ma_so != Nha_phat_hanh_Xoa.Ma_so)
                        Du_lieu.Danh_sach_Xoa_Nha_phat_hanh.push(Nha_phat_hanh)
                        Chuoi_Kq = "OK"
                    } else {
                        Chuoi_Kq = "Error"
                    }
                })
                console.log(Du_lieu.Danh_sach_Nha_phat_hanh)
                // } else if (Ma_so_Xu_ly == "Thanh_ly_Dien_thoai") {
                //     var Kq = ""
                //     var Danh_sach_Thanh_ly = JSON.parse(Chuoi_Nhan)
                //     Danh_sach_Thanh_ly.forEach(Dien_thoai_Thanh_ly => {
                //         var Dien_thoai = Du_lieu.Danh_sach_Dien_thoai.find(x => x.Ma_so == Dien_thoai_Thanh_ly.Ma_so)
                //         Kq = Luu_tru.Thanh_ly_Doi_tuong("Dien_thoai", Dien_thoai)
                //         if (Kq == "") {
                //             Du_lieu.Danh_sach_Dien_thoai = Du_lieu.Danh_sach_Dien_thoai.filter(x => x.Ma_so != Dien_thoai_Thanh_ly.Ma_so)
                //             Du_lieu.Danh_sach_Thanh_ly.push(Dien_thoai)
                //             Chuoi_Kq = "OK"
                //         } else {
                //             Chuoi_Kq = "Error"
                //         }

                //     })
                //     console.log(Du_lieu.Danh_sach_Dien_thoai)
            } else if (Ma_so_Xu_ly == "Phuc_hoi_Sach") {
                var Kq = ""
                var Danh_sach_Phuc_hoi = JSON.parse(Chuoi_Nhan)
                Danh_sach_Phuc_hoi.forEach(Sach_Phuc_Hoi => {
                    var Sach = Du_lieu.Danh_sach_Xoa_sach.find(x => x.Ma_so == Sach_Phuc_Hoi.Ma_so)
                    Kq = Luu_tru.Phuc_hoi_Doi_tuong_da_Xoa("Sach", Sach)
                    if (Kq == "") {
                        Du_lieu.Danh_sach_Sach.push(Sach)
                        Du_lieu.Danh_sach_Xoa_sach = Du_lieu.Danh_sach_Xoa_sach.filter(x => x.Ma_so != Sach_Phuc_Hoi.Ma_so)
                        Chuoi_Kq = "OK"
                    } else {
                        Chuoi_Kq = "Error"
                    }

                })
                console.log(Du_lieu.Danh_sach_Sach)
            } else if (Ma_so_Xu_ly == "Phuc_hoi_The_loai") {
                var Kq = ""
                var Danh_sach_Phuc_hoi = JSON.parse(Chuoi_Nhan)
                Danh_sach_Phuc_hoi.forEach(The_loai_Phuc_Hoi => {
                    var The_loai = Du_lieu.Danh_sach_Xoa_The_loai.find(x => x.Ma_so == The_loai_Phuc_Hoi.Ma_so)
                    Kq = Luu_tru.Phuc_hoi_Doi_tuong_da_Xoa("The_loai", The_loai)
                    if (Kq == "") {
                        Du_lieu.Danh_sach_The_loai.push(The_loai)
                        Du_lieu.Danh_sach_Xoa = Du_lieu.Danh_sach_Xoa_The_loai.filter(x => x.Ma_so != The_loai_Phuc_Hoi.Ma_so)
                        Chuoi_Kq = "OK"
                    } else {
                        Chuoi_Kq = "Error"
                    }

                })
                console.log(Du_lieu.Danh_sach_The_loai)
            } else if (Ma_so_Xu_ly == "Phuc_hoi_Tac_gia") {
                var Kq = ""
                var Danh_sach_Phuc_hoi = JSON.parse(Chuoi_Nhan)
                Danh_sach_Phuc_hoi.forEach(Tac_gia_Phuc_Hoi => {
                    var Tac_gia = Du_lieu.Danh_sach_Xoa_Tac_gia.find(x => x.Ma_so == Tac_gia_Phuc_Hoi.Ma_so)
                    Kq = Luu_tru.Phuc_hoi_Doi_tuong_da_Xoa("Tac_gia", Tac_gia)
                    if (Kq == "") {
                        Du_lieu.Danh_sach_Tac_gia.push(Tac_gia)
                        Du_lieu.Danh_sach_Xoa = Du_lieu.Danh_sach_Xoa_Tac_gia.filter(x => x.Ma_so != Tac_gia_Phuc_Hoi.Ma_so)
                        Chuoi_Kq = "OK"
                    } else {
                        Chuoi_Kq = "Error"
                    }
                })
                console.log(Du_lieu.Danh_sach_Tac_gia)
            } else if (Ma_so_Xu_ly == "Phuc_hoi_Nha_phat_hanh") {
                var Kq = ""
                var Danh_sach_Phuc_hoi = JSON.parse(Chuoi_Nhan)
                Danh_sach_Phuc_hoi.forEach(Nha_phat_hanh_Phuc_Hoi => {
                    var Nha_phat_hanh = Du_lieu.Danh_sach_Xoa_Nha_phat_hanh.find(x => x.Ma_so == Nha_phat_hanh_Phuc_Hoi.Ma_so)
                    Kq = Luu_tru.Phuc_hoi_Doi_tuong_da_Xoa("Nha_phat_hanh", Nha_phat_hanh)
                    if (Kq == "") {
                        Du_lieu.Danh_sach_Nha_phat_hanh.push(Nha_phat_hanh)
                        Du_lieu.Danh_sach_Xoa_Nha_phat_hanh = Du_lieu.Danh_sach_Xoa_Nha_phat_hanh.filter(x => x.Ma_so != Nha_phat_hanh_Phuc_Hoi.Ma_so)
                        Chuoi_Kq = "OK"
                    } else {
                        Chuoi_Kq = "Error"
                    }

                })
                console.log(Du_lieu.Danh_sach_Nha_phat_hanh)
            } else {
                Chuoi_Kq = Luu_tru.Doc_Thong_tin_Dich_vu()
            }
            Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
            Dap_ung.end(Chuoi_Kq);
        })

    })
Dich_vu.listen(Port,
    console.log("Dịch vụ Dữ liệu đang thực thi ...: " + Port)
);