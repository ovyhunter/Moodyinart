function fetchData() {
    fetch("http://www.paulchelaru.com/wp-json/wp/v2/posts/")
    .then( e => e.json())
    .then(showData)
}


function showData(data){
    console.log(data);
    data.forEach(showSinglePost);
}

function showSinglePost(aPost) {
    
    let template = document.querySelector("#blog_template").content;
    let clone = template.cloneNode(true);
    clone.querySelector(".blog_title").textContent = aPost.title.rendered;
    clone.querySelector(".blog_p").innerHTML = aPost.content.rendered;
    
    
    let section = document.querySelector("#blog");
    section.appendChild(clone);
    
}

fetchData()




