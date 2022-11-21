
const apiEndPoint = "http://localhost:3000/user";
const todoListWrap = document.querySelector(".todo-list-wrap ul")
const input = document.querySelector(".single-box input")
const submitBtn = document.querySelector(".submit-button")

const displyCard = function (data) {
    todoListWrap.innerHTML = ""
    data.map(item => {
        const html = `
            <li class="d-flex list">
                <span>${item?.text}</span> <span class="end"><button>Edit</button> <button>Delete</button></span>
            </li>
        `
        todoListWrap.insertAdjacentHTML("afterbegin", html)
    })
    
}

const getDisplyPost = async function(){
    const res = await fetch(apiEndPoint)
    if(!res.ok){
       throw new Error("API is Fails") 
    }
    const posts = await res.json()
    displyCard(posts)
}

getDisplyPost()
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
submitBtn.addEventListener("click", async function(e){
    if(input.value === "") return false
    const post = {
        text: input.value
    }
    await getPost(post)
    input.value = ""
})