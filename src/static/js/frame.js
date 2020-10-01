
//HOSTS
async function hostTemplate(label, hostname, domain) {
  return `
    <div class="host" hostname="${hostname}" domain="${domain}">
      <div class="host site-tab">
        <label>${label}</label>
      </div>
    </div>
    `
}
async function loadHosts() {
  console.log(`\tload hosts..`);

}

//SITES
async function siteTemplate(server_name, hostname, domain) {
  return `
    <ui-card class="site" server_name="${server_name}" hostname="${hostname}" domain="${domain}" foldable=false>
      <label slot="header">${server_name}</label>
      <button slot="header" title="Copy link."><i class="material-icons">link</i></button>
      <div slot="content">
        <label>Link</label>
        <container>
          <label>ping</label>
          <span>ok</span>
        </container>
      </div>
      <button slot="footer" title="Open in browser."><i class="material-icons">public</i></button>
      <button slot="footer" id="" class="web-panel-link" title="Open remote webadmin panel."><i class="material-icons">desktop_windows</i></button>
      <button slot="footer" title="Show backups panel."><i class="material-icons">archive</i></button>
      <button slot="footer" class="config" title="Edit host."><i class="material-icons">folder</i></button>
    </ui-card>
    `
}
async function loadSites() {
  console.log(`\tawait load sites..`);
}


//READY
$(document).ready( ()=> {
  console.log('Document Ready..');

  //tabs
  $('#host_list .host').on('click', (event)=> {
    let host_name = event.currentTarget.attributes.hostname.value;
    let host_domain = event.currentTarget.attributes.domain.value;
    console.log(`clicked host; ${host_name}.${host_domain}`);
    console.log(`clicked host; ${host_name}.${host_domain}`);
    //hide all
    $('.site-tab').removeClass('active');
    $(`#site_list .site`).css('display', 'none');
    //show sites
    console.log(`showing site with hostname <${host_name}> on domain <${host_domain}>`);
    console.log(`showing site with hostname <${host_name}> on domain <${host_domain}>`);
    $(event.currentTarget.parentElement).addClass('active');
    console.log($(`ui-card[hostname="${host_name}"][domain="${host_domain}"]`));
    $(`#site_list ui-card[hostname="${host_name}"][domain="${host_domain}"]`).css('display', 'block');
  });

  $('.site-tab.all').on('click', (event)=> {
    console.log(`clicked host; all`);
    console.log(`clicked host; all`);
    //hide all
    $('.site-tab').removeClass('active');
    $(`#site_list .site`).css('display', 'none');
    //show all sites
    console.log(`showing all sites`);
    console.log(`showing all sites`);
    $(event.currentTarget.parentElement).addClass('active');
    console.log($(`ui-card.site`));
    $(`ui-card.site`).css('display', 'block');
  });

  $('.site-tab .web-panel-link').on('click', (event)=> {
    openWebPanel(event);
  });

  $('#backup_folder_select').on('click', (event)=> {
    $('#backup_folder_input')[0].click();
  });

  //buil API
  const api = new StackAPI(label='backend',
                           route='websocket',
                           url="ws://localhost:5000/ws")

  var hosts = api.call('load_hosts');
  //console.log('Loading sites..');
  //var load_sites = loadSites();

});
