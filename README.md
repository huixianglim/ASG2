# **Slayers**

Slayers is a website for our game, where you can choose a character to battle monsters and fight against other users to get to the top of the leaderboard and get perks. We also have a store page that sells merchandise where users can support the developers.

### **Our roles**

#### Wesley

- Most of the frontend
- GET, UPDATE AND DELETE for the store
- Backend for the navbar account log in log out
- Select class JS

#### Hui Xiang

- Most of the backend
- Scroll slide in animation for home page
- Styling for cart and checkout
- Initial layout of store styling

### **Live site**: [Click here](https://huixianglim.github.io/ASG2/)

### **Our pitch**: [Click here](https://drive.google.com/file/d/1aWpBVIX_C6FolE74bTTGsvw3DEx2tSkS/view?usp=share_link)

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

- Nav bar

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
- Checkout
  > Allow users to make payment for items in cart.

### **Features Left to Implement**

- Buying of character skins

- Inventory for selecting character skins

- Filter buttons for store page

## **Technologies Used**

- [HTML](https://html.com/)

  > The project uses _HTML_ for structuring of our webpages

- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

  > The project uses _CSS_ to style our webpages

- [Javascript](https://www.javascript.com/)

  > The project uses _Javascript_ to create the features and functions for our webpages

- [JQuery](https://jquery.com)

  > The project uses _Jquery_ for our api calls and also to simplify DOM manipulation

- [Visual Studio Code](https://code.visualstudio.com/)

  > We used VS Code for coding of our webpages

- [restdb.io](https://restdb.io/)

  > The project uses

- [JQuery](https://jquery.com)

  > The project uses _JQuery_ to simplify DOM manipulation.

- [Twitter](https://twitter.com/SlayersWebsite)

  > The project uses _Twitter_ to host our images online

- [Tiled](https://www.mapeditor.org/)

  > The project uses _Tiled_ for designing of the map

- [Adobe PhotoShop](https://www.adobe.com/sg/products/photoshop/landpa.html?gclid=CjwKCAiA0JKfBhBIEiwAPhZXDxDAB1wAT13ZQ8hzBOxBMb0id_InL2EHtUuXpDQmcod6zh4hilJFSBoCEQUQAvD_BwE&sdid=YP7XGDLR&mv=search&ef_id=CjwKCAiA0JKfBhBIEiwAPhZXDxDAB1wAT13ZQ8hzBOxBMb0id_InL2EHtUuXpDQmcod6zh4hilJFSBoCEQUQAvD_BwE:G:s&s_kwcid=AL!3085!3!444551129026!e!!g!!adobe%20photoshop!184169684!12788303444)

  > The project uses _Adobe Photoshop_ for creating of our store product items

- [Google Fonts](https://fonts.google.com/)

  > The project uses _google fonts_ to style our pages with beautiful fonts

- [Swiper.js](https://swiperjs.com/)

  > The project uses _Swiper.js_ for our banner in the store page

- [Font Awasome](https://fontawesome.com/)

  > The project uses _Font Awesome_ for the icons found within our pages

- [LottieFiles](https://lottiefiles.com/web-player?lottie_url=https%3A%2F%2Fassets8.lottiefiles.com%2Fpackages%2Flf20_b88nh30c.json)

  > The project uses _LottieFiles_ for the animations found within our pages

- [BootStrap](https://getbootstrap.com/)
  > The project uses _BootStrap_ for the creation of forms and pages

## **Testing**

### **Link to our extensive testing (For each page)**: [Click here](https://docs.google.com/document/d/1k34hHV_DAsbCO8meKdnNA-1rVOao_kjtdDvSzIyxUfs/edit)

### **Brief test scenarios**:

1. Nav bar:

   - Try to click all the nav bar links and verify the links all lead to their respective pages
   - Try logging in and verify that the log in button changes to username
   - Try loggin out and verify that the account name changes to login
   - Mobile view: The nav bar should become a hamburger dropdown menu

2. Login/Sign up:

   - Try inputting an inavlid input and verify form does not allow user to click submit
   - Try inputting a taken email and verify website does not allow user to proceed and show an error message
   - Mobile view: The login/sign up pages should scale to fit

3. Select Class:

   - Try to spam click the character buttons and verify the animation does not stop and break
   - Try to log out and verify that it brings the user back to the login page
   - Mobile view: The animations should not be in the mobile view

4. Game:

   - Loading into the page verify that it loads in with the selected character
   - Try to kill a monster and verify that the killcount gets updated and the leaderboard updates
   - Try to log out and verify that it brings the user back to the login page
   - Mobile view: The page should change to bring the kill count to the top of the frame the the leaderboard to the bottom of the frame, incerasing the size of the dpad as well

5. Leaderboard and discount:

   - Try to get into top 5 of the leaderboard and verify that the store updates to show products with 30% off
   - Try to get off the top 5 and verify that the store updates to show the default products

6. View product:

   - Load into the store page, verify that an animation plays and the products load in
   - Update a product, verify that the product gets updated and validation for the update form doesn't allow users to submit with empty fields
   - Post a product, verify that the products get updated with the added product appearing and validation for the update form doesn't allow users to submit with empty fields
   - Mobile view: Products should flex to fit width

7. Search:

   - Try to search for a product and verify that the products can e searched

8. Add to cart:

   - Try to add to cart and verify that the items are added
   - Try to add an item already in the cart and ensure an error appears as they can change the quantity from the cart itself
   - Mobile view: Remove item button turns into a solid button at the bottom of the page and the text is aligned to the center

9. Checkout:
   - Try to checkout with an empty field and verify error message appears
   - Try to checkout with all the fields and verify animation plays with success message
   - Mobile view: Form should fit device width

### **W3 validator checks for HTML & CSS**:

- [CSS checker](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fhuixianglim.github.io%2FASG2&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en) produced no errors
- [HTML checker](https://validator.w3.org/nu/?doc=https%3A%2F%2Fhuixianglim.github.io%2FASG2) produced 6 minor errors & 1 warning

### **Bugs**:

#### Bugs we fixed:

1. Shopping cart total price not rounding to 2 d.p. especially when users have the 30% discount.
2. Signing up with an existing email did not produce an error
3. When logging out of store as a admin or top 5 player on the leaderboard, the store does not update to show the default products without the admin controls or discount tag.
4. Media queries for the cart page did not update in github pages.
5. The button for the remove product in the cart was not display:block.
6. When logging out of select class page it does not bring user to the login page.

#### Bugs we did not manage to fix in time:

1. Some minor errors that were brought to light by [w3 html checker](https://validator.w3.org/nu/?doc=https%3A%2F%2Fhuixianglim.github.io%2FASG2)

## **Credits**

### **Content**

#### Our Main sources includes: Youtube, CodePen and Bootstrap

- The animation of the Nav Bar was inspired from [Cand Dev](https://www.youtube.com/watch?v=R033rKs6sgA&ab_channel=CandDev)

- The hover image animation for our home page was inspired from [The Coding Week](https://www.youtube.com/watch?v=rEq9QyOaXsI&ab_channel=TheCodingWeek)

- The sliding animation the home page was inspired from [Coding Snow](https://www.youtube.com/watch?v=VplDlwLTR50)

- The smoke effect in our select class page was inspired from [Tuat Tran Anh](https://www.youtube.com/watch?v=CFb3LKrE-OQ)

- The Javascript code for moving of the character was inspired from [Drew Conley](https://www.youtube.com/watch?v=H3Fn33lYuE0&t=435s)

- The Javascript code and design for the pokemon style battle of the game was inspired from[Chris Courses](https://www.youtube.com/watchv=yP5DKzriqXA&t=24910s)

- The animation and design for the login, store and home page were inspired from [codepen.io](https://codepen.io/trending)

- The cart page was inspired from a [Bootstrap Template](https://mdbootstrap.com/docs/standard/extended/shopping-carts/)

### **Media**

#### Our Main Sources includes: YouTube and Google

- The background gifs for our home page were obtained from [WANELLA](https://waneella.tumblr.com/) and [Pixel Art Gallery](https://pixel-art-gallery.tumblr.com/post/640653552738533377/the2dstagesfg-dojo-outside-from-paws-of-fury)

- The images for our Nav Bar were obtained from [piklok](https://pixlok.com/icons/user-icon-svg-free-download-4/), [freeicons.io](https://freeicons.io/test/shopping-bag-icon-icon) and [PNGEGG](https://www.pngegg.com/en/png-biids)

- The base banner image for our store page were obtained from [freepik](https://www.freepik.com/free-vector/flat-geometric-sales-banner-template_25232316.htm#page=2&query=store%20banner&position=31&from_view=keyword)
- The background gifs for our game were obtained from [Pinterest](https://www.pinterest.com/pin/401453754282678742/) and [gfycat](https://gfycat.com/gifs/search/pixel+stars)

- The background image for our pokemon battle mode in the game is from [Adobe](https://www.adobe.com/uk/creativecloud/design/discover/pixel-art.html)

- The background gif for home page, character spritesheet and assets of the map for our game were obtained from [itch.io](https://pixel-boy.itch.io/ninja-adventure-asset-pack)

- The base images(_without our logo_) for the products used in the store were obtained from
  - [Sunspel](https://www.sunspel.com/products/mens-short-sleeve-crew-neck-t-shirt-black?country=SG)
  - [Hours](https://www.hourscollection.com/products/drop-shoulder-hoodie-black-2)
  - [TOYNK](https://www.toynk.com/products/neon-fidget-spinner-pink)
  - [Self Edge](https://www.selfedge.com/warehouse?product_id=2731)
  - [vistaprint](https://www.vistaprint.sg/photo-gifts/personalised-mugs)
  - [ACCESSORIZE](https://www.accessorize.com/sg/plain-double-walled-metal-water-bottle/7801510300.html)

### **Acknowledgements**

- The game for our project received inspiration from [Pokemon](https://www.pokemon.com/us)

- The select class page for our project received inspiration from [Valorant](https://playvalorant.com/en-us/)
