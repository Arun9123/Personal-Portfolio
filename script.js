var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
    for (var tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (var tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
        tabcontent.style.maxHeight=null;
    }
    event.currentTarget.classList.add("active-link");
    var selectedTab = document.getElementById(tabname);
    selectedTab.classList.add("active-tab");
    selectedTab.style.maxHeight = selectedTab.scrollHeight + "px";
}

var sidemenu = document.getElementById("sidemenu");

function openmenu() {
    sidemenu.style.right = "0";
}

function closemenu() {
    sidemenu.style.right = "-200px";
}

const scriptURL = 'https://script.google.com/macros/s/AKfycbzbcIAIp6ZjhIuC0Y8nIlprnGPb-1p7Ca1m7lOloNzfmzSWHOojOH3B5gmLV05FRaeC/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");

form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            msg.innerHTML = "Details sent successfully!";
            setTimeout(function () {
                msg.innerHTML = ""
            }, 2500);
            form.reset();
        })
        .catch(error => console.error('Error!', error.message));
});

document.addEventListener('DOMContentLoaded', function () {
    const roles = [
      "Software Engineer",
      "ML Engineer",
      "Full-Stack Developer",
      "AI Enthusiast"
    ];
  
    const el = document.getElementById("role");
    const cursor = document.querySelector(".cursor");
  
    const typeSpeed = 80;        // ms per character while typing
    const deleteSpeed = 50;      // ms per character while deleting
    const holdAfterType = 1200;  // pause after typing a full word
    const holdAfterDelete = 400; // pause after deleting a word
  
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;
  
    function tick() {
      const current = roles[roleIndex];
  
      if (!deleting) {
        el.textContent = current.slice(0, charIndex + 1);
        charIndex++;
  
        if (charIndex === current.length) {
          setTimeout(() => { deleting = true; tick(); }, holdAfterType);
          return;
        }
        setTimeout(tick, typeSpeed);
      } else {
        el.textContent = current.slice(0, charIndex - 1);
        charIndex--;
  
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(tick, holdAfterDelete);
          return;
        }
        setTimeout(tick, deleteSpeed);
      }
    }
  
    // Cursor blink fix while typing
    const origBlink = cursor.style.animation;
    const observeTyping = () => {
      cursor.style.animation = 'none';
      clearTimeout(observeTyping._t);
      observeTyping._t = setTimeout(() => {
        cursor.style.animation = origBlink || 'blink 0.9s steps(1) infinite';
      }, 120);
    };
    const scheduler = new MutationObserver(observeTyping);
    scheduler.observe(el, { characterData: true, childList: true, subtree: true });
  
    tick();
  });
  