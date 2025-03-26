/* v 2.40.1
author http://codecanyon.net/user/creativeinteractivemedia/portfolio?ref=creativeinteractivemedia
*/

function isAllWhitespace(e){return!NonWhitespaceRegexp.test(e)}var FLIPBOOK=FLIPBOOK||{};FLIPBOOK.PdfService=function(e,t){function n(e,t){e.htmlContent?t(e):e.getTextContent().then(function(n){e.textContent=n;var a=document.createElement("div"),s=new PDFLinkService;s.setViewer(i.main),s.setDocument(i.pdfDocument);var r=document.createElement("div");new AnnotationLayerBuilder({pageDiv:r,pdfPage:e,linkService:s}).render(e.getViewport(1e3/i.viewports[0].height),"display"),a.appendChild(r),e.htmlContent=a,t(e)})}var i=this;this.main=t,this.pdfDocument=e,this.pages=[],this.viewports=[],this.canvases=[],this.textContents=[],this.pdfPages=[],this.pdfPagesRendered=[],this.pdfAnnotations=[],this.init=function(e){i.getViewport(0,function(t){i.r1=t.width/t.height,1==i.pdfDocument.numPages?(i.double=!1,e.call(i)):i.getViewport(1,function(t){i.r2=t.width/t.height,i.double=i.r2/i.r1>1.5,e.call(i)})})},this.getViewport=function(t,n){i.pages[t]?(i.viewports[t]=i.pages[t].getViewport(1),n.call(i,i.viewports[t])):e.getPage(t+1).then(function(e){i.pages[e.pageIndex]=e,i.getViewport(e.pageIndex,n)})},this.getPage=function(t,n){var i=this,a=i.double?Math.round(t/2)+1:t+1;a>e.pdfInfo.numPages||(i.pages[a]?i.renderPage(i.pages[a],n):e.getPage(t).then(function(e){i.pages[t]=e,i.renderPage(e,n)}))},this.renderPage=function(e,t,i){var a=this;e.canvas=e.canvas||{},e.canvas[t]?i.call(a,e):(e.rendering&&setTimeout(function(){a.renderPage(e,t,i)},300),e.rendering=!0,n(e,function(){var n=e.getViewport(1),s=n.width<=n.height,r=s?t/n.height:t/n.width,o=e.getViewport(r);e.canvas[t]=document.createElement("canvas"),e.canvas[t].width=o.width,e.canvas[t].height=o.height,a.main.webgl&&(s?(e.canvas[t].height=t,e.canvas[t].width=o.width>t?o.width:t,e.canvas[t].scaleX=o.width/t,e.canvas[t].scaleY=1):(e.canvas[t].width=t,e.canvas[t].height=o.height>t?o.height:t,e.canvas[t].scaleY=o.height/t,e.canvas[t].scaleX=1));var d=e.canvas[t].getContext("2d");d.fillStyle="#FFFFFF",d.fillStyle="#000000";var h={canvasContext:d,viewport:o,renderInteractiveForms:!1};e.scale=r,e.canvas[t].ratio=o.width/o.height;e.render(h).then(function(){i&&i.call(a,e)})}))},this.renderPageFromPdf=function(e,t,n){var i=this;if(this.pages[e]){var a=e,s=this.pages[e],r=s.getViewport(1);Math.max(r.width,r.height),r.height;i.pdfPagesRendering&&i.pdfPagesRendering[a]&&i.pdfPagesRendering[a][t]||(i.pdfPagesRendered[a]&&i.pdfPagesRendered[a][t]?i.onPdfPageRendered(a,t,n):(i.pdfPagesRendered[a]||(i.pdfPagesRendered[a]={}),i.pdfPagesRendered[a][t]="rendering",i.pdfPagesRendering=i.pdfPagesRendering||[],i.pdfPagesRendering[a]=i.pdfPagesRendering[a]||[],i.pdfPagesRendering[a][t]=!0,this.renderPage(s,t,function(e){i.pdfPagesRendering[a][t]=!1,i.pdfPagesRendered[a][t]=e,i.onPdfPageRendered(e.pageIndex,t,n)})))}else this.getViewport(e,function(a){i.renderPageFromPdf(e,t,n)})},this.onPdfPageRendered=function(e,n,i){function a(e,n){t.options.rightToLeft&&(n=t.options.pages.length-n-1);var i=t.options.pages[n];i.htmlContentInitialized||(i.htmlContent&&jQuery(e).append(jQuery(i.htmlContent)),i.htmlContentInitialized=!0,i.htmlContent=e)}var s=this,r=s.pdfPagesRendered[e][n];if(r.canvas){var o=r.canvas[n],d=s.pdfPagesRendered[e][n].htmlContent;if(void 0!==o){if("doubleWithCover"==t.options.pageMode)if(0==e)t.options.pages[0].canvas[n]=o,a(d,e),jQuery(t).trigger("pageLoaded",[0,n]);else if(e==t.options.pages.length/2)t.options.pages[t.options.pages.length-1].canvas[n]=o,a(d,s.options.pages.length-1),jQuery(t).trigger("pageLoaded",[t.options.pages.length-1,n]);else{d.style.transformOrigin="0 0";var h=document.createElement("canvas"),g=h.getContext("2d");g.fillStyle="#FFFFFF",h.width=o.width/2,h.height=o.height,t.webgl&&(h.width=n,h.height=n,h.scaleX=o.width/2/n,h.scaleY=o.scaleY),g.drawImage(o,0,0);var c=document.createElement("canvas"),l=c.getContext("2d");l.fillStyle="#FFFFFF",c.width=o.width/2,c.height=o.height,t.webgl&&(c.width=n,c.height=n,c.scaleX=o.width/2/n,c.scaleY=o.scaleY),l.drawImage(o,o.width/2,0,o.width/2,o.height,0,0,o.width/2,o.height),t.options.pages[2*e].canvas=t.options.pages[2*e].canvas||{},t.options.pages[2*e-1].canvas=t.options.pages[2*e-1].canvas||{},t.options.pages[2*e].canvas[n]=c,t.options.pages[2*e-1].canvas[n]=h,a(d,2*e-1),jQuery(t).trigger("pageLoaded",[2*e-1,n]),setTimeout(function(){jQuery(t).trigger("pageLoaded",[2*e,n])},10)}else t.options.pages[e].canvas=t.options.pages[e].canvas||{},t.options.pages[e].canvas[n]=o,a(d,e),jQuery(t).trigger("pageLoaded",[e,n]);t.setLoadingProgress(1),i&&i.call(t)}}},this.getCanvasByHeight=function(e,t,n){},this.getThumb=function(e,t){}};var TEXT_LAYER_RENDER_DELAY=200,MAX_TEXT_DIVS_TO_RENDER=1e5,NonWhitespaceRegexp=/\S/,TextLayerBuilder=function(){function e(e){this.textLayerDiv=e.textLayerDiv,this.renderingDone=!1,this.divContentDone=!1,this.pageIdx=e.pageIndex,this.pageNumber=this.pageIdx+1,this.matches=[],this.viewport=e.viewport,this.textDivs=[],this.findController=e.findController||null,this.textLayerRenderTask=null,this._bindMouse()}return e.prototype={_finishRendering:function(){this.renderingDone=!0;var e=document.createElement("div");e.className="endOfContent",this.textLayerDiv.appendChild(e);var t=document.createEvent("CustomEvent");t.initCustomEvent("textlayerrendered",!0,!0,{pageNumber:this.pageNumber}),this.textLayerDiv.dispatchEvent(t)},render:function(e){if(this.divContentDone&&!this.renderingDone){this.textLayerRenderTask&&(this.textLayerRenderTask.cancel(),this.textLayerRenderTask=null),this.textDivs=[];var t=document.createDocumentFragment();this.textLayerRenderTask=PDFJS.renderTextLayer({textContent:this.textContent,container:t,viewport:this.viewport,textDivs:this.textDivs,timeout:e}),this.textLayerRenderTask.promise.then(function(){this.textLayerDiv.appendChild(t),this._finishRendering(),this.updateMatches()}.bind(this),function(e){})}},setTextContent:function(e){this.textLayerRenderTask&&(this.textLayerRenderTask.cancel(),this.textLayerRenderTask=null),this.textContent=e,this.divContentDone=!0},convertMatches:function(e){for(var t=0,n=0,i=this.textContent.items,a=i.length-1,s=null===this.findController?0:this.findController.state.query.length,r=[],o=0,d=e.length;o<d;o++){for(var h=e[o];t!==a&&h>=n+i[t].str.length;)n+=i[t].str.length,t++;t===i.length&&console.error("Could not find a matching mapping");var g={begin:{divIdx:t,offset:h-n}};for(h+=s;t!==a&&h>n+i[t].str.length;)n+=i[t].str.length,t++;g.end={divIdx:t,offset:h-n},r.push(g)}return r},renderMatches:function(e){function t(e,t){var i=e.divIdx;a[i].textContent="",n(i,0,e.offset,t)}function n(e,t,n,s){var r=a[e],o=i[e].str.substring(t,n),d=document.createTextNode(o);if(s){var h=document.createElement("span");return h.className=s,h.appendChild(d),void r.appendChild(h)}r.appendChild(d)}if(0!==e.length){var i=this.textContent.items,a=this.textDivs,s=null,r=this.pageIdx,o=null!==this.findController&&r===this.findController.selected.pageIdx,d=null===this.findController?-1:this.findController.selected.matchIdx,h={divIdx:-1,offset:void 0},g=d,c=g+1;if(null!==this.findController&&this.findController.state.highlightAll)g=0,c=e.length;else if(!o)return;for(var l=g;l<c;l++){var p=e[l],f=p.begin,u=p.end,v=o&&l===d?" selected":"";if(this.findController&&this.findController.updateMatchPosition(r,l,a,f.divIdx,u.divIdx),s&&f.divIdx===s.divIdx?n(s.divIdx,s.offset,f.offset):(null!==s&&n(s.divIdx,s.offset,h.offset),t(f)),f.divIdx===u.divIdx)n(f.divIdx,f.offset,u.offset,"highlight"+v);else{n(f.divIdx,f.offset,h.offset,"highlight begin"+v);for(var m=f.divIdx+1,x=u.divIdx;m<x;m++)a[m].className="highlight middle"+v;t(u,"highlight end"+v)}s=u}s&&n(s.divIdx,s.offset,h.offset)}},updateMatches:function(){if(this.renderingDone){for(var e=this.matches,t=this.textDivs,n=this.textContent.items,i=-1,a=0,s=e.length;a<s;a++){for(var r=e[a],o=Math.max(i,r.begin.divIdx),d=r.end.divIdx;o<=d;o++){var h=t[o];h.textContent=n[o].str,h.className=""}i=r.end.divIdx+1}null!==this.findController&&this.findController.active&&(this.matches=this.convertMatches(null===this.findController?[]:this.findController.pageMatches[this.pageIdx]||[]),this.renderMatches(this.matches))}},_bindMouse:function(){var e=this.textLayerDiv;e.addEventListener("mousedown",function(t){var n=e.querySelector(".endOfContent");if(n){var i=t.target!==e;if(i=i&&"none"!==window.getComputedStyle(n).getPropertyValue("-moz-user-select")){var a=e.getBoundingClientRect(),s=Math.max(0,(t.pageY-a.top)/a.height);n.style.top=(100*s).toFixed(2)+"%"}n.classList.add("active")}}),e.addEventListener("mouseup",function(t){var n=e.querySelector(".endOfContent");n&&(n.style.top="",n.classList.remove("active"))})}},e}(),AnnotationLayerBuilder=function(){function e(e){this.pageDiv=e.pageDiv,this.pdfPage=e.pdfPage,this.linkService=e.linkService,this.div=null}return e.prototype={render:function(e,t){var n=this,i={intent:void 0===t?"display":t};this.pdfPage.getAnnotations(i).then(function(t){if(e=e.clone({dontFlip:!0}),i={viewport:e,div:n.div,annotations:t,page:n.pdfPage,linkService:n.linkService},n.div)PDFJS.AnnotationLayer.update(i);else{if(0===t.length)return;n.div=document.createElement("div"),n.div.className="flipbook-annotationLayer",n.pageDiv.appendChild(n.div),i.div=n.div,PDFJS.AnnotationLayer.render(i),"undefined"!=typeof mozL10n&&mozL10n.translate(n.div)}})},hide:function(){this.div&&this.div.setAttribute("hidden","true")}},e}(),PDFLinkService=function(){function e(){this.baseUrl=null,this.pdfDocument=null,this.pdfViewer=null,this.pdfHistory=null,this._pagesRefCache=null}return e.prototype={setDocument:function(e,t){this.baseUrl=t,this.pdfDocument=e,this._pagesRefCache=Object.create(null)},setViewer:function(e){this.pdfViewer=e},setHistory:function(e){this.pdfHistory=e},get pagesCount(){return this.pdfDocument.numPages},get page(){return this.pdfViewer.currentPageNumber},set page(e){this.pdfViewer.currentPageNumber=e},navigateTo:function(e){var t,n="",i=this,a=function(t){var s=t instanceof Object?i._pagesRefCache[t.num+" "+t.gen+" R"]:t+1;s?(s>i.pagesCount&&(s=i.pagesCount),i.pdfViewer.scrollPageIntoView(s,e),i.pdfHistory&&i.pdfHistory.push({dest:e,hash:n,page:s})):i.pdfDocument.getPageIndex(t).then(function(e){var n=e+1,s=t.num+" "+t.gen+" R";i._pagesRefCache[s]=n,a(t)})};"string"==typeof e?(n=e,t=this.pdfDocument.getDestination(e)):t=Promise.resolve(e),t.then(function(t){e=t,t instanceof Array&&a(t[0])})},getDestinationHash:function(e){if("string"==typeof e)return this.getAnchorUrl("#"+escape(e));if(e instanceof Array){var t=e[0],n=t instanceof Object?this._pagesRefCache[t.num+" "+t.gen+" R"]:t+1;if(n){var i=this.getAnchorUrl("#page="+n),a=e[1];if("object"==typeof a&&"name"in a&&"XYZ"===a.name){var s=e[4]||this.pdfViewer.currentScaleValue,r=parseFloat(s);r&&(s=100*r),i+="&zoom="+s,(e[2]||e[3])&&(i+=","+(e[2]||0)+","+(e[3]||0))}return i}}return this.getAnchorUrl("")},getAnchorUrl:function(e){return(this.baseUrl||"")+e},setHash:function(e){if(e.indexOf("=")>=0){var t=parseQueryString(e);if("nameddest"in t)return this.pdfHistory&&this.pdfHistory.updateNextHashParam(t.nameddest),void this.navigateTo(t.nameddest);var n,i;if("page"in t&&(n=0|t.page||1),"zoom"in t){var a=t.zoom.split(","),s=a[0],r=parseFloat(s);-1===s.indexOf("Fit")?i=[null,{name:"XYZ"},a.length>1?0|a[1]:null,a.length>2?0|a[2]:null,r?r/100:s]:"Fit"===s||"FitB"===s?i=[null,{name:s}]:"FitH"===s||"FitBH"===s||"FitV"===s||"FitBV"===s?i=[null,{name:s},a.length>1?0|a[1]:null]:"FitR"===s?5!==a.length?console.error("PDFLinkService_setHash: Not enough parameters for 'FitR'."):i=[null,{name:s},0|a[1],0|a[2],0|a[3],0|a[4]]:console.error("PDFLinkService_setHash: '"+s+"' is not a valid zoom value.")}if(i?this.pdfViewer.scrollPageIntoView(n||this.page,i):n&&(this.page=n),"pagemode"in t){var o=document.createEvent("CustomEvent");o.initCustomEvent("pagemode",!0,!0,{mode:t.pagemode}),this.pdfViewer.container.dispatchEvent(o)}}else/^\d+$/.test(e)?this.page=e:(this.pdfHistory&&this.pdfHistory.updateNextHashParam(unescape(e)),this.navigateTo(unescape(e)))},executeNamedAction:function(e){switch(e){case"GoBack":this.pdfHistory&&this.pdfHistory.back();break;case"GoForward":this.pdfHistory&&this.pdfHistory.forward();break;case"NextPage":this.page++;break;case"PrevPage":this.page--;break;case"LastPage":this.page=this.pagesCount;break;case"FirstPage":this.page=1}var t=document.createEvent("CustomEvent");t.initCustomEvent("namedaction",!0,!0,{action:e}),this.pdfViewer.container.dispatchEvent(t)},cachePageRef:function(e,t){var n=t.num+" "+t.gen+" R";this._pagesRefCache[n]=e}},e}();