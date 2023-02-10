# Slayers

Slayers is a website for our game, where you can choose a character to battle monsters and fight against other users to get to the top of the leaderboard and get perks. We also have a store page that sells merchandise where users can support the developers.

**Live site**: [Click here](https://huixianglim.github.io/ASG2/)

## Design Process

### Main website and game
Since our website is primarily a game, we designed it to showcase information about the game and made it responsive to allow players to play it on any device. We made it such that players have to log in or create an account before they can play so the game is able to track their progress. To make it more interesting, we added character classes to the game and a leaderboard where players can compete against each other, with the top 5 getting bonuses such as a 30% discount in our merchandise store. The player classes have different stats to add more dynamic to the game. We also added hover and scroll animations to the page to make the website more appealing to consumers.

### Shop
Our store is meant to be a place where players or people who visit the site in general can support our company by purchasing our merchandise. To make it easier to maintain and update. We stored the products on RestDB, so that staff with “admin” accounts can update, delete and post products on the page. Users can add these items to a cart and purchase them even if they are not signed in as long as they don’t leave invalid fields in the payment form. Players who are top 5 in the leaderboard will also see a 30% off sign on each product with updated prices. To let everyone know the perks you get for being a top 5 player, we added a message to the store sliding banner that broadcasts this.

### User Stories:

- As a user type, I want to perform an action, so that I can achieve a goal.

This section is also where you would share links to any wireframes, mockups, diagrams etc. that you created as part of the design process.
These files should themselves either be included as a pdf file in the project itself (in an separate directory)
Include the Adobe XD wireframe as a folder. You can include the XD share url.

## Features

- nav bar

  > Allow users to go respective pages and log out

- Login/Sign up

  > Allow users to log in or sign up and access other features such as game and discount

- Select Class

  > Allow users to select the class they would want for the game.

- Game

  > A game where users can kill monster and gain kill points.

- Leaderboard and discount

  > Users can gain their spot on the leaderboards based on game kill points. Upon reaching top 5 in leaderboard, they will have a discounted store.

- View products

  > Allow users to view store product items

- Search

  > Allow users to filter items in store based on input

- Add to cart
  > Allow users to add items to a cart in which they can access later on to pay for them.

### Features Left to Implement

- Buying of character skins

- Inventory for selecting character skins

- Filter buttons for store page

## Technologies Used

In this section, you should mention all of the languages, frameworks, libraries, and any other tools that you have used to construct this project. For each, provide its name, a link to its official site and a short sentence of why it was used.

- [JQuery](https://jquery.com)
  - The project uses **JQuery** to simplify DOM manipulation.

## Testing

For any scenarios that have not been automated, test the user stories manually and provide as much detail as is relevant. A particularly useful form for describing your testing process is via scenarios, such as:

1. Contact form:
   1. Go to the "Contact Us" page
   2. Try to submit the empty form and verify that an error message about the required fields appears
   3. Try to submit the form with an invalid email address and verify that a relevant error message appears
   4. Try to submit the form with all inputs valid and verify that a success message appears.

In addition, you should mention in this section how your project looks and works on different browsers and screen sizes.

You should also mention in this section any interesting bugs or problems you discovered during your testing, even if you haven't addressed them yet.

If this section grows too long, you may want to split it off into a separate file and link to it from here.

## Credits

### Content

- The text for section Y was copied from the [Wikipedia article Z](https://en.wikipedia.org/wiki/Z)

### Media

- The photos used in this site were obtained from ...

### Acknowledgements

- I received inspiration for this project from X
