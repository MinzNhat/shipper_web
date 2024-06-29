// import { UsersAuthenticate, StaffsAuthenticate, UsersOperation, BusinessAuthenticate, PartnerStaffAuthenticate } from "./tdlogistics.ts";

import { AuthOperation } from "./libv2";

const phoneNumber = "0981430418";
const email = "minh.luxuanhcmut.edu.vn";
const otp = "8647";


const authOperation = new AuthOperation();
const username = "minhluxuan";
const password = "MinhLuXuan@TDlogistics2k24";


authOperation.login(username, password)
    .then((result: any) => console.log(result))
    .catch((error: any) => console.log(error));
