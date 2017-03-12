var mtsRegex, timeTextRegex;

mtsRegex = new RegExp('MTS (\\d+):');
timeTextRegex = new RegExp('(\\d{2}:\\d{2}) (.*)');

function getVideos() {
  $content = $('[id="content"]');
  return $content.find('.video');
}

function getVideoHtml(videoLink) {
  $.ajax({
    url: videoLink,
    type: 'GET'
  })
  .done(function(html) {
    var $html;

    $html = $($.parseHTML(html));
    extractTextToNumberTimeHash($html, textToMtsAndTime);
  });
}

function extractTextToNumberTimeHash($html, textToMtsAndTime) {
  var $about, $title, $listOfTerms, titleEResults, mtsNumber;

  debugger;
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
