let contextPath = '/msf-app-serve-node';

function serverIp() {
    return 'http://localhost:5000' + contextPath;
}

export { serverIp };