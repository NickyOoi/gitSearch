$(document).ready(function(){
    //Whenever there's a key pressed in the input field
    $('#searchUser').on('keyup', function(e){
        //It stores the value into a variable
        let username = e.target.value;
        //Send request to github
        $.ajax({
            //Execute the link with input username and send data along with the call
            //(else it will only get about 50 request per hour)
            url:'https://api.github.com/users/' + username,
            data:{
                client_id:'ad9c76f1da1579296bc0',
                client_secret:'4280c6f478595689d5c7133d4838f4f0b256d46d'
            }
        }).done(function(user){
            //After successfully retrieving the user profile, here it executes another function call
            //to retrieve all the repos of the chosen user
            $.ajax({
                //Execute the link with input username and send data along with the call
                //It also sort the results in ascending order and limits the output to only 5 results
                url:'https://api.github.com/users/' + username + '/repos',
                data:{
                    client_id:'ad9c76f1da1579296bc0',
                    client_secret:'4280c6f478595689d5c7133d4838f4f0b256d46d',
                    sort: 'created: asc',
                    per_page: 5
                }
            }).done(function(repos){
                //Once it successfully retrieves the repos, it prints out the repos details onto the screen
                $.each(repos, function(index, repo){
                    $('#repos').append(`
                        <div class="well">
                            <div class="row">
                                <div class="col-md-7">
                                    <strong>${repo.name}</srong>: ${repo.description}
                                </div>
                                <div class="col-md-3">
                                    <span class="label label-default">Forks: ${repo.forks_count}</span>
                                    <span class="label label-primary">Watchers: ${repo.watchers_count}</span>
                                    <span class="label label-success">Stars: ${repo.stargazers_count}</span>
                                </div>
                                <div class="col-md-2">
                                    <a href="${repo.html_url}" target="_blank" class="btn btn-default">Repo Page</a>
                                </div>
                            </div>
                        </div>
                    `);
                });
            });
            //Here it displays all the basic profile information of the chosen user
            $('#profile').html(`
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h3 class="panel-title">${user.name}</h3>
                  </div>
                  <div class="panel-body">
                    <div class="row">
                        <div class="col-md-3">
                            <img style="width:100%" class="thumbnail" src="${user.avatar_url}>"
                        </div>
                        <div class="col-md-9">
                        <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block">View Profile</a>
                        <br>
                        <span class="label label-default">Public Repos: ${user.public_repos}</span>
                        <span class="label label-primary">Public Gists: ${user.public_gists}</span>
                        <span class="label label-success">Followers: ${user.followers}</span>
                        <span class="label label-info">Following: ${user.following}</span>
                        <br><br>
                        <ul class="list-group">
                            <li class="list-group=item">Company: ${user.company}</li>
                            <li class="list-group=item">Website/Blog: ${user.blog}</li>
                            <li class="list-group=item">Location: ${user.location}</li>
                            <li class="list-group=item">Member Since: ${user.created_at}</li>
                        </ul>
                        </div>
                    </div>
                  </div>
                </div>
                <h3 class="page-header">Latest Repos</h3>
                <div id="repos"></div>
            `);
        });
    });
});
