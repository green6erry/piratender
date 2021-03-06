(function(){
  $(function(){
    controller.initialize();
    console.log('hello');
  });

//1st proto
  var Question = function() {
    this.questions =
      [
        "Do ye like yer drinks strong?",
        "Do ye like it with a salty tang?",
        "Are ye a lubber who likes it bitter?",
        "Would ye like a bit of sweetness with yer poison?",
        "Are ye one for a fruity finish?"
      ];
  };

  var question = new Question;

// 2nd Proto
  var Ingredient = function() {
    this.strong = ["Glug of rum", "slug of whisky", "splash of gin"];
    this.salty = ["Olive on a stick", "salt-dusted rim", "rasher of bacon"];
    this.bitter = ["Shake of bitters", "splash of tonic", "twist of lemon peel"];
    this.sweet = ["Sugar cube", "spoonful of honey", "splash of cola"];
    this.fruity = ["Slice of orange", "dash of cassis", "cherry on top"];
  };

  var ingredient = new Ingredient;

  // a conglomerate of data and ingredient
  
  //3rd proto
  var Category = function(prompt, ingredient) {
    this.prompt = prompt;
    this.ingredient = ingredient;
  }

  Category.prototype.getRandomIngredient = function() {
    return this.ingredient[Math.floor(Math.random()*this.ingredient.length)];
  };

  //making children of the 3rd proto
  var categories = [
    new Category(question.questions[0], ingredient.strong),
    new Category(question.questions[1], ingredient.salty),
    new Category(question.questions[2], ingredient.bitter),
    new Category(question.questions[3], ingredient.sweet),
    new Category(question.questions[4], ingredient.fruity)
  ];

  //4th proto
  var Drink = function() {
    this.ingredients = [];
  };

  // indicating what the 4th proto is made of
  Drink.prototype.addIngredient = function(selectedCategories) {
    var ingredients = this.ingredients = [];
    selectedCategories.forEach(function(cat) {
      ingredients.push(cat.getRandomIngredient());
    });
  };

  drink = new Drink

  // 5th empty proto - do-er. Functions! Movements!
  var Controller = function(question, ingredient, drink) {
  }

  // One movement is to show results at the end
  Controller.prototype.showResults = function(ingredientList) {
    // jquery to change background on body
    var self = this;
    self.clearResults();
    self.changeBackground();
    var parent = $('.question-input');
    ingredientList.forEach(function(ingredient) {
      var resultsHTML = '<li class="result">' + ingredient  + '</li><br>';
      console.log(resultsHTML);
      $(parent).append(resultsHTML);
    });
    var close = '<input type="submit" class="btn btn-alt close" value="close">';
    $(parent).append(close);
  };

// Another movement is to add a close button to the Dom and reset everything
  Controller.prototype.attachHandlerCloseButton = function() {
    var self = this;
    $('.question-input').on('click', '.close', function(e) {
      self.clearResults();
      self.unChangeBackground();
      self.createForm();
      e.preventDefault();
    });
  };

  Controller.prototype.clearResults = function() {
    $('.question-input').html('');
  };

  Controller.prototype.unHideQuestions = function() {
    $('.question-input div').css('display','block');
  };

  Controller.prototype.changeBackground = function() {
    var picture = $('body');
    var bk = picture.css('background-color', "olive");

  };

  Controller.prototype.unChangeBackground = function() {
    $('body').css('background-color', 'white');
  };

  Controller.prototype.checkFormResponse = function(responses) {
    console.log('responses', responses);
    var checked = [];
    var length = responses.target.length - 1;
    for(var i=0; i<length; i++) {
      if (responses.target[i].checked) {
        checked.push(categories[i]);
      };
    };
    drink.addIngredient(checked);
    controller.showResults(drink.ingredients);
    console.log( "drink.ingredients", drink.ingredients);
  };







  Controller.prototype.attachHandlerFormSubmit = function() {
    var self = this;
    $('.question-input').on('submit',function(e) {
      self.checkFormResponse(e);
      e.preventDefault();
    });
  };

  Controller.prototype.createForm = function() {
    var parent = $('.question-input');
    categories.forEach(function(cat) {
      var questAns = [
        '<div>',
          '<label for="'+ cat.ingredient[0] +'">'+ cat.prompt +'</label>',
          '<input type="checkbox" id="'+ cat.ingredient[0] +'">',
        '</div><br>'
        ].join("");
      $(parent).append(questAns);
    });
    var submit = '<input type="submit" class="btn btn-alt" value="arugah!!!">';
    $(parent).append(submit);
  };

  Controller.prototype.initialize = function() {
    this.createForm();
    this.attachHandlerFormSubmit();
    this.attachHandlerCloseButton();
  };

  var controller = new Controller(question, ingredient, drink);

})();