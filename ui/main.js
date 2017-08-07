console.log('Loaded!');

//change the text of 'main text' div
var element=document.getElementById('main text');
element.innerHTML='New Value';

//move image 
var img=document.getElementById('madi');
var marginleft=0;
function moveRight(){
    marginLeft=marginLeft+10;
    img.style.marginLeft=marginLeft+'px';
}
img.onclick=function(){
    var interval=setInterval(moveLeft,100);
  img.style.marginRight='100px';
  
  
};