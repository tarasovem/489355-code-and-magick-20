'use strict';
(function () {
  var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var MAX_WIZARD_COUNT = 4;

  var userDialog = document.querySelector('.setup');

  var similarListElement = userDialog.querySelector('.setup-similar-list');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var onSuccess = function (wizards) {
    var fragment = document.createDocumentFragment();

    wizards = wizards
      .sort(function () {
        return 0.5 - Math.random();
      })
      .splice(-4);

    for (var i = 0; i < MAX_WIZARD_COUNT; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }

    similarListElement.appendChild(fragment);
    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'fixed';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(onSuccess, onError);

  var form = userDialog.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      userDialog.classList.add('hidden');
    }, onError);
    evt.preventDefault();
  });

  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';

  var userDialogOpenButton = document.querySelector('.setup-open');
  var userDialogCloseButton = document.querySelector('.setup-close');
  var userNameInput = document.querySelector('.setup-user-name');

  var onUserDialogEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      closeUserDialog();
    }
  };

  var openUserDialog = function () {
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onUserDialogEscPress);
  };

  var closeUserDialog = function () {
    userDialog.classList.add('hidden');
    userDialog.style.top = '';
    userDialog.style.left = '';
    document.removeEventListener('keydown', onUserDialogEscPress);
  };

  userDialogOpenButton.addEventListener('click', openUserDialog);

  userDialogOpenButton.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      openUserDialog();
    }
  });

  userDialogCloseButton.addEventListener('click', closeUserDialog);

  userDialogCloseButton.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      closeUserDialog();
    }
  });

  userNameInput.addEventListener('keydown', function (evt) {
    if (evt.key === ESC_KEY) {
      evt.stopPropagation();
    }
  });

  userNameInput.addEventListener('invalid', function () {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Имя персонажа не может содержать менее 2 символов');
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Максимальная длина имени персонажа — 25 символов');
    } else {
      userNameInput.setCustomValidity('');
    }
  });

  var playerSetup = document.querySelector('.setup-player');

  var setRandomProperty = function (evt) {
    var target = evt.target;
    var property;

    if (target && target.classList.contains('wizard-coat')) {
      property = window.util.getRandomArrayElement(WIZARD_COAT_COLOR);
      target.style.fill = property;
      playerSetup.querySelector('input[name="coat-color"]').value = property;
    } else if (target && target.classList.contains('wizard-eyes')) {
      property = window.util.getRandomArrayElement(WIZARD_EYES_COLOR);
      target.style.fill = property;
      playerSetup.querySelector('input[name="eyes-color"]').value = property;
    } else if (target && target.classList.contains('setup-fireball')) {
      property = window.util.getRandomArrayElement(WIZARD_FIREBALL_COLOR);
      target.parentElement.style.backgroundColor = property;
      playerSetup.querySelector('input[name="fireball-color"]').value = property;
    }
  };

  playerSetup.addEventListener('click', function (evt) {
    setRandomProperty(evt);
  });
})();

