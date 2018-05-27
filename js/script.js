// About Page
function fetchDataAbout() {
    fetch("http://www.paulchelaru.com/wp-json/wp/v2/about?_embed")
        .then(e => e.json())
        .then(showDataAbout)
}


function showDataAbout(data) {
    //    console.log(data);
    data.forEach(showSinglePostAbout)
}

function showSinglePostAbout(aPost) {
    //    console.log(aPost._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);
    let template = document.querySelector("#about_template").content;
    let clone = template.cloneNode(true);
    clone.querySelector(".about_title").textContent = aPost.title.rendered;
    clone.querySelector(".about_p").innerHTML = aPost.content.rendered;
    clone.querySelector(".about_img").setAttribute("src", aPost._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);

    let section = document.querySelector("#about");
    section.appendChild(clone);

}

fetchDataAbout();

//
//// Contact Page
function fetchDataContact() {
    fetch("http://www.paulchelaru.com/wp-json/wp/v2/contact?_embed")
        .then(e => e.json())
        .then(showDataContact)
}

function showDataContact(data) {
//    console.log(data);
    data.forEach(showSinglePostContact);
}


function showSinglePostContact(aPost) {
//    console.log(aPost._embedded["wp:featu redmedia"][0].media_details.sizes.medium.source_url);
    let template = document.querySelector("#contact_template").content;
    let clone = template.cloneNode(true);
    clone.querySelector(".contact_title").textContent = aPost.title.rendered;
    clone.querySelector(".contact_p").innerHTML = aPost.content.rendered;
   clone.querySelector(".contact_img").setAttribute("src", aPost._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);

    let section = document.querySelector("#contact");
    section.appendChild(clone);

}
fetchDataContact();