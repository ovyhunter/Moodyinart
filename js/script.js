function fetchData() {
    fetch("http://www.paulchelaru.com/wp-json/wp/v2/about")
    .then( e => e.json())
    .then(showData)
}


function showData(data){
    console.log(data);
    data.forEach(showSinglePost);
}

function showSinglePost(aPost) {
    console.log()
    let template = document.querySelector("#about_template").content;
    let clone = template.cloneNode(true);
    clone.querySelector(".about_title").textContent = aPost.title.rendered;
    clone.querySelector(".about_p").innerHTML = aPost.content.rendered;
    
    let section = document.querySelector("#about");
    section.appendChild(clone);
    
}

fetchData()




