function validate() {
    if (document.myForm.tensach.value == "") {
        alert("Vui lòng nhập Tên Sách của bạn.");
        document.myForm.tensach.focus();
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