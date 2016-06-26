# WoofJS - *JavaScript Unleashed*

WoofJS is a JavaScript framework for making web and mobile games and animations.

It was originally inspired by Scratch and can help ease the trasition to JavaScript.

WoofJS is developed with :heart: by [The Coding Space](http://thecodingspace.com).

## Getting Started

We reccomend you clone this JSBin to get started: [https://jsbin.com/lekovu/edit?js,output](https://jsbin.com/lekovu/edit?js,output)

Alternatively, you can:

1) Put Woof between the `<head>` tags.
```html
<script src="https://cdn.rawgit.com/stevekrouse/WoofJS/15baee99d6b03db4d37320b21c84b3d3442fb7a4/woof.js"></script>
```
2) Throw in some JavaScript, and tell Woof to fetch it.
```javascript
addDebug("mouseX", () => mouseX);
addDebug("mouseY", () => mouseY);

setBackdropURL("https://i.imgur.com/lyyFGm4.jpg");

// Add an image via a url
var dawg = addImage({url: "http://i.imgur.com/SMJjVCL.png", x: 0, y: 0, imageHeight: 100, imageWidth: 135});

// Make it move with the arrow keys by checking which keys are down
forever(() => {
  if (keysDown.includes("LEFT")){
    dawg.x -= 5;  // move left by 5
  }
  if (keysDown.includes("RIGHT")){
    dawg.x +=5; 
  }
  if (keysDown.includes("UP")){
    dawg.y += 5; 
  }
  if (keysDown.includes("DOWN")){
    dawg.y -= 5; 
  }
});

var timer = 20;  // make the timer start at 20
var timerText = addText({x: 0, y: maxY - 20, size: 20, color: "white", text: () => `Time Left: ${timer}`}); // add text that diplays the timer (dynamicText updates automatically)
every(1, "second", () => {
  if (timer === 0){ freeze(); } // freeze the screen when the timer reaches 0
  timer--;   // make the timer go down every second
});
```

### Setting the Backdrop

  - Set the backdrop to an image URL (we strongly reccomend using imgur and https for all images): 
  

```javascript
setBackdropURL("http://example.com/img.jpg");
```

  - Set the backdrop to a color: 

```javascript
setBackdropColor("blue");
```

  - Set the backdrop size:

```javascript
fullScreen = false;
var width = 300;
var height = 400;
setBackdropSize(width, height);
```
  
### Sensing
  
  - Mouse X: `mouseX`
  - Mouse Y: `mouseY`
  - Previous mouse X: `pMouseX`
  - Previous mouse Y: `pMouseY`
  - Mouse X speed: `mouseXSpeed`
  - Mouse Y speed: `mouseYSpeed`
  - Mouse down?: `mouseDown`
  - List of keys currently pressed: `keysDown`
  - Is 'A' pressed?: `keysDown.includes('A')`
  - Is the space key pressed?: `keysDown.includes(' ')`
  - Is the up key pressed?: `keysDown.includes('UP')`
  - Right edge of the screen: `maxX`
  - Left edge of the screen: `minX`
  - Top edge of the screen: `maxY`
  - Bottom edge of the screen: `minY`
  - Random X value on the screen between `minX` and `maxX`: `randomX()`
  - Random Y value on the screen between `minY` and `maxY`: `randomY()`
  - Width of the screen: `width`
  - Height of the screen: `height`


### Debugging
 
  - Adding an expression to the bottom-left corner of the screen: `addDebug("mouseX");`
  - Setting the color of the debug expressions: `debugColor = "white";`

  
### Responding to Events

- Do something on-click once: `onClick((mouseX, mouseY) => { ... });`

  
### Stopping Everything

To freeze everything on the screen:


```javascript
freeze();
```

To defrost the screen and let things move again:

```javascript
defrost();
```

## Woof Objects (Images, Text, Rectangles, and Circles)

When creating a new Image, Text, Rectangle or Circle, you may use the following parameters:

```javascript
  var IMAGE_NAME = addImage({x: 0, y: 0, angle: 0, rotationStyle: "ROTATE", showing: true});
  var TEXT_NAME = addText({x: 0, y: 0, angle: 0, rotationStyle: "ROTATE", showing: true});
  var CIRCLE_NAME = addCircle({x: 0, y: 0, angle: 0, rotationStyle: "ROTATE", showing: true});
  var RECTANGLE_NAME = addRectangle({x: 0, y: 0, angle: 0, rotationStyle: "ROTATE", showing: true});
```

