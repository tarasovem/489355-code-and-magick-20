'use strict';
(function () {

  var userDialog = document.querySelector('.setup');

  var colors = {
    coat: 'rgb(101, 137, 164)',
    eyes: 'black',
  };

  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === colors.coat) {
      rank += 2;
    }
    if (wizard.colorEyes === colors.eyes) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    return left - right;
  };

  var updateWizards = window.util.debounce(function () {
    window.render(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  }, 500);

  var onSuccess = function (data) {
    wizards = data;
    updateWizards();
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

  window.setup = {
    colors: colors,
    updateWizards: updateWizards,
  };
})();

