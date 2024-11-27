const navMenu = document.getElementById('nav-menu')
const navToggle = document.getElementById('nav-toggle')
const navClose = document.getElementById('nav-close')
const navLink = document.querySelectorAll('.nav_link')
const contactFrom = document.getElementById('contact-form')
const contactMessage = document.getElementById('contact-message')
const sections = document.querySelectorAll('section[id]')
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')
const getCurrentTheme = () => document.body.classList.contains(darkTheme)? 'dark' : 'light'
const getCurrentIcon = () => document.classList.contains(iconTheme)? 'ri-moon-line' : 'ri-sun-line'

/*=============== WEATHER ===============*/
const apiKey ="2ba5351b4a1c7e3fc55fff9579353f3e";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weatherIcon");

/*=============== SHOW/HIDE MENU ===============*/
if(navToggle){
    navToggle.addEventListener('click' , ()=> {
        navMenu.classList.add('show-menu')
    })
}

if(navClose) {
    navClose.addEventListener('click' ,()=> {
        navMenu.classList.remove('show-menu')
    })
}
/*=============== REMOVE MENU ===============*/
const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


/*=============== SHADOW HEADER ===============*/
const shadowHeader = () => {
    const header = document.getElementById('header')
    this.scrollY >= 50? header.classList.add('shadow-header')
                      : header.classList.remove('shadow-header')
}
window.addEventListener('scroll', shadowHeader)
/*=============== EMAIL JS ===============*/
const sendEmail = (e) =>{
    e.preventDefault()
    emailjs.sendForm('service_mv7c5yt', 'template_qw54wbn', '#contact-form', '6UiJKUBBFVAMpvs4w')
    .then( () => {
        contactMessage.textContent = 'Message sent successfully ✅'
        setTimeout( ()=> {
            contactMessage.textContent = ''
        }, 5000)
        contactFrom.reset()
    } ,() => {
        contactMessage.textContent = 'Message not sent (service error) ❌'
    })
}
contactFrom.addEventListener('submit' , sendEmail)
/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up')
    this.scrollY >= 350? scrollUp.classList.add('show-scroll')
                       : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll' , scrollUp)
/*=============== ACTIVE LINK ===============*/
const scrollActive = () => {
    const scrollDown = window.scrollY
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58, 
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav_menu a[href*=' + sectionId + ']')
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }
        else{
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== DARK LIGHT THEME ===============*/ 
if(selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}
themeButton.addEventListener('click', () =>{
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)

    localStorage.setItem('selected-theme' , getCurrentTheme())
    localStorage.setItem('selected-theme' , getCurrentIcon())
})

/*=============== WEATHER ===============*/
async function checkWeather(location){
    const response = await fetch(apiURL + location + `&appid=${apiKey}`);
    if(response.status == 404){
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none"
    }
    else{
        let data = await response.json();
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".location").innerHTML = data.name;
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/hr";
        
        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "image/clouds.png";
        }
        else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "image/clear.png"
        }
        else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "image/rain.png"
        }
        else if(data.weather[0].main == "Snow"){
            weatherIcon.src = "image/snow.png"
    }

    document.querySelector(".weather").style.display = "block" ;
    document.querySelector(".error").style.display = "none";
    }
    
}
searchBtn.addEventListener("click" , ()=>{
    checkWeather(searchBox.value);
})