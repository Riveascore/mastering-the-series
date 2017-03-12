var $content, $videos, timeTextRegex, textToMtsAndTime;

$content = $('[id="content"]');
$videos = $content.find('.video');

mtsRegex = new RegExp('MTS (\\d+):');
timeTextRegex = new RegExp('(\\d{2}:\\d{2}) (.*)');

/*
  {
    text: [
      {
        mtsNumber:
        time:
      }
    ]
  }
*/
textToMtsAndTime = {};

function extractTextToNumberTimeHash($html) {
  var $about, $title, $listOfTerms, titleEResults, mtsNumber;

  $about = $html.find('[class="about"]');
  $title = $about.find('h2');
  $listOfTerms = $about.find('ul li');
  titleEResults = mtsRegex.exec($title.text());
  mtsNumber = titleEResults[1];

  $listOfTerms.each(function (idx, obj) {
    var $html, text, time, numberTimeHash;

    $html = $(obj);

    itemString = $html.text();
    results = timeTextRegex.exec(itemString);
    time = results[1];
    text = results[2];

    numberTimeHash = {
      mtsNumber: mtsNumber,
      time: time,
    };


    existingArray = textToMtsAndTime[text];
    if (existingArray == undefined) {
      textToMtsAndTime[text] = [
        numberTimeHash
      ];
    }
    else {
      textToMtsAndTime[text].push(numberTimeHash);
    }
  });
}

extractTextToNumberTimeHash($('html'));
