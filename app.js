window.addEventListener("load",()=>{
    const usersApi = 'https://jsonplaceholder.typicode.com'
    const userTable = document.querySelector('.user-table')
    const postContainer = document.querySelector('.post-container')
    const spinner = document.querySelector('.spinner')
    let userPost;
    let users = fetch(`${usersApi}/users`).then(users=>users.json()
    )
    users.then(res =>{
        res.forEach(user =>{
            let userInfo =document.createElement('tr')
            let text = document.createTextNode(user.username)
            userInfo.appendChild(text)
            userInfo.className='user-row'
            userInfo.value = user
            userTable.appendChild(userInfo)
            userInfo.addEventListener('click',()=>{
                spinner.style.display = 'flex'
                removeAllChildNodes(postContainer)
                userPost = fetch(`${usersApi}/posts?userId=${userInfo.value.id}`).then(post=>post.json())
                userPost.then(res =>{
                    let username = document.createElement('h2')
                    let text = document.createTextNode(`${userInfo.value.username}'s Posts`)
                    username.appendChild(text)
                    postContainer.appendChild(username)
                    res.forEach(post=>{
                        let postInfo = document.createElement('div')
                        let postTitle = document.createElement('h3')
                        text = document.createTextNode(post.title)
                        postTitle.appendChild(text)
                        let postBody = document.createElement('p')
                        text = document.createTextNode(post.body)
                        postBody.appendChild(text)
                        postInfo.appendChild(postTitle)
                        postInfo.appendChild(postBody)
                        postContainer.appendChild(postInfo)
                    })
                    setTimeout(()=>spinner.style.display = 'none',500 )
                })
            })
            setTimeout(()=>spinner.style.display = 'none',500 )
        })
    })


})

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
