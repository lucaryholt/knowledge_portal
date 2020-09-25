# Note Knowledge
A site containing documentation for things I have learned in Node JS Elective. Created as a mandatory assignment.

## Features

The app uses jQuery to dynamically show content to the user. This content is served by Express via GET requests.

## Note format

Meta data about the notes are stored as JSON objects in the **collection.json** files. They follow the following syntax:

```json
{
    "title" : "RESTful Web services",
    "fileName" : "rest.html",
    "links" : [
      {
        "description" : "Wikipedia - Representational state transfer",
        "link" : "https://en.wikipedia.org/wiki/Representational_state_transfer"
      },
      {
        "description" : "Insomnia",
        "link" : "https://insomnia.rest/"
      },
      {
        "description" : "Postman",
        "link" : "https://www.postman.com/"
      },
      {
        "description" : "MDN - HTTP request methods",
        "link" : "https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods"
      }
    ],
    "searchTerms": ["restful web services", "insomnia", "postman", "http request methods"]
  }
```

The JSON object contain 4 properties: **title**, **fileName**, **links** and **searchTerms**.
**links** are a list of other JSON object, each containing 2 properties: **description** and **link**.
**searchTerms** are a list of strings.

The **fileName** property refers to an html file. This html file contains the **note** body text and is written in html.
