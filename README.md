# Movie Curator

## Objectives

Movie Curator is a Web Application that allows you to Create, Read, Update and Delete movies from a Database.

### RESTful `/movies` Resource Overview 

| Name | Path | Verb | Purpose | Completed |
|:----:|:-----:|:-----:|:----:|:----:|
| Index | `/movies` | GET | display all movies | ✅ |
| New | `/movies/new` | GET | Form to create a new movie | ✅ |
| Create | `/movies` | POST | creates a new movie on the server | ✅ |
| Show | `/movies/:id` | GET | details for a specific movie | ✅ |
| Edit | `/movies/:id/edit` | GET | Form to edit specific movie | ✅ |
| Update | `/movies/:id` | PATCH | updates a specific movie on the server | ✅ |
| Destroy | `/movies/:id` | DELETE | deletes a specific movie on the server | ✅ |

### Technologies used in creating the "Movie Curator" Web Applicatioon

* HTML, CSS, JavaScript, EJS, Bootstrap.
* Node, Express.
* Mongoose, MongoDB.
