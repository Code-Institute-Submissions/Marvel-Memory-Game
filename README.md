# Marvel-Memory-Game-MS2
 
To play the game please click on the following link https://nickbell123.github.io/Marvel-Memory-Game/ . 
 
The game has been created for pleasure and entertainment for all ages. Using images pulled from Marvel API, the game allows 'players/    Marvel fans' match two cards of the same character image making a pair. the aim is to complete before the timer reaches zero.
 
## UX

The game has been designed to be as intutive and user friendly as possible with an retro feel for enjoyment for all ages. It allows for the user to 'look' for matching pairs of some of their favorite Marvel characters. On loading of the game a 'click to start' overlay appears with the pre text 'Find the matching pairs'. On clicking of the overlay the game starts and the count down timer starts as well as the background music. If all pairs are matched within the time an overlay with 'You won!' & 'click to restart' appears else a 'Game Over' overlay and 'click to restart' text appears if time runs out. 

To view concept wireframes please click [wireframes](https://github.com/NickBell123/Marvel-Memory-Game/tree/master/wireframes).

### General User Stories

* As a type of user, I would like to enjoy a simple memory card game with visually appealing format.
* As a type of user, I would enjoy viewing and matching images of Marvel characters.
* As a type of user, I would like to play a game that doesn't take too long but has a small challenge.

### Real Life User Stories

* User 1: Has some time on their hand and would like to play a game.
* User 2: Is interested in Marvel comics & characters, as are thier friends. They would like to play, share and 'compete' via the game             by trying to beat the others time.

## Features

* The game is designed to be as intuitive as possible, form using a classic game method to simple prompts in the game the user should     intuitivly know/ understand' the aim and the proceedure.
* Oringinal images form Marvel Api.
* Retro sound effects on game start, card flip, card match and game over.
* Count down timer and pairs counter.
* Mute sound fx button

### Future Features

* Level system and reward for completion. Reward could be a bio of a character in modal form.
* Scoring system using the timer and pairs to genterate a 'score'.


## Technologies Used

* The game has been built using HTML, CSS and Javascript. For responsive layout on smaller screens, CSS' grid system was used to make the game proptionally correct. However smaller screens are not optimal for gaming pleasure. 
* Images were sourced from [Marvels Dev Portal](https://developer.marvel.com/) and fonts form [fontspace.com](https://www.fontspace.com/category/marvel) & [dafont.com]https://www.dafont.com/badaboom-bb.font.
* [JQuery](https://jquery.com/) was used to show my understanding of the library and [Bootstrap](https://getbootstrap.com/) for ease of layout with some elements.

### Testing

1. HTML & CSS tested with direct input to W3C Mark Validator.
2. Javascript was tested using [babeljs.io](https://babeljs.io/)
2. Responsivness of the game was tested using various devices of diffrent screen sizes. Iphone X, Ipad, laptop & desktop all tested.
3. Multiple browser testing using Brave, IE, Firefox and Safari.
4. Tested game with friend and family for ease of use and simplicity.

## Bugs

The main issue was on IOS devices the images would not flip to display the 'backface' of the card. The issue was resolved after parsing the CSS through Autoprefixer and adding correct vendor prefixes.

## Deployment

This site was developed using VScode IDE. All changes to the code were then added and committed to the local repository. The commits were then pushed to my GitHub repository and the project deployed using GtiHub pages as follows;

Step 1: Go to the settings tab of the repo, scrolled down to GitHub Pages

Step 2: Under GitHub Pages -> Source is a scrolldown box titled None. Click it and you can select a source.

Step 3: Click master branch

Step 4: You will be automatically taken to the top of the page where in a light blue bar will be stated "Github Pages source saved".

Step 5: You then scroll down to GitHub Pages where will be stated "Your site is ready to be published at "<https://nickbell123.github.io/Marvel-Memory-Game/">

Step 6: Click on the url and you will be auto-referred to the published webpage.

Step 7: When returning to the github repository settings, scroll down to GitHub Pages and you will see a light green block stating "Your site is published at <https://...">

## The repository can be found on:

<https://github.com/NickBell123/Marvel-Memory-Game/> and the game has been deployed using Github pages here [Marvel Memory Game](https://nickbell123.github.io/Marvel-Memory-Game/).

## Credits & Acknowledgement
* Fonts credits to [fontspace.com](https://www.fontspace.com/category/marvel) & [dafont.com](https://www.dafont.com/badaboom-bb.font.)

* Thanks to  [Marvels Dev Portal](https://developer.marvel.com/) for their resource. Slack and Slaxk overflow community, as wellas Eventyret_mentor.

A special thank you to Anthony Ngene, mentor.






