function validate() {

    if (document.myForm.tensach.value != "" &&
        document.myForm.masosach.value != "" &&
        document.myForm.dongiaban.value != "" &&
        document.myForm.mota.value != "" &&
        document.myForm.theloai.value != "" &&
        document.myForm.tacgia.value != "" &&
        document.myForm.nhaphathanh.value != "" &&
        document.myForm.chonhinh.value != "") {
        alert("THÊM THÀNH CÔNG KHI ĐIỀN ĐỦ DỮ LIỆU")
        return (true);  
    } else {
        alert("Vui lòng nhập đầy đủ thông tin.");
        document.myForm.tensach.focus();
        return false;
    }
}