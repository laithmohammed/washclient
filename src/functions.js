const Functions = {
    getCookie   : function(cname){
                    var name = cname + "=";
                    var decodedCookie = decodeURIComponent(window.document.cookie);
                    var ca = decodedCookie.split(';');
                    for(var i = 0; i <ca.length; i++) {
                      var c = ca[i];
                      while (c.charAt(0) === ' ') { c = c.substring(1); }
                      if (c.indexOf(name) === 0) { return c.substring(name.length, c.length); }
                    }
                    return "";
                  }
    ,
    setCookie   : function(cname, cvalue = 'logout', exdays = 365) {
                    var d = new Date();
                    d.setTime(d.getTime() + (exdays*24*60*60*1000));
                    var expires = "expires="+ d.toUTCString();
                    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
                  }
    ,
    onMove      : function(element){
                    var pos2 = 0, pos4 = 0;
                    element.onmousedown = setLoc;
                    element.ontouchstart = setLoc;        
                    function setLoc(e){
                      pos4 = e.clientY;
                      document.onmouseup = stopDragMouse;
                      document.onmousemove = startDragMouse;
                      document.ontouchend = stopDragTouch;
                      document.ontouchmove = startDragTouch;
                    }
                    function startDragMouse(e){
                      pos2 = pos4 - e.clientY;
                      pos4 = e.clientY;
                      element.style.top = (element.offsetTop - pos2) + "px";
                    }
                    function startDragTouch(e){
                      pos2 = pos4 - Math.floor(e.touches[0].clientY);
                      pos4 = Math.floor(e.touches[0].clientY);
                      element.style.top = (element.offsetTop - pos2) + "px";
                    }
                    function stopDragMouse(e){
                      document.onmouseup = null;
                      document.onmousemove = null;
                    }
                    function stopDragTouch(e){
                      document.ontouchend = null;
                      document.ontouchmove = null;
                    }
                  }
}
export default Functions;