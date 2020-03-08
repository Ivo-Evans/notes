Forms are a html element with various sub-elements. We're going to cover three:
- input
- label 
- button

But first we need to cover the form element itself, and how it works. When you click a button with type submit, every input in the form is read, and then the form has to Do something with that input. By default, it adds it to the url. But you can specify an address to send that input to in the form's action attribute, like so:

  <form action="https://learn-forms.netlify.com/submit/part2">
  </form>

The submit button itself can take an action attribute, but our example didn't work when I tried this, so it must be different in some important way.

So now we should do sub-elements within the form element.





First let's talk about buttons. If you type 

  <button type="submit"></button>

you create a clickable button. Add the button text in between the two tags.





Next let's talk about label tags. Label tags render as normal text, but when you click them, they focus on the input tag that they're associated with. They're also good for accessibility somehow. Use them like this:

        <label for="marketing">Do you submit to the corporate structure?</label>
        <input type="checkbox" name="marketing" id="marketing">

The label's for attribute has to match up with the id of the input tag it describes.





Finally we should talk about input tags. I left these till last because there are various kinds we might want to use:

  <input name="something" type="text">
  <textarea cols="30" rows="10"></textarea>
  <input name="something" type="email"> <!--red highlight and no submit unless input is valid email format - requries more research -->
  <input name="something" type="checkbox">

  <input name="some-radio-group" type="radio" value="x">
  <input name="some-radio-group" type="radio" value="y">
  <input name="some-radio-group" type="radio" value="z">

Each of these elements takes a name attribute which identifies the data once the form action has been taken. Probably the most interesting of them is the radio tag. Different radio tags with the same name form a single radio group. Only one box can be checked at once. Once the form action is sent, it is sent in the form 

    name=value





input tags can take a required attribute, as in

  <input type="text" required>

and submit buttons can take a disabled attribute, as in

    <button type="submit" disabled></button>
  
disabled is also a read-write boolean property of DOM nodes reprenting form buttons.
