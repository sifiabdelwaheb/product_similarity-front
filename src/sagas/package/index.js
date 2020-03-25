import addpackUsRequest from "./addpackSaga";
import packUserSage from "./packageSage";
import deletepackSaga from "./deletepackSaga";
import packhomeSaga from "./packhomeSaga";
import updatepackSaga from "./updatepackSaga"
const packages = [addpackUsRequest, packUserSage,deletepackSaga,packhomeSaga,updatepackSaga];

export default packages;
