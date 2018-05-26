// About Page
function fetchData() {
    fetch("http://www.paulchelaru.com/wp-json/wp/v2/about?_embed")
        .then(e => e.json())
        .then(showData)
}

function showData(data) {
//    console.log(data);
    data.forEach(showSinglePost);
}

function showSinglePost(aPost) {
//    console.log(aPost._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);
    let template = document.querySelector("#about_template").content;
    let clone = template.cloneNode(true);
    clone.querySelector(".about_title").textContent = aPost.title.rendered;
    clone.querySelector(".about_p").innerHTML = aPost.content.rendered;

    clone.querySelector(".about_img").setAttribute("src", aPost._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);
    
    let section = document.querySelector("#about");
    section.appendChild(clone);

}

fetchData()