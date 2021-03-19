GSDrag
================================
GSDrag help you to make cool drag and drop movement

## Table of Contents

1.  [Introduction](#Introduction)  
2.  [How to use it](#How-to-use-it) 
3.  [Settings](#Settings)

## Introduction
GSDrag has two Class that will give you 2 different approaches to drag and drop.  
The first class uses the native javascript Object drag and drop, but for my part I found that the approach that JavaScript offers with these Objects is a bit cumbersome, because we have to call several events to take load the drag and drop.      
the second class uses simple translation to perform the drag and drop without going through several evement and the movement is more fluid.

## How to use it

Add GSDrag in your view file

```html
  <script src="GSDrag.js" type="text/javascript" defer> </script>
```

Initialize GSDrag in your script file or an inline script tag like this

```javascript
   //if you want use native drag and drop
   let dragDrop=new dragAndDrop()

   //or else if you want use interactive drag drop
   /* */
   let interactDrag=new InteractiveDrag(document.querySelector("#card"),{
    collision:true,
    collision_stop_move:false,
    style_on_collide:{
         color:"the_color_you_want",
         border_width:"the_border_width_you_want",
         border_color:"the_color_you_want",
         border_style:"the_border_style_you_want"
    }})
```
when complete , your HTML shoold look something like
```html
   <!DOCTYPE html>
<html>
  <head></head>
  <body>
   <!--your div content--> 
      <script src="DragDrop.js"  type="text/javascript" ></script>
      <script src="your_script.js" type="text/javascript" ></script>
  </body>
```
## Settings
Setting is only available for interactive drag and drop
Options | Type | Default Values | Description
--------|------|---------|------------
collision|boolean|true| the collision parameter to true allows the document to detect the collision between the different html elements of the document
collision_stop_move|boolean|false|the parameter collision stop move to true (collision must be true) prevents an element that collides with another element in advance when these two elements come into contact
style_on_collide| Object|color (type string) border_width(type string)border_color(type string) border_style(type string)|sets the element color, border style, border color and border size of the element that gets hit by another element
                       
**Note :**remarque: pour interactive drag and drop les elements dont on veut appliquer le drag and drop doit être en position absolut
