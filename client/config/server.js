const TestServerIp_Port = '115.159.47.29:8080';
const ProServerIp_Port = '123.206.178.83:8080';

export default {
    backend: __DEV__ ? `http://${TestServerIp_Port}/v1` :
        `http://${ProServerIp_Port}/v1`,
    Ip_Port: __DEV__ ? TestServerIp_Port : ProServerIp_Port,
}