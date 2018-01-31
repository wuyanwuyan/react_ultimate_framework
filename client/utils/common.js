export function isMobile(userAgent) {
    return !!userAgent.match(/AppleWebKit.*Mobile.*/);
}