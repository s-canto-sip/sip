function goToSIP() {
    window.location.href = 'sip.html'
}

function goToWealth() {
    window.location.href = 'sip-wealth.html'
}

function myFunction(x) {
    x.classList.toggle("change");
}

function openNav() {
    // Open the sidebar
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("body").style.filter = "blur(10px)";
    
    // Show the links after a delay
    setTimeout(function() {
        document.getElementById("sidenav-links").style.opacity = "1"; // Show links
        document.getElementById("sidenav-links").classList.remove("hidden"); // Ensure links are visible
    }, 270); // Match this duration with the CSS transition time for width (0.5s)
}

function closeNav() {
    // Immediately hide the links
    document.getElementById("sidenav-links").style.opacity = "0"; // Hide links immediately
    document.getElementById("sidenav-links").classList.add("hidden"); // Set hidden to true
    document.getElementById("mySidenav").style.width = "0"; // Close the sidebar
    document.getElementById("body").style.filter = "none";
}

// Function to handle scroll event
function handleScroll() {
    const logos = document.querySelectorAll('.logos-section-logo'); // Select all logo images
    const sip = document.querySelectorAll('.sip-logo-w');
    const title = document.querySelectorAll('.intro');
    const title2 = document.querySelectorAll('.intro-2');
    const headersip = document.querySelector('#header-sip');
    if (window.scrollY > 10) { // Change 10 to the scroll distance you want
        logos.forEach(logo => {
            logo.classList.add('shrink'); // Add class to shrink the images
        });
        sip.forEach(sipi => {
            sipi.classList.add('sip-shrink'); // Add class to shrink the images
        });
        title.forEach(titles => {
            titles.classList.add('invisible');
        });
        title2.forEach(titles2 => {
            titles2.classList.remove('invisible');
        });
    } else {
        logos.forEach(logo => {
            logo.classList.remove('shrink'); // Remove class to restore original size
        });
        sip.forEach(sipi => {
            sipi.classList.remove('sip-shrink'); // Remove class to restore original size
        });
        title.forEach(titles => {
            titles.classList.remove('invisible');
        });
        title2.forEach(titles2 => {
            titles2.classList.add('invisible');
        });
    }
    if (window.scrollY > 100) {
        headersip.classList.add('header-scroll');
        document.getElementById("sip-logo-sip").src="img/SIP_LOGO_W.png";
        document.getElementById("sip-three-lines").style.color="white";
    } else {
        headersip.classList.remove('header-scroll');
        document.getElementById("sip-logo-sip").src="img/SIP_LOGO_W.png";
        document.getElementById("sip-three-lines").style.color="white";
    }
}

// Add the scroll event listener
window.addEventListener('scroll', handleScroll);

const line = document.querySelector(".timeline-innerline");
const timeline_events = document.querySelectorAll(".timeline ul li");

function showTime(e) {
    e.setAttribute("done", "true");
    e.querySelector(".timeline-point").style.background = "#4a25a9";
    e.querySelector(".date").style.opacity = "100%";
    e.querySelector("p").style.opacity = "100%";
}

let i = 0;
function slowLoop() {
    setTimeout(function (){
        showTime(timeline_events[i]);
        timelineProgress(i + 1);
        i++;
        if (i < timeline_events.length)
            slowLoop();
    }, 800);
}

let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            //show timeline event
            slowLoop();
        }
    });
}, {});

let target = document.querySelector(".timeline ul");
observer.observe(target);

function timelineProgress(value) {
    let progress = `${((i + 1) / timeline_events.length) * 100}%`;

    if (window.matchMedia("(max-width: 599px)").matches) {
        line.style.height = progress;
        line.style.width = "4px";
    } else {
        line.style.width = progress;
        line.style.height = "4px";
    }
}

function effect() {
    const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add("in-view");
            entrada.target.classList.remove("not-in-view");
        } else {
            entrada.target.classList.remove("in-view");
            entrada.target.classList.add("not-in-view");
        }
    })
    }, {
        rootMargin: "0px",
        threshold: [0, 0.1, 1]
    })

    const tags = document.querySelectorAll(".animate");

    tags.forEach((tag) => {
        observador.observe(tag);
    })
}
