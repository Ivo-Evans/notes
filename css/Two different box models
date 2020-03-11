One thing the box models agree on is the layers:

  - the content (the core)
  - the padding
  - the border
  - the margin

Where the two differ is in what happens when you set the width property. 

The two settings are called content-box and border-box. content-box is default, but you can enable border-box (and then disable it with content-box if you like) with the box-sizing property:

  * {
    box-sizing: border-box;
  }

As you might have gathered from the name, setting the width property of a box with box-sixing: content-box sets the width of the content, letting the other chips fall where they may. Conversely, setting the width property of a box with box-sizing: border-box sets the width of the space between the borders of the box, letting other chips fall where they may. In both models, the margin is outside.

On balance, it seems that border-box is probably better. But I don't actually say this from experience, particularly. 