### Detecting

  - Get the x-position: `NAME.x`
  - Get the y-position: `NAME.y`
  - Get the angle: `NAME.angle`
  - Get the width: `NAME.width()`
  - Get the height: `NAME.height()`
  - Touching another thing?: `if (NAME.touching(OTHER_NAME)) { ... }`
  - Mouse over?: `if (NAME.mouseOver()) { ... }`
  - Clicking and holding?: `if (NAME.mouseDown()) { ... }`
  - Get the distance between two things: `NAME.distanceTo(OTHER_NAME);`
  - Get the distance to an X,Y: `NAME.distanceTo(X, Y);`

### Motion

  - Set the X position: `NAME.x = 200;`
  - Change the Y position: `NAME.y += 10;`
  - Set the angle: `NAME.angle = 30;`
  - Set the angle using direction: `NAME.angle = LEFT;` 
  - Turn left: `NAME.turnLeft(10);`
  - Turn right: `NAME.turnRight(10);`
  - Don't rotate the sprites costume when the angle changes: `NAME.setRotationStyle("NO ROTATE");`
  - Rotate left to right when it points in a direction and moves `NAME.setRotationStyle("ROTATE LEFT RIGHT");`
  - Move in the direction of the angle: `NAME.move(10);`
  - Point towards an X,Y : `NAME.pointTowards(mouseX, mouseY)`

### Looks

  - Hide: `NAME.showing = false;`
  - Show: `NAME.showing = true;`
  - Send to the back layer: `NAME.sendToBack();`
  - Send to the front layer: `NAME.sendToFront();`

  
### Pen 


  - Draw a line behind a sprite: `NAME.penDown = true;`
  - Stop drawing a line behind a sprite: `NAME.penDown = false;`
  - Set pen color: `NAME.penColor = "blue";`
  - Set pen width: `NAME.penWidth = 10;`
  - Clear all of the pen paths on the screen: `clearPen();`


### Control

  - Delete: `NAME.delete();`
  

### Events 

  - Do something on click: `NAME.onClick((mouseX, mouseY) => { ... });`


### Image
In addition to the default parameters (`x`, `y`, `angle`, `rotationStyle`, and `showing`), you may use these parameters to create a new image: 

```javascript 
var IMAGE_NAME = addImage({url: "http://www.loveyourdog.com/image3.gif", imageWidth: 30, imageHeight: 30});
```
  - Change the image (we strongly reccomend using imgur and https for all images): `IMAGE_NAME.setImageURL("http://www.urdu-english.com/images/lessons/beginner/shapes/shapes-pics/rectangle.png");`
  - Set the width: `IMAGE_NAME.imageWidth = 10;`
  - Set the height `IMAGE_NAME.imageHeight = 20;`

### Circle
In addition to the default parameters (`x`, `y`, `angle`, `rotationStyle`, and `showing`), you may use these parameters to create a new circle:

```javascript
var CIRCLE_NAME = addCircle({radius: 10, color: "black"});
```
  - Change the radius: `CIRCLE_NAME.radius = 15;`
  - Change the color: `CIRCLE_NAME.color = "blue";`

## Rectangle

In addition to the default parameters (`x`, `y`, `angle`, `rotationStyle`, and `showing`), you may use these parameters to create a new rectangle: 

```javascript
var RECTANGLE_NAME = addRectangle({rectangleHeight: 10, rectangleWidth: 20, color: "pink"});
```
  - Change the width: `RECTANGLE_NAME.rectangleWidth = 20;`
  - Change the height: `RECTANGLE_NAME.rectangleHeight = 45;`
  - Change the color: `RECTANGLE_NAME.color = "purple";`
  

## Line

In addition to the default parameters (`angle`, `rotationStyle`, and `showing`), you may use these parameters to create a new line between (`x`,`y`) and (`x1`, `y1`): 

