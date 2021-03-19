class DragDrop{

    constructor(options={}){
       this.dragedElement=null;
       this.dragedElementHeight=null;
       this.elementHovered=null;
       this.options=Object.assign({},{
           simpleList: true ,
           swap:false,
           sortable: false

       },options)
       document.addEventListener("mousedown",(e)=>{
            let t= e.target;
                if(d.enableDrag(t)){
                         t.addEventListener("dragstart",(e)=>{
                             d.onDragStart(e)
                         })
                }
           })
           document.addEventListener("mouseup",(e)=>{
            let t= e.target;
            d.disableDrag(t)
          })
          document.addEventListener("dragover",(e)=>{
            e.preventDefault()
            d.onDragOver(e)
          })
          document.addEventListener("drop",(e)=>{
            e.preventDefault()
            d.onDrop(e)
          })
       
   }
     
    onDragStart(e){
        if(e.target.className.indexOf("js-draggable-fan")!=-1){
         this.originX=e.clientX;
         this.originY=e.clientY;
         this.dragedElement=e.target;
         this.dragedElementHeight=this.dragedElement.offsetHeight;
         
         this.dragedElement.classList.add("rotate")
         e.dataTransfer.setData("text/plain",e.target.textContent)
         e.dataTransfer.effectAllowed="move";
        }
    } 

    onDragOver(e){
        if(e.target.className.indexOf("js-draggable-fan")!=-1){
            this.elementHovered=e.target;
            this.y=e.clientY
            this.x=e.clientX
            if(this.y>this.originY){
                setTimeout(()=>{
                    e.target.parentNode.insertBefore(this.elementHovered,this.dragedElement)
                    this.elementHovered.classList.add("rotate") 
                },4)
                
            }else if(this.y <this.originY){
                setTimeout(()=>{
                    e.target.parentNode.insertBefore(this.dragedElement,this.elementHovered)
                    this.elementHovered.classList.add("rotate") 
                    
                },4)
                
            }
            
        }else if(e.target.className.indexOf("js-dropper-fan")!=-1){
            this.y=e.clientY
            this.x=e.clientX
            
        }
    }
    
    onDragEnd(){
        setTimeout(()=>{
            this.elementHovered.classList.remove("rotate") 
            this.dragedElement.classList.remove("rotate")
        },50)
        
    }
    onDrop(e){
        if(e.target.className.indexOf("js-dropper-fan")!=-1){
            let target=e.target
            let clonedNode=this.dragedElement.cloneNode(true);
            clonedNode=target.appendChild(clonedNode);
            this.dragedElement.parentNode.removeChild(this.dragedElement);
           
        }
    }

    enableDrag(element){
        if(element.className.indexOf("js-draggable-fan")!=-1){
            return element.draggable=true;
        }
        return false;
    }

    disableDrag(element){
        if(element.className.indexOf("js-draggable-fan")!=-1){
            return element.draggable=false;
        }
        return true;
    }

  
}

class InteractiveDrag{

