lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
figures = "1234567890";
specialChars = "!@#$%&*_-=+.";
hexDigits = "0123456789abcdef";

function randomPassword(characters, length) {
  var pass = "";
  for (var x = 0; x < length; x++) {
    var i = Math.floor(Math.random() * characters.length);
    pass += characters.charAt(i);
  }
  return pass;
};

function createUUID(inputhexDigits) {
  // http://www.ietf.org/rfc/rfc4122.txt
  var s = [];
  for (var i = 0; i < 36; i++) {
    s[i] = inputhexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = inputhexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
};

function shuffleArray(array) {
  // Copie l'array original pour ne pas le modifier
  let shuffled = [...array];
  
  // Algorithme de Fisher-Yates (ou Knuth) shuffle
  for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
}

function createAppleLikePassword(datasize) {
  var a = Math.floor(datasize / 3);
  var b = Math.floor((datasize - a) / 2);
  var c = datasize - a - b;
  var [d, e, f] = shuffleArray([a, b, c])
  var characters = lowerCaseChars + upperCaseChars + figures;
  var separator = '-';
  return randomPassword(characters, d) + separator + randomPassword(characters, e) + separator + randomPassword(characters, f);
};


function generateUUID() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
};

function fillBlockWithPwd(elt) {
  var quantity = elt.attr("data_qty");
  var pwdsize = elt.attr("data_size");
  var dataType = elt.attr("data_type");
  var dataTypeList = dataType.split(',');
  var characters = '';
  $.each(dataTypeList, function () {
    var type = this;
    if ('alphanum' == type) {
      characters += lowerCaseChars + upperCaseChars + figures;
    } else if ('specialchars' == type) {
      characters += specialChars;
    }
});
  for (var i = 0; i < quantity; i++) {
    elt.append("<li>" + randomPassword(characters, pwdsize) + "</li>");
  }
};

function fillBlockWithUUID(elt) {
  var quantity = elt.attr("data_qty");
  var uuidsize = elt.attr("data_size");
  for (var i = 0; i < quantity; i++) {
    elt.append("<li>" + createUUID(hexDigits) + "</li>");
    elt.append("<li>" + generateUUID() + "</li>");

  }
};



function fillBlockWithAppleLikePassword(elt){
  var quantity = elt.attr("data_qty");
  var datasize = elt.attr("data_size");
  for (var i = 0; i < quantity; i++) {
    elt.append("<li>" + createAppleLikePassword(datasize) + "</li>");

  }
}


var generatepwd = function (localization) {
  var allBlocksToFill = $(localization);

  allBlocksToFill.each(function () {
    fillBlockWithPwd($(this));
  });
};

var generateapplelikepassword = function (localization) {
  var allBlocksToFill = $(localization);

  allBlocksToFill.each(function () {
    fillBlockWithAppleLikePassword($(this));
  });
};


var generateuuid = function (localization) {
  var allBlocksToFill = $(localization);

  allBlocksToFill.each(function () {
    fillBlockWithUUID($(this));
  });
};