```javascript
var LINE_NAME = addLine({x: -100, y: 100, x1: 10, y1: 20, color: "pink", lineWidth: 10});
```
  - Change the x startpoint: `LINE_NAME.x = -100;`
  - Change the y startpoint: `LINE_NAME.y = 100;`
  - Change the x endpoint: `LINE_NAME.x1 = 10;`
  - Change the y endpoint: `LINE_NAME.y1 = 20;`
  - Change the width: `LINE_NAME.lineWidth = 5;`
  - Change the color: `LINE_NAME.color = "purple";`

### Text

In addition to the default parameters (`x`, `y`, `angle`, `rotationStyle`, and `showing`), you may use these parameters to create new text: 

```javascript 
var TEXT_NAME = addText({text: "Text", dynamicText: "'mouseX: ' + mouseX", size: 12, color: "black", fontFamily: "arial", textAlign: "center"});
```
  - Set the text value to an unchanging value: `TEXT_NAME.text = "Sample Text";`
  - Set the text value to an changing functional expression: `TEXT_NAME.dynamicText = () => ``Variable Name: + ${variableName};```
  - Set the font size: `TEXT_NAME.size = 20;`
  - Set the font color: `TEXT_NAME.color = "white";`
  - Set the font color to a hex value: `TEXT_NAME.color = "#32CD32";`
  - Set the font family: `TEXT_NAME.fontFamily = "arial";`
  

### Clones

If you want to make many objects that look and act very similar to each other:

```javascript
// create a list to store all of the clones
var clones = [];
every(4, "seconds", () => {
  // create a clone every 4 seconds
  var clone = addCircle ({radius: 10, color: "pink", x: randomX(), y: randomY()});
  // add each clone to the list
  clones.push(clone);
});

forever(() => { 
  // forever, for each clone in clones
  clones.forEach(clone => {
    // move it to the right
    clone.x++; 
    // delete it if it goes off the screen
    if (clone.x > maxX) {
      clone.delete(); 
    }
  })
});
```

## Variables

Like in Scratch, there are 4 ways to interact with variables in JavaScript:

1. Creating a variable, and giving it a name:

```javascript
var sampleVariable;
```
2. Setting the variable to a value:

```javascript
sampleVariable = 1;
```
3. Changing the variable:

```javascript
sampleVariable = sampleVariable + 1;
```
4. Using the variable as a value:

```javascript
if (sampleVariable > 1) {
  doSomething();
}
```

We can also combine step 1, defining the variable, and 2, setting the variable, like so:

```javascript
var sampleVariable = 1;
```

We can also shorten step 3, changing the variable:

```javascript
sampleVariable += 1;
```

Or if we only want to add 1 to our variable, we could shorten it even further:

```javascript
sampleVariable++;
```

In JavaScipt, *any* value can be assigned to a variable, including a number, string, list, object, or funciton.

## Arrays (Lists)

Like in Scratch, there are a few basic ways to interact with an array:

1. Creating a array, and giving it a name:

```javascript
var sampleArray = [];
```
2. Adding things to the array:

```javascript
sampleArray.push(1);
```
3. Remove the first two items from an array:

```javascript
sampleArray = ['a', 'b', 'c', 'd']
sampleArray.splice(0, 2)
```
4. Check if an item is in an array:

```javascript
sampleArray.includes('a')
```
4. Check if an item is in an array:

```javascript
sampleArray.includes('a')
```
5. Print each thing in an array:

```javascript
sampleArray.forEach(thing => console.log(thing))
```
6. Check if a condition holds for at least one thing in an array:

```javascript
if (sampleArray.some(thing => thing.over(mouseX, mouseY))) {
  doSomething();
}
```
7. Check if a condition holds for at every thing in an array:

```javascript
if (sampleArray.every(thing => thing.touching(sprite1))) {
  doSomething();
}
```


## Functions (custom blocks)

You can create a function with a name:

```javascript
var namedFunction = (input1, input2) => { 
  // do stuff here with input1 and input2
}
```

You can run a function by putting parenthesis next to its name:

```javascript
namedFunction(1, 2)
```

But you can also create a function without a name, which is called an anonymous function:

```javascript
forever(() => {
  sprite.x++;
})
```


## Helper Functions

1) Get a random integer between any two numbers

```javascript
var number = randomInt(10, 20);
```

2) Random color: `randomColor()`

3) Get a random integer between any two numbers: `randomInt(10, 20);`

4) Get the current hour: `hour();`

5) Get the current hour in military time: `hourMilitary();`

