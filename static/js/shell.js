const logger = require('electron').remote.require('./core/utils/logger');
const $ = require('jQuery');
console.log('Opening app.js.');

ipc = require('electron').ipcRenderer;

//COOKIES
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');


//READY
$(document).ready(function() {

  //ACCORDION
  $('.accordion').on('click', (event)=> {
    //close all
    $('.accordion').removeClass('active');
    $('.panel').css('height', '0px');
    //open new
    $(event.target).addClass('active');
    $(event.target.nextElementSibling).css('height', 'auto');
  });

  //WEBPANEL
  $('.accordion #webpanelLink').on('click', (event)=> {
    console.log('open-webpanel');
    ipcRenderer.send('open-webpanel');
  });

  //handle backup folder
  $('#backup_folder_select').on('click', (event)=> {
    $('#backup_folder_input')[0].click();
  });

});
