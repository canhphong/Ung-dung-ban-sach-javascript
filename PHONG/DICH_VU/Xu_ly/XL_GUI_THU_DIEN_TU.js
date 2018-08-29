var nodemailer = require('nodemailer');
class XL_GUI_THU_DIEN_TU {
    Gui_Thu_Lien_he(from, to, subject, body) {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "canhphong550@gmail.com",
                pass: "123Abc!!"
            }
        });

        var mailOptions = {
            from: `Cửa hàng bán Sách<${from}>`,             
            to: to,
            subject: subject,
            html: body
        };

        return transporter.sendMail(mailOptions);
    }
}

var Goi_thu = new XL_GUI_THU_DIEN_TU()
module.exports = Goi_thu


