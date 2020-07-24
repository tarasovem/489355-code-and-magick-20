'use strict';

(function () {
  var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

  var wizard = {
    onEyesChange: function (color) {
      window.setup.colors.eyes = color;
      window.setup.updateWizards();
    },
    onCoatChange: function (color) {
      window.setup.colors.coat = color;
      window.setup.updateWizards();
    }
  };

  var wizardElement = document.querySelector('.setup-wizard');

  var wizardEyesElement = wizardElement.querySelector('.wizard-eyes');
  wizardEyesElement.addEventListener('click', function (evt) {
    var newColor = window.util.getRandomArrayElement(WIZARD_EYES_COLOR);
    evt.target.style.fill = newColor;
    wizard.onEyesChange(newColor);
  });

  var wizardCoatElement = wizardElement.querySelector('.wizard-coat');
  wizardCoatElement.addEventListener('click', function (evt) {
    var newColor = window.util.getRandomArrayElement(WIZARD_COAT_COLOR);
    evt.target.style.fill = newColor;
    wizard.onCoatChange(newColor);
  });

  window.wizard = wizard;
})();
