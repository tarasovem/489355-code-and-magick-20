'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAME = ['де Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var randomArrayElement = function (arr) {
  var randomIndex = Math.random() * arr.length;

  return arr[Math.floor(randomIndex)];
};

var createWizardsList = function (amount) {
  var list = [];
  for (var i = 0; i < amount; i++) {
    list[i] = {
      name: randomArrayElement(WIZARD_NAMES) + ' ' + randomArrayElement(WIZARD_SURNAME),
      coatColor: randomArrayElement(WIZARD_COAT_COLOR),
      eyeColor: randomArrayElement(WIZARD_EYES_COLOR)
    };
  }
  return list;
};

var wizards = createWizardsList(4);

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyeColor;

  return wizardElement;
};

var renderWizardsList = function (list) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  list.appendChild(fragment);
};

renderWizardsList(similarListElement);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
