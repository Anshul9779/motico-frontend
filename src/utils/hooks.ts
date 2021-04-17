import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAuth = () => {
  return useAppSelector((state) => state.user);
};

export const useNotifications = () => {
  return useAppSelector((state) => state.notification);
};
