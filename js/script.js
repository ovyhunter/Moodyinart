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
        console.log(aPost);
        let template = document.querySelector("#about_template").content;
        let clone = template.cloneNode(true);
        //        clone.querySelector(".about_title").textContent = aPost.title.rendered;
        clone.querySelector(".about_p").innerHTML = aPost.content.rendered;
        clone.querySelector(".about_img").setAttribute("src", aPost.acf.blog_image.url);

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
    fetch("http://www.paulchelaru.com/wp-json/wp/v2/blog?_embed&per_page=4&page=" + page)
        .then(e => e.json())
        .then(showDataBlog)
}

function showDataBlog(data) {
    lookingForData = false;
    data.forEach(showSinglePostBlog);
}

function showSinglePostBlog(aPost) {
    //    console.log(aPost._embedded["wp:featu redmedia"][0].media_details.sizes.medium.source_url);
    if (document.querySelector("#blog_template")) {
        let template = document.querySelector("#blog_template").content;
        let clone = template.cloneNode(true);
        console.log(aPost.acf.image.url);
        if (aPost.acf.image.url) { //img is there
            clone.querySelector(".blog_img").setAttribute("src", aPost.acf.image.url);
        } else { // no img
            clone.querySelector(".blog_img").remove();
        }
        clone.querySelector(".blog_title").textContent = aPost.title.rendered;
        clone.querySelector(".blog_date").textContent = aPost.acf.date;

        let descp = aPost.content.rendered;
        if (descp.length > 143) {
            descp = descp.substring(0, 143);
            //            descp = descp + "...";
        }
        descp = descp + "...";
        clone.querySelector(".blog_p").innerHTML = descp;


        clone.querySelector(".blog_subpage_a").href = "subpage_blog.html?id=" + aPost.id;

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

//Subpage
let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("id");

if (document.querySelector("#subpage")) {

    fetch("http://www.paulchelaru.com/wp-json/wp/v2/blog/" + id)
        .then(e => e.json())
        .then(showSinglePostSubpage)

    function showSinglePostSubpage(aPost) {
        console.log(aPost);
        document.querySelector("#subpage h1").textContent = aPost.title.rendered;
        document.querySelector("#subpage p").innerHTML = aPost.content.rendered;
    }

}


//Arrow To

if (document.querySelector("#arrowTo")) {

    var arrowToTop = document.querySelector("#arrowTo");
    arrowToTop.addEventListener('click', function () {
        var element = document.getElementById("navbar-id");
        element.scrollIntoView({
            alignToTop: true,
            block: "start"
        });
        let landingPage = document.querySelector(".landing-page");
                landingPage.style.display = "none"
    });
    
}

//Gallery 3 Page
function fetchDataSeriesGallery() {
    fetch("http://www.paulchelaru.com/wp-json/wp/v2/series_gallery?_embed")
        .then(e => e.json())
        .then(showDataSeriesGallery)
}

function showDataSeriesGallery(data) {
    console.log(data);
    data.forEach(showSinglePostSeriesGallery);
}

function showSinglePostSeriesGallery(aPost) {
    if (document.querySelector("#seriesPage_template")) {
        //        console.log(aPost.acf.image);
        let template = document.querySelector("#seriesPage_template").content;
        let clone = template.cloneNode(true);

        clone.querySelector(".seriesPage_img").setAttribute("src", aPost.acf.image);
        clone.querySelector(".seriesPage_title").innerHTML = aPost.title.rendered;
        clone.querySelector(".seriesPage_a").href = "subpageSeries.html?id=" + aPost.id;

        //        if (aPost._embedded["wp:featuredmedia"]) { //img is there
        //            clone.querySelector(".img").setAttribute("src", aPost._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);
        //        } else { // no img
        //            clone.querySelector(".img").remove();
        //        }

        let section = document.querySelector("#seriesPage");
        section.appendChild(clone);

    }

}
fetchDataSeriesGallery();

//Subpage Gallery 3 Page

if (document.querySelector("#subpageSeries")) {

    fetch("http://www.paulchelaru.com/wp-json/wp/v2/series_gallery/" + id)
        .then(e => e.json())
        .then(showSinglePostSubpageSeries)
    console.log(id);

    function showSinglePostSubpageSeries(aPost) {
        console.log(aPost);
        document.querySelector("#subpageSeries h1").textContent = aPost.title.rendered;
        //        document.querySelector("#subpageSeries h1").textContent = aPost.title.rendered;
        document.querySelector("#subpageSeries").innerHTML = aPost.content.rendered;
    }
}



//Gallery 2 Page
function fetchDataSeriesPpGallery() {
    fetch("http://www.paulchelaru.com/wp-json/wp/v2/people_portraits?_embed?_embed")
        .then(e => e.json())
        .then(showDataSeriesPpGallery)
}

function showDataSeriesPpGallery(data) {
    console.log(data);
    data.forEach(showSinglePostSeriesPpGallery);
}

function showSinglePostSeriesPpGallery(aPost) {
    if (document.querySelector("#PpPage_template")) {
        //        console.log(aPost.acf.image);
        let template = document.querySelector("#PpPage_template").content;
        let clone = template.cloneNode(true);

        clone.querySelector(".PpPage_img").setAttribute("src", aPost.acf.image);
        clone.querySelector(".PpPage_title").innerHTML = aPost.title.rendered;

        let section = document.querySelector("#PpPage");
        section.appendChild(clone);

    }
}
fetchDataSeriesPpGallery();

//Gallery 1 Page
function fetchDataSeriesSpGallery() {
    fetch("http://www.paulchelaru.com/wp-json/wp/v2/self_portraits?_embed?_embed")
        .then(e => e.json())
        .then(showDataSeriesSpGallery)
}

function showDataSeriesSpGallery(data) {
    console.log(data);
    data.forEach(showSinglePostSeriesSpGallery);
}

function showSinglePostSeriesSpGallery(aPost) {
    if (document.querySelector("#SpPage_template")) {
        //        console.log(aPost.acf.image);
        let template = document.querySelector("#SpPage_template").content;
        let clone = template.cloneNode(true);

        clone.querySelector(".SpPage_img").setAttribute("src", aPost.acf.image);
        clone.querySelector(".SpPage_title").innerHTML = aPost.title.rendered;

        let section = document.querySelector("#SpPage");
        section.appendChild(clone);

    }
}
fetchDataSeriesSpGallery();

//Scroll buttom
// When the user scrolls down 20px from the top of the document, show the button
if (document.querySelector("#myBtn")) {
    window.onscroll = function () {
        scrollFunction()
    };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.getElementById("myBtn").style.display = "block";
        } else {
            document.getElementById("myBtn").style.display = "none";
        }
    }

    // When the user clicks on the button, scroll to the top of the document
    function topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

}