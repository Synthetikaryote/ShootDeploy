function LoadJSCodeBlob(e,t){var o=document.createElement("script");o.src=URL.createObjectURL(e),o.onload=t,document.body.appendChild(o)}function LoadJSCode(e,t){if(!Math.fround){console.log("optimizing out Math.fround calls");for(var o={LOOKING_FOR_MODULE:0,SCANNING_MODULE_VARIABLES:1,SCANNING_MODULE_FUNCTIONS:2},n=["EMSCRIPTEN_START_ASM","EMSCRIPTEN_START_FUNCS","EMSCRIPTEN_END_FUNCS"],i="var",a="global.Math.fround;",r=0,s=o.LOOKING_FOR_MODULE,d=0,l=0;s<=o.SCANNING_MODULE_FUNCTIONS&&r<e.length;r++)if(47==e[r]&&47==e[r+1]&&32==e[r+2]&&String.fromCharCode.apply(null,e.subarray(r+3,r+3+n[s].length))===n[s])s++;else if(s!=o.SCANNING_MODULE_VARIABLES||l||61!=e[r]||String.fromCharCode.apply(null,e.subarray(r+1,r+1+a.length))!==a){if(l&&40==e[r]){for(var u=0;l>u&&e[r-1-u]==e[d-u];)u++;if(u==l){var c=e[r-1-u];if(36>c||c>36&&48>c||c>57&&65>c||c>90&&95>c||c>95&&97>c||c>122)for(;u;u--)e[r-u]=32}}}else{for(d=r-1;32!=e[d-l];)l++;l&&String.fromCharCode.apply(null,e.subarray(d-l-i.length,d-l))===i||(d=l=0)}}LoadJSCodeBlob(new Blob([e],{type:"text/javascript"}),t)}function DecompressAndLoadFile(e,t,o){e+="gz";var n=new XMLHttpRequest;n.open("GET",e,!0),n.onprogress=o,n.responseType="arraybuffer",n.onload=function(){var o=new Uint8Array(n.response),i=(new Date).getTime(),a=pako.inflate(o),r=(new Date).getTime();console.log("Decompressed "+e+" in "+(r-i)+"ms. You can remove this delay if you configure your web server to host files using gzip compression."),t(a)},n.onerror=function(){console.log("Could not download "+e),didShowErrorMessage||0!=document.URL.indexOf("file:")||(alert("It seems your browser does not support running Unity WebGL content from file:// urls. Please upload it to an http server, or try a different browser."),didShowErrorMessage=!0)},n.send(null)}function LoadCompressedFile(e,t,o){if(CompressionState.current==CompressionState.Unsupported)return void DecompressAndLoadFile(e,t);if(CompressionState.current==CompressionState.Pending)return void CompressionState.pendingServerRequests.push(function(){LoadCompressedFile(e,t,o)});CompressionState.current==CompressionState.Uninitialized&&(CompressionState.current=CompressionState.Pending);var n=new XMLHttpRequest;n.open("GET",e,!0),n.responseType="arraybuffer",n.onprogress=function(e){o&&o(e),CompressionState.current==CompressionState.Pending&&(0==n.status||200==n.status?CompressionState.Set(CompressionState.Supported):CompressionState.Set(CompressionState.Unsupported))},n.onload=function(){if(0==n.status||200==n.status){CompressionState.Set(CompressionState.Supported);var i=new Uint8Array(n.response);t(i)}else CompressionState.Set(CompressionState.Unsupported),DecompressAndLoadFile(e,t,o)},n.onerror=function(){CompressionState.Set(CompressionState.Unsupported),DecompressAndLoadFile(e,t,o)};try{n.send(null)}catch(i){CompressionState.Set(CompressionState.Unsupported),DecompressAndLoadFile(e,t,o)}}function LoadCompressedJS(e,t){LoadCompressedFile(e,function(e){LoadJSCode(e,t)})}function fetchRemotePackageWrapper(e,t,o,n){LoadCompressedFile(e,o,function(o){var n=e,i=t;if(o.total&&(i=o.total),o.loaded){Module.dataFileDownloads||(Module.dataFileDownloads={}),Module.dataFileDownloads[n]={loaded:o.loaded,total:i};var a=0,r=0,s=0;for(var d in Module.dataFileDownloads){var l=Module.dataFileDownloads[d];a+=l.total,r+=l.loaded,s++}a=Math.ceil(a*Module.expectedDataFileDownloads/s),Module.setStatus&&Module.setStatus("Downloading data... ("+r+"/"+a+")")}else Module.dataFileDownloads||Module.setStatus&&Module.setStatus("Downloading data...")})}function SetIndexedDBAndLoadCompressedJS(e){SetIndexedDBAndLoadCompressedJS.called||(SetIndexedDBAndLoadCompressedJS.called=!0,Module.indexedDB=e,LoadCompressedJS(Module.codeUrl))}function CompatibilityCheck(){hasWebGL?mobile?confirm("Please note that Unity WebGL is not currently supported on mobiles. Press Ok if you wish to continue anyway.")||window.history.back():-1==browser.indexOf("Firefox")&&-1==browser.indexOf("Chrome")&&-1==browser.indexOf("Safari")&&(confirm("Please note that your browser is not currently supported for this Unity WebGL content. Try installing Firefox, or press Ok if you wish to continue anyway.")||window.history.back()):(alert("You need a browser which supports WebGL to run this content. Try installing Firefox."),window.history.back())}function SetFullscreen(e){if("undefined"==typeof JSEvents)return void console.log("Player not loaded yet.");var t=JSEvents.canPerformEventHandlerRequests;JSEvents.canPerformEventHandlerRequests=function(){return 1},Module.cwrap("SetFullscreen","void",["number"])(e),JSEvents.canPerformEventHandlerRequests=t}var CompressionState={Uninitialized:0,Pending:1,Unsupported:2,Supported:3,current:0,pendingServerRequests:[],Set:function(e){if(CompressionState.current==CompressionState.Pending){CompressionState.current=e;for(var t=0;t<CompressionState.pendingServerRequests.length;t++)CompressionState.pendingServerRequests[t]()}}};Module.memoryInitializerRequest={response:null,callback:null,addEventListener:function(e,t){if("load"!=e)throw"Unexpected type "+e;this.callback=t}};try{var idb=window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB,testRequest=idb.open("/idbfs-test");testRequest.onerror=function(e){e.preventDefault(),SetIndexedDBAndLoadCompressedJS()},testRequest.onsuccess=function(){testRequest.result.close(),SetIndexedDBAndLoadCompressedJS(idb)},setTimeout(function(){SetIndexedDBAndLoadCompressedJS()},1e3)}catch(e){SetIndexedDBAndLoadCompressedJS()}LoadCompressedFile(Module.memUrl,function(e){Module.memoryInitializerRequest.response=e,Module.memoryInitializerRequest.callback&&Module.memoryInitializerRequest.callback()}),function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.pako=e()}}(function(){return function e(t,o,n){function i(r,s){if(!o[r]){if(!t[r]){var d="function"==typeof require&&require;if(!s&&d)return d(r,!0);if(a)return a(r,!0);var l=new Error("Cannot find module '"+r+"'");throw l.code="MODULE_NOT_FOUND",l}var u=o[r]={exports:{}};t[r][0].call(u.exports,function(e){var o=t[r][1][e];return i(o?o:e)},u,u.exports,e,t,o,n)}return o[r].exports}for(var a="function"==typeof require&&require,r=0;r<n.length;r++)i(n[r]);return i}({1:[function(e,t,o){"use strict";var n="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;o.assign=function(e){for(var t=Array.prototype.slice.call(arguments,1);t.length;){var o=t.shift();if(o){if("object"!=typeof o)throw new TypeError(o+"must be non-object");for(var n in o)o.hasOwnProperty(n)&&(e[n]=o[n])}}return e},o.shrinkBuf=function(e,t){return e.length===t?e:e.subarray?e.subarray(0,t):(e.length=t,e)};var i={arraySet:function(e,t,o,n,i){if(t.subarray&&e.subarray)return void e.set(t.subarray(o,o+n),i);for(var a=0;n>a;a++)e[i+a]=t[o+a]},flattenChunks:function(e){var t,o,n,i,a,r;for(n=0,t=0,o=e.length;o>t;t++)n+=e[t].length;for(r=new Uint8Array(n),i=0,t=0,o=e.length;o>t;t++)a=e[t],r.set(a,i),i+=a.length;return r}},a={arraySet:function(e,t,o,n,i){for(var a=0;n>a;a++)e[i+a]=t[o+a]},flattenChunks:function(e){return[].concat.apply([],e)}};o.setTyped=function(e){e?(o.Buf8=Uint8Array,o.Buf16=Uint16Array,o.Buf32=Int32Array,o.assign(o,i)):(o.Buf8=Array,o.Buf16=Array,o.Buf32=Array,o.assign(o,a))},o.setTyped(n)},{}],2:[function(e,t,o){"use strict";function n(e,t){if(65537>t&&(e.subarray&&r||!e.subarray&&a))return String.fromCharCode.apply(null,i.shrinkBuf(e,t));for(var o="",n=0;t>n;n++)o+=String.fromCharCode(e[n]);return o}var i=e("./common"),a=!0,r=!0;try{String.fromCharCode.apply(null,[0])}catch(s){a=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(s){r=!1}for(var d=new i.Buf8(256),l=0;256>l;l++)d[l]=l>=252?6:l>=248?5:l>=240?4:l>=224?3:l>=192?2:1;d[254]=d[254]=1,o.string2buf=function(e){var t,o,n,a,r,s=e.length,d=0;for(a=0;s>a;a++)o=e.charCodeAt(a),55296===(64512&o)&&s>a+1&&(n=e.charCodeAt(a+1),56320===(64512&n)&&(o=65536+(o-55296<<10)+(n-56320),a++)),d+=128>o?1:2048>o?2:65536>o?3:4;for(t=new i.Buf8(d),r=0,a=0;d>r;a++)o=e.charCodeAt(a),55296===(64512&o)&&s>a+1&&(n=e.charCodeAt(a+1),56320===(64512&n)&&(o=65536+(o-55296<<10)+(n-56320),a++)),128>o?t[r++]=o:2048>o?(t[r++]=192|o>>>6,t[r++]=128|63&o):65536>o?(t[r++]=224|o>>>12,t[r++]=128|o>>>6&63,t[r++]=128|63&o):(t[r++]=240|o>>>18,t[r++]=128|o>>>12&63,t[r++]=128|o>>>6&63,t[r++]=128|63&o);return t},o.buf2binstring=function(e){return n(e,e.length)},o.binstring2buf=function(e){for(var t=new i.Buf8(e.length),o=0,n=t.length;n>o;o++)t[o]=e.charCodeAt(o);return t},o.buf2string=function(e,t){var o,i,a,r,s=t||e.length,l=new Array(2*s);for(i=0,o=0;s>o;)if(a=e[o++],128>a)l[i++]=a;else if(r=d[a],r>4)l[i++]=65533,o+=r-1;else{for(a&=2===r?31:3===r?15:7;r>1&&s>o;)a=a<<6|63&e[o++],r--;r>1?l[i++]=65533:65536>a?l[i++]=a:(a-=65536,l[i++]=55296|a>>10&1023,l[i++]=56320|1023&a)}return n(l,i)},o.utf8border=function(e,t){var o;for(t=t||e.length,t>e.length&&(t=e.length),o=t-1;o>=0&&128===(192&e[o]);)o--;return 0>o?t:0===o?t:o+d[e[o]]>t?o:t}},{"./common":1}],3:[function(e,t,o){"use strict";function n(e,t,o,n){for(var i=65535&e|0,a=e>>>16&65535|0,r=0;0!==o;){r=o>2e3?2e3:o,o-=r;do i=i+t[n++]|0,a=a+i|0;while(--r);i%=65521,a%=65521}return i|a<<16|0}t.exports=n},{}],4:[function(e,t,o){t.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],5:[function(e,t,o){"use strict";function n(){for(var e,t=[],o=0;256>o;o++){e=o;for(var n=0;8>n;n++)e=1&e?3988292384^e>>>1:e>>>1;t[o]=e}return t}function i(e,t,o,n){var i=a,r=n+o;e=-1^e;for(var s=n;r>s;s++)e=e>>>8^i[255&(e^t[s])];return-1^e}var a=n();t.exports=i},{}],6:[function(e,t,o){"use strict";function n(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}t.exports=n},{}],7:[function(e,t,o){"use strict";var n=30,i=12;t.exports=function(e,t){var o,a,r,s,d,l,u,c,f,h,p,m,w,b,g,v,k,y,S,_,x,M,C,E,D;o=e.state,a=e.next_in,E=e.input,r=a+(e.avail_in-5),s=e.next_out,D=e.output,d=s-(t-e.avail_out),l=s+(e.avail_out-257),u=o.dmax,c=o.wsize,f=o.whave,h=o.wnext,p=o.window,m=o.hold,w=o.bits,b=o.lencode,g=o.distcode,v=(1<<o.lenbits)-1,k=(1<<o.distbits)-1;e:do{15>w&&(m+=E[a++]<<w,w+=8,m+=E[a++]<<w,w+=8),y=b[m&v];t:for(;;){if(S=y>>>24,m>>>=S,w-=S,S=y>>>16&255,0===S)D[s++]=65535&y;else{if(!(16&S)){if(0===(64&S)){y=b[(65535&y)+(m&(1<<S)-1)];continue t}if(32&S){o.mode=i;break e}e.msg="invalid literal/length code",o.mode=n;break e}_=65535&y,S&=15,S&&(S>w&&(m+=E[a++]<<w,w+=8),_+=m&(1<<S)-1,m>>>=S,w-=S),15>w&&(m+=E[a++]<<w,w+=8,m+=E[a++]<<w,w+=8),y=g[m&k];o:for(;;){if(S=y>>>24,m>>>=S,w-=S,S=y>>>16&255,!(16&S)){if(0===(64&S)){y=g[(65535&y)+(m&(1<<S)-1)];continue o}e.msg="invalid distance code",o.mode=n;break e}if(x=65535&y,S&=15,S>w&&(m+=E[a++]<<w,w+=8,S>w&&(m+=E[a++]<<w,w+=8)),x+=m&(1<<S)-1,x>u){e.msg="invalid distance too far back",o.mode=n;break e}if(m>>>=S,w-=S,S=s-d,x>S){if(S=x-S,S>f&&o.sane){e.msg="invalid distance too far back",o.mode=n;break e}if(M=0,C=p,0===h){if(M+=c-S,_>S){_-=S;do D[s++]=p[M++];while(--S);M=s-x,C=D}}else if(S>h){if(M+=c+h-S,S-=h,_>S){_-=S;do D[s++]=p[M++];while(--S);if(M=0,_>h){S=h,_-=S;do D[s++]=p[M++];while(--S);M=s-x,C=D}}}else if(M+=h-S,_>S){_-=S;do D[s++]=p[M++];while(--S);M=s-x,C=D}for(;_>2;)D[s++]=C[M++],D[s++]=C[M++],D[s++]=C[M++],_-=3;_&&(D[s++]=C[M++],_>1&&(D[s++]=C[M++]))}else{M=s-x;do D[s++]=D[M++],D[s++]=D[M++],D[s++]=D[M++],_-=3;while(_>2);_&&(D[s++]=D[M++],_>1&&(D[s++]=D[M++]))}break}}break}}while(r>a&&l>s);_=w>>3,a-=_,w-=_<<3,m&=(1<<w)-1,e.next_in=a,e.next_out=s,e.avail_in=r>a?5+(r-a):5-(a-r),e.avail_out=l>s?257+(l-s):257-(s-l),o.hold=m,o.bits=w}},{}],8:[function(e,t,o){"use strict";function n(e){return(e>>>24&255)+(e>>>8&65280)+((65280&e)<<8)+((255&e)<<24)}function i(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new b.Buf16(320),this.work=new b.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function a(e){var t;return e&&e.state?(t=e.state,e.total_in=e.total_out=t.total=0,e.msg="",t.wrap&&(e.adler=1&t.wrap),t.mode=U,t.last=0,t.havedict=0,t.dmax=32768,t.head=null,t.hold=0,t.bits=0,t.lencode=t.lendyn=new b.Buf32(pe),t.distcode=t.distdyn=new b.Buf32(me),t.sane=1,t.back=-1,D):I}function r(e){var t;return e&&e.state?(t=e.state,t.wsize=0,t.whave=0,t.wnext=0,a(e)):I}function s(e,t){var o,n;return e&&e.state?(n=e.state,0>t?(o=0,t=-t):(o=(t>>4)+1,48>t&&(t&=15)),t&&(8>t||t>15)?I:(null!==n.window&&n.wbits!==t&&(n.window=null),n.wrap=o,n.wbits=t,r(e))):I}function d(e,t){var o,n;return e?(n=new i,e.state=n,n.window=null,o=s(e,t),o!==D&&(e.state=null),o):I}function l(e){return d(e,be)}function u(e){if(ge){var t;for(m=new b.Buf32(512),w=new b.Buf32(32),t=0;144>t;)e.lens[t++]=8;for(;256>t;)e.lens[t++]=9;for(;280>t;)e.lens[t++]=7;for(;288>t;)e.lens[t++]=8;for(y(_,e.lens,0,288,m,0,e.work,{bits:9}),t=0;32>t;)e.lens[t++]=5;y(x,e.lens,0,32,w,0,e.work,{bits:5}),ge=!1}e.lencode=m,e.lenbits=9,e.distcode=w,e.distbits=5}function c(e,t,o,n){var i,a=e.state;return null===a.window&&(a.wsize=1<<a.wbits,a.wnext=0,a.whave=0,a.window=new b.Buf8(a.wsize)),n>=a.wsize?(b.arraySet(a.window,t,o-a.wsize,a.wsize,0),a.wnext=0,a.whave=a.wsize):(i=a.wsize-a.wnext,i>n&&(i=n),b.arraySet(a.window,t,o-n,i,a.wnext),n-=i,n?(b.arraySet(a.window,t,o-n,n,0),a.wnext=n,a.whave=a.wsize):(a.wnext+=i,a.wnext===a.wsize&&(a.wnext=0),a.whave<a.wsize&&(a.whave+=i))),0}function f(e,t){var o,i,a,r,s,d,l,f,h,p,m,w,pe,me,we,be,ge,ve,ke,ye,Se,_e,xe,Me,Ce=0,Ee=new b.Buf8(4),De=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!e||!e.state||!e.output||!e.input&&0!==e.avail_in)return I;o=e.state,o.mode===W&&(o.mode=K),s=e.next_out,a=e.output,l=e.avail_out,r=e.next_in,i=e.input,d=e.avail_in,f=o.hold,h=o.bits,p=d,m=l,_e=D;e:for(;;)switch(o.mode){case U:if(0===o.wrap){o.mode=K;break}for(;16>h;){if(0===d)break e;d--,f+=i[r++]<<h,h+=8}if(2&o.wrap&&35615===f){o.check=0,Ee[0]=255&f,Ee[1]=f>>>8&255,o.check=v(o.check,Ee,2,0),f=0,h=0,o.mode=N;break}if(o.flags=0,o.head&&(o.head.done=!1),!(1&o.wrap)||(((255&f)<<8)+(f>>8))%31){e.msg="incorrect header check",o.mode=ce;break}if((15&f)!==O){e.msg="unknown compression method",o.mode=ce;break}if(f>>>=4,h-=4,Se=(15&f)+8,0===o.wbits)o.wbits=Se;else if(Se>o.wbits){e.msg="invalid window size",o.mode=ce;break}o.dmax=1<<Se,e.adler=o.check=1,o.mode=512&f?H:W,f=0,h=0;break;case N:for(;16>h;){if(0===d)break e;d--,f+=i[r++]<<h,h+=8}if(o.flags=f,(255&o.flags)!==O){e.msg="unknown compression method",o.mode=ce;break}if(57344&o.flags){e.msg="unknown header flags set",o.mode=ce;break}o.head&&(o.head.text=f>>8&1),512&o.flags&&(Ee[0]=255&f,Ee[1]=f>>>8&255,o.check=v(o.check,Ee,2,0)),f=0,h=0,o.mode=z;case z:for(;32>h;){if(0===d)break e;d--,f+=i[r++]<<h,h+=8}o.head&&(o.head.time=f),512&o.flags&&(Ee[0]=255&f,Ee[1]=f>>>8&255,Ee[2]=f>>>16&255,Ee[3]=f>>>24&255,o.check=v(o.check,Ee,4,0)),f=0,h=0,o.mode=T;case T:for(;16>h;){if(0===d)break e;d--,f+=i[r++]<<h,h+=8}o.head&&(o.head.xflags=255&f,o.head.os=f>>8),512&o.flags&&(Ee[0]=255&f,Ee[1]=f>>>8&255,o.check=v(o.check,Ee,2,0)),f=0,h=0,o.mode=P;case P:if(1024&o.flags){for(;16>h;){if(0===d)break e;d--,f+=i[r++]<<h,h+=8}o.length=f,o.head&&(o.head.extra_len=f),512&o.flags&&(Ee[0]=255&f,Ee[1]=f>>>8&255,o.check=v(o.check,Ee,2,0)),f=0,h=0}else o.head&&(o.head.extra=null);o.mode=Z;case Z:if(1024&o.flags&&(w=o.length,w>d&&(w=d),w&&(o.head&&(Se=o.head.extra_len-o.length,o.head.extra||(o.head.extra=new Array(o.head.extra_len)),b.arraySet(o.head.extra,i,r,w,Se)),512&o.flags&&(o.check=v(o.check,i,w,r)),d-=w,r+=w,o.length-=w),o.length))break e;o.length=0,o.mode=q;case q:if(2048&o.flags){if(0===d)break e;w=0;do Se=i[r+w++],o.head&&Se&&o.length<65536&&(o.head.name+=String.fromCharCode(Se));while(Se&&d>w);if(512&o.flags&&(o.check=v(o.check,i,w,r)),d-=w,r+=w,Se)break e}else o.head&&(o.head.name=null);o.length=0,o.mode=G;case G:if(4096&o.flags){if(0===d)break e;w=0;do Se=i[r+w++],o.head&&Se&&o.length<65536&&(o.head.comment+=String.fromCharCode(Se));while(Se&&d>w);if(512&o.flags&&(o.check=v(o.check,i,w,r)),d-=w,r+=w,Se)break e}else o.head&&(o.head.comment=null);o.mode=j;case j:if(512&o.flags){for(;16>h;){if(0===d)break e;d--,f+=i[r++]<<h,h+=8}if(f!==(65535&o.check)){e.msg="header crc mismatch",o.mode=ce;break}f=0,h=0}o.head&&(o.head.hcrc=o.flags>>9&1,o.head.done=!0),e.adler=o.check=0,o.mode=W;break;case H:for(;32>h;){if(0===d)break e;d--,f+=i[r++]<<h,h+=8}e.adler=o.check=n(f),f=0,h=0,o.mode=J;case J:if(0===o.havedict)return e.next_out=s,e.avail_out=l,e.next_in=r,e.avail_in=d,o.hold=f,o.bits=h,A;e.adler=o.check=1,o.mode=W;case W:if(t===C||t===E)break e;case K:if(o.last){f>>>=7&h,h-=7&h,o.mode=de;break}for(;3>h;){if(0===d)break e;d--,f+=i[r++]<<h,h+=8}switch(o.last=1&f,f>>>=1,h-=1,3&f){case 0:o.mode=Y;break;case 1:if(u(o),o.mode=te,t===E){f>>>=2,h-=2;break e}break;case 2:o.mode=Q;break;case 3:e.msg="invalid block type",o.mode=ce}f>>>=2,h-=2;break;case Y:for(f>>>=7&h,h-=7&h;32>h;){if(0===d)break e;d--,f+=i[r++]<<h,h+=8}if((65535&f)!==(f>>>16^65535)){e.msg="invalid stored block lengths",o.mode=ce;break}if(o.length=65535&f,f=0,h=0,o.mode=X,t===E)break e;case X:o.mode=V;case V:if(w=o.length){if(w>d&&(w=d),w>l&&(w=l),0===w)break e;b.arraySet(a,i,r,w,s),d-=w,r+=w,l-=w,s+=w,o.length-=w;break}o.mode=W;break;case Q:for(;14>h;){if(0===d)break e;d--,f+=i[r++]<<h,h+=8}if(o.nlen=(31&f)+257,f>>>=5,h-=5,o.ndist=(31&f)+1,f>>>=5,h-=5,o.ncode=(15&f)+4,f>>>=4,h-=4,o.nlen>286||o.ndist>30){e.msg="too many length or distance symbols",o.mode=ce;break}o.have=0,o.mode=$;case $:for(;o.have<o.ncode;){for(;3>h;){if(0===d)break e;d--,f+=i[r++]<<h,h+=8}o.lens[De[o.have++]]=7&f,f>>>=3,h-=3}for(;o.have<19;)o.lens[De[o.have++]]=0;if(o.lencode=o.lendyn,o.lenbits=7,xe={bits:o.lenbits},_e=y(S,o.lens,0,19,o.lencode,0,o.work,xe),o.lenbits=xe.bits,_e){e.msg="invalid code lengths set",o.mode=ce;break}o.have=0,o.mode=ee;case ee:for(;o.have<o.nlen+o.ndist;){for(;Ce=o.lencode[f&(1<<o.lenbits)-1],we=Ce>>>24,be=Ce>>>16&255,ge=65535&Ce,!(h>=we);){if(0===d)break e;d--,f+=i[r++]<<h,h+=8}if(16>ge)f>>>=we,h-=we,o.lens[o.have++]=ge;else{if(16===ge){for(Me=we+2;Me>h;){if(0===d)break e;d--,f+=i[r++]<<h,h+=8}if(f>>>=we,h-=we,0===o.have){e.msg="invalid bit length repeat",o.mode=ce;break}Se=o.lens[o.have-1],w=3+(3&f),f>>>=2,h-=2}else if(17===ge){for(Me=we+3;Me>h;){if(0===d)break e;d--,f+=i[r++]<<h,h+=8}f>>>=we,h-=we,Se=0,w=3+(7&f),f>>>=3,h-=3}else{for(Me=we+7;Me>h;){if(0===d)break e;d--,f+=i[r++]<<h,h+=8}f>>>=we,h-=we,Se=0,w=11+(127&f),f>>>=7,h-=7}if(o.have+w>o.nlen+o.ndist){e.msg="invalid bit length repeat",o.mode=ce;break}for(;w--;)o.lens[o.have++]=Se}}if(o.mode===ce)break;if(0===o.lens[256]){e.msg="invalid code -- missing end-of-block",o.mode=ce;break}if(o.lenbits=9,xe={bits:o.lenbits},_e=y(_,o.lens,0,o.nlen,o.lencode,0,o.work,xe),o.lenbits=xe.bits,_e){e.msg="invalid literal/lengths set",o.mode=ce;break}if(o.distbits=6,o.distcode=o.distdyn,xe={bits:o.distbits},_e=y(x,o.lens,o.nlen,o.ndist,o.distcode,0,o.work,xe),o.distbits=xe.bits,_e){e.msg="invalid distances set",o.mode=ce;break}if(o.mode=te,t===E)break e;case te:o.mode=oe;case oe:if(d>=6&&l>=258){e.next_out=s,e.avail_out=l,e.next_in=r,e.avail_in=d,o.hold=f,o.bits=h,k(e,m),s=e.next_out,a=e.output,l=e.avail_out,r=e.next_in,i=e.input,d=e.avail_in,f=o.hold,h=o.bits,o.mode===W&&(o.back=-1);break}for(o.back=0;Ce=o.lencode[f&(1<<o.lenbits)-1],we=Ce>>>24,be=Ce>>>16&255,ge=65535&Ce,!(h>=we);){if(0===d)break e;d--,f+=i[r++]<<h,h+=8}if(be&&0===(240&be)){for(ve=we,ke=be,ye=ge;Ce=o.lencode[ye+((f&(1<<ve+ke)-1)>>ve)],we=Ce>>>24,be=Ce>>>16&255,ge=65535&Ce,!(h>=ve+we);){if(0===d)break e;d--,f+=i[r++]<<h,h+=8}f>>>=ve,h-=ve,o.back+=ve}if(f>>>=we,h-=we,o.back+=we,o.length=ge,0===be){o.mode=se;break}if(32&be){o.back=-1,o.mode=W;break}if(64&be){e.msg="invalid literal/length code",o.mode=ce;break}o.extra=15&be,o.mode=ne;case ne:if(o.extra){for(Me=o.extra;Me>h;){if(0===d)break e;d--,f+=i[r++]<<h,h+=8}o.length+=f&(1<<o.extra)-1,f>>>=o.extra,h-=o.extra,o.back+=o.extra}o.was=o.length,o.mode=ie;case ie:for(;Ce=o.distcode[f&(1<<o.distbits)-1],we=Ce>>>24,be=Ce>>>16&255,ge=65535&Ce,!(h>=we);){if(0===d)break e;d--,f+=i[r++]<<h,h+=8}if(0===(240&be)){for(ve=we,ke=be,ye=ge;Ce=o.distcode[ye+((f&(1<<ve+ke)-1)>>ve)],we=Ce>>>24,be=Ce>>>16&255,ge=65535&Ce,!(h>=ve+we);){if(0===d)break e;d--,f+=i[r++]<<h,h+=8}f>>>=ve,h-=ve,o.back+=ve}if(f>>>=we,h-=we,o.back+=we,64&be){e.msg="invalid distance code",o.mode=ce;break}o.offset=ge,o.extra=15&be,o.mode=ae;case ae:if(o.extra){for(Me=o.extra;Me>h;){if(0===d)break e;d--,f+=i[r++]<<h,h+=8}o.offset+=f&(1<<o.extra)-1,f>>>=o.extra,h-=o.extra,o.back+=o.extra}if(o.offset>o.dmax){e.msg="invalid distance too far back",o.mode=ce;break}o.mode=re;case re:if(0===l)break e;if(w=m-l,o.offset>w){if(w=o.offset-w,w>o.whave&&o.sane){e.msg="invalid distance too far back",o.mode=ce;break}w>o.wnext?(w-=o.wnext,pe=o.wsize-w):pe=o.wnext-w,w>o.length&&(w=o.length),me=o.window}else me=a,pe=s-o.offset,w=o.length;w>l&&(w=l),l-=w,o.length-=w;do a[s++]=me[pe++];while(--w);0===o.length&&(o.mode=oe);break;case se:if(0===l)break e;a[s++]=o.length,l--,o.mode=oe;break;case de:if(o.wrap){for(;32>h;){if(0===d)break e;d--,f|=i[r++]<<h,h+=8}if(m-=l,e.total_out+=m,o.total+=m,m&&(e.adler=o.check=o.flags?v(o.check,a,m,s-m):g(o.check,a,m,s-m)),m=l,(o.flags?f:n(f))!==o.check){e.msg="incorrect data check",o.mode=ce;break}f=0,h=0}o.mode=le;case le:if(o.wrap&&o.flags){for(;32>h;){if(0===d)break e;d--,f+=i[r++]<<h,h+=8}if(f!==(4294967295&o.total)){e.msg="incorrect length check",o.mode=ce;break}f=0,h=0}o.mode=ue;case ue:_e=R;break e;case ce:_e=L;break e;case fe:return F;case he:default:return I}return e.next_out=s,e.avail_out=l,e.next_in=r,e.avail_in=d,o.hold=f,o.bits=h,(o.wsize||m!==e.avail_out&&o.mode<ce&&(o.mode<de||t!==M))&&c(e,e.output,e.next_out,m-e.avail_out)?(o.mode=fe,F):(p-=e.avail_in,m-=e.avail_out,e.total_in+=p,e.total_out+=m,o.total+=m,o.wrap&&m&&(e.adler=o.check=o.flags?v(o.check,a,m,e.next_out-m):g(o.check,a,m,e.next_out-m)),e.data_type=o.bits+(o.last?64:0)+(o.mode===W?128:0)+(o.mode===te||o.mode===X?256:0),(0===p&&0===m||t===M)&&_e===D&&(_e=B),_e)}function h(e){if(!e||!e.state)return I;var t=e.state;return t.window&&(t.window=null),e.state=null,D}function p(e,t){var o;return e&&e.state?(o=e.state,0===(2&o.wrap)?I:(o.head=t,t.done=!1,D)):I}var m,w,b=e("../utils/common"),g=e("./adler32"),v=e("./crc32"),k=e("./inffast"),y=e("./inftrees"),S=0,_=1,x=2,M=4,C=5,E=6,D=0,R=1,A=2,I=-2,L=-3,F=-4,B=-5,O=8,U=1,N=2,z=3,T=4,P=5,Z=6,q=7,G=8,j=9,H=10,J=11,W=12,K=13,Y=14,X=15,V=16,Q=17,$=18,ee=19,te=20,oe=21,ne=22,ie=23,ae=24,re=25,se=26,de=27,le=28,ue=29,ce=30,fe=31,he=32,pe=852,me=592,we=15,be=we,ge=!0;o.inflateReset=r,o.inflateReset2=s,o.inflateResetKeep=a,o.inflateInit=l,o.inflateInit2=d,o.inflate=f,o.inflateEnd=h,o.inflateGetHeader=p,o.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":1,"./adler32":3,"./crc32":5,"./inffast":7,"./inftrees":9}],9:[function(e,t,o){"use strict";var n=e("../utils/common"),i=15,a=852,r=592,s=0,d=1,l=2,u=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],c=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],f=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],h=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];t.exports=function(e,t,o,p,m,w,b,g){var v,k,y,S,_,x,M,C,E,D=g.bits,R=0,A=0,I=0,L=0,F=0,B=0,O=0,U=0,N=0,z=0,T=null,P=0,Z=new n.Buf16(i+1),q=new n.Buf16(i+1),G=null,j=0;for(R=0;i>=R;R++)Z[R]=0;for(A=0;p>A;A++)Z[t[o+A]]++;for(F=D,L=i;L>=1&&0===Z[L];L--);if(F>L&&(F=L),0===L)return m[w++]=20971520,m[w++]=20971520,g.bits=1,0;for(I=1;L>I&&0===Z[I];I++);for(I>F&&(F=I),U=1,R=1;i>=R;R++)if(U<<=1,U-=Z[R],0>U)return-1;if(U>0&&(e===s||1!==L))return-1;for(q[1]=0,R=1;i>R;R++)q[R+1]=q[R]+Z[R];for(A=0;p>A;A++)0!==t[o+A]&&(b[q[t[o+A]]++]=A);if(e===s?(T=G=b,x=19):e===d?(T=u,P-=257,G=c,j-=257,x=256):(T=f,G=h,x=-1),z=0,A=0,R=I,_=w,B=F,O=0,y=-1,N=1<<F,S=N-1,e===d&&N>a||e===l&&N>r)return 1;for(var H=0;;){H++,M=R-O,b[A]<x?(C=0,E=b[A]):b[A]>x?(C=G[j+b[A]],E=T[P+b[A]]):(C=96,E=0),v=1<<R-O,k=1<<B,I=k;do k-=v,m[_+(z>>O)+k]=M<<24|C<<16|E|0;while(0!==k);for(v=1<<R-1;z&v;)v>>=1;if(0!==v?(z&=v-1,z+=v):z=0,A++,0===--Z[R]){if(R===L)break;R=t[o+b[A]]}if(R>F&&(z&S)!==y){for(0===O&&(O=F),_+=I,B=R-O,U=1<<B;L>B+O&&(U-=Z[B+O],!(0>=U));)B++,U<<=1;if(N+=1<<B,e===d&&N>a||e===l&&N>r)return 1;y=z&S,m[y]=F<<24|B<<16|_-w|0}}return 0!==z&&(m[_+z]=R-O<<24|64<<16|0),g.bits=F,0}},{"../utils/common":1}],10:[function(e,t,o){"use strict";t.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],11:[function(e,t,o){"use strict";function n(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}t.exports=n},{}],"/lib/inflate.js":[function(e,t,o){"use strict";function n(e,t){var o=new h(t);if(o.push(e,!0),o.err)throw o.msg;return o.result}function i(e,t){return t=t||{},t.raw=!0,n(e,t)}var a=e("./zlib/inflate.js"),r=e("./utils/common"),s=e("./utils/strings"),d=e("./zlib/constants"),l=e("./zlib/messages"),u=e("./zlib/zstream"),c=e("./zlib/gzheader"),f=Object.prototype.toString,h=function(e){this.options=r.assign({chunkSize:16384,windowBits:0,to:""},e||{});var t=this.options;t.raw&&t.windowBits>=0&&t.windowBits<16&&(t.windowBits=-t.windowBits,0===t.windowBits&&(t.windowBits=-15)),!(t.windowBits>=0&&t.windowBits<16)||e&&e.windowBits||(t.windowBits+=32),t.windowBits>15&&t.windowBits<48&&0===(15&t.windowBits)&&(t.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new u,this.strm.avail_out=0;var o=a.inflateInit2(this.strm,t.windowBits);if(o!==d.Z_OK)throw new Error(l[o]);this.header=new c,a.inflateGetHeader(this.strm,this.header)};h.prototype.push=function(e,t){var o,n,i,l,u,c=this.strm,h=this.options.chunkSize;if(this.ended)return!1;n=t===~~t?t:t===!0?d.Z_FINISH:d.Z_NO_FLUSH,"string"==typeof e?c.input=s.binstring2buf(e):"[object ArrayBuffer]"===f.call(e)?c.input=new Uint8Array(e):c.input=e,c.next_in=0,c.avail_in=c.input.length;do{if(0===c.avail_out&&(c.output=new r.Buf8(h),c.next_out=0,c.avail_out=h),o=a.inflate(c,d.Z_NO_FLUSH),o!==d.Z_STREAM_END&&o!==d.Z_OK)return this.onEnd(o),this.ended=!0,!1;c.next_out&&(0===c.avail_out||o===d.Z_STREAM_END||0===c.avail_in&&(n===d.Z_FINISH||n===d.Z_SYNC_FLUSH))&&("string"===this.options.to?(i=s.utf8border(c.output,c.next_out),l=c.next_out-i,u=s.buf2string(c.output,i),c.next_out=l,c.avail_out=h-l,l&&r.arraySet(c.output,c.output,i,l,0),this.onData(u)):this.onData(r.shrinkBuf(c.output,c.next_out)))}while(c.avail_in>0&&o!==d.Z_STREAM_END);return o===d.Z_STREAM_END&&(n=d.Z_FINISH),n===d.Z_FINISH?(o=a.inflateEnd(this.strm),this.onEnd(o),this.ended=!0,o===d.Z_OK):n===d.Z_SYNC_FLUSH?(this.onEnd(d.Z_OK),c.avail_out=0,!0):!0},h.prototype.onData=function(e){this.chunks.push(e)},h.prototype.onEnd=function(e){e===d.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=r.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg},o.Inflate=h,o.inflate=n,o.inflateRaw=i,o.ungzip=n},{"./utils/common":1,"./utils/strings":2,"./zlib/constants":4,"./zlib/gzheader":6,"./zlib/inflate.js":8,"./zlib/messages":10,"./zlib/zstream":11}]},{},[])("/lib/inflate.js")});var browser=function(){var e,t=navigator.userAgent,o=t.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i)||[];return/trident/i.test(o[1])?(e=/\brv[ :]+(\d+)/g.exec(t)||[],"IE "+(e[1]||"")):"Chrome"===o[1]&&(e=t.match(/\bOPR\/(\d+)/),null!=e)?"Opera "+e[1]:(o=o[2]?[o[1],o[2]]:[navigator.appName,navigator.appVersion,"-?"],null!=(e=t.match(/version\/(\d+)/i))&&o.splice(1,1,e[1]),o.join(" "))}(),hasWebGL=function(){if(!window.WebGLRenderingContext)return 0;var e=document.createElement("canvas"),t=e.getContext("webgl");return t||(t=e.getContext("experimental-webgl"))?1:0}(),mobile=function(e){return/(android|bb\d+|meego).+mobile|avantgo|bada\/|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4))}(navigator.userAgent||navigator.vendor||window.opera);Module.compatibilitycheck?Module.compatibilitycheck():CompatibilityCheck();var didShowErrorMessage=!1;"function"!=typeof window.onerror&&(window.onerror=function(e,t,o){return Module.errorhandler&&Module.errorhandler(e,t,o)||(console.log("Invoking error handler due to\n"+e),"function"==typeof dump&&dump("Invoking error handler due to\n"+e),didShowErrorMessage||-1!=e.indexOf("UnknownError")||-1!=e.indexOf("Program terminated with exit(0)"))?void 0:(didShowErrorMessage=!0,-1!=e.indexOf("DISABLE_EXCEPTION_CATCHING")?void alert("An exception has occured, but exception handling has been disabled in this build. If you are the developer of this content, enable exceptions in your project's WebGL player settings to be able to catch the exception or see the stack trace."):-1!=e.indexOf("Cannot enlarge memory arrays")?void alert("Out of memory. If you are the developer of this content, try allocating more memory to your WebGL build in the WebGL player settings."):-1!=e.indexOf("Invalid array buffer length")||-1!=e.indexOf("Invalid typed array length")||-1!=e.indexOf("out of memory")?void alert("The browser could not allocate enough memory for the WebGL content. If you are the developer of this content, try allocating less memory to your WebGL build in the WebGL player settings."):void alert("An error occured running the Unity content on this page. See your browser's JavaScript console for more info. The error was:\n"+e));
}),Module.locateFile=function(e){return Module.dataUrl},Module.preRun=[],Module.postRun=[],Module.print=function(){return function(e){console.log(e)}}(),Module.printErr=function(e){console.error(e)},Module.canvas=document.getElementById("canvas"),Module.progress=null,Module.setStatus=function(e){if(null==this.progress){if("function"!=typeof UnityProgress)return;this.progress=new UnityProgress(canvas)}if(Module.setStatus.last||(Module.setStatus.last={time:Date.now(),text:""}),e!==Module.setStatus.text){this.progress.SetMessage(e);var t=e.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/);t&&this.progress.SetProgress(parseInt(t[2])/parseInt(t[4])),""===e&&this.progress.Clear()}},Module.totalDependencies=0,Module.monitorRunDependencies=function(e){this.totalDependencies=Math.max(this.totalDependencies,e),Module.setStatus(e?"Preparing... ("+(this.totalDependencies-e)+"/"+this.totalDependencies+")":"All downloads complete.")},Module.setStatus("Downloading (0.0/1)");var Module;"undefined"==typeof Module&&(Module=eval("(function() { try { return Module || {} } catch(e) { return {} } })()")),Module.expectedDataFileDownloads||(Module.expectedDataFileDownloads=0,Module.finishedDataFileDownloads=0),Module.expectedDataFileDownloads++,function(){var e=function(e){function t(e){console.error("package error:",e)}function o(){function e(e,t){if(!e)throw t+(new Error).stack}function o(e,t,o,n){this.start=e,this.end=t,this.crunched=o,this.audio=n}function a(e,t){try{var o=p.open(b,g)}catch(n){return t(n)}o.onupgradeneeded=function(e){var t=e.target.result;t.objectStoreNames.contains(k)&&t.deleteObjectStore(k);t.createObjectStore(k);t.objectStoreNames.contains(v)&&t.deleteObjectStore(v);t.createObjectStore(v)},o.onsuccess=function(t){var o=t.target.result;e(o)},o.onerror=function(e){t(e)}}function l(e,t,o,n){var i=e.transaction([v],m),a=i.objectStore(v),r=a.get(t);r.onsuccess=function(e){var t=e.target.result;return o(t?d===t.uuid:!1)},r.onerror=function(e){n(e)}}function u(e,t,o,n){var i=e.transaction([k],m),a=i.objectStore(k),r=a.get(t);r.onsuccess=function(e){var t=e.target.result;o(t)},r.onerror=function(e){n(e)}}function c(e,t,o,n,i,a){var r=e.transaction([k,v],w),s=r.objectStore(k),d=r.objectStore(v),l=s.put(o,t);l.onsuccess=function(e){var r=d.put(n,t);r.onsuccess=function(e){i(o)},r.onerror=function(e){a(e)}},l.onerror=function(e){a(e)}}function f(t){Module.finishedDataFileDownloads++,e(t,"Loading data file failed.");var n=new Uint8Array(t);o.prototype.byteArray=n,o.prototype.requests["/data.unity3d"].onload(),o.prototype.requests["/methods_pointedto_by_uievents.xml"].onload(),o.prototype.requests["/preserved_derived_types.xml"].onload(),o.prototype.requests["/Il2CppData/Metadata/global-metadata.dat"].onload(),o.prototype.requests["/Resources/unity_default_resources"].onload(),o.prototype.requests["/Managed/mono/2.0/machine.config"].onload(),Module.removeRunDependency("datafile_ShootDeploy.data")}function h(e){console.error(e),console.error("falling back to default preload behavior"),fetchRemotePackageWrapper(r,s,f,t)}Module.FS_createPath("/","Il2CppData",!0,!0),Module.FS_createPath("/Il2CppData","Metadata",!0,!0),Module.FS_createPath("/","Resources",!0,!0),Module.FS_createPath("/","Managed",!0,!0),Module.FS_createPath("/Managed","mono",!0,!0),Module.FS_createPath("/Managed/mono","2.0",!0,!0),o.prototype={requests:{},open:function(e,t){this.name=t,this.requests[t]=this,Module.addRunDependency("fp "+this.name)},send:function(){},onload:function(){var e=this.byteArray.subarray(this.start,this.end);this.finish(e)},finish:function(e){var t=this;Module.FS_createPreloadedFile(this.name,null,e,!0,!0,function(){Module.removeRunDependency("fp "+t.name)},function(){t.audio?Module.removeRunDependency("fp "+t.name):Module.printErr("Preloading file "+t.name+" failed")},!1,!0),this.requests[this.name]=null}},new o(0,66071911,0,0).open("GET","/data.unity3d"),new o(66071911,66071932,0,0).open("GET","/methods_pointedto_by_uievents.xml"),new o(66071932,66075811,0,0).open("GET","/preserved_derived_types.xml"),new o(66075811,68356755,0,0).open("GET","/Il2CppData/Metadata/global-metadata.dat"),new o(68356755,69231727,0,0).open("GET","/Resources/unity_default_resources"),new o(69231727,69259352,0,0).open("GET","/Managed/mono/2.0/machine.config");var p=window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB,m="readonly",w="readwrite",b="EM_PRELOAD_CACHE",g=1,v="METADATA",k="PACKAGES";Module.addRunDependency("datafile_ShootDeploy.data"),Module.preloadResults||(Module.preloadResults={}),a(function(e){l(e,n+i,function(t){Module.preloadResults[i]={fromCache:t},t?(console.info("loading "+i+" from cache"),u(e,n+i,f,h)):(console.info("loading "+i+" from remote"),fetchRemotePackageWrapper(r,s,function(t){c(e,n+i,t,{uuid:d},f,function(e){console.error(e),f(t)})},h))},h)},h),Module.setStatus&&Module.setStatus("Downloading...")}var n;if("object"==typeof window)n=window.encodeURIComponent(window.location.pathname.toString().substring(0,window.location.pathname.toString().lastIndexOf("/"))+"/");else{if("undefined"==typeof location)throw"using preloaded data can only be done on a web page or in a web worker";n=encodeURIComponent(location.pathname.toString().substring(0,location.pathname.toString().lastIndexOf("/"))+"/")}var i="ShootDeploy.data",a="ShootDeploy.data";"function"!=typeof Module.locateFilePackage||Module.locateFile||(Module.locateFile=Module.locateFilePackage,Module.printErr("warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)"));var r="function"==typeof Module.locateFile?Module.locateFile(a):(Module.filePackagePrefixURL||"")+a,s=69259352,d="3cda0824-a487-4a9b-961c-bd17ae244ce7";Module.calledRun?o():(Module.preRun||(Module.preRun=[]),Module.preRun.push(o))};e()}();