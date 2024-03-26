import { baseUrl } from "./constants";
import corgi from "../images/Corgi.png";
import moose from "../images/Moose.png";

export function getItems() {
  return new Promise((resolve, reject) => {
    const errorCondition = false;

    if (!errorCondition) {
      resolve([
        {
          keyword: "Nature",
          title: "Everyone Needs a Special 'Sit Spot' in Nature",
          description:
            "Ever since I read Richard Louv's influential book, 'Last Child in the Woods,' the idea of having a special 'sit spot' has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to find that the world is not what it appears to be.",
          publishedAt: "November 4, 2020",
          source: "TreeHugger",
          url: corgi,
          urlToImage: corgi,
        },
        {
          keyword: "Parks",
          title: "Grand Teton Renews Historic Crest Trail",
          description:
            "The linking together of the Cascade and Death Canyon trails, at their heads, took place on October 1, 1933, and marked the first step in the realization of a plan whereby the hiker will be...",
          publishedAt: "November 4, 2020",
          source: "National Parks Traveler",
          url: moose,
          urlToImage: moose,
        },
      ]);
    } else {
      // Reject the Promise with an error message
      reject("An error occurred while fetching data");
    }
  });
}

export function saveArticle(card) {
  return new Promise((resolve, reject) => {
    const savedArticle = {
      keyword: card.keyword,
      title: card.title,
      text: card.description,
      date: card.publishedAt.slice(0, 10),
      source: card.source.name,
      link: card.url,
      image: card.urlToImage,
    };

    // Simulate an error condition (for demonstration purposes)
    const errorCondition = false;

    if (!errorCondition) {
      // Resolve the Promise with the saved article
      resolve(savedArticle);
    } else {
      // Reject the Promise with an error message
      reject("Error saving the article");
    }
  });
}
/**
 * Removes an article with the specified ID from the list of saved articles.
 * @param {string} id - The ID of the article to remove.
 * @param {Array} savedArticles - The array of saved articles.
 * @returns {Promise<Array>} A promise that resolves with the updated list of articles after removal.
 */
export function removeArticle(id, savedArticles) {
  return new Promise((resolve, reject) => {
    // Simulate the removal process with a delay
    setTimeout(() => {
      try {
        // Filter out the article with the specified ID
        const updatedData = savedArticles.filter(
          (article) => article.id !== id
        );

        // Resolve the Promise with the updated data
        resolve(updatedData);
      } catch (error) {
        // If an error occurs, reject the Promise with the error message
        reject(
          `An error occurred while removing the article: ${error.message}`
        );
      }
    }, 1000); // Simulate a delay of 1 second (adjust as needed)
  });
}