6) Get the current minute: `minute();`

7) Get the current second: `second();`

8) Get the current day of the month (1-31): `dayOfMonth();`

9) Get the current day of the week (Monday-Sunday): `dayOfWeek();`



### Control Flow

There are two types of commands in JavaScript:

1) **Synchronous**: "Do this immediately and move on when it's done."

*Synchronous example in real life*: Open heart surgery. When a doctor begins open heart surery on a patient, she stays in the operating room with the patient until the surgery is done and the patient is stitched back up. She doesn't start open surgery with one patient and then move on to another operating room where she begins operating on a second patient before the first operation is done. She starts and finishes one operation before starting a second.

2) **Asynchronous**: "Start this immediately, but don't wait till it's done. Move on to the next command immediately after you start this command."

*Asynchronous example in real life*: Ordering food or drinks. First, let's imagine what a synchronous resturant would look like. A waiter would come to your table, take 1 person's order, rush it back to the kitchen, wait for the kitchen to finish with that person's order, and then bring it back to that person. Finally once this first order is taken care of, the waiter would ask the second person at the table for their order. Of course this would be ridiculous. It makes much more sense for a resturant to process its customers' orders asynchronously. That is, after a waiter takes one person's order, he is free to take another person's order before finishing the first order. This allows the resturant to do multiple things at once, which is ultimately faster for some types of tasks, particularly those that take a lot of time to process.

Most commands are synchronous. For example, if-statements, setting or changing variables, and calling most Woof methods like `rectangle.move(10)` are all synchronous commands.

`forever` is an example of an asynchronous command. Think about it: if `forever` told the computer to wait until it was done, it would never move on to the next line.

`repeat`, `repeatUntil`, `every`, `after` are also asynchronous.

Asynchronous commands become quite confusing when you something happen after an asynchronous command is *finished*. If you want something after the 10th time you `repeat` it, you can't just put it on the line below the `repeat`. Why? Because the line below `repeat` happens immediately after the asynchronously command *starts*, not after it finishes. 

So how do we tell the computer to do something after an asynchronous command is *finished*? This is different for each language, but for Woof's `repeat` and `repeatUntil`, add a function as an extra parameter to those commands that specifies what should happen after the asynchonous command is *finished*. This is called a "callback" because that function is "called back" and run *after* the main part of the command is done.

Also, be sure not to nest async commands within each other's main body. For example if you want to make an image move in a square for forever, you can't just put four nested repeats inside a forever. Instead you have to use recursion and tell your repeat code to start-over only after the 4th repeat is finished finished. (If you put a repeat in a forever, it'll  keep starting new repeats for forever really quickly. It's like repeatedly asking a waiter for seconds before your first course has arrived.)


  - Repeat 10 times: 

```javascript
repeat(10, () => { 
  NAME.x++;
});
```

  - Do something after done repeating:

```javascript
repeat(10, () => { 
  NAME.x++;
}, () => {
  NAME.color = "blue";
});
```

  - Chaining repeats:

```javascript
repeat(100, () => {
  NAME.angle = RIGHT;
  NAME.move(1);
}, () => { 
  repeat(100, () => {
    NAME.angle = UP;
    NAME.move(1);
  }, () => { 
    repeat(100, () => {
      NAME.angle = LEFT;
      NAME.move(1);
    }, () => { 
      repeat(100, () => {
        NAME.angle = DOWN;
        NAME.move(1);
      });
    });
  });
});
```

  - Repeat constantly until (you have to put the condition in a function): 

```javascript
repeatUntil(() => IMAGE_NAME.y < minY, () => {
  IMAGE_NAME.y -= SPEED;
});
```

  - Do seomthing after a `repeatUntil`:

```javascript
repeatUntil(() => IMAGE_NAME.y < minY, () => {
  IMAGE_NAME.y -= SPEED;
}, () => {
  freeze();  
});
```  

  - Do this constantly forever: 

```javascript
forever(() => { 
  CIRCLE_NAME.radius = CIRCLE_NAME.distanceTo(mouseX, mouseY);
});
```
  
  - Do this every second: 

