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


extractTextToNumberTimeHash($('html'));
