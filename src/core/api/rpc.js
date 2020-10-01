const logger = require('../utils/logger.js');
console.log('opening rpc.js..');

const http2 = require('http2');
var $ = require("jquery");


function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

const api = {
  call: {
      method: (method, params)=> {
          console.log(`CALL ${method}..`);
          const client = http2.connect('http://localhost:8000');
          const req = client.request({ ':method': 'POST', ':path': '/admin/blog/articles/create/' });
          req.on('response', (responseHeaders) => {
            console.log(responseHeaders);
          });
          req.on('data', (chunk) => {
            console.log(`CALL ${method}..`);
          });
          req.on('end', () => client.destroy());
      }
  },
  object: {
      create: (path, data)=> {
          $.ajaxSetup({
            beforeSend: function(xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
                }
            }
          });
          $.ajax({
              url : "/admin/blog/articles/create/",
              type : "POST",
              data: { fn: fn,
                      params: params },
              dataType: 'json',
              success : function(json) {
                  console.log(json);
              },
              error : function(xhr,errmsg,err) {
                  console.log(errmsg); // provide a bit more info about the error to the console
              }
          });
      },
      read: (path)=> {
          $.ajaxSetup({
            beforeSend: function(xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
                }
            }
          });
          $.ajax({
              url : "/admin/blog/articles/create/",
              type : "POST",
              data: { fn: fn,
                      params: params },
              dataType: 'json',
              success : function(json) {
                  console.log(json);
              },
              error : function(xhr,errmsg,err) {
                  console.log(errmsg); // provide a bit more info about the error to the console
              }
          });
      },
      update: (path, data)=> {
          $.ajaxSetup({
            beforeSend: function(xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
                }
            }
          });
          $.ajax({
              url : "/admin/blog/articles/create/",
              type : "POST",
              data: { fn: fn,
                      params: params },
              dataType: 'json',
              success : function(json) {
                  console.log(json);
              },
              error : function(xhr,errmsg,err) {
                  console.log(errmsg); // provide a bit more info about the error to the console
              }
          });
      },
      edit: (path, data)=> {
          $.ajaxSetup({
            beforeSend: function(xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
                }
            }
          });
          $.ajax({
              url : "/admin/blog/articles/create/",
              type : "POST",
              data: { fn: fn,
                      params: params },
              dataType: 'json',
              success : function(json) {
                  console.log(json);
              },
              error : function(xhr,errmsg,err) {
                  console.log(errmsg); // provide a bit more info about the error to the console
              }
          });
      },
      delete: (path)=> {
          $.ajaxSetup({
            beforeSend: function(xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
                }
            }
          });
          $.ajax({
              url : "/admin/blog/articles/create/",
              type : "POST",
              data: { fn: fn,
                      params: params },
              dataType: 'json',
              success : function(json) {
                  console.log(json);
              },
              error : function(xhr,errmsg,err) {
                  console.log(errmsg); // provide a bit more info about the error to the console
              }
          });
      }
  }
}


console.log('export rpc.call');
module.exports = api;

console.log('closing rpc.js..');
