# **Slayers**

Slayers is a website for our game, where you can choose a character to battle monsters and fight against other users to get to the top of the leaderboard and get perks. We also have a store page that sells merchandise where users can support the developers.

### **Live site**: [Click here](https://huixianglim.github.io/ASG2/)

## **Design Process**

### **Main website and game**

Since our website is primarily a game, we designed it to showcase information about the game and made it responsive to allow players to play it on any device. We made it such that players have to log in or create an account before they can play so the game is able to track their progress. To make it more interesting, we added character classes to the game and a leaderboard where players can compete against each other, with the top 5 getting bonuses such as a 30% discount in our merchandise store. The player classes have different stats to add more dynamic to the game. We also added hover and scroll animations to the page to make the website more appealing to consumers.

### **Shop**

Our store is meant to be a place where players or people who visit the site in general can support our company by purchasing our merchandise. To make it easier to maintain and update. We stored the products on RestDB, so that staff with “admin” accounts can update, delete and post products on the page. Users can add these items to a cart and purchase them even if they are not signed in as long as they don’t leave invalid fields in the payment form. Players who are top 5 in the leaderboard will also see a 30% off sign on each product with updated prices. To let everyone know the perks you get for being a top 5 player, we added a message to the store sliding banner that broadcasts this.

### **Our initial wireframe**: [Click here](https://xd.adobe.com/view/bfdfb807-3b64-4eff-af07-4250da4547a5-ea8c/grid)

### **User Stories**:

- As a user type, I want to perform an action, so that I can achieve a goal.

This section is also where you would share links to any wireframes, mockups, diagrams etc. that you created as part of the design process.
These files should themselves either be included as a pdf file in the project itself (in an separate directory)
Include the Adobe XD wireframe as a folder. You can include the XD share url.

## **Features**

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

### **Features Left to Implement**

- Buying of character skins

- Inventory for selecting character skins

- Filter buttons for store page

## Technologies Used

In this section, you should mention all of the languages, frameworks, libraries, and any other tools that you have used to construct this project. For each, provide its name, a link to its official site and a short sentence of why it was used.

- [JQuery](https://jquery.com)
  - The project uses **JQuery** to simplify DOM manipulation.

## Testing

### Test scenarios:

1. Nav bar:

   - Go to the "Contact Us" page
   - Try to submit the empty form and verify that an error message about the required fields appears
   - Try to submit the form with an invalid email address and verify that a relevant error message appears
   - Try to submit the form with all inputs valid and verify that a success message appears.

2. Login/Sign up:

   - Go to the "Contact Us" page
   - Try to submit the empty form and verify that an error message about the required fields appears
   - Try to submit the form with an invalid email address and verify that a relevant error message appears
   - Try to submit the form with all inputs valid and verify that a success message appears.

3. Select Class:

   1. Go to the "Contact Us" page
   2. Try to submit the empty form and verify that an error message about the required fields appears
   3. Try to submit the form with an invalid email address and verify that a relevant error message appears
   4. Try to submit the form with all inputs valid and verify that a success message appears.

4. Game:

   1. Go to the "Contact Us" page
   2. Try to submit the empty form and verify that an error message about the required fields appears
   3. Try to submit the form with an invalid email address and verify that a relevant error message appears
   4. Try to submit the form with all inputs valid and verify that a success message appears.

5. Leaderboard and discount:

   1. Go to the "Contact Us" page
   2. Try to submit the empty form and verify that an error message about the required fields appears
   3. Try to submit the form with an invalid email address and verify that a relevant error message appears
   4. Try to submit the form with all inputs valid and verify that a success message appears.

6. View product:

   1. Go to the "Contact Us" page
   2. Try to submit the empty form and verify that an error message about the required fields appears
   3. Try to submit the form with an invalid email address and verify that a relevant error message appears
   4. Try to submit the form with all inputs valid and verify that a success message appears.

7. Search:

   1. Go to the "Contact Us" page
   2. Try to submit the empty form and verify that an error message about the required fields appears
   3. Try to submit the form with an invalid email address and verify that a relevant error message appears
   4. Try to submit the form with all inputs valid and verify that a success message appears.

8. Add to cart:
   1. Go to the "Contact Us" page
   2. Try to submit the empty form and verify that an error message about the required fields appears
   3. Try to submit the form with an invalid email address and verify that a relevant error message appears
   4. Try to submit the form with all inputs valid and verify that a success message appears.

### **W3 validator checks for HTML & CSS**:

- [CSS checker](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fhuixianglim.github.io%2FASG2&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en) produced no errors
- [HTML checker](https://validator.w3.org/nu/?doc=https%3A%2F%2Fhuixianglim.github.io%2FASG2) produced 6 minor errors & 1 warning

### **Link to our extensive testing (For each page)**: [Click here](https://docs.google.com/document/d/1k34hHV_DAsbCO8meKdnNA-1rVOao_kjtdDvSzIyxUfs/edit)

In addition, you should mention in this section how your project looks and works on different browsers and screen sizes.

### **Bugs**:

#### Bugs we fixed:

1. Shopping cart total price not rounding to 2 d.p. especially when users have the 30% discount.
2. Signing up with an existing email did not produce an error
3. When logging out of store as a admin or top 5 player on the leaderboard, the store does not update to show the default products without the admin controls or discount tag.
4. Media queries for the cart page did not update in github pages.
5. The button for the remove product in the cart was not display:block

#### Bugs we did not manage to fix in time:

1. Some minor errors that were brought to light by [w3 html checker](https://validator.w3.org/nu/?doc=https%3A%2F%2Fhuixianglim.github.io%2FASG2)

## Credits

### Content

- The text for section Y was copied from the [Wikipedia article Z](https://en.wikipedia.org/wiki/Z)

### Media

- The photos used in this site were obtained from ...

### Acknowledgements

- I received inspiration for this project from X
