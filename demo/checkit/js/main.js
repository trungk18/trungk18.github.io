jQuery(document).ready(function ($) {
  //this is used for the video effect only
  if ($('.intro-video').length > 0) {
    var videoWrapper = $('.intro-video'),
			mq = window.getComputedStyle(document.querySelector('.intro-video'), '::after').getPropertyValue('content').replace(/"/g, "").replace(/'/g, "");
    if (mq == 'desktop') {
      // we are not on a mobile device 
      var videoUrl = videoWrapper.data('video'),
				video = $('<video loop><source src="' + videoUrl + '.mp4" type="video/mp4" /><source src="' + videoUrl + '.webm" type="video/webm" /></video>');
      video.appendTo(videoWrapper);
      video.get(0).play();
    }
  }
});