# News Explorer

## About the project

'News Explorer' is a full-stuck application. It offers a service where users can access an extensive range of news articles sourced from a third-party API. Users input their desired search criteria into the search bar and initiate the search by clicking "Search." The website sends a request to the NewsAPI service, and finds all the relevant articles over the last week, and retrieves a maximum of 100 relevant articles for the user to peruse.

The retrieved article data is integrated into templates, presenting three articles at a time to the user. The user has the option to load more articles in sets of three as they explore the content. If users opt to create an account, they gain the ability to save articles they find intriguing by utilizing the bookmark icon situated in the upper right corner of each article. Clicking this icon triggers a POST request, forwarding the article's data to a back-end system that I developed.

On the user's profile page, a subsequent GET request to the back-end retrieves saved articles associated with that user. These saved articles are exhibited in a list format, accompanied by the original search term or phrase used to discover the article. Furthermore, users are given the option to remove saved articles by utilizing a delete button integrated into each listed article.

In summary, News Explorer streamlines the process of accessing, saving, and managing news articles, enhancing user experience and interaction through seamless integration with a third-party API and a custom-designed back-end system.

Technologies used for front-end

## Technologies used for front-end

- React
- Javascript
- React-hook-form
- HTML5
- CSS
- Responsive web design

## Figma Design

The Figma design was supplied by TripleTen and used to map out the UI design for this single page application. If you click on the link below, you will see that this design includes detailed views of each component used within the react application. The images and logos used were included in the Figma design. This link also includes detailed information for building the different screen-size applications.

- [Figma Design](https://www.figma.com/file/z1bxDn7eBEDlsDhnZ9dtin/Your-Final-Project?type=design&node-id=22618-1384&mode=design)

## Links

- [News Explorer Backend Repo Link](https://github.com/maryafzali24/news-explorer-backend)

- [Access live application here](https://news-explorer.strangled.net)
