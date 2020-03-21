As well as using the before and after pseudo classes you can insert images as backgrounds, and then let CSS do some clever and nifty formatting for you. 
Use the background-image property with the url function:

.hero {
    background-image: url('/images/hero.jpg');
    background-size: cover;
    background-position: 0% 60%;
}

background-size: cover ensures that the image is formatted in a sensible way, with some cropping if necessary but no stretching

You can then manipulate the position of the background with background-position. When you give it percentages, it moves the top-left corner (0% 0%) some percentage of the image's width and height.