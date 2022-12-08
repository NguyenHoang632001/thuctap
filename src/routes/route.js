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
import PostmanStatistical from "../postmanPage/PostmanStatistical";
import StorageBlankOrderManagement from "../page/storagePage/StorageBlankOrderManagement";
import AddPostman from "../page/storagePage/AddPostman";
import ImportOrderInStorage from "../page/storagePage/ImportOrderInStorage";
import AdminManager from "../page/adminPage/AdminManager";
import AdminStatistical from "../page/adminPage/AdminStatistical";
import ChangeInfoAccount from "../page/ChangeInfoAccount";

const userRoutes = [
  { path: "/about", component: About },
  { path: "/", component: HomePage },
  { path: "/create-single", component: CreateSingle },
  { path: "/create-excel", component: CreateExcel },
  { path: "/blanket-order-management", component: BlanketOrderManagement },
  { path: "/statistical", component: Statistical },
  { path: "/detail-order", component: DetailOrder },
  { path: "/change-inforAccount", component: ChangeInfoAccount },
];
const publicRoutes = [
  { path: "/login", component: LoginPage, deafaultLayout: null },
  { path: "/signup", component: SignUp, deafaultLayout: null },
  { path: "/siginbyotp", component: SiginByOTP, deafaultLayout: null },
];
const adminRoutes = [
  { path: "/", component: HomePage },
  { path: "/admin-manager", component: AdminManager },
  { path: "/admin-statistical", component: AdminStatistical },
];
const postmanRoutes = [
  { path: "/", component: HomePage },
  { path: "/change-inforAccount", component: ChangeInfoAccount },
  {
    path: "/postman-blanket-order-management",
    component: PostmanBlankOrderManagement,
  },
  { path: "/postman-statistical", component: PostmanStatistical },
  { path: "/postman-order-in-storage", component: OrderInStorage },
];
const storageManager = [
  { path: "/", component: HomePage },
  { path: "/change-inforAccount", component: ChangeInfoAccount },
  {
    path: "/storage-blanket-order-management",
    component: StorageBlankOrderManagement,
  },
  {
    path: "/add-postman",
    component: AddPostman,
  },
  { path: "/storage-order-in-storage", component: ImportOrderInStorage },
  // { path: "/storage-order-in-storage", component: StorageOrderInStorage },
  // { path: "/storage-estimate-price", component: StorageEstimatePrice },
];

export { publicRoutes, postmanRoutes, adminRoutes, userRoutes, storageManager };
