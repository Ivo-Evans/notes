# Notes on Gatsby

- TypeScript: Gatsby is ts-ready out of the box, but you need to enable TS by having a tsconfig.json. Generate one with tsc --init
- Pagination: just put a new file in the pages folder. Put components used by pages in the components folder adjacent to the pages folder
- Linking: import { Link } from "gatsby" - this Link seems to have same API as react-router-dom
- Global styles
	- You can link a stylesheet in gatsby-browser.js
- Component styles
	- Styled components are fine
	- It might also be worth mastering CSS modules. Gatsby has some docs on them. They're better than vanilla CSS because they avoid namespace conflicts
- Plugins
	- You can use plugins to apply default attributes to all pages
	- e.g. the typography.js gatsby plugin applies some styling in the html head to all text
		- typography.js might also be something cool to look at outside of Gatsby
		
- The data layer
	- Gatsby uses GraphQL as an interface for a separation of concerns. When people talk about graphQL in the context of Gatsby, they aren't talking about fetching data across a network. They're just using it like a CMS, with a plugin that transforms, e.g. Markdown, into something you can query in your components.