    /**
     * 
     * @param {node} element- the element on apply drag and drop
     * @param {Object} options  
     */
    constructor(element,options={}){
        this.options=Object.assign({},
            {
             collision:false,
             collision_stop_move:false,
             style_on_collide:{
                   color:"white",
                   border_width:"thick",
                   border_color:"blue",
                   border_style:"dotted",
             }
            },options)
        this.element=element
        this.collide=false
        this.initPositions={
            x:0,
            y:0
        }

        this.currentPositions={
            x:0,
            y:0
        }
        
        this.finalPositions={
            x:0,
            y:0
        }
        this.startDrag=false
        this.element.addEventListener("dragstart",()=>{e.preventDefault()})
        if(this.options.collision_stop_move){
            this.element.addEventListener("click",this.resetPosition.bind(this))
        }
        this.element.addEventListener("mousedown",this.onDragStart.bind(this))
        
        document.addEventListener("mousemove",this.onDrag.bind(this))
        document.addEventListener("mouseup",this.onDragEnd.bind(this))
        this.xVelocityDisplay = document.querySelector('h3');
        setInterval(()=>{
            this.updateVelocityDisplay();
            
          }, 100);
        this.update()
        
    }
    resetPosition(e){
        if(this.collide){
            this.collide=false
            this.element2.style.background="grey"
            //left_collision
            if(this.box1_x<this.box2_x){
                this.currentPositions={
                    x:this.box2_x-this.box1_w,
                    y:this.box1_y
                }
            }
            //right_collision
            if(this.box1_x>this.box2_x){
                this.currentPositions={
                    x:this.box1_x+this.box1_w,
                    y:this.box1_y
                }
            }
            //top_collision
            if(this.box1_y<this.box2_y ){
                this.currentPositions={
                    x:this.box1_x,
                    y:this.box1_y-this.box1_h
                }
            }
            //botom collision
            if(this.box1_y> this.box2_y){
                this.currentPositions={
                    x:this.box1_x,
                    y:this.box1_y+this.box1_h
                }
            }
            
        }
    }
    onDragStart(e){
         this.initPositions={
              x:e.clientX,
              y:e.clientY
         }
         this.startDrag=true;
      
         
    }
    onDrag(e){
        if(this.startDrag){
            this.currentPositions={
                x:e.clientX,
                y:e.clientY
            }
            if(this.options.collision){
                this.collision()
            }
        }
        
    }
    onDragEnd(e){
        this.finalPositions={
              x:e.clientX,
              y:e.clientY
        }
        this.startDrag=false
        
    }

    /**
     * 
     * @param {float} initX 
     * @param {float} finalX 
     * @return velocity of translated element
     */
    velocity(init,final){
      
        return ((final-init))
    }


    sigmoide(x){
       return x/(1+Math.abs(x));
    }

    updateVelocityDisplay(){
        this.xVelocityDisplay.innerHTML = 'x velocity = ' + this.xVelocity + ' pixels/60frames';
    }
    update(){
       this.element.style.transition=""
        let rotation=0;
        this.xVelocity=this.velocity(this.initPositions.x,this.currentPositions.x)
        
        rotation=rotation+(this.sigmoide(this.xVelocity)*25)
        
        if(this.collide){
            
            //this.element.style.top=this.box1_y+"px";
            //this.element.style.left=(this.box2_x-this.box1_w)+"px";

            this.element.style.top="fixed";
            this.element.style.left="fixed";
            
        }else{
            this.initPositions.x=this.currentPositions.x
            this.initPositions.y=this.currentPositions.y
            this.element.style.top=(this.initPositions.y)+"px"
            // Soustraire (Largeur de la carte / 2 = 125) pour centrer le curseur sur le dessus 
            let hw=this.element.offsetWidth/2
            this.element.style.left=(this.initPositions.x-hw)+"px"
            this.element.style.transform="rotate("+rotation+"deg)"
        }
     
        requestAnimationFrame(this.update.bind(this))
    }

    collision(){
       
        try{
            this.element2=document.querySelector("#card2");
            let box2=this.element2.getBoundingClientRect();
            
            let box1=this.element.getBoundingClientRect()
            
            this.box1_y=box1.y;
            this.box1_x=box1.x;
            this.box1_w=box1.width;
            this.box1_h=box1.height;
    
            this.box2_y=box2.y
            this.box2_x=box2.x
            this.box2_w=box2.width
            this.box2_h=box2.height
           
            if((this.box1_x+this.box1_w>=this.box2_x) && 
               (this.box1_x <= this.box2_x+this.box2_w)&&
               (this.box1_y+this.box1_h>=this.box2_y)&&
               (this.box1_y<this.box2_y+this.box2_h)
            ){
                if(this.options.collision_stop_move){
                    this.collide=true
                }
               
                this.element2.style.background=this.options.style_on_collide.color;
                 this.element2.style.border=`${this.options.style_on_collide.border_width} 
                                        ${this.options.style_on_collide.border_style} 
                                        ${this.options.style_on_collide.border_color}`;
                
            }else{
                this.collide=false
                this.element2.style.background="grey"
                this.element2.style.border="none"
            }
            
            
        }catch{

        }
        
    }

}