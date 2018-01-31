const scriptInline = `
    <script type="text/javascript">
        var uAgent = window.navigator.userAgent;
        var isIOS = uAgent.match(/iphone/i);
        function resizeRoot() {
            var wWidth = (screen.width > 0) ? (window.innerWidth >= screen.width || window.innerWidth == 0) ? screen.width :
                window.innerWidth : window.innerWidth, wFsize;
            var wHeight = (screen.height > 0) ? (window.innerHeight >= screen.height || window.innerHeight == 0) ?
                screen.height : window.innerHeight : window.innerHeight;
        
            if (isIOS) {
                wWidth = screen.width;
                wHeight = screen.height;
            }
        
            if (wWidth > wHeight) {
                wWidth = wHeight;
            }
        
            wFsize = wWidth > 1080 ? 288 : wWidth / 3.75;
            wFsize = wFsize > 64 ? wFsize : 64;
        
            document.getElementsByTagName('html')[0].style.fontSize = wFsize + 'px';
            // alert("fz="+wFsize+";dpr="+window.devicePixelRatio+";UA="+uAgent+";width="+wWidth+";sw="+screen.width+";wiw="+window.innerWidth+";wsw="+window.screen.width+window.screen.availWidth);
        }
        resizeRoot();
    </script>
    `;


export default scriptInline;