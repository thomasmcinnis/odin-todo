Live demo: [github pages](https://thomasmcinnis.github.io/odin-todo/)

<img width="700" alt="ToDo" src="https://github.com/thomasmcinnis/odin-todo/assets/88759292/8900ae21-e79c-411b-b70f-a969e59a633d">

### About

Completed as part of The Odin Project Javascript [Todo project](https://www.theodinproject.com/lessons/node-path-javascript-todo-list).

A classic learning project, which I managed to make much more complicated by using it to explore object oriented design.

Frankly the code is much more interesting than the app itself.

I wrote a blog post about my exploration of the singleton pattern and my approach to the project:

[**The Javascript decorator-singleton pattern... pattern**](https://thomasmcinnis.com/posts/decorator-singleton-pattern/)

### Spec

I decided on the following requirements for my implementation:

-   [x] The view should be a function of state
-   [x] Messages should pass through the app in one direction
-   [x] The Items (Tasks, Categories) should have no insight as to their context (Lists which contain them)
-   [x] The Item Lists (TaskList, CategoryList) should have no coupling to their context (the DOM)

This necessitated the use of the observer pattern, so that a DisplayManager could be subscribed to changes in the Lists.

### Extending the project

If I come back to the project these are things I would like to tackle:

-   [ ] Enable Tasks to have multiple Categories, more like tags
-   [ ] Warn users prior to executing deletion
-   [ ] Enable sorting of the list

Additionally one downside of having the entire task list or category list re-render on state changes, is I can't get nice animations when things change. Therefore I would like to enable partial re-rendering.

### Design
My goal was to focus on the OOD part of the project and make the actual visual implementation as simple as possible. 

- Actually the simple nature of the design made for some interesting challenges, especially when considering seperation of concerns and decoupling.
- For example the user can edit the Category name, which has to pass to the Task List renderer and update the category name on each task. For this reason all my objects have a UUID so that they can be referenced by ID rather than name.
