!function(t){var e={};function i(r){if(e[r])return e[r].exports;var n=e[r]={i:r,l:!1,exports:{}};return t[r].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=e,i.d=function(t,e,r){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(r,n,function(e){return t[e]}.bind(null,n));return r},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){"use strict";i.r(e);var r=i.p+"f9b155a0dd982fd4cc4950a68730a9ca.jpg";function n(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,r)}return i}function s(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var o=document.getElementById("pool-board"),h=o.getContext("2d"),a=document.getElementById("fps"),d=document.getElementById("description"),u=new Image;u.src=r;var y,c=new Date,f={x:0,y:0},x={x:0,y:0},l={x:0,y:0,power:0},p=!1;function b(t,e){return{x:t.x*Math.cos(e)-t.y*Math.sin(e),y:t.x*Math.sin(e)+t.y*Math.cos(e)}}function g(t,e){var i=t.dx-e.dx,r=t.dy-e.dy;if(i*(e.x-t.x)+r*(e.y-t.y)>=0){var n=-Math.atan2(e.y-t.y,e.x-t.x),s=t.mass,o=e.mass,h=b({x:t.dx,y:t.dy},n),a=b({x:e.dx,y:e.dy},n),d={x:h.x*(s-o)/(s+o)+2*a.x*o/(s+o),y:h.y},u={x:a.x*(o-s)/(s+o)+2*h.x*o/(s+o),y:a.y},y=b(d,-n),c=b(u,-n);t.dx=y.x,t.dy=y.y,e.dx=c.x,e.dy=c.y}}function v(t,e){var i=t.x-e.x,r=t.y-e.y;return Math.sqrt(Math.pow(i,2)+Math.pow(r,2))}function m(t,e){this.radius=100,this.x=0,this.y=0,this.draw=function(t){t.beginPath(),t.moveTo(this.x,this.y),t.lineTo(this.radius,this.y),t.arc(this.x,this.y,this.radius,0,Math.PI/2,!1),t.moveTo(this.x,this.y),t.closePath(),t.fillStyle="#000",t.fill()}}function w(t,e,i){this.radius=43,this.x=t,this.y=e,this.dx=0,this.dy=0,this.color=i,this.mass=1,this.draw=function(t){t.beginPath(),t.arc(this.x,this.y,this.radius,0,2*Math.PI,!1),t.fillStyle=this.color,t.fill()},this.update=function(t){this.x+=this.dx,this.y+=this.dy,this.x+this.radius+this.dx>=o.width&&(this.x=o.width-this.radius),this.x-this.radius<=0&&(this.x=this.radius),this.y+this.radius+this.dy>=o.height&&(this.y=o.height-this.radius),this.y-this.radius<=0&&(this.y=this.radius),this.x+this.radius+this.dx>=o.width||this.x-this.radius<=0?this.dx=.7*-this.dx:this.dx*=.99,this.y+this.radius+this.dy>=o.height||this.y-this.radius<=0?this.dy=.7*-this.dy:this.dy*=.99,Math.abs(this.dx)<.1&&Math.abs(this.dy)<.1&&(this.dx=0,this.dy=0);for(var e=0;e<M.length;e++){if(this===M[e]&&this===y)return;v({x:this.x,y:this.y},{x:M[e].x,y:M[e].y})<=this.radius+M[e].radius&&g(this,M[e])}this.draw(t)}}o.width=document.getElementById("container").offsetWidth-150,o.height=document.getElementById("container").offsetHeight-150,addEventListener("mousedown",(function(t){return p=!0,void(f={x:(e=t).x,y:e.y});var e})),addEventListener("mousemove",(function(t){return function(t){if(!p)return;x={x:t.x,y:t.y};var e=v(f,x);if(0===e)return;var i=75*e/(o.width/2),r=i>75?75:i,h=function(t,e,i){var r=t.x-e.x,n=t.y-e.y,s=Math.round(r/i*1e3)/1e3,o=Math.round(n/i*1e3)/1e3;return{x:s,y:o}}(f,x,e);l=function(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?n(Object(i),!0).forEach((function(e){s(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):n(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}({},h,{power:r}),d.innerHTML=Math.ceil(r),d.style.background=function(t){var e=255*t/75,i=255-e;return"rgb(".concat(e,", ").concat(i,", 0)")}(r)}(t)})),addEventListener("mouseup",(function(t){return p=!1,x={x:(e=t).x,y:e.y},y.dx+=l.power*l.x,y.dy+=l.power*l.y,l={x:0,y:0,power:0},void console.log(y.dx,y.dy);var e}));var O,M=new Array;!function(){y=new w(100,o.height/2,"#fff");for(var t=1;t<=15;t++)M.push(new w(100*t,o.height/2,"#f".concat(t,"f")));O=new m}(),function t(e){var i=e-c;c=e,a.innerHTML=Math.floor(1e3/i)+"fps",h.drawImage(u,0,0,o.width,o.height),O.draw(h),y.update(h);for(var r=0;r<M.length;r++)M[r].update(h);requestAnimationFrame(t)}(0)}]);
//# sourceMappingURL=canvas.bundle.js.map