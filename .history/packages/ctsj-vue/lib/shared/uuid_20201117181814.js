function uuid(){for(var e=[],r="0123456789abcdef",t=0;t<36;t++)e[t]=r.substr(Math.floor(16*Math.random()),1);return e[14]="4",e[19]=r.substr(3&e[19]|8,1),e[8]=e[13]=e[18]=e[23]="-",e.join("")}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=uuid;
//# sourceMappingURL=uuid.js.map