```javascript
var timer = 20;  // make the timer start at 20
var timerText = addText({x: 0, y: maxY - 20, size: 20, color: "white", text: () => `Time Left: ${timer}`}); // add text that diplays the timer, updating automatically
every(1, "second", () => {
  if (timer === 0){ freeze(); } // freeze the screen when the timer reaches 0
  timer--;   // make the timer go down every second
});
```

  - Do this when a condition (in a function) is true. This is a short-hand for a forever-if statement.

```javascript
when(() => keysDown.includes("LEFT"), () => {
    rectangle.x -= 5; 
});
```
  
  - Do this after one second: 

```javascript
after(1, "second", () => {...});
```

## Global Mode

By default, when you include the Woof script in your code, we default to making a full-screen project and polluting your global namespace with Woof's methods. We find not having to type "Woof." over and over again makes a huge difference for beginnger programmers.

However, if you'd like to turn off this mode, simple add `global="false"` in your script tag.

## Cloud Data via Firebase (in development)

Cloud data can be used to create high scores, logins, and multiplayer games.

1) Login to [Firebase](https://firebase.google.com/) with your Google account.

2) Create a new 

3) Make reading and writing to your database possible via the Database rules tab.

4) Whitelist your project's domain via the Auth sign-in tab.

5) Copy the Firebase config into your `Project`:

```javascript
firebaseConfig({
    apiKey: "AIzaSyAWa4XzsdE5haWBWq4fTef2Ko1dpbsE4qM",
    authDomain: "sample-a81f9.firebaseapp.com",
    databaseURL: "https://sample-a81f9.firebaseio.com",
    storageBucket: "",
});
```

6) Set some data:

```javascript
setCloud("high_score", 100);
setCloud("player1", {x: mouseX, y: mouseY});
```

7) Get some data:

```javascript
getCloud("high_score", 0) // returns 100, with a default of 0
setCloud("player1", {x: 0, y: 0}) // returns  {x: 14, y: 104}, with a default of {x: 0, y: 0}
```

## [Learnable Programming](http://worrydream.com/LearnableProgramming/)

Despite its many [noted](http://worrydream.com/LearnableProgramming/) flaws, Processing still remains the dominent graphics programming framework for beginners. Woof strives to solve the same problems as Processing, and be a beginner-friendly graphics frameworks for art, animation and game development, but it also hopes to improve upon Processing's main flaws:

  - **opaque parameters setting** - In Woof, all object properties can be set explicitly with dot notation or as named-parameters in the constructor.
  - **side effects in render** - In Woof, you can cause state to change in response to events or intervals. You don't have to hook your effectful code into your render method to make things move.
  - **render** - In Woof, (like ReactJS) we take care of rendering your objects onto the canvas for you. This means you don't even have to think about how your view layer works. It just does.
  - **hidden state** - In Woof, there's no hidden view-layer state. If you make one circle red, only that circle is red.
  - **non-modular** - In Woof, because all view-layer state is encapulated into objects, it allows you to easily build modular and functional code without worrying about side effects.
  - **poor decomposition** - In Woof, you can have infinitely many objects listen to infinitely many events. You don't have to funnel all of your code through the same top-level events that forces you to build tangled code.
  - **lack of identity / metaphor** - Woof steals Scratch's and Smalltalk's everything-is-an-object-that-you-can-see-on-the-screen-immediately metaphor. It also steals LOGO's pen, angles, turning and moving athropomorphic metaphors.

## Showing off

  - Making a page of draggable elements takes Pixi.js [80 lines](http://www.goodboydigital.com/pixijs/examples/8/), while using WoofJS it only takes [20 lines](https://jsbin.com/nepupal/edit?js,output).
  - Making a bunch of crazy bouncing images takes Pixi.js [254 lines](http://www.goodboydigital.com/pixijs/bunnymark/), but only takes WoofJS [32 lines](https://jsbin.com/xivetuf/edit?js,output).
  - Making pong using JQuery and Underscore.js takes [146 lines](https://jenniferdewalt.com/pong.html), while it takes WoofJS [under 60 lines](http://output.jsbin.com/keborur) (and our version has more elements PLUS it works on mobile!).
  - Making this analog clock takes [125 lines](https://jenniferdewalt.com/analog_clock.html) of JavaScript, but only [40 lines](http://output.jsbin.com/yaciqe) using WoofJS.
  - Recreating the viral game [Flappy Bird](http://output.jsbin.com/rarexo) takes under 70 lines using WoofJS.