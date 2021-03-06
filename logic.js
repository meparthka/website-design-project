const web = document.body
const proLine = $("pro-line")
const proLineAlt = $(".pro-line-alt")
const docEle = document.documentElement
const sideBarClose = $("#side_bar_close")
const sideBarOpen = $("#side_bar_open")
const sideBox = $("#side_box")
const sideBarMask = $("#side_bar_mask")
const logoScreen = $("#logo_screen")
const navLink = document.getElementsByClassName("nav-link")
const animatX = document.getElementsByClassName("animat-x")[0]
const animatY = document.getElementsByClassName("animat-y")[0]
const changeTheme = $("#c_theme")
const aniBottomSemi = document.getElementsByClassName("ani-bottom-semi")
const subForm = document.getElementById("sub_form")
const subFormSucc = $("#sub_form_succ")
const subFormErr = $("#sub_form_err")
const subEmail = $("#sub_email")

/* Remove Logo Screen */
setTimeout(() => {
    logoScreen.css("display", "none")
}, 700)

/* set theme */
const goDark = () => {
    web.classList.add("theme-alt")
    $.cookie("USER_THEME", "dark")
}

const goLight = () => {
    web.classList.remove("theme-alt")
    $.cookie("USER_THEME", "light")
}

if ($.cookie("USER_THEME")) {
    if ($.cookie("USER_THEME") === 'dark') {
        goDark()
    } else {
        goLight()
    }
} else {
    goLight()
}

/* Change Theme */
changeTheme.on('click', () => {
    if ($.cookie("USER_THEME")) {
        if ($.cookie("USER_THEME") === 'dark') {
            goLight()
        } else {
            goDark()
        }
    } else {
        goDark()
    }
})

/* animation delay */
const getAniBottom = $(".ani-bottom")
getAniBottom.addClass("ani-bottom-x")
getAniBottom.removeClass("ani-bottom")

setTimeout(() => {
    let getAniBottomX = $(".ani-bottom-x")
    getAniBottomX.addClass("ani-bottom")
    getAniBottomX.removeClass("ani-bottom-x")
}, 700)

const getAniTop = $(".ani-top")
getAniTop.addClass("ani-top-x")
getAniTop.removeClass("ani-top")

setTimeout(() => {
    let getAniTopX = $(".ani-top-x")
    getAniTopX.addClass("ani-top")
    getAniTopX.removeClass("ani-top-x")
}, 700)

/* Scroll event */
const setScroll = (e) => {

    let tH = docEle.scrollTop;
    let cP = docEle.scrollHeight - window.innerHeight
    let lW = tH / cP * 100

    proLine.css("width", lW + "%");
    proLineAlt.css("width", lW + "%");

    if (docEle.scrollTop != 0) {
        web.classList.add("alt")
    } else {
        web.classList.remove("alt")
    }

}

setScroll()

web.onscroll = () => {
    
    setScroll()
    aniX()
    
}

const aniX = () => {
    let aniPos = animatX.getBoundingClientRect().y
    let tH = aniPos;
    let cP = 3000 - window.innerHeight
    let lW = tH / cP * 100
    
    /*
    animatX.getElementsByClassName("animat-mask")[0].style.height = window.innerHeight + "px"
    animatY.getElementsByClassName("animat-mask")[0].style.height = window.innerHeight + "px"
     */

    if (lW < 0 && lW > -50) {
        animatX.getElementsByClassName("animat-div")[0].style.width = (Math.abs(lW) * 3) + "%";
        animatX.getElementsByClassName("animat-div")[0].style.height = (Math.abs(lW) * 3) + "%";
    }
    if (lW < -40) {
        for (const o of aniBottomSemi) {
            o.classList.add("ani-bottom-semi-show")
            animatX.classList.add("d49ci4")
        }
    } else if (lW < 0 && lW > -40) {
        for (const o of aniBottomSemi) {
            o.classList.remove("ani-bottom-semi-show")
            animatX.classList.remove("d49ci4")
        }
    }
}

/* Side Bar Open And Close Event */

sideBarOpen.on('click', () => {
    sideBox.addClass('side-open')
})

sideBarClose.on('click', () => {
    sideBox.removeClass('side-open')
})

sideBarMask.on('click', () => {
    sideBox.removeClass('side-open')
})

for (const link of navLink) {
    link.addEventListener('click', () => {
        sideBox.removeClass('side-open')
    })
}

/* make link active */

for (const link of navLink) {

    let winPath = window.location.href.split("#")

    if (winPath.length > 1) {

        if (link.getAttribute('href') === '#' + winPath[1]) {
            link.classList.add("active-link")
        } else {
            link.classList.remove("active-link")
        }

    } else {
        docEle.scrollTop = 0
    }

    link.onclick = (e) => {
        for (const link of navLink) {
            link.classList.remove("active-link")
        }
        link.classList.add("active-link")
    }

}

subForm.onsubmit = (e) => {
    e.preventDefault();
    subFormSucc.hide();
    subFormErr.hide();
    setTimeout(() => {
        if (subEmail.val().match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            subFormSucc.show()
            subEmail.val("")
            setTimeout(() => {
                subFormSucc.hide();
            }, 3000)
        } else{
            subFormErr.show();
        }
    }, 500)
}

