var http = require("http");
var Luu_tru = require("../Xu_ly/XL_LUU_TRU.js")
var Xu_ly_Tham_so = require('querystring')
var Port = 1000
var Du_lieu = {}
Du_lieu.Danh_sach_Sach = Luu_tru.Doc_Danh_sach("Sach")

var Dich_vu = http.createServer(
    (Yeu_cau, Dap_ung) => {
        var Chuoi_Nhan = ""
        var Chuoi_Kq = "{}"
        var Dia_chi = Yeu_cau
            .url
            .replace("/", "").replace("?", "")
        var Tham_so = Xu_ly_Tham_so.parse(Dia_chi)
        var Ma_so_Xu_ly = Tham_so.Ma_so_Xu_ly
        Yeu_cau.on('data', (chunk) => { Chuoi_Nhan += chunk })
        Yeu_cau.on('end', () => {
            if (Ma_so_Xu_ly == "Doc_Danh_sach_Sach") {
                var Doi_tuong_Kq = Du_lieu.Danh_sach_Sach
                Chuoi_Kq = JSON.stringify(Doi_tuong_Kq)
                Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                Dap_ung.end(Chuoi_Kq);
            } else {
                Chuoi_Kq = Luu_tru.Doc_Thong_tin_Dich_vu()
                Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                Dap_ung.end(Chuoi_Kq);
            }

        })

    })
Dich_vu.listen(Port,
    console.log("Dịch vụ Dữ liệu đang thực thi ...: " + Port)
);

