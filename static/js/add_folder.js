const fs = require('fs');
const nconf = require('nconf');
const { ipcRenderer } = require('electron');

//adding jQuery
window.$ = window.jQuery = require('jquery');


function save_folder() {

};


//READY
$(document).ready(function() {

  //handle select folder
  $('#output_folder_select').on('click', (event)=> {
    $('#output_folder_input')[0].click();
  });
  //handle update folder path
  $('#output_folder_input').change( (event)=> {
    $('#output_folder_text').val(event.target.value);
  });
  //handle backup folder
  $('#backup_folder_select').on('click', (event)=> {
    $('#backup_folder_input')[0].click();
  });
  //handle update folder path
  $('#backup_folder_input').change( (event)=> {
    $('#backup_folder_text').val(event.target.value);
  });

  //handle save folder
  $('.save').on('click', (event)=> {
    let data = $('#add_form').serializeArray();
    ipcRenderer.send('add_folder', data);
  });

});
