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

export function removeArticle(id) {
  return new Promise((resolve, reject) => {
    const deleteArticleUrl = `${baseUrl}/${id}`;

    // Send a DELETE request to the server endpoint
    fetch(deleteArticleUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        // Check if the response indicates successful deletion (status code 204)
        if (response.status === 204) {
          // Resolve the Promise with a success message or any relevant data
          resolve("Article removed successfully");
        } else {
          // If deletion was not successful, reject the Promise with an error message
          reject("Error removing the article: Unexpected response from server");
        }
      })
      .catch((error) => {
        // If an error occurs during the request, reject the Promise with the error message
        reject(`Error removing the article: ${error.message}`);
      });
  });
}
