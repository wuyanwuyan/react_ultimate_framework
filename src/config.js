const config = {
    backend: {
        url: process.env.NODE_ENV === 'development' ?
            'http://localhost:8087/' :
            'http://localhost:8087/',
    },
};

export default config;


// backendtest.cqaso.com/
// '//121.40.106.106:8080/' :
// '//backend.cqaso.com/',
