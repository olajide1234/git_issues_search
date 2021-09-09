### Live deploy: https://xenodochial-ptolemy-05f12a.netlify.app/

#### TO-DO:
1 - Fix dropdown support issues for IE 10 and IE 11.
2 - Github API does not return count of pages available, therefore, next pagination button is always active, even at the end of available results


##### The Challenge
The customer support team has to interact with the Github issues search throughout the day. They're put off by typing queries and would much rather have an interactive query builder that hides the actual query from them.

Can you come up with a design that allows our customer support team to search GitHub issues in a more point-and-click, user-friendly way that doesn't involve typing complex queries?
For the purpose of this exercise imagine that they are interested in all the filter parameters the API offers (author, labels, status, and so on).

You will be building it as a Single-Page Application using HTML, CSS and Javascript. You can find the documentation for the Github API here: https://developer.github.com/v3/issues/

The most important feature the app has to include is a logic filter for the list of Github issues that scopes the results based on the query parameters.

Here's a GitHub repository with many issues to help you test: https://github.com/tensorflow/tfjs/issues

Things we are looking for:
- A good approach to building the filter.
- Reusability. Make it so it could be applied to other scenarios, like listing GitHub Pull Requests.
- Make use of ES6 syntax/features.

Bonus points:
- Add extra fancy custom CSS (SASS, LESS).
- Responsive design.
- Cross browser support.
----
