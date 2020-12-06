let contextPath = '/msf-app-serve-node';

function serverIp() {
    return 'https://msf-app-front.herokuapp.com' + contextPath;
}

export { serverIp };