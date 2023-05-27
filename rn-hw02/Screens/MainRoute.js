import "react-native-gesture-handler";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { authStateCahngeUseThunk } from "../redux/auth/authOperations";
import { useRoute } from "../router";

function MainRoute() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.isUser);

  useEffect(() => {
    dispatch(authStateCahngeUseThunk());
  }, []);

  const routing = useRoute(state);

  return <NavigationContainer>{routing}</NavigationContainer>;
}

export default MainRoute;
