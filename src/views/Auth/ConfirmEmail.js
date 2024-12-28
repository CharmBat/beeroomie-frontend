import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import { sendConfirmEmailRequest } from "./api";

export default function ConfirmEmail() {
    const {token} = useParams();

    const navigate = useNavigate();
    (async () => {
        try {
            const response = await sendConfirmEmailRequest(token);
            if(response.error_status === 200){
                message.success('Doğrulandı! Giriş yapabilirsiniz.');
                navigate('/login');
            }
            else{
                message.error(response.system_message);
            }
        } catch (error) {
            console.error("Sunucuya bağlanılamadı. Lütfen daha sonra tekrar deneyin.");
        }
    })();

    return (
        <div>
        </div>
    )
}