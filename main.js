
const apiEndPoint = "http://localhost:3000/user";
const todoListUL = document.querySelector(".todo-list-wrap ul")
const todoListWrap = document.querySelector(".todo-list-wrap")
const input = document.querySelector(".single-box input")
const submitBtn = document.querySelector(".form-wrap")

// Disply Card UI
const displyCard = function (data) {
    todoListUL.innerHTML = ""
    data.map(item => {
        const html = `
            <li class="d-flex list align-items-center" data-id="${item?.id}">
                <span>${item?.id} - ${item?.text}</span> 
                <span class="end">
                    <button class="btn btn-success get-update" id="#update-modal" data-bs-toggle="modal" data-bs-target="#update-modal">Edit</button> 
                    <button class="delete-btn btn btn-danger">Delete</button>
                </span>
            </li>
        `
        todoListUL.insertAdjacentHTML("afterbegin", html)
    })
}

// Get Display Post 
const getDisplyPost = async function(){
    const res = await fetch(apiEndPoint)
    if(!res.ok){
       throw new Error("API is Fails") 
    }
    const posts = await res.json()
    displyCard(posts)
}
getDisplyPost()

// Get Post 
const getPost = async function(newPost) {
    const res = await fetch(apiEndPoint, {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    await res.json()
    getDisplyPost()
}
// Submit post
submitBtn.addEventListener("submit", async function(e){
    e.preventDefault()
    if(input.value === "") return false
    const post = {
        text: input.value
    }
    await getPost(post)
    input.value = ""
})


// Get Delete
const getDelete = async function (id){
    const response = await fetch(`${apiEndPoint}/${id}`, {
        method: "DELETE",
    })
    await response.json()
}

todoListWrap.addEventListener('click', async function(e){
    const targetBtn = e.target.classList.contains('delete-btn')
    if(targetBtn){
        const id = e.target.closest(".list").dataset.id
        await getDelete(id)
        // DOM Item Remove
        getDisplyPost()
        // e.target.closest(".list").remove()
    }
})

// Get update

const updateText = document.querySelector(".input-fild .form-control")
const updateButon = document.querySelector(".create-submit-btn")

todoListWrap.addEventListener('click', async  function(e){
    e.preventDefault()
    const targetBtn = e.target.classList.contains('get-update')
    const id = e.target.closest(".list").dataset.id

    const res = await fetch(`${apiEndPoint}/${id}`)
    const post = await res.json()

    if(targetBtn){
        updateText.value = post.text
        updateButon.value = post.id
    }

})
// Update json create
const getUpdate = async function(updatePost, id){
    const res = await fetch(`${apiEndPoint}/${id}`, {
        method: "PUT",
        body: JSON.stringify(updatePost),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    await res.json()
}
// post update
updateButon.addEventListener('click', async function(e){
    e.preventDefault()
    const id = e.target.value
    const post = {
        text: updateText.value
    }  
    await getUpdate(post, id)
    getDisplyPost()
})