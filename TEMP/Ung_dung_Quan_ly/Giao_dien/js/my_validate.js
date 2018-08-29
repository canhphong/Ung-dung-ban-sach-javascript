function validate() {

    if (document.myForm.tensach.value != "" 
    && document.myForm.masosach.value != "" 
    && document.myForm.dongiaban.value != "" 
    && document.myForm.mota.value != "" 
    && document.myForm.theloai.value != "" 
    && document.myForm.tacgia.value != ""
    && document.myForm.nhaphathanh.value != ""
    && document.myForm.chonhinh.value != "" ) {
        return (true);
        alert("THÊM THÀNH CÔNG KHI ĐIỀN ĐỦ DỮ LIỆU")
    }
    if (document.myForm.tensach.value == "") {
        alert("Vui lòng nhập Tên Sách của bạn.");
        document.myForm.tensach.focus();
        return false;
    }
    if (document.myForm.dongiaban.value == "" ||  isNaN(document.myForm.dongiaban.value)) {
        alert("Vui lòng nhập đơn giá bán và là con số.");
        document.myForm.dongiaban.focus();
        return false;
    }
    if (document.myForm.mota.value == "") {
        alert("Vui lòng nhập Mô tả.");
        document.myForm.mota.focus();
        return false;
    }
    if (document.myForm.chonhinh.value == "") {
        alert("Vui lòng chọn hình.");
        document.myForm.chonhinh.focus();
        return false;
    }
   
}