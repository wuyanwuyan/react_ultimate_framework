const config = __CLIENT__ ? {
    backend: {
        url: __DEV__ ?
            `${window.location.origin}/fakeApi` :
            `${window.location.origin}/fakeApi`,
    },
}:{
    backend: {
        url: __DEV__ ?
            `http://localhost:8087` :
            `http://localhost:8087`,
    },
};



export const topic = {
    'index': {
        path:'index',
        name:'7x24快讯'
    },
    'realtime':{
        path:'realtime',
        name:'实时行情'
    },
    'about':{
        path:'about',
        name:'关于我们'
    }
}

export default config;

