
export function isMobile(userAgent) {
    if(__CLIENT__){
        userAgent = window.navigator.userAgent;
    }

    return !!userAgent.match(/AppleWebKit.*Mobile.*/);
}