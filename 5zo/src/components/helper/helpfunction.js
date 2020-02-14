

export prettyDate = (time) =>{

    var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ").split(".")[0]),
  
    diff = (((new Date()).getTime() - date.getTime()) / 1000);
  
    
  
    diff = diff - 33000;
  
    if(diff < 0) diff = 0;
  
    day_diff = Math.floor(diff / 86400);
  
    
  
    if ( isNaN(day_diff) || day_diff < 0 ){
  
     return;
  }
      
  
    return day_diff == 0 && (
  
      diff < 60 && "방금전" ||
  
      diff < 120 && "1분전" ||
  
      diff < 3600 && Math.floor( diff / 60 ) + " 분전" ||
  
      diff < 7200 && "1 시간전" ||
  
      diff < 86400 && Math.floor( diff / 3600 ) + " 시간전") ||
  
     day_diff == 1 && "어제" ||
  
     day_diff < 7 && day_diff + " 일전" ||
  
     day_diff < 31 && Math.floor( day_diff / 7 ) + " 주전" ||
  
     day_diff < 360 && Math.floor( day_diff / 30 ) + " 개월 전" ||
  
     day_diff >= 360 && (Math.floor( day_diff / 360 )==0?1:Math.floor( day_diff / 360 )) + " 년 전"
  
   }