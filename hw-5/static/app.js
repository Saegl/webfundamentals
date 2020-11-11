function updateModal(id, title, descr, content) {
    $('#updateModalCenter').modal('toggle');
    document.getElementById('titleUpdate').value = title;
    document.getElementById('descriptionUpdate').value = descr;
    document.getElementById('contentingUpdate').value = content;

    document.getElementById('buttonUpdate').onclick = function() {
        let newTitle = document.getElementById('titleUpdate').value;
        let newDescr = document.getElementById('descriptionUpdate').value;
        let newContent = document.getElementById('contentingUpdate').value;
        app.update_blog(id, newTitle, newDescr, newContent);
    };
}

var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );            
        anHttpRequest.send( null );
    }
}

var Blog = function(id, client, newblog){
    this.el         = document.getElementById(id);
    this.newblog    = document.getElementById(newblog);
    this.client     = client;
    this.blog       = {};

    

    this.init = function(){
    	this.get_blogs()
    }

    this.get_blogs = function(){
        var vm = this
        this.client.get('getallblogs', function(response) {
            response = JSON.parse(response);
            response.status ? vm.render('blogs', response.data, vm.el) : alert('Response not load')
        });
    }

    this.get_blog = function(id = 1){
        var vm = this
        this.client.get('blog.php?mode=getblog&id=' + id, function(response) {
            response = JSON.parse(response);
            response.status ? vm.render('blog', response.data, vm.el) : alert('Response not load')
        });
    }

    this.new_blog = function(data){
        var vm = this
        function onNewBlog(response) {
            response = JSON.parse(response);
            response.status ? alert('Blog successfully added') : alert('Response not load');
            this.get_blogs();
        }
        
        this.client.get('newblog?mode=newblog&title=' + data.title + 
            '&description=' + data.description + 
            '&content=' + data.content, onNewBlog.bind(this));
    }

    this.update_blog = function(id, newTitle, newDescr, newContent) {
        function onUpdate() {
            this.get_blogs();
        }
        this.client.get('update?title=' + newTitle + 
            '&description=' + newDescr + 
            '&content=' + newContent + 
            '&id=' + id, onUpdate.bind(this));
    }

    this.delete_blog = function(id){
        function onDel() {
            alert('blog deleted');
            this.get_blogs();
        }
        this.client.get('deleteblog?id=' + id, onDel.bind(this));
    }

    this.render = function(mode = 'blogs', data, to){
    	switch (mode) {
            case 'blogs':
                to.innerHTML = '';
                data.forEach(el => {
                    var div = document.createElement('div');
                    div.classList.add("col-md-4");

                    var h2 = document.createElement('h2');
                    h2.innerHTML = '<div>' + el.title + '</div>';
                    
                    var pin = document.createElement('p');
                    pin.innerHTML = el.description;

                    var btn = document.createElement('button');
                    btn.innerHTML = 'Read more...';
                    btn.classList.add("btn");
                    btn.classList.add("btn-light");
                    btn.setAttribute('data-toggle', 'modal');
                    btn.setAttribute('data-target', '#blog' + el.id);

                    let update = document.createElement('button');
                    update.innerHTML = 'Update'
                    update.classList.add("btn");
                    update.classList.add("btn-light");
                    let click = function() {
                        updateModal(el.id, el.title, el.description, el.content);
                    };
                    update.onclick = click.bind(this);

                    let delbtn = document.createElement('button');
                    delbtn.innerHTML = 'X'
                    delbtn.classList.add("btn");
                    delbtn.classList.add("btn-light");
                    let del = function() {
                        this.delete_blog(el.id);
                    };
                    delbtn.onclick = del.bind(this);
                    
                    // modal
                    var modal = document.createElement('div');
                    modal.classList.add("modal");
                    modal.classList.add("fade");
                    modal.id = 'blog' + el.id;
                    modal.setAttribute('aria-hidden', 'true');

                    var modal_dialog = document.createElement('div');
                    modal_dialog.classList.add("modal-dialog");
                    modal_dialog.classList.add("modal-lg");
                    modal_dialog.classList.add("modal-dialog-centered");
                    
                    var modal_content = document.createElement('div');
                    modal_content.classList.add("modal-content");

                    var modal_header = document.createElement('div');
                    modal_header.classList.add("modal-header");

                    modal_header_h5 = document.createElement('h5');
                    modal_header_h5.classList.add("modal-title");
                    modal_header_h5.innerHTML = el.title;

                    modal_header_close = document.createElement('button');
                    modal_header_close.classList.add("close");
                    modal_header_close.setAttribute('type', 'button');
                    modal_header_close.setAttribute('data-dismiss', 'modal');
                    modal_header_close.setAttribute('aria-label', 'Close');
                    modal_header_close.innerHTML = '&times;';

                    var modal_body = document.createElement('div');
                    modal_body.classList.add("modal-body");
                    
                    var modal_body_p = document.createElement('p');
                    modal_body_p.classList.add("m-3");
                    modal_body_p.innerHTML = el.content;

                    modal_header.appendChild(modal_header_h5);
                    modal_header.appendChild(modal_header_close);
                    modal_content.appendChild(modal_header);

                    modal_body.appendChild(modal_body_p);
                    modal_content.appendChild(modal_body);

                    modal_dialog.appendChild(modal_content);
                    modal.appendChild(modal_dialog);

                    div.appendChild(h2);     
                    div.appendChild(pin);
                    div.appendChild(btn);
                    div.appendChild(update);
                    div.appendChild(delbtn);
                    div.appendChild(modal);
              
                    to.appendChild(div)
                });
                
                break;
        }
    }
}

var client = new HttpClient();
var app = new Blog('app', client, 'newblog')

app.init()

document.getElementById('newblog').addEventListener('click', function (e) {
        // body...
    var title = document.getElementById('title').value;
    var description = document.getElementById('description').value;
    var content = document.getElementById('contenting').value;

    app.new_blog({
        'title': title,
        'description': description,
        'content': content
    })
});

