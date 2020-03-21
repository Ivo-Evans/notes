This article will cover:

- fundamental css selectors
- combining selectors syntaxes equivalent to Boolean or and not
- combining selectors with so-called 'combinators'


# fundamental CSS selectors
- The * universal selector, which selects all elements
- the element/nodename selector, e.g. main {}
- class selectors, with a .
- id selectors, with a #
- attribute selectors
  - can either select for a HTML attribute's presence, or its value:
  [type="input"] {}
  [required]
  - either way the definitive thing is that this selector uses square brackets


# or/not equivalent ways of combining operators
You can also combine selectors in ways which are equivalent to the Boolean and and Boolean or. They aren't called Boolean or and and, that's just my way of thinking about them.

You can express a disjunction, or an or rule, by creating a comma-separated list:

  ol, ul { /* rules applying equally to both unodrered and ordered lists: for an element to match, it must be an ol *OR* a ul */}

You can express a conjunction, or an and rule, by putting two selectors together with no space:

  input[type="checkbox"] { /* elements which are both inputs *AND* have type checkbox*/}
  .first-class.second-class {/* elements which have both these classes */}
  a:hover { /* the match is an anchor link AND it has the :hover pseudo-class */}

# combinators

Combinators take information about the left-hand-side to make the selector on the right-hand-side more specific. They do not select the left-hand-side. 

There are five kinds of combinator:

| combinator | syntax |
| ----- | ------ |
|descendant  | a b {}  |
| child | a > b {}|
|general sibling aka following sibling  | a ~ b  {} |
|adjacent sibling |  a + b {} |
|column |  a \|\| b {}|

I've only used the descendant, child and adjacent sibling combinators. I'll go over them next, along with general sibling.

## The descendant selector
The descendant selector selects a RHS which is a descendant of the LHS. The RHS does not need to be a direct descendant of the LHS. 

  a b {}

## The child selector
The child selector selects an RHS which is a direct descendant of the LHS.

  a > b {}

It might be worth mentioning that there is also an :nth-child() selector, which seems to be a pseudo-element. It lets you take the specificity of the child-selector in situations when you might need to go deeper than just child.  

  p:nth-child(2) {
    background: red;
  }

## The adjacent sibling selector
The adjacent sibling selector is really useful. It lets you select things which come after other things. For instance, this rule selects all label elements which come after checked checkboxes:

  input:checked + label {
    opacity: 0.5;
  }

This rule selects all elements other than first children:

  * + * {
    margin-top: 5em;
  }

It gives spacing between elements in boxes, but not at the top of boxes

## The general/following sibling selector
The general sibling selector matches every RHS that comes after the LHS in the same box.

  h2 ~ p {
    color: red;
  }

This makes every p that comes after an h2 red, but not those that come before it

  <article> 
    <h1>Lorem ipsum</h1> 
    <p>Dolor sit amet</p> 
    <h2>Lorem ipsum</h2> 
    <p>Dolor sit amet</p> 
    <h3>Lorem ipsum</h3> 
    <p>Dolor sit amet</p>
  </article>

Two of these p elements would be styled red, and nothing else would be. 