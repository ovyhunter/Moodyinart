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
    if (document.querySelector("#about_template")) {
        let template = document.querySelector("#about_template").content;
        let clone = template.cloneNode(true);
        clone.querySelector(".about_title").textContent = aPost.title.rendered;
        clone.querySelector(".about_p").innerHTML = aPost.content.rendered;

        if (aPost._embedded["wp:featuredmedia"]) {
            clone.querySelector(".about_img").setAttribute("src", aPost._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);
        } else {
            clone.querySelector(".about_img").remove();
        }

        let section = document.querySelector("#about");
        section.appendChild(clone);
    }
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
    if (document.querySelector("#contact_template")) {
        let template = document.querySelector("#contact_template").content;
        let clone = template.cloneNode(true);
        clone.querySelector(".contact_title").textContent = aPost.title.rendered;
        clone.querySelector(".contact_p").innerHTML = aPost.content.rendered;

        if (aPost._embedded["wp:featuredmedia"]) { //img is there
            clone.querySelector(".contact_img").setAttribute("src", aPost._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);
        } else { // no img
            clone.querySelector(".contact_img").remove();
        }

        let section = document.querySelector("#contact");
        section.appendChild(clone);
    }
}
fetchDataContact();


// Blog Page 
let page = 1;
let lookingForData = false;

function fetchDataBlog() {
    lookingForData = true;
    fetch("http://www.paulchelaru.com/wp-json/wp/v2/blog?_embed&per_page=2&page=" + page)
        .then(e => e.json())
        .then(showDataBlog)
}

function showDataBlog(data) {
//    console.log(data);
    lookingForData = false;
    data.forEach(showSinglePostBlog);
}

function showSinglePostBlog(aPost) {
    //    console.log(aPost._embedded["wp:featu redmedia"][0].media_details.sizes.medium.source_url);
    if (document.querySelector("#blog_template")) {
        let template = document.querySelector("#blog_template").content;
        let clone = template.cloneNode(true);
        clone.querySelector(".blog_title").textContent = aPost.title.rendered;
        clone.querySelector(".blog_p").innerHTML = aPost.content.rendered;
        clone.querySelector(".blog_date").textContent = aPost.acf.date;

        if (aPost._embedded["wp:featuredmedia"]) { //img is there
            clone.querySelector(".blog_img").setAttribute("src", aPost._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);
        } else { // no img
            clone.querySelector(".blog_img").remove();
        }

        let section = document.querySelector("#blog");
        section.appendChild(clone);
    }
}
fetchDataBlog();

if (document.querySelector("#blog_template")) {
    setInterval(function () {
        if (bottomVisible() && lookingForData === false) {
//            console.log("We have reached the bottom");
            page++;
            fetchDataBlog();
        }
    }, 100);
}

function bottomVisible() {
    //looking for bottom page
    const scrollY = window.scrollY;
    const visible = document.documentElement.clientHeight;
    const pageHeight = document.documentElement.scrollHeight;
    const bottomPage = visible + scrollY >= pageHeight;
    return bottomPage || pageHeight < visible;
}