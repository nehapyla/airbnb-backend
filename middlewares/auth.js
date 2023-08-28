const CryptoJS = require("crypto-js");

module.exports = (req, res, next) => {
    try {
        const authHeader = req.get("Authorization");
        if (!authHeader) throw new Error("Authorization is not present");
        const token = authHeader.split(" ")[1];;
        if (!token) throw new Error("Token is not present");
        const decodedString = CryptoJS.AES.decrypt(
            token,
            process.env.CRYPTO_SECRET
        ).toString(CryptoJS.enc.Utf8);
        const { email, userId } = JSON.parse(decodedString);
        if (email && userId) {
            req.isAuth = true;
            req.email = email;
            req.userId = userId;
            next();
        } else {
            throw new Error("Invalid Token")
        }
    } catch (error) {
        // console.log(error);
        req.isAuth = false;
        next();
    }
}

