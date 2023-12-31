import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../features/admin/adminSlice";
import authReducer from "../features/auth/authSlice";
import chartReducer from "../features/chart/ChartSlice";
import coachReducer from "../features/coach/coachSlice";
import midWiveReducer from "../features/midwives/midWiveSlice";
import privacyReducer from "../features/privacy/privacySlice";
import productReducr from "../features/products/productSlice";
import seekHelpsReducer from "../features/seekHelps/seekHelpsSlice";
import courseReducer from "../features/services/courseSlice";
import exerciseReducer from "../features/services/exerciseSlice";
import guidesReducer from "../features/services/guidesSlice";
import resourceSlice from "../features/services/resourceSlice";
import servicesReducer from "../features/services/servicesSlice";
import wellnessReducer from "../features/services/wellnessSlice";
import usersReducer from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    wellness: wellnessReducer,
    services: servicesReducer,
    courses: courseReducer,
    exercise: exerciseReducer,
    resources: resourceSlice,
    guides: guidesReducer,
    coaches: coachReducer,
    admins: adminReducer,
    midwives: midWiveReducer,
    seekHelps: seekHelpsReducer,
    privacyPolicies: privacyReducer,
    products: productReducr,
    charts: chartReducer,
  },
});
