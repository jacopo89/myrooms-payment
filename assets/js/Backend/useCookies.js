import Cookies from "universal-cookie";

export default function useCookies(){
    const cookies = new Cookies();

    let accessToken = (cookies.get('accessToken'))? cookies.get('accessToken') : null;
    const authenticated = cookies.get('authenticated');


    return [accessToken, authenticated];
}

