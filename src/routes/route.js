import About from "../page/About";
import HomePage from "../page/Home";
import LoginPage from "../page/LoginPage";
import SignUp from "../page/SignupPage";
import SiginByOTP from "../page/SiginByOTP";
import CreateSingle from "../page/CreateSingle";
import CreateExcel from "../page/CreateExcel";
import BlanketOrderManagement from "../page/BlanketOrderManagement";
import Statistical from "../page/Statistical";
import DetailOrder from "../page/DetailOrder";
import PostmanBlankOrderManagement from "../postmanPage/PostmanBlankOrderManagement";
import OrderInStorage from "../postmanPage/OrderInStorage";
import EstimatePrice from "../page/storagePage/EstimatePrice";

const userRoutes = [
  { path: "/about", component: About },
  { path: "/", component: HomePage },
  { path: "/create-single", component: CreateSingle },
  { path: "/create-excel", component: CreateExcel },
  { path: "/blanket-order-management", component: BlanketOrderManagement },
  { path: "/statistical", component: Statistical },
  { path: "/detail-order", component: DetailOrder },
];
const publicRoutes = [
  { path: "/login", component: LoginPage, deafaultLayout: null },
  { path: "/signup", component: SignUp, deafaultLayout: null },
  { path: "/siginbyotp", component: SiginByOTP, deafaultLayout: null },
];
const adminRoutes = [
  { path: "/about", component: About },
  { path: "/", component: HomePage },
  { path: "/login", component: LoginPage, deafaultLayout: null },
  { path: "/signup", component: SignUp, deafaultLayout: null },
  { path: "/siginbyotp", component: SiginByOTP, deafaultLayout: null },
  { path: "/create-single", component: CreateSingle },
  { path: "/create-excel", component: CreateExcel },
  { path: "/blanket-order-management", component: BlanketOrderManagement },
  { path: "/statistical", component: Statistical },
  { path: "/detail-order", component: DetailOrder },
];
const postmanRoutes = [
  { path: "/", component: HomePage },
  { path: "/blanket-order-management", component: PostmanBlankOrderManagement },
  { path: "/statistical", component: Statistical },
  { path: "/order-in-storage", component: OrderInStorage },
];
const storageManager = [
  { path: "/", component: HomePage },
  { path: "/blanket-order-management", component: PostmanBlankOrderManagement },
  { path: "/statistical", component: Statistical },
  { path: "/order-in-storage", component: OrderInStorage },
  { path: "/estimate-price", component: EstimatePrice },
];

export { publicRoutes, postmanRoutes, adminRoutes, userRoutes, storageManager };
