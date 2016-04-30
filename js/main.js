window.onload=function(){
	var _leftBtn=document.getElementById("slide-left-btn");
    var _rightBtn=document.getElementById("slide-right-btn");
    var _slideImageBox=document.getElementById("slide-image-box-id");
    var _slideStatusUl=document.getElementById("slide-status-ul-id");
    var _slideImageBoxChildren=_slideImageBox.children;
    var _slideStatusUlChildren=_slideStatusUl.children;

   
   //_c当前已经有的类名，_k要判断的类名
    function hasClassName(_c,_k){
    	return _c.className.indexOf(_k)<0?false:true;
    }
 var delClassName=function(_c,_k){
        _c.className= _c.className.replace(_k,"");
    }

    var addClassName=function(_c,_k){
        _c.className= _c.className+" "+_k;
    }
    //
    var switchDisplay=function(_children,_className,_flag){
    	var _current=0;
	    for(var i=0;i<_children.length;i++){

	    	if(hasClassName(_children[i],_className)){
                _current=i;
            }
	    }
	    delClassName(_children[_current],_className);

        if(_flag==0){
        	if(_current==0){
	            addClassName(_children[_children.length-1],_className);
	        }else{
	            addClassName(_children[_current-1],_className);
	        }
        }else{
	        if(_current==_children.length-1){
		        addClassName(_children[0],_className);
		    }else{ 
		        addClassName(_children[_current+1],_className);
		    }
        }
    }
     
    function leftClickCallBack(){
	    switchDisplay(_slideImageBoxChildren,"slide-show",0);
	    switchDisplay(_slideStatusUlChildren,"current",0);	    
   }

	_leftBtn.addEventListener("click",leftClickCallBack);

    function rightClickCallBack(){
	    switchDisplay(_slideImageBoxChildren,"slide-show",1);
	    switchDisplay(_slideStatusUlChildren,"current",1);	
   }

	_rightBtn.addEventListener("click",rightClickCallBack);

    for(var j=0;j<_slideStatusUlChildren.length;j++){

    	_slideStatusUlChildren[j].addEventListener("click",function(){

    		for(var i=0;i<_slideStatusUlChildren.length;i++){
    			delClassName(_slideStatusUlChildren[i],"current");
    		}
    		addClassName(this,"current");

    		var _current=0;
		    for(var i=0;i<_slideStatusUlChildren.length;i++){
		    	if(hasClassName(_slideStatusUlChildren[i],"current")){
	                _current=i;
	            }
		    }
		    for(var i=0;i<_slideImageBoxChildren.length;i++){
    			delClassName(_slideImageBoxChildren[i],"slide-show");
    		}
    		addClassName(_slideImageBoxChildren[_current],"slide-show");

    	})
    }

   window._cycleSlide = setInterval(rightClickCallBack,2000);
   function hoverNoCycle(_element){
	   	_element.addEventListener("mouseover",function(){
	   		clearInterval(_cycleSlide);
	   });
	   _element.addEventListener("mouseout",function(){
	   		window._cycleSlide = setInterval(rightClickCallBack,2000);
	   });
   }
   hoverNoCycle(_leftBtn);
   hoverNoCycle(_rightBtn);
   for(var j=0;j<_slideStatusUlChildren.length;j++){
	  hoverNoCycle(_slideStatusUlChildren[j]);
	}	
}

