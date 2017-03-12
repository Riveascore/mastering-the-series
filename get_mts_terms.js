var $content, $videos;

$content = $('[id="content"]');
$videos = $content.find('.video');

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


$videos = getVideos();
$videos.each(function (idx, obj) {
  var $obj, videoLink, $html;

  $obj = $(obj);
  videoLink = $obj.find('[class="play"]').attr('href');
  $html = getVideoHtml(videoLink);

  debugger;
  extractTextToNumberTimeHash($html, textToMtsAndTime);
});
