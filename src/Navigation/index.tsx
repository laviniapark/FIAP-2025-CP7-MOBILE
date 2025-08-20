import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import UsersNavigation from "./Users";
import Login from "../Components/Auth";
import Tabs from "./Tabs";

const Index = () => {
    const {user} = useContext(AuthContext);
    return user ? <Tabs /> : <Login />
}

export default Index;