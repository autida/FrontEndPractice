window.onload = function() {
    console.log("DOM has loaded.");
    //create Router constructor
    let Router = function(name, routes) {
        return {
            name: name,
            routes: routes
        }
    }
    let view = document.getElementById('view');
    let myFirstRouter = new Router('myFirstRouter',[
        {
            path: '/',
            name:'Root'
        },
        {
            path: '/about',
            name:'About'
        },
        {
            path: '/contact',
            name:'Contact'
        }
    ]);
    console.log(myFirstRouter);
    let currentPath = window.location.pathname;
    if(currentPath === '/Routing/') {
        view.innerHTML = 'You are on the root page';
    }
}