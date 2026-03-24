export default async function handler(req, res) {
    const { order, type } = req.body;
    
    // LINK GOOGLE SCRIPT BẠN GIẤU TRÊN VERCEL
    const googleUrl = process.env.GOOGLE_SCRIPT_URL; 

    if (type === 'cancel') {
        order.huyDon = "Hủy đơn";
    } else {
        order.donMoi = "Đơn mới";
    }

    const formData = new URLSearchParams();
    formData.append("order", JSON.stringify(order));

    const response = await fetch(googleUrl, {
        method: "POST",
        body: formData,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    });

    const result = await response.text();
    return res.status(200).send(result);
}